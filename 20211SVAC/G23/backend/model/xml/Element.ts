import { Atributo } from "./Atributo";

export class Element {

    id_open: string;
    id_close: string;
    value: string; // Si tiene hijos no debería tener valor
    attributes: Array<Atributo>; // Lista de posibles atributos
    father: any; // Referencia al nombre, fila y columna del padre
    childs: Array<Element>; // Lista de otros posibles hijos
    line: string;
    column: string;

    constructor(id_open: string, attributes: Array<Atributo>, value: string, childs: Array<Element>, line: string, column: string, id_close: string) {
        this.id_open = id_open;
        this.id_close = id_close;
        this.attributes = attributes;
        this.value = value;
        this.childs = childs;
        this.line = line;
        this.column = column;
        this.father = null;
    }

    verificateNames(): string {
        if ((this.id_close !== null) && (this.id_open !== this.id_close))
            return "La etiqueta de apertura no coincide con la de cierre.";
        if (this.id_open.replace(/\s/g, '').toLowerCase() === "xml")
            return "No se puede nombrar una etiqueta con las letras XML";
        return "";
    }

    /*
    * Devuelve el HTML para el AST del XML
    * */
    public getASTXMLTree(): string {
        let str: string = "";
        str = "<li><a href=''>" + this.id_open + "</a>";
        if (this.attributes == null && this.childs == null && this.value == null) {
            str = str + "</li>";
            return str;
        }
        str = str + "<ul>";

        if (this.attributes != null) {
            str = str + "<li><a href=''>Atributos</a><ul>";
            this.attributes.forEach((value) => {
                str = str + "<li><a href=''>Atributo</a><ul>";
                str = str + "<li><a href=''>" + value.id.slice(0, -1) + "</a></li>"
                str = str + "<li><a href=''>" + value.value + "</a></li>"
                str = str + "</ul></li>\n";
            })
            str = str + "</ul></li>";
        }


        if (this.value != null) {
            str = str + "<li><a href=''>Value</a><ul><li><a href=''>" + this.value + "</a></li></ul></li></ul></li>\n"
            return str;
        }
        if (this.id_close == null) {
            str = str + "</ul></li>\n";
            return str;
        }

        if (this.childs != null) {
            str = str + "<li><a href=''>Children</a><ul>"
            this.childs.forEach((value) => {
                str = str + value.getASTXMLTree();
            });
            str = str + "</ul></li>\n";
        }

        str = str + "</ul></li>\n";
        return str;
    }


    /*PROPERTIES*/
    set Att_Arr(value: Array<Atributo>) {
        this.attributes = value;
    }
    set Children(value) {
        if (value == null) { return; }
        this.childs = value;
        this.childs.forEach((value) => {
            if (value == null) { return; }
            value.Father = this;
        });
    }
    set Close(value: string) {
        this.id_close = value;
    }
    set Value(value: string) {
        this.value = value;
    }
    set Father(value: any) {
        this.father = value;
    }


    get Children() {
        return this.childs;
    }



    /*DO NOT INCLUDE*/
    printTest(tab_num: any) {
        let str: string = "";
        str = this.getDashes(tab_num) + "Nodo: " + this.id_open + "\t";


        if (this.attributes != null) {
            str = str + "\tAtributos:\t";
            this.attributes.forEach((value) => {
                str = str + value.id + ": " + value.value + "   ";
            })
        }
        if (this.value != null) {
            str = str + "*** Valor *** " + this.value;
            console.log(str);
            return;
        }
        if (this.id_close == null) {
            console.log(str);
            return;
        }
        if (this.childs != null) {
            str = str + "*** Children **** ";
            console.log(str);
            this.childs.forEach((value) => {
                value.printTest(tab_num + 1);
            });
        }
    }
    getDashes(num: any): string {
        let a = "";
        for (let i = 0; i < num * 2; i++) {
            a += "-";
        }
        return a;
    }
    public printChildren() {
        if (this.childs == null) { return; }
        this.childs.forEach((value) => {
            console.log(this);
            value.printChildren();
        });
    }

}