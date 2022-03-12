import express from 'express'; 
import 'dotenv/config';
import config from 'config'
import routes from './utils/routes';
import logger from './utils/logger';

import handleBuildingData from './controller/handleBuildingData.controller';
import getDistanceMatrix from './service/osrm.service';
const port = process.env.PORT || config.get<number>('port');
const app = express(); 


app.listen(port, async () => {
    logger.info(`juli is running on ${port} successfully!`);
  
    handleBuildingData();
    routes(app);
});
