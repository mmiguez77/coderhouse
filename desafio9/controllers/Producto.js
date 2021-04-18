let productosArray = [];

class ProductoController {
    
    constructor() {}

    /* ---- AGREGAR PRODUCTO ---- */
    agregarProducto(data) {
        data.id = productosArray.length + 1;
        productosArray.push(data);
        return true;
    }
    
    /* ---- VER TOTAL DE PRODUCTOS ---- */
    verProductos() {
        if (productosArray.length < 1) return false;
        return productosArray;
    }

    /* ---- VER PRODUCTO POR ID ---- */
    verProductoPorId(id) {
        return productosArray.filter((prod) => prod.id === parseInt(id))[0]
    }
    
    /* ----  ELIMINAR PRODUCTO ---- */
    eliminarProducto(id){
        return productosArray = productosArray.filter((prod) => prod.id !== parseInt(id));
    }

    /* ----  ACTUALIZAR PRODUCTO ---- */
    actualizarProducto(id, data){
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

module.exports = new ProductoController();
