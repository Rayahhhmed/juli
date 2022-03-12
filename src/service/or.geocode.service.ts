
import { changeBuildingsObject } from '../controller/handleBuildingData.controller';
import https from 'https';
// const getGeodata = (addressString: string): any => {
//     const key = process.env.ORS_KEY;
//     // Data received has json from the file. 
//     addressString = addressString.replace(' ', '%20');
//     let URL = 'https://api.openrouteservice.org/geocode/autocomplete?api_key='+ key +'&text=' + addressString;
//     let geoData = () => 
//         axios.get(URL)
//         .then((res) => {
//             console.log('These is the response: ' + res.data)
//             return res.data;
//          }).catch(err => {
//              if (err) throw err;
//          });

//     console.log(geoData());
//     return geoData;
// }

// export default getGeodata;

const getGeodata = (deserializedData: any, objectkey: string, addressString: string): any => {
    const key = process.env.ORS_KEY;
    let geoData = ''
    // Data received has json from the file. 
    addressString = addressString.replace(' ', '%20');
    let URL = 'https://api.openrouteservice.org/geocode/autocomplete?api_key='+ key +'&text=' + addressString;
    https.get(URL, res => {
        
        res.on('data', chunk => {
            geoData += chunk;
        });

        res.on('end', () => {
            geoData = JSON.parse(geoData);
            changeBuildingsObject(geoData, deserializedData, objectkey, addressString);
        })
    })

    return geoData;
}

export default getGeodata;