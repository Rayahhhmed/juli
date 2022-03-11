import {Tesseract} from "tesseract.ts";
import fs from 'fs';
import config from 'config';
import log from "../utils/logger";


const runTesseract = async () => {
    fs.readFile(config.get<string>('PATH_IMG')+0+'.PNG', (err, data) => {
        if (err) {
            log.error('Tesseract had an error finding Building Code Image path: ' + err + ' for path ' + config.get<string>('PATH_IMG'));
        } else {
            const runTesseractOCR = async () => {
                try {
                    const response = async () =>  await Tesseract.recognize(data, 'eng');
                    let text = '';
                    //  const { data: { text }}  = await response()
                    Promise.all([response, { data: { text }}])
                    console.log('text: ', text);
                    return;
                } catch  (error) {
                    log.error('Tesseract OCR did not recognise the image file and this was the error: ' + error);
                }
            }

            runTesseractOCR();
        }
    });  
            
}

function buildingCodes () : void { 
    if (!fs.existsSync(config.get<string>('PATH_IMG')+0+'.PNG')) {
        console.log(config.get<string>('PATH_IMG'))
        
        log.error('Please check if you have Kensington campus Building Codes image in the correct source file.');
        return;
    }

    if (!fs.existsSync(config.get<string>('PATH_JSON'))) {
        log.info('JSON file does not exist. Creating JSON file after OCR scan!');
        runTesseract();
    }
}
export default buildingCodes;
