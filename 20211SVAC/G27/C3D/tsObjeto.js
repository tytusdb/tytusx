var tsObjeto = /** @class */ (function () {
    function tsObjeto(identificador, tipo, entorno) {
        this.identificador = identificador;
        this.tipo = tipo;
        this.entorno = entorno;
        this.sp = 0;
        this.longitud = this.identificador.length;
    }
    return tsObjeto;
}());
