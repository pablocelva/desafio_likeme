const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    allowExitOnIdle: true
})

const crearPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
}
//crearPost("Calamelones", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", "Esto es una malta", 10)

const obtenerPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    //console.log(rows)
    return rows
}
//obtenerPosts()

const obtenerPostsPorId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id])
    //console.log(rows)
    return rows
}
//obtenerPostsPorId(1)

module.exports = { crearPost, obtenerPosts }