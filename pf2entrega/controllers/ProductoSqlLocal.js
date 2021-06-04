import mysql from '../config/mysql.js'
import knexFn from 'knex';
const knex = knexFn(mysql)

export default class ProductoSql {

    constructor() {
        this.createTable = this.createTableProd()
    }

    createTableProd = async () => {
        try {
            await knex.schema.hasTable('productos');
            return await knex.schema.createTableIfNotExists('productos', table => {
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
    add = async (req, res) => {
        try {
            if (!req.body) {
                res.status(404).send('CAMPOS VACIOS, NO SE PUEDE AGREGAR EL PRODUCTO')
            }
            let data = await { ...req.body };
            const nvoProd = await knex('productos').insert({
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
    viewAll = async (req, res) => {
        try {
            const productos = await knex('productos').select()
            res.status(200).json(productos)
        } catch (error) {
            console.log(error)
        }
    }

    /* ---- VER PRODUCTO POR ID ---- */
    viewByID = async (req, res) => {
        try {
            let _id = req.params.id;
            if (!_id) {
                res.status(404).json(`PRODUCTO CON ID: ${_id} NO ENCONTRADO`)
            } else {
                const prodId = await knex('productos').select().where('_id', _id)
                res.status(200).json(prodId)
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* ----  ELIMINAR PRODUCTO ---- */
    drop = async (req, res) => {
        try {
            if (req) {
                let _id = req.params.id;
                return await knex('productos').select().where('_id', _id).del()
                    .then(() => {
                        res.status(200).json(`PRODUCTO CON ID ${req.params.id} ELIMINADO`)
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* ----  ACTUALIZAR PRODUCTO ---- */
    update = async (req, res) => {
        try {
            if (req.body.title == "" || req.body.price == "") {
                res.status(400).json("FALTAN DATOS PARA ACTUALIZAR EL PRODUCTO")
            } else {
                const _id = req.params.id;
                const prodUpdate = await knex('productos').where('id', id).update({
                    title: req.body.title,
                    price: req.body.price,
                    thumbnail: req.body.thumbnail,
                    stock: req.body.stock,
                    code: req.body.code,
                    description: req.body.description
                })
                res.status(200).json(`PRODUCTO ${req.body.title} ACTUALIZADO CON EXITO`)
            };
        } catch (error) {
            console.log(error);
        }

    }
}