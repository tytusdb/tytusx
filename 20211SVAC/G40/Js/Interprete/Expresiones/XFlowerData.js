"use strict";

var XFlowerData = /** @class */ (function () {
    function XFlowerData(idflower, identificador, linea, columna) {
        this.linea = linea;
        this.idflower = idflower;
        this.identificador = identificador;
        this.columna = columna;
        this.tipo = "";
    }
    XFlowerData.prototype.getTipo = function (ent, arbol) {
        return this.tipo;
    };

    XFlowerData.prototype.getIDFlower = function (ent, arbol) {
        return this.idflower;
    };

    XFlowerData.prototype.getIDIdentificador = function (ent, arbol) {
        return this.identificador;
    };

    XFlowerData.prototype.getValorImplicito = function (objetosPadre, arbol) {

            var entornoActual = objetosPadre;
            var objetos = [];
            var entornos = [];
            var id = this.identificador;

            entornoActual.forEach(function (entorno){

                var objetosAux = entorno.getObjetos();

                objetosAux.forEach(function (objeto){

                if(objeto.getID().toLowerCase() == id.toLowerCase()){
                    if(ObjetoYaExiste(objetos,objeto.LeerID())==false){
                        objetos.push(objeto);
                        if(EntornoYaExiste(entornos,objeto.getEntorno().getID())==false){
                            entornos.push(objeto.getEntorno());
                        } 
                    }                        
                } 
                });            
            });      

            return [entornos, objetos];

    };
    return XFlowerData;
}());

