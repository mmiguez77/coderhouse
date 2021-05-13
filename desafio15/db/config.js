export const mysql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'dbproductos'
    }
};

export const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: "./dbmensajes/mensajes.sqlite3"
    },
    useNullAsDefault: true
};

