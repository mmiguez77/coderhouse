import knex from 'knex';

class MensajeDB {

    constructor(config) {
        this.knex = knex(config)
    }

    async createTable() {
        await this.knex.schema.dropTableIfExists('mensajesDB');
        this.knex.schema.createTableIfNotExists('mensajes', table => {
            table.increments('id').primary();
            table.string('usuario', 50).notNullable();
            table.string('mensaje', 200).notNullable();
        });
    }

    newMessage(mensaje) {
        return this.knex('mensajes').insert(mensaje)
            .then(() => {
                console.log(mensaje)
            }).catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            });
    }

    readMessage() {
        return this.knex.from('mensajes').selected('*')
            .then((rows) => {
                for (row of rows) {

                }
            }).catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            });
    }

    close() {
        return this.knex.destroy();
    }


}

export default MensajeDB