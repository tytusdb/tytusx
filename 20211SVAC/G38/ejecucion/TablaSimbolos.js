"use strict";
class TablaSimbolos {
    constructor(rootAST) {
        this._listaSimbolos = (rootAST == undefined || rootAST == null) ? [] : rootAST.getTsScope(null, 1);
    }
    tieneEntornoRow() {
        var resultado = this._listaSimbolos == undefined || this._listaSimbolos.length == 0
            || this._listaSimbolos[0].entorno_row == null || this._listaSimbolos[0].entorno_row == undefined;
        return resultado;
    }
    findObjectsByNombreElemento(nombreElemento) {
        let objetos = [];
        if (this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for (let row of this._listaSimbolos) {
            for (let simbolo of row.sub_entorno) {
                if (simbolo.nombreElemento === nombreElemento && simbolo.tipo.esObjeto()) {
                    objetos.push(simbolo);
                }
            }
        }
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAllObjectsOrAtributesWithText() {
        let objetos = [];
        if (this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for (let row of this._listaSimbolos) {
            if ((row.tipo.esObjeto() || row.tipo.esAtributo()) && row.contieneTexto()) {
                objetos.push(row);
            }
        }
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAllByNombreElemento(nombreElemento) {
        let objetos = [];
        if (this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for (let row of this._listaSimbolos) {
            if (row.nombreElemento === nombreElemento && (row.tipo.esObjeto() || row.tipo.esAtributo())) {
                objetos.push(row);
            }
        }
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAllAtributesInObjectsRecursive() {
        let objetos = [];
        let tablaTemporal = this.findAllAtributesInObjects();
        if (tablaTemporal.listaSimbolos.length > 0)
            objetos = objetos.concat(tablaTemporal.listaSimbolos);
        this._listaSimbolos.forEach(function (simbolo) {
            if ((simbolo.tipo.esObjeto() || simbolo.tipo.esGlobal()) &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null) {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                tablaTemporal = ts.findAllAtributesInObjectsRecursive();
                if (tablaTemporal.listaSimbolos.length > 0)
                    objetos = objetos.concat(tablaTemporal.listaSimbolos);
            }
        });
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAllAtributesInObjects() {
        let objetos = [];
        this._listaSimbolos.forEach(function (simbolo) {
            if (simbolo.tipo.esObjeto() &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null) {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                let objetosTemporales = ts.findAllAtributesInEntorno();
                if (objetosTemporales.length > 0)
                    objetos = objetos.concat(objetosTemporales);
            }
        });
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAllAtributesInEntorno() {
        let objetos = [];
        this._listaSimbolos.forEach(function (simbolo) {
            if (simbolo.tipo.esAtributo())
                objetos.push(simbolo);
        });
        return objetos;
    }
    findAtributesByNombreElementoRecursive(nombreElemento) {
        let objetos = [];
        let tablaTemporal = this.findAtributesByNombreElemento(nombreElemento);
        if (tablaTemporal.listaSimbolos.length > 0)
            objetos = objetos.concat(tablaTemporal.listaSimbolos);
        this._listaSimbolos.forEach(function (simbolo) {
            if ((simbolo.tipo.esObjeto() || simbolo.tipo.esGlobal()) &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null) {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                tablaTemporal = ts.findAtributesByNombreElementoRecursive(nombreElemento);
                if (tablaTemporal.listaSimbolos.length > 0)
                    objetos = objetos.concat(tablaTemporal.listaSimbolos);
            }
        });
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAtributesByNombreElemento(nombreElemento) {
        let objetos = [];
        this._listaSimbolos.forEach(function (simbolo) {
            if (simbolo.tipo.esObjeto() &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null) {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                let objetosTemporales = ts.findAtributesByNombre(nombreElemento);
                if (objetosTemporales.length > 0)
                    objetos = objetos.concat(objetosTemporales);
            }
        });
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAtributesByNombre(nombreElemento) {
        let objetos = [];
        this._listaSimbolos.forEach(function (simbolo) {
            if (simbolo.nombreElemento === nombreElemento && simbolo.tipo.esAtributo())
                objetos.push(simbolo);
        });
        return objetos;
    }
    findAllObjectsByNombreElemento(nombreElemento) {
        let resultado = [];
        if (this._listaSimbolos != null) {
            for (let row of this._listaSimbolos) {
                if (row == undefined || row == null) {
                    continue;
                }
                resultado = resultado.concat(row.getObjectsInRowByNombreElemento(nombreElemento));
            }
        }
        return XpathUtil.crearTablaSimbolos(resultado);
    }
    findAllSubObjects() {
        let resultado = [];
        let ts = new TablaSimbolos(null);
        if (this._listaSimbolos == null) {
            return ts;
        }
        for (let row of this._listaSimbolos) {
            if (row == undefined || row == null) {
                continue;
            }
            resultado = resultado.concat(row.getSubObjectsInRow());
        }
        ts._listaSimbolos = resultado;
        return ts;
    }
    findAllSubTextInTS() {
        let resultado = [];
        if (!this.tieneSimbolos()) {
            return XpathUtil.crearTablaSimbolos([]);
        }
        for (let row of this._listaSimbolos) {
            if (row == undefined || row == null) {
                continue;
            }
            resultado = resultado.concat(row.getAllSubTextInRow());
        }
        let ts = XpathUtil.crearTablaSimbolos(resultado);
        return ts;
    }
    findSubTextInTS() {
        let resultado = [];
        if (!this.tieneSimbolos()) {
            return XpathUtil.crearTablaSimbolos([]);
        }
        for (let row of this._listaSimbolos) {
            if (row == undefined || row == null) {
                continue;
            }
            resultado = resultado.concat(row.getSubTextInRow());
        }
        let ts = XpathUtil.crearTablaSimbolos(resultado);
        return ts;
    }
    findAllObjects() {
        let objetos = [];
        for (let row of this._listaSimbolos) {
            for (let simbolo of row.sub_entorno) {
                if (simbolo.tipo.esObjeto())
                    objetos.push(simbolo);
            }
        }
        return XpathUtil.crearTablaSimbolos(objetos);
    }
    findAllParents() {
        let objetosPadre = [];
        for (let row of this._listaSimbolos) {
            if (row.entorno_row === undefined || row.entorno_row === null) {
                throw Error('Acceso al padre, en el entorno global.');
            }
            else {
                objetosPadre.push(row.entorno_row);
            }
        }
        return XpathUtil.crearTablaSimbolos(objetosPadre);
    }
    getElementsParentsRecursive() {
        let simbolosPadre = XpathUtil.crearTablaSimbolos([]);
        simbolosPadre.listaSimbolos = this.getElementsParents().listaSimbolos;
        for (let simbolo of this.listaSimbolos) {
            if (simbolo.entorno_row !== undefined &&
                simbolo.entorno_row !== null) {
                let tablaAncestro = XpathUtil.crearTablaSimbolos([simbolo.entorno_row]);
                let tablaTemp = tablaAncestro.getElementsParentsRecursive();
                if (!tablaTemp.esVacia())
                    simbolosPadre.listaSimbolos = simbolosPadre.listaSimbolos.concat(tablaTemp.listaSimbolos);
            }
        }
        return simbolosPadre;
    }
    getElementsParents() {
        // traer todos los padres del que su id es igual a nombreElemento
        let tablaParent = XpathUtil.crearTablaSimbolos([]);
        tablaParent.listaSimbolos =
            this.listaSimbolos.filter(function (simbolo) {
                if (simbolo.entorno_row !== undefined &&
                    simbolo.entorno_row !== null)
                    return true;
                else
                    return false;
            }).map(function (simbolo) {
                return simbolo.entorno_row;
            });
        return tablaParent;
    }
    getElementsParentsByNombreElementoRecursive(nombreElemento) {
        let simbolosPadre = XpathUtil.crearTablaSimbolos([]);
        simbolosPadre.listaSimbolos = this.getElementsParentsByNombreElemento(nombreElemento).listaSimbolos;
        for (let simbolo of this.listaSimbolos) {
            if (simbolo.entorno_row !== undefined &&
                simbolo.entorno_row !== null) {
                let tablaAncestro = XpathUtil.crearTablaSimbolos([simbolo.entorno_row]);
                let tablaTemp = tablaAncestro.getElementsParentsByNombreElementoRecursive(nombreElemento);
                if (!tablaTemp.esVacia())
                    simbolosPadre.listaSimbolos = simbolosPadre.listaSimbolos.concat(tablaTemp.listaSimbolos);
            }
        }
        return simbolosPadre;
    }
    getElementsParentsByNombreElemento(nombreElemento) {
        // traer todos los padres del que su id es igual a nombreElemento
        let tablaParent = XpathUtil.crearTablaSimbolos([]);
        tablaParent.listaSimbolos =
            this.listaSimbolos.filter(function (simbolo) {
                if (simbolo.entorno_row !== undefined &&
                    simbolo.entorno_row !== null &&
                    simbolo.entorno_row.nombreElemento == nombreElemento)
                    return true;
                else
                    return false;
            }).map(function (simbolo) {
                return simbolo.entorno_row;
            });
        return tablaParent;
    }
    replaceAtributesWithObjects() {
        this.listaSimbolos =
            this.listaSimbolos.map(function (simbolo) {
                if (simbolo.tipo.esAtributo())
                    return simbolo.entorno_row;
                else
                    return simbolo;
            });
    }
    chageTypeTsRowAttribute() {
        var objetos = [];
        for (let row of this._listaSimbolos) {
            if (row.nodo instanceof XmlAttribute) {
                var nodo = new TsRowAttribute(row);
                objetos.push(nodo);
            }
            else {
                objetos.push(row);
            }
        }
        this._listaSimbolos = objetos;
    }
    esVacia() {
        return this.listaSimbolos == null || this.listaSimbolos == undefined || this.listaSimbolos.length == 0;
    }
    getContentRow() {
        let content = null;
        if (this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for (let row of this._listaSimbolos) {
            if (row.tipo.esObjeto() || row.tipo.esAtributo()) {
                content = row.obtenerTexto();
                break;
            }
        }
        return content;
    }
    tieneUnElemento() {
        return this.listaSimbolos != null && this.listaSimbolos != undefined && this.listaSimbolos.length == 1;
    }
    getElementoInTsByPosition(position) {
        let row = null;
        if (this.listaSimbolos != null && this.listaSimbolos.length >= position)
            row = this.listaSimbolos[position];
        return row;
    }
    getHtmlTable() {
        let cad;
        cad = '<cite style="font-size:x-large;">REPORTE DE TABLA DE SIMBOLOS</cite><br/>' +
            '<table border="1">'
            + '<tr>'
            + '<th>IDENTIFICADOR</th><th>NOMBRE</th><th>INDICE</th> <th>VALOR</th> <th>TIPO</th> <th>PADRE</th> '
            + '</tr>';
        if (this._listaSimbolos == undefined || this._listaSimbolos == null || this._listaSimbolos.length == 0) {
            cad += '</table>';
            return cad;
        }
        cad += this.getHtmlRow(this._listaSimbolos[0]);
        cad += '</table>';
        return cad;
    }
    getHtmlRow(row) {
        let cad;
        let idPadre;
        if (row == undefined || row == null) {
            return "";
        }
        idPadre = (row.entorno_row == null) ? "Global" : row.entorno_row.identificador;
        if (idPadre == 'null_1') {
            idPadre = 'Global';
        }
        cad = '<tr>' +
            '<td>' + row.identificador + '</td>' +
            '<td>' + row.nombreElemento + '</td>' +
            '<td>' + row.indice + '</td>' +
            '<td>' + row.nodo.getValueString() + '</td>' +
            '<td>' + row.tipo + '</td>' +
            '<td>' + idPadre + '</td> '
            + '</tr>';
        if (row.tipo.esGlobal()) {
            cad = "";
        }
        if (row.sub_entorno == undefined || row.sub_entorno == null) {
            return cad;
        }
        for (let sub_row of row.sub_entorno) {
            cad += this.getHtmlRow(sub_row);
        }
        return cad;
    }
    set listaSimbolos(simbolos) {
        this._listaSimbolos = simbolos;
    }
    get listaSimbolos() {
        return this._listaSimbolos;
    }
    set esGlobal(esGlobal) {
        this._esGlobal = esGlobal;
    }
    get esGlobal() {
        return this._esGlobal;
    }
    toStr() {
        let i = 1;
        let cad = "";
        for (let row of this._listaSimbolos) {
            if (row != null && row.nodo instanceof XmlRoot) {
                continue;
            }
            cad += i + ".\n" + row.toStr("");
            i += 1;
        }
        return cad;
    }
    merge(tablaSimbolosExterna) {
        if (this.isEqual(tablaSimbolosExterna)) {
            return;
        }
        if (this._listaSimbolos == undefined || this._listaSimbolos == null) {
            return;
        }
        this._listaSimbolos = this._listaSimbolos.concat(tablaSimbolosExterna._listaSimbolos);
    }
    isEqual(tablaSimbolos) {
        if (tablaSimbolos == null || tablaSimbolos == undefined) {
            return false;
        }
        if (this._listaSimbolos == null && tablaSimbolos._listaSimbolos != null
            || this._listaSimbolos != null && tablaSimbolos._listaSimbolos == null) {
            return false;
        }
        if (this._listaSimbolos == null && tablaSimbolos._listaSimbolos == null) {
            return true;
        }
        if (this._listaSimbolos.length != tablaSimbolos._listaSimbolos.length) {
            return false;
        }
        for (let i in this._listaSimbolos) {
            let thisSubRow = this._listaSimbolos[i];
            let subRow = tablaSimbolos._listaSimbolos[i];
            if (!thisSubRow.isEqual(subRow)) {
                return false;
            }
        }
        return true;
    }
    eliminarDuplicados() {
        var nuevaLista = [];
        if (this._listaSimbolos == null) {
            this.listaSimbolos = nuevaLista;
            return;
        }
        for (let subRow of this._listaSimbolos) {
            let existe = false;
            for (let tmp of nuevaLista) {
                if (tmp.id == subRow.id) {
                    existe = true;
                    break;
                }
            }
            if (!existe) {
                nuevaLista.push(subRow);
            }
        }
        this._listaSimbolos = nuevaLista;
    }
    findAllNodes() {
        let ts = this.findAllSubObjects();
        return ts;
    }
    findAllChildsNodes() {
        let result_row = [];
        let ts = this.findAllObjects();
        if (ts == undefined || ts == null) {
            return XpathUtil.crearTablaSimbolos([]);
        }
        for (let sub_row of ts._listaSimbolos) {
            if (sub_row == undefined || sub_row == null) {
                continue;
            }
            if (sub_row.sub_entorno == undefined || sub_row == null) {
                continue;
            }
            if (sub_row.sub_entorno.length == 0) {
                continue;
            }
            result_row.push(sub_row);
        }
        return XpathUtil.crearTablaSimbolos(result_row);
    }
    findAllSubTextRows() {
        if (!this.tieneSimbolos()) {
            return XpathUtil.crearTablaSimbolos([]);
        }
        let ts = XpathUtil.crearTablaSimbolos([]);
        for (let sub_row of this._listaSimbolos) {
            if (sub_row == undefined || sub_row == null) {
                continue;
            }
            if (sub_row.tipo.esPrimitivo()) {
                ts._listaSimbolos.push(sub_row);
            }
        }
        return ts;
    }
    tieneSimbolos() {
        return this._listaSimbolos != undefined && this._listaSimbolos != null;
    }
    getPosition() {
        let position = null;
        for (let row of this._listaSimbolos) {
            if (row.tipo.esObjeto()) {
                position = row.indice;
                break;
            }
        }
        return position;
    }
    getLastPosition() {
        let posicionMasGrande = 0;
        this.listaSimbolos.forEach(function (tsRow) {
            if (tsRow.indice > posicionMasGrande)
                posicionMasGrande = tsRow.indice;
        });
        return posicionMasGrande;
    }
    get last() {
        return this._last;
    }
    set last(value) {
        this._last = value;
    }
    getStrAst() {
        let cadena;
        cadena = "digraph G {\n";
        if (!this.tieneSimbolos()) {
            cadena += "}\n";
            return cadena;
        }
        var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
        var cadenaRoot = nombreRoot + "[" + 'label="/",' + 'color="red",' + "];\n ";
        cadena += cadenaRoot + this._listaSimbolos[0].sub_entorno[0].nodo.getStrAst(nombreRoot);
        cadena += "rankdir=LR;\n";
        cadena += "}\n";
        return cadena;
    }
}
