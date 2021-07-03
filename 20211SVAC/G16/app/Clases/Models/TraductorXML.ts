const TraduccionConsulta = require('./TraducirConsulta.js')

export default class TraductorXML {

    static stack = []
    static heap = []
    ps = 0
    ph = 0
    cadena = ""
    cadenamain = ""
    xpath = ""
    encoding = ""
    tipo = ""
    contador = 0;
    t = 0;
    taux = 0;

    constructor(entorno, consulta, tipo) {
        this.tipo = tipo
        this.encoding = localStorage.getItem("encoding")
        this.traducir(entorno)
        this.antesMain(TraductorXML.stack, TraductorXML.heap, entorno, consulta)
        this.hacerHeader()
    }

    antesMain(stack, heap, tablaS, resultado) {
        if (resultado.length != 0) {
            if (this.tipo == "xpath") {
                let formato = new TraduccionConsulta.default(stack, heap, resultado, tablaS, this.encoding, this.t)
                let consulta = formato.darFormato()
                this.xpath += consulta.cad
                this.t = consulta.num
            } else if (this.tipo == "xquery") {

            }
        }
    }

    traducir(ent) {
        let t2 = this.t
        this.t++
        for (let i: number = 0; i < ent.length; i++) {
            ent[i].posicion = this.ps
            let letras = ent[i].valor.split("")
            this.cadenamain += "\tt" + t2 + " = H;\n"
            TraductorXML.stack.push(this.ph)
            letras.forEach(el => {
                this.cadenamain += "\theap[(int)H] = " + el.charCodeAt(0) + ";\n"
                TraductorXML.heap.push(el.charCodeAt(0))
                this.cadenamain += "\tH = H + 1;\n"
                this.ph++
            });
            this.cadenamain += "\theap[(int)H] = -1;\n"
            TraductorXML.heap.push(-1)
            this.cadenamain += "\tH = H + 1;\n"
            this.ph++
            this.cadenamain += "\tt" + this.t + " = S + 0;\n"
            this.cadenamain += "\tstack[(int)t" + this.t + "] = t" + t2 + ";\n"
            if (ent[i + 1] != undefined) {
                this.cadenamain += "\tS = S + 1;\n"
                this.ps++
            } else {
                this.cadenamain += "\tS = S + 0;\n"
            }
        }
        this.t++
        this.cadenamain += "\tS = S - " + this.ps + ";\n"
        this.cadenamain += "\tt" + this.t + " = stack[(int)S];\n"
        this.t++
        localStorage.setItem("tablaSimboloAux", JSON.stringify(ent))
    }

    hacerHeader() {
        this.cadena += "/*------HEADER------*/\n"
        this.cadena += "#include <stdio.h>\n"
        this.cadena += "#include <math.h>\n\n"
        this.cadena += "float stack[30062021];\n"
        this.cadena += "float heap[30062021];\n"
        this.cadena += "float S;\n"
        this.cadena += "float H;\n"
        if (this.t > 0) {
            this.cadena += "float "
            for (let i = 0; i < this.t; i++) {
                if (i < (this.t - 1)) {
                    this.cadena += "t" + i + ", "
                } else {
                    this.cadena += "t" + i + ";\n\n"
                }
            }
        } else {
            this.cadena += "\n"
        }
        if (this.xpath != "") {
            this.cadena += this.xpath + "\n\n"
        }
        this.cadena += "/*------MAIN------*/\n"
        this.cadena += "void main() {\n"
        this.cadena += "\tS = 0; H = 0;\n"
        this.cadena += this.cadenamain
        if (this.xpath != "") {
            this.cadena += "\tconsulta();\n\n"
        }
        this.cadena += "\tprintf(\"%c\", (char)10);\n"
        this.cadena += "\treturn;\n"
        this.cadena += "}\n"
    }

    getTraduccion(): string {
        return this.cadena;
    }
}