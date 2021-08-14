const { addPersistenceProducto, findAllPersistenceProducto, deletePersistenceProducto, updatePersistenceProducto, findByIDPersistenceProducto } = require('../db_persistence/productosPersistence.js');
const logger = require('../helpers/winston.js');


class FactoryProducto {

    database;

    constructor(number) {
        switch (number) {
            case 1:
                this.database = new ProductoMongo();
                break;
            case 2:
                this.database = new ProductoFs();
                break;
            case 3:
                this.database = new ProductoSql();
                break;
            default:
                this.database = new ProductoArray();
                break
        }
    }

    add = async (req, res) => {
        try {
            return await this.database.add(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    findAll = async (req, res) => {
        try {
            return await this.database.viewAll(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    findByID = async (req, res) => {
        try {
            return await this.database.viewByID(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    deleteProd = async (req, res) => {
        try {
            return await this.database.drop(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    update = async (req, res) => {
        try {
            return await this.database.update(req, res)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = FactoryProducto