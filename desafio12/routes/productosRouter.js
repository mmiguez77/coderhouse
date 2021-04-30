import express from 'express';
import ProductoController from '../controllers/Producto.js';
const router = express.Router();
const producto = new ProductoController();

// Middlewares
router.use(express.json());
router.unsubscribe(express.urlencoded({ extended: true }));

/* ---- AGREGAR PRODUCTO ---- */
router.post('/', (req, res) => {
    const data = req.body;
    //console.log('data', data.title)
    res.json(producto.addProducto(data)); 

    /***** UNA VEZ QUE CARGO UN PRODUCTO DESDE EL POST A '/PRODUCTO' NO PUEDO HACER QUE
    REDIRECCIONE AL DIR '/', ANTES LA LOGICA LA HACIA DESDE ACA CON {res.redirect('/')}
    PERO AHORA TODA LA LOGICA DEBE ESTAR EN LA CLASS PRODUCTO.JS 
    O ¿TODA LA DATA LA TENGO QUE TRAER DESDE EL WEB SOCKET Y QUE ASI SEA A TIEMPO REAL
    Y DESDE ALLI LLEVARLA A LA CLASS, QUE HAGA TODA LA LOGICA Y REGRESARLA?*/
            
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