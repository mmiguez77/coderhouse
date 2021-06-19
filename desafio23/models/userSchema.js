const bcrypt = require ('bcrypt');
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
})

userSchema.methods.passEncrypt = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.passCompare = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('UserModel', userSchema);