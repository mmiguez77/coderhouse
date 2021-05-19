//export let productosArray = []

class ProductoController {
    constructor() {
        this.productosArray = [];
    }
    
    /* ---- AGREGAR PRODUCTO ---- */
    add(data) {
        data.id = this.productosArray.length + 1;
        let newProducto = { ...data, id: data.id };
        this.productosArray.push(newProducto);
        return newProducto 
    }
    
    /* ---- VER TOTAL DE PRODUCTOS ---- */
    findAll() {
        if (this.productosArray.length < 1) return false;
        return this.productosArray;
    }

    /* ---- VER PRODUCTO POR ID ---- */
    findByID(id) {return this.productosArray.filter((prod) => prod.id === parseInt(id))[0]}
    
    /* ----  ELIMINAR PRODUCTO ---- */
    delete(id){
        const i = this.productosArray.findIndex(prod => prod.id == parseInt(id))
        if (i !== -1) {return this.productosArray.splice(i, 1)
        } else {return { error: 'producto no encontrado' }}
    }

    /* ----  ACTUALIZAR PRODUCTO ---- */
    update(id, data){
        this.productosArray = this.productosArray.map(prod => {
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