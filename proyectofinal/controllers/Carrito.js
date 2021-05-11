import fs from 'fs'
/* -------  ADICIONALES  -------- */

export let carrito = []

const readJson = () => {

    if (!fs.existsSync('cart.json')) {
        fs.writeFileSync('cart.json', JSON.stringify(carrito))
    } else {
        let data = fs.readFileSync('cart.json')
        return JSON.parse(data)
    }
}

const saveJson = (data) => {
    let stringifyData = JSON.stringify(data)
    fs.writeFileSync('cart.json', stringifyData)
}
/*------------------------------------------------*/

/* ---- AGREGAR PRODUCTO AL CARRITO---- */
export const addCart = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ error: 'No se pudo agregar producto al carrito de compra' });
        } else {
            const productoById = JSON.parse(fs.readFileSync('productos.json'));
            const { id } = await req.params;
            //console.log('ID PARAMS', parseInt(id))
            let prodFiltro = productoById.filter((prod) => prod.id === parseInt(id))[0]
            //console.log('PROD FILTRADO', prodFiltro.id)
            if (parseInt(id) === prodFiltro.id) {
                prodFiltro.idCart = carrito.length + 1
                prodFiltro.timestampCart = new Date()
                //console.log('ID TIMESTAMP' ,idCart, timestampCart)
                carrito.push(prodFiltro)
                saveJson(carrito)
                res.redirect('/cart')
                res.json(`${prodFiltro.title} cargado corretamente`)
            }

        }
    } catch (err) {
        console.log(err);
    }
}

/* ---- VER TOTAL DE CARRITO ---- */
export const viewAllCart = (req, res) => {
    const viewCarrito = readJson();
    console.log('VIEW ALL CART',viewCarrito)
    if (!viewCarrito) { res.status(404).send({ error: 'No hay productos en el carrito' }) }
    res.render('pages/carrito', {prods: viewCarrito})
}

/* ---- VER PRODUCTO POR ID ---- */
export const viewByIDCart = (req, res) => {
    const viewCarrito = readJson();
    const { id } = req.params;
    let prodFiltro = viewCarrito.filter((prod) => prod.id === parseInt(id))[0]
    if (prodFiltro) { return res.json(prodFiltro) };
    res.status(404).json({ error: 'Producto no encontrado' })

    //console.log('viewById',prodFiltro)
}

/* ----  ELIMINAR PRODUCTO ---- */
export const dropCart = (req, res) => {
    const { id } = req.params;
    let viewProdDrop = readJson();
    let prodDrop = viewProdDrop.filter(prod => prod.id != req.params.id)
    saveJson(prodDrop)
    carrito.push(prodDrop)
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
        carrito.push(viewProdUpdate)
        //console.log('Producto actualizado', viewProdUpdate)
        res.json(viewProdUpdate)
    });
}