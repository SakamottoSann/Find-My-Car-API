require('dotenv').config()
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    port : process.env.DB_PORT,
    password : process.env.DB_PASS,
    database : process.env.DB_BANCO
  }
});

module.exports = knex;