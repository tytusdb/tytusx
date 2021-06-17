var Ejecutar = /** @class */ (function () {
    function Ejecutar(listaInstrucciones, objetoRaiz) {
        this.listaInstrucciones = listaInstrucciones;
        this.objetoRaiz = objetoRaiz;
    }
    Ejecutar.prototype.ejecutar = function (objetoRaiz) {
        var resultadoParcial = objetoRaiz;
        this.listaInstrucciones.forEach(function (value) {
            resultadoParcial = value.ejecutarInstrucciones(resultadoParcial, value);
        });
        return resultadoParcial;
    };
    return Ejecutar;
}());
