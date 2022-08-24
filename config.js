const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, BACK_PORT, DB_USER, DB_PASSWORD, DB_SCHEMA } = process.env;

const db = mysql.createPool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
});

const backPort = parseInt(BACK_PORT, 10);

module.exports = { db, backPort };
