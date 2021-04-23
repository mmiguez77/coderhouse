class ProductoController {
    
    constructor() {
        this.productosArray = [{
            "title": "Lechuga3",
            "price": 50,
            "thumbnail": "http://www.img.com/lechuga3.jpg",
            "id": 1
        },
        {
            "title": "123",
            "price": "123",
            "thumbnail": "123",
            "id": 2
        }];
    }

    /* ---- AGREGAR PRODUCTO ---- */
    agregarProducto(data) {
        data.id = this.productosArray.length + 1;
        this.productosArray.push(data);
        return true 
    }
    
    /* ---- VER TOTAL DE PRODUCTOS ---- */
    verProductos() {
        if (this.productosArray.length < 1) return false;
        return this.productosArray;
    }

    /* ---- VER PRODUCTO POR ID ---- */
    verProductoPorId(id) {
        return this.productosArray.filter((prod) => prod.id === parseInt(id))[0]
    }
    
    /* ----  ELIMINAR PRODUCTO ---- */
    eliminarProducto(id){
        return this.productosArray = this.productosArray.filter((prod) => prod.id !== parseInt(id));
    }

    /* ----  ACTUALIZAR PRODUCTO ---- */
    actualizarProducto(id, data){
        this.productosArray = this.productosArray.map(prod => {
            if ( prod.id === parseInt(id)) {
                prod.title = data.title;
                prod.price = data.price;
                prod.thumbnail = data.thumbnail;
            }
            return prod
        });
    }

    /* ---- FUNCION QUE VALIDA BOOLEAN PARA HANDLEBARS ---- */
    validar(){
        if (this.productosArray.length >= 1){
            return true
        }   else  {
            return false
        }
    }

      
}

export default ProductoController

