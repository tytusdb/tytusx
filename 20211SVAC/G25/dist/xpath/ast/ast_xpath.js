var AST_XPATH = /** @class */ (function () {
    function AST_XPATH(instrucciones) {
        this.instrucciones = instrucciones;
        this.columna = 0;
        this.linea = 0;
        this.list_error = new Array();
    }
    AST_XPATH.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    AST_XPATH.prototype.getValorImplicito = function () {
        return this.instrucciones;
    };
    AST_XPATH.prototype.generarGrafo = function (g, padre) {
        var nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"INICIO\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        padre = nombreHijo;
        this.instrucciones.forEach(function (or) {
            or.forEach(function (o) {
                /*nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\""+ o.getNombreHijo() +"\"];\n";
                g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
                g.count++;*/
                nombreHijo = o.generarGrafo(g, nombreHijo);
            });
        });
        return null;
    };
    AST_XPATH.prototype.getNombreHijo = function () {
        return "";
    };
    AST_XPATH.prototype.setErrores = function (lista_error) {
        this.list_error = lista_error;
    };
    AST_XPATH.prototype.getErrores = function () {
        var lista_errores = this.list_error;
        return lista_errores;
    };
    return AST_XPATH;
}());
