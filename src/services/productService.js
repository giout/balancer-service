require('dotenv/config.js') // cargando variables de entorno
const os = require('node:os')
const pool = require('../config/database.js')
const { bytesToGigabytes } = require('../utils/bytes.js')

const readProducts = async (call, callback) => {
    let products = []

    try {
        // realizando operacion del microservicio
        const query = await pool.query('SELECT * FROM products')
        const result = query.rows   

        for (const row of result) {
            products.push({
                "description": row.descrip,
                "id": row.cod
            })
        }

    } catch (err) {
        console.log(err)

    } finally {
        let performance = {
            ram: bytesToGigabytes(os.freemem()), // memoria libre
            cpu: 1111, // cpu libre
            error: true
        } 

        // enviando respuesta
        callback(null, { 
            products,
            performance
        })
    }
}

module.exports = {
    readProducts
}
