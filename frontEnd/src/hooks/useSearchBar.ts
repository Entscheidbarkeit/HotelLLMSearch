import react from "react"
import {type Hotel} from "../../../types/types.js"
import { fetchResponse } from "../services/queryService.js";

export function useSearchBar() {
    const [query,setQuery] = react.useState<string>("");
    const [result,setResult] = react.useState<Hotel[]>([])
    const [loaded,setLoaded] = react.useState<boolean>(false)

    const handelSearch = async () => {
        try{
            const searchResult:Hotel[] =await fetchResponse(query)
            setResult(searchResult)
            setLoaded(true)
            console.log("loaded? ",loaded)
        }catch(e){
            console.log("hook of useSearchBar failed to get search result")
        }
        
    }
    return {query,setQuery,result,loaded,handelSearch}
}