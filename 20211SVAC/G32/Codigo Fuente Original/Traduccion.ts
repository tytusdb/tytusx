import { Objeto } from "./abstractas/objeto";
import { Error } from "./arbol/error";
import { Errores } from "./arbol/errores";
import { XmlTS } from "./arbol/xmlTS";
import { Operacion, Operador } from "./expresiones/operacion";
import { Primitivo } from "./expresiones/primitivo";
import { Relacion } from "./expresiones/relacional";
import { Retorno } from "./expresiones/retorno";
import { Tipo } from "./expresiones/tipo";
import { Variable } from "./expresiones/variable";
import { Expresion } from "./Interfaces/Expresion";
import { Instruccion } from "./interfaces/instruccion";
import {funcion_nativa} from "./expresiones/funcion_nativa";
import { Generador } from "./Generador/Generador";
import { ListaEntornos } from "./interfaces/listaEntornos";
import { llamfuc } from "./expresiones/llamFunc";
import { If_Else } from "./expresiones/if_else";
import { identificador } from "./expresiones/identificador";
import { Arreglo } from "./expresiones/arreglo";
import { Aritmeticas } from "./expresiones/aritmeticas";
import { nuevaFuncion } from "./expresiones/nuevaFuncion";
import { Mostrar } from "./expresiones/mostrar";
import { letEXP } from "./expresiones/letEXP";
import { TablaS } from "./Generador/TablaS";

export class Traduccion {
    //Tabla de símbolos
    ts: XmlTS;
    //Tabla auxiliar
    tsaux: TablaS;
    //Cadena principal
    cadena:String;
    //Control de errores
    Unerror: boolean;
    caderror: String;

    //Variables para el manejo xpath
    prologoXml: JSON;
    cuerpoXml: Array<Objeto>;
    raiz: Object;
    contador: number;
    dot: string;

    //Variables para el control de recorrido
    esRaiz: boolean;
    descendiente: boolean;
    atributo: boolean;
    atributoTexto: string;
    atributoIdentificacion: any[];
    indiceValor: number;
    punto: string;
    posicion: any[];
    nodo_descendente: boolean; //  -> //*
    atributo_nodo: boolean;   // -> /@*
    atributo_nodo_descendiente: boolean;
    ej_child: boolean;  //::child
    ej_attrib: boolean; //::attribute
    node_texto: boolean; // -> /node()
    node_desc: boolean; // -> //node()
    atributo_desc: boolean;

    //Auxiliar de consulta
    consultaXML: Array<Objeto>;
    pathh: Array<Objeto>;
    pathhCount: number;

    ejecXQuery: string;
    f_nativa_upper:boolean;
    f_nativa_lower: boolean;

    constructor(tablasim: XmlTS)
    {
        this.ts = tablasim;
        this.cadena = "";
        this.Unerror = false;
        this.caderror = "";
    }

    Traducir(): String 
    {
        //Instancia del generador y limpieza de variables
        const generador = Generador.GetInstance();
        generador.ResetGenerador();
            
        //Arreglar tabla de símbolos y crear heap y stack
        this.Crearestructuras();

        //Formular código
        this.Crearcadena();
        
        return this.cadena;
    }

    Crearestructuras()
    {
        //Recuperar instancia del generador
        const generador = Generador.GetInstance();

        //Cadena auxiliar
        let cadena: string;
        let tempo: string;

        //Se recorre cada elemento de la tabla
        this.ts.tabla.forEach(element => {
            //elem[0] = identificador, elem[1] = valor, elem[7] = direccion

            //El guardado depende de si tienen valor o no
            if(element[1] == "")
            {
                //Con valor únicamente se almacena el id de la etiqueta
                generador.Addcomentarioxml('Agregando un nuevo elemento sin valores');

                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);

                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadid = element[0];
                for(let i = 0; i<cadid.length; i++)
                {
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
                let st: number = generador.GetStackpos();
                generador.Addxml(`stack[(int)${st}] = ${tempo};\n`);

                //Se incrementa el stack
                generador.Incps(1);

                //Se guarda la dirección en la tabla de símbolos
                element[7] = st;
            }
            else
            {
                //Con más de un valor se almacena el id y luego el valor
                generador.Addcomentarioxml('Agregando un nuevo elemento con valores');

                generador.Addcomentarioxml('Almacenando el identificador');

                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);

                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadid = element[0];
                for(let i = 0; i<cadid.length; i++)
                {
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
                let st: number = generador.GetStackpos();
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
                for(let i = 0; i<cadval.length; i++)
                {
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

    Crearcadena()
    {
        //Recuperar instancia del generador
        const generador = Generador.GetInstance();

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

    TraducirXpath(prologo: JSON, cuerpo: Array<Objeto>, raiz: Object): String
    {
        this.prologoXml = prologo;
        this.cuerpoXml = cuerpo;
        Object.assign(this, { raiz, contador: 0, dot: '' });

        const generador = Generador.GetInstance();
        generador.ResetGenerador();
            
        //Arreglar tabla de símbolos y crear heap y stack
        this.Crearestructuras();

        //Crear codigo de consulta
        this.recorrer();

        //Se agregan funciones si no hay errores
        if(this.Unerror == false)
        {
          generador.Printf();   
        }     

        //Formular código
        this.Crearcadenaxpath();
        
        return this.cadena;
    }

    Crearcadenaxpath()
    {
        //Recuperar instancia del generador
        const generador = Generador.GetInstance();

        //Se agrega primero el header
        generador.Addcomentario('Inicio del código generado');
        generador.Addcodigo('#include <stdio.h>\n');
        generador.Addcodigo('double heap[30101999];');        
        generador.Addcodigo('double stack[30101999];');
        generador.Addcodigo('double heapxpath[30101999];');
        generador.Addcodigo('double stackxpath[30101999];');
        generador.Addcodigo('double S;');
        generador.Addcodigo('double H;');
        generador.Addcodigo('double Sxpath;')
        generador.Addcodigo('double Hxpath;\n')

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

    TraducirXquery(prologo:JSON, cuerpo: Array<Objeto>, raiz: Object): String
    {
      this.prologoXml = prologo;
      this.cuerpoXml = cuerpo;
      Object.assign(this, { raiz, contador: 0, dot: '' });

      const generador = Generador.GetInstance();
      generador.ResetGenerador();
          
      //Arreglar tabla de símbolos y crear heap y stack
      this.Crearestructuras();

      //Crear codigo de consulta
      this.recorrer();

      //Se agregan funciones si no hay errores
      if(this.Unerror == false)
      {
        generador.Printf();   
      }     

      //Formular código
      this.Crearcadenaxquery();
      
      return this.cadena;
    }

    Crearcadenaxquery()
    {
      //Recuperar instancia del generador
      const generador = Generador.GetInstance();

      //Se agrega primero el header
      generador.Addcomentario('Inicio del código generado');
      generador.Addcodigo('#include <stdio.h>\n');
      generador.Addcodigo('double heap[30101999];');        
      generador.Addcodigo('double stack[30101999];');
      generador.Addcodigo('double heapxpath[30101999];');
      generador.Addcodigo('double stackxpath[30101999];');
      generador.Addcodigo('double heapxquery[30101999];');
      generador.Addcodigo('double stackxquery[30101999];');
      generador.Addcodigo('double S;');
      generador.Addcodigo('double H;');
      generador.Addcodigo('double Sxpath;')
      generador.Addcodigo('double Hxpath;')
      generador.Addcodigo('double Sxquery;')
      generador.Addcodigo('double Hxquery;\n')

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
      generador.Addcodigoidentado('Hxpath = 0;');
      generador.Addcodigoidentado('Sxquery = 0;');
      generador.Addcodigoidentado('Hxquery = 0;\n');

      generador.Joincodxml();
      generador.Joincodxq();

      //Se agrega el final del main
      generador.Addcodigoidentado(`return 0; \n}\n`);

      //Retorno del código
      this.cadena = generador.GetCodigo();
    }

    identificar(etiqueta: string, nodo: any): boolean {
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
      const generador = Generador.GetInstance();

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
        this.f_nativa_upper = false;
        this.f_nativa_lower = false;
        this.tsaux = new TablaS();

        try {
          if (this.raiz instanceof Object) {
            if (this.identificar('XQUERY', this.raiz)) {
              this.xqueryEjec();
              this.recorrido(this.raiz);
              if(!(this.atributoIdentificacion.length > 0)){
                //return this.ejecXQuery;
              }
              else
              {
                /*return this.ejecXQuery + '\n' + this.traducir();*/
                this.traducir(); 
              }              
            }
            else
            {              
              this.recorrido(this.raiz);

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
          }
        } catch (error) {
          generador.Addcomentarioxml('No se encontró por algún error en la consulta :(');
          this.Unerror = true;
          this.caderror = "No se encontró por algún error en la consulta";
          generador.Addxml(`printf("${this.caderror}");`);
        }    
      }
      else{
        generador.Addcomentarioxml('No se pudo generar C3D del Xpath');
        this.Unerror = true;
        this.caderror = "No se pudo generar C3D del Xpath :(";
        generador.Addxml(`printf("${this.caderror}");`);
      }
    }

    recorrido(nodo: any): void {
        if (nodo instanceof Object){
            if (this.identificar('S', nodo)) {
                this.recorrido(nodo.hijos[0]);
            }

            if (this.identificar('INSTRUCCIONES', nodo)) {
                nodo.hijos.forEach((element: any) => {
                  if (element instanceof Object) {
                    this.recorrido(element);
                  }
                  else if (typeof element === 'string') {
                    if (element === '|') {
                      this.consultaXML.forEach(element => {
                        this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto })
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
                  this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto })
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
                nodo.hijos.forEach((element: any) => {
                  if (element instanceof Object) {
                    this.recorrido(element);
                  }
                  else if (typeof element === 'string') {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                  }
                });
            }
    
            if (this.identificar('DESCENDIENTES_NODO', nodo)) {
                nodo.hijos.forEach((element: any) => {
                  if (element instanceof Object) {
                    this.recorrido(element);
                  }
                  else if (typeof element === 'string') {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'DESCENDIENTES_NODO');
                  }
                });
            }

            if (this.identificar('PADRE', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  this.consultaXML = this.reducir(this.consultaXML, element, 'PADRE');
                }
              });
            }

            if (this.identificar('ATRIBUTO_PREDICADO', nodo)) {
              nodo.hijos.forEach((element: any) => {
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
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string' && element === 'last') {
                  let cons: Array<Objeto>;
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
                let val: Expresion = null;
                val = this.calcular(nodo, null, 0);
                this.consultaXML = this.reducir(this.consultaXML, val.getValorImplicito(val), 'INSTRUCCIONES');
              }
            }

            if (this.identificar('RELACIONALES', nodo)) {
              let val: Expresion = null;
              let cons: Array<Objeto> = [];
              let es: string = '';
      
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  if (this.identificar('ATRIBUTO_PREDICADO', element)) {
                    es = 'es@';
                  }
                  else if (this.identificar('id', element)) {
                    es = 'esID';
                  }
                  else if (this.identificar('punto', element)) {
                    es = 'esPunto';
                  }
                  else if (this.identificar('PATH', element)) {
                    es = 'esPath';
                    this.pathh = this.consultaXML;
                    this.pathhCount = 0;
                    this.path(element);
                  }
                  else if (this.identificar('ORDEN', element)) {
                    es = 'esOrden';
                    this.posicion = [];
                  }
                }
              });
      
              if (es === 'esPath') {
                this.pathh.forEach((element, index) => {
                  if (this.atributo) {
                    if (element.listaAtributos.length > 0) {
                      val = this.calcular(nodo, element, index);
                      if (val.getValorImplicito(val)) {
                        console.log(element);
                        cons.push(element);
                      }
                    }
                  }
                  else {
                    if (element) {
                      val = this.calcular(nodo, element, index);
                      if (val.getValorImplicito(val)) {
                        cons.push(element);
                      }
                    }
                  }
                });
                this.atributo = false;
                this.pathh = [];
                for (let index = 0; index < this.pathhCount; index++) {
                  cons.forEach(element => {
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
                }
                if (cons.length > 0) {
                  this.consultaXML.forEach((element) => {
                    cons.forEach(y => {
                      if (element.identificador === y.identificador && element.linea === y.linea && element.columna === y.columna) {
                        this.pathh.push(element);
                      }
                      else if (y.listaObjetos.length > 0) {
                        y.listaObjetos.forEach(yy => {
                          if (element.identificador === yy.identificador && element.linea === yy.linea && element.columna === yy.columna) {
                            this.pathh.push(element);
                          }
                        });
                      }
                    });
                  });
                }
                cons = this.pathh;
              }
              else
                this.consultaXML.forEach((element, index) => {
                  if (es === 'es@') {
                    if (element.listaAtributos.length > 0) {
                      val = this.calcular(nodo, element, index);
                      if (val.getValorImplicito(val)) {
                        cons.push(element);
                      }
                    }
                  }
                  else if (es === 'esID') {
                    //console.log("entró esID");
                    if (element.listaObjetos.length > 0) {
                      val = this.calcular(nodo, element, index);
                      if (val.getValorImplicito(val)) {
                        cons.push(element);
                      }
                    }
                  }
                  else if (es === "esPunto") {
                    if (this.atributo) {
                      if (element.listaAtributos.length > 0) {
                        val = this.calcular(nodo, element, index);
                        if (val.getValorImplicito(val)) {
                          cons.push(element);
                        }
                      }
                    }
                    else {
                      if (element) {
                        val = this.calcular(nodo, element, index);
                        if (val.getValorImplicito(val)) {
                          cons.push(element);
                        }
                      }
                    }
                  }
                  else if (es === 'esOrden') {
                    try {
                      if (es === 'esOrden') {
                        val = this.calcular(nodo, element, index);
                        if (this.posicion[1]) {
                          console.log("es posicion ", this.posicion)
                          switch (this.posicion[4]) {
                            case '<':
                              if (this.posicion[2] === 'izq') {
                                if (index === this.posicion[0] && this.posicion[3] < this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              else {
                                if (index === this.posicion[0] && this.posicion[3] > this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              break;
                            case '>':
                              if (this.posicion[2] === 'izq') {
                                if (index === this.posicion[0] && this.posicion[3] > this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              else {
                                if (index === this.posicion[0] && this.posicion[3] < this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              break;
                            case '<=':
                              if (this.posicion[2] === 'izq') {
                                if (index === this.posicion[0] && this.posicion[3] <= this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              else {
                                if (index === this.posicion[0] && this.posicion[3] >= this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              break;
                            case '>=':
                              if (this.posicion[2] === 'izq') {
                                if (index === this.posicion[0] && this.posicion[3] >= this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              else {
                                if (index === this.posicion[0] && this.posicion[3] <= this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              break;
                            case '=':
                              if (this.posicion[2] === 'izq') {
                                if (index === this.posicion[0] && this.posicion[3] === this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              else {
                                if (index === this.posicion[0] && this.posicion[3] === this.posicion[5]) {
                                  cons.push(element)
                                }
                              }
                              break;
                            case '!=':
                              if (this.posicion[2] === 'izq') {
                                if (index === this.posicion[0] && !(this.posicion[3] === this.posicion[5])) {
                                  cons.push(element)
                                }
                              }
                              else {
                                if (index === this.posicion[0] && !(this.posicion[3] === this.posicion[5])) {
                                  cons.push(element)
                                }
                              }
                              break;
                            default:
                              break;
                          }
                        }
                        this.posicion = [];
                      }
                    } catch (error) {
      
                    }
                  }
                });
              console.log(cons.length, cons)
              if (cons.length > 0) {
                this.consultaXML = cons;
                console.log(this.consultaXML)
              }
              else {
                this.consultaXML = [];
                const er = new Error({ tipo: 'Semántico', linea: '0', descripcion: 'No existe ese atributo.' });
                Errores.getInstance().push(er);
              }
            }

            if (this.identificar('HIJOS', nodo)) {
              nodo.hijos.forEach((element: any) => {
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
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  this.consultaXML = this.reducir(this.consultaXML, element, 'ATRIBUTO_NODO');
                }
              });
            }

            if (this.identificar('EJES', nodo)) {
              //Se obtiene el tipo de eje y se activa el bool
              if (nodo.hijos[0] == 'child') {
                this.ej_child = true;
              }
              else if (nodo.hijos[0] == 'attribute') {
                this.ej_attrib = true;
                this.atributo = true;
              }
            }

            if (this.identificar('ATRIBUTO_DESCENDIENTES', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  this.consultaXML = this.reducir(this.consultaXML, element, 'ATRIBUTO_DESCENDIENTES');
                }
              });
            }

            if (this.identificar('NODO_FUNCION', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  this.consultaXML = this.reducir(this.consultaXML, element, 'NODO_FUNCION');
                }
              });
            }

            //Parte de XQUERY

            if (this.identificar('XQUERY', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
      
                }
              });
            }
      
            if (this.identificar('HTML', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
      
                }
              });
            }
      
            if (this.identificar('FOR', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
      
                }
              });
              this.atributoIdentificacion = [];
              this.consultaXML.forEach(element => {
                this.atributoIdentificacion.push({ cons: element, atributo: this.atributo, texto: this.atributoTexto })
              });
              //this.atributoIdentificacion = this.atributoIdentificacion.filter(item => this.consultaXML.includes(item.cons))
            }
      
            if (this.identificar('WHERE', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
      
                }
              });
            }
      
            if (this.identificar('LOGICAS', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
      
                }
              });
            }
      
            if (this.identificar('ORDER BY', nodo)) {
              let regresar: boolean = false;
              let atrib = false;
              let nombre;
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  if (element === '$x') {
                    this.consultaXML;
                  }
                  else if (element === '/') {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                  }
                  else if (element === '@') {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                    atrib = true;
                  }
                  else if (!(element === ',')) {
                    if (atrib) {
                      this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                      this.atributo = false;
                      nombre = element;
                    }
                    else {
                      this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
                      regresar = true;
                    }
                  }
                }
                if (atrib && nombre) {
                  console.log('entra')
                  this.consultaXML.sort((n1, n2) => {
                    let indice1 = 0, indice2 = 0;
                    n1.listaAtributos.forEach((elementLA, indexLA) => {
                      //console.log(elementLA.identificador, indice1)
                      if (elementLA.identificador === nombre) {
                        indice1 = indexLA;
                      }
                    });
                    n2.listaAtributos.forEach((elementLA, indexLA) => {
                      if (elementLA.identificador === nombre) {
                        indice2 = indexLA;
                      }
                    });
                    //console.log(indice1,n1.listaAtributos[indice1].valor,indice2,n2)
                    if (n1.listaAtributos[indice1].valor.slice(1, -1) > n2.listaAtributos[indice2].valor.slice(1, -1)) {
                      return 1;
                    }
      
                    if (n1.listaAtributos[indice1].valor.slice(1, -1) < n2.listaAtributos[indice2].valor.slice(1, -1)) {
                      return -1;
                    }
      
                    return 0;
                  });
                  atrib = false;
                  console.log('sale', this.consultaXML)
                }
                else {
                  this.consultaXML.sort((n1, n2) => {
                    if (n1.texto > n2.texto) {
                      return 1;
                    }
      
                    if (n1.texto < n2.texto) {
                      return -1;
                    }
      
                    return 0;
                  });
                }
                console.log('despues', this.consultaXML)
                if (regresar) {
                  console.log('regresar', regresar, this.consultaXML, element)
                  this.consultaXML = this.reducir(this.consultaXML, '/..', 'PADRE')
                  regresar = false;
                }
              });
            }
      
            if (this.identificar('RETURN', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  if (element === '$x') {
                    this.consultaXML;
                  }
                  else if (element === '/') {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                  }
                  else {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
                  }
                }
              });
            }
      
            if (this.identificar('IF', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  if (element === '$x') {
                    this.consultaXML;
                  }
                  else if (element === '/') {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                  }
                  else {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
                  }
                }
              });
            }
      
            if (this.identificar('THEN', nodo)) {
              nodo.hijos.forEach((element: any) => {
                if (element instanceof Object) {
                  this.recorrido(element);
                }
                else if (typeof element === 'string') {
                  if (element === '$x') {
                    this.consultaXML;
                  }
                  else if (element === '/') {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'RAIZ');
                  }
                  else {
                    this.consultaXML = this.reducir(this.consultaXML, element, 'INSTRUCCIONES');
                  }
                }
              });
            }
        }
    }

    reducir(consulta: Array<Objeto>, etiqueta: string, nodo: string): Array<Objeto> {
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
              let cons: Array<Objeto> = [];
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
              let cons: Array<Objeto> = [];
              consulta.forEach(element => {
                this.ts.tabla.forEach(padre => {
                  if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                    if (element.listaObjetos.length > 0) {
                      cons = cons.concat(element.listaObjetos);
                    } else {
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
              let cons: Array<Objeto> = [];
              consulta.forEach(element => {
                this.ts.tabla.forEach(padre => {
                  if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                    if (element.listaObjetos.length > 0) {
                      //elemento
                    } else {
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
            let cons: Array<Objeto> = [];
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
            let cons: Array<Objeto> = [];
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
            let cons: Array<Objeto> = [];
            consulta.forEach(element => {
              this.ts.tabla.forEach(padre => {
                if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                  if (element.listaObjetos.length > 0) {
                    cons = cons.concat(element.listaObjetos);
                  } else {
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
            let cons: Array<Objeto> = [];
            consulta.forEach(element => {
              this.ts.tabla.forEach(padre => {
                if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                  if (element.listaObjetos.length > 0) {
                    if (element.texto != null) {
                      this.node_texto = true;
                      cons = cons.concat(element.listaObjetos);
                    }
                  } else {
                  }
                }
              });
            });
            return cons;
          }
        }
        else if (nodo === 'INSTRUCCIONES') {
            let cons: Array<Objeto>;
            cons = [];
            //Predicados como [last()-1]
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
            let cons: Array<Objeto> = [];
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
            let cons: Array<Objeto> = [];
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
            let cons: Array<Objeto> = [];
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
            let cons: Array<Objeto> = [];
            consulta.forEach(element => {
              if (element.listaAtributos.length > 0) {
                cons = cons.concat(element);
              }
            });
            this.atributo_nodo = true;
            return cons;
          }
        }
        else if (nodo === 'NODO_FUNCION') {
          //Axes - child::func()
          if (this.ej_child) {
            let cons: Array<Objeto>;
            cons = [];
            if (etiqueta === 'text()') {
              if (!this.esRaiz) {
                //Falta retornar en caso de: //child::text();
                return consulta;
              }
              consulta.forEach(element => {
                this.ts.tabla.forEach(padre => {
                  if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                    //Si el elemento posee más hijos entonces no puede poseer texto adentro
                    if (element.listaObjetos.length > 0) {
                      //No retorna nada
                    } else {
                      //Si no tiene hijos entonces se obtiene el texto
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
          if (etiqueta === 'node()') {
            let cons: Array<Objeto> = [];
            consulta.forEach(element => {
              this.ts.tabla.forEach(padre => {
                if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                  if (element.listaObjetos.length > 0) {
                    cons = cons.concat(element.listaObjetos);
                  } else {
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
            let cons: Array<Objeto> = [];
            consulta.forEach(element => {
              this.ts.tabla.forEach(padre => {
                if (padre[0] === element.identificador && padre[4] === element.linea && padre[5] === element.columna) {
                  if (element.listaObjetos.length > 0) {
                    //elemento
                  } else {
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
        else if (nodo === 'ATRIBUTO_DESCENDIENTES') {
          if (etiqueta === '//@*') {
            let cons: Array<Objeto> = [];
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
        }
    }

    recDescen(a: Array<Objeto>, etiqueta: string, atributo: boolean): Array<Objeto> {
        let cons: Array<Objeto> = [];
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

    path(nodo: any): void {
      let cons: Array<Objeto> = this.pathh;
      //console.log('entra');
      if (this.identificar('PATH', nodo)) {
        nodo.hijos.forEach((element: any, index) => {
          if (element instanceof Object) {
            if (element.label === 'PATH') {
              this.path(element);
            }
            else if (element.label === 'ATRIBUTO_PREDICADO') {
              cons = this.reducir(cons, element.hijos[0], 'RAIZ');
              cons = this.reducir(cons, element.hijos[1], 'RAIZ');
              this.pathh = cons;
              this.pathhCount--;
              //console.log('/@identificador ', this.pathh);
            }
            else if (element.label === 'id') {
              cons = this.reducir(cons, '/', 'RAIZ');
              cons = this.reducir(cons, element.hijos[0], 'INSTRUCCIONES');
              this.pathh = cons;
              if (index === 0)
                this.pathhCount++;
              else
                this.pathhCount++;
              //console.log('id ', this.pathh);
            }
            else if (element.label === 'dos_pts') {
              cons = this.reducir(cons, '/..', 'PADRE');
              this.pathh = cons;
              this.pathhCount--;
              //console.log('padre ', this.pathh);
            }
          }
          else if (typeof element === 'string') {
            //console.log(element);
            if (element === '..') {
              cons = this.reducir(cons, '/..', 'PADRE');
              this.pathh = cons;
              //console.log('padre ', this.pathh);
            }
            else if (element === '/') {
              cons = this.pathh;
              cons = this.reducir(cons, element, 'RAIZ');
              this.pathh = cons;
              this.pathhCount++;
              //console.log('raiz ', this.pathh);
            }
            else {
              cons = this.reducir(cons, element, 'INSTRUCCIONES');
              //console.log('instruccion');
              this.pathh = cons;
            }
          }
        });
      }
    }

    calcular(nodo: any, logica: Objeto, position: number): Expresion {
      if (this.identificar('ARITMETICAS', nodo)) {
        let izq: Expresion, der: Expresion = null;
        let op = "";
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            if (op === "" && this.identificar('integer', element)) {
              izq = new Primitivo(Number(element.hijos[0]), 1, 1);
            }
            else if (!(op === "") && this.identificar('integer', element)) {
              der = new Primitivo(Number(element.hijos[0]), 1, 1);
            }
            else if (op === "" && this.identificar('double', element)) {
              izq = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
            }
            else if (!(op === "") && this.identificar('double', element)) {
              der = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
            }
            else if (op === "" && this.identificar('ARITMETICAS', element)) {
              izq = this.calcular(element, null, position);
            }
            else if (!(op === "") && this.identificar('ARITMETICAS', element)) {
              der = this.calcular(element, null, position);
            }
            else if (op === "" && this.identificar('ORDEN', element)) {
              izq = new Primitivo(Number(this.consultaXML.length), 1, 1);
            }
            else if (!(op === "") && this.identificar('ORDEN', element)) {
              der = new Primitivo(Number(this.consultaXML.length), 1, 1);
            }
          }
          else if (typeof element === 'string') {
            if (!(element === '(') && !(element === ')')) {
              op = element;
            }
          }
        });
        if (izq && der && !(op === "")) {
          let a: Operacion;
          if (op === '+') {
            a = new Operacion(izq, der, Operador.SUMA, 1, 1);
          }
          else if (op === '-') {
            a = new Operacion(izq, der, Operador.RESTA, 1, 1);
          }
          else if (op === '*') {
            a = new Operacion(izq, der, Operador.MULTIPLICACION, 1, 1);
          }
          else if (op === 'div') {
            a = new Operacion(izq, der, Operador.DIVISION, 1, 1);
          }
          else if (op === 'mod') {
            a = new Operacion(izq, der, Operador.MODULO, 1, 1);
          }
          return a;
        }
      }
  
      if (this.identificar('RELACIONALES', nodo)) {
        let izq: Expresion, der: Expresion = null;
        let op = "";
        //console.log("entró relacional")
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            if (op === "" && this.identificar('integer', element)) {
              izq = new Primitivo(Number(element.hijos[0]), 1, 1);
            }
            else if (!(op === "") && this.identificar('integer', element)) {
              der = new Primitivo(Number(element.hijos[0]), 1, 1);
            }
            else if (op === "" && this.identificar('double', element)) {
              izq = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
            }
            else if (!(op === "") && this.identificar('double', element)) {
              der = new Primitivo(Number(parseInt(element.hijos[0])), 1, 1);
            }
            else if (op === "" && this.identificar('string', element)) {
              let texto = element.hijos[0].slice(1, -1);
              let t = texto.split(" ");
              texto = '';
              for (var i = 0; i < t.length; i++) {
                texto += t[i];
              }
              izq = new Primitivo(texto, 1, 1);
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
              der = new Primitivo(texto, 1, 1);
            }
            else if (op === "" && this.identificar('ARITMETICAS', element)) {
              izq = this.calcular(element, logica, position);
            }
            else if (!(op === "") && this.identificar('ARITMETICAS', element)) {
              der = this.calcular(element, logica, position);
            }
            else if (op === "" && this.identificar('ORDEN', element)) {
              if (element.hijos[0] === 'position') {
                izq = new Primitivo(Number(position), 1, 1);
                this.posicion.push(Number(position));
                this.posicion.push(true);
                this.posicion.push("izq");
              }
              else
                izq = new Primitivo(Number(this.consultaXML.length), 1, 1);
            }
            else if (!(op === "") && this.identificar('ORDEN', element)) {
              if (element.hijos[0] === 'position') {
                der = new Primitivo(Number(position), 1, 1);
                this.posicion.push(Number(position));
                this.posicion.push(true);
                this.posicion.push("der");
              }
              else
                der = new Primitivo(Number(this.consultaXML.length), 1, 1);
            }
            else if (op === "" && this.identificar('ATRIBUTO_PREDICADO', element)) {
              logica.listaAtributos.forEach(atri => {
                if (atri.identificador === element.hijos[1]) {
                  let valor = atri.valor.slice(1, -1);
                  if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                    //console.log(parseInt(valor));
                    izq = new Primitivo(Number(parseInt(valor)), 1, 1);
                  }
                  else {
                    let texto = valor;
                    let t = texto.split(" ");
                    texto = '';
                    for (var i = 0; i < t.length; i++) {
                      texto += t[i];
                    }
                    izq = new Primitivo(texto, 1, 1);
                  }
                }
              });
            }
            else if (!(op === "") && this.identificar('ATRIBUTO_PREDICADO', element)) {
              logica.listaAtributos.forEach(atri => {
                if (atri.identificador === element.hijos[1]) {
                  let valor = atri.valor.slice(1, -1);
                  if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                    der = new Primitivo(Number(parseInt(valor)), 1, 1);
                  }
                  else {
                    let texto = valor;
                    let t = texto.split(" ");
                    texto = '';
                    for (var i = 0; i < t.length; i++) {
                      texto += t[i];
                    }
                    der = new Primitivo(texto, 1, 1);
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
                    izq = new Primitivo(Number(parseInt(texto)), 1, 1);
                  }
                  else {
                    //console.log(texto);
                    izq = new Primitivo(texto, 1, 1);
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
                    der = new Primitivo(Number(parseInt(texto)), 1, 1);
                  }
                  else {
                    //console.log(texto);
                    der = new Primitivo(texto, 1, 1);
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
                  izq = new Primitivo(Number(parseInt(texto)), 1, 1);
                }
                else {
                  //console.log(texto);
                  izq = new Primitivo(texto, 1, 1);
                }
              }
              else {
                logica.listaAtributos.forEach(atri => {
                  if (atri.identificador === this.punto) {
                    let valor = atri.valor.slice(1, -1);
                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                      izq = new Primitivo(Number(parseInt(valor)), 1, 1);
                    }
                    else {
                      let texto = valor;
                      let t = texto.split(" ");
                      texto = '';
                      for (var i = 0; i < t.length; i++) {
                        texto += t[i];
                      }
                      izq = new Primitivo(texto, 1, 1);
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
                  der = new Primitivo(Number(parseInt(texto)), 1, 1);
                }
                else {
                  //console.log(texto);
                  der = new Primitivo(texto, 1, 1);
                }
              }
              else {
                logica.listaAtributos.forEach(atri => {
                  if (atri.identificador === this.punto) {
                    let valor = atri.valor.slice(1, -1);
                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                      der = new Primitivo(Number(parseInt(valor)), 1, 1);
                    }
                    else {
                      let texto = valor;
                      let t = texto.split(" ");
                      texto = '';
                      for (var i = 0; i < t.length; i++) {
                        texto += t[i];
                      }
                      der = new Primitivo(texto, 1, 1);
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
                  izq = new Primitivo(Number(parseInt(texto)), 1, 1);
                }
                else {
                  //console.log(texto);
                  izq = new Primitivo(texto, 1, 1);
                }
              }
              else {
                logica.listaAtributos.forEach(atri => {
                  if (atri.identificador === this.punto) {
                    let valor = atri.valor.slice(1, -1);
                    //console.log(valor);
                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                      izq = new Primitivo(Number(parseInt(valor)), 1, 1);
                    }
                    else {
                      let texto = valor;
                      let t = texto.split(" ");
                      texto = '';
                      for (var i = 0; i < t.length; i++) {
                        texto += t[i];
                      }
                      izq = new Primitivo(texto, 1, 1);
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
                  der = new Primitivo(Number(parseInt(texto)), 1, 1);
                }
                else {
                  //console.log(texto);
                  der = new Primitivo(texto, 1, 1);
                }
              }
              else {
                logica.listaAtributos.forEach(atri => {
                  if (atri.identificador === this.punto) {
                    let valor = atri.valor.slice(1, -1);
                    if (Number.isInteger(parseInt(valor)) && !valor.includes("/") && !valor.includes("-")) {
                      der = new Primitivo(Number(parseInt(valor)), 1, 1);
                    }
                    else {
                      let texto = valor;
                      let t = texto.split(" ");
                      texto = '';
                      for (var i = 0; i < t.length; i++) {
                        texto += t[i];
                      }
                      der = new Primitivo(texto, 1, 1);
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
            izq = new Primitivo(Number(-1), 1, 1);
          }
          if (!der) {
            der = new Primitivo(Number(-1), 1, 1);
          }
        });
        if (izq && der && !(op === "")) {
          console.log(izq.getValorImplicito(izq) + ',' + der.getValorImplicito(der));
          let a: Relacion;
          if (op === '<') {
            a = new Relacion(izq, der, Operador.MENOR_QUE, 1, 1);
          }
          else if (op === '>') {
            a = new Relacion(izq, der, Operador.MAYOR_QUE, 1, 1);
          }
          else if (op === '<=') {
            a = new Relacion(izq, der, Operador.MENOR_IGUA_QUE, 1, 1);
          }
          else if (op === '>=') {
            a = new Relacion(izq, der, Operador.MAYOR_IGUA_QUE, 1, 1);
          }
          else if (op === '=') {
            a = new Relacion(izq, der, Operador.IGUAL_IGUAL, 1, 1);
          }
          else if (op === '!=') {
            a = new Relacion(izq, der, Operador.DIFERENTE_QUE, 1, 1);
          }
          else if (op === '!') {
            a = new Relacion(izq, null, Operador.NOT, 1, 1);
          }
          if (this.posicion) {
            if (this.posicion[1]) {
              this.posicion.push(izq.getValorImplicito(izq) - 1);
              this.posicion.push(op);
              this.posicion.push(der.getValorImplicito(der) - 1);
            }
          }
          console.log(a.getValorImplicito(a))
          return a;
        }
      }
    }

    traducir() {
        const generador = Generador.GetInstance();

        let cadena = '';
        let numero: number = 0;
        let cadaux: string;
        let tempo: string;

        generador.Addcomentarioxml('Iniciando apartado de consultas');

        //Se obtiene la posición del puntero Hxpath y se asigna a un nuevo temporal (el cual servirá para el stackxpath)
        tempo = generador.Creartemp();
        cadaux = tempo + ' = Hxpath;\n';
        generador.Addxml(cadaux);

        this.atributoIdentificacion.forEach(element => {
            numero++;
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

                generador.Addcomentarioxml('Generación resultado: '+ numero);
                generador.Addnumconsulta(numero);

                if(this.nodo_descendente){
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

                  if(element.cons.listaAtributos.length > 0) {
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
                  if(element.cons.listaAtributos.length > 0) {
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
                    cadena += this.traducirRecursiva(element.cons.listaObjetos);
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
                }
                else if (this.node_texto) {
                  if (element.texto != null) {
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

                  if(element.cons.listaAtributos.length > 0) {
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
              generador.Addcomentarioxml('Generación resultado: '+ numero);
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
        })

        //Al finalizar la cadena se introduce un -1 para indicar final
        generador.Addxml(`heapxpath[(int)Hxpath] = -1;`);
        generador.Addxml('Hxpath = Hxpath + 1;\n');
        generador.Incphxpath(1);

        generador.Addcomentarioxml('Se agrega la posición de inicio del heapxpath en el stackxpath');

        //Se referencia al stackxpath el inicio del heapxpath
        let st: number = generador.GetStackposxpath();
        generador.Addxml(`stackxpath[(int)${st}] = ${tempo};\n`);

        //Se incrementa el stackxpath
        generador.Incpsxpath(1);
    }

    traducirRecursiva(elemento: Array<Objeto>) {
      //Instancia del generador
      const generador = Generador.GetInstance();
  
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

        if(element.listaAtributos.length > 0) {
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

    enISO: string;
    encode(texto: string): string {
        var buf = new Buffer(texto)
        var buf2 = 'ay :(';
        //console.log(JSON.stringify(this.prologoXml))
        if (JSON.stringify(this.prologoXml).includes("UTF-8")) {
        //console.log(buf.toString("utf8"))
        buf2 = (buf.toString("utf8"))
        }
        else if (JSON.stringify(this.prologoXml).includes("ISO-8859-1")) {
        try {
            buf2 = unescape(encodeURIComponent(texto));

        } catch (error) {
            buf2 = '(ISO falló) ' + texto;
        }
        }
        else if (JSON.stringify(this.prologoXml).includes("ASCII")) {
        //console.log(buf.toString("ascii"))
        buf2 = (buf.toString("ascii"))
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

    Getid_etiqueta(atrib: string, linea: any, columna: any): string
    {
      //elem[0] = identificador, elem[4] = linea, elem[5] = columna
      //Se compara con todos los valores por si viene un dato con el mismo ID
      let val = "";

      this.ts.tabla.forEach(element => {
        if(element[0] === atrib && element[4] === linea && element[5] === columna)
        {
          val = element[7];
        }
      })
      return val;
    }

    Concat_id_ET(val: string, linea: any, columna: any){
      const generador = Generador.GetInstance();

      let id: string;
      let tempo: string;
      let tempocomp: string;
      let cadaux: string;
      let etinicio: string;
      let ettrue: string;
      let etfalse: string;

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

    Concat_id_Atrib(val: string, linea: any, columna: any){
      const generador = Generador.GetInstance();

      let id: string;
      let tempo: string;
      let tempocomp: string;
      let cadaux: string;
      let etinicio: string;
      let ettrue: string;
      let etfalse: string;

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
    Concat_id_text(val: string, linea: any, columna: any){
      const generador = Generador.GetInstance();

      let id: string;
      let tempo: string;
      let tempocomp: string;
      let cadaux: string;
      let etinicio: string;
      let ettrue: string;
      let etfalse: string;

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

    //Vainas de XQUERY

    xqueryEjec(): void {
      ListaEntornos.getInstance().clear();
      //Prerrecorrido para la tabla y funciones
      const pre = this.xqueryPreRec(this.raiz);
      //Recorrido principal
      const instrucciones = this.xqueryRec(this.raiz);
    }

    nomfunc: string = "";
    xqueryPreRec(nodo: any): any {
      //Instancia del generador
      const generador = Generador.GetInstance();

      if (nodo instanceof Object) {
        if (this.identificar('XQUERY', nodo)) {
          let instrucciones = [];
          nodo.hijos.forEach(element => {
            const inst = this.xqueryPreRec(element);
            if (inst instanceof Array) {
              instrucciones = instrucciones.concat(inst);
            }
            else {
              if (this.identificar('F_LLAMADA', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if (this.identificar('LLAMADA_FUNCION', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }
              else if  (this.identificar('F_UPPERCASE', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_NUMBER', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_STRING', element)) { //nativa string
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_LOWERCASE', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_SUBSTRING', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_SUBSTRING1', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }
              else
                instrucciones.push(inst);
            }
          });
          return instrucciones;
        }
  
        if (this.identificar('LET', nodo)) {
          let instrucciones = [];
          if (this.identificar('LET', nodo.hijos[0])) {
            nodo.hijos.forEach(element => {
              const inst = this.xqueryPreRec(element);
              if (inst instanceof Array) {
                instrucciones = instrucciones.concat(inst);
              }
              else {
                instrucciones.push(inst);
              }
            });
          }
          else {
            if (this.identificar('EXPR', nodo.hijos[2])) {
              // ID = PATH
              if(this.identificar('PATH', nodo.hijos[2].hijos[0])){
                let val = this.xqueryPreRec(nodo.hijos[2].hijos[0]);
                instrucciones.push(new letEXP(nodo.linea, nodo.hijos[0], val));
                //Introducción a la tabla y modificación de tamaño
                this.tsaux.agregar(nodo.hijos[0], null, this.nomfunc, null, 'Variablelocal', 1, null);
                this.tsaux.mod_size(this.nomfunc, 1);
              }
              //ID = EXPR
              else{
                let val = this.xqueryPreRec(nodo.hijos[2]);
                instrucciones.push(new letEXP(nodo.linea, nodo.hijos[0], val));
                //Introducción a la tabla y modificación de tamaño
                this.tsaux.agregar(nodo.hijos[0], null, this.nomfunc, null, 'Variablelocal', 1, null);
                this.tsaux.mod_size(this.nomfunc, 1);
              }
            }
            if (nodo.hijos.length === 4) {
              if (this.identificar('RETURN', nodo.hijos[3])) {
                let inst;
                if(this.identificar('EXPR', nodo.hijos[3].hijos[0])){
                  inst = this.xqueryPreRec(nodo.hijos[3].hijos[0]) as Array<Instruccion>;
                }
                else if (typeof nodo.hijos[3].hijos[0] == 'string') {
                  inst = new identificador(nodo.linea, nodo.hijos[3].hijos[0]);
                }
                else {
                  inst = this.xqueryPreRec(nodo.hijos[3].hijos[0]) as Array<Instruccion>;
                }
                if(this.estaEnFuncion){
                  instrucciones.push(new Retorno(nodo.linea, true, inst));
                }
                else{
                  instrucciones.push(new Mostrar(nodo.linea, inst));
                }
              }
            }
          }
          //console.log(instrucciones);
          return instrucciones;
        }
  
        if (this.identificar('FUNCION', nodo)) {
          this.estaEnFuncion = true;
          let instrucciones = [];
          if (this.identificar('FUNCION', nodo.hijos[0])) {
            nodo.hijos.forEach(element => {
              const inst = this.xqueryPreRec(element);
              if (inst instanceof Array) {
                instrucciones = instrucciones.concat(inst);
              }
              else {
                instrucciones.push(inst);
              }
            });
          }
          else {
            if (nodo.hijos.length === 5) {
              const variables = [];
              if (this.identificar('PARAMETROS', nodo.hijos[2])) {           
                const id_funcion = nodo.hijos[1];
                let tipo_funcion = nodo.hijos[3].hijos[0];
                let tipof = tipo_funcion;
                if (tipo_funcion === 'integer') {
                  tipo_funcion = Tipo.INT;
                }
                else if (tipo_funcion === 'decimal') {
                  tipo_funcion = Tipo.DOUBLE;
                }
                else if (tipo_funcion === 'string') {
                  tipo_funcion = Tipo.STRING;
                }
                else if (tipo_funcion === 'boolean') {
                  tipo_funcion = Tipo.BOOL;
                }

                //Guardado de función
                this.tsaux.agregar(id_funcion, null, this.ambito, tipof, 'Función', 1, null);
                let conthijos = 0;
                this.ambito = id_funcion;
                this.nomfunc = id_funcion;

                for (let index = 0; index < nodo.hijos[2].hijos.length / 3; index++) {
                  const id = nodo.hijos[2].hijos[index * 3 + 0]
                  let tipo = nodo.hijos[2].hijos[index * 3 + 2]
                  let tipod = tipo;
                  if (tipo === 'integer') {
                    tipo = Tipo.INT;
                  }
                  else if (tipo === 'decimal') {
                    tipo = Tipo.DOUBLE;
                  }
                  else if (tipo === 'string') {
                    tipo = Tipo.STRING;
                  }
                  else if (tipo === 'boolean') {
                    tipo = Tipo.BOOL;
                  }
                  variables.push(new Variable({ id, tipo: tipo }));

                  //Guardado de parámetros
                  this.tsaux.agregar(id, null, this.ambito, tipod, 'Parámetro', 1, null);
                  conthijos++;
                }
                
                //Actualización de tamaño
                this.tsaux.mod_size(id_funcion, conthijos);

                const flwor = this.xqueryPreRec(nodo.hijos[4]);
                instrucciones.push(new nuevaFuncion(nodo.linea, id_funcion, flwor, tipo_funcion, variables));
              }
            }
          }
          this.estaEnFuncion = false;
          return instrucciones;
        }
      }
  
      if (this.identificar('F_LLAMADA', nodo)) {
        let parametros = this.xqueryPreRec(nodo.hijos[2]);
        let llamada = new llamfuc(nodo.linea, nodo.hijos[1], parametros);

        let vector = [];
        let contv = 0;

        //Obtención de los parámetros
        parametros.forEach(element => {
          if(element instanceof Primitivo)
          {
            vector.push(element.valor);
          }
          else if(element instanceof identificador)
          {
            this.tsaux.tabla.forEach(elemento => {
              if(elemento[0] === element.id)
              {
                vector.push(elemento[1]);
              }
            });
          }
        });

        //Llenado de la función antes de su llamada
        this.tsaux.tabla.forEach(element => {
          if(element[4] === "Parámetro")
          {
            element[1] = vector[contv];
            contv++;
          }
        });
        return llamada
      }
  
      if (this.identificar('PARAMETROS', nodo)) {
        let parametros = [];
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            const exp = this.xqueryPreRec(element);
            parametros.push(exp);
          }
        });
        return parametros;
      }
  
      if (this.identificar('FLWOR', nodo)) {
        let instrucciones = [];
        nodo.hijos.forEach(element => {
          const inst = this.xqueryPreRec(element);
          if (inst instanceof Array) {
            instrucciones = instrucciones.concat(inst);
          }
          else {
            instrucciones.push(inst);
          }
        });
        return instrucciones;
      }
  
      if (this.identificar('IF', nodo)) {
        let instrucciones = [];
        let condicionIF = this.xqueryPreRec(nodo.hijos[0]);
        let instruccionIF = this.xqueryPreRec(nodo.hijos[1].hijos[0]);
        let condicionELSEIF;
        let instruccionELSEIF;
        let instruccionELSE;
        if (nodo.hijos.length == 4) {
          condicionELSEIF = this.xqueryPreRec(nodo.hijos[2].hijos[0]);
          instruccionELSEIF = this.xqueryPreRec(nodo.hijos[2].hijos[1].hijos[0]);
          instruccionELSEIF = new Retorno(nodo.linea, true, instruccionELSEIF);
          instruccionELSE = this.xqueryPreRec(nodo.hijos[3].hijos[0]);
          instruccionELSE = new Retorno(nodo.linea, true, instruccionELSE);
        }
        else {
          instruccionELSE = this.xqueryPreRec(nodo.hijos[2].hijos[0]);
          instruccionELSE = new Retorno(nodo.linea, true, instruccionELSE);
        }
        instruccionIF = new Retorno(nodo.linea, true, instruccionIF);
        const ifins = new If_Else(nodo.linea, condicionIF, instruccionIF, instruccionELSE, condicionELSEIF, instruccionELSEIF);
        instrucciones.push(ifins);
        return instrucciones;
      }
  
      if (this.identificar('EXPR', nodo)) {
        const expresion = this.xqueryPreRec(nodo.hijos[0]);
        if (this.identificar('xquery', nodo.hijos[0])) {
          return new identificador(nodo.linea, expresion);
        }
        else if (this.identificar('to', nodo.hijos[0])) {
          let inicio = this.xqueryPreRec(nodo.hijos[0].hijos[0]);
          let final = this.xqueryPreRec(nodo.hijos[0].hijos[1]);
          return new Arreglo(nodo.linea, [inicio, final]);
        }
        else {
          return expresion;
        }
  
      }
  
      if (this.identificar('ARITMETICAS', nodo)) {
        if (nodo.hijos.length === 3) {
          let aritIzq = this.xqueryPreRec(nodo.hijos[0]);
          let aritDer = this.xqueryPreRec(nodo.hijos[2]);
  
          if (typeof aritIzq == 'string') {
            aritIzq = new identificador(nodo.linea, aritIzq);
          }
          if (typeof aritDer == 'string') {
            aritDer = new identificador(nodo.linea, aritDer);
          }
          const operando = nodo.hijos[1];
          switch (operando) {
            case '+':
              return new Aritmeticas(aritIzq, aritDer, Operador.SUMA, nodo.linea);
            case '-':
              return new Aritmeticas(aritIzq, aritDer, Operador.RESTA, nodo.linea);
            case '*':
              return new Aritmeticas(aritIzq, aritDer, Operador.MULTIPLICACION, nodo.linea);
            case 'div':
              return new Aritmeticas(aritIzq, aritDer, Operador.DIVISION, nodo.linea);
          }
        }
      }
  
      if (this.identificar('RELACIONALES', nodo)) {
        if (nodo.hijos.length === 3) {
          let aritIzq = this.xqueryPreRec(nodo.hijos[0]);
          let aritDer = this.xqueryPreRec(nodo.hijos[2]);
  
          if (typeof aritIzq == 'string') {
            aritIzq = new identificador(nodo.linea, aritIzq);
          }
          if (typeof aritDer == 'string') {
            aritDer = new identificador(nodo.linea, aritDer);
          }
          const operando = nodo.hijos[1];
          switch (operando) {
            case '=':
              return new Aritmeticas(aritIzq, aritDer, Operador.IGUAL_IGUAL, nodo.linea);
            case 'eq':
              return new Aritmeticas(aritIzq, aritDer, Operador.IGUAL_IGUAL, nodo.linea);
            case '!=':
              return new Aritmeticas(aritIzq, aritDer, Operador.DIFERENTE_QUE, nodo.linea);
            case 'ne':
              return new Aritmeticas(aritIzq, aritDer, Operador.DIFERENTE_QUE, nodo.linea);
            case '<':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_QUE, nodo.linea);
            case 'lt':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_QUE, nodo.linea);
            case '<=':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_IGUA_QUE, nodo.linea);
            case 'le':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_IGUA_QUE, nodo.linea);
            case '>':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_QUE, nodo.linea);
            case 'gt':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_QUE, nodo.linea);
            case '>=':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_IGUA_QUE, nodo.linea);
            case 'ge':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_IGUA_QUE, nodo.linea);
  
          }
        }
      }
  
      if (this.identificar('LOGICAS', nodo)) {
        if (nodo.hijos.length === 3) {
          let aritIzq = this.xqueryPreRec(nodo.hijos[0]);
          let aritDer = this.xqueryPreRec(nodo.hijos[2]);
  
          if (typeof aritIzq == 'string') {
            aritIzq = new identificador(nodo.linea, aritIzq);
          }
          if (typeof aritDer == 'string') {
            aritDer = new identificador(nodo.linea, aritDer);
          }
          const operando = nodo.hijos[1];
          switch (operando) {
            case 'and':
              return new Aritmeticas(aritIzq, aritDer, Operador.AND, nodo.linea);
            case 'or':
              return new Aritmeticas(aritIzq, aritDer, Operador.OR, nodo.linea);
          }
        }
      }
  
      if (this.identificar('integer', nodo)) {
        return new Primitivo(Number(nodo.hijos[0]), nodo.linea, 0);
      }
  
      if (this.identificar('double', nodo)) {
        return new Primitivo(Number(nodo.hijos[0]), nodo.linea, 0);
      }
  
      if (this.identificar('boolean', nodo)) {
        return new Primitivo((nodo.hijos[0] == "true"), nodo.linea, 0);
      }
  
      if (this.identificar('string', nodo)) {
        return new Primitivo(nodo.hijos[0], nodo.linea, 0);
      }
  
      if (this.identificar('xquery', nodo)) {
        return new identificador(nodo.linea, nodo.hijos[0] + nodo.hijos[1]);
      }
  
      if (this.identificar('PATH', nodo)) {
        this.esRaiz = true;
        this.descendiente = false;
        this.atributo = false;
        this.atributoTexto = '';
        this.atributoIdentificacion = [];
        this.ejecXQuery = '';
        this.indiceValor = null;
        this.punto = '';
        this.consultaXML = this.cuerpoXml;
        this.pathh = this.consultaXML;
        this.pathhCount = 0;
        this.path(nodo);
        let texto = "";
        let param;
        if(this.pathh[0].texto.length > 0){
          for (var i = 0; i < this.pathh[0].texto.length; i++) {
            texto += this.pathh[0].texto[i];
          }
          if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
            param = new Primitivo(Number(texto), nodo.linea, 1);
            return param;
          } else {
            param = new Primitivo(texto, nodo.linea, 1);
            return param;
          }
        }
        else{
          param = new Primitivo(this.pathh[0], nodo.linea, 1);
          return param;
        }
      }
  
      if (this.identificar('LLAMADA_FUNCION', nodo)) {
        let parametros = this.xqueryPreRec(nodo.hijos[1]);
        let llamada = new llamfuc(nodo.linea, nodo.hijos[0], parametros);
        //return new Mostrar(nodo.linea,llamada);
        return llamada
      }
  
      if (this.identificar('F_UPPERCASE', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let nativa = new funcion_nativa(nodo.linea,'F_UPPERCASE',valor);
          return nativa
        }else{
          this.f_nativa_upper = true;
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_LOWERCASE', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let nativa = new funcion_nativa(nodo.linea,'F_LOWERCASE',valor);
          return nativa
        }else{
          this.f_nativa_lower = true;
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_STRING', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let nativa = new funcion_nativa(nodo.linea,'F_STRING',valor);
          return nativa
        }else{
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_NUMBER', nodo)) {
        let valoresAceptados = /^[0-9]+$/;
        if (typeof nodo.hijos[0] == 'string'){
          if (nodo.hijos[0] == 'true'){
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',true);
            return nativa
          }else if (nodo.hijos[0] == 'false'){
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',false);
            return nativa
          }else if(nodo.hijos[0].match(valoresAceptados)){
            let valor = nodo.hijos[0];
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',parseInt(valor));
            return nativa
          }else{
            let valor = nodo.hijos[0];
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',+valor);
            return nativa
          }
        }else{
          //this.recorrido(nodo.hijos[0]);
        }
      }
  
      if (this.identificar('F_SUBSTRING', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let inicio = parseInt(nodo.hijos[1]);
          let nativa = new funcion_nativa(nodo.linea,'F_SUBSTRING',valor,inicio);
          return nativa
        }else{
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_SUBSTRING1', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let inicio = parseInt(nodo.hijos[1]);
          let fin = parseInt(nodo.hijos[2]); 
          let nativa = new funcion_nativa(nodo.linea,'F_SUBSTRING1',valor,inicio,fin);
          return nativa
        }else{
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
    }


    estaEnFuncion: Boolean = false;
    ambito: String = "Global";
    incpos: number = 0;

    xqueryRec(nodo: any): any {
      //Instancia del generador
      const generador = Generador.GetInstance();

      if (nodo instanceof Object) {
        if (this.identificar('XQUERY', nodo)) {
          let instrucciones = [];
          nodo.hijos.forEach(element => {
            const inst = this.xqueryRec(element);
            if (inst instanceof Array) {
              instrucciones = instrucciones.concat(inst);
            }
            else {
              if (this.identificar('F_LLAMADA', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if (this.identificar('LLAMADA_FUNCION', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }
              else if  (this.identificar('F_UPPERCASE', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_NUMBER', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_STRING', element)) { //nativa string
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_LOWERCASE', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_SUBSTRING', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }else if  (this.identificar('F_SUBSTRING1', element)) {
                instrucciones.push(new Mostrar(element.linea, inst))
              }
              else
                instrucciones.push(inst);
            }
          });
          return instrucciones;
        }
        
        //----------------------Declaración de una variable
        if (this.identificar('LET', nodo)) {
          let instrucciones = [];
          //LET -> LET
          if (this.identificar('LET', nodo.hijos[0])) {
            nodo.hijos.forEach(element => {
              const inst = this.xqueryRec(element);
              if (inst instanceof Array) {
                instrucciones = instrucciones.concat(inst);
              }
              else {
                instrucciones.push(inst);
              }
            });
          }
          else {
            //LET -> ID = EXPR
            if (this.identificar('EXPR', nodo.hijos[2])) {
              //ID = /ruta/...
              if(this.identificar('PATH', nodo.hijos[2].hijos[0])){
                let val = this.xqueryRec(nodo.hijos[2].hijos[0]);
                instrucciones.push(new letEXP(nodo.linea, nodo.hijos[0], val));
              }
              //ID = expresión
              else{
                generador.Addcomentariofunc(`Variable: ${nodo.hijos[0]}`);
                let val = this.xqueryRec(nodo.hijos[2]);
                //instrucciones.push(new letEXP(nodo.linea, nodo.hijos[0], val));
              }
            }
            //LET -> ID = EXPR RETURN
            if (nodo.hijos.length === 4) {
              if (this.identificar('RETURN', nodo.hijos[3])) {
                let inst;
                if(this.identificar('EXPR', nodo.hijos[3].hijos[0])){
                  inst = this.xqueryRec(nodo.hijos[3].hijos[0]) as Array<Instruccion>;
                }
                else if (typeof nodo.hijos[3].hijos[0] == 'string') {
                  inst = new identificador(nodo.linea, nodo.hijos[3].hijos[0]);
                }
                else {
                  inst = this.xqueryRec(nodo.hijos[3].hijos[0]) as Array<Instruccion>;
                }
                if(this.estaEnFuncion){
                  instrucciones.push(new Retorno(nodo.linea, true, inst));
                }
                else{
                  instrucciones.push(new Mostrar(nodo.linea, inst));
                }
              }
            }
          }
          //console.log(instrucciones);
          return instrucciones;
        }
        
        //----------------------Declaración de una función
        if (this.identificar('FUNCION', nodo)) {
          this.estaEnFuncion = true;
          let instrucciones = [];
          //FUNCION -> FUNCION
          if (this.identificar('FUNCION', nodo.hijos[0])) {
            nodo.hijos.forEach(element => {
              const inst = this.xqueryRec(element);
              if (inst instanceof Array) {
                instrucciones = instrucciones.concat(inst);
              }
              else {
                instrucciones.push(inst);
              }
            });
          }
          //FUNCION -> local ID PARAMETROS TIPO FLWOR
          else {
            if (nodo.hijos.length === 5) {
              generador.Addcomentariofuncout('Función no nativa');
              const variables = [];
              if (this.identificar('PARAMETROS', nodo.hijos[2])) {           
                const id_funcion = nodo.hijos[1];
                let tipo_funcion = nodo.hijos[3].hijos[0];

                if (tipo_funcion === 'integer') {
                  tipo_funcion = Tipo.INT;
                }
                else if (tipo_funcion === 'decimal') {
                  tipo_funcion = Tipo.DOUBLE;
                }
                else if (tipo_funcion === 'string') {
                  tipo_funcion = Tipo.STRING;
                }
                else if (tipo_funcion === 'boolean') {
                  tipo_funcion = Tipo.BOOL;
                }

                for (let index = 0; index < nodo.hijos[2].hijos.length / 3; index++) {
                  const id = nodo.hijos[2].hijos[index * 3 + 0]
                  let tipo = nodo.hijos[2].hijos[index * 3 + 2]
                  let tipod = tipo;
                  if (tipo === 'integer') {
                    tipo = Tipo.INT;
                  }
                  else if (tipo === 'decimal') {
                    tipo = Tipo.DOUBLE;
                  }
                  else if (tipo === 'string') {
                    tipo = Tipo.STRING;
                  }
                  else if (tipo === 'boolean') {
                    tipo = Tipo.BOOL;
                  }
                  variables.push(new Variable({ id, tipo: tipo }));
                }

                //Inicio traducción función
                generador.Addcodfunc(`void ${id_funcion}() {`);

                const flwor = this.xqueryRec(nodo.hijos[4]);
                instrucciones.push(new nuevaFuncion(nodo.linea, id_funcion, flwor, tipo_funcion, variables));

                //Fin traducción función
                generador.Addcodfuncidentado(`return;\n}\n`);
                console.log(this.tsaux);
              }
            }
          }
          this.estaEnFuncion = false;
          return instrucciones;
        }
      }
      
      //Llamado de función declarada
      if (this.identificar('F_LLAMADA', nodo)) {
        let parametros = this.xqueryRec(nodo.hijos[2]);
        let llamada = new llamfuc(nodo.linea, nodo.hijos[1], parametros);
        
        //Temporal para almacenar la posición del stack con el contenido
        let temp_stack_cont = generador.Creartemp();
        //Temporal para el almacenamiento del cambio de ámbito
        let temp_entorno = generador.Creartemp();
        //Temporal para el return
        let temp_return = generador.Creartemp();


        //Agregamos el código de llamada
        generador.Addcomentarioxq('Ajuste de punteros y estructuras');

        //Se realiza el cambio de entorno de acuerdo a la cantidad de elementos de la función
        generador.Addxq(`${temp_entorno} = Sxquery + ${generador.GetStackposxquery()};`);
        //Se deja una posición vacía para el retorno
        generador.Addxq(`${temp_entorno} = ${temp_entorno} + 1;`)

        //Asignamos en el stackxquery en la nueva posición lo que se desea imprimir
        generador.Addxq(`stackxquery[(int)${temp_entorno}] = ${temp_stack_cont};`);

        //Ajustamos el puntero
        generador.Addxq(`Sxquery = Sxquery + ${generador.GetStackposxquery()};`);

        //Llamado de función
        generador.Addxq(`${nodo.hijos[1]}();`);

        //Parte final del llamado en el main
        generador.Addcomentarioxq('Ajustes luego del llamado a la función');

        //Se obtiene el posible retorno
        generador.Addxq(`${temp_return} = stackxquery[(int)Sxquery];`);

        //Se regresa el puntero
        generador.Addxq(`Sxquery = Sxquery - ${generador.GetStackposxquery()};`);
        return llamada
      }
  
      if (this.identificar('PARAMETROS', nodo)) {
        let parametros = [];
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            const exp = this.xqueryRec(element);
            parametros.push(exp);
          }
        });
        return parametros;
      }
  
      if (this.identificar('FLWOR', nodo)) {
        let instrucciones = [];
        nodo.hijos.forEach(element => {
          const inst = this.xqueryRec(element);
          if (inst instanceof Array) {
            instrucciones = instrucciones.concat(inst);
          }
          else {
            instrucciones.push(inst);
          }
        });
        return instrucciones;
      }
  
      if (this.identificar('IF', nodo)) {
        let instrucciones = [];
        let condicionIF = this.xqueryRec(nodo.hijos[0]);
        let instruccionIF = this.xqueryRec(nodo.hijos[1].hijos[0]);
        let condicionELSEIF;
        let instruccionELSEIF;
        let instruccionELSE;
        if (nodo.hijos.length == 4) {
          condicionELSEIF = this.xqueryRec(nodo.hijos[2].hijos[0]);
          instruccionELSEIF = this.xqueryRec(nodo.hijos[2].hijos[1].hijos[0]);
          instruccionELSEIF = new Retorno(nodo.linea, true, instruccionELSEIF);
          instruccionELSE = this.xqueryRec(nodo.hijos[3].hijos[0]);
          instruccionELSE = new Retorno(nodo.linea, true, instruccionELSE);
        }
        else {
          instruccionELSE = this.xqueryRec(nodo.hijos[2].hijos[0]);
          instruccionELSE = new Retorno(nodo.linea, true, instruccionELSE);
        }
        instruccionIF = new Retorno(nodo.linea, true, instruccionIF);
        const ifins = new If_Else(nodo.linea, condicionIF, instruccionIF, instruccionELSE, condicionELSEIF, instruccionELSEIF);
        instrucciones.push(ifins);
        return instrucciones;
      }
  
      if (this.identificar('EXPR', nodo)) {
        const expresion = this.xqueryRec(nodo.hijos[0]);

        //Guardado
        //Se incrementa una posición 
        this.incpos = this.incpos + 1;

        let tempant = expresion;
        
        let temp = generador.Creartemp();
        //La variable se guarda en el stack una posición sobre la anterior
        generador.Addcodfuncidentado(`${temp} = Sxquery + ${this.incpos};`);
        generador.Addcodfuncidentado(`stackxquery[(int)${temp}] = ${tempant};`);

        if (this.identificar('xquery', nodo.hijos[0])) {
          return new identificador(nodo.linea, expresion);
        }
        else if (this.identificar('to', nodo.hijos[0])) {
          let inicio = this.xqueryRec(nodo.hijos[0].hijos[0]);
          let final = this.xqueryRec(nodo.hijos[0].hijos[1]);
          return new Arreglo(nodo.linea, [inicio, final]);
        }
        else {
          return expresion;
        }
  
      }
  
      if (this.identificar('ARITMETICAS', nodo)) {
        if (nodo.hijos.length === 3) {
          let aritIzq = this.xqueryRec(nodo.hijos[0]);
          let aritDer = this.xqueryRec(nodo.hijos[2]);

          if(aritIzq === null)
          {
            aritIzq = 0;
          }
          if(aritDer === null)
          {
            aritDer = 0;
          }

          let operando = nodo.hijos[1];

          if(operando === "div")
          {
            operando = "/";
          }

          //Inicio del codigo
          let tempoizq = generador.Creartemp();
          generador.Addcodfuncidentado(`${tempoizq} = ${aritIzq};`);
          let tempoder = generador.Creartemp();
          generador.Addcodfuncidentado(`${tempoder} = ${aritDer};`);
          console.log("izq", tempoizq, aritIzq)
          let tempo = generador.Creartemp();
          generador.Addcodfuncidentado(`${tempo} = ${tempoizq} ${operando} ${tempoder};`);

          return tempo;
        }
      }
  
      if (this.identificar('RELACIONALES', nodo)) {
        if (nodo.hijos.length === 3) {
          let aritIzq = this.xqueryRec(nodo.hijos[0]);
          let aritDer = this.xqueryRec(nodo.hijos[2]);
  
          if (typeof aritIzq == 'string') {
            aritIzq = new identificador(nodo.linea, aritIzq);
          }
          if (typeof aritDer == 'string') {
            aritDer = new identificador(nodo.linea, aritDer);
          }
          const operando = nodo.hijos[1];
          switch (operando) {
            case '=':
              return new Aritmeticas(aritIzq, aritDer, Operador.IGUAL_IGUAL, nodo.linea);
            case 'eq':
              return new Aritmeticas(aritIzq, aritDer, Operador.IGUAL_IGUAL, nodo.linea);
            case '!=':
              return new Aritmeticas(aritIzq, aritDer, Operador.DIFERENTE_QUE, nodo.linea);
            case 'ne':
              return new Aritmeticas(aritIzq, aritDer, Operador.DIFERENTE_QUE, nodo.linea);
            case '<':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_QUE, nodo.linea);
            case 'lt':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_QUE, nodo.linea);
            case '<=':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_IGUA_QUE, nodo.linea);
            case 'le':
              return new Aritmeticas(aritIzq, aritDer, Operador.MENOR_IGUA_QUE, nodo.linea);
            case '>':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_QUE, nodo.linea);
            case 'gt':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_QUE, nodo.linea);
            case '>=':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_IGUA_QUE, nodo.linea);
            case 'ge':
              return new Aritmeticas(aritIzq, aritDer, Operador.MAYOR_IGUA_QUE, nodo.linea);
  
          }
        }
      }
  
      if (this.identificar('LOGICAS', nodo)) {
        if (nodo.hijos.length === 3) {
          let aritIzq = this.xqueryRec(nodo.hijos[0]);
          let aritDer = this.xqueryRec(nodo.hijos[2]);
  
          if (typeof aritIzq == 'string') {
            aritIzq = new identificador(nodo.linea, aritIzq);
          }
          if (typeof aritDer == 'string') {
            aritDer = new identificador(nodo.linea, aritDer);
          }
          const operando = nodo.hijos[1];
          switch (operando) {
            case 'and':
              return new Aritmeticas(aritIzq, aritDer, Operador.AND, nodo.linea);
            case 'or':
              return new Aritmeticas(aritIzq, aritDer, Operador.OR, nodo.linea);
          }
        }
      }
  
      if (this.identificar('integer', nodo)) {
        //return new Primitivo(Number(nodo.hijos[0]), nodo.linea, 0);
        return Number(nodo.hijos[0]);
      }
  
      if (this.identificar('double', nodo)) {
        //return new Primitivo(Number(nodo.hijos[0]), nodo.linea, 0);
        return Number(nodo.hijos[0]);
      }
  
      if (this.identificar('boolean', nodo)) {
        //return new Primitivo((nodo.hijos[0] == "true"), nodo.linea, 0);
        return (nodo.hijos[0] == "true");
      }
  
      if (this.identificar('string', nodo)) {
        let cadena;
        //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
        let tempo = generador.Creartemp();
        cadena = tempo + ' = Hxquery;';
        generador.Addcodfuncidentado(cadena);

        //Se obtiene el caracter ascii de los identificadores de la tabla
        let cadid = nodo.hijos[0];
        for(let i = 0; i<cadid.length; i++)
        {
          //Se introduce al heap en la posición H, el caracter ascii
          generador.Addcodfuncidentado(`heapxquery[(int)Hxquery] = ${cadid.charCodeAt(i)};`);
          
          //Se incrementa el registro H
          generador.Addcodfuncidentado('Hxquery = Hxquery + 1;');
          generador.Incphxquery(1);
        }

         //Al finalizar la cadena se introduce un -1 para indicar final
         generador.Addcodfuncidentado(`heapxquery[(int)Hxquery] = -1;`);
         generador.Addcodfuncidentado('Hxquery = Hxquery + 1;');
         generador.Incphxquery(1);

         generador.Addcomentariofunc('Se agrega la posición de inicio del heapxquery en el stack');

         //Se referencia al stack el inicio del heap
         let st: number = generador.GetStackposxquery();
         generador.Addcodfuncidentado(`stackxquery[(int)${st}] = ${tempo};\n`);

         //Se incrementa el stack
         generador.Incpsxquery(1);

        return st;
      }
  
      if (this.identificar('xquery', nodo)) {
        //return new identificador(nodo.linea, nodo.hijos[0] + nodo.hijos[1]);
        let identi = nodo.hijos[0] + nodo.hijos[1];

        let val = 0;
        this.tsaux.tabla.forEach(element => {
          if(element[0] === identi)
          {
            val = element[1];
          }
        });        
        return val;
      }
  
      if (this.identificar('PATH', nodo)) {
        this.esRaiz = true;
        this.descendiente = false;
        this.atributo = false;
        this.atributoTexto = '';
        this.atributoIdentificacion = [];
        //this.ejecXQuery = '';
        this.indiceValor = null;
        this.punto = '';
        this.consultaXML = this.cuerpoXml;
        this.pathh = this.consultaXML;
        this.pathhCount = 0;
        this.path(nodo);
        let texto = "";
        let param;
        if(this.pathh[0].texto.length > 0){
          for (var i = 0; i < this.pathh[0].texto.length; i++) {
            texto += this.pathh[0].texto[i];
          }
          if (Number.isInteger(parseInt(texto)) && !texto.includes("/") && !texto.includes("-")) {
            param = new Primitivo(Number(texto), nodo.linea, 1);
            return param;
          } else {
            param = new Primitivo(texto, nodo.linea, 1);
            return param;
          }
        }
        else{
          param = new Primitivo(this.pathh[0], nodo.linea, 1);
          return param;
        }
      }
  
      if (this.identificar('LLAMADA_FUNCION', nodo)) {
        let parametros = this.xqueryRec(nodo.hijos[1]);
        let llamada = new llamfuc(nodo.linea, nodo.hijos[0], parametros);
        //return new Mostrar(nodo.linea,llamada);
        return llamada
      }
  
      if (this.identificar('F_UPPERCASE', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let nativa = new funcion_nativa(nodo.linea,'F_UPPERCASE',valor);
          return nativa
        }else{
          this.f_nativa_upper = true;
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_LOWERCASE', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let nativa = new funcion_nativa(nodo.linea,'F_LOWERCASE',valor);
          return nativa
        }else{
          this.f_nativa_lower = true;
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_STRING', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let nativa = new funcion_nativa(nodo.linea,'F_STRING',valor);
          return nativa
        }else{
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_NUMBER', nodo)) {
        let valoresAceptados = /^[0-9]+$/;
        if (typeof nodo.hijos[0] == 'string'){
          if (nodo.hijos[0] == 'true'){
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',true);
            return nativa
          }else if (nodo.hijos[0] == 'false'){
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',false);
            return nativa
          }else if(nodo.hijos[0].match(valoresAceptados)){
            let valor = nodo.hijos[0];
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',parseInt(valor));
            return nativa
          }else{
            let valor = nodo.hijos[0];
            let nativa = new funcion_nativa(nodo.linea,'F_NUMBER',+valor);
            return nativa
          }
        }else{
          //this.recorrido(nodo.hijos[0]);
        }
      }
  
      if (this.identificar('F_SUBSTRING', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let inicio = parseInt(nodo.hijos[1]);
          let nativa = new funcion_nativa(nodo.linea,'F_SUBSTRING',valor,inicio);
          return nativa
        }else{
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
  
      if (this.identificar('F_SUBSTRING1', nodo)) {
        if (typeof nodo.hijos[0].hijos[0] == 'string'){
          let valor = nodo.hijos[0].hijos[0];
          let inicio = parseInt(nodo.hijos[1]);
          let fin = parseInt(nodo.hijos[2]); 
          let nativa = new funcion_nativa(nodo.linea,'F_SUBSTRING1',valor,inicio,fin);
          return nativa
        }else{
          //this.recorrido(nodo.hijos[0].hijos[0]);
        }
      }
    }
}
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