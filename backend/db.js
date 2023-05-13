const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "1604",
    host: "localhost",
    port: 5432,
    database: "Students"
})

module.exports = pool