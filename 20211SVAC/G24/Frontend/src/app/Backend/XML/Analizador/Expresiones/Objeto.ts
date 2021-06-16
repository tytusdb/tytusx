
import { Instruccion } from 'src/app/Backend/XML/Analizador/Abstracto/Instruccion';

import nodoAST from 'src/app/Backend/XML/Analizador/Abstracto/nodoAST';
import Atributo from 'src/app/Backend/XML/Analizador/Expresiones/Atributo';
import Simbolo from 'src/app/Backend/XML/Analizador/Simbolos/Simbolo';

import Tipo, { tipoDato } from 'src/app/Backend/XML/Analizador/Simbolos/Tipo';
import Arbol from 'src/app/Backend/XML/Analizador/Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import NodoErrores from '../Excepciones/NodoErrores';
import { listaErrores } from 'src/app/componentes/contenido-inicio/contenido-inicio.component';
import { reporteTabla } from '../Reportes/reporteTabla';

export default class Objeto extends Instruccion {
  public identificador: string;
  public contenido: string;
  public listaAtributos: Atributo[];
  public listaObjetos: Objeto[];
  public linea: number;
  public columna: number;
  constructor(identificador: string, contenido: string, listaAtributos: Atributo[] = [], listaObjetos: Objeto[], linea: number, columna: number) {
    super(new Tipo(tipoDato.OBJETO), linea, columna);
    this.identificador = identificador;
    this.contenido = contenido;
    this.listaAtributos = listaAtributos;
    this.listaObjetos = listaObjetos;
    this.linea = linea;
    this.columna = columna;
  }

  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    var simbolo;

    
    if (this.listaAtributos != null) {
      for (let i of this.listaAtributos) {
        var s = i.interpretar(arbol, tabla);
        if (s.identificador == "encoding") {
          console.log(s.valor);
          arbol.setEncoding(s.valor);
        }
      }
    }



    if (this.listaObjetos != null) {

        var ts = new tablaSimbolos(); /*entorno hijo */
        for (let i of this.listaObjetos) {
          var r = i.interpretar(arbol, tabla); /* Obtiene el objeto hijo */
          ts.setVariable(r);
        }
        simbolo = new Simbolo(new Tipo(tipoDato.OBJETO), this.identificador, ts);
        //arbol.listaSimbolos.push(simbolo);

    } else if (this.contenido != null) {
      console.log(arbol.getEncoding());
      //if o switch buscando codificacion
      if (arbol.getEncoding() == "UTF-8") {
        this.contenido = (this.contenido);
      }else if(arbol.getEncoding()=="ISO-8859-1"){
        this.contenido = unescape(encodeURIComponent(this.contenido));
      }else if (arbol.getEncoding() == "ASCII") {
        this.contenido = (this.contenido);
        //
        /*console.log(this.getCharCodes(this.contenido));
        this.contenido = this.getCharCodes(this.contenido) + "";*/
      } else {
        this.contenido = this.contenido;
      }
  
      simbolo = new Simbolo(new Tipo(tipoDato.OBJETO), this.identificador, this.contenido);
    } else {
      listaErrores.push(new NodoErrores('SEMANTICO', this.identificador + ' Datos nulos', this.fila, this.columna));
    }


    if (this.listaAtributos != null) {
      for (let i of this.listaAtributos) {
        var s = i.interpretar(arbol, tabla);

        simbolo.agregarAtributo(s.identificador, s.valor);

      }
    }

    return simbolo;

  }


  getCharCodes(s) {
    let charCodeArr = [];

    for (let i = 0; i < s.length; i++) {
      let code = s.charCodeAt(i);
      charCodeArr.push(code);
    }

    return charCodeArr;
  }


  public getNodo(): nodoAST {
    let nodo = new nodoAST('OBJETOS');
    let objectos = new nodoAST('OBJETO')
    let mayor = new nodoAST("<")
    objectos.agregarHijoAST(mayor)
    var padreidentificador = new nodoAST('IDENTIFICADOR');

    padreidentificador.agregarHijo(this.identificador);
    objectos.agregarHijoAST(padreidentificador);
    let menor = new nodoAST(">")
    objectos.agregarHijoAST(menor)



    nodo.agregarHijoAST(objectos);

    if (this.contenido != null) {
      var padre = new nodoAST("INSTRUCCION");
      padre.agregarHijo(this.contenido);
      nodo.agregarHijoAST(padre);
    }

    if (this.listaAtributos != null) {
      var lista = new nodoAST("LISTA ATRIBUTOS");
      for (let i of this.listaAtributos) {
        lista.agregarHijoAST(i.getNodo());
      }
      nodo.agregarHijoAST(lista);
    }

    if (this.listaObjetos != null) {
      var lista = new nodoAST("LISTA OBJETOS");
      for (let i of this.listaObjetos) {
        lista.agregarHijoAST(i.getNodo());
      }
      nodo.agregarHijoAST(lista);
    }
    return nodo;
  }
}

