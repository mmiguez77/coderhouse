import FirebaseConfig from '../config/firebase.js'

export default class ProductoFirebase extends FirebaseConfig {

    /* ---- AGREGAR PRODUCTO ---- */
    add = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            }
            const doc = this.query.doc()
            await doc.create({
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail,
                code: req.body.code,
                stock: req.body.stock,
                description: req.body.description,
                timestamps: Date.now(),
            })
            res.status(200).json({ mensaje: "Producto Agregado" })
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewAll = async (req, res) => {
        try {
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                _id: doc.id,
                title: doc.data().title,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail,
                code: doc.data().code,
                stock: doc.data().stock,
                description: doc.data().description,
                timestamps: doc.data().timestamps
            }))
            console.log(response)
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByID = async (req, res) => {
        try {
            const _id = await req.params.id
            const doc = this.query.doc(`${_id}`)
            const item = await doc.get()
            const response = item.data()
            response._id = _id
            console.log(response)
            return res.status(200).json(response)

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
            const newProd = { _id, ...req.body }
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

