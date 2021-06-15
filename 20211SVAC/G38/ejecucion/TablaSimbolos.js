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
            if (simbolo.tipo.esObjeto() &&
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
            if (simbolo.tipo.esObjeto() &&
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
    getElementsParents() {
        this.listaSimbolos =
            this.listaSimbolos.map(function (simbolo) {
                if (simbolo.entorno_row !== undefined && simbolo.entorno_row !== null) {
                    return simbolo.entorno_row;
                }
                else
                    throw Error("Se esta tratando de obtener el padre en el nodo raiz");
            });
        return this;
    }
    getElementsParentsByNombreElemento(nombreElemento) {
        // traer todos los padres del que su id es igual a nombreElemento
        this.listaSimbolos =
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
        return this;
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
    esVacia() {
        return this.listaSimbolos == null || this.listaSimbolos == undefined || this.listaSimbolos.length == 0;
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
}
