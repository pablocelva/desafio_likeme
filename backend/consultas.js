const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    allowExitOnIdle: true
})

const crearPost = async (titulo, img, descripcion, likes = 0) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query(consulta, values)
    if (result.rowCount === 0) {
        throw new Error('Error al agregar post');
    }
    console.log("Post agregado")
}

const obtenerPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    if (rows.length === 0) {
        throw new Error('No hay posts');
    }
    //console.log(rows)
    return rows
}

const obtenerPostsPorId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (rows.length === 0) {
        throw new Error('Post no encontrado');
    }
    return rows[0];
}

const likePost = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING likes"
    const { rows } = await pool.query(consulta, [id])
    if (rows.length === 0) {
        throw new Error('Post no encontrado');
    }
    console.log("Likes actualizados en post con id:", id)
    return rows[0].likes
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
    if (result.rowCount === 0) {
        throw new Error('Post no encontrado');
    }
    console.log("Post eliminado")
}

module.exports = { crearPost, obtenerPosts, obtenerPostsPorId, likePost, eliminarPost }