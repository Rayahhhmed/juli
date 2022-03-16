/**
 * Deprecated file used initially for OCR read of building
 * codes.
 */
import {Tesseract} from "tesseract.ts";
import fs from 'fs';
import config from 'config';
import log from "../utils/logger";
import logger from "../utils/logger";


const runTesseract = async (id: string | number) => {
    fs.readFile(config.get<string>('PATH_IMG') + id +'.PNG', (err, data) => {
        if (err) {
            log.error('Tesseract had an error finding Building Code Image path: ' + err + ' for path ' + config.get<string>('PATH_IMG'));
        } else {
            const runTesseractOCR = async () => {
                try {
                    const response = async () =>  await Tesseract.recognize(data, 'eng');
                    const { data: { text }}  = await response();
                    Promise.all([response, { data: { text }}]);
                    console.log('text: ', text);
                    return text;
                } catch  (error) {
                    log.error('Tesseract OCR did not recognise the image file and this was the error: ' + error);
                }
            }

            runTesseractOCR();
        }
    });  
            
}

function buildingCodes () : void { 
    for (let i = 0; i < 6; i++) {
        if (!fs.existsSync(config.get<string>('PATH_IMG') + i + '.PNG')) {
            console.log(config.get<string>('PATH_IMG'))
            log.error('Please check if you have Kensington campus Building Codes image in the correct source file.');
            return;
        }
        
        // Check if json file exists or not. 
        // If it does not exist, create it. 
        if (!fs.existsSync(config.get<string>('PATH_JSON'))) {
            log.info('JSON file does not exist. Creating JSON file after OCR scan!');
        }
        
        runTesseract(i);
        
    }
    fs.unlink('eng.traineddata', (err) => {
        if (err) throw err; 
        logger.info('Successfully removed trained data!')
    })
    console.log('done!');
}

export default buildingCodes;
