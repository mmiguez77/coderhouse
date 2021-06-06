import mongoose from 'mongoose';

export default class MongooseCnx {

    constructor(typeStorage) {
        this.connection = this.createConnection(typeStorage);
    }

    createConnection(typeStorage) {
        if (typeStorage == 'local') {
            const uri = 'mongodb://localhost:27017/proyecto'
            const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
            mongoose.connect(uri, options).then(
                () => { console.log('*** Conectado a MongoDB Local') },
                err => { err })
        } else if (typeStorage == 'cloud') {
            const uri = 'mongodb+srv://proyecto:coder@cluster0.tqtau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
            const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
            mongoose.connect(uri, options).then(
                () => { console.log('*** Conectado a MongoDB Cloud') },
                err => { err }
            );
        } else{
            console.log('*** POR FAVOR INGRESAR PARAMETRO PARA MONGO DB *** ')
        }
    }
}