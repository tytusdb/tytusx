import { Component } from '@angular/core';

import * as XMLasc from '../../../analizadorXML/index';
import * as XMLdesc from '../../../analizadorXML/indexDesc';
import * as XPATHasc from '../../../analizadores/index';
import * as XPATHdesc from '../../../analizadores/indexDesc';
import * as XQUERYasc from '../../../analizadorXQUERY/index';
import { ReporteService } from '../../reporte.service';

import { Router } from '@angular/router';
import { xpathBusqueda } from '../../../analizadorXML/Instrucciones/Busqueda/xpathBusqueda';
import { xml3D } from '../../../analizadorXML/Codigo3D/xml3D';

declare const Buffer

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  constructor(public _servicio: ReporteService, private _router: Router) { }

  title = 'interfaz';

  //editor query
  querys: any = `declare function local:ackerman($m as xs:integer, $n as xs:integer ) as xs:integer {
  if ($m = 0) then $n+1
  else if ($m gt 0 and $n = 0) then local:ackerman($m - 1, 1)
  else local:ackerman ($m - 1, local:ackerman($m, $n - 1))
};
  
local:ackerman(/pruebas/m, /pruebas/n)`;
  editorQueryOptions: any = {
    theme: 'gruvbox-dark',
    mode: "application/xquery",
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  }

  //editor XML entrada
  xmlEntrada: any = `<?xml version="1.0" encoding="UTF-8"?>

<pruebas>
  <m>2</m>
  <n>1</n>
</pruebas>`;
  editorXMLEntradaOptions: any = {
    theme: 'gruvbox-dark',
    mode: "application/xml",
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  }

  //editor XML Salida
  xmlSalida: any = "XML Salida";
  editorXMLSalidaOptions: any = {
    theme: 'gruvbox-dark',
    mode: "application/xml",
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  }

  salida3D: string = "Salida del codigo de tres direcciones";
  editor3DSalidaOptions: any = {
    theme: 'gruvbox-dark',
    mode: "text/x-csrc",
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };

  //reportes
  tablaXML: any[] = [];
  cstXML: string = "";
  bnfXML: any[] = [];
  encodingXML: any = "";
  erroresXML: any[] = [];
  erroresXPATH: any[] = [];

  queryMod: string = "";

  bnfXpath: any[] = [];
  astXpath:string = "";
  cstXpath: string = "";

  astXquery: string = "";
  cstXquery: string = ``;
  tablaXquery: any[] = [];
  bnfXquery: any[] = []

  //reportesVisualizacion
  grafo:boolean = false;
  bnf: boolean = false;
  tabla: boolean = false;
  tabla2: boolean = false;
  error: boolean = false;

  //tabla de simbolos
  simbolos:any;

  ngOnInit(){
    localStorage.clear();

  }

  abrirXML(files: FileList) {
    this.xmlEntrada = files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.xmlEntrada = fileReader.result;
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.xmlEntrada);
  }

  ejecutarXquery() {
    localStorage.clear();
    localStorage.setItem("xml", this.xmlEntrada);
    let ascXquery = new XQUERYasc.AnalizadorXquery();
    let ret = ascXquery.ejecutarCodigo(this.querys);

    this.astXquery = ret.ast
    this.cstXquery = ret.cst
    this.tablaXquery = ret.tabla
    this.bnfXquery = ret.bnf;
    this.salida3D = ""
    for (let i = 0 ; i < ret.salida3d.length; i++) {
      this.salida3D += ret.salida3d[i];
      this.salida3D += "\n\n\n" 
    }

    this.xmlSalida = "";
    for(let i = 0; i < ret.consola.length; i++){
      this.xmlSalida += ret.consola[i] + "\n";
    }
  }

  ejecutarAscendente(){
    this.botarReportes();
    localStorage.clear();
    
    let ascXML = new XMLasc.AnalizadorASCXML();
    let ascXpath = new XPATHasc.AnalizadosAscXpath();
    let ret = ascXML.ejecutarCodigo(this.xmlEntrada);
    let ret1 = ascXpath.ejecutarCodigo(this.querys);

    this.simbolos = ret.objetos;
    this.tablaXML = ret.tablaRep;
    this.cstXML = ret.cstRep;
    this.bnfXML = ret.bnfRep;
    this.encodingXML = ret.encoding;
    this.erroresXML = ret.errores;
    this.queryMod = ret1.ejecutado;
    this.bnfXpath = ret1.bnfRep;
    this.astXpath = ret1.astRep;
    this.cstXpath = ret1.cstRep;
    this.erroresXPATH = ret1.errores;

    this.obtenerConsulta(this.queryMod, this.simbolos);

    alert("Analisis concluido");
  }

  obtenerConsulta(query: string, tabla: any){
    var buscador: xpathBusqueda = new xpathBusqueda();

    var texto: string = ""
    if(query.includes("|")) {
      var multiple = buscador.getNodesByFilters("3", query, tabla);
      this.xmlSalida = ""
      for (let i = 0; i < multiple.length; i++){
        texto += multiple[i]
        texto += "\n"
      }
    }else if(query[0] !== "/" && query[0] !== "//"){
      texto = buscador.getNodesByFilters("1", query, tabla)
    }else{
      texto = buscador.getNodesByFilters("2", query, tabla)

    }
    const dir = new xml3D();
    this.salida3D = dir.getNodesByFilters(tabla, 0, buscador.returnListValues());
    //var buf = Buffer.from(texto);
    this.xmlSalida = texto//buf.toString(this.encoding()); 
  }

  ejecutarDescendente() {
    this.botarReportes();
    localStorage.clear();

    let descXML = new XMLdesc.AnalizadorASCXML();
    let descXPATH = new XPATHdesc.AnalizadosAscXpath();
    let ret = descXML.ejecutarCodigo(this.xmlEntrada);
    let ret1 = descXPATH.ejecutarCodigo(this.querys);

    this.simbolos = ret.objetos;
    this.tablaXML = ret.tablaRep;
    this.cstXML = ret.cstRep;
    this.bnfXML = ret.bnfRep;
    this.erroresXML = ret.errores;
    this.queryMod = ret1.ejecutado;
    this.bnfXpath = ret1.bnfRep;
    this.astXpath = ret1.astRep;
    this.cstXpath = ret1.cstRep;
    this.erroresXPATH = ret1.errores;
    this.encodingXML = ret.encoding;

    this.obtenerConsulta(this.queryMod, this.simbolos);

    alert("Analisis concluido");
  }

  botarReportes() {
    this.grafo = this.bnf = this.tabla = this.error = this.tabla2 = false;
  }

  reporteASTXQUERY() {
    this.botarReportes();
    localStorage.clear();
    console.log(this.astXquery)
    localStorage.setItem('grafo', this.astXquery);
    this.grafo = true;
  }

  reporteCSTXQUERY() {
    this.botarReportes();
    localStorage.clear();
    localStorage.setItem('grafo', this.cstXquery);
    this.grafo = true;
  }

  reporteTablaXQUERY() {
    this.botarReportes();
    localStorage.clear();
    console.log(this.tablaXquery);
    localStorage.setItem('tablaXquery', JSON.stringify(this.tablaXquery));
    this.tabla2 = true;
  }

  reporteBNFXQUERY() {
    this.botarReportes();
    localStorage.clear();
    console.log(this.bnfXquery)
    localStorage.setItem('bnf', JSON.stringify(this.bnfXquery));
    this.bnf = true;
  }

  reporteTablaSimbolosXML() {
    this.botarReportes();
    localStorage.clear();
    localStorage.setItem('tablaXML', JSON.stringify(this.tablaXML));
    this.tabla = true;
    //window.open("tablaSimbolosXML", "_blank")
  }

  reporteCSTXML() {
    this.botarReportes();
    localStorage.clear();
    localStorage.setItem('grafo', this.cstXML);
    this.grafo = true;
    //window.open("grafico", "_blank")
  }

  reporteBNFXML() {
    this.botarReportes();
    localStorage.clear();
    localStorage.setItem('bnf', JSON.stringify(this.bnfXML));
    this.bnf = true;
    //window.open("bnf", "_blank")
  }

  reporteBNFXPATH() {
    this.botarReportes();
    localStorage.clear();
    localStorage.setItem('bnf', JSON.stringify(this.bnfXpath));
    this.bnf = true;
    //window.open("bnf", "_blank")
  }

  reporteASTXPATH() {
    this.botarReportes();
    localStorage.clear()
    localStorage.setItem('grafo', this.astXpath);
    this.grafo = true
    //window.open("grafico", "_blank")
  }

  reporteCSTXPATH() {
    this.botarReportes();
    localStorage.clear()
    localStorage.setItem('grafo', this.cstXpath);
    this.grafo= true;
    // window.open("grafico", "_blank")
  }

  reporteErroresXML() {
    this.botarReportes();
    localStorage.clear()
    localStorage.setItem('errores', JSON.stringify(this.erroresXML));
    this.error = true;
  }

  reporteErroresXPATH() {
    this.botarReportes();
    localStorage.clear()
    localStorage.setItem('errores', JSON.stringify(this.erroresXPATH));
    this.error = true;
  }

  encoding(): string {
    this.encodingXML = this.encodingXML.toLowerCase();
    if (this.encodingXML.includes("utf8")){
      return "utf8"
    }else if(this.encodingXML.includes("ascii")){
      return "ascii"
    }else if(this.encodingXML.includes("utf16")){
      return "utf16"
    }else if(this.encodingXML.includes("ucs")){
      return "ucs2"
    }else if(this.encodingXML.includes("base")){
      return "base64"
    }else if(this.encodingXML.includes("binary")){
      return "binary"
    }else if(this.encodingXML.includes("hex")){
      return "hex"
    }
    return "utf8"
  }

}
