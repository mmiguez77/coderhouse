import express from 'express'
import Productos from './api/productos.js'
​
const productos = new Productos()
​
const app = express()
​
app.use(express.static('public'))
​
const productosRouter = express.Router()
app.use('/api/productos', productosRouter)
​
productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))
​
productosRouter.get('/', (req, res) => {
    res.json(productos.listarAll())
})
​
productosRouter.get('/:id', (req, res) => {
    res.json(productos.listar(req.params))
})
​
productosRouter.post('/', (req, res) => {
    res.json(productos.guardar(req.body))
})
​
productosRouter.put('/:id', (req, res) => {
    res.json(productos.actualizar(req.body, req.params.id))
})
​
productosRouter.delete('/:id', (req, res) => {
    res.json(productos.borrar(req.params.id))
})
​
const PORT = 8080
​
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))