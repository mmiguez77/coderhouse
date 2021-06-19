
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
})


// userSchema.methods.comparePassword = function (password, next) {
//     return bcrypt.compare(password, this.password, (err, match) => {
//         if (err) {
//             return next(err);
//         } else {
//             if (!match) {
//                 return next(null, match)
//             } else {
//                 return next(null, this)
//             }
//         }
//     });
// };

module.exports = mongoose.model('UserModel', userSchema);