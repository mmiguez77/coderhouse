import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    user: {type: String, required: true},
    mensaje: {type: String, required: true}, 
})

const MensajeModel = mongoose.model('MensajeModel', mensajeSchema);
export default MensajeModel