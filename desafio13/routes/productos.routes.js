const express = require('express');
const {add, del, findAll, findByID, update} = require ('../controllers/Producto.js');
const router = express.Router();


/* ---- AGREGAR PRODUCTO ---- */
router.post('/', (req, res) => {
    const data = req.body;
    if (add(data)) {
        if (!data.title == "") { res.redirect('/') }
    }
});

/* ---- VER TOTAL DE PRODUCTOS ---- */
router.get('/', (req, res) => {
    const productos = findAll();
    if (!productos) {
        return res.status(404).json({ error: 'Productos no encontrado' })
    } res.json(productos);
});

/* ---- VER PRODUCTO POR ID ---- */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const prodFiltro = findByID(id);
    if (prodFiltro) { return res.json(prodFiltro) };
    res.status(404).json({ error: 'Producto no encontrado' })
});

/* ----  ACTUALIZAR PRODUCTO ---- */
router.put('/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    if (update(id, data)) { res.status(201).json(data) }
    res.status(400).send();
})

/* ----  ELIMINAR PRODUCTO ---- */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    del(id);
    res.send()
})

module.exports = router;