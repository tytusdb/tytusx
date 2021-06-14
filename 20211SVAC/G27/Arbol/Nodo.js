var Nodo = /** @class */ (function () {
    function Nodo(id, valor) {
        this.id = id;
        this.valor = valor;
        this.hijos = new Array();
    }
    Nodo.prototype.getCantidadHijos = function () {
        return this.hijos.length;
    };
    Nodo.prototype.getHijos = function () {
        return this.hijos;
    };
    Nodo.prototype.insertHijo = function (id, valor) {
        var hijo = new Nodo(id, valor);
        this.hijos.push(hijo);
    };
    return Nodo;
}());
