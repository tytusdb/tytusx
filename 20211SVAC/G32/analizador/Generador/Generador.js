"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generador = void 0;
//Clase que controla las intervenciones al C3D
class Generador {
    /*Sección de inicio del generador*/
    constructor() {
        this.temporal = 0;
        this.etiqueta = 0;
        this.codigo = [];
        this.tempsave = [];
        this.cadxml = [];
        this.ptrh = 0;
        this.ptrs = 0;
    }
    static GetInstance() {
        if (!Generador.instance) {
            Generador.instance = new Generador();
        }
        return Generador.instance;
    }
    ResetGenerador() {
        this.temporal = 0;
        this.etiqueta = 0;
        this.codigo = [];
        this.tempsave = [];
        this.cadxml = [];
        this.ptrh = 0;
        this.ptrs = 0;
    }
    /*Sección de creación de etiquetas, temporales, labels...*/
    Creartemp() {
        //Se crea la cadena con estructura Tnum
        const temporal = 'T' + this.temporal;
        this.temporal++;
        //Se almacena el temporal en la lista de variables a declarar
        this.tempsave.push(temporal);
        return temporal;
    }
    Crearetiqueta() {
        //Se crea la cadena con estructura Lnum
        const label = 'L' + this.etiqueta;
        this.etiqueta++;
        return label;
    }
    /*Sección para agregar elementos al código*/
    //Los métodos identados tienen un \t al inicio del texto
    Addcodigo(texto) {
        this.codigo.push(texto);
    }
    Addcodigoidentado(texto) {
        this.codigo.push(`\t${texto}`);
    }
    Addxml(texto) {
        this.cadxml.push(`\t${texto}`);
    }
    Addcomentario(texto) {
        //Se agrega un comentario al código
        this.codigo.push(`/*********** ${texto} ***********/`);
    }
    Addcomentarioidentado(texto) {
        //Se agrega un comentario al código
        this.codigo.push(`\t/*********** ${texto} ***********/`);
    }
    Addcomentarioxml(texto) {
        //Se agrega un comentario al código
        this.cadxml.push(`\t/*********** ${texto} ***********/`);
    }
    Addcodxml() {
        let cadena = this.cadxml.join('\n');
        //Se agrega al código inicial
        this.codigo.push(cadena);
    }
    /*Modificaciones de registros*/
    //Incremento del sp
    Incph(cant) {
        this.ptrh = this.ptrh + cant;
    }
    Incps(cant) {
        this.ptrs = this.ptrs + cant;
    }
    Decps(cant) {
        this.ptrs = this.ptrs - cant;
    }
    /*Sección de retornos*/
    //Retornos de registros
    GetHeappos() {
        return this.ptrh;
    }
    GetStackpos() {
        return this.ptrs;
    }
    //Agrega la lista de temporales a la cadena de codigo
    Gettemporales() {
        let cad = 'double ';
        //Se guarda el código de temporales declarados
        if (this.tempsave.length != 0) {
            //Se concatena de la forma T0, T1, ... Tn;
            cad = cad + this.tempsave.join(', ');
            cad = cad + ';\n';
            this.codigo.push(cad);
        }
    }
    //Retorna el código ya completo
    GetCodigo() {
        //El código almacenado en la lista se une con un salto de línea por cada elemento
        //Para ello la instrucción join
        /*
        let lista = ['a', 'b', 'c']
        let str = lista.join('. ');
        str ahora es "a. b. c"
        */
        const fullcodigo = this.codigo.join('\n');
        return fullcodigo;
    }
    nuevoprint(cont) {
        /*
        Para imprimir un ascii se utiliza el type: %c
        printf("%c", (char)64)  ->   Resultado de impresión: @
        */
        switch (cont) {
            case 0:
                return ('printf(\"%c\", (char) )');
        }
    }
}
exports.Generador = Generador;
