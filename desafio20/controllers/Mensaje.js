import MensajeModel from '../models/mensajeSchema.js';
import { v4 as uuidv4 } from 'uuid';

class Mensaje {

    constructor() { }

    async addMsg(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            const data = await { ...req }
            const mensaje = {
                author : {
                    email: data.mensajes.author.email,
                    nombre: data.mensajes.author.nombre,
                    apellido: data.mensajes.author.apellido,
                    edad: data.mensajes.author.edad,
                    alias: data.mensajes.author.alias,
                    avatar: data.mensajes.author.avatar
                },
            }
            mensaje.text = data.mensajes.text
            console.log('ESTO LLEGA AL BACK', mensaje)
            const newMsg = await MensajeModel.create(mensaje);

        } catch (error) {
            console.log(error);
        }
    }

    async findAllMsg(req, res) {
        try {
            let mensajes = await MensajeModel.find();
            let id = 'mensajes'
            return res.status(200).json({ id, mensajes });
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }
}

export default Mensaje;