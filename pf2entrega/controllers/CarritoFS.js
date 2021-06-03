import fs from 'fs'
export let carrito = []

export default class FsCart {

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
    addCart = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'No se pudo agregar producto al carrito de compra' });
            } else {
                let data = fs.readFileSync('productos.json')
                const prodById = JSON.parse(data)
                const _id = await req.params.id;
                let prodFiltro = await prodById.find(prod => prod._id == parseInt(_id))
                carrito.push(prodFiltro)
                this.saveJson(prodFiltro)
                res.status(200).json({ mensaje: `Produco cargado correctamente` })
            }
        } catch (err) {
            console.log(err);
        }
    }

    /* ---- VER TOTAL DE CARRITO ---- */
    viewAllCart = async (req, res) => {
        try {
            const viewCarrito = await this.readJson();
            if (!viewCarrito) { res.status(404).send({ error: 'No hay productos en el carrito' }) }
            res.status(200).json(viewCarrito)
        } catch (error) {
            console.log(error)
        }

    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByIdCart = async (req, res) => {
        try {
            const prodById = await this.readJson();
            const _id = await req.params.id;
            let prodFiltro = await prodById.find(prod => prod._id == parseInt(_id))
            if (prodFiltro) { return res.json(prodFiltro) };
            res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(error)
        }

    }

    /* ----  ELIMINAR PRODUCTO ---- */
    deleteCart = async (req, res) => {

        try {
            const _id = await req.params.id;
            let viewProdDrop = await this.readJson();
            let prodDrop = await viewProdDrop.filter(prod => prod._id !== parseInt(_id))
            this.saveJson(prodDrop)
            carrito.push(prodDrop)
            res.json(prodDrop)
            if (!prodDrop) { return { error: 'producto no encontrado' } }
        } catch (error) {
            console.log(error)
        }

    };

}