var tipoElemento;
(function (tipoElemento) {
    tipoElemento[tipoElemento["DIAGONAL"] = 0] = "DIAGONAL";
    tipoElemento[tipoElemento["DOBLE_DIAGONAL"] = 1] = "DOBLE_DIAGONAL";
})(tipoElemento || (tipoElemento = {}));
var Elemento = /** @class */ (function () {
    function Elemento(valor, tipo) {
        this.valor = valor;
        this.tipo = tipo;
    }
    Elemento.prototype.ejecutarInstrucciones = function (objetoRaiz, elementoABuscar) {
        var listaRetorno = [];
        if (Array.isArray(objetoRaiz)) {
            objetoRaiz.forEach(function (value) {
                if (elementoABuscar.tipo == tipoElemento.DIAGONAL) {
                    listaRetorno = listaRetorno.concat(value.obtenerBarraSimple(elementoABuscar.valor));
                }
                else if (elementoABuscar.tipo == tipoElemento.DOBLE_DIAGONAL) {
                    listaRetorno = listaRetorno.concat(value.obtenerBarraDoble(elementoABuscar.valor));
                }
            });
        }
        return listaRetorno;
    };
    return Elemento;
}());
