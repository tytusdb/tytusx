"use strict";
exports.__esModule = true;
exports.HeaderC3D = void 0;
var parse = require('../../analizadorXPath/Xpath').parse;
var grammar = require('../../analizadorXML/grammar');
var HeaderC3D = /** @class */ (function () {
    function HeaderC3D(linea, columna, cont_ini, cont_fin, code) {
        this.linea = linea;
        this.columna = columna;
        this.cont_ini = cont_ini;
        this.cont_fin = cont_fin;
        this.code = code;
    }
    HeaderC3D.prototype.ejecutar = function (ent) {
        var def_temp = '';
        var output = "/*------HEADER------*/\n#include <stdio.h>\n#include <math.h>\n\n\ndouble heapxq[30101999];\ndouble stackxq[30101999];\ndouble PQ;\ndouble HQ;\ndouble ";
        for (var i = this.cont_ini; i < (this.cont_fin - 1); i++) {
            def_temp += 't' + i + ', ';
        }
        def_temp += 't' + (this.cont_fin - 1) + ';\n\n';
        output = output + def_temp + this.code;
        return output;
    };
    //obtener contador
    HeaderC3D.prototype.GetCountStorage = function () {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    };
    //actualizar contador
    HeaderC3D.prototype.SetStorage = function (contador) {
        localStorage.setItem('contador', JSON.stringify(contador));
    };
    return HeaderC3D;
}());
exports.HeaderC3D = HeaderC3D;
