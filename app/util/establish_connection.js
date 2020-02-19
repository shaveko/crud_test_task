var mysql = require('mysql');
const logger = require('./logger');
var trycount = 0;
const MAX_TRYCOUNT = 30;
const WAIT_TIMEOUT_MS = 1000;

var establishConnection = function(dbConfig) {
    return new Promise((resolve, reject)=>{
        
        tryToConnect();

        function tryToConnect() {
            logger.info('trying to connect...')
            //creating connecion 
            var connection = mysql.createConnection(
                dbConfig    
            );

            logger.info(JSON.stringify(dbConfig));

            connection.connect(function(err) {
                trycount++;
                if (err) {
                    logger.log('error', 'error connecting: ' + err.message);
                    if(trycount >= MAX_TRYCOUNT) {
                        logger.log('error', 'exceeded trycount: ' + err.message);
                        reject(err);   
                    }else{
                        logger.log('info', `schedule next try to connect in : ${WAIT_TIMEOUT_MS}ms`);
                        setTimeout(tryToConnect, WAIT_TIMEOUT_MS);
                    }
                }else{
                    logger.log('info', 'connection established, resolving promise with it');
                    resolve(connection);
                }
            });
        }

    });
}

module.exports = establishConnection;




