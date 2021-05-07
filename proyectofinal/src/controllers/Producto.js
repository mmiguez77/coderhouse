class Producto {

    constructor() {
        this.productos = [
            {
                title: "Té",
                price: 30,
                thumbnail: "https://cdn0.iconfinder.com/data/icons/interior-and-decor-vol-1-1/512/13-128.png"
            }
        ]
    }

    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewAll(req, res) {
        try {
            res.send(this.productos)
            console.log(this.productos)
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: 'Productos no encontrado' })
        }
    }


    /*  add(data) {
         data.id = productosArray.length + 1;
         let newProducto = { ...data, id: data.id };
         productosArray.push(newProducto);
         return newProducto
     }
 
 
 
     
     viewByID(id) { return productosArray.filter((prod) => prod.id === parseInt(id))[0] }
 
     
     delete(id) {
         const i = productosArray.findIndex(prod => prod.id == parseInt(id))
         if (i !== -1) {
             return productosArray.splice(i, 1)
         } else { return { error: 'producto no encontrado' } }
     }
 
     
     update(id, data) {
         productosArray = productosArray.map(prod => {
             if (prod.id === parseInt(id)) {
                 prod.title = data.title;
                 prod.price = data.price;
                 prod.thumbnail = data.thumbnail;
             }
             return prod
         });
     } */
}

export default Producto