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
            console.log('ESTO LLEGA AL BACK', data)
            const newMsg = await MensajeModel.create(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    async findAllMsg(req, res) {
        try {
            let messages = await MensajeModel.find();
            let id = uuidv4()
            return res.status(200).json({id, messages});
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }
}

export default Mensaje;