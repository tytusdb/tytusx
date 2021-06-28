var tsStack = /** @class */ (function () {
    function tsStack() {
        this.listaObjetos = new Array();
    }
    tsStack.prototype.getObjetoPorID = function (id) {
        var cantidadObjetos = this.listaObjetos.length;
        for (var i = 0; i < cantidadObjetos; i++) {
        }
        return null;
    };
    tsStack.prototype.insertarObjeto = function (tipo, apuntadorName, apuntadorAtributos, apuntadorHijos, apuntadorContenido) {
        var objeto = new tsObjetoStack(tipo, apuntadorName, apuntadorAtributos, apuntadorHijos, apuntadorContenido);
        this.listaObjetos.push(objeto);
    };
    tsStack.prototype.getCantidadObjetos = function () {
        return this.listaObjetos.length;
    };
    return tsStack;
}());
