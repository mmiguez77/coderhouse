export let productosArray = [{
    "id": 1,
    "title":"Pepsi",
    "price":20,
    "thumbnail":"https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/49-pepsi-128.png"},]

class ProductoController {
    constructor() {}
    
    /* ---- AGREGAR PRODUCTO ---- */
    addProducto(data) {
        data.id = productosArray.length + 1;
        let newProducto = { ...data, id: data.id };
        console.log ('console.log de newProducto en Class Producto:',newProducto)
        productosArray.push(newProducto);
        return newProducto 
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