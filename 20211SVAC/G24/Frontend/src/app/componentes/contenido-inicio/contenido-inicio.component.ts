import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Errores from 'src/app/Backend/XML/Analizador/Excepciones/NodoErrores';
import tablaSimbolos from 'src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos';
import { InicioService } from 'src/app/servicios/inicio.service';
import * as Analizador from 'src/app/Backend/XML/Analizador/GramaticaXML';
import * as AnalizadorD from 'src/app/Backend/XML/Analizador/GramaticaXMLDescPRUEBA';
import * as AnalizarAscXpath from 'src/app/Backend/XPATH/GramaticaXPath'
import * as AnalizarDscXpath from 'src/app/Backend/XPATH/Analizador/GramaticaXPathDesc'
import * as Gramatical from 'src/app/Backend/XML/Analizador/XMLgraph'
import * as GramaticalDes from 'src/app/Backend/XML/Analizador/XMLgraphDesc'
import Simbolo from 'src/app/Backend/XML/Analizador/Simbolos/Simbolo';
import Tipo, { tipoDato } from 'src/app/Backend/XML/Analizador/Simbolos/Tipo';
import Arbol from 'src/app/Backend/XML/Analizador/Simbolos/Arbol';
import ArbolXpath from 'src/app/Backend/XPATH/Analizador/Simbolos/Arbol';
import nodoAST from 'src/app/Backend/XML/Analizador/Abstracto/nodoAST';
import nodoAst from 'src/app/Backend/XPATH/Analizador/Abstracto/nodoAST'
import { Instruccion } from 'src/app/Backend/XPATH/Analizador/Abstracto/Instruccion';
import NodoErrores from 'src/app/Backend/XML/Analizador/Excepciones/NodoErrores';
import Objeto from 'src/app/Backend/XML/Analizador/Expresiones/Objeto';

import { reporteTabla } from 'src/app/Backend/XML/Analizador/Reportes/reporteTabla';
import Identificador from 'src/app/Backend/XPATH/Analizador/Expresiones/Identificador';
import BarrasNodo from 'src/app/Backend/XPATH/Analizador/Instrucciones/BarrasNodo';
import Axes from 'src/app/Backend/XPATH/Analizador/Funciones/Axes';
import 'codemirror/mode/htmlmixed/htmlmixed';
import { ViewChild } from '@angular/core';

export let listaErrores: Array<NodoErrores>;
export let listainstrucciones: Array<Instruccion[]>
export let Ambito:String;
@Component({
  selector: 'app-contenido-inicio',
  templateUrl: './contenido-inicio.component.html',
  template: `<codemirror [(ngModel)]="code" [config]="{...}" placeholder="Here is the code placeholder"></codemirror>`,
  styleUrls: ['./contenido-inicio.component.css'],
})

export class ContenidoInicioComponent implements OnInit {
  public textoEntrada;
  @ViewChild('editor') editor;
  codeMirrorOptions: any = {
    theme: '3024-night',
    mode: 'application/xml',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    color: "#fe3",
    matchBrackets: true,
    lint: true

  };
  codeMirrorOptions2: any = {
    theme: '3024-night',
    mode: 'application/typescript',
    readOnly:true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true

  };
  constructor(private inicioSrv: InicioService, private dialog: MatDialog) {
    this.code = 'asd';
    
  }
  tablaGlobal: tablaSimbolos = new tablaSimbolos();
  code = '';
  contenido = '';
  ngOnInit(): void {
    console.log(document.querySelector('#codigo'))
   /* var editor = CodeMirror.fromTextArea(document.querySelector('#editor'), {
      mode: "javascript",
      lineNumbers: true,
  });
  editor.save()*/
  }
  ngAfterViewInit(): void {
    
    this.editor.getEditor().setOptions({
      showLineNumbers: true,
      tabSize: 2
    });

    this.editor.mode = 'javascript';
    this.editor.value = `function testThis() {
  console.log("it's working!")
}`

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    })

    this.data = JSON.parse(localStorage.getItem('contenido'));
    if (this.data != '' || this.data != undefined) {
      this.mostrarContenido(this.data.console, 'consolas');
    }
  }
  data;
  getValue() {
    console.log(this.editor.value)
    console.log(eval(this.editor.value));
  }
  colocarConsola(res, texto) {
    const dataObject = {
      text: 'asd',
      console: 'res',
    };
    localStorage.setItem('consulta', JSON.stringify(dataObject));
  }
  getConsola() {
    this.data = JSON.parse(localStorage.getItem('contenido'));
    if (this.data != '' || this.data != undefined) {
      this.mostrarContenido(this.data.text, 'contenido');
    }
  }

  /*A R B O L  A S C E N D E N T E */
  interpretarContenido(texto: string) {
    listaErrores = new Array<Errores>();
    if (texto == null) return document.write('Error');

    try {
      const analizador = Analizador;
      const objetos = analizador.parse(texto);

      var Tree: Arbol = new Arbol([objetos]);
      Tree.settablaGlobal(this.tablaGlobal);

      //  PARA GUARDAR DATOS
      // TODO FOR INTERPRETAR
      for (let i of Tree.getinstrucciones()) {
        if (i instanceof Objeto) {
          var objetito = i.interpretar(Tree, this.tablaGlobal); //retorna simbolo
          this.tablaGlobal.setVariable(objetito);
        }
      }
      console.log(this.tablaGlobal);

      var atributos = "";
      /***************************************************************************************************
     ************************* MANEJO DE CODIGO 3 DIRECCIONES ASCENDENTE *******************************
     * *************************************************************************************************
    */
   
    var contenidocd3="#include <stdio.h>\n#include<math.h>\n"
    
    Tree.codigo3d.push("int main(){\n");
     

    for (let i of Tree.getinstrucciones()) {
      if (i instanceof Objeto) {
        var lista = i.codigo3D(Tree, this.tablaGlobal); //retorna simbolo
        this.tablaGlobal.setVariable(lista);
      }
    }
    //ES VARIABLES AL INICIO
    for (let x = 0; x < Tree.contadort; x++) {
      if(x==0){contenidocd3=contenidocd3+"double "}
      else if(x%20==0){contenidocd3=contenidocd3+"\n"}
     contenidocd3=contenidocd3+"t"+x;
     if(Tree.contadort-1!==x){contenidocd3=contenidocd3+","}

    }
    if( Tree.contadort!==0){contenidocd3=contenidocd3+";\n"}
    Tree.Encabezadocodigo3d.forEach(element => {
      contenidocd3+=element+"\n"
    });
    //ITERA PARA EL CONTENIDO DEL MAIN
    Tree.codigo3d.forEach(element => {
      contenidocd3+=element+"\n"
    });
    contenidocd3+="return 1;\n}"
    this.mostrarContenido(contenidocd3, 'cdirecciones');

      
      /* **********************L L E N A D O    T A B L A    D E    S I M B O L O S************************* */
      Ambito="Global"
      for (var key of this.tablaGlobal.tablaActual) {
        var entorno= Ambito
        var listaobjetitos = "";
        var contenido = "";
        var tipo = "";
        var posicion = ""; //stack y heap
        var linea = key.getLinea();
        var columna = key.getColumna();
        var nombre = key.getidentificador();
        var atri = key.getAtributo();
        var cd3direcciones= key.setcd3Value()

       /* if(nombre!=null){
          let objetos = key.getvalor();
        if (objetos instanceof tablaSimbolos) {
          for (var key3 of objetos.tablaActual) {
            listaobjetitos += `${key3.}, `
            if(listaobjetitos!=null){
              entorno=listaobjetitos;
              console.log(entorno);
            }
          }
        }*/

        /*for (var [key2, value2,] of key.getAtributo()) {
          nombre = key.getidentificador();
          if (key.getAtributo() != null) {
            nombre = nombre;
            atributos += ` ${key2}=>${value2}, `;
            if (nombre != null) {
              if (nombre == key.getidentificador()) {
                nombre += atributos;
              } else {
                nombre = atributos;
              }
            }
          }
        }*/

        let idEntorno=key.getidentificador();
        
        let objetos = key.getvalor();
        if (objetos instanceof tablaSimbolos) {
          for (var key3 of objetos.tablaActual) {
            listaobjetitos += `${key3.getidentificador()}, `
            if(listaobjetitos!=null){
            
              Ambito=nombre
            }else{
              Ambito=key3.getidentificador()
            }
          }

          this.llenarTablaSimbolos(objetos, Tree);

        } else {
          contenido = objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"");
        }
        if (key.gettipo().getTipo() == 1) {
          tipo = "Objeto";
        } else {
          tipo = "Atributo";
        }

        var Reporte = new reporteTabla(nombre, tipo,entorno, contenido, linea, columna, cd3direcciones);
        Tree.listaSimbolos.push(Reporte);
      }

      // TERMINA FOR 


      var init = new nodoAST("RAIZ");
      var instrucciones = new nodoAST("HIJOS");
      for (let i of Tree.getinstrucciones()) {
        instrucciones.agregarHijoAST(i.getNodo());

      }

      for (let i of Tree.getinstrucciones()) {

        if (i instanceof Errores) {
          listaErrores.push(i);
        }
      }

      init.agregarHijoAST(instrucciones);

      let sim_string = JSON.stringify(init);
      localStorage.setItem("simbolos", sim_string);
      const gramat = Gramatical;
      const gramar = gramat.parse(texto);
      localStorage.setItem("gramatica", gramar);
      console.log(listaErrores)

      let errores = JSON.stringify(listaErrores);
      localStorage.setItem("errores", errores);




      var reco = Tree.getSimbolos();
      let tabla = JSON.stringify(reco);
      localStorage.setItem("symbol", tabla);

      /**M A N E J O   E R R O R  S I N T A C T I C O */
      let errorsito = Analizador;
      let errorts = errorsito.parse(texto);


      //console.log(listaErrores);
    } catch (error) {
      if (error instanceof ReferenceError) {
        let errores = JSON.stringify(listaErrores);
        localStorage.setItem("errores", errores);
      }
    } finally {
      let errores = JSON.stringify(listaErrores);
      localStorage.setItem("errores", errores);
    }

    
  }

  llenarTablaSimbolos(t: tablaSimbolos, tri: Arbol) {

    for (var key of t.tablaActual) {
      var atributos = "";
      var entorno = Ambito;
      var listaobjetitos = "";
      var contenido = "";
      var tipo = "";
      var linea = key.getLinea();
      var columna = key.getColumna();
      var nombre = key.getidentificador();
      var cd3direcciones= key.setcd3Value();
      /*for (var [key2, value2,] of key.getAtributo()) {
        nombre = key.getidentificador();
        if (key.getAtributo() != null) {
          atributos += ` ${key2}=>${value2}, `;
          if (nombre != null) {
            if (nombre == key.getidentificador()) {
              nombre += atributos;
            } else {
              nombre = atributos;
            }
          }
        }
      }*/
      let objetos = key.getvalor();
      if (objetos instanceof tablaSimbolos) {
        for (var key3 of objetos.tablaActual) {
          listaobjetitos += `${key3.getidentificador()}, `
          if(listaobjetitos!=null){
            
            Ambito=nombre
            
            //entorno=listaobjetitos;
           // console.log(entorno);
          }else{
            console.log("ENTRA AL ELSE")
            Ambito=key3.getidentificador()
          }
        }
        
        Ambito=nombre
        listaobjetitos=""
        this.llenarTablaSimbolos(objetos, tri);
      } else {
        contenido = objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"");
        
  

      }
      if (key.gettipo().getTipo() == 1) {
        tipo = "Objeto";
      } else {
        tipo = "Atributo";
      }

      var Reporte = new reporteTabla(nombre, tipo, entorno, contenido, linea, columna, cd3direcciones);
      tri.listaSimbolos.push(Reporte);

    }
  }

  /*A R B O L  D E S C E N D E N T E */

  interpretarContenidoDesc(texto: string) {
    listaErrores = new Array<Errores>();
    if (texto == null) return document.write('Error');
    const analizador = AnalizadorD;
    const objetos = analizador.parse(texto);
    const tablaGlobal: tablaSimbolos = new tablaSimbolos();
    var Tree: Arbol = new Arbol([objetos]);
    Tree.settablaGlobal(tablaGlobal);
    console.log(tablaGlobal);
    //  PARA GUARDAR DATOS

    // TODO FOR INTERPRETAR

    var init2 = new nodoAST("RAIZ");
    var instrucciones = new nodoAST("HIJOS");
    for (let i of Tree.getinstrucciones()) {
      instrucciones.agregarHijoAST(i.getNodo());

    }
    for (let i of Tree.getinstrucciones()) {
      /*if (i instanceof Errores) {
        listaErrores.push(i);
      }*/
    }

    init2.agregarHijoAST(instrucciones);

    let sim_string = JSON.stringify(init2);
    localStorage.setItem("simbolos1", sim_string);
    const gramat = GramaticalDes;
    const gramar = gramat.parse(texto);
    localStorage.setItem("gramatica1", gramar);


    //console.log(gramar);
  }
  /*********************************************************************************************************/
  /***********************************************XPATH ASCENDENTE******************************************/
  /*********************************************************************************************************/


  EjecutarAsc(texto: string) {

    // if (texto == null) return document.write('Error');
    const analizador = AnalizarAscXpath;
    let objetos = analizador.parse(texto);
    let ast = new ArbolXpath(analizador.parse(texto)); //ejecucion
    console.log(listainstrucciones)
    var Tree: ArbolXpath = new ArbolXpath([objetos]);
    var tabla = new tablaSimbolos();                    //ejecucion
    ast.settablaGlobal(tabla);                        //ejecucion
    var tablita = this.tablaGlobal;
    var c = 0;
    var consolita = ''

    for (var key of tablita.getTabla()) {//SIMBOLOS
      if (key.getidentificador() == 'xml') {
        tablita = key.getvalor()
      }
    }
    console.log(ast.getinstrucciones().length)
    for (let index = 0; index < ast.getinstrucciones().length; index++) {
      const instructions = ast.getinstrucciones()[index];

      instructions.forEach(element => {
        c++
        console.log(element)
        if (element instanceof BarrasNodo) {
          console.log("es barranodo")
          var resultador = element.interpretar(Tree, tablita);
          if (resultador instanceof tablaSimbolos) {
            tablita = resultador
            if (c == instructions.length) {
              consolita += this.recorrerTabla(tablita);
              consolita += "\n"
            }
          }
          else { //VIENE STRING
            consolita += resultador + "\n"
          }
        }
      });
      c = 0;
      console.log("SIGUIENTE")
    }



    this.mostrarContenido(consolita, 'resultado');


  }


  ciclogetInstuciones(i: any, numero: number, Tree: ArbolXpath, tablita: tablaSimbolos, ast: ArbolXpath, consolita: string) {
    if (i[numero] != null) {

      if (i[numero] instanceof BarrasNodo) {
        let temp: BarrasNodo = i[numero]
        var resultador = temp.interpretar(Tree, tablita)
        if (resultador instanceof tablaSimbolos) {
          tablita = resultador
          if (numero == ast.getinstrucciones().length) {
            consolita = this.recorrerTabla(tablita);
          } else {
          }
        }
        else { //VIENE STRING
          consolita = resultador
        }
      }
    }
  }

  ArbolAscAST(texto: string) {
    if (texto == null) return document.write('Error');
    const analizador = AnalizarDscXpath;
    const objetos = analizador.parse(texto);
    var Tree: ArbolXpath = new ArbolXpath([objetos]);
    //GRAFICAS
    var instrucciones = new nodoAst("INSTRUCCIONES");
    var contador = 0;

    for (let i of Tree.getinstrucciones()) {
      this.ciclo(i, contador, instrucciones)
    }

    let sim_string = JSON.stringify(instrucciones);
    localStorage.setItem("astpath", sim_string);
    //TERMINA GRAFICAS
  }

  /*ESTE MUESTRA LOS CICLOS PARA COLOCAR EL ARBOL AST CON GETNODO*/
  ciclo(i: any, numero: number, instruc: nodoAst) {
    if (i[numero] != null) {

      if (i[numero] instanceof BarrasNodo) {
        let temp: BarrasNodo = i[numero]

        instruc.agregarHijoAST(temp.getNodosAST())
      }
      if (i[numero] instanceof Axes) {
        let temp: Axes = i[numero]
        instruc.agregarHijoAST(temp.getNodosAST())
      }
      numero++
      this.ciclo(i, numero, instruc);
    }
  }
  /*********************************************************************************************************/
  /***********************************************XPATH DESCENDENTE*****************************************/
  /*********************************************************************************************************/
  EjecutarDesc(texto: string) {
    if (texto == null) return document.write('Error');
    const analizador = AnalizarDscXpath;
    const objetos = analizador.parse(texto);
    var Tree: ArbolXpath = new ArbolXpath([objetos]);



    var instrucciones = new nodoAst("INSTRUCCIONES");
    var contador = 0;


    for (let i of Tree.getinstrucciones()) {
      this.ciclo(i, contador, instrucciones)
    }


    let sim_string = JSON.stringify(instrucciones);
    localStorage.setItem("astpath", sim_string);
  }
  /****************************************************************************************************************/

  textoEsperado = '';
  textInputChange(fileInputEvent: any) {
    var archivo = fileInputEvent.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = (e) => {
      var contenido = e.target.result;
      this.mostrarContenido(contenido, 'contenido');
    };
    lector.readAsText(archivo);
  }


  mostrarContenido(contenido, identificador) {
    var elemento = document.getElementById(identificador);
    elemento.innerHTML = contenido;
  }

  generarAst() {
    this.inicioSrv.graficarAst().subscribe((res) => {
      if (res.msg == false) {
        alert('ALGO FALLO EN EL GRAFICO');
      } else {
        this.presentAlert();
      }
    });
  }
  presentAlert() {
    // #docregion focus-restoration
    this.dialog.open(Pruebas, {});
  }
  recorrerTabla(t: tablaSimbolos) {
    var salida = ''
    for (var key of t.tablaActual) {

      var listaobjetitos = "";

      let objetos = key.getvalor();
      if (objetos instanceof tablaSimbolos) {
        for (var key3 of objetos.tablaActual) {
          listaobjetitos += `${key3.getidentificador()}, `
        }

        salida += this.recorrerTabla(objetos);

      } else {
        salida += objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
      }
    }
    return salida;

  }
}



@Component({
  selector: 'contenido-dialog',
  templateUrl: './contenido-dialog-component.html',
})
export class Pruebas { }