var tsObjetoHeap = /** @class */ (function () {
    function tsObjetoHeap(posicion, valor) {
        this.posicion = posicion;
        this.valor = valor;
    }
    tsObjetoHeap.prototype.getPosicion = function () {
        return this.posicion;
    };
    tsObjetoHeap.prototype.setPosicion = function (posicion) {
        this.posicion = posicion;
    };
    tsObjetoHeap.prototype.getValor = function () {
        return this.valor;
    };
    tsObjetoHeap.prototype.setValor = function (valor) {
        return this.valor = valor;
    };
    return tsObjetoHeap;
}());
