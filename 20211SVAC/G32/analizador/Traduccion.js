"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traduccion = void 0;
const operacion_1 = require("./expresiones/operacion");
const primitivo_1 = require("./expresiones/primitivo");
const relacional_1 = require("./expresiones/relacional");
const Generador_1 = require("./Generador/Generador");
class Traduccion {
    constructor(tablasim) {
        this.ts = tablasim;
        this.cadena = "";
        this.Unerror = false;
        this.caderror = "";
    }
    Traducir() {
        //Instancia del generador y limpieza de variables
        const generador = Generador_1.Generador.GetInstance();
        generador.ResetGenerador();
        //Arreglar tabla de símbolos y crear heap y stack
        this.Crearestructuras();
        //Formular código
        this.Crearcadena();
        return this.cadena;
    }
    Crearestructuras() {
        //Recuperar instancia del generador
        const generador = Generador_1.Generador.GetInstance();
        //Cadena auxiliar
        let cadena;
        let tempo;
        //Se recorre cada elemento de la tabla
        this.ts.tabla.forEach(element => {
            //elem[0] = identificador, elem[1] = valor, elem[7] = direccion
            //El guardado depende de si tienen valor o no
            if (element[1] == "") {
                //Con valor únicamente se almacena el id de la etiqueta
                generador.Addcomentarioxml('Agregando un nuevo elemento sin valores');
                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);
                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadid = element[0];
                for (let i = 0; i < cadid.length; i++) {
                    //Se introduce al heap en la posición H, el caracter ascii
                    generador.Addxml(`heap[(int)H] = ${cadid.charCodeAt(i)};`);
                    //Se incrementa el registro H
                    generador.Addxml('H = H + 1;');
                    generador.Incph(1);
                }
                //Al finalizar la cadena se introduce un -1 para indicar final
                generador.Addxml(`heap[(int)H] = -1;`);
                generador.Addxml('H = H + 1;');
                generador.Incph(1);
                generador.Addcomentarioxml('Se agrega la posición de inicio del heap en el stack');
                //Se referencia al stack el inicio del heap
                let st = generador.GetStackpos();
                generador.Addxml(`stack[(int)${st}] = ${tempo};\n`);
                //Se incrementa el stack
                generador.Incps(1);
                //Se guarda la dirección en la tabla de símbolos
                element[7] = st;
            }
            else {
                //Con más de un valor se almacena el id y luego el valor
                generador.Addcomentarioxml('Agregando un nuevo elemento con valores');
                generador.Addcomentarioxml('Almacenando el identificador');
                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);
                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadid = element[0];
                for (let i = 0; i < cadid.length; i++) {
                    //Se introduce al heap en la posición H, el caracter ascii
                    generador.Addxml(`heap[(int)H] = ${cadid.charCodeAt(i)};`);
                    //Se incrementa el registro H
                    generador.Addxml('H = H + 1;');
                    generador.Incph(1);
                }
                //Al finalizar la cadena se introduce un -1 para indicar final
                generador.Addxml(`heap[(int)H] = -1;`);
                generador.Addxml('H = H + 1;');
                generador.Incph(1);
                generador.Addcomentarioxml('Se agrega la posición de inicio del heap en el stack');
                //Se referencia al stack el inicio del heap
                let st = generador.GetStackpos();
                generador.Addxml(`stack[(int)${st}] = ${tempo};\n`);
                //Se incrementa el stack
                generador.Incps(1);
                //Se guarda la dirección en la tabla de símbolos
                element[7] = st;
                /* */
                generador.Addcomentarioxml('Almacenando el valor');
                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);
                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadval = element[1];
                for (let i = 0; i < cadval.length; i++) {
                    //Se introduce al heap en la posición H, el caracter ascii
                    generador.Addxml(`heap[(int)H] = ${cadval.charCodeAt(i)};`);
                    //Se incrementa el registro H
                    generador.Addxml('H = H + 1;');
                    generador.Incph(1);
                }
                //Al finalizar la cadena se introduce un -1 para indicar final
                generador.Addxml(`heap[(int)H] = -1;`);
                generador.Addxml('H = H + 1;');
                generador.Incph(1);
                generador.Addcomentarioxml('Se agrega la posición de inicio del heap en el stack');
                //Se referencia al stack el inicio del heap
                st = generador.GetStackpos();
                generador.Addxml(`stack[(int)${st}] = ${tempo};\n`);
                //Se incrementa el stack
                generador.Incps(1);
            }
        });
    }
    Crearcadena() {
        //Recuperar instancia del generador
        const generador = Generador_1.Generador.GetInstance();
        //Se agrega primero el header
        generador.Addcomentario('Inicio del código generado');
        generador.Addcodigo('#include <stdio.h>\n');
        generador.Addcodigo('double heap[30101999];');
        generador.Addcodigo('double stack[30101999];');
        generador.Addcodigo('double S;');
        generador.Addcodigo('double H;\n');
        //Se agregan las declaraciones iniciales
        generador.Jointemporales();
        //Se agrega el inicio del main
        generador.Addcomentario('Agregando main');
        generador.Addcodigo(`int main() \n{`);
        //Contenido del main
        generador.Addcomentarioidentado('Inicializar registros');
        generador.Addcodigoidentado('S = 0;');
        generador.Addcodigoidentado('H = 0;\n');
        generador.Joincodxml();
        //Se agrega el final del main
        generador.Addcodigoidentado(`return 0; \n}\n`);
        //Retorno del código
        this.cadena = generador.GetCodigo();
    }
    TraducirXpath(prologo, cuerpo, raiz) {
        this.prologoXml = prologo;
        this.cuerpoXml = cuerpo;
        Object.assign(this, { raiz, contador: 0, dot: '' });
        const generador = Generador_1.Generador.GetInstance();
        generador.ResetGenerador();
        //Arreglar tabla de símbolos y crear heap y stack
        this.Crearestructuras();
        //Crear codigo de consulta
        this.recorrer();
        //Se agregan funciones si no hay errores
        if (this.Unerror == false) {
            generador.Printf();
        }
        //Formular código
        this.Crearcadenaxpath();
        return this.cadena;
    }
    Crearcadenaxpath() {
        //Recuperar instancia del generador
        const generador = Generador_1.Generador.GetInstance();
        //Se agrega primero el header
        generador.Addcomentario('Inicio del código generado');
        generador.Addcodigo('#include <stdio.h>\n');
        generador.Addcodigo('double heap[30101999];');
        generador.Addcodigo('double stack[30101999];');
        generador.Addcodigo('double heapxpath[30101999];');
        generador.Addcodigo('double stackxpath[30101999];');
        generador.Addcodigo('double S;');
        generador.Addcodigo('double H;');
        generador.Addcodigo('double Sxpath;');
        generador.Addcodigo('double Hxpath;\n');
        //Se agregan las declaraciones iniciales
        generador.Jointemporales();
        //Se agregan funciones
        generador.Joinfunc();
        //Se agrega el inicio del main
        generador.Addcomentario('Agregando main');
        generador.Addcodigo(`int main() \n{`);
        //Contenido del main
        generador.Addcomentarioidentado('Inicializar registros');
        generador.Addcodigoidentado('S = 0;');
        generador.Addcodigoidentado('H = 0;');
        generador.Addcodigoidentado('Sxpath = 0;');
        generador.Addcodigoidentado('Hxpath = 0;\n');
        generador.Joincodxml();
        //Se agrega el final del main
        generador.Addcodigoidentado(`return 0; \n}\n`);
        //Retorno del código
        this.cadena = generador.GetCodigo();
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
        //Instancia del generador
        const generador = Generador_1.Generador.GetInstance();
        this.Unerror = false;
        this.caderror = "";
        if (this.raiz != null) {
            this.esRaiz = true;
            this.descendiente = false;
            this.atributo = false;
            this.atributoTexto = '';
            this.atributoIdentificacion = [];
            this.indiceValor = null;
            this.punto = '';
            this.consultaXML = this.cuerpoXml;
            try {
                this.recorrido(this.raiz);
            }
            catch (error) {
                generador.Addcomentarioxml('No se encontró por algún error en la consulta :(');
                this.Unerror = true;
                this.caderror = "No se encontró por algún error en la consulta";
                generador.Addxml(`printf("${this.caderror}");`);
            }
            if (this.atributoIdentificacion.length > 0) {
                this.traducir();
            }
            else {
                generador.Addcomentarioxml('No se encontró la información');
                this.Unerror = true;
                this.caderror = "No se encontró la información";
                generador.Addxml(`printf("${this.caderror}");`);
            }
        }
        else {
            generador.Addcomentarioxml('No se pudo generar C3D del Xpath');
            this.Unerror = true;
            this.caderror = "No se pudo generar C3D del Xpath :(";
            generador.Addxml(`printf("${this.caderror}");`);
        }
    }
    recorrido(nodo) {
        if (nodo instanceof Object) {
            if (this.identificar('S', nodo)) {
                this.recorrido(nodo.hijos[0]);
            }
            if (this.identificar('INSTRUCCIONES', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        if (element === '|') {
                            this.consultaXML.forEach(element => {
                                this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto });
                            });
                            this.esRaiz = true;
                            this.descendiente = false;
                            this.atributo = false;
                            this.atributoTexto = '';
                            this.indiceValor = null;
                            this.punto = '';
                            this.consultaXML = this.cuerpoXml;
                        }
                        else if (!(element === '[') && !(element === ']') && !(element === '(') && !(element === ')')) {
                            this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
                        }
                    }
                });
                this.consultaXML.forEach(element => {
                    this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto });
                });
                this.atributoIdentificacion.sort((n1, n2) => {
                    if (n1.cons.linea > n2.cons.linea) {
                        return 1;
                    }
                    if (n1.cons.linea < n2.cons.linea) {
                        return -1;
                    }
                    return 0;
                });
            }
            if (this.identificar('RAIZ', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
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
                        this.consultaXML = this.reducir(this.consultaXML, element, 'PADRE');
                    }
                });
            }
            if (this.identificar('ATRIBUTO_PREDICADO', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        //console.log(element);
                        this.consultaXML = this.reducir(this.consultaXML, element, 'ATRIBUTO_PREDICADO');
                    }
                });
            }
            if (this.identificar('ORDEN', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string' && element === 'last') {
                        let cons;
                        cons = [];
                        this.consultaXML.forEach((element, index) => {
                            if (index === this.consultaXML.length - 1) {
                                cons.push(element);
                            }
                        });
                        this.consultaXML = cons;
                    }
                });
            }
            if (this.identificar('ARITMETICAS', nodo) || this.identificar('integer', nodo)) {
                if (this.identificar('integer', nodo)) {
                    this.consultaXML = this.reducir(this.consultaXML, nodo.hijos[0], 'INSTRUCCIONES');
                }
                else {
                    let val = null;
                    val = this.calcular(nodo, null, 0);
                    this.consultaXML = this.reducir(this.consultaXML, val.getValorImplicito(val), 'INSTRUCCIONES');
                }
            }
            if (this.identificar('HIJOS', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        //console.log(this.consultaXML);
                        this.consultaXML = this.reducir(this.consultaXML, element, 'HIJOS');
                    }
                });
            }
            if (this.identificar('ATRIBUTO_NODO', nodo)) {
                nodo.hijos.forEach((element) => {
                    if (element instanceof Object) {
                        this.recorrido(element);
                    }
                    else if (typeof element === 'string') {
                        this.consultaXML = this.reducir(this.consultaXML, element, 'ATRIBUTO_NODO');
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
                this.punto = etiqueta;
                let cons = [];
                consulta.forEach(element => {
                    element.listaAtributos.forEach(atributo => {
                        if (atributo.identificador === etiqueta) {
                            this.atributoTexto = etiqueta;
                            cons.push(element);
                        }
                    });
                });
                return cons;
            }
            else if (etiqueta === 'node()') {
                let cons = [];
                consulta.forEach(element => {
                    this.ts.tabla.forEach(padre => {
                        if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                            if (element.listaObjetos.length > 0) {
                                cons = cons.concat(element.listaObjetos);
                            }
                            else {
                                //arreglar cuando solo viene texto 
                                this.node_texto = true;
                                if (element.texto != null)
                                    cons = cons.concat(element);
                            }
                        }
                    });
                });
                return cons;
            }
            else if (etiqueta === 'text()') {
                let cons = [];
                consulta.forEach(element => {
                    this.ts.tabla.forEach(padre => {
                        if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                            if (element.listaObjetos.length > 0) {
                                //elemento
                            }
                            else {
                                this.node_texto = true;
                                if (element.texto != null)
                                    cons = cons.concat(element);
                            }
                        }
                    });
                });
                return cons;
            }
        }
        else if (nodo === 'DESCENDIENTES_NODO') {
            if (etiqueta === '//') {
                this.descendiente = true;
                this.esRaiz = false;
                return consulta;
            }
            else if (etiqueta === '@') {
                this.atributo = true;
                return consulta;
            }
            else if (this.atributo) {
                this.punto = etiqueta;
                let cons = [];
                consulta.forEach(element => {
                    element.listaAtributos.forEach(atributo => {
                        if (atributo.identificador === etiqueta) {
                            this.atributoTexto = etiqueta;
                            cons.push(element);
                        }
                    });
                    if (element.listaObjetos.length > 0) {
                        cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
                    }
                });
                return cons;
            }
            else if (etiqueta === '//*') {
                let cons = [];
                consulta.forEach(element => {
                    this.ts.tabla.forEach(padre => {
                        if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                            if (element.listaObjetos.length > 0) {
                                cons = cons.concat(element.listaObjetos);
                            }
                        }
                    });
                });
                this.nodo_descendente = true;
                return cons;
            }
            else if (etiqueta === 'node()') {
                let cons = [];
                consulta.forEach(element => {
                    this.ts.tabla.forEach(padre => {
                        if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                            if (element.listaObjetos.length > 0) {
                                cons = cons.concat(element.listaObjetos);
                            }
                            else {
                                //arreglar cuando solo viene texto 
                                this.node_texto = true;
                                if (element.texto != null)
                                    cons = cons.concat(element);
                            }
                        }
                    });
                });
                this.node_desc = true;
                return cons;
            }
            else if (etiqueta === 'text()') {
                let cons = [];
                consulta.forEach(element => {
                    this.ts.tabla.forEach(padre => {
                        if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                            if (element.listaObjetos.length > 0) {
                                if (element.texto != null) {
                                    this.node_texto = true;
                                    cons = cons.concat(element.listaObjetos);
                                }
                            }
                            else {
                            }
                        }
                    });
                });
                return cons;
            }
        }
        else if (nodo === 'INSTRUCCIONES') {
            let cons;
            cons = [];
            if (Number.isInteger(parseInt(etiqueta))) {
                let indice = parseInt(etiqueta);
                //console.log(indice);
                consulta.forEach((element, index) => {
                    if (index === indice - 1) {
                        cons.push(element);
                    }
                });
                return cons;
            }
            //Axes - ::child
            else if (this.ej_child) {
                //Para child::*
                if (etiqueta === '*') {
                    /*  Falta arreglar cuando se coloca -> //child::*; */
                    if (this.esRaiz) {
                        return consulta;
                    }
                    else {
                        consulta.forEach(element => {
                            this.ts.tabla.forEach(padre => {
                                if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                                    if (element.listaObjetos.length > 0) {
                                        cons = cons.concat(element.listaObjetos);
                                    }
                                }
                            });
                        });
                        return cons;
                    }
                }
                else {
                    //Si viene una ruta tipo -> //nodo::child
                    if (this.descendiente) {
                        this.punto = etiqueta;
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
                    //Si viene una ruta normal -> /nodo::child
                    else {
                        this.punto = etiqueta;
                        // Si child viene en la raiz -> child::raiz
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
                }
            }
            //Axes - :: attribute
            else if (this.ej_attrib) {
                /*  Falta arreglar cuando se coloca -> //attribute::attrib; y /attribute::attrib; */
                /*  Falta agregar correción también con //attribute::*; y /attribute::*; */
                if (etiqueta === '*') {
                    if (this.descendiente) {
                        this.atributo = true;
                        this.atributo_nodo_descendiente = true;
                        consulta.forEach(element => {
                            if (element.listaAtributos.length > 0) {
                                cons = cons.concat(element);
                            }
                            if (element.listaObjetos.length > 0) {
                                cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
                            }
                        });
                        //this.atributo_nodo = true; 
                        return cons;
                    }
                    else {
                        consulta.forEach(element => {
                            if (element.listaAtributos.length > 0) {
                                cons = cons.concat(element);
                            }
                        });
                        this.atributo = false;
                        this.atributo_nodo = true;
                        return cons;
                    }
                }
                else {
                    if (this.descendiente) {
                        this.punto = etiqueta;
                        consulta.forEach(element => {
                            element.listaAtributos.forEach(atributo => {
                                if (atributo.identificador === etiqueta) {
                                    this.atributoTexto = etiqueta;
                                    cons.push(element);
                                }
                            });
                            if (element.listaObjetos.length > 0) {
                                cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
                            }
                        });
                        return cons;
                    }
                    else {
                        this.punto = etiqueta;
                        consulta.forEach(element => {
                            element.listaAtributos.forEach(atributo => {
                                if (atributo.identificador === etiqueta) {
                                    this.atributoTexto = etiqueta;
                                    cons.push(element);
                                }
                            });
                        });
                        return cons;
                    }
                }
            }
            else if (!this.descendiente) {
                this.punto = etiqueta;
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
            else { //descendiente = true;
                this.punto = etiqueta;
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
        else if (nodo === 'ATRIBUTO_PREDICADO') {
            if (etiqueta === '@') {
                this.atributo = true;
                return consulta;
            }
            else if (this.atributo) {
                this.atributo = false;
                let cons = [];
                consulta.forEach(element => {
                    element.listaAtributos.forEach(atributo => {
                        if (atributo.identificador === etiqueta) {
                            this.atributoTexto = etiqueta;
                            cons.push(element);
                        }
                    });
                });
                return cons;
            }
        }
        else if (nodo === 'HIJOS') {
            if (etiqueta === '/*') {
                let cons = [];
                consulta.forEach(element => {
                    this.ts.tabla.forEach(padre => {
                        if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                            if (element.listaObjetos.length > 0) {
                                cons = cons.concat(element.listaObjetos);
                            }
                        }
                    });
                });
                return cons;
            }
        }
        else if (nodo === 'ATRIBUTO_NODO') {
            if (etiqueta === '/@*') {
                let cons = [];
                consulta.forEach(element => {
                    if (element.listaAtributos.length > 0) {
                        cons = cons.concat(element);
                    }
                });
                this.atributo_nodo = true;
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
                        this.atributoTexto = etiqueta;
                        cons.push(element);
                    }
                });
                if (element.listaAtributos.length > 0 && this.atributo_nodo_descendiente) {
                    cons.push(element);
                }
                if (element.listaObjetos.length > 0) {
                    cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, true));
                }
            }
            else {
                if (element.identificador === etiqueta) {
                    cons.push(element);
                    if (this.descendiente && element.listaObjetos.length > 0) {
                        cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
                    }
                }
                else if (element.listaObjetos.length > 0) {
                    cons = cons.concat(this.recDescen(element.listaObjetos, etiqueta, false));
                }
            }
        });
        return cons;
    }
    calcular(nodo, logica, position) {
        if (this.identificar('ARITMETICAS', nodo)) {
            let izq, der = null;
            let op = "";
            nodo.hijos.forEach((element) => {
                if (element instanceof Object) {
                    if (op === "" && this.identificar('integer', element)) {
                        izq = new primitivo_1.Primitivo(Number(element.hijos[0]), 1, 1);
                    }
                    else if (!(op === "") && this.identificar('integer', element)) {
                        der = new primitivo_1.Primitivo(Number(element.hijos[0]), 1, 1);
                    }
                    else if (op === "" && this.identificar('double', element)) {
                        izq = new primitivo_1.Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
                    }
                    else if (!(op === "") && this.identificar('double', element)) {
                        der = new primitivo_1.Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
                    }
                    else if (op === "" && this.identificar('ARITMETICAS', element)) {
                        izq = this.calcular(element, null, position);
                    }
                    else if (!(op === "") && this.identificar('ARITMETICAS', element)) {
                        der = this.calcular(element, null, position);
                    }
                    else if (op === "" && this.identificar('ORDEN', element)) {
                        izq = new primitivo_1.Primitivo(Number(this.consultaXML.length), 1, 1);
                    }
                    else if (!(op === "") && this.identificar('ORDEN', element)) {
                        der = new primitivo_1.Primitivo(Number(this.consultaXML.length), 1, 1);
                    }
                }
                else if (typeof element === 'string') {
                    if (!(element === '(') && !(element === ')')) {
                        op = element;
                    }
                }
            });
            if (izq && der && !(op === "")) {
                let a;
                if (op === '+') {
                    a = new operacion_1.Operacion(izq, der, operacion_1.Operador.SUMA, 1, 1);
                }
                else if (op === '-') {
                    a = new operacion_1.Operacion(izq, der, operacion_1.Operador.RESTA, 1, 1);
                }
                else if (op === '*') {
                    a = new operacion_1.Operacion(izq, der, operacion_1.Operador.MULTIPLICACION, 1, 1);
                }
                else if (op === 'div') {
                    a = new operacion_1.Operacion(izq, der, operacion_1.Operador.DIVISION, 1, 1);
                }
                else if (op === 'mod') {
                    a = new operacion_1.Operacion(izq, der, operacion_1.Operador.MODULO, 1, 1);
                }
                return a;
            }
        }
        if (this.identificar('RELACIONALES', nodo)) {
            let izq, der = null;
            let op = "";
            //console.log("entró relacional")
            nodo.hijos.forEach((element) => {
                if (element instanceof Object) {
                    if (op === "" && this.identificar('integer', element)) {
                        izq = new primitivo_1.Primitivo(Number(element.hijos[0]), 1, 1);
                    }
                    else if (!(op === "") && this.identificar('integer', element)) {
                        der = new primitivo_1.Primitivo(Number(element.hijos[0]), 1, 1);
                    }
                    else if (op === "" && this.identificar('double', element)) {
                        izq = new primitivo_1.Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
                    }
                    else if (!(op === "") && this.identificar('double', element)) {
                        der = new primitivo_1.Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
                    }
                    else if (op === "" && this.identificar('string', element)) {
                        let texto = element.hijos[0].slice(1, -1);
                        let t = texto.split(" ");
                        texto = '';
                        for (var i = 0; i < t.length; i++) {
                            texto += t[i];
                        }
                        izq = new primitivo_1.Primitivo(texto, 1, 1);
                    }
                    else if (!(op === "") && this.identificar('string', element)) {
                        //console.log("entró string derecho");
                        let texto = element.hijos[0].slice(1, -1);
                        let t = texto.split(" ");
                        texto = '';
                        for (var i = 0; i < t.length; i++) {
                            texto += t[i];
                        }
                        //console.log(texto);
                        der = new primitivo_1.Primitivo(texto, 1, 1);
                    }
                    else if (op === "" && this.identificar('ARITMETICAS', element)) {
                        izq = this.calcular(element, logica, position);
                    }
                    else if (!(op === "") && this.identificar('ARITMETICAS', element)) {
                        der = this.calcular(element, logica, position);
                    }
                    else if (op === "" && this.identificar('ORDEN', element)) {
                        if (element.hijos[0] === 'position') {
                            izq = new primitivo_1.Primitivo(Number(position), 1, 1);
                            this.posicion.push(Number(position));
                            this.posicion.push(true);
                            this.posicion.push("izq");
                        }
                        else
                            izq = new primitivo_1.Primitivo(Number(this.consultaXML.length), 1, 1);
                    }
                    else if (!(op === "") && this.identificar('ORDEN', element)) {
                        if (element.hijos[0] === 'position') {
                            der = new primitivo_1.Primitivo(Number(position), 1, 1);
                            this.posicion.push(Number(position));
                            this.posicion.push(true);
                            this.posicion.push("der");
                        }
                        else
                            der = new primitivo_1.Primitivo(Number(this.consultaXML.length), 1, 1);
                    }
                    else if (op === "" && this.identificar('ATRIBUTO_PREDICADO', element)) {
                        logica.listaAtributos.forEach(atri => {
                            if (atri.identificador === element.hijos[1]) {
                                let valor = atri.valor.slice(1, -1);
                                if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                                    //console.log(parseInt(valor));
                                    izq = new primitivo_1.Primitivo(Number(parseInt(valor)), 1, 1);
                                }
                                else {
                                    let texto = valor;
                                    let t = texto.split(" ");
                                    texto = '';
                                    for (var i = 0; i < t.length; i++) {
                                        texto += t[i];
                                    }
                                    izq = new primitivo_1.Primitivo(texto, 1, 1);
                                }
                            }
                        });
                    }
                    else if (!(op === "") && this.identificar('ATRIBUTO_PREDICADO', element)) {
                        logica.listaAtributos.forEach(atri => {
                            if (atri.identificador === element.hijos[1]) {
                                let valor = atri.valor.slice(1, -1);
                                if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                                    der = new primitivo_1.Primitivo(Number(parseInt(valor)), 1, 1);
                                }
                                else {
                                    let texto = valor;
                                    let t = texto.split(" ");
                                    texto = '';
                                    for (var i = 0; i < t.length; i++) {
                                        texto += t[i];
                                    }
                                    der = new primitivo_1.Primitivo(texto, 1, 1);
                                }
                            }
                        });
                    }
                    else if (op === "" && this.identificar('id', element)) {
                        //console.log("entró id");
                        logica.listaObjetos.forEach(ob => {
                            if (ob.identificador === element.hijos[0]) {
                                let texto = "";
                                for (var i = 0; i < ob.texto.length; i++) {
                                    texto += ob.texto[i];
                                }
                                if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                                    //console.log(parseInt(texto));
                                    izq = new primitivo_1.Primitivo(Number(parseInt(texto)), 1, 1);
                                }
                                else {
                                    //console.log(texto);
                                    izq = new primitivo_1.Primitivo(texto, 1, 1);
                                }
                            }
                        });
                    }
                    else if (!(op === "") && this.identificar('id', element)) {
                        logica.listaObjetos.forEach(ob => {
                            if (ob.identificador === element.hijos[0]) {
                                //console.log(ob.texto);
                                let texto = "";
                                for (var i = 0; i < ob.texto.length; i++) {
                                    texto += ob.texto[i];
                                }
                                if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                                    //console.log(parseInt(texto));
                                    der = new primitivo_1.Primitivo(Number(parseInt(texto)), 1, 1);
                                }
                                else {
                                    //console.log(texto);
                                    der = new primitivo_1.Primitivo(texto, 1, 1);
                                }
                            }
                        });
                    }
                    else if (op === "" && this.identificar('punto', element)) {
                        //console.log("at " + this.atributo);
                        if (logica.identificador === this.punto && !this.atributo) {
                            let texto = "";
                            for (var i = 0; i < logica.texto.length; i++) {
                                texto += logica.texto[i];
                            }
                            if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                                //console.log(parseInt(texto));
                                izq = new primitivo_1.Primitivo(Number(parseInt(texto)), 1, 1);
                            }
                            else {
                                //console.log(texto);
                                izq = new primitivo_1.Primitivo(texto, 1, 1);
                            }
                        }
                        else {
                            logica.listaAtributos.forEach(atri => {
                                if (atri.identificador === this.punto) {
                                    let valor = atri.valor.slice(1, -1);
                                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                                        izq = new primitivo_1.Primitivo(Number(parseInt(valor)), 1, 1);
                                    }
                                    else {
                                        let texto = valor;
                                        let t = texto.split(" ");
                                        texto = '';
                                        for (var i = 0; i < t.length; i++) {
                                            texto += t[i];
                                        }
                                        izq = new primitivo_1.Primitivo(texto, 1, 1);
                                    }
                                }
                            });
                        }
                    }
                    else if (!(op === "") && this.identificar('punto', element)) {
                        if (logica.identificador === this.punto && !this.atributo) {
                            //console.log(logica.texto);
                            let texto = "";
                            for (var i = 0; i < logica.texto.length; i++) {
                                texto += logica.texto[i];
                            }
                            if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                                //console.log(parseInt(texto));
                                der = new primitivo_1.Primitivo(Number(parseInt(texto)), 1, 1);
                            }
                            else {
                                //console.log(texto);
                                der = new primitivo_1.Primitivo(texto, 1, 1);
                            }
                        }
                        else {
                            logica.listaAtributos.forEach(atri => {
                                if (atri.identificador === this.punto) {
                                    let valor = atri.valor.slice(1, -1);
                                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                                        der = new primitivo_1.Primitivo(Number(parseInt(valor)), 1, 1);
                                    }
                                    else {
                                        let texto = valor;
                                        let t = texto.split(" ");
                                        texto = '';
                                        for (var i = 0; i < t.length; i++) {
                                            texto += t[i];
                                        }
                                        der = new primitivo_1.Primitivo(texto, 1, 1);
                                    }
                                }
                            });
                        }
                    }
                    else if (op === "" && this.identificar('PATH', element)) {
                        //console.log("at " + this.atributo);
                        if (logica.identificador === this.punto && !this.atributo) {
                            let texto = "";
                            for (var i = 0; i < logica.texto.length; i++) {
                                texto += logica.texto[i];
                            }
                            if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                                //console.log(parseInt(texto));
                                izq = new primitivo_1.Primitivo(Number(parseInt(texto)), 1, 1);
                            }
                            else {
                                //console.log(texto);
                                izq = new primitivo_1.Primitivo(texto, 1, 1);
                            }
                        }
                        else {
                            logica.listaAtributos.forEach(atri => {
                                if (atri.identificador === this.punto) {
                                    let valor = atri.valor.slice(1, -1);
                                    //console.log(valor);
                                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                                        izq = new primitivo_1.Primitivo(Number(parseInt(valor)), 1, 1);
                                    }
                                    else {
                                        let texto = valor;
                                        let t = texto.split(" ");
                                        texto = '';
                                        for (var i = 0; i < t.length; i++) {
                                            texto += t[i];
                                        }
                                        izq = new primitivo_1.Primitivo(texto, 1, 1);
                                    }
                                }
                            });
                        }
                    }
                    else if (!(op === "") && this.identificar('PATH', element)) {
                        if (logica.identificador === this.punto && !this.atributo) {
                            //console.log(logica.texto);
                            let texto = "";
                            for (var i = 0; i < logica.texto.length; i++) {
                                texto += logica.texto[i];
                            }
                            if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
                                //console.log(parseInt(texto));
                                der = new primitivo_1.Primitivo(Number(parseInt(texto)), 1, 1);
                            }
                            else {
                                //console.log(texto);
                                der = new primitivo_1.Primitivo(texto, 1, 1);
                            }
                        }
                        else {
                            logica.listaAtributos.forEach(atri => {
                                if (atri.identificador === this.punto) {
                                    let valor = atri.valor.slice(1, -1);
                                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                                        der = new primitivo_1.Primitivo(Number(parseInt(valor)), 1, 1);
                                    }
                                    else {
                                        let texto = valor;
                                        let t = texto.split(" ");
                                        texto = '';
                                        for (var i = 0; i < t.length; i++) {
                                            texto += t[i];
                                        }
                                        der = new primitivo_1.Primitivo(texto, 1, 1);
                                    }
                                }
                            });
                        }
                    }
                }
                else if (typeof element === 'string') {
                    if (!(element === '(') && !(element === ')')) {
                        op = element;
                    }
                }
                if (!izq) {
                    izq = new primitivo_1.Primitivo(Number(-1), 1, 1);
                }
                if (!der) {
                    der = new primitivo_1.Primitivo(Number(-1), 1, 1);
                }
            });
            if (izq && der && !(op === "")) {
                console.log(izq.getValorImplicito(izq) + ',' + der.getValorImplicito(der));
                let a;
                if (op === '<') {
                    a = new relacional_1.Relacion(izq, der, operacion_1.Operador.MENOR_QUE, 1, 1);
                }
                else if (op === '>') {
                    a = new relacional_1.Relacion(izq, der, operacion_1.Operador.MAYOR_QUE, 1, 1);
                }
                else if (op === '<=') {
                    a = new relacional_1.Relacion(izq, der, operacion_1.Operador.MENOR_IGUA_QUE, 1, 1);
                }
                else if (op === '>=') {
                    a = new relacional_1.Relacion(izq, der, operacion_1.Operador.MAYOR_IGUA_QUE, 1, 1);
                }
                else if (op === '=') {
                    a = new relacional_1.Relacion(izq, der, operacion_1.Operador.IGUAL_IGUAL, 1, 1);
                }
                else if (op === '!=') {
                    a = new relacional_1.Relacion(izq, der, operacion_1.Operador.DIFERENTE_QUE, 1, 1);
                }
                else if (op === '!') {
                    a = new relacional_1.Relacion(izq, null, operacion_1.Operador.NOT, 1, 1);
                }
                if (this.posicion) {
                    if (this.posicion[1]) {
                        this.posicion.push(izq.getValorImplicito(izq) - 1);
                        this.posicion.push(op);
                        this.posicion.push(der.getValorImplicito(der) - 1);
                    }
                }
                console.log(a.getValorImplicito(a));
                return a;
            }
        }
    }
    traducir() {
        const generador = Generador_1.Generador.GetInstance();
        let cadena = '';
        let numero = 0;
        let cadaux;
        let tempo;
        generador.Addcomentarioxml('Iniciando apartado de consultas');
        //Se obtiene la posición del puntero Hxpath y se asigna a un nuevo temporal (el cual servirá para el stackxpath)
        tempo = generador.Creartemp();
        cadaux = tempo + ' = Hxpath;\n';
        generador.Addxml(cadaux);
        this.atributoIdentificacion.forEach(element => {
            numero++;
            console.log(element);
            if (!element.atributo) {
                let texto = "";
                for (var i = 0; i < element.cons.texto.length; i++) {
                    if (Number.isInteger(parseInt(element.cons.texto[i]))) {
                        texto += element.cons.texto[i];
                    }
                    else if (Number.isInteger(parseInt(element.cons.texto[i - 1]))) {
                        texto += element.cons.texto[i];
                    }
                    else if (element.cons.texto[i] === '.' || element.cons.texto[i] === '!' || element.cons.texto[i] === '?' || element.cons.texto[i] === ',' || element.cons.texto[i] === "'") {
                        texto += element.cons.texto[i];
                    }
                    else if (element.cons.texto[i - 1] === "'") {
                        texto += element.cons.texto[i];
                    }
                    else {
                        texto += " " + element.cons.texto[i];
                    }
                }
                generador.Addcomentarioxml('Generación resultado: ' + numero);
                generador.Addnumconsulta(numero);
                if (this.nodo_descendente) {
                    /*
                    Se introduce al heapxpath en la posición Hxpath el caracter ascii: <
                    */
                    generador.Addxml(`heapxpath[(int)Hxpath] = ${"<".charCodeAt(0)};`);
                    generador.Addxml('Hxpath = Hxpath + 1;\n');
                    generador.Incphxpath(1);
                    generador.Addcomentarioxml('Agregando ID de la etiqueta');
                    /*
                    Se introduce el elemento.cons.identificador
                    */
                    this.Concat_id_ET(element.cons.identificador, element.cons.linea, element.cons.columna);
                    if (element.cons.listaAtributos.length > 0) {
                        generador.Addcomentarioxml('Agregando atributos de la etiqueta');
                        element.cons.listaAtributos.forEach(atributos => {
                            /*
                            Se introduce al heapxpath en la posición Hxpath el caracter ascii:  ' '
                            */
                            generador.Addxml(`heapxpath[(int)Hxpath] = ${" ".charCodeAt(0)};`);
                            generador.Addxml('Hxpath = Hxpath + 1;\n');
                            generador.Incphxpath(1);
                            generador.Addcomentarioxml('Atributo');
                            /*
                            Se introduce atributos.identificador
                            */
                            this.Concat_id_ET(atributos.identificador, atributos.linea, atributos.columna);
                            /*
                            Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '='
                            */
                            generador.Addxml(`heapxpath[(int)Hxpath] = ${"=".charCodeAt(0)};`);
                            generador.Addxml('Hxpath = Hxpath + 1;');
                            generador.Incphxpath(1);
                            /*
                            Se introduce atributos.valor, se le envía el ID
                            */
                            this.Concat_id_Atrib(atributos.identificador, atributos.linea, atributos.columna);
                        });
                    }
                    if (element.cons.doble) {
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '>'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                    else {
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '/'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"/".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '>'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                    if (texto != '') {
                        //Verificar si se puede aplicar el encode
                        //cadena += this.encode(texto) +  '\n';
                        /*
                        Se introduce element.identificador para obtener el texto
                        */
                        this.Concat_id_text(element.cons.identificador, element.cons.linea, element.cons.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii: '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                    }
                    if (element.cons.listaObjetos.length > 0) {
                        this.traducirRecursiva(element.cons.listaObjetos);
                    }
                    if (element.cons.doble) {
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  <
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"<".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii: '/'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"/".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce el elemento.cons.identificador
                        */
                        this.Concat_id_ET(element.cons.identificador, element.cons.linea, element.cons.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '>'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                    if (element.cons.listaObjetos.length > 0) {
                        this.traducirRecursiva(element.cons.listaObjetos);
                    }
                }
                else if (this.atributo_nodo) {
                    if (element.cons.listaAtributos.length > 0) {
                        generador.Addcomentarioxml('Agregando atributos de la etiqueta');
                        element.cons.listaAtributos.forEach(atributos => {
                            /*
                            Se introduce al heapxpath en la posición Hxpath el caracter ascii:  ' '
                            */
                            generador.Addxml(`heapxpath[(int)Hxpath] = ${" ".charCodeAt(0)};`);
                            generador.Addxml('Hxpath = Hxpath + 1;\n');
                            generador.Incphxpath(1);
                            generador.Addcomentarioxml('Atributo');
                            /*
                            Se introduce atributos.identificador
                            */
                            this.Concat_id_ET(atributos.identificador, atributos.linea, atributos.columna);
                            /*
                            Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '='
                            */
                            generador.Addxml(`heapxpath[(int)Hxpath] = ${"=".charCodeAt(0)};`);
                            generador.Addxml('Hxpath = Hxpath + 1;');
                            generador.Incphxpath(1);
                            /*
                            Se introduce atributos.valor, se le envía el ID
                            */
                            this.Concat_id_Atrib(atributos.identificador, atributos.linea, atributos.columna);
                            /*
                            Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                            */
                            generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                            generador.Addxml('Hxpath = Hxpath + 1;');
                            generador.Incphxpath(1);
                        });
                    }
                }
                else if (this.node_desc) {
                }
                else if (this.node_texto) {
                }
                else {
                    /*
                    Se introduce al heapxpath en la posición Hxpath el caracter ascii: <
                    */
                    generador.Addxml(`heapxpath[(int)Hxpath] = ${"<".charCodeAt(0)};`);
                    generador.Addxml('Hxpath = Hxpath + 1;\n');
                    generador.Incphxpath(1);
                    generador.Addcomentarioxml('Agregando ID de la etiqueta');
                    /*
                    Se introduce el elemento.cons.identificador
                    */
                    this.Concat_id_ET(element.cons.identificador, element.cons.linea, element.cons.columna);
                    if (element.cons.listaAtributos.length > 0) {
                        generador.Addcomentarioxml('Agregando atributos de la etiqueta');
                        element.cons.listaAtributos.forEach(atributos => {
                            /*
                            Se introduce al heapxpath en la posición Hxpath el caracter ascii:  ' '
                            */
                            generador.Addxml(`heapxpath[(int)Hxpath] = ${" ".charCodeAt(0)};`);
                            generador.Addxml('Hxpath = Hxpath + 1;\n');
                            generador.Incphxpath(1);
                            generador.Addcomentarioxml('Atributo');
                            /*
                            Se introduce atributos.identificador
                            */
                            this.Concat_id_ET(atributos.identificador, atributos.linea, atributos.columna);
                            /*
                            Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '='
                            */
                            generador.Addxml(`heapxpath[(int)Hxpath] = ${"=".charCodeAt(0)};`);
                            generador.Addxml('Hxpath = Hxpath + 1;');
                            generador.Incphxpath(1);
                            /*
                            Se introduce atributos.valor, se le envía el ID
                            */
                            this.Concat_id_Atrib(atributos.identificador, atributos.linea, atributos.columna);
                        });
                    }
                    if (element.cons.doble) {
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '>'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                    else {
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '/'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"/".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '>'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                    if (texto != '') {
                        //Verificar si se puede aplicar el encode
                        //cadena += this.encode(texto) +  '\n';
                        /*
                        Se introduce element.identificador para obtener el texto
                        */
                        this.Concat_id_text(element.cons.identificador, element.cons.linea, element.cons.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii: '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                    }
                    if (element.cons.listaObjetos.length > 0) {
                        this.traducirRecursiva(element.cons.listaObjetos);
                    }
                    if (element.cons.doble) {
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  <
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"<".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii: '/'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"/".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce el elemento.cons.identificador
                        */
                        this.Concat_id_ET(element.cons.identificador, element.cons.linea, element.cons.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '>'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                }
            }
            else {
                generador.Addcomentarioxml('Generación resultado: ' + numero);
                generador.Addnumconsulta(numero);
                element.cons.listaAtributos.forEach(atributo => {
                    generador.Addcomentarioxml('Atributo');
                    if (element.texto === atributo.identificador) {
                        /*
                        Se introduce atributos.identificador
                        */
                        this.Concat_id_ET(atributo.identificador, atributo.linea, atributo.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '='
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"=".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce atributos.valor, se le envía el ID
                        */
                        this.Concat_id_Atrib(atributo.identificador, atributo.linea, atributo.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                    else if (this.atributo_nodo_descendiente) {
                        /*
                        Se introduce atributos.identificador
                        */
                        this.Concat_id_ET(atributo.identificador, atributo.linea, atributo.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '='
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"=".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;');
                        generador.Incphxpath(1);
                        /*
                        Se introduce atributos.valor, se le envía el ID
                        */
                        this.Concat_id_Atrib(atributo.identificador, atributo.linea, atributo.columna);
                        /*
                        Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                        */
                        generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                        generador.Addxml('Hxpath = Hxpath + 1;\n');
                        generador.Incphxpath(1);
                    }
                });
            }
        });
        //Al finalizar la cadena se introduce un -1 para indicar final
        generador.Addxml(`heapxpath[(int)Hxpath] = -1;`);
        generador.Addxml('Hxpath = Hxpath + 1;\n');
        generador.Incphxpath(1);
        generador.Addcomentarioxml('Se agrega la posición de inicio del heapxpath en el stackxpath');
        //Se referencia al stackxpath el inicio del heapxpath
        let st = generador.GetStackposxpath();
        generador.Addxml(`stackxpath[(int)${st}] = ${tempo};\n`);
        //Se incrementa el stackxpath
        generador.Incpsxpath(1);
    }
    traducirRecursiva(elemento) {
        //Instancia del generador
        const generador = Generador_1.Generador.GetInstance();
        elemento.forEach(element => {
            let texto = "";
            for (var i = 0; i < element.texto.length; i++) {
                if (Number.isInteger(parseInt(element.texto[i]))) {
                    texto += element.texto[i];
                }
                else if (Number.isInteger(parseInt(element.texto[i - 1]))) {
                    texto += element.texto[i];
                }
                else if (element.texto[i] === '.' || element.texto[i] === '!' || element.texto[i] === '?' || element.texto[i] === ',' || element.texto[i] === "'") {
                    texto += element.texto[i];
                }
                else if (element.texto[i - 1] === "'") {
                    texto += element.texto[i];
                }
                else {
                    texto += " " + element.texto[i];
                }
            }
            /*
            Se introduce al heapxpath en la posición Hxpath el caracter ascii <
            */
            generador.Addxml(`heapxpath[(int)Hxpath] = ${"<".charCodeAt(0)};`);
            generador.Addxml('Hxpath = Hxpath + 1;\n');
            generador.Incphxpath(1);
            /*
            Se introduce el elemento.cons.identificador
            */
            generador.Addcomentarioxml('Agregando ID de la etiqueta');
            this.Concat_id_ET(element.identificador, element.linea, element.columna);
            if (element.listaAtributos.length > 0) {
                generador.Addcomentarioxml('Agregando atributos de la etiqueta');
                element.listaAtributos.forEach(atributos => {
                    /*
                    Se introduce al heapxpath en la posición Hxpath el caracter ascii:  ' '
                    */
                    generador.Addxml(`heapxpath[(int)Hxpath] = ${" ".charCodeAt(0)};`);
                    generador.Addxml('Hxpath = Hxpath + 1;');
                    generador.Incphxpath(1);
                    generador.Addcomentarioxml('Atributo');
                    /*
                    Se introduce atributos.identificador
                    */
                    this.Concat_id_ET(atributos.identificador, atributos.linea, atributos.columna);
                    /*
                    Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '='
                    */
                    generador.Addxml(`heapxpath[(int)Hxpath] = ${"=".charCodeAt(0)};`);
                    generador.Addxml('Hxpath = Hxpath + 1;');
                    generador.Incphxpath(1);
                    /*
                    Se introduce atributos.valor, se le envía el ID
                    */
                    this.Concat_id_Atrib(atributos.identificador, atributos.linea, atributos.columna);
                });
            }
            if (element.doble) {
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii: '>'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii: '\n'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;\n');
                generador.Incphxpath(1);
            }
            else {
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '/'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${"/".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '>'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii:  '\n'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
            }
            if (texto != '') {
                //Verificar si se puede aplicar el encode
                //cadena += this.encode(texto) +  '\n';
                /*
                Se introduce atributos.identificador
                */
                this.Concat_id_text(element.identificador, element.linea, element.columna);
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii: '\n'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                //Se incrementa el registro Hxpath
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
            }
            if (element.listaObjetos.length > 0) {
                this.traducirRecursiva(element.listaObjetos);
            }
            if (element.doble) {
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii: <
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${"<".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii: '/'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${"/".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
                /*
                Se introduce el element.identificador
                */
                this.Concat_id_ET(element.identificador, element.linea, element.columna);
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii: '>'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${">".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
                /*
                Se introduce al heapxpath en la posición Hxpath el caracter ascii: '\n'
                */
                generador.Addxml(`heapxpath[(int)Hxpath] = ${"\n".charCodeAt(0)};`);
                generador.Addxml('Hxpath = Hxpath + 1;');
                generador.Incphxpath(1);
            }
        });
    }
    encode(texto) {
        var buf = new Buffer(texto);
        var buf2 = 'ay :(';
        //console.log(JSON.stringify(this.prologoXml))
        if (JSON.stringify(this.prologoXml).includes("UTF-8")) {
            //console.log(buf.toString("utf8"))
            buf2 = (buf.toString("utf8"));
        }
        else if (JSON.stringify(this.prologoXml).includes("ISO-8859-1")) {
            try {
                buf2 = unescape(encodeURIComponent(texto));
            }
            catch (error) {
                buf2 = '(ISO falló) ' + texto;
            }
        }
        else if (JSON.stringify(this.prologoXml).includes("ASCII")) {
            //console.log(buf.toString("ascii"))
            buf2 = (buf.toString("ascii"));
        }
        return buf2;
    }
    stringToBytes(text) {
        const length = text.length;
        const result = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            const code = text.charCodeAt(i);
            const byte = code > 255 ? 32 : code;
            result[i] = byte;
        }
        return result;
    }
    validarError(error) {
        const json = JSON.stringify(error);
        const objeto = JSON.parse(json);
        console.log(objeto);
    }
    Getid_etiqueta(atrib, linea, columna) {
        //elem[0] = identificador, elem[4] = linea, elem[5] = columna
        //Se compara con todos los valores por si viene un dato con el mismo ID
        let val = "";
        this.ts.tabla.forEach(element => {
            if (element[0] === atrib && element[4] === linea && element[5] === columna) {
                val = element[7];
            }
        });
        return val;
    }
    Concat_id_ET(val, linea, columna) {
        const generador = Generador_1.Generador.GetInstance();
        let id;
        let tempo;
        let tempocomp;
        let cadaux;
        let etinicio;
        let ettrue;
        let etfalse;
        //Se obtiene la posición en el stack de la tabla de símbolos
        id = this.Getid_etiqueta(val, linea, columna);
        //Se crea un temporal y se le asigna el valor que tiene el stack en la posición id (referencia al heap)
        tempo = generador.Creartemp();
        cadaux = `${tempo} = stack[(int)${id}];`;
        generador.Addxml(cadaux);
        //Etiquetas
        etinicio = generador.Crearetiqueta();
        ettrue = generador.Crearetiqueta();
        etfalse = generador.Crearetiqueta();
        //Etiqueta inicial
        cadaux = etinicio + ':';
        generador.Addxml(cadaux);
        //Validación obteniendo el valor que hay en el heap (-1 = fin de cadena)
        tempocomp = generador.Creartemp();
        cadaux = `${tempocomp} = heap[(int)${tempo}];`;
        generador.Addxml(cadaux);
        cadaux = `if(${tempocomp} != -1) goto ${ettrue};`;
        generador.Addxml(cadaux);
        cadaux = `goto ${etfalse};`;
        generador.Addxml(cadaux);
        //Etiqueta true e instrucciones
        cadaux = ettrue + ':';
        generador.Addxml(cadaux);
        generador.Addxml(`heapxpath[(int)Hxpath] = ${tempocomp};`);
        generador.Addxml('Hxpath = Hxpath + 1;');
        generador.Incphxpath(1);
        generador.Addxml(`${tempo} = ${tempo} + 1;`);
        generador.Addxml(`goto ${etinicio};`);
        //Etiqueta false
        generador.Addxml(`${etfalse}:`);
        generador.Addcomentarioxml('Fin ciclo');
        generador.Addxml('');
    }
    Concat_id_Atrib(val, linea, columna) {
        const generador = Generador_1.Generador.GetInstance();
        let id;
        let tempo;
        let tempocomp;
        let cadaux;
        let etinicio;
        let ettrue;
        let etfalse;
        //Se obtiene la posición en el stack de la tabla de símbolos
        id = this.Getid_etiqueta(val, linea, columna);
        //Los valores del atributo están una posición arriba
        id = id + 1;
        //Se crea un temporal y se le asigna el valor que tiene el stack en la posición id (referencia al heap)
        tempo = generador.Creartemp();
        cadaux = `${tempo} = stack[(int)${id}];\n`;
        generador.Addxml(cadaux);
        generador.Addcomentarioxml('Ciclo para guardar el valor del atributo');
        //Etiquetas
        etinicio = generador.Crearetiqueta();
        ettrue = generador.Crearetiqueta();
        etfalse = generador.Crearetiqueta();
        //Etiqueta inicial
        cadaux = etinicio + ':';
        generador.Addxml(cadaux);
        //Validación obteniendo el valor que hay en el heap
        tempocomp = generador.Creartemp();
        cadaux = `${tempocomp} = heap[(int)${tempo}];`;
        generador.Addxml(cadaux);
        cadaux = `if(${tempocomp} != -1) goto ${ettrue};`;
        generador.Addxml(cadaux);
        cadaux = `goto ${etfalse};`;
        generador.Addxml(cadaux);
        //Etiqueta true e instrucciones
        cadaux = ettrue + ':';
        generador.Addxml(cadaux);
        generador.Addxml(`heapxpath[(int)Hxpath] = ${tempocomp};`);
        generador.Addxml('Hxpath = Hxpath + 1;');
        generador.Incphxpath(1);
        generador.Addxml(`${tempo} = ${tempo} + 1;`);
        generador.Addxml(`goto ${etinicio};`);
        //Etiqueta false
        generador.Addxml(`${etfalse}:`);
        generador.Addcomentarioxml('Fin ciclo');
        generador.Addxml('');
    }
    Concat_id_text(val, linea, columna) {
        const generador = Generador_1.Generador.GetInstance();
        let id;
        let tempo;
        let tempocomp;
        let cadaux;
        let etinicio;
        let ettrue;
        let etfalse;
        //Se obtiene la posición en el stack de la tabla de símbolos
        id = this.Getid_etiqueta(val, linea, columna);
        //Los valores del atributo están una posición arriba
        id = id + 1;
        //Se crea un temporal y se le asigna el valor que tiene el stack en la posición id (referencia al heap)
        tempo = generador.Creartemp();
        cadaux = `${tempo} = stack[(int)${id}];\n`;
        generador.Addxml(cadaux);
        generador.Addcomentarioxml('Ciclo para enviar datos del heap al heapxpath');
        //Etiquetas
        etinicio = generador.Crearetiqueta();
        ettrue = generador.Crearetiqueta();
        etfalse = generador.Crearetiqueta();
        //Etiqueta inicial
        cadaux = etinicio + ':';
        generador.Addxml(cadaux);
        //Validación obteniendo el valor que hay en el heap
        tempocomp = generador.Creartemp();
        cadaux = `${tempocomp} = heap[(int)${tempo}];`;
        generador.Addxml(cadaux);
        cadaux = `if(${tempocomp} != -1) goto ${ettrue};`;
        generador.Addxml(cadaux);
        cadaux = `goto ${etfalse};`;
        generador.Addxml(cadaux);
        //Etiqueta true e instrucciones
        cadaux = ettrue + ':';
        generador.Addxml(cadaux);
        generador.Addxml(`heapxpath[(int)Hxpath] = ${tempocomp};`);
        generador.Addxml('Hxpath = Hxpath + 1;');
        generador.Incphxpath(1);
        generador.Addxml(`${tempo} = ${tempo} + 1;`);
        generador.Addxml(`goto ${etinicio};`);
        //Etiqueta false
        generador.Addxml(`${etfalse}:`);
        generador.Addcomentarioxml('Fin ciclo');
        generador.Addxml('');
    }
}
exports.Traduccion = Traduccion;
/*
Estructura C:
 -> HEADER
 -> DECLARACIONES INICIALES
    ->LISTA DE TEMPORALES
    ->LISTA DE FUNCIONES NATIVAS
 -> MAIN
    ->CODIGO X
    ->RETURN
 */ 
