const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    
        title: { type: String },
        price: { type: Number },
        thumbnail: { type: String }
    
})

module.exports = mongoose.model('ProductoModel', productoSchema);
