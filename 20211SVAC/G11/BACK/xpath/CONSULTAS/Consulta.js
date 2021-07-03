"use strict";
exports.__esModule = true;
exports.Consulta = void 0;

var Consulta = /** @class */ (function () {
    function Consulta() {
        Consulta.l_consultas = new Array();
    }
    Consulta.agregar = function (ba, id, val) {
        var nuevo = new NodoConsulta(ba, id, val);
        console.log(nuevo);
        Consulta.l_consultas.push(nuevo);
    };
    Consulta.recorrer = function () {
        for (var i = 0; i < Consulta.l_consultas.length; i++) {
            console.log(Consulta.l_consultas[i].getid() + ' ' + Consulta.l_consultas[i].getval() + '->' + Consulta.l_consultas[i].getaccion());
        }
    };
    Consulta.getConsulta = function(){
        return Consulta.l_consultas;
    };
    Consulta.l_consultas = new Array();
    return Consulta;
}());
exports.Consulta = Consulta;
