import fs from 'fs'
export let carrito = []

class FsCart {

    constructor() {
        this.createJson = this.readJson
    }

    readJson = () => {
        if (!fs.existsSync('cart.json')) {
            fs.writeFileSync('cart.json', JSON.stringify(carrito))
        } else {
            let data = fs.readFileSync('cart.json')
            return JSON.parse(data)
        }
    }

    saveJson = (data) => {
        let stringifyData = JSON.stringify(data)
        fs.writeFileSync('cart.json', stringifyData)
    }
   

    /* ---- AGREGAR PRODUCTO AL CARRITO---- */
   addToCart = async (req, res) => {
        const producto = await { ...req.body };
        const idCart = await req.body._id;
        const timestampCart = Date.now();
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'No se pudo agregar producto al carrito de compra' });
            } else {
                const newProdToCart = { producto, idCart, timestampCart }
                //console.log(newProdToCart)
                carrito.push(newProdToCart)
                readJson()
                saveJson(carrito)
                res.status(200).json({ mensaje: `Produco cargado corretamente` })
            }
        } catch (err) {
            console.log(err);
        }
    }

    /* ---- VER TOTAL DE CARRITO ---- */
    viewAllCart = async (req, res) => {
        const viewCarrito = await readJson();
        if (!viewCarrito) { res.status(404).send({ error: 'No hay productos en el carrito' }) }
        res.status(200).json(viewCarrito)
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByIDCart = (req, res) => {
        const viewCarrito = readJson();
        const { id } = req.params;
        let prodFiltro = viewCarrito.filter((prod) => prod.idCart === parseInt(id))[0]
        if (prodFiltro) { return res.json(prodFiltro) };
        res.status(404).json({ error: 'Producto no encontrado' })
    }

    /* ----  ELIMINAR PRODUCTO ---- */
    dropCart = (req, res) => {
        const { id } = req.params;
        let viewProdDrop = readJson();
        let prodDrop = viewProdDrop.filter(prod => prod.idCart != req.params.id)
        saveJson(prodDrop)
        carrito.push(prodDrop)
        //console.log('Producto que quedan', prodDrop)
        res.json(prodDrop)
        res.redirect('/cart')
        if (!prodDrop) { return { error: 'producto no encontrado' } }
    };

}