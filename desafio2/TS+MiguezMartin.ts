/*----- PROMESAS ----- */
function operacion (num1: number, num2: number, operacion: string) {
    
    return new Promise((resolve, reject) => {import('./class/Calculo.js')
            .then((calculo) => {
                //console.log(calculo);
                let calculos = calculo.resultados(num1, num2, operacion);
                //console.log(calculos);
                resolve(calculos.resultado());
                reject(console.log("Error"));
    });
  });
};

/*----- ASYNC/AWAIT ----- */
async function operaciones () {
    try 
  {
    console.log(await operacion(15, 15, 'suma'));
    console.log(await operacion(30, 10, 'resta'));
  } 
    catch (e)   
  {
    console.log(e);
  }
};

operaciones();
