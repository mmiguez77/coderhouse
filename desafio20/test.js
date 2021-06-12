import { normalize, schema } from "normalizr";
import utils from "util";


const msgOriginal = {
    "id": "mensajes",
    "mensajes": [
        {
            "author": {
                "email": "pepe",
                "nombre": "pepe",
                "apellido": "sacnchez",
                "edad": 21,
                "alias": "pepito",
                "avatar": "das"
            },
            "_id": "60c5335b94ce9a20d4dbff40",
            "text": "Hola",
            "__v": 0
        },
        {
            "author": {
                "email": "pepe",
                "nombre": "pepe",
                "apellido": "sacnchez",
                "edad": 21,
                "alias": "pepito",
                "avatar": "das"
            },
            "_id": "60c534ba6913e516008bf8ee",
            "text": "asaaaaaaaaaaaa",
            "__v": 0
        },
        {
            "author": {
                "email": "pepe",
                "nombre": "pepe",
                "apellido": "sacnchez",
                "edad": 21,
                "alias": "pepito",
                "avatar": "das"
            },
            "_id": "60c53540f4a2972684d6f8fd",
            "text": "a",
            "__v": 0
        },
        {
            "author": {
                "email": "pepe",
                "nombre": "pepe",
                "apellido": "sacnchez",
                "edad": 21,
                "alias": "pepito",
                "avatar": "das"
            },
            "_id": "60c53540f4a2972684d6f8fe",
            "text": "b",
            "__v": 0
        },
        {
            "author": {
                "email": "pepe",
                "nombre": "pepe",
                "apellido": "sacnchez",
                "edad": 21,
                "alias": "pepito",
                "avatar": "das"
            },
            "_id": "60c53540f4a2972684d6f8ff",
            "text": "c",
            "__v": 0
        },
        {
            "author": {
                "email": "pepe",
                "nombre": "pepe",
                "apellido": "sacnchez",
                "edad": 21,
                "alias": "pepito",
                "avatar": "das"
            },
            "_id": "60c53540f4a2972684d6f900",
            "text": "d",
            "__v": 0
        }
    ]
}

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('mensaje', {
    author: schemaAuthor
}, { idAttribute: '_id' })

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('mensajes', {
    mensajes: [schemaMensaje]
}, { idAttribute: 'id' })


// const messagesSchema = new schema.Entity('messages', {
//     messages: [msgSchema]
// }, { idAttribute: 'id' })



// console.log("/* -------------- ORIGINAL ------------- */");
// console.log(utils.inspect(msgOriginal, false, 4, true));

console.log("/* -------------- NORMALIZED ------------- */");
const normalizedData = normalize(msgOriginal, schemaMensajes);
console.log(utils.inspect(normalizedData, false, 7, true));

console.log("length Original", JSON.stringify(msgOriginal).length);
console.log("length Normalize", JSON.stringify(normalizedData).length);