import logger from "pino"; 
import dayjs from "dayjs";

const log = logger({
    prettyPrint: true, 
    bse: { 
        pid: false
    }, 
    timestamp: () => `,"time:"${dayjs().format()}"`,
});

export default log;