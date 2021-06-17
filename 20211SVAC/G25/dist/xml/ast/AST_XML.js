"use strict";
class AST_XML {
    constructor(expresiones) {
        this.expresiones = expresiones;
        this.list_grammar = new Array();
        this.list_error = new Array();
        this.line = 0;
        this.column = 0;
    }
    getExpresiones() {
        return this.expresiones;
    }
    setProducciones(lista_grammar) {
        this.list_grammar = lista_grammar;
    }
    setErrores(lista_error) {
        this.list_error = lista_error;
    }
    getErrores() {
        let count = 1;
        let text = `
        <table class="default">
            <tr>
            <td>No.</td>
            <td>Tipo</td>
            <td>Descripción</td>
            <td>Línea</td>
            <td>Columna</td>
            </tr>
        `;
        this.list_error.forEach((e) => {
            text += `
            <tr>
                <td>${count}</td>
                <td>${e.getTipo()}</td>
                <td>${e.getDescripcion()}</td>
                <td>${e.getLine()}</td>
                <td>${e.getColumn()}</td>
            </tr>
            `;
            count++;
        });
        text += `
            </table>
        `;
        return text;
    }
    getProducciones() {
        let count = 1;
        let text = `
        
        `;
        this.list_grammar.forEach((e) => {
            text += `
            <tr>
                <td>${count}</td>
                <td>${e.getProduccion()}</td>
                <td>${e.getRegla()}</td>
            </tr>
            `;
            count++;
        });
        return text;
    }
    getTipo(e) {
        return Tipo.OBJETO;
    }
    ;
    getValorImplicito(e) {
        return null;
    }
    ;
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.count;
        g.graph += "    " + nombreHijo + "[label=\"ESTRUCTURA\"];\n";
        g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
        g.count++;
        padre = nombreHijo;
        this.expresiones.forEach((o) => {
            nombreHijo = "nodo" + g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + o.getNombreHijo() + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
            o.generarGrafo(g, nombreHijo);
        });
        return null;
    }
    ;
    getNombreHijo() {
        return "";
    }
    ;
}
