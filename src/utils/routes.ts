import { Express, Request, Response } from "express";
import { Dictionary } from "lodash";
import buildingCodes from "../controller/buildingCodes.controller";
import cleanParamString from "../controller/generateBuildingData.controller";
import queryHandler from "../controller/queryHandler.controller";
import { Building } from "../interface/building.interface";
import { QueryRequest } from "../interface/query.interface";
import validateQuery from '../middleware/validateQueryRequest';
import { deserializeBuildingJson } from '../controller/handleBuildingData.controller';
//import getDistanceMatrix from "../service/osrm.service";
import logger from './logger';
import generateBuildingArray from '../controller/generateBuildingData.controller';
import { TransportMode } from '../interface/distanceMatrix.interface';
import getDistanceMatrix from "../service/osrm.service";
/**
 * There are three main GET HTTP requests. 
 *  1) hc => General purpose health check
 *  2) /mode/from/to => This endpoint will take a default mode which should be 
 * foot since geofabrik data for Australia does not have cycle component yet. Furthermore, 
 * @param app (Express)
 */
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

        
        //     (geojson: any, deserializedData: any, objectKey: string, addressString: string, 
        //                    buildingFrom?: Building, buildingTo?: Building, transportType?: TransportMode)
        let distanceMatrixJson = getDistanceMatrix(buildingFrom, buildingTo, transportType);
        // console.log(distanceMatrixJson);
    });

}

export default routes;
