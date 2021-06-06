import fs from 'fs'
export let producto = []

export default class FsProducto {

    constructor() {
        this.createJson = this.readJson
        this.msg = console.log('*** Conectado a DB FS en Producto')
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
            if (!allProd) { res.status(404).send({ error: 'No hay producto' }) }
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
            const prodByName = await this.readJson();
            const title = await req.params.title;
            let prodFiltro = await prodByName.find(prod => prod.title == title)
            if (prodFiltro) { return res.status(200).json(prodFiltro) }
            res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(error)
        }
    }

    viewByCode = async (req, res) => {
        try {
            const prodByCode = await this.readJson();
            const code = await req.params.code;
            let prodFiltro = await prodByCode.find(prod => prod.code == code)
            if (prodFiltro) { return res.status(200).json(prodFiltro) }
            res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(error)
        }
    }

    orderByPrice = async (req, res) => {
        const condition = await req.params.condition
        const allProd = await this.readJson();

        function order(param) {
            if (param == 'asc') {
                res.status(200).json(allProd.sort(function (a, b) { return a.price - b.price }))
            }
            else if (param == 'desc') {
                res.status(200).json(allProd.sort(function (b, a) { return a.price - b.price }))
            } else {
                res.status(400).json({ mensaje: 'Error' })
            }
        }

        try {
            order(condition)
        } catch (error) {
            console.log(error)
        }
    }

    orderByStock = async (req, res) => {
        const stock = await req.params.stock
        const allProd = await this.readJson();

        function order(param) {
            if (param == 'asc') {
                res.status(200).json(allProd.sort(function (a, b) { return a.price - b.price }))
            }
            else if (param == 'desc') {
                res.status(200).json(allProd.sort(function (b, a) { return a.price - b.price }))
            } else {
                res.status(400).json({ mensaje: 'Error' })
            }
        }

        try {
            order(stock)
        } catch (error) {
            console.log(error)
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