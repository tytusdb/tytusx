"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ejecucion = void 0;
const xmlTS_1 = require("./arbol/xmlTS");
class Ejecucion {
    constructor(prologo, cuerpo, cadena, raiz) {
        this.tildes = ['á', 'é', 'í', 'ó', 'ú'];
        this.prologoXml = prologo;
        this.cuerpoXml = cuerpo;
        this.cadena = cadena;
        Object.assign(this, { raiz, contador: 0, dot: '' });
    }
    verObjetos() {
        this.ts = new xmlTS_1.XmlTS();
        this.cuerpoXml.forEach((element, index) => {
            let etiqueta = "doble";
            if (!element.doble) {
                etiqueta = "única";
            }
            this.ts.agregar(element.identificador, element.texto, "Raiz", "Etiqueta " + etiqueta, element.linea, element.columna, null);
            if (element.listaAtributos.length > 0) {
                element.listaAtributos.forEach(atributos => {
                    this.ts.agregar(atributos.identificador, atributos.valor, element.identificador, "Atributo", atributos.linea, atributos.columna, this.cuerpoXml[index]);
                });
            }
            if (element.listaObjetos.length > 0) {
                this.tablaRecursiva(element.listaObjetos, element.identificador, this.cuerpoXml, index);
            }
        });
        //console.log(this.ts);
    }
    tablaRecursiva(elemento, entorno, padre, indice) {
        elemento.forEach((element, index) => {
            let etiqueta = "doble";
            if (!element.doble) {
                etiqueta = "única";
            }
            let texto = "";
            for (var i = 0; i < element.texto.length; i++) {
                if (this.tildes.includes(element.texto[i])) {
                    texto += element.texto[i];
                }
                else if (this.tildes.includes(element.texto[i - 1])) {
                    texto += element.texto[i];
                }
                else {
                    texto += " " + element.texto[i];
                }
            }
            this.ts.agregar(element.identificador, texto, entorno, "Etiqueta " + etiqueta, element.linea, element.columna, padre[indice]);
            if (element.listaAtributos.length > 0) {
                element.listaAtributos.forEach(atributos => {
                    this.ts.agregar(atributos.identificador, atributos.valor, element.identificador, "Atributo", atributos.linea, atributos.columna, elemento[index]);
                });
            }
            if (element.listaObjetos.length > 0) {
                this.tablaRecursiva(element.listaObjetos, element.identificador, elemento, index);
            }
        });
    }
    getDot() {
        this.contador = 0;
        this.dot = "digraph G {\n";
        if (this.raiz != null) {
            this.generacionDot(this.raiz);
        }
        this.dot += "\n}";
        return this.dot;
    }
    generacionDot(nodo) {
        if (nodo instanceof Object) {
            let idPadre = this.contador;
            this.dot += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
            if (nodo.hasOwnProperty("hijos")) {
                nodo.hijos.forEach((nodoHijo) => {
                    let idHijo = ++this.contador;
                    this.dot += `node${idPadre} -> node${idHijo};\n`;
                    if (nodoHijo instanceof Object) {
                        this.generacionDot(nodoHijo);
                    }
                    else {
                        this.dot += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
                    }
                });
            }
        }
    }
    getStringValue(label) {
        if (label.startsWith("\"") || label.startsWith("'") || label.startsWith("`")) {
            return label.substr(1, label.length - 2);
        }
        return label;
    }
    identificar(etiqueta, nodo) {
        if (nodo == null || !(nodo instanceof Object)) {
            return false;
        }
        if (nodo.hasOwnProperty('label') && nodo.label != null) {
            return nodo.label === etiqueta;
        }
        return false;
    }
    recorrer() {
        if (this.raiz != null) {
            this.esRaiz = true;
            this.descendiente = false;
            this.atributo = false;
            this.consultaXML = this.cuerpoXml;
            this.verObjetos();
            this.recorrido(this.raiz);
            return this.traducir();
        }
        return 'no se pudo';
    }
    recorrido(nodo) {
        if (nodo instanceof Object) {
            if (this.identificar('S', nodo)) {
                this.recorrido(nodo.hijos[0]);
                console.log(this.consultaXML);
            }
            if (this.identificar('INSTRUCCIONES', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        console.log(element);
                        this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
                    }
                });
            }
            if (this.identificar('RAIZ', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        console.log(element);
                        this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                    }
                });
            }
            if (this.identificar('DESCENDIENTES_NODO', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        console.log(element);
                        this.consultaXML = this.reducir(this.consultaXML, element, 'DESCENDIENTES_NODO');
                    }
                });
            }
            if (this.identificar('PADRE', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        console.log(element);
                        this.consultaXML = this.reducir(this.consultaXML, element, 'PADRE');
                    }
                });
            }
        }
    }
    reducir(consulta, etiqueta, nodo) {
        if (nodo === 'RAIZ') {
            if (etiqueta === '/') {
                this.descendiente = false;
                return consulta;
            }
            else if (etiqueta === '@') {
                this.atributo = true;
                return consulta;
            }
            else if (this.atributo) {
                let cons = [];
                consulta.forEach(element => {
                    element.listaAtributos.forEach(atributo => {
                        if (atributo.identificador === etiqueta) {
                            cons.push(element);
                        }
                    });
                });
                return cons;
            }
        }
        else if (nodo === 'DESCENDIENTES_NODO') {
            if (etiqueta === '//') {
                this.descendiente = true;
                return consulta;
            }
            else if (etiqueta === '@') {
                this.atributo = true;
                return consulta;
            }
            else if (this.atributo) {
                let cons = [];
                consulta.forEach(element => {
                    element.listaAtributos.forEach(atributo => {
                        if (atributo.identificador === etiqueta) {
                            cons.push(element);
                        }
                    });
                    if (element.listaObjetos.length > 0) {
                        cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
                    }
                });
                return cons;
            }
        }
        else if (nodo === 'INSTRUCCIONES') {
            let cons;
            cons = [];
            if (!this.descendiente) {
                if (this.esRaiz) {
                    consulta.forEach(element => {
                        if (element.identificador === etiqueta) {
                            cons.push(element);
                        }
                    });
                    this.esRaiz = false;
                    return cons;
                }
                else {
                    consulta.forEach(element => {
                        if (element.listaObjetos.length > 0) {
                            element.listaObjetos.forEach(elements => {
                                if (elements.identificador === etiqueta) {
                                    cons.push(elements);
                                }
                            });
                        }
                    });
                    return cons;
                }
            }
            else {
                consulta.forEach(element => {
                    if (element.identificador === etiqueta) {
                        cons.push(element);
                    }
                    if (element.listaObjetos.length > 0) {
                        cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
                    }
                });
                return cons;
            }
        }
        else if (nodo === 'PADRE') {
            if (etiqueta === '/..') {
                if (this.atributo) {
                    this.descendiente = false;
                    this.atributo = false;
                    return consulta;
                }
                this.descendiente = false;
                this.atributo = false;
                let cons = [];
                consulta.forEach(element => {
                    this.ts.tabla.forEach(padre => {
                        if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                            let a = padre[6];
                            let b = false;
                            cons.forEach(element => {
                                if (element == a) {
                                    b = true;
                                }
                            });
                            if (!b) {
                                cons.push(a);
                            }
                        }
                    });
                });
                return cons;
            }
        }
    }
    recDescen(a, etiqueta, atributo) {
        let cons = [];
        a.forEach((element) => {
            if (atributo) {
                element.listaAtributos.forEach(atributo => {
                    if (atributo.identificador === etiqueta) {
                        cons.push(element);
                    }
                });
                if (element.listaObjetos.length > 0) {
                    cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
                }
            }
            else {
                if (element.identificador === etiqueta) {
                    cons.push(element);
                }
                else if (element.listaObjetos.length > 0) {
                    cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
                }
            }
        });
        return cons;
    }
    traducir() {
        let cadena = '';
        this.consultaXML.forEach(element => {
            if (!this.atributo) {
                let texto = "";
                console.log("texto: " + element.identificador);
                for (var i = 0; i < element.texto.length; i++) {
                    if (this.tildes.includes(element.texto[i])) {
                        texto += element.texto[i];
                    }
                    else if (this.tildes.includes(element.texto[i - 1])) {
                        texto += element.texto[i];
                    }
                    else {
                        texto += " " + element.texto[i];
                    }
                }
                cadena += '<' + element.identificador;
                if (element.listaAtributos.length > 0) {
                    element.listaAtributos.forEach(atributos => {
                        cadena += ' ' + atributos.identificador + '=' + atributos.valor;
                    });
                }
                if (element.doble) {
                    cadena += '>\n';
                }
                else {
                    cadena += '/>\n';
                }
                if (texto != '') {
                    cadena += texto + '\n';
                }
                if (element.listaObjetos.length > 0) {
                    cadena += this.traducirRecursiva(element.listaObjetos);
                }
                if (element.doble) {
                    cadena += '</' + element.identificador + '>\n';
                }
            }
            else {
                element.listaAtributos.forEach(atributo => {
                    cadena += atributo.identificador + '=' + atributo.valor + '\n';
                });
            }
        });
        return cadena;
    }
    traducirRecursiva(elemento) {
        let cadena = '';
        elemento.forEach(element => {
            let texto = "";
            for (var i = 0; i < element.texto.length; i++) {
                if (this.tildes.includes(element.texto[i])) {
                    texto += element.texto[i];
                }
                else if (this.tildes.includes(element.texto[i - 1])) {
                    texto += element.texto[i];
                }
                else {
                    texto += " " + element.texto[i];
                }
            }
            cadena += '<' + element.identificador;
            if (element.listaAtributos.length > 0) {
                element.listaAtributos.forEach(atributos => {
                    cadena += ' ' + atributos.identificador + '=' + atributos.valor;
                });
            }
            if (element.doble) {
                cadena += '>\n';
            }
            else {
                cadena += '/>\n';
            }
            if (texto != '') {
                cadena += texto + '\n';
            }
            if (element.listaObjetos.length > 0) {
                cadena += this.traducirRecursiva(element.listaObjetos);
            }
            if (element.doble) {
                cadena += '</' + element.identificador + '>\n';
            }
        });
        return cadena;
    }
}
exports.Ejecucion = Ejecucion;
