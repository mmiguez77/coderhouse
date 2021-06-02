import fs from 'fs'
export let producto = []

export default class FsProducto {

    constructor() {
        this.createJson = this.readJson
    }

    readJson = () => {
        if (!fs.existsSync('productos.json')) {
            fs.writeFileSync('productos.json', JSON.stringify(producto))
        } else {
            let data = fs.readFileSync('productos.json')
            return JSON.parse(data)
        }
    }

    saveJson = (data) => {
        let stringifyData = JSON.stringify(data)
        fs.writeFileSync('productos.json', stringifyData)
    }

    /* ---- AGREGAR PRODUCTO AL CARRITO---- */
    add = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'No se pudo agregar producto' });
            } else {
                const _id = producto.length + 1;
                const timestamp = Date.now();
                const newProd = { ...req.body, _id, timestamp }
                producto.push(newProd)
                this.saveJson(producto)
                res.status(200).json(newProd)
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* ---- VER TOTAL ---- */
    viewAll = async (req, res) => {
        try {
            const allProd = await this.readJson();
            if (!allProd) { res.status(404).send({ error: 'No hay productos en el carrito' }) }
            res.status(200).json(allProd)
        } catch (error) {
            console.log(error)
        }

    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByID = async (req, res) => {
        try {
            const prodById = await this.readJson();
            const _id = await req.params.id;
            let prodFiltro = await prodById.find(prod => prod._id == parseInt(_id))
            if (prodFiltro) { return res.status(200).json(prodFiltro) }
            res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(error)
        }
    }

    /* ----  ELIMINAR PRODUCTO ---- */
    drop = async (req, res) => {
        try {
            const _id = req.params.id;
            let viewProdDrop = this.readJson();
            let prodDrop = producto.filter(prod => prod._id != req.params.id)
            this.saveJson(prodDrop)
            producto.push(prodDrop)
            res.json(prodDrop)
            if (!prodDrop) { return { error: 'producto no encontrado' } }
        } catch (error) {
            console.log(error)
        }
    };

    /* ----  ACTUALIZAR PRODUCTO ---- */
    // update = (req, res) => {
    //     const { id } = req.params;
    //     const data = { ...req.body };
    //     let viewProdUpdate = readJson();
    //     viewProdUpdate = viewProdUpdate.map(prod => {
    //         if (prod.id === parseInt(id)) {
    //             prod.title = data.title;
    //             prod.price = data.price;
    //             prod.stock = data.stock;
    //             prod.thumbnail = data.thumbnail;
    //             prod.code = data.code;
    //             prod.description = data.description;
    //         }
    //         saveJson(viewProdUpdate)
    //         carrito.push(viewProdUpdate)
    //         //console.log('Producto actualizado', viewProdUpdate)
    //         res.json(viewProdUpdate)
    //     });
    // }

}