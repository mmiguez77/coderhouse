import CartModel from '../models/cartSchema.js';
import mail from '../helpers/nodemailer.js';
import logger from '../config/winston.js';
import { twilioWapp, twilioSms } from '../helpers/twilio.js';

export default class CarritoMongo {
    // agrega nuevo producto al carrito con datos del producto
    addCart = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            } else {
                const data = await { ...req.body };
                const newProducto = await CartModel.create(data);
                return res.status(200).json(newProducto);
            }
        } catch (error) {
            logger.error.error(error);
        }
    }

    // ver total de los productos en el carrito
    viewAllCart = async (req, res) => {
        try {
            const prod = await CartModel.find({});
            return res.status(200).json(prod);
        } catch (error) {
            logger.error.error(error);
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
            logger.error.error(error);
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
            logger.error.error(error);
        }
    };

    checkoutProduct = async (req, res) => {

        try {
            const products = { ...req.body };
            const user = req.user;
            const username = user.username;
            const email = 'blaze.mccullough70@ethereal.email' //user.email;

            const subjet = `Nuevo pedido de ${username} ${email}`;
            const text = `
            Compra realizada:
            - Cliente: ${username}
            - Contacto: ${email} 
            - Producto: ${products.title}
            - Precio: ${products.price}
            `;
            
            mail(email, subjet, text);
            twilioWapp(text);
            twilioSms("Pedido ha sido recibido y se encuentra en proceso")

            return res.status(200).json('Compra realizada con exito');
        } catch (error) {
            logger.error.error(error);
        }
    }
}