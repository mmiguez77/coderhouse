import { normalize, schema } from "normalizr";
import utils from "util";


const msgOriginal = {
    "messages": [
        {
            "message": {
                "author": {
                    "user": "pepe@gmail",
                    "nombre": "pepe",
                    "apellido": "sanchez",
                    "edad": 50,
                    "alias": "pepito",
                    "avatar": "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-128.png"
                },
                "texto": "Hola"
            },
        },
        {
            "message": {
                "author": {
                    "user": "juana@hotmail.",
                    "nombre": "Juana",
                    "apellido": "Perez",
                    "edad": 52,
                    "alias": "jauni",
                    "avatar": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-128.png"
                },
                "texto": "¿que tal?"
            },
        },
        {
            "message": {
                "author": {
                    "user": "pepe@gmail",
                    "nombre": "pepe",
                    "apellido": "sanchez",
                    "edad": 50,
                    "alias": "pepito",
                    "avatar": "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-128.png"
                },
                "texto": "Hola"
            },
        },
        {
            "message": {
                "author": {
                    "user": "pepe@gmail",
                    "nombre": "pepe",
                    "apellido": "sanchez",
                    "edad": 50,
                    "alias": "pepito",
                    "avatar": "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-128.png"
                },
                "texto": "Todo Ok"
            },
        },
        {
            "message": {
                "author": {
                    "user": "juana@hotmail.",
                    "nombre": "Juana",
                    "apellido": "Perez",
                    "edad": 52,
                    "alias": "jauni",
                    "avatar": "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-128.png"
                },
                "texto": "Me alegro"
            },
        }
    ]
}

const userSchema = new schema.Entity('users', {}, { idAttribute: 'user', })

const textoSchema = new schema.Entity('texto', {

})


const messagesSchema = new schema.Entity('author', {
    author: userSchema,
    texto: [textoSchema]
}, { idAttribute: 'messages' })

console.log("/* -------------- ORIGINAL ------------- */");
console.log(utils.inspect(msgOriginal, false, 4, true));

console.log("/* -------------- NORMALIZED ------------- */");
const normalizedData = normalize(msgOriginal, messagesSchema);
console.log(utils.inspect(normalizedData, false, 7, true));

//console.log("length Original", JSON.stringify(msgOriginal).length);
console.log("length Normalize", JSON.stringify(normalizedData).length);