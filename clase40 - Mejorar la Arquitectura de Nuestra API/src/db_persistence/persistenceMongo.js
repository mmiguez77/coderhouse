const logger = require("../helpers/winston.js");
const ProductoModel = require("../models/productoSchema.js");
const MongoCxn = require("../database/MongoCxn.js");

class MongoDb {

  constructor () {
    this.cxn = new MongoCxn();
    this.msg = console.log('*** Base de Datos Mongo');
  }

  async addPersistenceProducto(dataToDb) {
    try {
      await ProductoModel.create(dataToDb);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllPersistenceProducto() {
    try {
      const prodInDb = await ProductoModel.find({});
      return prodInDb;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      const prodById = await ProductoModel.findOne({ _id });
      return prodById;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      const prodToDel = await ProductoModel.deleteOne({ _id });
      return prodToDel;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      const prodUpdated = await ProductoModel.updateOne({ _id }, data, {
        new: true,
      });
      return prodUpdated;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = MongoDb;
