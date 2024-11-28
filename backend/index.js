const { crearPost, obtenerPosts } = require ('./consultas')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT= 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}}`)
})

app.get('/posts', async (req, res) => {
    const posts = await obtenerPosts()
    res.json(posts)
})

app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    await crearPost(titulo, img, descripcion, likes)
    res.send("Post creado con éxito")
})