import {fetchResponse} from "../services/queryService.js"
import {useSearchBar} from "../hooks/useSearchBar.js"
import { ResultList } from "./ResultList.js";

export function SearchBar(){
    let {query,setQuery,result,loaded,handelSearch} = useSearchBar();

    return <div>
        <input 
            value = {query}
            onChange = {(e) => setQuery(e.target.value)}
            placeholder="type your queries here">
        </input>
        <button 
            onClick={()=>{handelSearch()}}/>
        {loaded? <ResultList searchResult={result}/> : "load failed... Retry"}
    </div>
}