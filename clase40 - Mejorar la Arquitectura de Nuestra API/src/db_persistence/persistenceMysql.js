const logger = require("../helpers/winston.js");
const MysqlCxn = require("../config/MysqlCxn.js");

class MysqlDb {
  constructor() {
    this.knex = new MysqlCxn();
  }

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

module.exports = MysqlDb;
