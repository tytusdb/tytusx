
var RError = /** @class */ (function () {
    function RError(columna, fila, tipo, descripcion) {
        this.columna = columna;
        this.fila = fila;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
    return RError;
}());
exports.RError = RError;
