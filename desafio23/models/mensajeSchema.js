const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    message : {
        user: { type: String },
        mensaje: { type: String }
    }
})

module.exports = mongoose.model('MensajeModel', mensajeSchema);