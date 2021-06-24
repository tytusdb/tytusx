var tsXML = /** @class */ (function () {
    function tsXML() {
        this.listaObjetos = new Array();
    }
    tsXML.prototype.getObjetoPorID = function (id) {
        var cantidadObjetos = this.listaObjetos.length;
        for (var i = 0; i < cantidadObjetos; i++) {
            var ident = this.listaObjetos[i].identificador;
            if (ident = id) {
                return this.listaObjetos[i];
            }
        }
        return null;
    };
    tsXML.prototype.insertarObjeto = function (id, tipo, entorno, sp) {
        var objeto = new tsObjeto(id, tipo, entorno);
        this.listaObjetos.push(objeto);
    };
    tsXML.prototype.getCantidadObjetos = function () {
        return this.listaObjetos.length;
    };
    tsXML.prototype.generaEncabezadoXML3D = function () {
        var texto = "";
        texto += "/***********HEADER**********/";
        texto += "#include <stdio.h>\n\n";
        texto += "double heap[30101999]";
        texto += "double stack[30101999]";
        texto += "double S;\n";
        texto += "double H; \n\n";
        texto += "Ejemplo\n";
        texto += "/*--------MAIN---------*/\n";
        texto += "void main(){\n";
        texto += "S = 0; H = 0;\n\n";
        texto += "" + this.listaObjetos[0].identificador;
        texto += "\nreturn;\n";
        texto += "}";
        return texto;
    };
    return tsXML;
}());
