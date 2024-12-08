const { crearPost, obtenerPosts, obtenerPostsPorId, likePost, eliminarPost } = require('./consultas')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT= 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}}`)
})


//GET
app.get('/posts', async (req, res) => {
    try {
        const posts = await obtenerPosts()
        res.json(posts)
    } catch (error) {
        res.status(500).send("Error al obtener posts")
    }
})

app.get('/posts/:id', async (req, res) => {
    try {
        const post = await obtenerPostsPorId(req.params.id)
        res.json(post)
    } catch (error) {
        console.error("Error al obtener post por ID:", error.message);
        res.status(404).send("Post no encontrado");
    }
})

//POST
app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body

    const likesIniciales = typeof likes === 'number' ? likes : 0;

    if (!titulo || !img || !descripcion) {
        return res.status(400).send("Datos incompletos o inválidos");
    }

    try {
        await crearPost(titulo, img, descripcion, likesIniciales)
        res.send("Post creado con éxito")
    } catch (error) {
        console.error("Error al crear post:", error.message);
        res.status(500).send("Error al crear post");
    }
})

//PUT
app.put('/posts/like/:id', async (req, res) => {
    try {
        await likePost(req.params.id)
        res.send("Post actualizado con éxito")
    } catch (error) {
        res.status(500).send("Error al actualizar post")
    }
})

//DELETE
app.delete('/posts/:id', async (req, res) => {
    try {
        await eliminarPost(req.params.id)
        res.send("Post eliminado con éxito")
    } catch (error) {
        res.status(500).send("Error al eliminar post")
    }
})

