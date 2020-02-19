var mysql = require('mysql');
var establishConnection = require('./establish_connection');

var pool;

const 
    logger = require('./logger'),
    host = process.env.DB_HOST || 'localhost',
    database = process.env.DB_NAME || 'crud_test_task',
    user = process.env.DB_USER || 'crud_test_task',
    port = process.env.DB_PORT || 3306,
    password = process.env.DB_PASSWORD || 'crud_test_task',
    connectionLimit = process.env.DB_CONNECTION_LIMIT || 10;

const dbConfig = {
    host,
    port,
    user,
    password,
    database
}

async function getPool() {
    if(pool) return pool;

    logger.info(`DB config: 
    -- host: ${host} 
    -- port: ${port} 
    -- user: ${user} 
    -- database: ${database}`);

    logger.info('Wait for db initialization');
    try{
        var connection = await establishConnection(dbConfig);
        connection.destroy();
    }catch(e) {
        console.error(e.message());
        console.error(`COULD NOT CONNECT TO DB ${JSON.stringify(dbConfig)} app will exit now`);
        process.exit();
    }

    pool = mysql.createPool({
        connectionLimit,
        host,
        port,
        user,
        password,
        database
    }, (err)=>{
        if(err) {
            logger.error('pool creation failed');
            logger.log('error', err);
        }
    });

    if(process.env.NODE_ENV === "test") {
        pool.query('DROP TABLE IF EXISTS event', (err)=>{
            if(err) {
                logger.error('drop table events query exec failed'); 
                return logger.error(err);
            }
            logger.info('Table events dropped')
            createTables();
        })
    }else{
        createTables();
    }

    function createTables() {
        pool.query('CREATE TABLE IF NOT EXISTS event (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, source VARCHAR(30) NOT NULL, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (err)=>{
            if(err) {
                logger.error('create table events query exec failed'); 
                return logger.error(err);
            }
            logger.info('init of db complete');
        });
    } 

}


module.exports = getPool;