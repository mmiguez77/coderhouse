import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true}, 
    thumbnail: {type: String, required: true},   
})

const ProductoModel = mongoose.model('ProductoModel', productoSchema);
export default ProductoModel