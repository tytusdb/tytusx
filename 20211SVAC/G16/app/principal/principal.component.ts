import { Buscar } from './../Clases/Models/Buscar';
import { ToastrService } from 'ngx-toastr';
import { Errores } from './../Clases/Models/ListaError';
import { Component, OnInit } from '@angular/core';
//import datos from '../../assets/json/estado.json';
import Nodo from '../Clases/Models/Nodo';
const parser=require('../../Gramaticas/gramaticaXML')
const parserDesc=require('../../Gramaticas/Analyzer')
const parserXpathAsc=require('../../Gramaticas/XPathASC')
const parserXpathDesc=require('../../Gramaticas/XPathDESC')
const errores=require('../Clases/Models/ListaError.js')
const Estado=require('../Clases/Models/Estado.js')
const ListaGramatica=require('../Clases/Models/ListaGramatica.js')


import Crear from '../Clases/AST/CrearTS'
import { Router } from '@angular/router';
const defaults = {
  xml:
    '',
};
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {

  nodoraiz: Nodo;
  tablaSimbolo: Crear = null;
  salida: string = ""
  errores: string = ""
  public xpath: string = "";
  title = 'frontend';
  readOnly = false;
  tipo:string=""
  archivo:string="";

  mode: keyof typeof defaults = 'xml';
  options = {
    lineNumbers: true,
    mode: this.mode,
  };
  defaults = defaults;

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  handleChange($event: Event): void {
    console.log('ngModelChange', $event);
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }


  contador:number;
  array:any[];
  constructor(private router: Router, private toastr:ToastrService) {
    this.contador=0;
    this.array=[]
    this.array.push({
      name: "nuevo",
      indice: this.contador,
      id: "nuevo" + this.contador,
      estado: "true",
      tab: "nuevo" + this.contador + "-tab",
      active: "nav-link active text-uppercase",
      active2: "tab-pane fade show active",
      texto: "text" + this.contador,
      contenido: ""

    });


  }

  ngOnInit(): void {
    this.tipo=localStorage.getItem("TIPO")
    Estado.Estado.Cambio(2)
    //console.log(Estado.Estado.cambio)
  }

  nuevo() {
    this.contador = this.contador + 1;
    this.array.push({
      name: "nuevo",
      indice: this.contador,
      id: "nuevo" + this.contador,
      estado: "false",
      tab: "nuevo" + this.contador + "-tab",
      active: "nav-link text-uppercase",
      active2: "tab-pane fade",
      texto: "text" + this.contador,
      contenido: ""
    })
  }


  compilar(){
    try{
      errores.Errores.clear();
      Estado.Estado.Cambio(1)
      const CST = parser.parse(this.archivo);
      this.GenerarTablaSimbolos(CST)
      Estado.Estado.Cambio(2)
      this.Xmlasc(this.archivo);
      console.log("analizador ascendente")
    }catch(Error){
      this.toastr.error("Hay errores en la cadena de entrada")
    }
  }

  Xmldesc() {
    ListaGramatica.ReporteGramatical.clear()
    errores.Errores.clear();

    try{
      Estado.Estado.Cambio(1)
      const CST = parserDesc.parse(this.archivo);
      this.GenerarTablaSimbolos(CST)
      Estado.Estado.Cambio(2)
      this.nodoraiz = parserDesc.parse(this.archivo);
      localStorage.setItem("CSTA", JSON.stringify(this.nodoraiz))
      localStorage.setItem("TIPO", "Descendente")
    }catch(Error){
      this.toastr.error("No se ha podido generar correctamente el análisis");
    }
  }


  Xmlasc(cadena:string) {
    try{
      ListaGramatica.ReporteGramatical.clear()
      this.nodoraiz = parser.parse(cadena);
      localStorage.setItem("CSTA", JSON.stringify(this.nodoraiz))
      localStorage.setItem("TIPO", "Ascendente")
    }catch(Error){
      this.toastr.error("No se ha podido generar correctamente el análisis")
    }
  }

  xpathASC() {
   try{
    const AST = parserXpathAsc.parse(this.xpath);

    localStorage.setItem("ASTXPATH",JSON.stringify(AST));
    if(this.tablaSimbolo.getTabla().length!=0){
    let buscar=new Buscar(this.toastr);
    this.toastr.success("Análisis completado")
    this.salida=buscar.darFormato()
    }else{
      this.toastr.warning("Se debe ingresar un archivo XML primero");
    }
   }catch(Error){
    this.toastr.error("Error", "Hay un error en la sintáxis, compruebe su cadena de entrada")
    }
  }

  xpathDESC() {
    try{
      const AST = parserXpathDesc.parse(this.xpath);
      localStorage.setItem("ASTXPATH",JSON.stringify(AST));
      this.toastr.success("Análisis completado")
    }catch(Error){
      this.toastr.error("Error","Hay un error en la sintáxis, compruebe su cadena de entrada" )
    }

  }

  GenerarTablaSimbolos(CST:any){
    let array=[]
    this.salida=">>Analizando archivo XML\n";
    try{
      if(CST!=null){
        this.tablaSimbolo=new Crear();
        let lista=[];
        lista.push(CST)
        this.tablaSimbolo.agregar(lista,"Global");
        this.TablaSimbolos();
        array=errores.Errores.geterror();
        if(array.length!=0){
          this.toastr.warning("atención","Se han detectado errores en el archivo");
          this.salida+=">>Se ha analizado el código, errores detectados...\n";
          array.forEach(element => {
          this.salida+=">>Tipo de error: "+element.tipo+", "+element.valor+", "+". línea "+element.linea+" y columna "
            +element.columna+"\n";
          });
        }else{
        this.salida+=">>Análisis satisfactorio"
        this.toastr.success("Se ha analizado el archivo XML correctamente")
        }
      }else{
       this.toastr.warning("No se ha generado el análisis")
       this.errores=">>No se ha podido generar el análisis"
      }

    }catch(Error){
      this.toastr.error('Error',"Existe(n) error(es) sintáctico(s) irrecuperables, compruebe el archivo e inténtelo de nuevo. ")
      this.errores+=">>Existe(n) error(es) sintáctico(s) irrecuperables, compruebe el archivo e inténtelo de nuevo."
    }
  }

  leerArchivo(e: any) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = (e) => {
      var contenido = e.target.result;
      if (this.archivo == '') {
       // var a = (<HTMLInputElement>document.getElementById('text0')).value = contenido.toString();
        this.archivo = contenido.toString();
      } else {
        this.nuevo();
        this.clear();
        this.archivo = contenido.toString();
      }
    };

    lector.readAsText(archivo);
  }

  TablaSimbolos() {
    localStorage.setItem("tablaSimbolo", JSON.stringify(this.tablaSimbolo.getTabla()))
  }

  repoSimbolos() {
    this.router.navigate(['./tablasimbolos']);
  }
  CSTAsc() {
    this.router.navigate(['./cstASC']);
  }

  ASTXPATH() {
    this.router.navigate(['./astASC']);
  }
  Errores(){
    this.router.navigate(['./errores']);
  }

  ReporteGram(){
    this.router.navigate(['./gramatical']);
  }

  getJSON() {
    //return (data as any); // aqui obtenemos el JSON completo
  }

}

