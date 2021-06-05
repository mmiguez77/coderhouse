import ProductoMongo from '../controllers/Producto_db_Mongo.js';
import ProductoArray from '../controllers/Producto_db_Array.js';
import ProductoFirebase from '../controllers/Producto_db_Firebase.js';
import ProductoFs from '../controllers/Producto_db_FS.js';
import ProductoSql from '../controllers/Producto_db_SqlLocal.js';
import ProductoSqlCloud from '../controllers/Producto_db_SqlCloud.js';
import ProductoSqlite3 from '../controllers/Producto_db_Sqlite3.js';

export default class Producto {

    database;

    constructor(number) {
        switch (number) {
            case 1:
                this.database = new ProductoMongo('local');//parametro posible: 'local' - 'cloud'
                break;
            case 2:
                this.database = new ProductoFirebase('productos');
                break;
            case 3:
                this.database = new ProductoFs();
                break;
            case 4:
                this.database = new ProductoSql();
                break;
            case 5:
                this.database = new ProductoSqlCloud();
                break;
            case 6:
                this.database = new ProductoSqlite3();
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

    viewAll = async (req, res) => {
        try {
            return await this.database.viewAll(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    viewByID = async (req, res) => {
        try {
            return await this.database.viewByID(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    viewByName = async (req, res) => {
        try {
            return await this.database.viewByName(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    viewByCode = async (req, res) => {
        try {
            return await this.database.viewByCode(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    orderByPrice = async (req,res) => {
        try {
            return await this.database.orderByPrice(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    orderByStock = async (req,res) => {
        try {
            return await this.database.orderByStock(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    drop = async (req, res) => {
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