import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const productoSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    title: {type: String, required: true},
    price: {type: Number, required: true}, 
    stock: {type: Number, required: true}, 
    thumbnail: {type: String, required: true}, 
    code: {type: String, required: true}, 
    description: {type: String, required: true} 
})

const ProductoModel = mongoose.model('ProductoModel', productoSchema);
export default ProductoModel