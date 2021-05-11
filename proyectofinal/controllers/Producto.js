import fs from 'fs'
/* ------- FUNCIONES ADICIONALES  -------- */

let productos = []

const readJson = () => {

    if (!fs.existsSync('productos.json')) {
        fs.writeFileSync('productos.json', JSON.stringify(productos))
    } else {
        let data = fs.readFileSync('productos.json')
        return JSON.parse(data)
    }
}

const saveJson = (data) => {
    let stringifyData = JSON.stringify(data)
    fs.writeFileSync('productos.json', stringifyData)
}


/*------------------------------------------------*/

/* ---- AGREGAR PRODUCTO ---- */
export const add = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Campos incompletos' });
        } else {
            let newProducto = await { ...req.body };
            newProducto.id = productos.length + 1;
            newProducto.timestamp = new Date();
            productos.push(newProducto)
            //console.log('Productos en Array', productos)
            saveJson(productos);
            res.json(`${newProducto.title} cargado corretamente`)
        }
    } catch (err) {
        console.log(err);
    }
}

/* ---- VER TOTAL DE PRODUCTOS ---- */
export const viewAll = (req, res) => {
    const viewProductos = readJson();
    if (!viewProductos) { res.status(404).json({ error: 'Producto no encontrado' }) }
    res.json(viewProductos)
    //res.render('pages/productos', { prods: productos })
}

/* ---- VER PRODUCTO POR ID ---- */
export const viewByID = (req, res) => {
    const viewProductos = readJson();
    const { id } = req.params;
    let prodFiltro = viewProductos.filter((prod) => prod.id === parseInt(id))[0]
    if (prodFiltro) { return res.json(prodFiltro) };
    res.status(404).json({ error: 'Producto no encontrado' })

    //console.log('viewById',prodFiltro)
}

/* ----  ELIMINAR PRODUCTO ---- */
export const drop = (req, res) => {
    const { id } = req.params;
    const viewProdDrop = readJson();
    let prodDrop = viewProdDrop.filter(prod => prod.id != req.params.id)
    saveJson(prodDrop)
    console.log('Producto que quedan', prodDrop)
    res.json(prodDrop)
    if (!prodDrop) { return { error: 'producto no encontrado' } }
};


    // delete (req, res, id){
    //     const i = productos.findIndex(prod => prod.id == parseInt(id))
    //         if (i !== -1) {
    //             const arrayToJson = JSON.stringify(productos);
    //             fs.writeFileSync('productos.json', arrayToJson, 'utf-8')
    //             res.redirect('/')
    //             return productos.splice(i, 1)
    //         } else {
    //             return { error: 'producto no encontrado' }
    //         }
    // }

/* ----  ACTUALIZAR PRODUCTO ---- */
    // update(req, res, id){
    //     productos = productos.map(prod => {
    //         if (prod.id === parseInt(id)) {
    //             prod.title = req.body.title;
    //             prod.price = req.body.price;
    //             prod.thumbnail = req.body.thumbnail;
    //             prod.code = req.body.code;
    //             prod.description = req.body.description;
    //         }
    //         return prod
    //     });
    //     }