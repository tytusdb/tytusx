"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjetoXML = /** @class */ (function () {
    /**
     * Constructor para un objeto/etiqueta XML
     * @param tipo tipo de objeto/etiqueta xml, 1:<tag /> | 0:<tag></tag>
     * @param etiqueta_id nombre que identifica la etiqueta de objeto xml
     * @param contenido contenido dentro de una etiqueta xml, string
     * @param lista_atributos lista con atributos de un objeto/etiqueta xml
     * @param lista_objetos lista de objetos que un objeto/etiqueta xml puede contener
     * @param linea linea donde fue encontrada la etiqueta
     * @param columna columna donde fue encontrada la etiqueta
     */
    function ObjetoXML(tipo, etiqueta_id, contenido, lista_atributos, lista_objetos, linea, columna) {
        this.contenido = ''; //contenido de la etiqueta, el texto
        this.tipo = tipo;
        this.setContenido(contenido);
        this.etiqueta_id = etiqueta_id;
        this.linea = (linea != undefined) ? linea : 0;
        this.columna = (columna != undefined) ? columna : 0;
        this.lista_atributos = (lista_atributos != undefined) ? lista_atributos : [];
        this.lista_objetos = (lista_objetos != undefined) ? lista_objetos : [];
    }
    /**
     * Asigna el padre de una etiqueta
     * @param padre void
     */
    ObjetoXML.prototype.setPadre = function (padre) {
        this.padre = padre;
    };
    /**
     * Agrega un atributo a la lista de atributos de una etiqueta XML
     * @param atributo void
     */
    ObjetoXML.prototype.addAtributo = function (atributo) {
        if (atributo != undefined) {
            this.lista_atributos.push(atributo);
        }
    };
    /**
     * Agrega un nuevo objeto a la lista de objetos de una etiqueta
     * @param objeto void
     */
    ObjetoXML.prototype.addObjeto = function (objeto) {
        if (objeto != undefined) {
            this.lista_objetos.push(objeto);
        }
    };
    /**
     * Verifica si la lista de atributos esta vacia
     * @returns boolean
     */
    ObjetoXML.prototype.atributosIsEmpty = function () {
        if (this.lista_atributos === null) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Verifica que la cadena de entrada no este vacia y arregla la cadena si hay caracteres especiales
     * @param cont void
     */
    ObjetoXML.prototype.setContenido = function (cont) {
        //comprueba que la cadena no solo tenga espacios_en_blanco/tabs/saltos
        var cadena = cont.toString().replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/ /g, '');
        if (cadena != '') {
            /**
             * reemplaza los caracteres especiales
             * &alt = <
             * &amp = &
             * &gt  = >
             * &quot = "
             * &apos = '
             */
            cont = cont.toString().replace(/&alt;/g, '<').replace(/&amp/g, '&').replace(/&gt/g, '>').replace(/&quot;/g, '"'.replace(/&apos;/g, "'"));
            this.contenido = cont;
        }
        else {
            this.contenido = '';
        }
    };
    /**
     * retorna cadena con el formato de XML <tag {atributos} > {elementos/contenido} </tag>
     * @returns string
     */
    ObjetoXML.prototype.toString = function (iden) {
        if (iden === void 0) { iden = ''; }
        var cadena = '';
        var elementos = '';
        var atributos = '';
        if (this.lista_atributos.length > 0) {
            atributos += ' ';
            this.lista_atributos.forEach(function (element) { atributos += element.toString() + ' '; });
            atributos += '';
        }
        this.lista_objetos.forEach(function (element) { elementos += iden + element.toString(iden + '\t') + '\n'; });
        if (this.tipo === 0) {
            cadena += iden + "<" + this.etiqueta_id + atributos + ">" + this.contenido + ((elementos != '') ? '\n' + elementos : '') + ((elementos != '') ? iden : '') + "</" + this.etiqueta_id + ">";
        }
        else {
            cadena += iden + "<" + this.etiqueta_id + atributos + "/>";
        }
        return cadena;
    };
    /**
     * Metodo que pasa una refencia del la etiqueta padre a sus respectivos hijos
     */
    ObjetoXML.prototype.pasarPadre = function () {
        var size = this.lista_objetos.length;
        for (var i = 0; i < size; i++) {
            this.lista_objetos[i].setPadre(this);
            this.lista_objetos[i].pasarPadre();
        }
    };
    /**
     * Obtiene una copia del objeto, pero este esta arreglado para no eliminar el parametro
     * 'padre' al objeto
     * @returns ObjetoXML
     */
    ObjetoXML.prototype.getFixedCopy = function () {
        var nuevo = Object.assign({}, this);
        delete nuevo.padre;
        var size = nuevo.lista_objetos.length;
        for (var i = 0; i < size; i++) {
            nuevo.lista_objetos[i].getFixedCopy;
        }
        return nuevo;
    };
    /**
     * Devuelve el nombre del padre de una etiqueta, si es que posee uno
     * @returns string
     */
    ObjetoXML.prototype.getNameFather = function () {
        return (this.padre != undefined) ? this.padre.etiqueta_id : '';
    };
    return ObjetoXML;
}());
exports.ObjetoXML = ObjetoXML;
