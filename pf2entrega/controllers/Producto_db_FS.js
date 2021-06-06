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
                let newProd = { ...req.body, _id, timestamp }
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

    viewByName = async (req, res) => {
        try {
            const prodByName = await ProductoModel.find({ title: { $eq: req.params.title } }, (error, data) => {
                if (error) {
                    console.log(error)
                } else {
                    return res.status(200).json(data)
                }
            });
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    viewByCode = async (req, res) => {
        try {
            const prodByCode = await ProductoModel.find({ code: { $eq: req.params.code } }, (error, data) => {
                if (error) {
                    res.status(400).json({ mensaje: 'Error', error })
                } else {
                    return res.status(200).json(data)
                }
            });
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    orderByPrice = async (req, res) => {
        try {
            const byPrice = await ProductoModel.find().sort({ price: parseInt(req.params) })
            return res.status(200).json(byPrice)
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    orderByStock = async (req, res) => {
        try {
            const byStock = await ProductoModel.find().sort({ stock: parseInt(req.params) })
            return res.status(200).json(byStock)
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    /* ----  ELIMINAR PRODUCTO ---- */
    drop = async (req, res) => {
        try {
            const _id = await req.params.id;
            let viewProdDrop = await this.readJson();
            let prodDrop = await viewProdDrop.filter(prod => prod._id !== parseInt(_id))
            this.saveJson(prodDrop)
            producto.push(prodDrop)
            res.status(200).json(prodDrop)
            if (!prodDrop) { return { error: 'producto no encontrado' } }
        } catch (error) {
            console.log(error)
        }
    };

    /* ----  ACTUALIZAR PRODUCTO ---- */
    update = async (req, res) => {
        try {
            const _id = await req.params.id;
            const data = await { ...req.body };
            let viewProdUpdate = await this.readJson();
            viewProdUpdate = await viewProdUpdate.map(prod => {
                if (prod._id == parseInt(_id)) {
                    prod.title = data.title;
                    prod.price = data.price;
                    prod.stock = data.stock;
                    prod.thumbnail = data.thumbnail;
                    prod.code = data.code;
                    prod.description = data.description;
                }
                this.saveJson(viewProdUpdate)
                producto.push(viewProdUpdate)
                res.status(200).json(viewProdUpdate)
            });
        } catch (error) {
            console.log(error)
        }
    }
}