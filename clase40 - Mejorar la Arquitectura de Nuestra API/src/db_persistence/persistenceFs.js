const logger = require("../helpers/winston.js");
const fs = require("fs");
let producto = [];

class FsDb {

  constructor() {
    this.msg = console.log('*** Base de Datos FS');
  }

  readJson () {
    if (!fs.existsSync("productos.json")) {
      fs.writeFileSync("productos.json", JSON.stringify(producto));
    } else {
      let data = fs.readFileSync("productos.json");
      return JSON.parse(data);
    }
  };

  saveJson (data) {
    let stringifyData = JSON.stringify(data);
    fs.writeFileSync("productos.json", stringifyData);
  };

  async addPersistenceProducto(dataToDb) {
    try {
      const _id = producto.length + 1;
      let newProd = { ...dataToDb, _id };
      producto.push(newProd);
      saveJson(producto);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllPersistenceProducto() {
    try {
      const allProd = await readJson();
      return allProd;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      const prodById = await readJson();
      let prodFiltro = await prodById.find((prod) => prod._id == parseInt(_id));
      return prodFiltro;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      let viewProdDrop = await readJson();
      let prodDrop = await viewProdDrop.filter(
        (prod) => prod._id !== parseInt(_id)
      );
      saveJson(prodDrop);
      producto.push(prodDrop);
      return prodDrop;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      let viewProdUpdate = await this.readJson();
      viewProdUpdate = await viewProdUpdate.map((prod) => {
        if (prod._id == parseInt(_id)) {
          prod.title = data.title;
          prod.price = data.price;
          prod.thumbnail = data.thumbnail;
        }
        saveJson(viewProdUpdate);
        producto.push(viewProdUpdate);
        return viewProdUpdate;
      });
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = FsDb;
