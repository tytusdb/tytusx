"use strict";
exports.__esModule = true;
exports.Ambito = void 0;
/* El ambito internamente almacenara una tabla de simbolos
    La tabla de simbolos podra contener cualquier tipo especificado en 'Tipo.ts'
*/
var Ambito = /** @class */ (function () {
    function Ambito(ambito_anterior) {
        this.ambito_anterior = ambito_anterior;
        this.tablaSimbolos = {};
    }
    Ambito.prototype.agregar = function (id, simbolo) {
        this.tablaSimbolos[id] = simbolo; // insercion a la tabla hash.
    };
    return Ambito;
}());
exports.Ambito = Ambito;
