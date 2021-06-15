"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambito = void 0;
/* El ambito internamente almacenara una tabla de simbolos
    La tabla de simbolos podra contener cualquier tipo especificado en 'Tipo.ts'
*/
class Ambito {
    constructor(ambito_anterior) {
        this.ambito_anterior = ambito_anterior;
        this.tablaSimbolos = {};
    }
    agregar(id, simbolo) {
        this.tablaSimbolos[id] = simbolo; // insercion a la tabla hash.
    }
}
exports.Ambito = Ambito;
