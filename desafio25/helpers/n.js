function generador(param) {

    let n = [];
    let iteraciones = param || 100000000;

    function number() { return Math.floor(Math.random() * (1000 - 1) + 1) }
    for (let i = 0; i < iteraciones; i++) { n.push(number()) }

    let repetidos = n.reduce((acc, cur) => (acc[cur] ? acc[cur] += 1 : acc[cur] = 1, acc), {})
    //console.log(repetidos)
    return repetidos
}


process.on('number', async msg => {
    const data = generador(await msg);
    setTimeout(() => {
        process.send(data);
        
    }, 1000);
})


