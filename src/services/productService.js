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
        callback(null, { 
            'products': products,
            'performance': {
                'ram': 1.434,
                'cpu': 1.32324,
                'processes': 5,
                'time': 25.5454,
                'error': true
            }
        })
    }
}

module.exports = {
    readProducts
}
