const ProductoMongo = require ('../controllers/Producto_db_Mongo.js');
const ProductoArray = require ('../controllers/Producto_db_Array.js');
const ProductoFs = require ('../controllers/Producto_db_FS.js');
const ProductoSql = require ('../controllers/Producto_db_SqlLocal.js');


export default class Producto {

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