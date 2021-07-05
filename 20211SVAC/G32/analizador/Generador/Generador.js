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
        this.cod_funcs = [];
        this.tempsave = [];
        this.cadxml = [];
        this.cad_xq = [];
        this.ptrh = 0;
        this.ptrs = 0;
        this.ptrhxpath = 0;
        this.ptrsxpath = 0;
        this.ptrhxq = 0;
        this.ptrsxq = 0;
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
        this.cod_funcs = [];
        this.tempsave = [];
        this.cadxml = [];
        this.cad_xq = [];
        this.ptrh = 0;
        this.ptrs = 0;
        this.ptrhxpath = 0;
        this.ptrsxpath = 0;
        this.ptrhxq = 0;
        this.ptrsxq = 0;
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
    /*Sección para agregar elementos a las listas de código*/
    //Los métodos identados tienen un \t al inicio del texto
    Addcodigo(texto) {
        this.codigo.push(texto);
    }
    Addcodigoidentado(texto) {
        this.codigo.push(`\t${texto}`);
    }
    Addcomentario(texto) {
        //Se agrega un comentario al código
        this.codigo.push(`/*********** ${texto} ***********/`);
    }
    Addcomentarioidentado(texto) {
        //Se agrega un comentario al código
        this.codigo.push(`\t/*********** ${texto} ***********/`);
    }
    Addxml(texto) {
        this.cadxml.push(`\t${texto}`);
    }
    Addcomentarioxml(texto) {
        //Se agrega un comentario al código
        this.cadxml.push(`\t/*********** ${texto} ***********/`);
    }
    Addnumconsulta(num) {
        let cast = num.toString();
        /*
        Se introduce al heapxpath en la posición Hxpath la cadena ' -----(num_consulta)-----\n '
        */
        for (let i = 0; i < 15; i++) {
            this.Addxml(`heapxpath[(int)Hxpath] = ${"-".charCodeAt(0)};`);
            this.Addxml('Hxpath = Hxpath + 1;');
            this.Incphxpath(1);
        }
        this.Addxml(`heapxpath[(int)Hxpath] = ${"(".charCodeAt(0)};`);
        this.Addxml('Hxpath = Hxpath + 1;');
        this.Incphxpath(1);
        this.Addxml(`heapxpath[(int)Hxpath] = ${cast.charCodeAt(0)};`);
        this.Addxml('Hxpath = Hxpath + 1;');
        this.Incphxpath(1);
        this.Addxml(`heapxpath[(int)Hxpath] = ${")".charCodeAt(0)};`);
        this.Addxml('Hxpath = Hxpath + 1;');
        this.Incphxpath(1);
        for (let i = 0; i < 15; i++) {
            this.Addxml(`heapxpath[(int)Hxpath] = ${"-".charCodeAt(0)};`);
            this.Addxml('Hxpath = Hxpath + 1;');
            this.Incphxpath(1);
        }
        this.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
        this.Addxml('Hxpath = Hxpath + 1;');
        this.Incphxpath(1);
    }
    Addcodfunc(texto) {
        this.cod_funcs.push(`${texto}`);
    }
    Addcodfuncidentado(texto) {
        this.cod_funcs.push(`\t${texto}`);
    }
    Addcomentariofuncout(texto) {
        //Se agrega un comentario al código afuera (no identado)
        this.cod_funcs.push(`/*********** ${texto} ***********/`);
    }
    Addcomentariofunc(texto) {
        //Se agrega un comentario al código
        this.cod_funcs.push(`\t/*********** ${texto} ***********/`);
    }
    Addxq(texto) {
        this.cad_xq.push(`\t${texto}`);
    }
    Addcomentarioxq(texto) {
        //Se agrega un comentario al código
        this.cad_xq.push(`\t/*********** ${texto} ***********/`);
    }
    /*Sección para concatenar las listas a la cadena de código final*/
    Jointemporales() {
        let cad = 'double ';
        //Se guarda el código de temporales declarados
        if (this.tempsave.length != 0) {
            //Se concatena de la forma T0, T1, ... Tn;
            cad = cad + this.tempsave.join(', ');
            cad = cad + ';\n';
            this.codigo.push(cad);
        }
    }
    Joincodxml() {
        let cadena = this.cadxml.join('\n');
        //Se agrega al código inicial
        this.codigo.push(cadena);
    }
    Joincodxq() {
        let cadena = this.cad_xq.join('\n');
        //Se agrega al código inicial
        this.codigo.push(cadena);
    }
    Joinfunc() {
        let cadena = this.cod_funcs.join('\n');
        //Se agrega al código inicial
        //this.Addcomentario('Funciones nativas');
        this.codigo.push(cadena);
    }
    /*Modificaciones de registros*/
    Incph(cant) {
        this.ptrh = this.ptrh + cant;
    }
    Incps(cant) {
        this.ptrs = this.ptrs + cant;
    }
    Decps(cant) {
        this.ptrs = this.ptrs - cant;
    }
    Incphxpath(cant) {
        this.ptrhxpath = this.ptrhxpath + cant;
    }
    Incpsxpath(cant) {
        this.ptrsxpath = this.ptrsxpath + cant;
    }
    Decpsxpath(cant) {
        this.ptrsxpath = this.ptrsxpath - cant;
    }
    Incphxquery(cant) {
        this.ptrhxq = this.ptrhxq + cant;
    }
    Incpsxquery(cant) {
        this.ptrsxq = this.ptrsxq + cant;
    }
    Decpsxquery(cant) {
        this.ptrsxq = this.ptrsxq - cant;
    }
    /*Sección de retornos*/
    //Retornos de registros
    GetHeappos() {
        return this.ptrh;
    }
    GetStackpos() {
        return this.ptrs;
    }
    GetHeapposxpath() {
        return this.ptrhxpath;
    }
    GetStackposxpath() {
        return this.ptrsxpath;
    }
    GetHeapposxquery() {
        return this.ptrhxq;
    }
    GetStackposxquery() {
        return this.ptrsxq;
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
    //Funciones nativas
    Printf() {
        //Temporal para almacenar la posición del stack con el contenido
        let temp_stack_cont = this.Creartemp();
        //Temporal para obtener la posición del contenido dentro de la función nativa
        let temp_sp_pos = this.Creartemp();
        //Temporal para el contenido referenciado por el puntero stack
        let temp_sp_cont = this.Creartemp();
        //Temporal de contenido del heap
        let temp_heap = this.Creartemp();
        //Temporal para el almacenamiento del cambio de ámbito
        let temp_entorno = this.Creartemp();
        //Temporal para el return
        let temp_return = this.Creartemp();
        //Etiquetas de control
        let lbl_init = this.Crearetiqueta();
        let lbl_cond = this.Crearetiqueta();
        this.Addcomentarioxml('Impresión de la consulta');
        this.Addcomentarioxml('Ajuste de punteros y estructuras');
        //Se obtiene la posición en el stackxpath donde está el contenido del heapxpath
        this.Addxml(`${temp_stack_cont} = stackxpath[(int)${this.GetStackposxpath() - 1}];`);
        //Se realiza el cambio de entorno de acuerdo a la cantidad de elementos de la función
        this.Addxml(`${temp_entorno} = Sxpath + ${this.GetStackposxpath()};`);
        //Se deja una posición vacía para el retorno
        this.Addxml(`${temp_entorno} = ${temp_entorno} + 1;`);
        //Asignamos en el stackxpath en la nueva posición lo que se desea imprimir
        this.Addxml(`stackxpath[(int)${temp_entorno}] = ${temp_stack_cont};`);
        //Ajustamos el puntero
        this.Addxml(`Sxpath = Sxpath + ${this.GetStackposxpath()};`);
        //Llamado de función
        this.Addxml('Printconsulta();\n');
        this.Addcomentariofuncout('Función nativa');
        this.Addcodfunc('void Printconsulta() {');
        //En la posición del puntero + 1 está el contenido a imprimir (colocado antes del llamado a la función)
        this.Addcodfuncidentado(`${temp_sp_pos} = Sxpath + 1;`);
        //Se obtiene el contenido referenciado por el puntero stack (posición del heap)
        this.Addcodfuncidentado(`${temp_sp_cont} = stackxpath[(int)${temp_sp_pos}];`);
        //Etiqueta de inicio
        this.Addcodfuncidentado(`${lbl_init}:\n`);
        //Se obtiene lo que hay en el heap en la posición que tiene el stack
        this.Addcodfuncidentado(`${temp_heap} = heapxpath[(int)${temp_sp_cont}];`);
        this.Addcodfuncidentado(`if(${temp_heap} == -1) goto ${lbl_cond};`);
        this.Addcodfuncidentado(`printf("%c", (char)${temp_heap});`);
        //Se aumenta el temp de la posición del heap
        this.Addcodfuncidentado(`${temp_sp_cont} = ${temp_sp_cont} + 1;`);
        this.Addcodfuncidentado(`goto ${lbl_init};`);
        this.Addcodfuncidentado(`${lbl_cond}:\n`);
        this.Addcodfuncidentado(`return;\n}\n`);
        //Parte final del llamado en el main
        this.Addcomentarioxml('Ajustes luego del llamado a la función');
        //Se obtiene el posible retorno
        this.Addxml(`${temp_return} = stackxpath[(int)Sxpath];`);
        //Se regresa el puntero
        this.Addxml(`Sxpath = Sxpath - ${this.GetStackposxpath()};`);
        //Imprimir un salto de linea
        this.Addxml(`printf("%c", (char)10);\n`);
    }
}
exports.Generador = Generador;
