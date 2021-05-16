import knex from 'knex';

class MensajeDB {

    constructor(config) {
        this.knex = knex(config)
    };

    async createTable() {
        try {
            await this.knex.schema.dropTableIfExists('mensajes')
            await this.knex.schema.createTableIfNotExists('mensajes', table => {
                table.increments('id').primary();
                table.string('usuario', 50).notNullable();
                table.string('mensaje', 200).notNullable();
                console.log('DB CREADA CON EXITO')
            });
        } catch (error) {
            console.log('ERROR CREATE TABLE',error)
        }

    };

    newMessage(mensaje) {
        return this.knex('mensajes').insert(mensaje);
    };

    readMessage() {
        return this.knex('mensajes').select();
    }

    close() {
        return this.knex.destroy();
    }


}

export default MensajeDB;