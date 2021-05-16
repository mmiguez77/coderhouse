import { mysql } from '../db/config.js'
import knexFn from 'knex';
const knex = knexFn(mysql)

export async function createTableProd() {
    try {
        await knex.schema.hasTable('productos');
        return await knex.schema.createTableIfNotExists('productos', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.integer('price').notNullable();
            table.string('thumbnail', 150).notNullable();
        });
    } catch (error) {
        console.log(error)
    }
}

/* ---- AGREGAR PRODUCTO ---- */
export async function add(req, res) {
    try {
        if (!req) {
            res.status(404).send('CAMPOS VACIOS, NO SE PUEDE AGREGAR EL PRODUCTO')
        }
        let data = await { ...req.body };
        console.log('NUEVO PRODUCTO AGREGADO: ', data.title, data.price, data.thumbnail)
        return await knex('productos').insert({
            title: data.title,
            price: data.price,
            thumbnail: data.thumbnail
        }).then(() => {
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    } finally {
        close()
    }
}

/* ---- VER TOTAL DE PRODUCTOS ---- */
export async function findAll(req, res) {
    try {
        let allProducts;
        return allProducts = await knex('productos').select()
        // .then((allProducts) => {
        //     res.status(200).send(allProducts)
        // })
    } catch (error) {
        console.log(error)
    }
}

/* ---- VER PRODUCTO POR ID ---- */
export async function findByID(req, res) {
    try {
        if (req) {
            let id = req.params.id;
            let prodId;
            return prodId = await knex('productos').select().where('id', id)
                .then((prodId) => {
                    res.status(200).json(prodId)
                })
        }
    } catch (error) {
        console.log(error);
    } finally {
        close()
    }
}

/* ----  ELIMINAR PRODUCTO ---- */
export async function del(req, res) {
    try {
        if (req) {
            let id = req.params.id;
            let prodDel;
            return prodDel = await knex('productos').select().where('id', id).del()
                .then((prodDel) => {
                    res.status(200).json(prodDel)
                })
        }
    } catch (error) {
        console.log(error);
    } finally {
        close()
    }
}

/* ----  ACTUALIZAR PRODUCTO ---- */
export async function update(req, res) {
    try {
        if (req.body.title == "" || req.body.price == "") {
            res.status(400).json("FALTAN DATOS PARA ACTUALIZAR EL PRODUCTO")
        } else {
            let id = req.params.id;
            let prodUpdate;
            return prodUpdate = await knex('productos').where('id', id).update({
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail
            }).then((prodUpdate) => {
                res.status(200).json(`PRODUCTO ${req.body.title} ACTUALIZADO CON EXITO`)
            });
        };
    } catch (error) {
        console.log(error);
    } finally {
        close()
    };

}

async function close() {
    try {
        return await knex.destroy();
    } catch (error) {
        console.log(error)
    }

}


