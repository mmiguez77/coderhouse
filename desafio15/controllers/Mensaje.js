import { sqlite3 } from '../db/config.js'
import knexFn from 'knex';
const knex = knexFn(sqlite3)


export async function createTableMessage() {
    try {
        await knex.schema.hasTable('mensajes')
        await knex.schema.createTableIfNotExists('mensajes', table => {
            table.increments('id').primary();
            table.string('usuario', 50).notNullable();
            table.string('mensaje', 200).notNullable();
            console.log('DB MENSAJES CREADA CON EXITO')
        });
    } catch (error) {
        console.log('ERROR CREATE TABLE', error)
    }

};

export async function newMessage(mensaje) {
    console.log('MENSAJE EN CLASS MENSAJE',mensaje)
    //mensajes.push(mensaje)
    return knex('mensajes').insert(mensaje);
};

export async function readMessage() {
    return knex('mensajes').select();
}

export async function close() {
    return knex.destroy();
}