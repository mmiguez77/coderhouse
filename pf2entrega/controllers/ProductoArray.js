export default class Array {

contructor () {
    this.productosArray = []
}

/* ---- AGREGAR PRODUCTO ---- */
add = async (req, res) => {
    try {
        if(!req){
            return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
        }
    const data = await { ... req.body}
    const {id} = this.productosArray.length + 1;
    let newProducto = await { ...data, id };
    this.productosArray.push(newProducto);
    return res.status(200).json(newProducto)    
    } catch (error) {
        console.log(error)
    }
    
}

/* ---- VER TOTAL DE PRODUCTOS ---- */
viewAll = () => {
    try {
    if (this.productosArray.length < 1) return false;
    return res.status(200).json(this.productosArray);
    } catch (error) {
        console.log(error)
    }
}

/* ---- VER PRODUCTO POR ID ---- */
viewByID = async (req, res) => { 
    try {
        if(!req)
            return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
    const {id} = req.params
    let prodById = this.productosArray.filter((prod) => prod.id === parseInt(id))[0] 
    return res.status(200).json(prodById)
    } catch (error) {
        console.log(error)
    }
    
}

/* ----  ELIMINAR PRODUCTO ---- */
drop = async (req,res) => {
    try {
        const {id} = req.params
    const i = this.productosArray.findIndex(prod => prod.id == parseInt(id))
    if (i !== -1) {
        let prodDrop = this.productosArray.splice(i, 1)
        return res.status(200).json(prodDrop)
    } else { return { error: 'producto no encontrado' } }
    } catch (error) {
        console.log(error)
    }
}

/* ----  ACTUALIZAR PRODUCTO ---- */
update = async (req, res) => {
    try {
        const {id} = await req.params
    const data = await {... req.body}
    this.productosArray = this.productosArray.map(prod => {
        if (prod.id === parseInt(id)) {
            prod.title = data.title;
            prod.price = data.price;
            prod.thumbnail = data.thumbnail;
        }
        return res.status(200).json(prod)
    })
    } catch (error) {
        console.log(error)
    }    
}


}

