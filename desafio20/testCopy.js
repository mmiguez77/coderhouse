import { normalize, schema } from "normalizr";
import utils from "util";


const msgOriginal = {
    id: "33e31929-15f7-470b-a391-ecb649f3a32a",
    messages: [
        {
            message: {
                id: 1,
                author: {
                    id: 1,
                    user: "pepe@gmail",
                    nombre: "pepe",
                    apellido: "sanchez",
                    edad: 50,
                    alias: "pepito",
                    avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-128.png"
                },
                texto: "Hola"
            },
            id: "60c193841363de00d8ca9cfd",
            __v: 0
        },
        {
            message: {
                id: 2,
                author: {
                    id: 2,
                    user: "juana@hotmail.",
                    nombre: "Juana",
                    apellido: "Perez",
                    edad: 52,
                    alias: "jauni",
                    avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-128.png"
                },
                texto: "¿que tal?"
            },
            id: "60c193a91363de00d8ca9cfe",
            __v: 0
        },
        {
            message: {
                id: 1,
                author: {
                    id: 1,
                    user: "pepe@gmail",
                    nombre: "pepe",
                    apellido: "sanchez",
                    edad: 50,
                    alias: "pepito",
                    avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-128.png"
                },
                texto: "Hola"
            },
            id: "60c193af1363de00d8ca9cff",
            __v: 0
        },
        {
            message: {
                id: 1,
                author: {
                    id: 1,
                    user: "pepe@gmail",
                    nombre: "pepe",
                    apellido: "sanchez",
                    edad: 50,
                    alias: "pepito",
                    avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-128.png"
                },
                texto: "Todo Ok"
            },
            id: "60c193b91363de00d8ca9d00",
            __v: 0
        },
        {
            message: {
                id: 2,
                author: {
                    id: 2,
                    user: "juana@hotmail.",
                    nombre: "Juana",
                    apellido: "Perez",
                    edad: 52,
                    alias: "jauni",
                    avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-128.png"
                },
                texto: "Me alegro"
            },
            id: "60c193bf1363de00d8ca9d01",
            __v: 0
        }
    ]
}

const userSchema = new schema.Entity('user', undefined, {idAttribute : 'user'})

const authorSchema = new schema.Entity('author', {
    author: userSchema
})

const messageSchema = new schema.Entity('author', {
    message: userSchema
})

console.log("/* -------------- ORIGINAL ------------- */");
console.log(utils.inspect(msgOriginal, false, 4, true));
console.log("length", JSON.stringify(msgOriginal).length);

const normalizedData = normalize(msgOriginal, authorSchema);
console.log("/* -------------- NORMALIZED ------------- */");
console.log(utils.inspect(normalizedData, false, 7, true));
console.log("length", JSON.stringify(normalizedData).length);