var tsHeap = /** @class */ (function () {
    function tsHeap() {
        this.listaObjetos = new Array();
    }
    tsHeap.prototype.insertarObjeto = function (idpadre, posicion, valor) {
        var objeto = new tsObjetoHeap(idpadre, posicion, valor);
        this.listaObjetos.push(objeto);
    };
    tsHeap.prototype.getCantidadObjetos = function () {
        return this.listaObjetos.length;
    };
    return tsHeap;
}());
