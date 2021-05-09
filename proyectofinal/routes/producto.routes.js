import express from 'express';
const productosRoutes = express.Router();
import { productos, add, viewAll } from '../controllers/Producto.js';

productosRoutes.get('/', (req, res) => { res.render('pages/productos', { prods: productos }) })

productosRoutes.get('/', viewAll)

productosRoutes.post('/', add)


/*
routerProduct.get('/', (req, res) => {
    const productos = producto.findAll();
    if (!productos) {
        return res.status(404).json({ error: 'Productos no encontrado' })
    } res.json(productos);
});


routerProduct.get('/:id', (req, res) => {
    const { id } = req.params;
    const prodFiltro = producto.findByID(id);
    if (prodFiltro) { return res.json(prodFiltro) };
    res.status(404).json({ error: 'Producto no encontrado' })
});


routerProduct.put('/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    if (producto.update(id, data)) { res.status(201).json(data) }
    res.status(400).send();
})


routerProduct.delete('/:id', (req, res) => {
    const { id } = req.params;
    producto.delete(id);
    res.send()
}) */

export default productosRoutes;