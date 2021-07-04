import { Component } from '@angular/core';
import { tablaSimbolos } from 'src/reports/tablaSimbolos';
import { entorno } from 'src/clases/ast/entorno';
import { simbolo } from 'src/clases/ast/simbolo';
import { tipo } from 'src/clases/ast/tipo';
import { ast } from '../clases/ast/ast';
import { astXpath } from '../reports/astXpath';
import { getErrores, InsertarError } from '../reports/ReportController';
import gramatical from '../reports/gramatical';
import nodo_xml from '../clases/xml/nodo_xml';
import xml from "../gramatica/xml";
import xmld from "../gramatica/xml_descendente";

import xpath from "../gramatica/xpath";
import xpathd from "../gramatica/xpath_descendente";
import ast_xpath from "../clases/ast/ast_xpath";

import { Buffer } from 'buffer';
import { nodo3d } from 'src/clases/c3d/nodo3d';
import { simbolTabla } from 'src/clases/ast/simbolTabla';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  content: string = "CODEMIRROR"
  xcode: string = ""
  /* MANEJO ARCHIVOS
  fls = new Array<archivos>()
  index_files: number = 0
  actual_file: number*/
  entornoGlobal: entorno = new entorno(null)
  nombre: string = "name_ini"
  contenido: string = "cont_ini"
  consola: string = ''
  salida: string = ""
  n_node: number
  c3d: nodo3d
  ts: Array<simbolTabla>
  /*openFile(input) {
    var x: File = input.files[0]
    if (x) {
      var reader = new FileReader()
      reader.onload = function (e) {
        let contenido = e.target.result
        document.getElementById('name').innerText = x.name 
        document.getElementById('contenido2').innerHTML = '' + contenido
      }
      reader.readAsText(x)
    } else {
      document.getElementById('contenido').innerText = "No hay archivo"
    }
  }
  /addFile() {
    let newFile = new archivos(this.index_files, document.getElementById('name').textContent, document.getElementById('contenido2').textContent)
    this.fls.push(newFile)
    this.index_files++
  }
  showFile() {
    let actual_file: archivos = this.fls[this.actual_file]
    document.getElementById('name').innerText = actual_file.nombre
    this.xcode = actual_file.contenido
  }*/

  /* Analisis Ascendente */
  analizarXml() {
    if (this.xcode !== ""){
      this.replaceCharacters()
      localStorage.removeItem('errores');
      localStorage.setItem('cst', " digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cst');
      //TRY
      let entrada = this.clearEntry(this.xcode);
        let parse_result = xml.parse(entrada);
        let result: nodo_xml = parse_result.etiqueta
        let encoding: nodo_xml = parse_result.encoding
        let reportG = parse_result.reportG;
        console.log("Analisis xml (arbol):")
        result.printNode("")
        let arbol = new ast().getArbolito(result);
        localStorage.setItem('ast', 'digraph g {\n ' + arbol + '}');
        localStorage.setItem('cst', localStorage.getItem('cst')+"}");
        // reporte gramatical
        this.tablaReportGramatical(new gramatical("","").getReporteG(reportG),"Reporte Gramatical Ascendente","reportG","TitleReportGramatical");
        // Entornos
        this.n_node = 1
        let tipo_encoding: string
        for (let atr of encoding.atributos){
          if (atr.id.toLocaleLowerCase() == "encoding"){
            tipo_encoding = atr.valor
          }
        }
        this.createEntorno(result,encoding,tipo_encoding);
        // reporte tabla de simbolos
        this.tablaSimbolosReport();
        // Fin analisis
        alert("Analisis finalizado con exito!");
      /*try {
        
      } catch (error) {
        alert("Error, no ha sido posible recuperarse!");
      }*/
    }else{
      alert("Error, Ingrese archivo a analizar!");
    }
  }

  /* Analisis descendente */
  analizarXmlDesc() {
    if (this.xcode !== ""){
      this.replaceCharacters()
      localStorage.removeItem('errores');
      localStorage.setItem('cst', "digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cst');
      try {
        let entrada = this.clearEntry(this.xcode);
        let parse_result = xmld.parse(entrada);
        let result:nodo_xml = parse_result.etiqueta;
        let encoding: nodo_xml = parse_result.encoding;
        let reportG = parse_result.reportG;
        console.log("Analisis xml (arbol descendente):")
        result.printNode("")
        let arbol = new ast().getArbolito(result);
        localStorage.setItem('ast', 'digraph g {\n ' + arbol + '}');
        localStorage.setItem('cst', localStorage.getItem('cst')+"}");
        /* reporte gramatical */
        this.tablaReportGramatical(new gramatical("","").getReporteG(reportG),"Reporte Gramatical Descendente","reportG","TitleReportGramatical");
        /* Entornos */
        this.n_node = 1
        let tipo_encoding: string
        for (let atr of encoding.atributos){
          if (atr.id.toLocaleLowerCase() == "encoding"){
            tipo_encoding = atr.valor
          }
        }
        this.createEntorno(result,encoding,tipo_encoding);
        /* reporte tabla de simbolos */
        this.tablaSimbolosReport();
        /* Fin analisis */
        alert("Analisis finalizado con exito!");
      } catch (error) {
        alert("Error, no ha sido posible recuperarse!");
      }
    }else{
      alert("Error, Ingrese archivo a analizar!");
    }
  }

  /*MANEJO DE ENTORNOS DE LOS NODOS*/
  createEntorno(result: nodo_xml,encoding: nodo_xml,tipo_encoding: string) {
    this.entornoGlobal= new entorno(null)
    if (result.id == result.id2) {
      for (let atr of encoding.atributos){
        this.entornoGlobal.agregar(atr.id,new simbolo(atr.id,"",tipo.ATRIBUTE,atr.linea,atr.columna))
      }
      let entornoNodo: entorno = new entorno(this.entornoGlobal)
      entornoNodo.agregar("id",new simbolo("id",result.id,tipo.STRING,result.linea,result.columna))
      if (result.valor != "") {
        entornoNodo.agregar("valor", new simbolo(result.id, this.encoding(result.valor, tipo_encoding), tipo.VALOR, result.linea, result.columna))
      }
      entornoNodo.agregar("n_etiquetas", new simbolo("n_etiquetas",2,tipo.N_ETIQUETAS,result.linea,result.columna))
      entornoNodo.agregar("index", new simbolo("index",this.n_node,tipo.INT,result.linea,result.columna))
      this.n_node++
      for (let i = 0; i < result.atributos.length; i++) {
        let atr = result.atributos[i]
        entornoNodo.agregar("atr" + i, new simbolo(atr.id, atr.valor, tipo.ATRIBUTE, atr.linea, atr.columna))
      }
      result.entorno = entornoNodo
      /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
      for (let j = 0; j < result.hijos.length; j++) {
        let hijo = result.hijos[j]
        this.addNodo(hijo, result.entorno, j, tipo_encoding)
      }
      /*SE AGREGA AL ENTORNO GLOBAL*/
      this.entornoGlobal.agregar("xml", new simbolo(result.id, entornoNodo, tipo.STRUCT, result.linea, result.columna))
      console.log(this.entornoGlobal)
    } else {
      InsertarError("Semantico",`Error: etiqueta inicio ${result.id} no es igual a cierre ${result.id2}`,"xml",result.linea,result.columna)
    }
  }

  /* Agregar nodo a entorno */
  addNodo(hijo: nodo_xml, oldEntorno: entorno, n: number, tipo_encoding: string) {
    if (hijo.id == hijo.id2 || hijo.id2 == null) {
      let newEntorno: entorno = new entorno(oldEntorno)
      newEntorno.agregar("id",new simbolo("id",hijo.id,tipo.STRING,hijo.linea,hijo.columna))
      if (hijo.valor != "") {
        newEntorno.agregar("valor", new simbolo(hijo.id, this.encoding(hijo.valor, tipo_encoding), tipo.VALOR, hijo.linea, hijo.columna))
      }
      if (hijo.id2 == null){
        newEntorno.agregar("n_etiquetas", new simbolo("n_etiquetas",1,tipo.N_ETIQUETAS,hijo.linea,hijo.columna))
      } else {
        newEntorno.agregar("n_etiquetas", new simbolo("n_etiquetas",2,tipo.N_ETIQUETAS,hijo.linea,hijo.columna))
      }
      newEntorno.agregar("index", new simbolo("index",this.n_node,tipo.INT,hijo.linea,hijo.columna))
      this.n_node++
      for (let i = 0; i < hijo.atributos.length; i++) {
        let atr = hijo.atributos[i]
        newEntorno.agregar("atr" + i, new simbolo(atr.id, atr.valor, tipo.ATRIBUTE, atr.linea, atr.columna))
      }
      /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
      hijo.entorno = newEntorno
      for (let j = 0; j < hijo.hijos.length; j++) {
        let son = hijo.hijos[j]
        this.addNodo(son, hijo.entorno, j,tipo_encoding)
      }
      /*SE AGREGA AL ENTORNO PADRE*/
      oldEntorno.agregar("hijo" + n, new simbolo(hijo.id, newEntorno, tipo.STRUCT, hijo.linea, hijo.columna))
    } else {
      InsertarError("Semantico",`Error: etiqueta inicio ${hijo.id} no es igual a cierre ${hijo.id2}`,"xml",hijo.linea,hijo.columna)
    }
  }

  /* Reporte Gramatical */
  tablaReportGramatical(gramar:string,titles:string,idg:string,idt:string){
    document.getElementById(idt).innerHTML = titles;
    document.getElementById(idg).innerHTML = gramar;
  }

  /* Reporte para la tabla de simbolos */
  tablaSimbolosReport(){
    let simbolitos = new tablaSimbolos()
    simbolitos.getTableSimbolos(this.entornoGlobal.tabla["xml"].valor)
    this.ts = simbolitos.simbolos
    /*let simbolitos = new tablaSimbolos().getTableSimbolos(this.entornoGlobal);
    document.getElementById("TitleSimbolTable").innerHTML = "Tabla de Simbolos"
    document.getElementById("reportS").innerHTML = simbolitos;*/
  }

  /* Reporte para la tabla de simbolos */
  tablaReportError(){
    let errores = getErrores();
    document.getElementById("TitleErrorTable").innerHTML = "Reporte de Errores"
    document.getElementById("reportE").innerHTML = errores;
  }

  /* Analisis xpath ascendente */
  execXpath() {
    if (this.consola !== ""){
      localStorage.setItem('cstx', "digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cst');
      
      try {
        let entrada = this.consola
        let parse_result = xpath.parse(entrada);
        let result: ast_xpath = parse_result.xpath;
        let reportG = parse_result.reportG;
    
        let xpath_str
        let arbol: ast = new ast()
        xpath_str = result.ejecutar(this.entornoGlobal.tabla["xml"].valor,arbol)
        this.salida = xpath_str
        console.log(this.salida)
    
        /* Reporte Ast */
        let arbolito = new astXpath().getArbolito(result);
        localStorage.setItem('astx', 'digraph g {\n ' + arbolito + '}');
    
        /* reporte gramatical */
        this.tablaReportGramatical(new gramatical("","").getReporteG(reportG),"Reporte Gramatical Xpath Ascendente","reportGX","TitleReportGramaticalX");
    
        /* Fin analisis */
        alert("Analisis finalizado con exito!");
      } catch (error) {
        alert("Error, no ha sido posible recuperarse!");
      }
    }else{
      alert("Error, Ingrese consulta a ejecutar!");
    }
  }

  /* Analisis xpath descendente */
  execXpathD() {
    if (this.consola !== ""){
      localStorage.setItem('cstx', "digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cstx');
      
      try {
        let entrada = this.consola
        let parse_result = xpathd.parse(entrada);
        let result: ast_xpath = parse_result.xpath;
        let reportG = parse_result.reportG;
        this.reOrderArray(result["lista_several"]);
    
        let xpath_str
        let arbol: ast = new ast()
        xpath_str = result.ejecutar(this.entornoGlobal.tabla["xml"].valor,arbol)
        this.salida = xpath_str
        console.log(this.salida)
    
        /* Reporte ast */
        let arbolito = new astXpath().getArbolito(result);
        localStorage.setItem('astx', 'digraph g {\n ' + arbolito + '}');
    
        /* reporte gramatical */
        this.tablaReportGramatical(new gramatical("","").getReporteG(reportG),"Reporte Gramatical Xpath Descendente","reportGX","TitleReportGramaticalX");
    
        /* Fin analisis */
        alert("Analisis finalizado con exito!");
      } catch (error) {
        alert("Error, no ha sido posible recuperarse!");
      }
    }else{
      alert("Error, Ingrese consulta a ejecutar!");
    }
  }

  reporteArbolA() {
    window.open(window.location.href + 'xml/ast.html', '_blank');
  }

  reporteArbolB() {
    window.open(window.location.href + 'xml/cst.html', '_blank');
  }

  reporteArbolC() {
    window.open(window.location.href + 'xpath/ast.html', '_blank');
  }


  /* Limpiar Entrada */
  clearEntry(entrada: string): string {
    for (var _i = 0; _i < 50; _i++) {
      entrada = entrada.split('>' + '\s').join('>');
      entrada = entrada.split('> ').join('>');
    }
    return entrada;
  }

  /* Reordena array Xpath descendente*/
  reOrderArray(arreglo:Array<any>){
    for (let index = 0; index < arreglo.length; index++) {
      arreglo[index].reverse();
    }
  }

  encoding(str: string, tipe: string){
    if (tipe.toLocaleLowerCase() == "utf8"){
      let buf1 = Buffer.from(str);
      return buf1.toString('utf8')
    } else if (tipe.toLocaleLowerCase() == "ascii"){
      let buf1 = Buffer.from(str);
      return buf1.toString('ascii')
    } else if (tipe.toLocaleLowerCase() == "iso-8859-1"){
      let buf1 = Buffer.from(str);
      return buf1.toString('latin1')
    }
    return str
  }

  replaceCharacters(){
    while(this.xcode.includes("&quot;")){
      this.xcode = this.xcode.replace('&quot;','"')
    }
    while(this.xcode.includes("&amp;")){
      this.xcode = this.xcode.replace("&amp;","&")
    }
    while(this.xcode.includes("&apos;")){
      this.xcode = this.xcode.replace("&apos;","'")
    }
  }
  addXml(){
    this.c3d = new nodo3d()
    this.c3d.addRoot()
    let ent: entorno = this.entornoGlobal.tabla["xml"].valor
    this.addNodo3D(ent)
    this.c3d.endCode()
    this.salida = this.c3d.code
  }
  addNodo3D(ent: entorno){
    this.c3d.addNodo(ent)
    for (let key in ent.tabla){
      if (key.startsWith("atr")){
        this.c3d.addAtr(ent.tabla[key])
      } else if (key.startsWith("hijo")){
        this.addNodo3D(ent.tabla[key].valor)
      } else if (key == "valor"){
        this.c3d.addVal(ent.tabla[key])
      }
    }
  }

}