import CartModel from '../models/cartSchema.js';
import ProductoModel from '../models/productoSchema.js';

export default class Cart {

    // agrega nuevo producto al carrito con datos del producto
    addCart = async (req, res) => {
        try {
            const _id = req.params.id;
            const prodById = await ProductoModel.findOne({ _id });
            console.log('CARRITO MONGO', prodById)
            if (!prodById) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar producto', error });
            } else {
                const productoInCart = await CartModel.create({
                    title: prodById.title,
                    price: prodById.price,
                    stock: prodById.stock,
                    thumbnail: prodById.thumbnail,
                    code: prodById.code,
                    description: prodById.description
                });
                return res.status(200).json(productoInCart)
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    // ver total de los productos en el carrito
    viewAllCart = async (req, res) => {
        try {
            const prod = await CartModel.find({});
            return res.status(200).json(prod);

        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    // muestra productos por ID
    viewByIdCart = async (req, res) => {
        const _id = req.params.id;
        try {
            if (_id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado', error });
            } else {
                const prodById = await CartModel.findOne({ _id });
                return res.status(200).json(prodById);
            };
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    // elimina un producto segun el Id enviado
    deleteCart = async (req, res) => {
        const _id = req.params.id;
        try {
            if (_id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            } else {
                const prodToDel = await CartModel.findByIdAndDelete({ _id });
                if (!prodToDel) { return res.status(404).json({ mensaje: 'Producto no encontrado' }); }
                return res.status(200).json(prodToDel);
            };
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    };


}