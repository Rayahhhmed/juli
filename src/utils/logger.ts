import logger from "pino"; 
import dayjs from "dayjs";


/**
 * This is a logger for pretty print. 
 */
const log = logger({
    prettyPrint: true, 
    bse: { 
        pid: false
    }, 
    timestamp: () => `,"time:"${dayjs().format()}"`,
});

export default log;