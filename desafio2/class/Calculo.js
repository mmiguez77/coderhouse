"use strict";
exports.__esModule = true;
exports.resultados = void 0;
var Calculo = /** @class */ (function () {
    function Calculo(num1, num2, operacion) {
        this.num1 = num1;
        this.num2 = num2;
        this.operacion = operacion;
    }
    Calculo.prototype.resultado = function () {
        switch (this.operacion) {
            case 'suma':
                return this.num1 + this.num2;
                break;
            case 'resta':
                return this.num1 - this.num2;
                break;
            default:
                console.log('Error');
                break;
        }
    };
    return Calculo;
}());
var resultados = function (num1, num2, operacion) {
    return new Calculo(num1, num2, operacion);
};
exports.resultados = resultados;
