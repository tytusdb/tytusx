"use strict";
exports.__esModule = true;
exports.AST = void 0;
var Entorno_1 = require("./Entorno");
var AST = /** @class */ (function () {
    function AST(instrucciones, entornos) {
        this.entornos = [];
        this.errores = [];
        this.ast = [];
        this.instrucciones = instrucciones;
        this.entornos.push(entornos);
    }
    AST.prototype.GetRespuesta = function () {
        return this.respuesta;
    };
    AST.prototype.addResultado = function (res) {
        this.respuesta = res;
    };
    AST.prototype.addErrores = function (err) {
        this.errores = err;
    };
    /*  AddC3D(codigo:string){
         this.C3D = codigo;
     } */
    // AddTabla(){
    //     var tabla = this.GetTablaStorage();
    //     this.tabla = tabla;
    //     console.log(this.tabla)
    // }
    //obtener errores
    AST.prototype.GetErrorStorage = function () {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    };
    AST.prototype.CrearEntorno = function (id, anterior) {
        var exist_ent = false;
        for (var _i = 0, _a = this.entornos; _i < _a.length; _i++) {
            var ent = _a[_i];
            if (ent.getIdentificador() == id) {
                exist_ent = true;
            }
        }
        if (!exist_ent) {
            var entorno_nuevo = new Entorno_1.Entorno(id, anterior);
            this.entornos.push(entorno_nuevo);
        }
    };
    AST.prototype.getEntorno = function (id) {
        for (var _i = 0, _a = this.entornos; _i < _a.length; _i++) {
            var ent = _a[_i];
            if (ent.getIdentificador() == id) {
                return ent;
            }
        }
        return null;
    };
    //actualizar contador
    AST.prototype.SetTablaStorage = function (tabla) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    };
    //obtener tabla simbolos
    AST.prototype.GetTablaStorage = function () {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    };
    return AST;
}());
exports.AST = AST;
