"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.Main = void 0;
var Main = /** @class */ (function () {
    function Main(linea, columna, tipo, instrucciones) {
        this.linea = linea;
        this.columna = columna;
        this.codigo = "";
        this.tipo = tipo;
        this.instrucciones = instrucciones;
    }
    Main.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Main.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Main.prototype.getTipo = function () {
        return this.tipo;
    };
    Main.prototype.getCodigo3D = function () {

        var codigoAux = `
        /*------ METODO MAIN ------*/
        int main(){
            `;

        for (var i = 0; i < this.instrucciones.length; i++) {
            codigoAux += this.instrucciones[i].getCodigo3D() + "\n";
          }

        codigoAux += "}\n";

        this.codigo = codigoAux;

        return this.codigo;
    };
    return Main;
}());
//  exports.Main = Main;
