import { Request, Response } from "express";
import { QueryRequest } from "../interface/query";
import validateQuery from "../middleware/validateQueryRequest";

function queryHandler (req: Request, res: Response) : void { 
        const queryRequest : QueryRequest = { 
            time_requested : new Date(), 
            building_start :  req.params.from, 
            building_destination :  req.params.to
        };
        
        if(validateQuery(queryRequest)) {
            res.sendStatus(200);
        } else { 
            res.sendStatus(400);
        }
}

export default queryHandler;