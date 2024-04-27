const { Pool } = require('pg');

const pool = new Pool({
  type: 'postgres',
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

module.exports = pool;