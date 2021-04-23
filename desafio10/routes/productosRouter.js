import express from 'express';
import ProductoController from '../controllers/Producto.js';
const router = express.Router();
const producto = new ProductoController();

/* ---- AGREGAR PRODUCTO ---- */
router.post('/', (req, res) => {
    const data = req.body;
    if (producto.agregarProducto(data)) {
        if (!data.title == "") {res.redirect('/home')}
    }
    res.status(400).send();
});

/* ---- VER TOTAL DE PRODUCTOS ---- */
router.get('/', (req, res) => {
    const productos = producto.verProductos();
    if (!productos) {
        return res.status(404).json({ error: 'Productos no encontrado' })
    } res.json(productos);
});

/* ---- VER PRODUCTO POR ID ---- */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const prodFiltro = producto.verProductoPorId(id);
    if (prodFiltro) { return res.json(prodFiltro) };
    res.status(404).json({ error: 'Producto no encontrado' })
});

/* ----  ACTUALIZAR PRODUCTO ---- */
router.put('/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    if (producto.actualizarProducto(id, data)) { res.status(201).json(data) }
    res.status(400).send();
})

/* ----  ELIMINAR PRODUCTO ---- */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    producto.eliminarProducto(id);
    res.send()
})

export default router;