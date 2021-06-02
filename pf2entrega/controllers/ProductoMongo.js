import ProductoModel from '../models/productoSchema.js';

/* ---- AGREGAR PRODUCTO ---- */
export const add = async (req, res) => {
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
export const viewAll = async (req, res) => {
    try {
        const prod = await ProductoModel.find({});
        return res.status(200).json(prod);

    } catch (error) {
        return res.status(400).json({ mensaje: 'Ocurrió un error', error })
    }
}

/* ---- VER PRODUCTO POR ID ---- */
export const viewByID = async (req, res) => {
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

/* ----  ELIMINAR PRODUCTO ---- */
export const drop = async (req, res) => {
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
export const update = async (req, res) => {

    const _id = req.params.id;
    const data = { ...req.body };

    try {
        const prodUpdated = await ProductoModel.findByIdAndUpdate(_id, data, {new: true });
        return res.status(200).json(prodUpdated)
    } catch (error) {
        return res.status(400).json({ mensaje: 'Ocurrió un error', error })
    }


}