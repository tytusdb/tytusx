var tsObjeto = /** @class */ (function () {
    function tsObjeto(id, identificador, tipo, entorno, padre) {
        this.i = id;
        this.identificador = identificador;
        this.tipo = tipo;
        this.entorno = entorno;
        this.sp = 0;
        this.longitud = this.identificador.length;
        this.padre = padre;
    }
    tsObjeto.prototype.setPadre = function (padre) {
        this.padre = padre;
    };
    return tsObjeto;
}());
