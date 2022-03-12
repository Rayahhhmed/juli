import { Express, Request, Response } from "express";
import { Dictionary } from "lodash";
import buildingCodes from "../controller/buildingCodes.controller";
import cleanParamString from "../controller/generateBuildingData.controller";
import queryHandler from "../controller/queryHandler.controller";
import { Building } from "../interface/building.interface";
import { QueryRequest } from "../interface/query.interface";
import validateQuery from '../middleware/validateQueryRequest';
import { deserializeBuildingJson } from '../controller/handleBuildingData.controller';
import getDistanceMatrix from "../service/osrm.service";
import logger from './logger';
import generateBuildingArray from '../controller/generateBuildingData.controller';
import { TransportMode } from "../interface/distanceMatrix.interface";

function routes(app: Express) {
    app.get('/hc', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.get('/:mode/:from/:to', (req: Request, res: Response) => {
        queryHandler(req, res);
        logger.info('Finding distance matrix from: ' + req.params.from +
                    ' and to: ' + req.params.to);
        
        const [buildingFrom, buildingTo] : Building[] = generateBuildingArray(req, deserializeBuildingJson())
        let transportType: TransportMode.FOOT | 
                           TransportMode.BIKE | 
                           TransportMode.DRIVING = TransportMode.FOOT;
        switch(req.params.mode) {  
            case 'bike':
                transportType = TransportMode.BIKE;
                break;
            case 'driving':
                transportType = TransportMode.DRIVING;
                break;
        }

        let distanceMatrixJson = getDistanceMatrix(buildingFrom, buildingTo, transportType);
        console.log(distanceMatrixJson);
    });

    





    app.get('/list', (req: Request, res: Response) => {
        buildingCodes();
        res.sendStatus(200);
    });
}

export default routes;
