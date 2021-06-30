export default class Info {

    getInfo(req, res) {

        res.send(`
            <p>
            * <strong>Argumentos de entrada:</strong> <br>${process.argv[0]} <br> ${process.argv[1]} <br>
            * <strong>Nombre de la plataforma:</strong><br> ${process.platform} <br>
            * <strong>Version de Node:</strong><br> ${process.version}<br>
            * <strong>Uso de memoria:</strong><br> ${process.memoryUsage()}<br>
            * <strong>Path de ejecución:</strong><br> ${process.execPath}<br>
            * <strong>Process id:</strong><br> ${process.pid} <br>
            * <strong>Carpeta corriente:</strong><br> ${process.cwd()}<br>
            </p>` )
    

}

}