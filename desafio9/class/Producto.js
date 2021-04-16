import express from 'express';

const routerProducto = express.Router();

class Producto {
    
    constructor() {
        this.middleware();
        this.productosArray = [];
        this.prodId = 0;
    }

    middleware(){routerProducto.use(express.json())}

    /* ---- AGREGAR PRODUCTO ---- */
    agregarProducto() {
        return routerProducto.post('/', (req, res) => {
            const productoNuevo = req.body;
            productoNuevo.id = this.prodId++;
            this.productosArray.push(productoNuevo);
            res.status(201).json(productoNuevo);
        });
    }

    /* ---- LISTAR TOTAL DE PRODUCTOS ---- */
    // verProductos() {
    //     return routerProducto.get('/', (req, res) => {
    //         if (this.productosArray.length < 1) {
    //             res.status(404).json({ error: 'Productos no encontrados' })}
    //             res.json(this.productosArray);
    //     });
    // }
    /* ---- LISTAR PRODUCTO POR ID ---- */
    // verProductoPorId() {
    //     return routerProducto.get('/:id', (req, res) => {
    //         const { id } = req.params;
    //         const prodFiltro = this.productosArray.filter((prod) => prod.id === parseInt(id))[0];
    //         if (prodFiltro) { res.json(prodFiltro) }
    //         res.status(404).json({ error: 'Producto no encontrado' })});
    // }
    
    /* ----  ELIMINAR PRODUCTO ---- */
    // eliminarProducto(){
    //     return routerProducto.delete('/:id', (req, res) => {
    //         const { id } = req.params;
    //         USERS_DB = USERS_DB.filter((user) => user.id !== parseInt(id));
    //         res.send();
    //     })}

    /* ----  ACTUALIZAR PRODUCTO ---- */
    // actualizarProducto(){
    //     return routerProducto.post('/:id', (req, res) => {})
    // }
    
}

const nuevoProducto = new Producto;
export const agregarProducto = nuevoProducto.agregarProducto();
