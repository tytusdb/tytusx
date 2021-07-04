import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompiladorService } from 'src/app/services/compilador.service'
import { saveAs } from 'file-saver'
import { DomSanitizer } from '@angular/platform-browser';
import * as vis from "vis";


import { Buffer } from 'buffer/';
//importamos para el editor
import { filter, take } from 'rxjs/operators';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { interpolateCividis } from 'd3';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  nombreArchivo = "Choose file"
  archivo: any
  reporteSelccionado: string = ""

  textoEditores: string[] = [""]
  ReporteGramatica: any
 
  XPATH :string []=[""]
  indiceEditorActual = 0
  console: string = "";
  xpath: string = "";
  astJson: any
  Error:any;
  tablaSimbolos: any
  astBase64: any

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent = new MonacoEditorComponent(this.monacoLoaderService);
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: '',
    roundedSelection: true,
    autoIndent: "full"
  };

  consoleOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: 'XML',
    roundedSelection: true,
    autoIndent: "full",
    readOnly: true
  };
  XpathOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: '',
    roundedSelection: true,
    autoIndent: "full",
    readOnly: true
  };
  constructor(private sanitizer: DomSanitizer, private monacoLoaderService: MonacoEditorLoaderService,
    private compiladorService: CompiladorService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark', // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: 'comment',
              foreground: 'ffa500',
              fontStyle: 'italic underline'
            },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
          ],
          colors: {}
        });
      });
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 500,
      endLineNumber: 3
    });
  }

  ngOnInit(): void {
  }

  compilar() {
    this.console = ""
     console.log(this.XPATH[this.indiceEditorActual])
    this.xpath = ""
    this.astJson = []
    this.tablaSimbolos = this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).simbolo
   // this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual])
   // viz("string en dot")
   // format: 'png-image-element'
    /*   this.console = res.consola
      this.astJson = res.arbol
      this.tablaSimbolos = res.tablaSimbolos
      this.astBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image;base64, ${res.astBase64}`)
    */

      this.ReporteGramatica=this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).ReporteGramatica
console.log("Encoding:::::::::::::::::::"+this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).Encoding)
let ascii="\"ASCII\""  

if  (this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).Encoding==ascii){
    var buf = new Buffer(this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).consulta)
this.console=buf.toString("ascii")

console.log("adentro del ascii") 

  }
  else if (this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).Encoding==="ISO-8859-1"){
    var buf = new Buffer(this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).consulta)
    this.console=buf.toString("utf8")
    
  } //

  else if (this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).Encoding==="\"UFT-8\" ")
  
  {

    var buf = new Buffer(this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).consulta)
  this.console=buf.toString("utf8")
 

  }
  else {
    //  this.console=buf.toString("utf8")
    //console.log("adentro del utf 8") 
    
  //  console.log("adentro del utf 8") 
   // this.console.l
   let aux="  <TITLE>&apos;Esto tiene que salir muy bien tambien&apos;</TITLE>"
    var incov = require('iconv-lite');
    this.console=  incov.decode(aux, "utf-8");
   console.log(this.console)

  }
     this.Error=(this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).Error)
  
  this.prueba(this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).cst);

  }
  compilarD() {
    this.console = ""
     console.log(this.XPATH[this.indiceEditorActual])
    this.xpath = ""
    this.astJson = []
    this.tablaSimbolos = this.compiladorService.analizarD(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).simbolo
   // this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual])
   // viz("string en dot")
   // format: 'png-image-element'
    /*   this.console = res.consola
      this.astJson = res.arbol
      this.tablaSimbolos = res.tablaSimbolos
      this.astBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image;base64, ${res.astBase64}`)
    */

      this.ReporteGramatica=this.compiladorService.analizarD(this.textoEditores[this.indiceEditorActual] ,this.XPATH[this.indiceEditorActual] ).ReporteGramatica
    this.console=(this.compiladorService.analizarD(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).consulta)
    this.Error=(this.compiladorService.analizarD(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).Error)
  
  this.prueba(this.compiladorService.analizarD(this.textoEditores[this.indiceEditorActual],this.XPATH[this.indiceEditorActual]).cst);

  }
  seleccionarArchivo(event: any) {
    this.nombreArchivo = event.target.files[0].name
    this.archivo = event.target.files[0]
  }
  prueba (grafo:string){
 //   console.log("grafo0000000"+grafo)

    const container = document.getElementById("app");
    // provide data in the DOT language
    var DOTstring = grafo;
    var parsedData = vis.network.convertDot(DOTstring);
    var options = parsedData.options;
    options["physics"] = {
      enabled: false
    };
    
    options["layout"] = {
      improvedLayout: true,
      hierarchical: {
        enabled: true,
        levelSeparation: 150,
        treeSpacing: 35,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: "UD",
        sortMethod: "directed"
      },
      font: {
          size: 15,
          color: 'gray'
      },
      borderWidth: 2
    };
    
    
    
    var network = new vis.Network(container, parsedData, options);
    
    network.on("stabilizationIterationsDone", function () {
      network.setOptions({ physics: false });
    });
  
  
  
  }

  cargarArchivo() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result!.toString().trim();
      this.textoEditores[this.indiceEditorActual] = text
    }
    reader.readAsText(this.archivo);
  }

  agregarTab() {
    this.textoEditores.push("")
    this.indiceEditorActual = this.textoEditores.length - 1
  }

  eliminarEditor(i: number) {
    if (i != 0) {
      this.textoEditores.splice(i, 1)
      this.indiceEditorActual = 0
    } else {
      this.textoEditores[0] = ""
    }
  }

  guardar() {
    var file = new File([this.textoEditores[this.indiceEditorActual]], "Codigo.ty", {
      type: "text/plain",
    });
    saveAs(file)
  }

  selectReporte(opcion: string) {
    this.reporteSelccionado = opcion

  }

  imprimir() {
  }

}
