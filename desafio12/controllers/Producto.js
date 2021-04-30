export let productosArray = [{
    title: "manzana",
    price: 123,
    thumbnail: "www.mzn.jpg"
}]

class ProductoController {
    constructor() {}
    
    /* ---- AGREGAR PRODUCTO ---- */
    addProducto(data, res) {
        data.id = productosArray.length + 1;
        let newProducto = { ...data, id: data.id };
        console.log ('log Class', newProducto);
        productosArray.push(newProducto) 
    }
        
    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewProductos() {
        if (productosArray.length < 1) return false;
        return productosArray;
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewProductoPorId(id) {return productosArray.filter((prod) => prod.id === parseInt(id))[0]}
    
    /* ----  ELIMINAR PRODUCTO ---- */
    deleteProducto(id){
        const i = productosArray.findIndex(prod => prod.id == parseInt(id))
        if (i !== -1) {return productosArray.splice(i, 1)
        } else {return { error: 'producto no encontrado' }}
    }

    /* ----  ACTUALIZAR PRODUCTO ---- */
    updateProducto(id, data){
        productosArray = productosArray.map(prod => {
            if ( prod.id === parseInt(id)) {
                prod.title = data.title;
                prod.price = data.price;
                prod.thumbnail = data.thumbnail;
            }
            return prod
        });
    }
}

export default ProductoController



/* ---- AGREGAR PRODUCTO ---- */
// router.post('/', (req, res) => {
    
    
//     if (producto.addProducto(data)) {
//         if (!data.title == "") {res.redirect('/')}
//     }
//     res.status(400).send();
// });

/* ---- VER TOTAL DE PRODUCTOS ---- */
// router.get('/', (req, res) => {
//     const productos = producto.viewProductos();
//     if (!productos) {
//         return res.status(404).json({ error: 'Productos no encontrado' })
//     } res.json(productos);
// });

/* ---- VER PRODUCTO POR ID ---- */
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     const prodFiltro = producto.viewProductoPorId(id);
//     if (prodFiltro) { return res.json(prodFiltro) };
//     res.status(404).json({ error: 'Producto no encontrado' })
// });

/* ----  ACTUALIZAR PRODUCTO ---- */
// router.put('/:id', (req, res) => {
//     const data = req.body;
//     const { id } = req.params;
//     if (producto.updateProducto(id, data)) { res.status(201).json(data) }
//     res.status(400).send();
// })

/* ----  ELIMINAR PRODUCTO ---- */
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     producto.deleteProducto(id);
//     res.send()
// })