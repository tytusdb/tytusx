
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
      simbolo = new Simbolo(new Tipo(tipoDato.OBJETO), this.identificador, this.linea.toString(), this.columna.toString(),"anteriorentorno" ,ts);
      //arbol.actualizarTabla(simbolo,this.linea.toString(),this.columna.toString());
    } else if (this.contenido != null) {

      //if o switch buscando codificacion
      if (arbol.getEncoding() == "UTF-8") {
        this.contenido = (this.contenido);
      } else if (arbol.getEncoding() == "ISO-8859-1") {
        this.contenido = unescape(encodeURIComponent(this.contenido));
      } else if (arbol.getEncoding() == "ASCII") {
        this.contenido = (this.contenido);
        //
        /*console.log(this.getCharCodes(this.contenido));
        this.contenido = this.getCharCodes(this.contenido) + "";*/
      } else {
        this.contenido = this.contenido;
      }
      
      simbolo = new Simbolo(new Tipo(tipoDato.OBJETO), this.identificador, this.linea.toString(), this.columna.toString(),"anteriorentorno", this.contenido);

    } else {
      listaErrores.push(new NodoErrores('SEMANTICO', this.identificador + ' Datos nulos', this.fila, this.columna));
    }


    if (this.listaAtributos != null) {
      if(this.identificador!="xml"){

      
      for (let i of this.listaAtributos) {
        var s = i.interpretar(arbol, tabla);

        simbolo.agregarAtributo(s.identificador, s.valor, s.linea,s.columna);
        
      }
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

  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    var simbolo;

    if (this.listaObjetos != null) {
      
      var ts = new tablaSimbolos(); /*entorno hijo */
     
      for (let i of this.listaObjetos) {
        var r = i.codigo3D(arbol, tabla); /* Obtiene el objeto hijo */
        ts.setVariable(r);
      }
      let contador = arbol.getContadort();
      let stack = arbol.getSTACK();
      arbol.codigo3d.push(`// declaracion ${this.identificador}`);
      arbol.codigo3d.push(`$t${contador}=$s+${stack};`);
      simbolo = new Simbolo(new Tipo(tipoDato.OBJETO), this.identificador, this.linea.toString(), this.columna.toString(),"" ,ts, `$t${contador}`);

    }

    else if (this.contenido != null) {

      //if o switch buscando codificacion
      if (arbol.getEncoding() == "UTF-8") {
        this.contenido = (this.contenido);
      } else if (arbol.getEncoding() == "ISO-8859-1") {
        this.contenido = unescape(encodeURIComponent(this.contenido));
      } else if (arbol.getEncoding() == "ASCII") {
        this.contenido = (this.contenido);
        //
        /*console.log(this.getCharCodes(this.contenido));
        this.contenido = this.getCharCodes(this.contenido) + "";*/
      } else {
        this.contenido = this.contenido;
        this.contenido = this.contenido.toString().replace("%20", " ").replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&").replace("&apos;", "'").replace("&quot;", "\"");
      }

      let stackID = arbol.getSTACK();
      let contadorID = arbol.getContadort(); //temporales
      arbol.codigo3d.push(`// declaracion ${this.identificador}`);
      arbol.codigo3d.push(`$t${contadorID}=$s+${stackID};`);

      let data: string = this.contenido + "";
      let estado = 0;
      for (let x = 0; x < data.length; x++) {
        const iterator = data[x];
        switch (estado) {
          case 0: {
            if (iterator == "\\") { estado = 1; continue; }
            arbol.codigo3d.push(`//agregamos el string al heap ${iterator}`);
            arbol.codigo3d.push("$t0=$p;");

            arbol.codigo3d.push("$t1=" + iterator.charCodeAt(0) + ";");
            arbol.codigo3d.push("guardarString();");
            break;
          }
          case 1:
            {
              let assci = 0;
              if (iterator == "n") { assci = 10; }
              else if (iterator == "\"") { assci = 34; }
              else if (iterator == "\\") { assci = 92 }
              else if (iterator == "r") { assci = 10 }
              else if (iterator == "t") { assci = 9; }
              else {
                arbol.codigo3d.push("//agregamos el string al heap");
                arbol.codigo3d.push("$t0=$p;");

                arbol.codigo3d.push("$t1=" + 34 + ";");
                arbol.codigo3d.push("guardarString();");
                arbol.codigo3d.push("//agregamos el string al heap");
                arbol.codigo3d.push("$t0=$p;");

                arbol.codigo3d.push("$t1=" + iterator.charAt(0) + ";");
                arbol.codigo3d.push("guardarString();");
              }
              arbol.codigo3d.push("//agregamos el string al heap");
              arbol.codigo3d.push("$t0=$p;");

              arbol.codigo3d.push("$t1=" + assci + ";");
              arbol.codigo3d.push("guardarString();");
              estado = 0;
              break;
            }
        }

      }
      arbol.codigo3d.push("$t0=$p;");
      arbol.codigo3d.push("$t1=-1;");
      arbol.codigo3d.push("guardarString();");
      const contadort = arbol.getContadort();
      arbol.codigo3d.push("$t" + contadort + "=$p-" + (data.length + 1) + ";");
      arbol.codigo3d.push(`stack[(int)$t${contadorID}]= $t${contadort};`);
      simbolo = new Simbolo(new Tipo(tipoDato.OBJETO), this.identificador, this.linea.toString(), this.columna.toString(),"", this.contenido, `$t${contadorID}`);

    }



    if (this.listaAtributos != null) {
      for (let i of this.listaAtributos) {
        var s = i.codigo3D(arbol, tabla);
        
          simbolo.agregarAtributo(s.identificador, s.valor, s.linea, s.columna, s.cd3script);
        
        
      }
    }

    return simbolo
  }
}

