"use strict";
class TsRow {
    constructor(identificador, indice, nombreElemento, nodo, tipo, entorno, entorno_row) {
        this._identificador = identificador;
        this._indice = indice;
        this._nombreElemento = nombreElemento;
        this._nodo = nodo;
        this._tipo = (nodo instanceof XmlRoot) ? new Tipo(TipoDato.global) : tipo;
        this._entorno = entorno;
        this._entorno_row = entorno_row;
        this._sub_entorno = [];
        this._id = XpathUtil.generarIdUnicoTsRow();
    }
    contieneTexto() {
        let contieneTexto = false;
        if (this._sub_entorno !== undefined && this._sub_entorno !== null) {
            for (let row of this.sub_entorno) {
                if (row.tipo.esPrimitivo()) {
                    contieneTexto = true;
                    break;
                }
            }
        }
        return contieneTexto;
    }
    obtenerTexto() {
        let primitivo;
        if (this.tipo.esAtributo() && this.nodo instanceof XmlAttribute) {
            primitivo = new Primitive(this.nodo.value, this.nodo.type, 0, 0);
        }
        else if (this.tipo.esObjeto()) {
            if (this._sub_entorno !== undefined && this._sub_entorno !== null) {
                for (let row of this.sub_entorno) {
                    if (row.tipo.esPrimitivo()) {
                        if (row.tipo.esNumero()) {
                            primitivo = new Primitive(Number(row.nodo.getValueString()), row.tipo, 0, 0);
                        }
                        else {
                            primitivo = new Primitive(row.nodo.getValueString(), row.tipo, 0, 0);
                        }
                        break;
                    }
                }
            }
        }
        return primitivo;
    }
    toStr(tab) {
        if (this._nodo.isContent()) {
            return tab + "\t" + this.nodo.getValueString() + "\n";
        }
        else if (this._nodo.isAttribute()) {
            return "";
        }
        else {
            let cadena = tab + '<' + this._nombreElemento + " " + this.getStrAttributes() + ' > \n';
            for (let sub_rob of this._sub_entorno) {
                cadena += sub_rob.toStr(tab + "\t");
            }
            cadena += '\n' + tab + '</' + this._nombreElemento + '> \n';
            return cadena;
        }
    }
    getStrAttributes() {
        let cad = this._nodo.getStrAttributes();
        return cad;
    }
    toString() {
        return this._nombreElemento;
    }
    get identificador() {
        return this._identificador;
    }
    set identificador(value) {
        this._identificador = value;
    }
    get indice() {
        return this._indice;
    }
    set indice(value) {
        this._indice = value;
    }
    get nombreElemento() {
        return this._nombreElemento;
    }
    set nombreElemento(value) {
        this._nombreElemento = value;
    }
    get nodo() {
        return this._nodo;
    }
    set nodo(value) {
        this._nodo = value;
    }
    get tipo() {
        return this._tipo;
    }
    set tipo(value) {
        this._tipo = value;
    }
    get entorno() {
        return this._entorno;
    }
    set entorno(value) {
        this._entorno = value;
    }
    get entorno_row() {
        return this._entorno_row;
    }
    set entorno_row(value) {
        this._entorno_row = value;
    }
    get sub_entorno() {
        return this._sub_entorno;
    }
    set sub_entorno(value) {
        this._sub_entorno = value;
    }
    obtenerTablaSimbolos() {
        let ts = new TablaSimbolos(null);
        if (this._sub_entorno !== undefined && this._sub_entorno !== null)
            ts.listaSimbolos = this._sub_entorno;
        return ts;
    }
    getObjectsInRowByNombreElemento(nombreElemento) {
        let result = [];
        if (this._nodo instanceof XmlAttribute || this._nodo instanceof XmlContent) {
            return result;
        }
        if (this._nombreElemento == nombreElemento) {
            result.push(this);
        }
        if (this._sub_entorno == null || this._sub_entorno.length == 0) {
            return result;
        }
        for (let sub_row of this._sub_entorno) {
            result = result.concat(sub_row.getObjectsInRowByNombreElemento(nombreElemento));
        }
        return result;
    }
    getAllSubTextInRow() {
        let result = [];
        if (this._sub_entorno == undefined || this._sub_entorno == null || this._sub_entorno.length == 0) {
            return result;
        }
        for (let sub_row of this._sub_entorno) {
            if (sub_row._nodo instanceof XmlContent) {
                result.push(sub_row);
            }
            else if (sub_row._nodo instanceof XmlElement) {
                var subText = sub_row.getAllSubTextInRow();
                result = result.concat(subText);
            }
        }
        return result;
    }
    getSubTextInRow() {
        let result = [];
        if (this._sub_entorno == undefined || this._sub_entorno == null
            || this._sub_entorno.length == 0) {
            return result;
        }
        for (let sub_row of this._sub_entorno) {
            if (sub_row._nodo instanceof XmlContent) {
                result.push(sub_row);
            }
        }
        return result;
    }
    getSubObjectsInRow() {
        let result = [];
        if (!(this._nodo instanceof XmlElement)) {
            return result;
        }
        if (this._sub_entorno == undefined || this._sub_entorno == null || this._sub_entorno.length == 0) {
            return result;
        }
        for (let sub_row of this._sub_entorno) {
            if (sub_row._nodo instanceof XmlContent || sub_row._nodo instanceof XmlAttribute) {
                continue;
            }
            result.push(sub_row);
            result = result.concat(sub_row.getSubObjectsInRow());
        }
        return result;
    }
    isEqual(tsRow) {
        if (tsRow == undefined || tsRow == null) {
            return false;
        }
        if (this._nombreElemento != tsRow._nombreElemento) {
            return false;
        }
        if (this._indice != tsRow._indice) {
            return false;
        }
        if (this._sub_entorno != null && tsRow.sub_entorno == null
            || this.sub_entorno == null && tsRow.sub_entorno != null) {
            return false;
        }
        if (this.sub_entorno == null || tsRow.sub_entorno == null) {
            return true;
        }
        if (this.sub_entorno.length != tsRow.sub_entorno.length) {
            return false;
        }
        for (let i in this._sub_entorno) {
            let thisSubRow = this._sub_entorno[i];
            let subRow = tsRow._sub_entorno[i];
            if (!thisSubRow.isEqual(subRow)) {
                return false;
            }
        }
        return true;
    }
    get id() {
        return this._id;
    }
    generarCodigo_3d(refPadre) {
        var tempPosObjeto = CodeUtil.generarTemporal();
        var tempPosPadre = CodeUtil.generarTemporal();
        var tempPosIndex = CodeUtil.generarTemporal();
        var tempPosSize = CodeUtil.generarTemporal();
        var tempPosCadena = CodeUtil.generarTemporal();
        var tempPosSubEntorno = CodeUtil.generarTemporal();
        var tempEtiquetaRepositorio;
        var sizeEntorno = (this.nodo instanceof XmlAttribute) ? this._sub_entorno.length + 1 : this._sub_entorno.length;
        //Offsets para atributos
        CodeUtil.printComment("-> Inició " + this._identificador);
        CodeUtil.printWithComment(tempPosObjeto + " = HP + " + TsRow.POS_OBJECT + " ; ", "Guardamos el inicio del Objeto");
        CodeUtil.printWithComment(tempPosPadre + " = HP + " + TsRow.POS_PARENT + " ; ", "Guardamos la referencia del padre");
        CodeUtil.printWithComment(tempPosIndex + " = HP + " + TsRow.POS_INDEX + " ; ", "Guardamos el index del objeto");
        CodeUtil.printWithComment(tempPosSize + " = HP + " + TsRow.POS_SIZE + " ; ", "Guardamos el tamaño del objeto");
        CodeUtil.printWithComment(tempPosCadena + " = HP + " + TsRow.POS_LABEL_CONT_ATTRIBUTE + " ; ", "Guardamos el espacio para "
            + ((this.nodo instanceof XmlElement) ? "la etiqueta" : (this.nodo instanceof XmlContent) ? "el contenido" : " el nombre del atributo"));
        //Reserva de espacio
        CodeUtil.printComment("Apartamos espacio para los atributos de " + this._identificador);
        CodeUtil.printWithComment("HP = HP + " + TsRow.SIZE_PROPERTIES_OBJECT + " ;", "Incrementamos el espacio para atributos internos");
        CodeUtil.printWithComment(tempPosSubEntorno + " = HP + 0 ; ", "Guardamos el inicio de su subentorno");
        CodeUtil.printWithComment("HP = HP + " + sizeEntorno + " ;", "Incrementamos el heap con el " + "tamaño de los atributos");
        //Propiedades del objeto
        CodeUtil.printComment("Guardamos las propiedades del objeto");
        CodeUtil.printWithComment("Heap[(int)" + tempPosPadre + "] = " + refPadre + " ;", "Guardamos el padre del objeto");
        CodeUtil.printWithComment("Heap[(int)" + tempPosIndex + "] = " + (this.indice) + " ;", "Guardamos el indice del objeto");
        CodeUtil.printWithComment("Heap[(int)" + tempPosSize + "] = " + (this._sub_entorno == null ? 0 : this.sub_entorno.length) + ";", "Guardamos el tamaño del objeto");
        CodeUtil.printWithComment("Heap[(int)" + tempPosObjeto + "] = " + this.tipo.getTipo() + " ;", "Guardamos el Tipo: " + this.tipo + "(" + this.tipo.getTipo() + ")");
        //Generamos la etiqueta
        tempEtiquetaRepositorio = this.nodo.generateString_3d();
        CodeUtil.printComment("Guardamos la etiqueta generada");
        CodeUtil.printWithComment("Heap[(int)" + tempPosCadena + "] = " + tempEtiquetaRepositorio + ";", "Guardamos en heap el apuntador a la cadena");
        CodeUtil.print("");
        CodeUtil.printComment("Inició Código de los hijos de " + this._identificador);
        if (this.nodo instanceof XmlElement) {
            var _i = 0;
            for (let child of this._sub_entorno) {
                let tmpPosChild = CodeUtil.generarTemporal();
                let tmpChild;
                CodeUtil.print("");
                CodeUtil.print(tmpPosChild + " = " + tempPosSubEntorno + " + " + _i + " ;");
                tmpChild = child.generarCodigo_3d(tempPosObjeto);
                CodeUtil.print("Heap[(int)" + tmpPosChild + "] = " + tmpChild + " ;");
                _i += 1;
            }
        }
        else if (this.nodo instanceof XmlAttribute) {
            let tmpGeneradoValorAtributo;
            let nodoAtributo = this.nodo;
            let tmpPosChild = CodeUtil.generarTemporal();
            CodeUtil.printWithComment(tmpPosChild + " = " + tempPosSubEntorno + " + " + 0 + " ;", //Cero porque para atributos no tiene hijos
            "Posicion para valor del atriuto");
            tmpGeneradoValorAtributo = nodoAtributo.generateValueString_3d();
            CodeUtil.printWithComment("Heap[(int)" + tmpPosChild + "] = " + tmpGeneradoValorAtributo + " ;", "Guardamos la posicion del valor del atributo");
        }
        CodeUtil.printComment("Finalizó Código de los hijos de " + this._identificador);
        CodeUtil.printComment("-> Finalizó " + this._identificador);
        return tempPosObjeto;
    }
}
TsRow.POS_OBJECT = "0";
TsRow.POS_PARENT = "1";
TsRow.POS_INDEX = "2";
TsRow.POS_SIZE = "3";
TsRow.POS_LABEL_CONT_ATTRIBUTE = "4";
TsRow.SIZE_PROPERTIES_OBJECT = "5";
TsRow.POS_INIT_CHILDS = TsRow.SIZE_PROPERTIES_OBJECT;
