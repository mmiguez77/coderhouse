import MensajeModel from '../models/mensajeSchema.js';

class Mensaje {

    constructor() { }

    async addMsg(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            console.log('ADDMSG', await req)
            const data = await { ...req }
            const newMsg = await MensajeModel.create(data);
            return res.status(200).json(newMsg)
        } catch (error) {
            console.log(error);
        }
    }

    async findAllMsg(req, res) {
        try {
            const msgInDb = await MensajeModel.find();
            return res.status(200).json(msgInDb);
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }
}

export default Mensaje;