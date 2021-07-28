import mysql from '../config/mysql.js'
import knexFn from 'knex';
const knex = knexFn(mysql)

export default class CarritoSql {

    constructor() {
        this.createTable = this.createTableProd()
        this.msg = console.log('*** Conectado a DB mysql Local en Carrito')
    }

    createTableProd = async () => {
        try {
            await knex.schema.hasTable('carrito');
            return await knex.schema.createTableIfNotExists('carrito', table => {
                table.increments('_id').primary();
                table.string('title', 50).notNullable();
                table.integer('price').notNullable();
                table.string('thumbnail', 150).notNullable();
                table.integer('stock').notNullable();
                table.string('description', 250).notNullable();
                table.string('code', 20).notNullable();
                table.timestamp('timestamp')
            });
        } catch (error) {
            console.log(error)

        }
    }

    /* ---- AGREGAR PRODUCTO ---- */
    addCart = async (req, res) => {
        try {
            if (!req.body) {
                res.status(404).send('CAMPOS VACIOS, NO SE PUEDE AGREGAR EL PRODUCTO')
            }
            let data = await { ...req.body };
            const nvoProd = await knex('carrito').insert({
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail,
                code: data.code,
                stock: data.stock,
                description: data.description
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER TOTAL DE PRODUCTOS ---- */
    viewAllCart = async (req, res) => {
        try {
            const productos = await knex('carrito').select()
            res.status(200).json(productos)
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByIdCart = async (req, res) => {
        try {
            let _id = req.params.id;
            if (!_id) {
                res.status(404).json(`PRODUCTO CON ID: ${_id} NO ENCONTRADO`)
            } else {
                const prodId = await knex('carrito').select().where('_id', _id)
                res.status(200).json(prodId)
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* ----  ELIMINAR PRODUCTO ---- */
    deleteCart = async (req, res) => {
        try {
            if (req) {
                let _id = req.params.id;
                return await knex('carrito').select().where('_id', _id).del()
                    .then(() => {
                        res.status(200).json(`PRODUCTO CON ID ${req.params.id} ELIMINADO`)
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }

}