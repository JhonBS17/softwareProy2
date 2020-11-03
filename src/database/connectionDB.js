const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pruebasSW'
    // host: 'database-2.cfxxrpsqignv.us-east-1.rds.amazonaws.com',
    // user: 'master',
    // password: 'datosSoftware2',
    // database: 'pruebasSW'
});

module.exports = {connection};