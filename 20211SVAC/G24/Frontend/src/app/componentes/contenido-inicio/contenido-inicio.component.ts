import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Errores from 'src/app/Backend/XML/Analizador/Excepciones/NodoErrores';
import tablaSimbolos from 'src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos';
import { InicioService } from 'src/app/servicios/inicio.service';
import * as Analizador from 'src/app/Backend/XML/Analizador/GramaticaXML';
import * as AnalizadorD from 'src/app/Backend/XML/Analizador/GramaticaXMLDescPRUEBA';
import * as AnalizarAscXpath from 'src/app/Backend/XPATH/Analizador/GramaticaXPath'
import * as Gramatical from 'src/app/Backend/XML/Analizador/XMLgraph'
import Simbolo from 'src/app/Backend/XML/Analizador/Simbolos/Simbolo';
import Tipo, { tipoDato } from 'src/app/Backend/XML/Analizador/Simbolos/Tipo';
import Arbol from 'src/app/Backend/XML/Analizador/Simbolos/Arbol';
import ArbolXpath from 'src/app/Backend/XPATH/Analizador/Simbolos/Arbol';
import nodoAST from 'src/app/Backend/XML/Analizador/Abstracto/nodoAST';
import nodoAst from 'src/app/Backend/XPATH/Analizador/Abstracto/nodoAST'
import { Instruccion } from 'src/app/Backend/XPATH/Analizador/Abstracto/Instruccion';

import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import NodoErrores from 'src/app/Backend/XML/Analizador/Excepciones/NodoErrores';
import Objeto from 'src/app/Backend/XML/Analizador/Expresiones/Objeto';

import { reporteTabla } from 'src/app/Backend/XML/Analizador/Reportes/reporteTabla';
import { table } from 'console';

import Identificador from 'src/app/Backend/XPATH/Analizador/Expresiones/Identificador';
import BarrasNodo from 'src/app/Backend/XPATH/Analizador/Instrucciones/BarrasNodo';
import { type } from 'os';
import { parser } from 'GramaticaXML';


export let listaErrores: Array<NodoErrores>;

@Component({
  selector: 'app-contenido-inicio',
  templateUrl: './contenido-inicio.component.html',
  styleUrls: ['./contenido-inicio.component.css'],
})
export class ContenidoInicioComponent implements OnInit {
  constructor(private inicioSrv: InicioService, private dialog: MatDialog) {
    this.code = 'asd';
  }
  tablaGlobal: tablaSimbolos = new tablaSimbolos();
  code = '';
  contenido = '';
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.data = JSON.parse(localStorage.getItem('contenido'));
    if (this.data != '' || this.data != undefined) {
      this.mostrarContenido(this.data.console, 'consolas');
    }
  }
  data;

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
      console.log(this.tablaGlobal);


      //  PARA GUARDAR DATOS


      // TODO FOR INTERPRETAR
      for (let i of Tree.getinstrucciones()) {
        if (i instanceof Objeto) {
          var objetito = i.interpretar(Tree, this.tablaGlobal); //retorna simbolo
          this.tablaGlobal.setVariable(objetito);
        }
      }
      console.log(this.tablaGlobal);


      for (var key of this.tablaGlobal.tablaActual) {
        //alert(key + " = " + value);
        var atributos = "";
        var listaobjetitos = "";
        var contenido = "";
        var nombre = key.getidentificador();
        for (var [key2, value2] of key.getAtributo()) {
          //alert(key + " = " + value);
          atributos += `${key2}=>${value2}, `
        }
        let objetos = key.getvalor();
        if (objetos instanceof tablaSimbolos) {
          for (var key3 of objetos.tablaActual) {
            //alert(key + " = " + value);
            listaobjetitos += `${key3.getidentificador()}, `

          }

          this.llenarTablaSimbolos(objetos, Tree);

        } else {
          contenido = objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"");
        }
        var Reporte = new reporteTabla(nombre, contenido, atributos, listaobjetitos);
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

    //console.log(gramar);
  }

  llenarTablaSimbolos(t: tablaSimbolos, tri: Arbol) {
    for (var key of t.tablaActual) {
      //alert(key + " = " + value);
      var atributos = "";
      var listaobjetitos = "";
      var contenido = "";
      var nombre = key.getidentificador();
      for (var [key2, value2] of key.getAtributo()) {
        //alert(key + " = " + value);
        atributos += `${key2}=>${value2}, `
      }
      let objetos = key.getvalor();
      if (objetos instanceof tablaSimbolos) {
        for (var key3 of objetos.tablaActual) {
          //alert(key + " = " + value);
          listaobjetitos += `${key3.getidentificador()}, `
        }

        this.llenarTablaSimbolos(objetos, tri);

      } else {
        contenido = objetos.replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"");
      }
      var Reporte = new reporteTabla(nombre, contenido, atributos, listaobjetitos);
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
    const gramat = Gramatical;
    const gramar = gramat.parse(texto);
    localStorage.setItem("gramatica1", gramar);


    //console.log(gramar);
  }
  /*********************************************************************************************************/
  /***********************************************XPATH ASCENDENTE******************************************/
  /*********************************************************************************************************/
  EjecutarAsc(texto: string) {

    if (texto == null) return document.write('Error');
    const analizador = AnalizarAscXpath;
    let objetos = analizador.parse(texto);
    let ast = new ArbolXpath(analizador.parse(texto)); //ejecucion
    var Tree: ArbolXpath = new ArbolXpath([objetos]);
    var tabla = new tablaSimbolos();                    //ejecucion
    ast.settablaGlobal(tabla);                        //ejecucion
    var tablita = this.tablaGlobal;
    var c = 0;
    var consolita=''

    for (var key of tablita.getTabla()) {//SIMBOLOS
      if(key.getidentificador() == 'xml'){
        tablita = key.getvalor()
      } 
    }
    for (let i of ast.getinstrucciones()) {             //ejecucion  
      c++;
      if (i instanceof BarrasNodo) {
        var resultador = i.interpretar(Tree, tablita);
        console.log(resultador);
        console.log("estamos en barra nodo")
        if (resultador instanceof tablaSimbolos) {
          tablita = resultador
          if (c == ast.getinstrucciones().length) {
            consolita = this.recorrerTabla(tablita);
          }
        }
        else { //VIENE STRING
          consolita = resultador
        }
        //var consolita = localStorage.getItem('consulta');
      }
    }

    this.mostrarContenido(consolita, 'resultado');

    var instrucciones = new nodoAst("INSTRUCCIONES");
    var contador = 0;


    for (let i of Tree.getinstrucciones()) {
      this.ciclo(i, contador, instrucciones)
    }


    let sim_string = JSON.stringify(instrucciones);
    localStorage.setItem("astpath", sim_string);
  }

  ciclo(i: any, numero: number, instruc: nodoAst) {
    if (i[numero] != null) {

      if (i[numero] instanceof BarrasNodo) {
        let temp: BarrasNodo = i[numero]
        instruc.agregarHijoAST(temp.getNodosAST())
      }
      numero++
      this.ciclo(i, numero, instruc);
    }
  }
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