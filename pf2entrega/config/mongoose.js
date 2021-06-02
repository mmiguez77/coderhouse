import mongoose from 'mongoose';

export default class MongooseCnx {

    constructor() {
        this.connection = this.createConnection();  
    }

    createConnection() {
        const uri = 'mongodb://localhost:27017/proyecto'
        const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
        mongoose.connect(uri, options).then(
            () => { console.log('Conectado a Mongo') },
            err => { err }
        );
    }
}