
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud',
  password: 'mamta@123',
  port: 5432,
})

module.exports=pool;

