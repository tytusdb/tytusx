import { InsertarCst } from "./ReportController";
export default class ASTNodo {
    constructor(produccion, token, regla) {
        this.produccion = produccion;
        if (token != undefined) {
            this.token = this.escapeHtml(token);
        }
        else {
            this.token = ' ';
        }
        this.regla = regla;
        this.id = this.generarID();
        this.listaIns = [];
        let temp = this.id + this.label(this.produccion, this.token, this.regla);
        console.log(temp);
        InsertarCst(temp);
    }
    label(produccion, token, regla) {
        return '[ shape = none, label=<\n' +
            '            <TABLE border="0" cellspacing="0">\n' +
            '                <TR>\n' +
            '                   <TD port="port1" bgcolor="yellow" border="1">\n' +
            '                     <FONT POINT-SIZE="15"> ' + produccion + ' : ' + token + '</FONT>\n' +
            '                   </TD>\n' +
            '                </TR>\n' +
            '                <TR>\n' +
            '                   <TD port="port1" border="1">\n' +
            '                     <FONT POINT-SIZE="10"> -' + regla + '</FONT>\n' +
            '                   </TD>\n' +
            '                </TR>\n' +
            '            </TABLE>\n' +
            '            >\n' +
            '            ];\n';
    }
    InsertarLista(listaNodo, produccion, regla) {
        let puntero = new ASTNodo(produccion, "", regla);
        this.InsertarHijo(puntero);
        for (let x of listaNodo) {
            if (listaNodo[listaNodo.length - 1] == x) {
                puntero.InsertarHijo(x.cst);
            }
            else {
                let tempX = new ASTNodo(produccion, "", regla);
                puntero.InsertarHijo(tempX);
                puntero.InsertarHijo(x.cst);
                puntero = tempX;
            }
        }
    }
    escapeHtml(unsafe) {
        return unsafe
            .replace('&', " &#38; ")
            .replace('<', " &#60; ")
            .replace('>', " &#62; ")
            .replace(':', " &#32;")
            .replace("'", "&#39;");
    }
    InsertarHijo(hijo) {
        try {
            if (!(hijo.produccion == 'lista_nodos' && this.produccion == 'cuerpo_nodo')) {
                this.listaIns.push(hijo);
                console.log(this.id + "->" + hijo.id);
                InsertarCst(this.id + "->" + hijo.id + ";\n");
                console.log("---------------INSERTAR HIJO--------------------");
                console.log(localStorage.getItem("cst"));
                console.log("------------------------------------------------");
            }
        }
        catch (e) {
        }
    }
    InsertarEspecial(hijo) {
        this.InsertarHijo(hijo);
        return hijo;
    }
    InsertarUnNodo(produccion, token) {
        const temp = new ASTNodo(produccion, token);
        if (temp.produccion != undefined) {
            if (!(temp.produccion == 'lista_nodos' && this.produccion == 'cuerpo_nodo')) {
                this.listaIns.push(temp);
                console.log(this.id + "->" + temp.id);
                InsertarCst(this.id + "->" + temp.id + ";\n");
                console.log("---------------INSERTAR NODO--------------------");
                console.log(localStorage.getItem("cst"));
                console.log("------------------------------------------------");
            }
        }
    }
    generarID() {
        return '"' + Math.random().toString(36).substr(2, 9) + '"';
    }
}
//# sourceMappingURL=ASTNodo.js.map