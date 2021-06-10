import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    message: {
        author: {
            user: { type: String },
            nombre: { type: String },
            apellido: { type: String },
            edad: { type: Number },
            alias: { type: String },
            avatar: { type: String }
        },
        texto: { type: String }
    }
})

const MensajeModel = mongoose.model('MensajeModel', mensajeSchema);
export default MensajeModel