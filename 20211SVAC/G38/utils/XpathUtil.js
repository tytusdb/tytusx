"use strict";
class XpathUtil {
    static procesarEncoding(xml) {
        var cadEncoding;
        var xmlBoddy;
        var cad = "";
        if (xml == undefined || xml == null || typeof xml !== 'string') {
            return xml;
        }
        xmlBoddy = xml.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, ' ');
        try {
            cadEncoding = xml
                .match(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g)[0]
                .toUpperCase()
                .match(/ENCODING=\".+\"/g)[0]
                .replace('"', "")
                .replace('"', "")
                .replace("ENCODING=", "");
            return xmlBoddy;
        }
        catch (exception) {
            console.log(exception);
            return xmlBoddy;
        }
    }
    static procesarCaracteresEspeciales(cadena) {
        if (cadena == undefined || cadena == null) {
            return null;
        }
        var nuevaCad = cadena.trim()
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘")
            .replace("& lt ;", "<")
            .replace("& gt ;", ">")
            .replace("& amp ;", "&")
            .replace("& apos ;", "'")
            .replace("& quot ;", "\"")
            .replace("& eq ;", "=")
            .replace("\\=", "=")
            .replace("\\<", "<")
            .replace("\\>", ">")
            .replace("\\/", "\"")
            .replace("\\“", "“")
            .replace("\\\"", "\"")
            .replace("\\'", "'")
            .replace("\\’", "’")
            .replace("\\`", "`")
            .replace("\\`", "\`")
            .replace("\\‘", "‘");
        return nuevaCad;
    }
    static printTabHtml(strTabla) {
        let w = window.open("XPath", "#");
        let d = w.document.open();
        d.write("<!DOCTYPE html><html><header><title>XPath</title></header><body background='../images/fondo-azul.jpg' >" + strTabla + "</body></html>");
        d.close();
    }
    static crearTablaSimbolosAndSetLastPosition(listSimbolos, lastPosition) {
        let ts = new TablaSimbolos(null);
        ts.listaSimbolos = listSimbolos;
        ts.last = lastPosition;
        return ts;
    }
    static crearTablaSimbolos(listSimbolos) {
        let ts = new TablaSimbolos(null);
        ts.listaSimbolos = listSimbolos;
        return ts;
    }
    static crearTablaSimbolos3D(listSimbolos) {
        let ts = new TablaSimbolos3D(null);
        ts.listaSimbolos = listSimbolos;
        return ts;
    }
    static generarIdUnicoTsRow() {
        let cad = "#tsRow" + this.contador;
        this.contador += 1;
        return cad;
    }
    static generarIdUnicoXmlNode() {
        let cad = "N" + this.contador_nodo;
        this.contador_nodo += 1;
        return cad;
    }
    static convertirNodosXpathATexto(simbolos) {
        let salida = "";
        if (simbolos != null) {
            simbolos.chageTypeTsRowAttribute();
            simbolos.eliminarDuplicados();
            salida = simbolos.toStr();
        }
        return salida;
    }
    static convertirNodosXqueryATexto(valoresImpresion) {
        let salida = "";
        if (valoresImpresion != null && valoresImpresion != undefined) {
            for (let valor of valoresImpresion) {
                if (valor instanceof TablaSimbolos) {
                    if (valor != null) {
                        valor.chageTypeTsRowAttribute();
                        valor.eliminarDuplicados();
                        salida += valor.toStr() + '\n';
                    }
                }
                else {
                    salida += valor;
                }
            }
        }
        return salida;
    }
    static convertirXqueryAString(valor) {
        let salida = "";
        if (valor != null && valor != undefined) {
            if (valor instanceof TablaSimbolos) {
                if (valor != null) {
                    valor.chageTypeTsRowAttribute();
                    valor.eliminarDuplicados();
                    salida = valor.toStr();
                }
            }
            else {
                salida = valor;
            }
        }
        return salida;
    }
    static createSimbolo(identificador, valor, tipo, ent, xmlData) {
        if (valor != null && valor != undefined) {
            let simbolo;
            if (valor instanceof Primitive)
                simbolo = new Simbolo(identificador, tipo, valor.getValor(ent, xmlData), null);
            else if (valor instanceof TablaSimbolos)
                simbolo = new Simbolo(identificador, tipo, null, valor);
            else
                simbolo = new Simbolo(identificador, tipo, valor, null);
            return ent.agregarSimbolo(simbolo);
        }
        return false;
    }
    static cargarValoresParametros(entornoFuncion, entornoParametros, xmlData, listaParametros, valoresParametros) {
        let i = 0;
        if (listaParametros.length > valoresParametros.length) {
            return false;
        }
        for (let parametro of listaParametros) {
            if (!this.insertarParametro(entornoFuncion, entornoParametros, xmlData, parametro, valoresParametros[i]))
                return false;
            i++;
        }
        return true;
    }
    static insertarParametro(entornoFuncion, entornoParametros, xmlData, parametro, valor) {
        let tipoValor = valor.getTipo(entornoFuncion, xmlData);
        let value;
        if (tipoValor.esXpath()) {
            value = valor.getValor(entornoFuncion, xmlData);
            let primitivo = XpathUtil.obtenerPrimitivoFromXpath(value);
            if (primitivo != null && primitivo != undefined) {
                tipoValor = primitivo.getTipo(null, null);
                value = primitivo.getValor(null, null);
            }
        }
        if (!parametro.tipo.esEquivalente(tipoValor)) {
            return false;
        }
        if (value == null || value == undefined) {
            value = valor.getValor(entornoFuncion, xmlData);
        }
        if (value != null && value != undefined) {
            return XpathUtil.createSimbolo(parametro.identificador, value, parametro.tipo, entornoParametros, xmlData);
        }
        return false;
    }
    static obtenerPrimitivoFromXpath(valor) {
        if (valor != null && valor != undefined && valor instanceof TablaSimbolos) {
            valor = valor.getPrimitiveValueRow();
            if (valor != null && valor != undefined) {
                return valor;
            }
        }
        return null;
    }
}
XpathUtil.contador = 0;
XpathUtil.contador_nodo = 0;
