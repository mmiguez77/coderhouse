class Calculo {
    private num1: number;
    private num2: number;
    private operacion: string;

        constructor(num1: number, num2: number, operacion: string) {
            this.num1 = num1;
            this.num2 = num2;
            this.operacion = operacion;
        }
            public resultado () {
                switch (this.operacion) {
                    case 'suma':
                        return this.num1 + this.num2;
                        break
                    case 'resta':
                        return this.num1 - this.num2;
                        break
                    default:
                        console.log('Error');
                        break
                }
            }
}

export const resultados = function (num1: number, num2: number, operacion: string) {
    return new Calculo(num1, num2, operacion);
}


