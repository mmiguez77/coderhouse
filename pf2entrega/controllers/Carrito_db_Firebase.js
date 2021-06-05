import FirebaseConfig from '../config/firebase.js'

export default class CarritoFirebase extends FirebaseConfig {

    /* ---- AGREGAR PRODUCTO ---- */
    addCart = async (req, res) => {
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
            res.status(200).json({ mensaje: "Producto Agregado al carrito" })
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewAllCart = async (req, res) => {
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
    viewByIdCart = async (req, res) => {
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
    deleteCart = async (req, res) => {
        try {
            const _id = await req.params.id
            const doc = this.query.doc(`${_id}`)
            let item = await doc.delete()
            return res.status(200).json({ mensaje: 'Producto eliminado' })
        } catch (error) {
            console.log(error)
        }
    }

   
}

