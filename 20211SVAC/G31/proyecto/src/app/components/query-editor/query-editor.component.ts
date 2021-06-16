import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from 'src/app/services/data.service'
import { parser as ParserAscendente } from 'src/app/utils/gramatica-xpath/ascendente';
import { parser as ParserDescendente } from 'src/app/utils/gramatica-xpath/descendente';

import { Arbol } from 'src/app/models/arbol.model';
import { Tabla } from 'src/app/models/tabla.model';

@Component({
  selector: 'app-query-editor',
  templateUrl: './query-editor.component.html',
  styles: []
})
export class QueryEditorComponent implements OnInit {
  public options: Object;
  public content: string;
  public arbol!: Arbol;

  private file!: File;

  constructor(
    private _snackBar: MatSnackBar,
    private _data: DataService
  ) {
    this.options = this.optionsEditor();
    this.content = '';
  }

  ngOnInit(): void { }

  private optionsEditor(): Object {
    return {
      theme: 'dracula',
      mode: 'application/xquery',
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

  public guardar() {
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
    this.arbol = <Arbol>ParserAscendente.parse(this.content);
    this.ejecucion();
  };

  public ejecutarDESC(): void {
    this.arbol = <Arbol>ParserDescendente.parse(this.content);
    this.ejecucion();
  };

  private ejecucion(): void {
    this.limpiezaReportes();
    console.log(this.arbol.instrucciones);

    this._data.changeGramatical(this.arbol.gramatica);

    if (this.cargarErrores()) {
      this._snackBar.open('Error de análisis', 'CERRAR', { duration: 2500 });
      return;
    }

    this.cargarArboles();

    //TODO ejecucion ARBOL
    const tabla: Tabla = new Tabla('Global', undefined);
    this.arbol.instrucciones.forEach(instruccion => {
      //instruccion.ejecutar(tabla, this.arbol);
    });

    this.cargarConsola();
  }

  private limpiezaReportes(): void {
    this._data.changeConsola('');
    this._data.changeGramatical('');
    this._data.changeAST({ name: 'RAIZ' });
    this._data.changeCST({ name: 'RAIZ' });
    this._data.changeExcepciones([]);
    this._data.changeSimbolos([]);
  }

  private cargarConsola(): void {
    let consola = '';
    this.arbol.consola.forEach(mensaje => {
      consola = `${consola}${mensaje}`;
    });
  }

  private cargarErrores(): boolean {
    let consola = '';
    if (this.arbol.excepciones.length > 0) {
      this._data.changeExcepciones(this.arbol.excepciones);
      this.arbol.excepciones.forEach(excepcion => {
        consola = `${consola}${excepcion}`;
      });
      this._data.changeConsola(consola);

      return true;
    }
    return false;
  }

  private cargarArboles(): void {
    if (this.arbol.excepciones.length > 0) {
      this._data.changeAST({ name: 'RAIZ' });
      this._data.changeCST({ name: 'RAIZ' });
      return;
    }
    this._data.changeAST(this.arbol.getCST());
    this._data.changeCST(this.arbol.getAST());
  }

  public cargarReportes(): void {
    if (this.arbol !== undefined) {
      this.cargarConsola();
      this.cargarErrores();
      this._data.changeGramatical(this.arbol.gramatica);
      this.cargarArboles();
    }
  }
}
