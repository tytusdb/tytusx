export default class TraductorXML {

    static stack = []
    static heap = []
    ps = 0
    ph = 0
    cadena = ""
    cadenamain = ""
    cadena2 = ""
    contador = 0;
    t = 0;
    taux = 0;

    constructor(entorno) {
        this.traducir(entorno)
        this.antesMain(TraductorXML.stack, TraductorXML.heap, entorno)
        this.hacerHeader()
    }

    antesMain(stack, heap, tabla) {
        console.log(stack)
        console.log(heap)
    }

    traducir(ent) {
        for (let i: number = 0; i < ent.length; i++) {
            if (ent[i].tipo == "Etiqueta") {
                this.cadenamain += "\n/*------SE INGRESA UNA ETIQUETA------*/\n"

            } else if (ent[i].tipo == "Texto") {
                this.cadenamain += "\n/*------SE INGRESA UN TEXTO------*/\n"

            } else if (ent[i].tipo == "Atributo") {
                this.cadenamain += "\n/*------SE INGRESA UN ATRIBUTO------*/\n"

            } else if (ent[i].tipo == "Valor") {
                this.cadenamain += "\n/*------SE INGRESA UN VALOR------*/\n"

            }
            ent[i].posicion == this.ps
            let letras = ent[i].valor.split("")
            this.cadenamain += "    t" + this.t + " = H;\n"
            let t2 = this.t
            this.t++
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
            this.t++
            if (ent[i + 1] != undefined) {
                this.cadenamain += "    S = S + 1;\n"
                this.ps++
            } else {
                this.cadenamain += "    S = S + 0;\n"
            }
        }
        this.cadenamain += "    S = S - " + this.ps + ";\n"
        this.cadenamain += "    t" + this.t + " = stack[(int)S];\n"
        this.t++
    }

    hacerHeader() {
        this.cadena += "/*------HEADER------*/\n"
        this.cadena += "#include <stdio.h>\n"
        this.cadena += "#include <math.h>\n\n"
        this.cadena += "double stack[30062021];\n"
        this.cadena += "double heap[30062021];\n"
        this.cadena += "double S;\n"
        this.cadena += "double H;\n"
        if (this.t > 0) {
            this.cadena += "double "
            for (let i = 0; i < this.t; i++) {
                if (i < (this.t - 1)) {
                    this.cadena += "t" + i + ", "
                } else {
                    this.cadena += "t" + i + ";\n\n"
                }
            }
            if (this.cadena2 != "") {
                this.cadena += this.cadena2 + "\n\n"
            }
        } else {
            this.cadena += "\n\n"
        }
        this.cadena += this.cadena2 + "\n\n"
        this.cadena += "/*------MAIN------*/\n"
        this.cadena += "void main() {\n"
        this.cadena += "    S = 0; H = 0;\n"
        this.cadena += this.cadenamain + "\n"
        this.cadena += "    printf(\"%c\", (char)10);\n"
        this.cadena += "    return;\n"
        this.cadena += "}\n"
    }

    getTraduccion(): string {
        return this.cadena;
    }
}