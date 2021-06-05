import ProductoMongo from './ProductoMongo.js';
import ProductoArray from './Producto_db_Array.js';
import ProductoFirebase from './Producto_db_Firebase.js';
import ProductoFs from './Producto_db_FS.js';
import ProductoSql from './Producto_db_SqlLocal.js';
import ProductoSqlCloud from './Producto_db_SqlCloud.js';
import ProductoSqlite3 from './Producto_db_Sqlite3.js';

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