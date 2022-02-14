import winston from 'winston'

const dateFormat = () =>{
   return new Date(Date.now()).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}

class LoggerService {
        infoLogger:any
        errorLogger: any
        source: string
        constructor(source:string){
            this.source = source
            const infoLoggerFile = {
                    level:'info',
                    filename: process.env.INFO_LOG_FIlE_Name,
                    handleExceptions: true,
                    json: true,
                    colorize:false      
            }
            this.infoLogger = winston.createLogger({
                transports: [
                    new winston.transports.File(infoLoggerFile),
                    new winston.transports.Console()
                ],
                exitOnError: false
            })
            const errorLogFile = {
                    level:'error',
                    filename: process.env.ERROR_LOG_FIlE_Name,
                    handleExceptions: true,
                    json: true,
                    colorize:false               
            }
            this.errorLogger = winston.createLogger({
                transports: [
                    new winston.transports.File(errorLogFile),
                    new winston.transports.Console()
                ],
                exitOnError:false,
            })

        }
        async info(message:string){
            this.infoLogger.log({
                level: 'info', 
                source: this.source,
                timestamp: dateFormat(),
                message: message            
            });
        }
        async error(error:any){
            this.errorLogger.log({
                level: 'error', 
                source: this.source,
                timestamp: dateFormat(),
                message: error            
            })
        }
        
}
export default LoggerService