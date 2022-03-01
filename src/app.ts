import express from 'express'; 
import 'dotenv/config';
import config from 'config'
import routes from './utils/routes';
import logger from './utils/logger';

const port = process.env.PORT || config.get<number>('port');
const app = express(); 


app.listen(port, async () => {
    logger.info(`juli is running on ${port} successfully!`);
    routes(app);
});