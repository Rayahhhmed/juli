import { Express, Request, Response } from "express";
import { Dictionary } from "lodash";
import buildingCodes from "../controller/buildingCodes.controller";
import cleanParamString from "../controller/cleanParamString";
import queryHandler from "../controller/queryHandler.controller";
import { QueryRequest } from "../interface/query";
import validateQuery from '../middleware/validateQueryRequest';
import logger from './logger';

function routes(app: Express) {
    app.get('/hc', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.get('/:from/:to', (req: Request, res: Response) => {
        queryHandler(req, res);
        logger.info('Finding distance matrix from: ' + req.params.from +
                    ' and to: ' + req.params.to);
        const paramDict = cleanParamString(req);
        console.log(paramDict)
    });

    app.get('/list', (req: Request, res: Response) => {
        buildingCodes();
        res.sendStatus(200);
    });
}

export default routes;


