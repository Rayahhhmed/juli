
import fs from 'fs';
import config from 'config';
import getGeodata from '../service/or.geocode.service';
const PATH = config.get<number>('PATH_JSON');
const FIRST_MOUNT = 'src/public/first_mount.json'; 


// Read from buildings.json file
export const deserializeBuildingJson = (): any => {
    return JSON.parse(fs.readFileSync(PATH.toString(), 'utf-8'));
}

export const serializeBuildingJson = (rawObjectData: any): any => { 
    // Serialize the new longitude and latitude data to 
    fs.writeFile(PATH.toString(), JSON.stringify(rawObjectData), (err) => {
        if (err) return err;
    });
}

/**
 * Read the buildings.json file then if this is first mount, 
 * Will request to ORS geocode service for the longitude and 
 * latitude data and store it in the json files. 
 * @returns modified json data with longitude and latitude.
 */
const handleBuildingData = () => { 
    let deserializedData: any | string = deserializeBuildingJson() ;
    let nonLocatableBuildingIds: string[] = [];
    if (!fs.existsSync(FIRST_MOUNT)) {
        let data = JSON.stringify({"status": "mounted"})
        fs.writeFile(FIRST_MOUNT, data, 'utf8', (err) => {
            if (err) throw err;
            console.log('Mounted Building Data Object to local memory, calling OR Geocode API.');
            const promises = []
            for (let key of Object.keys(deserializedData)) {
                const addressString = deserializedData[key]['address'];
                // This deserializedData is the json read from the buildings file 
                // and serialized to an object. 
                const geojson = async () => await getGeodata(deserializedData, key, addressString);
                promises.push(geojson)
                console.log(geojson())
                if (geojson === undefined) {
                    nonLocatableBuildingIds.push(key);
                }
                
            }
            Promise.allSettled(promises).then()
        }
        
        
        );

        
        console.error('Could not locate these building information from geocodes!' + nonLocatableBuildingIds)

    } 
}


export const changeBuildingsObject = (geojson: any, deserializedData: any, objectKey: string, addressString: string) => { 
        let [long, lat, _, __] = geojson['bbox'];
        deserializedData[objectKey] = {
            name: deserializedData[objectKey]['name'],
            address: addressString,
            latitude: lat, 
            longitude: long,
        } 
        serializeBuildingJson(deserializedData);
    
}


export default handleBuildingData;








