let productosArray = []

export default class Array {

    /* ---- AGREGAR PRODUCTO ---- */
    add = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            }
            const data = await { ...req.body }
            const _id = productosArray.length + 1;
            const timestamps = Date.now();
            let newProducto = await { ...data, _id, timestamps };
            productosArray.push(newProducto);
            return res.status(200).json(newProducto)
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewAll = (req, res) => {
        try {
            if (productosArray.length < 1) {
                return res.status(400).json({ mensaje: "No hay productos cargados" })
            };
            return res.status(200).json(productosArray);
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByID = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            } else {
                const _id = await req.params.id
                let prodById = await productosArray.find(prod => prod._id == parseInt(_id))
                return res.status(200).json(prodById)
            }
        } catch (error) {
            console.log(error)
        }

    }

    /* ----  ELIMINAR PRODUCTO ---- */
    drop = async (req, res) => {
        try {
            const _id = req.params.id
            const i = productosArray.findIndex(prod => prod._id == parseInt(_id))
            if (i !== -1) {
                let prodDrop = productosArray.splice(i, 1)
                return res.status(200).json(prodDrop)
            } else { return { error: 'producto no encontrado' } }
        } catch (error) {
            console.log(error)
        }
    }

    /* ----  ACTUALIZAR PRODUCTO ---- */
    update = async (req, res) => {
        try {
            const _id = await req.params.id
            const newProd = { _id, ... req.body }
            const index = productosArray.findIndex(p => p._id == _id)
            if (index !== -1) {
                productosArray.splice(index, 1, newProd)
                return res.status(200).json(newProd)
            } else {
                return { error: 'producto no encontrado' }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

