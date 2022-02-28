import express from 'express'; 
import 'dotenv/config';
import config from 'config'

const port = process.env.PORT || config.get<number>('port');
const app = express(); 

app.listen(port, () => {
    console.log("App is running on port ", port);
});