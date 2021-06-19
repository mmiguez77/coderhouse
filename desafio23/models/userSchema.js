import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String }
})

const UserModel = mongoose.model('UserModel', userSchema);
export default UserModel