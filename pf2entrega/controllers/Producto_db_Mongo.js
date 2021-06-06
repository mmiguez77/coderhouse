import ProductoModel from '../models/productoSchema.js';
import MongooseCnx from '../config/mongoose.js'

export default class ProductoMongo extends MongooseCnx {

    /* ---- AGREGAR PRODUCTO ---- */
    add = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            } else {
                const data = await { ...req.body };
                const newProducto = await ProductoModel.create(data);
                return res.status(200).json(newProducto)
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewAll = async (req, res) => {
        try {
            const prod = await ProductoModel.find({});
            return res.status(200).json(prod);

        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByID = async (req, res) => {
        const _id = req.params.id;
        try {
            if (_id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado', error });
            } else {
                const prodById = await ProductoModel.findOne({ _id });
                return res.status(200).json(prodById);
            };
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
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
            const byPrice = await ProductoModel.find().sort({ price: parseInt(req.params.condition) })
            return res.status(200).json(byPrice)
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    orderByStock = async (req, res) => {
        try {
            const byStock = await ProductoModel.find().sort({ stock: parseInt(req.params.stock) })
            return res.status(200).json(byStock)
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    /* ----  ELIMINAR PRODUCTO ---- */
    drop = async (req, res) => {
        const _id = req.params.id;
        try {
            if (_id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            } else {
                const prodToDel = await ProductoModel.findByIdAndDelete({ _id });
                if (!prodToDel) { return res.status(404).json({ mensaje: 'Producto no encontrado' }); }
                return res.status(200).json(prodToDel);
            };
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    };

    /* ----  ACTUALIZAR PRODUCTO ---- */
    update = async (req, res) => {

        const _id = req.params.id;
        const data = { ...req.body };

        try {
            const prodUpdated = await ProductoModel.findByIdAndUpdate(_id, data, { new: true });
            return res.status(200).json(prodUpdated)
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }

    }


}