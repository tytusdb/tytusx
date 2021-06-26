var tsXML = /** @class */ (function () {
    function tsXML() {
        this.listaObjetos = new Array();
    }
    tsXML.prototype.getObjetoPorID = function (id) {
        var cantidadObjetos = this.listaObjetos.length;
        for (var i = 0; i < cantidadObjetos; i++) {
            var ident = this.listaObjetos[i].identificador;
            if (ident = id) {
                return this.listaObjetos[i];
            }
        }
        return null;
    };
    tsXML.prototype.insertarObjeto = function (id, tipo, entorno, padre) {
        var i = this.getCantidadObjetos();
        var objeto = new tsObjeto(i, id, tipo, entorno, padre);
        this.listaObjetos.push(objeto);
    };
    tsXML.prototype.getCantidadObjetos = function () {
        return this.listaObjetos.length;
    };
    //funcion para insertar el temporal generado en el C3D al símbolo que se está construyendo
    tsXML.prototype.insertaTemporal = function (posicion, identificador, temporal) {
        var cantidadObjetos = this.getCantidadObjetos();
        if (cantidadObjetos > 0) {
            //se recorre el listado de símbolos
            for (var i = 0; i < cantidadObjetos; i++) {
                //si el símbolo.identificador es igual al parámetro identificador, se asigna el temporal
                if (this.listaObjetos[i].i == posicion) {
                    this.listaObjetos[i].sp = temporal;
                    i = cantidadObjetos;
                }
            }
        }
    };
    return tsXML;
}());
