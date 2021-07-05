"use strict";

var XForSimple = /** @class */ (function () {
    function XForSimple(linea, columna, min, max, id1, id2) {
        this.linea = linea;
        this.columna = columna;
        this.min = min;
        this.max = max;
        this.id1 = id1;
        this.id2 = id2;
        this.tipo = TipoXInstruccion.XFORSIMPLE;
    }
    XForSimple.prototype.ejecutar = function (ent, arbol) {

        
        var expAux = "";
       
            if(this.min <= this.max){

                if(this.id1 == this.id2){

                    for (var i = this.min-1; i < this.max; i++) {

                        var resultado = i + 1;
                        expAux += resultado + "\n";
                        
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

    };

    XForSimple.prototype.getTipo = function (){
        return this.tipo;
    };

    XForSimple.prototype.Min = function (){
        return this.min;
    };
    
    XForSimple.prototype.Max = function (){
        return this.max;
    };

    XForSimple.prototype.ID1 = function (){
        return this.id1;
    };

    XForSimple.prototype.ID2 = function (){
        return this.id2;
    };

    return XForSimple;
}());