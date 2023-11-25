require('dotenv/config.js') // cargando variables de entorno
const pool = require('../config/database.js')
const { getFreeRam, getFreeCpu } = require('../utils/system.js')

const readProducts = async (call, callback) => {
    let products = []
    let error = false

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
        error = true
        console.log(err)

    } finally {
        let performance = {
            ram: getFreeRam(), // memoria libre (GB)
            cpu: await getFreeCpu(), // cpu libre (%)
            error
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
