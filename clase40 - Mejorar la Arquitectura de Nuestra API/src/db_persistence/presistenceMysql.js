const logger = require("../helpers/winston.js");
const mysql = require("../databases/mysql.js");
const knexFn = require("knex");
const knex = knexFn(mysql);

export class ProductoMysql {
  constructor() {
    this.createTable = this.createTableProd();
    this.msg = console.log("*** Conectado a DB mysql Local en Carrito");
  }

  createTableProd = async () => {
    try {
      await knex.schema.hasTable("productos");
      return await knex.schema.createTableIfNotExists("productos", (table) => {
        table.increments("_id").primary();
        table.string("title", 50).notNullable();
        table.integer("price").notNullable();
        table.string("thumbnail", 150).notNullable();
      });
    } catch (error) {
      console.log(error);
    }
  };

  async addPersistenceProducto(dataToDb) {
    try {
      const nvoProd = await knex("productos").insert({
        title: dataToDb.title,
        price: dataToDb.price,
        thumbnail: dataToDb.thumbnail,
      });
      return nvoProd;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllPersistenceProducto() {
    try {
      const productos = await knex("productos").select();
      return productos;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      const prodId = await knex("productos").select().where("_id", _id);
      return prodId;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      return await knex("productos").select().where("_id", _id).del();
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      const prodUpdate = await knex("productos").where("_id", _id).update({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
      });
      return prodUpdate;
    } catch (error) {
      logger.error.error(error);
    }
  }
}
