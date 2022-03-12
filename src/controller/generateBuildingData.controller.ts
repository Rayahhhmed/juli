import { Request } from 'express';
import { request } from 'http';
import { Building } from '../interface/building.interface';
import logger from '../utils/logger';



const validateBuildingId = (buildingTo: string | undefined, 
                            buildingFrom: string | undefined, 
                            deserializedData: any) => { 
    if (buildingTo === undefined && buildingFrom === undefined) {
        throw "Building ID does not exist!";
    }
    
    if (!deserializedData.hasOwnProperty(buildingTo) || 
        !deserializedData.hasOwnProperty(buildingFrom) ) {
      throw "Building ID does not exist!";
    }
    return true;
}

/**
 * Edit
 * 
 * @param req: Express - Request
 * @returns 
 */
// const generateBuildingArray = (req: Request, deserializedData: any): Building[] => {
const generateBuildingArray = (req: Request, deserializedData: any) => {
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
    logger.info(req.params);
    let from = req.params.from;
    let to =  req.params.to;
    const regex_pattern = new RegExp(`\-([^]*)\-`);
    let captureGroupToID = to.match(regex_pattern)?.at(1)!;
    let captureGroupFromID = from.match(regex_pattern)?.at(1)!;    
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
    validateBuildingId(captureGroupToID, captureGroupFromID, deserializedData);
    let buildingArray: Building[] = [deserializedData[captureGroupFromID], 
                                    deserializedData[captureGroupToID]];
    return buildingArray;
}


export default generateBuildingArray;