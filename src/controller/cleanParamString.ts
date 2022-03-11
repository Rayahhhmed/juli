import { Request } from 'express';
import logger from '../utils/logger';


/**
 * Edit
 * 
 * @returns 
 * @param req: Express - Request
 */
const cleanParamArray = (req: Request)  => {
    logger.info(req.params);
    return 
}


export default cleanParamArray;