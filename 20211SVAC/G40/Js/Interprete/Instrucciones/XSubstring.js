"use strict";

var XSubstring = /** @class */ (function () {
    function XSubstring(linea, columna, cadena, start, len, mode) {
        this.linea = linea;
        this.columna = columna;
        this.cadena = cadena;
        this.tipo = TipoXInstruccion.XSUBSTRING;
        this.start = start - 1;
        this.len = len;
        this.mode = mode;
    }
    XSubstring.prototype.ejecutar = function (ent, arbol) {
        
        if(this.mode == 1){

            var expAux = this.cadena.getValorImplicito("","");
            var resultado = expAux.slice(this.start,this.len);
            return resultado;
            
        } else {
            var expAux = this.cadena.getValorImplicito("","");
            var resultado = expAux.slice(this.start);
            return resultado;
        }
       
    };

    XSubstring.prototype.getTipo = function (){
        return this.tipo;
    };
    return XSubstring;
}());