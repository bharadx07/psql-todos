const Pool = require("pg").Pool;

// Enviroment Vars
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "psqltodos"
});


module.exports = pool; 