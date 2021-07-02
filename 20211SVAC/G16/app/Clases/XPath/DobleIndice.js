"use strict";
exports.__esModule = true;
exports.DobleIndice = void 0;
var Formato_1 = require("../Models/Formato");
var ConsultasTS_js_1 = require("./ConsultasTS.js");
var DobleIndice = /** @class */ (function () {
    function DobleIndice(contenido) {
        this.ejecuciones = contenido;
    }
    DobleIndice.prototype.execute = function (padre) {
        this.tablasimbolos = JSON.parse(localStorage.getItem("tablaSimbolo"));
        this.encoding = localStorage.getItem("encoding");
        var contenido = this.ejecuciones.execute(padre);
        if (contenido.pred == "false") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x = consulta.getEntornoLibre(contenido.id);
            var formato = new Formato_1.Formato(x, this.toastr, this.encoding);
            var y = formato.darFormato();
            console.log(y); //VA PARA SALIDA
            localStorage.setItem("dad", contenido.id);
        }
        else {
            localStorage.setItem("idtmp", contenido.id);
            var pred = contenido.pred.execute(padre);
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x_1 = consulta.getPredicado(pred, contenido.id, padre);
            var formato = new Formato_1.Formato(x_1, this.toastr, this.encoding);
            var y = formato.darFormato();
            console.log(y); //VA PARA SALIDA
            localStorage.setItem("dad", contenido.id);
        }
    };
    return DobleIndice;
}());
exports.DobleIndice = DobleIndice;
