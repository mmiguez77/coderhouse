export default class Random {

    generateNumber(param) {
        let n = [];
        let iteraciones = param || 100000000;

        function number() {
            return Math.floor(Math.random() * (1000 - 1) + 1)
        }

        for (let i = 0; i < iteraciones; i++) {
            n.push(number())
        }

        let repetidos = n.reduce((acc, cur) => (acc[cur] ? acc[cur] += 1 : acc[cur] = 1, acc), {})
        console.log(repetidos)
        return repetidos;
    }

    async getRandom(req, res) {
        try {
            //let param = await req.params
            console.log(req.params.number)
            //let numeros = await generateNumber(param)
            // console.log(numeros)
            //res.send(numeros)
        } catch (error) {
            console.error(error)
        }
    }

    get(req, res) {
        res.render('random')
    }

}