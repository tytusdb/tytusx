"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Clase para guardar las filas del reporte gramatical
var FilaGrammar = /** @class */ (function () {
    /**
     *
     * @param arreglo arreglo de cadenas(string) con contenido de gramatica [0->produccion,1->accion]
     */
    function FilaGrammar(arreglo) {
        this.produccion = (arreglo[0] != null) ? arreglo[0] : '';
        this.accion = (arreglo[1] != null) ? arreglo[1] : '';
    }
    return FilaGrammar;
}());
exports.FilaGrammar = FilaGrammar;
