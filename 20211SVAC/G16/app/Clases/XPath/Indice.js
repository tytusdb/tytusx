"use strict";
exports.__esModule = true;
exports.Indice = void 0;
var ConsultasTS_js_1 = require("./ConsultasTS.js");
var Formato_1 = require("../Models/Formato");
var Indice = /** @class */ (function () {
    function Indice(contenido) {
        this.ejecuciones = contenido;
    }
    Indice.prototype.execute = function (padre) {
        this.tablasimbolos = JSON.parse(localStorage.getItem("tablaSimbolo"));
        this.encoding = localStorage.getItem("encoding");
        var contenido = this.ejecuciones.execute(padre);
        if (contenido.pred == "false") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x = consulta.getEntornoActual(contenido.id, padre);
            var formato = new Formato_1.Formato(x, this.toastr, this.encoding);
            var y = formato.darFormato();
            console.log(y);
            localStorage.setItem("dad", contenido.id);
        }
        else {
            localStorage.setItem("idtmp", contenido.id);
            var pred = contenido.pred.execute(padre);
            //VALIDACIÓN SI VIENE ALGO EN .pred
            if (pred.pred != undefined) {
                if (pred.pred == "menor") {
                    var consulta = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta.Concatenar(pred.id.indice, pred.id.tope, contenido.id, padre);
                    var formato2 = new Formato_1.Formato(w, this.toastr, this.encoding);
                    console.log(formato2.darFormato());
                }
            }
            else { //SI ENTRA ACÁ ES POR QUE VIENE DIRECTO UN NUMERO NO UN ARREGLO DE NUMEROS.
                var consulta = new ConsultasTS_js_1.ConsultasTS();
                var x_1 = consulta.getPredicado(pred, contenido.id, padre);
                var formato = new Formato_1.Formato(x_1, this.toastr, this.encoding);
                var y = formato.darFormato();
                console.log(y); //VA PARA SALIDA
            }
            localStorage.setItem("dad", contenido.id);
        }
    };
    return Indice;
}());
exports.Indice = Indice;
