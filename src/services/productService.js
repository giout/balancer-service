require('dotenv/config.js') // cargando variables de entorno

const pool = require('../config/database.js')

const readProducts = async (call, callback) => {
    let products = []

    try {
        // realizando operacion del microservicio
        const query = await pool.query('SELECT * FROM products')
        const result = query.rows   

        result.forEach(row => {
            products.push({
                "id": row.cod,
                "description": row.descrip
            })
        })

    } catch (err) {
        console.log(err)

    } finally {
        // enviando respuesta
        callback(null, { 'products': products })
    }
}

module.exports = {
    readProducts
}
