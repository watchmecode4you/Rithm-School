const env = require('dotenv')
env.config()
const {
    Client
} = require('pg')

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

client.connect(err => {
    if(err) console.log(`connection error: ${err.stack}`)
    else console.log('connected')
})

module.exports = client