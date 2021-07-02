const TraduccionConsulta = require('./TraducirConsulta')

export default class TraductorXML {

    static stack = []
    static heap = []
    ps = 0
    ph = 0
    cadena = ""
    cadenamain = ""
    xpath = ""
    encoding = ""
    contador = 0;
    t = 0;
    taux = 0;

    constructor(entorno) {
        this.encoding = localStorage.getItem("encoding")
        this.traducir(entorno)
        this.antesMain(TraductorXML.stack, TraductorXML.heap, entorno, null)
        this.hacerHeader()
    }

    antesMain(stack, heap, tablaS, resultado) {
        if (resultado != null) {
            this.xpath += "/*------CONSULTA------*/"
            this.xpath += "    void imprimirConsulta() {\n"
            let formato = new TraduccionConsulta(stack, heap, resultado, tablaS, this.encoding, this.t)
            let consulta = formato.darFormato()
            this.xpath += consulta.string
            this.t = consulta.number
            this.xpath += "    }\n"
        }
    }

    traducir(ent) {
        let t2 = this.t
        this.t++
        for (let i: number = 0; i < ent.length; i++) {
            ent[i].posicion = this.ps
            let letras = ent[i].valor.split("")
            this.cadenamain += "    t" + t2 + " = H;\n"
            TraductorXML.stack.push(this.ph)
            letras.forEach(el => {
                this.cadenamain += "    heap[(int)H] = " + el.charCodeAt(0) + ";\n"
                TraductorXML.heap.push(el.charCodeAt(0))
                this.cadenamain += "    H = H + 1;\n"
                this.ph++
            });
            this.cadenamain += "    heap[(int)H] = -1;\n"
            TraductorXML.heap.push(-1)
            this.cadenamain += "    H = H + 1;\n"
            this.ph++
            this.cadenamain += "    t" + this.t + " = S + 0;\n"
            this.cadenamain += "    stack[(int)t" + this.t + "] = t" + t2 + ";\n"
            if (ent[i + 1] != undefined) {
                this.cadenamain += "    S = S + 1;\n"
                this.ps++
            } else {
                this.cadenamain += "    S = S + 0;\n"
            }
        }
        this.t++
        this.cadenamain += "    S = S - " + this.ps + ";\n"
        this.cadenamain += "    t" + this.t + " = stack[(int)S];\n"
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
        this.cadena += "    S = 0; H = 0;\n"
        this.cadena += this.cadenamain + "\n"
        if (this.xpath != "") {
            this.cadena += "    imprimirConsulta();\n"
        }
        this.cadena += "    printf(\"%c\", (char)10);\n"
        this.cadena += "    return;\n"
        this.cadena += "}\n"
    }

    getTraduccion(): string {
        return this.cadena;
    }
}