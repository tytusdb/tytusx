"use strict";
exports.__esModule = true;
exports.DobleIndice = void 0;
var ConsultasTS_js_1 = require("./ConsultasTS.js");
var DobleIndice = /** @class */ (function () {
    function DobleIndice(contenido) {
        this.ejecuciones = contenido;
    }
    DobleIndice.prototype.execute = function (padre) {
        this.tablasimbolos = JSON.parse(localStorage.getItem("tablasimbolos"));
        console.log(this.tablasimbolos);
        this.encoding = localStorage.getItem("encoding");
        var contenido = this.ejecuciones.execute(padre);
        if (contenido.pred == "false") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x_1 = consulta.newEntorno(padre, contenido.id);
            if (x_1.length > 1) {
                localStorage.setItem("dad", JSON.stringify(x_1));
                //Guardando el padre anterior
                try {
                    localStorage.setItem("dadant", JSON.stringify(padre));
                }
                catch (_a) {
                    localStorage.setItem("dadant", padre);
                }
            }
            else if (x_1[0].Valor == undefined) {
                var lista = [];
                lista.push(x_1[0]);
                localStorage.setItem("dad", JSON.stringify(x_1[0]));
                //Guardando el padre anterior
                try {
                    localStorage.setItem("dadant", JSON.stringify(padre));
                }
                catch (_b) {
                    localStorage.setItem("dadant", padre);
                }
            }
            else {
                var lista = [];
                lista.push(x_1[0].Valor.valor);
                var newdad = JSON.stringify(x_1[0].Valor.valor);
                localStorage.setItem("dad", newdad);
                //Guardando el padre anterior
                try {
                    localStorage.setItem("dadant", JSON.stringify(padre));
                }
                catch (_c) {
                    localStorage.setItem("dadant", padre);
                }
            }
        }
        else if (contenido.pred == "text") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x = consulta.getText(padre);
            localStorage.setItem("dad", x);
            //Guardando el padre anterior
            try {
                localStorage.setItem("dadant", JSON.stringify(padre));
            }
            catch (_d) {
                localStorage.setItem("dadant", padre);
            }
        }
        else if (contenido.pred == "node") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x = consulta.getNode(padre);
            localStorage.setItem("dad", x);
            //Guardando el padre anterior
            try {
                localStorage.setItem("dadant", JSON.stringify(padre));
            }
            catch (_e) {
                localStorage.setItem("dadant", padre);
            }
        }
        else if (contenido.pred == "atributoid") {
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var w = consulta.getOnlyAtributo(padre, contenido.id.indice);
            localStorage.setItem("dad", w);
            //Guardando el padre anterior
            try {
                localStorage.setItem("dadant", JSON.stringify(padre));
            }
            catch (_f) {
                localStorage.setItem("dadant", padre);
            }
        }
        else if (contenido.pred == "atributoT") { //SI VIENE SOLO UN ATRIBUTO
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var w = consulta.getOnlyAtributo(padre, "all");
            localStorage.setItem("dad", w);
            //Guardando el padre anterior
            try {
                localStorage.setItem("dadant", JSON.stringify(padre));
            }
            catch (_g) {
                localStorage.setItem("dadant", padre);
            }
        }
        else if (contenido.pred == "dospuntos") {
            var x_2;
            try {
                x_2 = JSON.parse(localStorage.getItem("dadant"));
                localStorage.setItem("dad", JSON.stringify(x_2));
            }
            catch (_h) {
                x_2 = localStorage.getItem("dadant");
                localStorage.setItem("dad", x_2);
            }
        }
        else if (contenido.pred == "punto") {
        }
        else if (contenido.pred == "menor") {
            console.log(contenido);
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var w = consulta.Menor(contenido.id.indice, contenido.id.tope, padre);
            localStorage.setItem("dad", JSON.stringify(w));
            //Guardando el padre anterior
            try {
                localStorage.setItem("dadant", JSON.stringify(padre));
            }
            catch (_j) {
                localStorage.setItem("dadant", padre);
            }
        }
        else { //ACA ENTRA SI VIENE CON PREDICADO
            var entornotmp = void 0;
            var consulta = new ConsultasTS_js_1.ConsultasTS();
            var x_3 = consulta.newEntorno(padre, contenido.id);
            if (x_3.length > 1) {
                entornotmp = JSON.stringify(x_3);
            }
            else if (x_3[0].Valor == undefined) {
                var lista = [];
                lista.push(x_3[0]);
                entornotmp = JSON.stringify(x_3[0]);
            }
            else {
                var lista = [];
                lista.push(x_3[0].Valor.valor);
                entornotmp = JSON.stringify(x_3[0].Valor.valor);
            }
            //PARA EL PREDICADO
            var pred = contenido.pred.execute(entornotmp);
            //VERIFICAR QUE TIPO DE PREDICADO ES:
            if (pred.pred != undefined) {
                if (pred.pred == "menor") {
                    var consulta_1 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_1.Menor(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_k) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
                else if (pred.pred == "mayor") {
                    var consulta_2 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_2.Mayor(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_l) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
                else if (pred.pred == "menori") {
                    var consulta_3 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_3.Menori(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_m) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
                else if (pred.pred == "mayori") {
                    var consulta_4 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_4.Mayori(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_o) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
                else if (pred.pred == "igual") {
                    var consulta_5 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_5.Igual(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_p) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
                else if (pred.pred == "noigual") {
                    var consulta_6 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_6.Diferente(pred.id.indice, pred.id.tope, entornotmp);
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_q) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
                else if (pred.pred == "atributoid") { //SI VIENE SOLO UN ATRIBUTO
                    var consulta_7 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_7.getAtributo(entornotmp, pred.id.indice);
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_r) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
                else if (pred.pred == "atributoT") { //SI VIENE SOLO UN ATRIBUTO
                    var consulta_8 = new ConsultasTS_js_1.ConsultasTS();
                    var w = consulta_8.getAtributo(entornotmp, "all");
                    localStorage.setItem("dad", JSON.stringify(w));
                    //Guardando el padre anterior
                    try {
                        localStorage.setItem("dadant", JSON.stringify(padre));
                    }
                    catch (_s) {
                        localStorage.setItem("dadant", entornotmp);
                    }
                }
            }
            else { //SI ENTRA ACÁ ES POR QUE VIENE DIRECTO UN NUMERO NO UN ARREGLO DE NUMEROS.
                var consulta_9 = new ConsultasTS_js_1.ConsultasTS();
                var w = consulta_9.getPredicado(entornotmp, pred);
                localStorage.setItem("dad", JSON.stringify(w));
                //Guardando el padre anterior
                try {
                    localStorage.setItem("dadant", JSON.stringify(padre));
                }
                catch (_t) {
                    localStorage.setItem("dadant", entornotmp);
                }
            }
        }
    };
    return DobleIndice;
}());
exports.DobleIndice = DobleIndice;
