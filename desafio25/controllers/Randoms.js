export default class Random {


    async get(req, res) {
        try {
            let param = await req.query.number
            let numeros = generateNumber(param)
          
            res.render('random',{numeros})
            
            function generateNumber(param) {
                let n = [];
                let iteraciones = param || 100000000;
                function number() { return Math.floor(Math.random() * (1000 - 1) + 1) }
                for (let i = 0; i < iteraciones; i++) { n.push(number()) }
                let repetidos = n.reduce((acc, cur) => (acc[cur] ? acc[cur] += 1 : acc[cur] = 1, acc), {})
                return repetidos;
            }
        } catch (error) {
            console.error(error)
        }
    }

    


}