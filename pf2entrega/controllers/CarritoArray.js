import {productosArray} from './ProductoArray.js';
let cartArray = []


export default class ArrayCart {

    /* ---- AGREGAR PRODUCTO ---- */
    addCart = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar producto al carrito' });
            }
            const _id = await req.params.id
            let prodById = await productosArray.find(prod => prod._id == parseInt(_id))
            let prodToCart = prodById;
            cartArray.push(prodToCart);
            return res.status(200).json(prodToCart)
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewAllCart = (req, res) => {
        try {
            if (cartArray.length < 1) {
                return res.status(400).json({ mensaje: "No hay productos cargados" })
            };
            return res.status(200).json(cartArray);
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByIdCart = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            } else {
                const _id = await req.params.id
                let prodById = await cartArray.find(prod => prod._id == parseInt(_id))
                return res.status(200).json(prodById)
            }
        } catch (error) {
            console.log(error)
        }

    }

    /* ----  ELIMINAR PRODUCTO ---- */
    deleteCart = async (req, res) => {
        try {
            const _id = req.params.id
            const i = cartArray.findIndex(prod => prod._id == parseInt(_id))
            if (i !== -1) {
                let prodDrop = cartArray.splice(i, 1)
                return res.status(200).json(prodDrop)
            } else { return { error: 'producto no encontrado' } }
        } catch (error) {
            console.log(error)
        }
    }

}
