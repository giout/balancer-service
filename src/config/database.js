require('dotenv/config.js') // cargando variables de entorno

const { Pool } = require('pg')

const uri = process.env.DB_URI

const pool = new Pool({ connectionString: uri })

module.exports = pool
