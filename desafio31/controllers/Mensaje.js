const MensajeModel = require('../models/mensajeSchema.js');
const EcommerceDbConnect = require('../config/mongooseEcommerce.js');
const { normalize, schema, denormalize } = require('normalizr');


class Mensaje {

    constructor () {
        this.cxn = new EcommerceDbConnect()
    }

    async addMsg(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            const data = await { ...req }
            const mensaje = {
                author: {
                    email: data.message.author.email,
                    nombre: data.message.author.nombre,
                    apellido: data.message.author.apellido,
                    edad: data.message.author.edad,
                    alias: data.message.author.alias,
                    avatar: data.message.author.avatar
                },
            }
            //console.log('ESTO LLEGA AL BACK', mensaje)
            mensaje.text = data.message.text
            const newMsg = await MensajeModel.create(mensaje);

        } catch (error) {
            console.log(error);
        }
    }

    async findAllMsg(req, res) {
        try {
            let mensajes = await MensajeModel.find();
            let id = 'mensajes'
            return res.status(200).json({ id, mensajes });
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }


    async normalizedData(req, res) {
        try {
            let mensajes = await MensajeModel.find();
            //console.log('********* MNJ **************', mensajes.mensajes.author)

            let msgOriginal = {
                id: 'mensajes',
                mensajes: mensajes.map( mensaje => ({...mensaje._doc}))
            }

           // console.log(msgOriginal)

            const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

            const schemaMensaje = new schema.Entity('mensaje', {
                author: schemaAuthor
            }, { idAttribute: '_id' })

            const schemaMensajes = new schema.Entity('mensajes', {
                mensajes: [schemaMensaje]
            }, { idAttribute: 'id' })

            let normalizedData = normalize(msgOriginal, schemaMensajes);

            // console.log(util.inspect(normalizedData, false, 5, true))
            // console.log("length Original", JSON.stringify(msgOriginal).length);
            // console.log("length Normalize", JSON.stringify(normalizedData).length);

            res.send(normalizedData)

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = Mensaje;