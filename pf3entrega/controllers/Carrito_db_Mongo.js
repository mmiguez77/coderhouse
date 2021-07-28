import CartModel from '../models/cartSchema.js';

export default class CarritoMongo {
    // agrega nuevo producto al carrito con datos del producto
    addCart = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            } else {
                const data = await { ...req.body };
                //console.log(data);
                const newProducto = await CartModel.create(data);
                return res.status(200).json(newProducto)
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