import express from 'express';
import ProductoController from '../controllers/Producto.js';
const router = express.Router();
const producto = new ProductoController();

/* ---- AGREGAR PRODUCTO ---- */
router.post('/', (req, res) => {
    const data = req.body;
    if (producto.add(data)) {
        if (!data.title == "") { res.redirect('/') }
    }
});

/* ---- VER TOTAL DE PRODUCTOS ---- */
router.get('/', (req, res) => {
    const productos = producto.findAll();
    if (!productos) {
        return res.status(404).json({ error: 'Productos no encontrado' })
    } res.json(productos);
});

/* ---- VER PRODUCTO POR ID ---- */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const prodFiltro = producto.findByID(id);
    if (prodFiltro) { return res.json(prodFiltro) };
    res.status(404).json({ error: 'Producto no encontrado' })
});

/* ----  ACTUALIZAR PRODUCTO ---- */
router.put('/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    if (producto.update(id, data)) { res.status(201).json(data) }
    res.status(400).send();
})

/* ----  ELIMINAR PRODUCTO ---- */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    producto.delete(id);
    res.send()
})

export default router;