import logger from '../utils/logger';
import { QueryRequest, QueryResponse } from "../interface/query";


function validateQuery (query: QueryRequest) {
    if (!query) {
        logger.error("There is an error with your query request.\n Verbose: No Query found!");
        return false;
    } 
    
    


    return true;
}


export default validateQuery;