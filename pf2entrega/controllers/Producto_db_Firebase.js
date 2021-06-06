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

    viewByName = async (req, res) => {
        try {
            const title = await req.params.title
            const doc = await this.query.where('title', '==', title).get()

            doc.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                const response = (doc.id, '=>', doc.data())
                response._id = doc.id
                return res.status(200).json(response)
            });

        } catch (error) {
            console.log(error)
        }
    }

    viewByCode = async (req, res) => {
        try {
            const code = await req.params.code
            const doc = await this.query.where('code', '==', code).get()

            doc.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                const response = (doc.id, '=>', doc.data())
                response._id = doc.id
                return res.status(200).json(response)
            });

        } catch (error) {
            console.log(error)
        }
    }

    orderByPrice = async (req, res) => {
        
        const condition = req.params.condition
        try {
            const querySnapshot = await this.query.orderBy('price', condition).get()
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

    orderByStock = async (req, res) => {
        const stock = req.params.stock
        try {
            const querySnapshot = await this.query.orderBy('stock', stock).get()
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

    /* ----  ELIMINAR PRODUCTO ---- */
    drop = async (req, res) => {
        try {
            const _id = await req.params.id
            const doc = this.query.doc(`${_id}`)
            let item = await doc.delete()
            return res.status(200).json({ mensaje: 'Producto eliminado' })
        } catch (error) {
            console.log(error)
        }
    }

    /* ----  ACTUALIZAR PRODUCTO ---- */
    update = async (req, res) => {
        try {
            const _id = await req.params.id
            const doc = this.query.doc(`${_id}`)
            let item = await doc.update({
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail,
                code: req.body.code,
                stock: req.body.stock,
                description: req.body.description
            })
            return res.status(200).json({ item })
        } catch (error) {
            console.log(error)
        }
    }
}

