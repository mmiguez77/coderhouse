import fs from 'fs'
/* -------  ADICIONALES  -------- */

export let productos = []

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
            res.redirect('/productos')
            res.json(`${newProducto.title} cargado corretamente`)
        }
    } catch (err) {
        console.log(err);
    }
}

/* ---- VER TOTAL DE PRODUCTOS ---- */
export const viewAll = (req, res) => {
    const viewProductos = readJson();
    console.log('view prod',viewProductos)
    if (!viewProductos) { res.status(404).json({ error: 'Producto no encontrado' }) }
    // productos.push(viewProductos)
    //res.json(viewProductos)
    res.render('pages/productos', {prods: viewProductos})
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
    let viewProdDrop = readJson();
    let prodDrop = viewProdDrop.filter(prod => prod.id != req.params.id)
    saveJson(prodDrop)
    productos.push(prodDrop)
    //console.log('Producto que quedan', prodDrop)
    res.json(prodDrop)
    if (!prodDrop) { return { error: 'producto no encontrado' } }
};

/* ----  ACTUALIZAR PRODUCTO ---- */
export const update = (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };
    let viewProdUpdate = readJson();
    viewProdUpdate = viewProdUpdate.map(prod => {
        if (prod.id === parseInt(id)) {
            prod.title = data.title;
            prod.price = data.price;
            prod.stock = data.stock;
            prod.thumbnail = data.thumbnail;
            prod.code = data.code;
            prod.description = data.description;
        }
        saveJson(viewProdUpdate)
        productos.push(viewProdUpdate)
        //console.log('Producto actualizado', viewProdUpdate)
        res.json(viewProdUpdate)
    });
}