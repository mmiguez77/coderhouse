import express from 'express';
import ProductoController from '../controllers/Producto.js';
const router = express.Router();
const producto = new ProductoController();

router.use(express.json());
router.unsubscribe(express.urlencoded({ extended: true }));

/* ---- AGREGAR PRODUCTO ---- */
router.post('/', (req, res) => {
    const data = req.body;
    res.json(producto.addProducto(data))
});

/* ---- VER TOTAL DE PRODUCTOS ---- */
router.get('/', (req, res) => {
    res.json(producto.viewProductos())
});

/* ---- VER PRODUCTO POR ID ---- */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json(producto.viewProductoPorId(id));
});

/* ----  ACTUALIZAR PRODUCTO ---- */
router.put('/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    res.json(producto.updateProducto(data,id))
})

/* ----  ELIMINAR PRODUCTO ---- */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json(producto.deleteProducto(id));
})

export default router;