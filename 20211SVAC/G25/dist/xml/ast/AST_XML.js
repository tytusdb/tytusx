var AST_XML = /** @class */ (function () {
    function AST_XML(expresiones) {
        this.expresiones = expresiones;
        this.list_grammar = new Array();
        this.list_error = new Array();
        this.line = 0;
        this.column = 0;
    }
    AST_XML.prototype.getExpresiones = function () {
        return this.expresiones;
    };
    AST_XML.prototype.setProducciones = function (lista_grammar) {
        this.list_grammar = lista_grammar;
    };
    AST_XML.prototype.setErrores = function (lista_error) {
        this.list_error = lista_error;
    };
    AST_XML.prototype.getErrores = function () {
        var lista_errores = this.list_error;
        return lista_errores;
    };
    AST_XML.prototype.getProducciones = function () {
        var count = 1;
        var text = "\n        \n        ";
        this.list_grammar.forEach(function (e) {
            text += "\n            <tr>\n                <td>" + count + "</td>\n                <td>" + e.getProduccion() + "</td>\n                <td>" + e.getRegla() + "</td>\n            </tr>\n            ";
            count++;
        });
        return text;
    };
    AST_XML.prototype.getTipo = function (e) {
        return Tipo.OBJETO;
    };
    ;
    AST_XML.prototype.getValorImplicito = function (e) {
        return null;
    };
    ;
    AST_XML.prototype.generarGrafo = function (g, padre) {
        var nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"ESTRUCTURA\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        padre = nombreHijo;
        this.expresiones.forEach(function (o) {
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + o.getNombreHijo() + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            o.generarGrafo(g, nombreHijo);
        });
        return null;
    };
    ;
    AST_XML.prototype.getNombreHijo = function () {
        return "";
    };
    ;
    return AST_XML;
}());
