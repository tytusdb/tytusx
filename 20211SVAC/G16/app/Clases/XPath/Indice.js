"use strict";
exports.__esModule = true;
exports.Indice = void 0;
var ConsultasTS_js_1 = require("./ConsultasTS.js");
var Indice = /** @class */ (function () {
    function Indice(contenido) {
        this.ejecuciones = contenido;
    }
    Indice.prototype.execute = function (padre) {
        this.encoding = localStorage.getItem("encoding");
        var contenido = this.ejecuciones.execute(padre);
        if (contenido.pred == "false") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x_1 = consulta.newEntorno(padre, contenido.id);
            if (x_1.length > 1) {
                localStorage.setItem("dad", JSON.stringify(x_1));
            }
            else if (x_1[0].Valor == undefined) {
                var lista = [];
                lista.push(x_1[0]);
                localStorage.setItem("dad", JSON.stringify(x_1[0]));
            }
            else {
                var lista = [];
                lista.push(x_1[0].Valor.valor);
                var newdad = JSON.stringify(x_1[0].Valor.valor);
                localStorage.setItem("dad", newdad);
            }
        }
        else if (contenido.pred == "text") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x = consulta.getText(padre);
            localStorage.setItem("dad", x);
        }
        else if (contenido.pred == "node") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x = consulta.getNode(padre);
            localStorage.setItem("dad", x);
        }
        else {
            var entornotmp = void 0;
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x_2 = consulta.newEntorno(padre, contenido.id);
            if (x_2.length > 1) {
                entornotmp = JSON.stringify(x_2);
            }
            else if (x_2[0].Valor == undefined) {
                var lista = [];
                lista.push(x_2[0]);
                entornotmp = JSON.stringify(x_2[0]);
            }
            else {
                var lista = [];
                lista.push(x_2[0].Valor.valor);
                entornotmp = JSON.stringify(x_2[0].Valor.valor);
                localStorage.setItem("dad", newdad);
            }
            //PARA EL PREDICADO
            var pred = contenido.pred.execute(entornotmp);
            //VERIFICAR QUE TIPO DE PREDICADO ES:
            if (pred.pred != undefined) {
                if (pred.pred == "menor") {
                    var consulta_1 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_1.Menor(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                }
                else if (pred.pred == "mayor") {
                    var consulta_2 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_2.Mayor(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                }
                else if (pred.pred == "menori") {
                    var consulta_3 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_3.Menori(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                }
                else if (pred.pred == "mayori") {
                    var consulta_4 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_4.Mayori(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                }
                else if (pred.pred == "igual") {
                    var consulta_5 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_5.Igual(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                }
                else if (pred.pred == "noigual") {
                    var consulta_6 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_6.Diferente(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                }
            }
            else { //SI ENTRA ACÁ ES POR QUE VIENE DIRECTO UN NUMERO NO UN ARREGLO DE NUMEROS.
                var consulta_7 = new ConsultasTS_js_1.ConsultasTS();
                var w = consulta_7.getPredicado(entornotmp, pred);
                localStorage.setItem("dad", JSON.stringify(w));
            }
        }
    };
    return Indice;
}());
exports.Indice = Indice;
