import type {Filters} from "./types/types.js";
import {hotelDBS} from "./DBS.js";
import express, {type Request,type Response}  from "express";
import axios from "axios"
import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())


app.post("/api/ask", async (req:Request, res:Response) => {
    const { query } = req.body;
    console.log("query received:" ,req.body)
    console.log("DEBUG: Received body ->", JSON.stringify(req.body, null, 2));
    if(!query){
        return res.status(400).json({error: "Query is required"})
    }

    /// Query
    const Qprompt = `
                        Extract hotel search parameters from the user message into a STRICT JSON format.

                        ### SCHEMA ###
                        {
                        "name": string | null,
                        "city": string | null,
                        "minPrice": number,
                        "maxPrice": number,
                        "minStars": number,
                        "maxStars": number
                        }
                        ### RULES ###
                        - price: if user mentions a range (e.g., "200 to 500"), extract it. 
                        - price: if user says "around 200", use min:150, max:250.
                        - stars: if not mentioned, use min:0, max:5.

                        ### EXAMPLE ###
                        User: "Looking for a Hilton in Berlin under 300 Euro"
                        Response: {
                        "name": "Hilton",
                        "city": "Berlin",
                        "minPrice": 0,
                        "maxPrice": 300,
                        "minStars": 0,
                        "maxStars": 5
                        }

                        ### RULES ###
                        1. If a value is missing, use null for strings and default values for numbers (min:0, max:9999).
                        2. ONLY return the JSON object.

                        User Message: "${query}"
                        Response:`;

    try {
        console.log("Processing Query...");
        const aiRst = await axios.post("http://localhost:11434/api/generate", {model: "llama3.1", prompt: Qprompt, stream: false, format:"json"});
        
        const aiRes = aiRst.data.response;
        console.log(`ai response: ${aiRes}`)
        let filter = extractFilterJSON(aiRes);
        console.log("filter extracted:" ,filter)

        let searchRst = hotelDBS.searchByFilter(filter)
        res.json({
            SearchResult: searchRst
        })

    } catch(error) {
        res.status(500).json({error: `Ollama is unreachable... msg: ${error}`})
    }


})

function extractFilter(msg:string):Filters{
    console.log(`msg from ai: ${msg}`);
    const hotelFilter:RegExp = new RegExp("/name:(?<name>[^,]+),\s*city:\s*(?<city>[^,]+),\s*price:\s*min-(?<minPrice>\d+)\s*max-(?<maxPrice>\d+),\s*stars:\s*min-(?<minStars>\d+)\s*max-(?<maxStars>\d+)/")
    const match = hotelFilter.exec(msg);
    let filter:Filters = {}; 
    if (match && match.groups) {
        const {name, city, minPrice, maxPrice, minStars, maxStars} = match.groups;
        console.log(`info from regexp: name: ${name}, city:${city}, Price: ${minPrice}, ${maxPrice}, stars: ${minStars}, ${maxStars}`)
        if(name){
            filter.name = name;
        }
        if(city){
            filter.city = city; 
        }
        let minPriceNum = Number(minPrice);
        let maxPriceNum = Number(maxPrice);
        let minStarsNum = Number(minStars);
        let maxStarsNum = Number(maxStars);
        filter.price = {min: isNaN(minPriceNum)?0:minPriceNum,max:isNaN(maxPriceNum)?Number.MAX_SAFE_INTEGER:maxPriceNum};
        filter.stars = {min: isNaN(minStarsNum)?0:minStarsNum,max:isNaN(maxStarsNum)?5:maxStarsNum};
    }
    return filter;
}
function extractFilterJSON(msg:string):Filters{
    try {
        const rawJson = JSON.parse(msg);
        
        return {
            name: rawJson.name || null,
            city: rawJson.city || null,
            price: { 
                min: Number(rawJson.minPrice) || 0, 
                max: Number(rawJson.maxPrice) || 9999 
            },
            stars: { 
                min: Number(rawJson.minStars) || 0, 
                max: Number(rawJson.maxStars) || 5 
            }
        };
    } catch (e) {
        console.error("AI returned invalid JSON:", msg);
        return {};
    }
}
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})




