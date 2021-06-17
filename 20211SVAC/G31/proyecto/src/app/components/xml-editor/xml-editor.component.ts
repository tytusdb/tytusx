import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service'
import { parser as parserAscendente } from 'src/app/utils/gramaticaXML/ascendente.js';
import { parser as parserDescendente } from 'src/app/utils/gramaticaXML/descendente.js'

import { ArbolXML } from 'src/app/models/xmlArbol.model';
import { Entorno } from 'src/app/controllers/xml/entorno.controller';
import { Simbolo } from 'src/app/controllers/xml/simbolo.controller';
import { ExpressionTranslatorVisitor } from '@angular/compiler-cli/src/ngtsc/translator';
import { Objeto } from 'src/app/controllers/xml/objeto.controller';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-xml-editor',
  templateUrl: './xml-editor.component.html',
  styles: []
})
export class XmlEditorComponent implements OnInit {
  public options: Object;
  public content: string;
  public arbol: ArbolXML | undefined;

  private file!: File;

  constructor(private _data: DataService, private _snackBar: MatSnackBar) {
    this.options = this.optionsEditor();
    this.content = '';
    this.arbol = undefined;
  }

  ngOnInit(): void {
    this._data.currentXML.subscribe(xml => this.arbol = xml);
  }

  private optionsEditor(): Object {
    return {
      theme: 'dracula',
      mode: 'application/xml',
      lineNumbers: true,
      lineWrapping: false,
      foldGutter: true,
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter',
        'CodeMirror-lint-markers'
      ],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true,
    };
  }

  public cargar(event: any): void {
    this.file = event.target.files[0];
    this.cargarArchivo();
  }

  private cargarArchivo(): void {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result != null) {
        this.content = fileReader.result.toString();
      }
    }
    fileReader.readAsText(this.file);
  }

  public guardar(): void {
    this.guardarArchivo(this.content, 'text/xml', 'entradaXML.xml');
  }

  private guardarArchivo(contenido: string, tipo: string, nombre: string): void {
    let a = document.createElement('a');
    let file = new Blob([contenido], { type: tipo });
    a.href = URL.createObjectURL(file);
    a.download = nombre;
    a.click();
  }

  public ejecutarASC(): void {
    console.log(this.content);
    this.arbol = <ArbolXML>parserAscendente.parse(this.content);
    let entorno = this.inicializarTabla();
    this.arbol.tabla = entorno;
    this.cargarReportes();
  };

  public ejecutarDESC(): void {
    console.log(this.content);
    this.arbol = <ArbolXML>parserDescendente.parse(this.content);
    let entorno = this.inicializarTabla();
    this.arbol.tabla = entorno;
    this.cargarReportes();
  };

  private inicializarTabla(): Entorno | any {
    if(this.arbol != undefined){
      console.log(this.arbol.excepciones)
      if(this.arbol.excepciones.length == 0){
        let entornoGlobal = new Entorno(null);
        entornoGlobal = this.arbol.inicializarTabla(this.arbol.objetos, entornoGlobal, this.arbol, 'global');
        return entornoGlobal
      }
    }
    return null
  }

  public cargarReportes(): void {
    this.limpiarReportes();
    console.log(this.arbol);

    if(this.cargarErrores()){
      this._snackBar.open('Error durante el analisis de XML', 'CERRAR', { duration: 2500 });
      return
    }else{
      if(this.arbol != undefined){

        this._data.changeCST(this.arbol.getCST());
        this._data.changeGramatical(this.arbol.gramatica);
        this._data.changeSimbolos(this.arbol.simbolos)
      }
    }
  }

  private cargarErrores(): boolean {
    if(this.arbol != undefined){
      if(this.arbol.excepciones.length > 0){
          this._data.changeExcepciones(this.arbol.excepciones);
        return true
      }else{
        return false
      }
    }
    return false
  }

  public limpiarReportes(): void {
    this._data.changeGramatical('');
    this._data.changeAST({ name: 'RAIZ'});
    this._data.changeCST({ name: 'RAIZ'});
    this._data.changeExcepciones([]);
    this._data.changeSimbolos([]);
    this._data.changeConsola('');
  }
}
