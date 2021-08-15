//const { addServiceProducto, findAllServiceProducto, deleteServiceProducto, updateServiceProducto, findByIDServiceProducto } = require('../service/productos.service.js');
const FactoryProducto = require("../factory/factoryProducto.service.js");
const logger = require("../helpers/winston.js");


//* params para ingresar en new Producto según DB
//* 1 - MongoDB (Cloud) / 2 - FS / 3 - Sql Local / Array (default)

const factory = new FactoryProducto();

class Producto {
  async add(req, res) {
    try {
      if (!req) {
        return res
          .status(404)
          .json({ mensaje: "Error al agregar un producto" });
      }
      const data = { ...(await req.body) }; //para que funcione con sockets.io cambiar a req.productos
      factory.addServiceProducto(data);
      return res.status(200).json("Producto agregado correctamente");
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAll(req, res) {
    try {
      const prodInDb = await factory.findAllServiceProducto();
      return res.status(200).json(prodInDb);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByID(req, res) {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res
          .status(404)
          .json({ mensaje: "Producto no encontrado", error });
      }
      const prodById = await factory.findByIDServiceProducto(_id);
      if (!prodById) {
        return res.status(404).json({ mensaje: "No se encontró el producto" });
      }
      return res.status(200).json(prodById);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deleteProd(req, res) {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      const prodToDel = await factory.deleteServiceProducto(_id);
      if (!prodToDel) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      return res.status(200).json({ mensaje: "Producto eliminado con exito" });
    } catch (error) {
      logger.error.error(error);
    }
  }

  async update(req, res) {
    const _id = req.params.id;
    const data = { ...req.body };
    try {
      const prodUpdated = await factory.updateServiceProducto(_id, data);
      return res
        .status(200)
        .json({ prodUpdated, mensaje: "Producto actualizado" });
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = Producto;
