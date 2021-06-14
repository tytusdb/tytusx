import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Errores from 'src/app/Backend/XML/Analizador/Excepciones/NodoErrores';
import tablaSimbolos from 'src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos';
import { InicioService } from 'src/app/servicios/inicio.service';
import * as Analizador from 'src/app/Backend/XML/Analizador/GramaticaXML';
import * as AnalizadorD from 'src/app/Backend/XML/Analizador/GramaticaXMLDescPRUEBA';
import * as Gramatical from 'src/app/Backend/XML/Analizador/XMLgraph'
import Simbolo from 'src/app/Backend/XML/Analizador/Simbolos/Simbolo';
import Tipo, { tipoDato } from 'src/app/Backend/XML/Analizador/Simbolos/Tipo';
import Arbol from 'src/app/Backend/XML/Analizador/Simbolos/Arbol';
import nodoAST from 'src/app/Backend/XML/Analizador/Abstracto/nodoAST';
import { Instruccion } from 'src/app/Backend/XML/Analizador/Abstracto/Instruccion';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import NodoErrores from 'src/app/Backend/XML/Analizador/Excepciones/NodoErrores';
import Objeto from 'src/app/Backend/XML/Analizador/Expresiones/Objeto';

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
  code = '';
  contenido = '';
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.data = JSON.parse(localStorage.getItem('contenido'));
    if (this.data != '' || this.data != undefined) {
      this.mostrarContenido(this.data.text, 'contenido');
      this.mostrarContenido(this.data.console, 'consolas');
    }
  }
  data;

  colocarConsola(res, texto) {
    const dataObject = {
      text: 'asd',
      console: 'res',
    };
    localStorage.setItem('contenido', JSON.stringify(dataObject));
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
    try{ 
    const analizador = Analizador;
    const objetos = analizador.parse(texto);
    const tablaGlobal: tablaSimbolos = new tablaSimbolos();
    var Tree:Arbol = new Arbol([objetos]);
    Tree.settablaGlobal(tablaGlobal);
    console.log(tablaGlobal);
    //  PARA GUARDAR DATOS
    

    // TODO FOR INTERPRETAR
    for( let i of Tree.getinstrucciones()){
      if(i instanceof Objeto){
        var objetito=i.interpretar(Tree,tablaGlobal); //retorna simbolo
        tablaGlobal.setVariable(objetito);
      }
    }
    console.log(tablaGlobal);
    var init = new nodoAST("RAIZ");
    var instrucciones = new nodoAST("HIJOS");
    for(let i of Tree.getinstrucciones()){
      instrucciones.agregarHijoAST(i.getNodo());
      
    }
    for(let i of Tree.getinstrucciones()){

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

    let errores=JSON.stringify(listaErrores);
    localStorage.setItem("errores",errores); 

    /**M A N E J O   E R R O R  S I N T A C T I C O */
    let errorsito=Analizador;
    let errorts=errorsito.parse(texto);
   
     
    //console.log(listaErrores);
  }catch(error){
    if(error instanceof ReferenceError){
      let errores=JSON.stringify(listaErrores);
      localStorage.setItem("errores",errores); 
    }
  }finally{
    let errores=JSON.stringify(listaErrores);
      localStorage.setItem("errores",errores); 
  }
    
    //console.log(gramar);
  }

    /*A R B O L  D E S C E N D E N T E */

  interpretarContenidoDesc(texto: string) {
    listaErrores = new Array<Errores>();
    if (texto == null) return document.write('Error');
    const analizador = AnalizadorD;
    const objetos = analizador.parse(texto);
    const tablaGlobal: tablaSimbolos = new tablaSimbolos();
    var Tree:Arbol = new Arbol([objetos]);
    Tree.settablaGlobal(tablaGlobal);
    console.log(tablaGlobal);
    //  PARA GUARDAR DATOS

    // TODO FOR INTERPRETAR

    var init2 = new nodoAST("RAIZ");
    var instrucciones = new nodoAST("HIJOS");
    for(let i of Tree.getinstrucciones()){
      instrucciones.agregarHijoAST(i.getNodo());
      
    }
    for(let i of Tree.getinstrucciones()){
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
}

@Component({
  selector: 'contenido-dialog',
  templateUrl: './contenido-dialog-component.html',
})
export class Pruebas {}
