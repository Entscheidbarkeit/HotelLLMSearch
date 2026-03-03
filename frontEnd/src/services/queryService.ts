import axios from "axios"
import {type Hotel} from "../../../types/types.js"

interface AskResponse {
    SearchResult: Hotel[];
}

export async function fetchResponse(msg:string): Promise<Hotel[]> {
    try{
        let rst = await axios.post<AskResponse>("http://localhost:3000/api/ask",{"query":msg})
        if(!rst)
            throw new Error("unable to fetch data from endpoint /api/ask")
        return rst.data.SearchResult;
    }catch(e:any){
        if(e instanceof Error){
            throw new Error("fetch response failed: "+e.message)
        }
        else{
            throw new Error("fetch response failed: error type unknown");
        }
    }
}