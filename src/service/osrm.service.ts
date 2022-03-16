
import { changeBuildingsObject } from '../controller/handleBuildingData.controller';
import http from 'http';
import config from 'config';
import { Building } from '../interface/building.interface';
import { TransportMode } from '../interface/distanceMatrix.interface';
import axios from 'axios';


/**
 * 
 * @param geojson 
 * @param deserializedData 
 * @param objectKey 
 * @param addressString 
 * @param buildingFrom 
 * @param buildingTo 
 * @param transportType 
 * @returns 
 */
const getDistanceMatrix = (geojson: any, deserializedData: any, objectKey: string, addressString: string, 
                           buildingFrom?: Building, buildingTo?: Building, transportType?: TransportMode): any => {
    let matrixJson = ''
    let port_osrm = config.get<string>('PORT_OSRM');
  
    let isochroneString = buildingFrom?.longitude + ',' + buildingFrom?.latitude + ';' +
                          buildingTo?.longitude + ',' + buildingTo?.latitude;
    
    let dummy = '151.2153,-33.8568;151.1780,-33.7961'
    let URL = 'http://localhost:'+ port_osrm + '/route/v1/foot/' + dummy;

    axios.get(URL).then(res => {
        matrixJson = res.data;
        changeBuildingsObject(geojson, deserializedData, objectKey, addressString);
        console.log(matrixJson);
    });
    

    return matrixJson;
}


export default getDistanceMatrix;