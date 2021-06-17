"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Objeto_1 = require("./Expresiones/Objeto");
const Atributo_1 = require("./Expresiones/Atributo");
const Element_1 = require("./Instrucciones/Element/Element");
const xmlAsc = require('./Gramatica/gramatica_XML_ASC');
const xpathAsc = require('./Gramatica/xpathAsc');
class Main {
    constructor() {
        this.lexicos = [];
        this.lista_objetos = [];
        this.lista_objetos_xpath = [];
        this.listacst = [];
        this.nodos = [];
        this.edges = [];
        this.nodoscst = [];
        this.edgescst = [];
        this.nodoxpath = [];
        this.edgesxpath = [];
        this.tablaSimbolos = '';
        this.i = 1;
        this.j = 1;
    }
    ejecutarCodigoXmlAsc(entrada) {
        console.log('ejecutando xmlAsc ...');
        window.localStorage.setItem('reporteGramatical', '');
        const objetos = xmlAsc.parse(entrada);
        // console.log('**********');
        console.log(objetos);
        // console.log('**********');
        this.lista_objetos = objetos.objeto;
        this.listacst = objetos.nodos;
        console.log(this.listacst);
        if (this.lista_objetos.length > 1) {
            console.log(this.getXmlFormat(this.lista_objetos[1]));
        }
        else {
            console.log(this.getXmlFormat(this.lista_objetos[0]));
        }
        window.localStorage.setItem('lexicos', JSON.stringify(objetos.erroresLexicos));
        if (objetos !== undefined) {
            let reporteGramatical = '';
            for (let i = objetos.reporteGramatical.length - 1; i >= 0; i--) {
                reporteGramatical += objetos.reporteGramatical[i];
            }
            window.localStorage.setItem('reporteGramatical', reporteGramatical);
        }
    }
    ejecutarCodigoXpathAsc(entrada) {
        console.log('ejecutando xpathAsc ...');
        const objetos = xpathAsc.parse(entrada);
        console.log(objetos);
        this.lista_objetos_xpath = objetos.Nodo;
        // this.execPath_list(objetos.XPath);
    }
    getXmlFormat(objeto) {
        let contenido = '';
        let atributos = '';
        let etiqueta = '';
        for (let i = 0, size = objeto.listaAtributos.length; i < size; i++) {
            if (Atributo_1.Comilla.SIMPLE === objeto.listaAtributos[i].comilla) {
                atributos +=
                    objeto.listaAtributos[i].identificador +
                        "='" +
                        objeto.listaAtributos[i].textWithoutSpecial +
                        "'";
            }
            else {
                atributos +=
                    objeto.listaAtributos[i].identificador +
                        '="' +
                        objeto.listaAtributos[i].textWithoutSpecial +
                        '"';
            }
            if (i !== size - 1) {
                atributos += ' ';
            }
        }
        etiqueta += '\n<' + objeto.identificador;
        if (atributos !== '') {
            etiqueta += ' ' + atributos + ' ';
        }
        if (objeto.etiqueta === Objeto_1.Etiqueta.DOBLE) {
            etiqueta += '>';
            if (objeto.listaObjetos.length > 0) {
                for (let i = 0, size = objeto.listaObjetos.length; i < size; i++) {
                    let children = this.getXmlFormat(objeto.listaObjetos[i]);
                    contenido += children;
                }
            }
            else {
                contenido += objeto.textWithoutSpecial;
            }
            if (objeto.listaObjetos.length > 0) {
                etiqueta += '\t\t' + contenido;
                etiqueta += '\n';
            }
            else {
                etiqueta += contenido;
            }
            etiqueta += '</' + objeto.identificador + '>';
        }
        else if (objeto.etiqueta === Objeto_1.Etiqueta.UNICA) {
            etiqueta += '/>';
        }
        return etiqueta;
    }
    readFile(e) {
        console.log('read file ...');
        var file = e.target.files[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            let target = e.target;
            if (target !== undefined && target !== null) {
                console.log('load text ...');
                var contents = target.result;
                var element = document.getElementById('codeBlock');
                if (element !== undefined && element !== null) {
                    element.value = contents;
                }
                else {
                    console.log('Error set content');
                }
            }
            else {
                console.log('Error read file');
            }
        };
        reader.readAsText(file);
    }
    prueba() {
        console.log('hola mundo');
    }
    getErroresLexicos() {
        let lex = window.localStorage.getItem('lexicos');
        if (lex) {
            this.lexicos = JSON.parse(lex);
            console.log(this.lexicos);
            var tbodyRef = document.getElementById('keywords');
            this.lexicos.forEach((element) => {
                let newRow = tbodyRef.insertRow();
                let newCell = newRow.insertCell();
                let newText2 = document.createTextNode(element.descripcion);
                newCell.appendChild(newText2);
            });
        }
        //setup our table array
    }
    TablaSimbolos() {
        window.localStorage.setItem('TablaSimbolosXML', '');
        this.lista_objetos.forEach((element) => {
            // console.log(element.identificador);
            let aux = '<tr><td>' +
                element.identificador +
                '</td><td>Objeto</td><td>Global</td>' +
                '<td>' +
                element.linea +
                '</td><td>' +
                element.columna +
                '</td></tr>';
            this.tablaSimbolos = this.tablaSimbolos + aux;
            this.getObjetosTablaxml(element.listaObjetos, element.identificador);
            if (element.listaAtributos) {
                this.getAtributosTablaxml(element.listaAtributos, element.identificador);
            }
        });
        window.localStorage.setItem('TablaSimbolosXML', this.tablaSimbolos);
    }
    getObjetosTablaxml(listaObjeto, ambito) {
        listaObjeto.forEach((element) => {
            let aux = '<tr><td>' +
                element.identificador +
                '</td><td>Objeto</td><td>' +
                ambito +
                '</td>' +
                '<td>' +
                element.linea +
                '</td><td>' +
                element.columna +
                '</td></tr>';
            this.tablaSimbolos = this.tablaSimbolos + aux;
            this.getObjetosTablaxml(element.listaObjetos, element.identificador);
            if (element.listaAtributos) {
                this.getAtributosTablaxml(element.listaAtributos, element.identificador);
            }
        });
    }
    getAtributosTablaxml(listaObjeto, ambito) {
        listaObjeto.forEach((element) => {
            let aux = '<tr><td>' +
                element.identificador +
                '</td><td>Atributo</td><td>' +
                ambito +
                '</td>' +
                '<td>' +
                element.linea +
                '</td><td>' +
                element.columna +
                '</td></tr>';
            this.tablaSimbolos = this.tablaSimbolos + aux;
            if (element.textWithoutSpecial != '') {
                aux =
                    '<tr><td>' +
                        element.textWithoutSpecial +
                        '</td><td>Atributo</td><td>' +
                        element.identificador +
                        '</td>' +
                        '<td>' +
                        element.linea +
                        '</td><td>' +
                        element.columna +
                        '</td></tr>';
                this.tablaSimbolos = this.tablaSimbolos + aux;
            }
        });
    }
    graficar() {
        this.nodos = [];
        this.edges = [];
        let aux = {
            id: 1,
            label: 's',
        };
        this.nodos.push(aux);
        this.lista_objetos.forEach((element) => {
            // console.log(element.identificador);
            this.i++;
            let padre = this.i;
            let aux = {
                id: padre,
                label: element.identificador,
            };
            this.nodos.push(aux);
            let aux2 = {
                from: 1,
                to: this.i,
            };
            this.edges.push(aux2);
            this.getObjetos(element.listaObjetos, padre);
            if (element.listaAtributos) {
                this.getAtributos(element.listaAtributos, padre);
            }
        });
        window.localStorage.setItem('nodos', JSON.stringify(this.nodos));
        window.localStorage.setItem('edges', JSON.stringify(this.edges));
        //console.log(this.nodos);
        //console.log(this.edges);
    }
    getAtributos(listaObjeto, padre) {
        listaObjeto.forEach((element) => {
            this.i++;
            let hijo = this.i;
            let aux = {
                id: hijo,
                label: element.identificador,
            };
            let aux2 = {
                from: padre,
                to: hijo,
            };
            this.nodos.push(aux);
            this.edges.push(aux2);
            if (element.textWithoutSpecial != '') {
                this.i++;
                aux = {
                    id: this.i,
                    label: element.textWithoutSpecial,
                };
                aux2 = {
                    from: hijo,
                    to: this.i,
                };
                this.nodos.push(aux);
                this.edges.push(aux2);
            }
        });
    }
    getObjetos(listaObjeto, padre) {
        listaObjeto.forEach((element) => {
            this.i++;
            let hijo = this.i;
            let aux = {
                id: this.i,
                label: element.identificador,
            };
            let aux2 = {
                from: padre,
                to: this.i,
            };
            this.nodos.push(aux);
            this.edges.push(aux2);
            if (element.textWithoutSpecial != '') {
                this.i++;
                aux = {
                    id: this.i,
                    label: element.textWithoutSpecial,
                };
                aux2 = {
                    from: hijo,
                    to: this.i,
                };
                this.nodos.push(aux);
                this.edges.push(aux2);
            }
            this.getObjetos(element.listaObjetos, this.i);
            if (element.listaAtributos) {
                this.getAtributos(element.listaAtributos, hijo);
            }
        });
    }
    arbolXpath() {
        this.i = 1;
        this.nodoxpath = [];
        this.edgesxpath = [];
        let aux = {
            id: 1,
            label: 's',
        };
        this.nodoxpath.push(aux);
        let element = this.lista_objetos_xpath;
        console.log(element);
        console.log(element.val);
        this.i++;
        let padre = this.i;
        aux = {
            id: padre,
            label: element.val,
        };
        this.nodoxpath.push(aux);
        let aux2 = {
            from: 1,
            to: this.i,
        };
        this.edgesxpath.push(aux2);
        this.getObjetosXpath(element.children, padre);
        window.localStorage.setItem('nodosxpath', JSON.stringify(this.nodoxpath));
        window.localStorage.setItem('edgesxpath', JSON.stringify(this.edgesxpath));
        console.log(this.nodoxpath);
        console.log(this.edgesxpath);
    }
    graficarcst(nodos, padre) {
        console.log('entra?');
        this.getnodoscst(nodos, padre);
        window.localStorage.setItem('nodoscst', JSON.stringify(this.nodoscst));
        window.localStorage.setItem('edgescst', JSON.stringify(this.edgescst));
    }
    getnodoscst(nodos, papa) {
        let aux = nodos;
        let auxnodos = {
            id: papa,
            label: aux.nombre,
        };
        this.nodoscst.push(auxnodos);
        let nodohijo = aux.hijos;
        if (nodohijo && nodohijo.length > 0) {
            nodohijo.forEach((element) => {
                this.j++;
                let hijo = this.j;
                let auxedges = {
                    from: papa,
                    to: hijo,
                };
                this.edgescst.push(auxedges);
                this.getnodoscst(element, hijo);
            });
        }
    }
    getObjetosXpath(listaObjeto, padre) {
        listaObjeto.forEach((element) => {
            if (element != undefined) {
                this.i++;
                let aux = {
                    id: this.i,
                    label: element.val,
                };
                let aux2 = {
                    from: padre,
                    to: this.i,
                };
                this.nodoxpath.push(aux);
                this.edgesxpath.push(aux2);
                this.getObjetosXpath(element.children, this.i);
            }
        });
    }
    execPath_list(pathList) {
        /** //root/message | //root/price | /@abc */
        pathList.forEach((path) => {
            console.log(`PATH LIST: ${path.length}`);
            this.execNodes_list(path);
        });
    }
    execNodes_list(nodeList) {
        let rootXML = {
            elements: this.lista_objetos.length > 1
                ? [this.lista_objetos[1]]
                : [this.lista_objetos[0]],
            parent: undefined,
        };
        nodeList.forEach((node) => {
            if (typeof node === 'string')
                return;
        });
        this.searchElement(rootXML, nodeList, 0);
    }
    checkRoot(rootXML, nodeList) {
        let root = rootXML.elements;
        if (nodeList[0].type === Element_1.TypeElement.NODO) {
            if (nodeList[0].slashes === 0 || nodeList[0].slashes === 1) {
                // NODOS++ & BUSCAR EN ELEMENTOS | ATRIBUTOS DE ROOT
                if (nodeList[0].name === root.identificador)
                    return 1;
            }
            else if (nodeList[0].slashes === 2) {
                // NODO++ & BUSCAR EN ELEMENTOS | ATRIBUTOS HIJOS DE ROOT
                if (nodeList[0].name === root.identificador)
                    return 1;
                // NODO++ & BUSCAR EN ELEMENTOS HIJOS DE ROOT
                return 2;
            }
        }
        else if (nodeList[0].type === Element_1.TypeElement.CURRENT) {
            // NODO++ & BUSCAR EN ELEMENTOS | ATRIBUTOS DE ROOT
            if (nodeList[1].name === root.identificador ||
                nodeList[1].type === Element_1.TypeElement.ALL)
                return 3;
        }
        else if (nodeList[0].type === Element_1.TypeElement.ALL) {
            // NODO++ & BUSCAR EN ELEMENTOS | ATRIBUTOS DE ROOT
            return 1;
        }
        else if (nodeList[0].type === Element_1.TypeElement.ATRIBUTO) {
            // NODO++ & BUSCAR EN ATRIBUTOS DE ROOT
            if (nodeList[0].slashes === 2)
                return 2;
        }
        // ROOT NO COINCIDE
        return 0;
    }
    searchElement(rootXML, nodeList, index) {
        // console.log(rootXML);
        // VALIDAR ATRIBUTOS EN PROFUNDIDAD
        let resXML = rootXML;
        if (nodeList.length === index)
            this.printElements(rootXML.elements);
        rootXML.elements.forEach((element) => {
            resXML.elements = element.listaObjetos;
            resXML.parent = element;
            if (nodeList[index].type === Element_1.TypeElement.ALL) {
                if (nodeList.length > index + 1) {
                    this.searchElement(resXML, nodeList, index + 1);
                }
                else {
                    this.printElement(element);
                }
            }
            else if (nodeList[index].type === Element_1.TypeElement.ATRIBUTO) {
                if (this.searchAttributes(element.listaAtributos, nodeList[index].name)) {
                    this.printElement(element);
                }
                else if (nodeList[index].slashes == 2) {
                    this.searchElement(resXML, nodeList, index);
                }
            }
            else if (nodeList[index].type === Element_1.TypeElement.NODO) {
                if (nodeList[index].name === element.identificador) {
                    if (nodeList.length > index + 1) {
                        this.searchElement(resXML, nodeList, index + 1);
                    }
                    else {
                        this.printElement(element);
                    }
                }
                else if (nodeList[index].slashes == 2) {
                    if (nodeList.length > index) {
                        this.searchElement(resXML, nodeList, index);
                    }
                    else {
                        this.printElement(element);
                    }
                }
            }
            else if (nodeList[index].type === Element_1.TypeElement.CURRENT) {
                if (nodeList.length > index + 1 &&
                    nodeList[index + 1].type === Element_1.TypeElement.CURRENT) {
                    // PARENT
                }
                // CURRENT
                if (nodeList.length > index + 1) {
                    this.searchElement(rootXML, nodeList, index + 1);
                }
                else {
                    this.printElement(element);
                }
            }
        });
    }
    searchAttributes(attrs, attrName) {
        let result = false;
        attrs.forEach((attr) => {
            if (attr.identificador === attrName)
                result = true;
        });
        return result;
    }
    printElement(element) {
        console.info(element);
    }
    printElements(elements) {
        elements.forEach((element) => {
            console.info(element);
        });
    }
    setListener() {
        let inputFile = document.getElementById('open-file');
        if (inputFile !== undefined && inputFile !== null) {
            inputFile.addEventListener('change', this.readFile, false);
            console.log('inputFile activo');
        }
        let analizeXmlAsc = document.getElementById('analizeXmlAsc');
        if (analizeXmlAsc !== undefined && analizeXmlAsc !== null) {
            console.log('btn xmlAsc activo');
            analizeXmlAsc.addEventListener('click', () => {
                // ANALIZAR XML
                let codeBlock = document.getElementById('codeBlock');
                let content = codeBlock !== undefined && codeBlock !== null
                    ? codeBlock.value
                    : '';
                this.ejecutarCodigoXmlAsc(content);
                this.graficar();
                this.j = 1;
                this.graficarcst(this.listacst, this.j);
            });
        }
        let analizeXPathAsc = document.getElementById('analizeXPathAsc');
        if (analizeXPathAsc !== undefined && analizeXPathAsc !== null) {
            console.log('btn xpathAsc activo');
            analizeXPathAsc.addEventListener('click', () => {
                // ANALIZAR XML
                let input = document.getElementById('codeXPath');
                let content = input !== undefined && input !== null ? input.value : '';
                this.ejecutarCodigoXpathAsc(content);
                this.arbolXpath();
            });
        }
        let clean = document.getElementById('clean');
        if (clean !== undefined && clean !== null) {
            console.log('btn clean activo');
            clean.addEventListener('click', () => {
                let codeBlock = document.getElementById('codeBlock');
                if (codeBlock !== undefined && codeBlock !== null) {
                    codeBlock.value = '';
                }
            });
        }
        let tablaErrores = document.getElementById('tablaErrores');
        if (tablaErrores !== undefined && tablaErrores !== null) {
            console.log('btn Tabla Errores Activo');
            tablaErrores.addEventListener('click', () => {
                this.getErroresLexicos();
            });
        }
        let tablaSimbolosxml = document.getElementById('tablaxml');
        if (tablaSimbolosxml !== undefined && tablaSimbolosxml !== null) {
            console.log('btn Tabla Simbolos Activo');
            tablaSimbolosxml.addEventListener('click', () => {
                this.TablaSimbolos();
            });
        }
        let xmlcst = document.getElementById('arbolcst');
        if (xmlcst !== undefined && xmlcst !== null) {
            console.log('btn arbol cst Activo');
            xmlcst.addEventListener('click', () => { });
        }
    }
}
exports.Main = Main;
