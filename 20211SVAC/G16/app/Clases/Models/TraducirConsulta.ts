import { Buffer } from 'buffer'

export class TraducirConsulta {

    encoding = ""
    stack = []
    heap = []
    consulta = []
    simbolos = []
    padre = ""
    cadenita = ""
    t = 0
    l = 0

    constructor(stack, heap, consulta, simbolos, encoding, t) {
        this.stack = stack
        this.heap = heap
        this.consulta = consulta
        this.simbolos = simbolos
        this.encoding = encoding
        this.t = t
    }

    darFormato() {
        let cadena = ""
        let t2 = 0
        let l2 = 0
        let posi = ""
        
        return { string: cadena, number: this.t }
    }

    armar() {

    }

    convertir(cadena): string {
        if (this.encoding == "utf") {
            let bufer = new Buffer(cadena, "utf-8");
            return bufer.toString("utf8")

        } else if (this.encoding == "iso") {
            return this.utf8_encode(cadena);

        } else if (this.encoding == "ascii") {
            let bufer = new Buffer(cadena, "ascii");
            return bufer.toString("ascii")
        }
        return "error"
    }

    utf8_encode(argString) {
        if (argString === null || typeof argString === 'undefined') {
            return ''
        }
        const string = (argString + '')
        let utftext = ''
        let start
        let end
        let stringl = 0
        start = end = 0
        stringl = string.length
        for (let n = 0; n < stringl; n++) {
            let c1 = string.charCodeAt(n)
            let enc = null
            if (c1 < 128) {
                end++
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                )
            } else if ((c1 & 0xF800) !== 0xD800) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            } else {
                if ((c1 & 0xFC00) !== 0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n)
                }
                const c2 = string.charCodeAt(++n)
                if ((c2 & 0xFC00) !== 0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end)
                }
                utftext += enc
                start = end = n + 1
            }
        }
        if (end > start) {
            utftext += string.slice(start, stringl)
        }
        return utftext
    }

}