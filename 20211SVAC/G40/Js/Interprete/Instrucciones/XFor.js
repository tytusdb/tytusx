"use strict";

var XFor = /** @class */ (function () {
    function XFor(linea, columna, min, max, etiqueta1, etiqueta2, id1, id2) {
        this.linea = linea;
        this.columna = columna;
        this.min = min;
        this.max = max;
        this.etiqueta1 = etiqueta1;
        this.etiqueta2 = etiqueta2;
        this.id1 = id1;
        this.id2 = id2;
        this.tipo = TipoXInstruccion.XFOR;
    }
    XFor.prototype.ejecutar = function (ent, arbol) {

        
        var expAux = "";
        if(this.etiqueta1 == this.etiqueta2){

            if(this.min <= this.max){

                if(this.id1 == this.id2){

                    for (var i = this.min-1; i < this.max; i++) {

                        expAux += `<${this.etiqueta1}>${i+1}</${this.etiqueta2}>\n`;
                        
                      }

                      return expAux;

                } else{
                    ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", this.id2 + " no ha sido declarado","XQUERY")); NumeroE++;
                    return expAux;
                }

            } else {
                ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", "El primer valor númerico debe ser menor  o igual que el segundo","XQUERY")); NumeroE++;
                return expAux;
            }

        }else {
            ListaErr.agregarError(new Error(NumeroE, this.linea, this.columna, "Semántico", this.etiqueta1 +` no es igual que `+this.etiqueta2,"XQUERY")); NumeroE++;
            return expAux;
        }

    };

    XFor.prototype.getTipo = function (){
        return this.tipo;
    };

    XFor.prototype.getEtiqueta1 = function (){
        return this.etiqueta1;
    };

    XFor.prototype.getEtiqueta2 = function (){
        return this.etiqueta2;
    };

    XFor.prototype.Min = function (){
        return this.min;
    };
    
    XFor.prototype.Max = function (){
        return this.max;
    };

    XFor.prototype.ID1 = function (){
        return this.id1;
    };

    XFor.prototype.ID2 = function (){
        return this.id2;
    };

    return XFor;
}());