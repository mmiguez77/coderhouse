import CarritoMongo from '../controllers/Carrito_db_Mongo.js';
import CartArray from '../controllers/Carrito_db_Array.js';
import CarritoFs from '../controllers/Carrito_db_FS.js';
import CarritoSql from '../controllers/Carrito_db_SqlLocal.js';
import CarritoSqlCloud from '../controllers/Carrito_db_SqlCloud.js';
import CarritoSqlite3 from '../controllers/Carrito_db_Sqlite3.js';
import CarritoFirebase from '../controllers/Carrito_db_Firebase.js'

export default class Cart {
    database;

    constructor(number) {
        switch (number) {
            case 1:
                this.database = new CarritoMongo('local');//parametro posible: 'local' - 'cloud'
                break;
            case 2:
                this.database = new CarritoFirebase('carrito');
                break;
            case 3:
                this.database = new CarritoFs();
                break;
            case 4:
                this.database = new CarritoSql();
                break;
            case 5:
                this.database = new CarritoSqlCloud();
                break;
            case 6:
                this.database = new CarritoSqlite3();
                break;
            default:
                this.database = new CartArray();
                break
        }
    }

    addCart = async (req, res) => {
        try {
            return await this.database.addCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    viewAllCart = async (req, res) => {
        try {
            return await this.database.viewAllCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    viewByIdCart = async (req, res) => {
        try {
            return await this.database.viewByIdCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    deleteCart = async (req, res) => {
        try {
            return await this.database.deleteCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }
}


