const mysql2 = require('mysql2/promise');
require('dotenv').config();


const db = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    port: 3306
});

module.exports = db;
