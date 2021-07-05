import { HttpClient } from '@angular/common/http';
import { ParsedProperty } from '@angular/compiler';
import { Component, Inject} from '@angular/core';
import { observable } from 'rxjs';
import {sentenciaXpath} from '../app/Estructuras/sentenciaXpath'
import {LlamadoFuncion, SentenciaXquery} from '../app/Estructuras/Xquery/SentenciaXquery'
import {Objeto} from '../Expresiones/Objeto'
import { OperacionXpath } from './Estructuras/OperacionXpath';
import { ParametroOperacionXpath } from './Estructuras/ParametroOperacionXpath';
import { Entrada } from './Estructuras/Entrada';
import {TipoParametro, TipoOperador, TipoNodo, OrderModifierType, TipoDeclaracionXquery, SingleExpresionType, ParamType, FLWORTipo, TipoClausulaIntermedia, TipoFuncion} from './Estructuras/tipificacion';
import { graphviz }  from 'd3-graphviz';
import {crearArbolDot} from './AST/crearArbolDot';
import {MatDialog} from '@angular/material/dialog';
import {TablaSimbolosComponent} from '../app/Reportes/tabla-simbolos/tabla-simbolos.component';
import {OptimizacionesComponent} from '../app/Reportes/optimizaciones/optimizaciones.component';
import { Error } from 'src/app/AST/Error';
import {ErroresXMLComponent} from '../app/Reportes/errores-xml/errores-xml.component';
import { ListaErrores } from 'src/app/AST/ListaErrores';
import { DeclaracionXquery, FuncionXquery, ParametroXquery, TypeDeclaration } from './Estructuras/Xquery/DeclaracionXquery';
import { PathExpresion } from './Estructuras/Xquery/PathExpresion';
import { SingleExpresion } from './Estructuras/Xquery/SingleExpresion';
import { FLWORExpr,OrderSpec } from './Estructuras/Xquery/FLWORExpr';
import { IfExpresion } from './Estructuras/Xquery/IfExpresion';
import { NativeFunctionExpresion } from './Estructuras/Xquery/NativeFunctionExpresion';
import { parametroXpath } from './Estructuras/parametroXpath';
import { Optimizacion, OptimizarCodigo } from './OptimizarCodigo';
import { Declaracion3D } from './Estructuras/C3D/Declaracion3D';
interface TablaSimbolosXquery{
  Tipo:string;
  ID:string;
  Entorno:string;
  Valor:object;
  TipoDato:string;
}

interface ParametroFuncion{
  Nombre:string;
  Valor:Object;
  Tipo:ParamType;
}
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  Funciones:DeclaracionXquery[] = [];
  Simbolos:TablaSimbolosXquery;
  title = 'proyecto1';
  txtXpath = `for $x in /bookstore/book
  return if ($x/@category = "children") then
  upper-case($x/title)
  else
  upper-case($x/year)`;
  consoleValue = "";
  parser;
  retroceder = true;
  showTablaSimbolo = true;
  listaDescendientes:sentenciaXpath[] = [];
  xmlOriginal:Objeto[];
  ObjetoReporte:Objeto;
  sentenciaOriginal:sentenciaXpath;
  parserXml;
  astXML;
  parserC3D;
  arbol;
  rgxmlasc;
rgxmldesc;
cstxml;
ast3d;
cst3d;
  tablaXML="";
  xmlText = `<?xml version="1.0" encoding="UTF-8"?>

  <bookstore>
  
  <book category="COOKING">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  
  <book category="CHILDREN">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  
  <book category="WEB">
    <title lang="en">XQuery Kick Start</title>
    <author>James McGovern</author>
    <author>Per Bothner</author>
    <author>Kurt Cagle</author>
    <author>James Linn</author>
    <author>Vaidyanathan Nagarajan</author>
    <year>2003</year>
    <price>49.99</price>
  </book>
  
  <book category="WEB">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
  
  </bookstore>`;
  c3dTextInicial = `/*------HEADER------*/
  #include <stdio.h>
  #include <math.h>
  
  double heap[30101999];
  double stack[30101999];
  double SP;
  double HP;`

  c3dTextInicial2 = `
  /*------MAIN------*/
  void main() {
    SP = 0; HP = 0;`;

c3dText = '';
c3dTextGenerado = '';
c3dTemporales="";
c3dTextFinal = `    return;
    }`;
    objetosTraducir;
    xmlTraductor;
    xmlTraducido="";
    consultac3d="";
    reporteOptimizaciones:Optimizacion[]= [];
    ProcessedData:Entrada;
  private httpClient: HttpClient;
  constructor(http: HttpClient,public dialog: MatDialog) {
    this.httpClient = http;
    //this.parser = require("./Gramatica/gramatica");
    this.parser = require("./Gramatica/xpathGramatica");
    this.parserC3D = require("./Gramatica/Opt3DGramatica");
    this.parserXml = require("./Gramatica/gramatica");
    this.astXML= require("./Gramatica/gramaticaXMLAsc_Arbol");
    this.arbol=require("./AST/crearArbolDot");
	this.cstxml= require("./Gramatica/gramaticaXMLDesc_Arbol");
  this.xmlTraductor=require("./AST/traductorXMLC3D");
  this.objetosTraducir=require("./Gramatica/gramatica");
  this.ast3d= require("./Gramatica/Opt3DGramatica_Arbol");
  this.cst3d= require("./Gramatica/Opt3DGramatica_Arbol");

  }

  Optimizar(){
    var objeto3d = this.parserC3D.parse(this.c3dText) as Declaracion3D[];
    var opt = new OptimizarCodigo();
    objeto3d = opt.Optimizar(objeto3d);
    //console.log('Salida Optimizacion ****');
    //console.log(objeto3d);
    this.c3dText = "";
    objeto3d.forEach(element => {
      this.c3dText += element.C3D + '\n';
      if(Array.isArray(element.Instruccion3D)){
        element.Instruccion3D.forEach(inst => {
          this.c3dText += ' '+(inst.Dato as any).C3D + '\n';
        });
      }
      if(element.ID !=null){
        this.c3dText += '}';
      }
    });
    //console.log('Salida Reporte ****');
    //console.log(opt.Reporte);
    this.reporteOptimizaciones = opt.Reporte;
  }
  ReporteOptimizaciones(){
    
    this.dialog.open(OptimizacionesComponent, {
      data: this.reporteOptimizaciones,
      maxHeight: '80%'
    });
  }
  Compilar() {
    this.consoleValue ="";
    var xmlObject = this.parserXml.parse(this.xmlText) as Objeto;
    //console.log('parseando: ' + this.txtXpath);
    var processedObject = this.parser.parse(this.txtXpath) as Entrada;

    //console.log('processedObject');
    //console.log((processedObject));
    this.ProcessedData = processedObject;
    if(processedObject.Tipo == 1){//Xquery Info
      this.ProcesarXquery(processedObject.xQueryData);
    }else{
      //Agregamos para cada sentencia su sentencia hija para simular lista doblemente enlazada (padre,hijo)
      var xPathObject = processedObject.xPathData;
      var elementoActual:sentenciaXpath; 
        
      var lista:Objeto[] = [];
      lista.push(xmlObject);
      
      //console.log(xmlObject);
      this.consoleValue = '';
      xPathObject.forEach(element => {
        elementoActual = element;
        element.Hijo = null;
        while(elementoActual.Padre !=null){
          elementoActual.Padre.Hijo = elementoActual;
          elementoActual = elementoActual.Padre;
        }
        this.listaDescendientes = [];
        //console.log(elementoActual);
      
        this.sentenciaOriginal = elementoActual;
        this.xmlOriginal = lista;
        this.consoleValue += this.ProcesarNodoRaiz(elementoActual,lista,null);
      });
      //elementoActual en este momento es la raiz de la entrada Xpath
    }
    
   this.traducirXml();
  this.c3dText = this.c3dTextInicial+ '\n'+  this.c3dTemporales +'\n'
    + this.consultac3d +'\n' +this.c3dTextInicial2 
     + '\n' +this.xmlTraducido+ this.c3dTextGenerado + '\n' + this.c3dTextFinal; 
  }

  ProcesarXquery(sentencias:SentenciaXquery[]){
    sentencias.forEach(element => {
      if(element.FlworExpresion!=null){//FLWORExpression
        var result = this.ResolverFLWORExpr(element.FlworExpresion,[]);
        this.consoleValue = '';
        if(Array.isArray(result)){
          result.forEach(element => {
            this.consoleValue += element + '\n';
          });
        }else{
          this.consoleValue += result + '\n';
        }
        

      }else if(element.AnnotatedDecl!=null){//funciones y variables
        if(element.AnnotatedDecl.Tipo==TipoDeclaracionXquery.FuncionDefinida){
          this.Funciones.push(element.AnnotatedDecl);
        }else{

        }
      }else{//Llamado a funciones
        this.EjecutarFuncion(element.Llamado,[]);
      }
    });
  }

  EjecutarFuncion(sentencia:LlamadoFuncion,parametrosAnteriores:ParametroFuncion[]){
    var ret:any;
    this.Funciones.forEach(element => {
      var funcion = element.Valor as FuncionXquery;
      if(funcion.FunctionName.Name == sentencia.Name.Name && funcion.FunctionName.Ambiente == sentencia.Name.Ambiente){
        //validacion de parametros
        var params = this.ValidarParametros(funcion.ListaParametros,sentencia.Parametros,parametrosAnteriores);
        //Sentecias del cuerpo 
        this.consoleValue = '';
        funcion.Body.forEach(expresion => {
          ret = this.ResolverSingleExpresion(expresion,params);
          
           this.consoleValue += this.ResolverSingleExpresion(expresion,params) + '\n';
        });
        
      }
    });
    return ret;
  }


  ResolverSingleExpresion(expresion:SingleExpresion, parametros:ParametroFuncion[]){
   
    switch(expresion.Tipo){
      case  SingleExpresionType.FLWORExpr:{
       return this.ResolverFLWORExpr(expresion.Objeto as FLWORExpr,parametros);
      }
      case  SingleExpresionType.Contador:{
        var values = [];
        for(var i = expresion.Inicio ; i<= expresion.Fin; i++){
          values.push(i);
        }
        return values;
      }
      case  SingleExpresionType.Sentencia:{
        var values = [];
        var sentencia = expresion.Objeto as sentenciaXpath;
        var xmlObject = this.parserXml.parse(this.xmlText) as Objeto;
            var lista:Objeto[] = [];
            lista.push(xmlObject);
         
              var elementoActual = sentencia;
              sentencia.Hijo = null;
              while(elementoActual.Padre !=null){
                elementoActual.Padre.Hijo = elementoActual;
                elementoActual = elementoActual.Padre;
              }
              
              values = this.ProcesarNodoRaizXquery(elementoActual,lista,[]);
        return values;
      }
      case  SingleExpresionType.FuncionDefinida:{
          var funcion = expresion.Objeto as NativeFunctionExpresion;
          if(funcion.NameFunction.TipoFuncion == TipoFuncion.Nativa){
            
            if(funcion.NameFunction.Valor == "upper-case"){
              var val = this.ResolverSingleExpresion(funcion.Value[0],parametros);
              return val.toString().toUpperCase();
            }else if(funcion.NameFunction.Valor == "lower-case"){
              var val = this.ResolverSingleExpresion(funcion.Value[0],parametros);
              return val.toString().toLowerCase();
            }
            else if(funcion.NameFunction.Valor == "string"){
              var val = this.ResolverSingleExpresion(funcion.Value[0],parametros);
              return val.toString();
            }
            else if(funcion.NameFunction.Valor == "number"){
              var val = this.ResolverSingleExpresion(funcion.Value[0],parametros);
              return Number(val);
            }
            else if(funcion.NameFunction.Valor == "substring"){
              if(funcion.Value.length == 3){
                var val1 = this.ResolverSingleExpresion(funcion.Value[0],parametros);
                var val2 = this.ResolverSingleExpresion(funcion.Value[1],parametros);
                var val3 = this.ResolverSingleExpresion(funcion.Value[2],parametros);
                return val1.toString().substring(val2,val3);
              }
             
            }
          }
       }
      case SingleExpresionType.XPARAM :{
        var res = this.GetValorXparam(expresion.Objeto as ParametroOperacionXpath,parametros);
        if(Array.isArray(res))
        {
         
          var result = "";
          var esObjeto = false;
          res.forEach(element => {
            if(element.__proto__.constructor.name == 'Objeto'){
              esObjeto = true;
              var obj = element as Objeto;
              result += this.GetXmlText(obj);
            }else{

            }
          });
          if(esObjeto){
            return result;
          }else{
            return res;
          }
         
        }else{
          return res;
        }

      }
      case SingleExpresionType.Path :{
        var result = "";
        var expresiones  = expresion.Objeto as PathExpresion[];
        expresiones.forEach(expr => {
          parametros.forEach(element => {
            if(element.Nombre == expr.Varname){
              result = ( this.ProcesarNodoRaiz(expr.Sentencia,[element.Valor] as Objeto[],[]));
              
            }
          });
        });
        return result;
      }
      case  SingleExpresionType.IfExpr:{
        return this.ResolverIfExpresion(expresion.Objeto as IfExpresion,parametros);
      }
      case  SingleExpresionType.LlamadaFuncion:{
        return this.EjecutarFuncion(expresion.Objeto as LlamadoFuncion,parametros);
      }
    }
  }

  ResolverIfExpresion(ifSentence:IfExpresion, parametros:ParametroFuncion[]):any{

    var condition = ifSentence.Parametros[0];
   
      var condicion = this.ResolverSingleExpresion(condition as SingleExpresion, parametros)
     //console.log('condicion');
     //console.log(condicion);
      if(condicion){
        var res = this.ResolverSingleExpresion(ifSentence.AccionVerdadera,parametros);
        return res ;
      }else{
        return this.ResolverSingleExpresion(ifSentence.AccionFalsa,parametros);
      }
   
  }

 
  ResolverFLWORExpr(expresion:FLWORExpr, parametros:ParametroFuncion[]){
    
    switch(expresion.Binding.Tipo){
      case FLWORTipo.Let :{
        expresion.Binding.Variables.forEach(element => {
          if(element.SEValue!=null)
          {
            var valor = this.ResolverSingleExpresion(element.SEValue,parametros);
            parametros.push({Nombre:element.VarName,Valor:valor,Tipo:null})
           
            
          }else if(element.Sentencia!=null){

          }
        });
        if( expresion.IntermediteClauses!=null)
        {
          expresion.IntermediteClauses.forEach(element => {
          
          });
        }
        return this.ResolverSingleExpresion(expresion.ReturnClause,parametros);
      }break;
      case FLWORTipo.For :{
        //binding
        var valoresIterador:ParametroFuncion[] = [];
        expresion.Binding.Variables.forEach(element => {
          if(element.SEValue!=null)
          {
            if(element.SEValue.Objeto == null){//es un contador
             
              var values =[];
              for(let i = element.SEValue.Inicio; i <= element.SEValue.Fin; i++){
                values.push(i);
              }
              valoresIterador.push({Nombre:element.VarName,Valor:values,Tipo:null});
              //parametros.push({Nombre:element.VarName,Valor:values,Tipo:null})
            }else{
              
            }
          }else if(element.Sentencia!=null){
            var xmlObject = this.parserXml.parse(this.xmlText) as Objeto;
            var lista:Objeto[] = [];
            lista.push(xmlObject);
         
              var elementoActual = element.Sentencia;
              element.Sentencia.Hijo = null;
              while(elementoActual.Padre !=null){
                elementoActual.Padre.Hijo = elementoActual;
                elementoActual = elementoActual.Padre;
              }
              
            var valor = this.ProcesarNodoRaizXquery(elementoActual,lista,[]);
            //valoresIterador = valor;
            valoresIterador.push({Nombre:element.VarName,Valor:valor,Tipo:null});
            //parametros.push({Nombre:element.VarName,Valor:valor,Tipo:null})
          }
        });


        if( expresion.IntermediteClauses!=null)
          {
            expresion.IntermediteClauses.forEach(element => {
              if(element.Tipo == TipoClausulaIntermedia.WhereClause){
              
                this.FiltrarOperacionXquery(element.Clausula as parametroXpath,valoresIterador)
                
              }else if(element.Tipo == TipoClausulaIntermedia.OrderByClause){
                (element.Clausula as OrderSpec[]).forEach(cl => {
                  //console.log('OrdenarOperacionXquery');
                  //console.log(cl);
                  //console.log(valoresIterador);
                  this.OrdenarOperacionXquery(cl,valoresIterador)
                });
                
                
              } 
            });
          }

        if(valoresIterador.length<=0){
          //intermediate clauses
          if( expresion.IntermediteClauses!=null)
          {
            expresion.IntermediteClauses.forEach(element => {
              if(element.Tipo == TipoClausulaIntermedia.WhereClause){
             
                this.FiltrarOperacionXquery(element.Clausula as parametroXpath,parametros);
               
              }else if(element.Tipo == TipoClausulaIntermedia.OrderByClause){
                (element.Clausula as OrderSpec[]).forEach(cl => {
                  //console.log(parametros);
                  this.OrdenarOperacionXquery(cl,parametros)
                });
               
               
              } 
            });
          }
          //return clauses
          return this.ResolverSingleExpresion(expresion.ReturnClause,parametros);
        }else{
          var retornos = [];
          var max = 0;
          valoresIterador.forEach(element => {
            if(max < (element.Valor as any).length){
              max = (element.Valor as any).length;
            }
          });
          for(let i=0;i<max;i++){
            var copyParams =  Object.assign([], parametros) ;
            valoresIterador.forEach(element => {
              copyParams.push({Nombre:element.Nombre,Valor:element.Valor[i],Tipo:null});
            });
            //intermediate clauses
            if(expresion.IntermediteClauses!=null)
            {
              // expresion.IntermediteClauses.forEach(element => {
              //   if(element.Tipo == TipoClausulaIntermedia.WhereClause){
                
              //    this.FiltrarOperacionXquery(element.Clausula as parametroXpath,valoresIterador)
                 
              //   }else if(element.Tipo == TipoClausulaIntermedia.OrderByClause){
              //     (element.Clausula as OrderSpec[]).forEach(cl => {
              //       this.OrdenarOperacionXquery(cl,valoresIterador)
              //     });
                 
                 
              //   } 
              // });
            }
            //return clauses
            retornos.push(this.ResolverSingleExpresion(expresion.ReturnClause,copyParams));
          }
         return retornos;
        }
        
      }break;
    }
  }


  OrdenarOperacionXquery( param:OrderSpec, parametros:ParametroFuncion[]):Objeto[]{
    var result:Objeto[] = [];
    if(param.SingleExpresion.Tipo == SingleExpresionType.Path){
      
      var path = param.SingleExpresion.Objeto as PathExpresion[];
      path.forEach(p => {
        var data = [];
        parametros.forEach(element => {
          if(element.Nombre == p.Varname){
            var elementoActual = p.Sentencia;
            p.Sentencia.Hijo = null;
            while(elementoActual.Padre !=null){
              elementoActual.Padre.Hijo = elementoActual;
              elementoActual = elementoActual.Padre;
            }

            (element.Valor as Objeto[]).forEach(obj => {
              var result =  this.ProcesarNodoRaizXquery(elementoActual,[obj],[]);
              console.log(result);
              if(result != undefined && result.length>0)
                data.push({Valor:result[0].texto,Nodo:obj});
            });
          }
        });
        data = data.sort((a, b) => (a.Valor > b.Valor) ? 1 : -1);
        if(param.OrderModifierType == OrderModifierType.Ninguno || param.OrderModifierType == OrderModifierType.Ascendente){
          data.forEach(element => {
            result.push(element.Nodo);
          });
        }else{
          for(let i = data.length -1; i >=0;i--){
            result.push(data[i].Nodo);
          }
        }
        //console.log('ActualizarValorVariable');
        //console.log(result);
        this.ActualizarValorVariable(p.Varname,result,parametros);
      });
     
    }else  if(param.SingleExpresion.Tipo == SingleExpresionType.XPARAM){
      var p = (param.SingleExpresion.Objeto as any).Valor as PathExpresion;
      parametros.forEach(element => {
        if(element.Nombre == p.Varname){
          var dataAux = element.Valor as Objeto[];
          var data = [];

          var elementoActual = p.Sentencia;
          p.Sentencia.Hijo = null;
          while(elementoActual.Padre !=null){
            elementoActual.Padre.Hijo = elementoActual;
            elementoActual = elementoActual.Padre;
          }

          dataAux.forEach(element => {
            if(p.Sentencia.Tipo.Tipo == TipoNodo.Atributo){
              var result = "";
              result = ( this.ProcesarNodoRaiz(elementoActual,[element],[]));
              data.push({Valor:result,Nodo:element});
            }else{
              var res:Objeto[] ;
              res = ( this.ProcesarNodoRaizXquery(elementoActual,[element],[]));
              //console.log(res);
              data.push({Valor:res[0].texto,Nodo:element});
            }
          });

          //console.log(data);
          data = data.sort((a, b) => (a.Valor > b.Valor) ? 1 : -1);
          //console.log(data);
          if(param.OrderModifierType == OrderModifierType.Ninguno || param.OrderModifierType == OrderModifierType.Ascendente){
            data.forEach(element => {
              result.push(element.Nodo);
            });
          }else{
            for(let i = data.length -1; i >=0;i--){
              result.push(data[i].Nodo);
            }
          }
          this.ActualizarValorVariable(p.Varname,result,parametros);
        }
      });
    }
    
  
    return result;
  }

  FiltrarOperacionXquery( param:parametroXpath, parametros:ParametroFuncion[]):Objeto[]{
    var result:Objeto[] = [];
    if(param.TipoOperador == TipoOperador.None){
      return this.RealizarOperacionXquery(param.SingleOperacion,parametros);
    }
    return result;
  }

  RealizarOperacionXquery(ope:OperacionXpath, parametros:ParametroFuncion[]):Objeto[]{
    var result:Objeto[] = [];
    switch(ope.TipoOperador){
      case TipoOperador.Mayor:{
        var izquierda = this.GetValorXparam(ope.ParametroIzquierdo,parametros) as Objeto[];
        var derecho = this.GetValorXparam(ope.ParametroDerecho,parametros);
         
         
        if(ope.Sentencia!=null){
          var elementoActual = ope.Sentencia;
          ope.Sentencia.Hijo = null;
          while(elementoActual.Padre !=null){
            elementoActual.Padre.Hijo = elementoActual;
            elementoActual = elementoActual.Padre;
          }
          var temp = elementoActual;
          var aux:Objeto[] = [];
          izquierda.forEach(element => {
            var itemActual = element;
            while(temp!=null){
              if(temp.Tipo.Tipo == TipoNodo.ID){
                itemActual.listaObjetos.forEach(obj => {
                  if(obj.identificador == temp.Tipo.Valor){
                    itemActual = obj;
                    if( temp.Hijo==null && Number(obj.texto) > derecho){
                      aux.push(element);
                    }
                  }
                });
              }
              temp = temp.Hijo;
            }
            temp = elementoActual;
          });
          //console.log('aux');
          result = aux;
          this.ActualizarValorVariable(ope.ParametroIzquierdo.Valor,aux, parametros);
        }
      }break;
      case TipoOperador.Igual:{
        var izquierda = this.GetValorXparam(ope.ParametroIzquierdo,parametros) as Objeto[];
        var derecho = this.GetValorXparam(ope.ParametroDerecho,parametros);
         
         
        if(ope.Sentencia!=null){
          var elementoActual = ope.Sentencia;
          ope.Sentencia.Hijo = null;
          while(elementoActual.Padre !=null){
            elementoActual.Padre.Hijo = elementoActual;
            elementoActual = elementoActual.Padre;
          }
          var temp = elementoActual;
          var aux:Objeto[] = [];
          izquierda.forEach(element => {
            var itemActual = element;
            while(temp!=null){
              if(temp.Tipo.Tipo == TipoNodo.ID){
                itemActual.listaObjetos.forEach(obj => {
                  if(obj.identificador == temp.Tipo.Valor){
                    itemActual = obj;
                    if( temp.Hijo==null && obj.texto == derecho){
                      aux.push(element);
                    }
                  }
                });
              }
              temp = temp.Hijo;
            }
            temp = elementoActual;
          });
          //console.log('aux');
          result = aux;
          this.ActualizarValorVariable(ope.ParametroIzquierdo.Valor,aux, parametros);
        }
      }break;
    }
    return result;
  }

  ActualizarValorVariable(varName:string ,valor: object, parametros:ParametroFuncion[]){
    parametros.forEach(element => {
      if(element.Nombre == varName){
        element.Valor = valor;
      }
    });
  }
  ValidarParametros(parametrosFuncion:ParametroXquery[],parametrosLlamado:SingleExpresion[],parametrosAnteriores:ParametroFuncion[]){
    
    var infoVariables =  [];
    parametrosAnteriores.forEach(val => infoVariables.push(Object.assign({}, val)));

    var totalVariablesObligatorias:number = 0;
    parametrosFuncion.forEach(element => {
      if(element.TipoParam.OccurrenceIndicator != "?")
        totalVariablesObligatorias++;
    });
    if( parametrosLlamado.length < totalVariablesObligatorias){
      //console.log('error por manejar');
      //error por manejar
      return infoVariables;
    }
    var cont = 0;
    parametrosLlamado.forEach(element => {
     
      switch(element.Tipo){
        case SingleExpresionType.XPARAM : {
          var ope = element.Objeto as ParametroOperacionXpath;
          if(ope.Tipo == TipoParametro.FuncionDefinida){
            var valFun =  this.EjecutarFuncion(ope.Funcion,parametrosAnteriores.length>0? parametrosAnteriores:infoVariables);
            ////console.log('LlamadaFuncion: Gurdando variable ' + parametrosFuncion[cont].Name + ', valor: ' + valFun);
            if(infoVariables.find(x=>x.Nombre == parametrosFuncion[cont].Name) !=undefined){
              this.ActualizarValorVariable(parametrosFuncion[cont].Name,valFun,infoVariables);
            }else{
              infoVariables.push({Nombre: parametrosFuncion[cont].Name,Tipo : parametrosFuncion[cont].TipoParam.Tipo,Valor : valFun});
            }
          }else{
            var valor = this.GetValorXparam(element.Objeto as ParametroOperacionXpath,infoVariables);
            ////console.log('XPARAM: Gurdando variable ' + parametrosFuncion[cont].Name + ', valor: ' + valor);
            if(infoVariables.find(x=>x.Nombre == parametrosFuncion[cont].Name) !=undefined){
              this.ActualizarValorVariable(parametrosFuncion[cont].Name,valor,infoVariables);
            }else{
              infoVariables.push({Nombre: parametrosFuncion[cont].Name,Tipo : parametrosFuncion[cont].TipoParam.Tipo,Valor : valor});
            }
          }
         
          
        }break;
        case SingleExpresionType.Sentencia : {
          var xmlObject = this.parserXml.parse(this.xmlText) as Objeto;

          var elementoAcual = this.EnlazarSentencia(element.Objeto as sentenciaXpath);
              
          var val = this.ProcesarNodoRaizXquery(elementoAcual,[xmlObject],[]);
          ////console.log('Sentencia: Gurdando variable ' + parametrosFuncion[cont].Name + ', valor: ' + val[0].texto);
          if(infoVariables.find(x=>x.Nombre == parametrosFuncion[cont].Name) !=undefined){
            this.ActualizarValorVariable(parametrosFuncion[cont].Name, val[0].texto as any,infoVariables);
          }else{
            infoVariables.push({Nombre: parametrosFuncion[cont].Name,Tipo : parametrosFuncion[cont].TipoParam.Tipo,Valor : val[0].texto});
          }
          
        }break;
        case SingleExpresionType.LlamadaFuncion : {
          var valFun =  this.EjecutarFuncion(element.Objeto as LlamadoFuncion,parametrosAnteriores.length>0? parametrosAnteriores:infoVariables);
          
          ////console.log('LlamadaFuncion: Gurdando variable ' + parametrosFuncion[cont].Name + ', valor: ' + valFun);
          if(infoVariables.find(x=>x.Nombre == parametrosFuncion[cont].Name) !=undefined){
            this.ActualizarValorVariable(parametrosFuncion[cont].Name,valFun,infoVariables);
          }else{
            infoVariables.push({Nombre: parametrosFuncion[cont].Name,Tipo : parametrosFuncion[cont].TipoParam.Tipo,Valor : valFun});
          }
        }break;
      }
      cont++;
    });
    for(let i = cont;i<parametrosFuncion.length;i++){
      infoVariables.push({Nombre: parametrosFuncion[i].Name,Tipo : parametrosFuncion[i].TipoParam.Tipo,Valor : this.GetDefaultValue(parametrosFuncion[i].TipoParam.Tipo)});
    }
  
    return infoVariables;
  }

  EnlazarSentencia( element:sentenciaXpath):sentenciaXpath{
    var elementoActual = element;
    element.Hijo = null;
    while(elementoActual.Padre !=null){
      elementoActual.Padre.Hijo = elementoActual;
      elementoActual = elementoActual.Padre;
    }
    return elementoActual
  }
  GetDefaultValue(tipo:ParamType){
    switch (tipo){
      case ParamType.xsBoolean : return false;
      case ParamType.xsDate : return new Date;
      case ParamType.xsDecimal : return 0;
      case ParamType.xsString : return '';
    }
  }
  GetValorXparam(param:ParametroOperacionXpath, parametros:ParametroFuncion[]){
    
    switch(param.Tipo){
      case TipoParametro.Entero:{
        return Number(param.Valor);
      }break;
      case TipoParametro.Ruta:{
        var temp:any = param.Valor;
        var path = temp  as PathExpresion;
        var retorno;
        parametros.forEach(element => {
          if(element.Nombre == path.Varname){
            
            var obj = element.Valor as Objeto[];
         
              var elementoActual = path.Sentencia;
              path.Sentencia.Hijo = null;
              while(elementoActual.Padre !=null){
                elementoActual.Padre.Hijo = elementoActual;
                elementoActual = elementoActual.Padre;
              }
              
            while(elementoActual!=null){
              if(elementoActual.Tipo.Tipo ==TipoNodo.Atributo){
                obj.forEach(element => {
                  element.listaAtributos.forEach(atr => {
                    if(atr.identificador == elementoActual.Tipo.Valor){
                       retorno = atr.valor;
                    } 
                });
              });
              }else  if(elementoActual.Tipo.Tipo ==TipoNodo.ID){
                obj.forEach(element => {
                  if(element.listaObjetos != undefined)
                  element.listaObjetos.forEach(atr => {
                 if(atr.identificador == elementoActual.Tipo.Valor){
                    retorno = atr.texto;
                 } 
                });
                });
              }
              elementoActual = elementoActual.Hijo;
            }
           
          }
        });
        
        return retorno;
      }break;
      case TipoParametro.Cadena:{
        return (param.Valor);
      }break;
      case TipoParametro.FuncionDefinida:{
        value = this.EjecutarFuncion(param.Funcion,parametros);
        //console.log('value');
        //console.log(value);
        return value;
      }break;
      case TipoParametro.Variable:{
        var value;
        parametros.forEach(element => {
          if(element.Nombre == param.Valor.toString()){
            if(element.Valor != null){
              value = element.Valor;
            }else{
              
            }
          }
        });
        return value;
      }break;
      case TipoParametro.Operacion:{
        var valorIzquierdo = this.GetValorXparam(param.Operacion.ParametroIzquierdo,parametros);
        var valorDerecho = this.GetValorXparam(param.Operacion.ParametroDerecho,parametros);
       
        switch(param.Operacion.TipoOperador){
          case TipoOperador.Mas:{
            return valorIzquierdo + valorDerecho;
          }
          case TipoOperador.Menos:{
            
            return valorIzquierdo - valorDerecho;
          }
          case TipoOperador.Div:{
            return valorIzquierdo / valorDerecho;
          }
          case TipoOperador.Por:{
            return valorIzquierdo * valorDerecho;
          }
          case TipoOperador.Mod:{
            return valorIzquierdo % valorDerecho;
          }
          case TipoOperador.Igual:{
            return Number(valorIzquierdo) == Number(valorDerecho);
          }
          case TipoOperador.Diferente:{
            return Number(valorIzquierdo) != Number(valorDerecho);
          }
          case TipoOperador.Mayor:{
            return Number(valorIzquierdo) > Number(valorDerecho);
          }
          case TipoOperador.Menor:{
            return Number(valorIzquierdo) < Number(valorDerecho);
          }
          case TipoOperador.MayorIgual:{
            return Number(valorIzquierdo) >= Number(valorDerecho);
          }
          case TipoOperador.MenorIgual:{
            return Number(valorIzquierdo) <= Number(valorDerecho);
          }
          case TipoOperador.And:{
            return valorIzquierdo && valorDerecho;
          }
          case TipoOperador.And:{
            return valorIzquierdo || valorDerecho;
          }
        }
      }break;
    }
    
  }

  ProcesarNodoRaizXquery(raiz:sentenciaXpath, xml:Objeto[],padre:Objeto[]):Objeto[]{
    var xmlActual:Objeto[];
    
    switch(raiz.Tipo.Tipo){
      case TipoNodo.Raiz :
      {  
        if(raiz.Hijo == null){
          throw new Error("Error por manejar luego del nodo / debe de venir un el nombre de un elemento");
        }
        xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre) 
      }break;
      case TipoNodo.ID:
      { 
        this.retroceder = true;
        
        if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
          this.listaDescendientes.push(raiz);
        }
        padre = xml;
       
        xml = this.GetXmlEtiqueta(xml,raiz);
       
        xmlActual = xml;
        if(raiz.Hijo == null){
          if(xml.length <= 0){
            //xmlActual = "No se encontraron elementos";
          }else{
            xmlActual = xml;
            // xml.forEach(element => {
            //   xmlActual = this.GetXmlText(element);
            //  });
          }
        }else{
          xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre) 
        }
      } break;
      case TipoNodo.Atributo:
      {
        if(raiz.Tipo.Valor == '*'){
          xml = this.GetAllAtributos(xml);
        }
        //console.log(xml);
        this.retroceder = false;
        if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente && raiz.Tipo.Valor != '*'){
          this.listaDescendientes.push(raiz);
          xml = this.GetXmlEtiqueta(xml,raiz);
          padre = xml;
        }

        if(xml.length <= 0){
          //result += "No se encontraron elementos";
        }else{
          if( raiz.Tipo.Valor != '*')
            xml = this.GetXmlEtiqueta(xml,raiz);
          
        }

        if(raiz.Hijo == null){
          if( raiz.Tipo.Valor != '*')
          xmlActual = xml
          // xml.forEach(element => {
          //   element.listaAtributos.forEach(atr => {
          //     if(atr.identificador == raiz.Tipo.Valor){
          //       result += atr.identificador + ' = ' + atr.valor + '\n';
          //     }
          //   });
          // });
          else
            xmlActual = xml
            // xml.forEach(element => {
            //   result += this.GetXmlText(element);
            // });
            
        }else{
          //falta validar comportamiento
          xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre);
        }
      } break;
      case TipoNodo.Descendiente:
      { 
        if(raiz.Hijo == null){
          throw new Error("Error por manejar luego del nodo // debe de venir un el nombre de un elemento");
        }
        xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre);
      }break;
      case TipoNodo.NodoPadre:
      {
        //console.log(this.retroceder);
        if(this.retroceder){
          var xmlTemp = [];
          xml.forEach(element => {
          var existe = false;
          xmlTemp.forEach(item => {
              if(item == element.padre)
              existe = true;
          });
          if(!existe)
            xmlTemp.push(element.padre);
          });
          xml = xmlTemp;
        }
        this.retroceder = true;
        if(raiz.Hijo == null){
          xmlActual = xml;
          // xml.forEach(element => {
          //   result += this.GetXmlText(element);
          // });
        }else{
          //falta validar comportamiento
          xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre);
        }
       
      }break;
      case TipoNodo.Asterisco :
      { 
        padre = xml;
        xml = [];
        padre.forEach(element => {
          xml = xml.concat(element.listaObjetos);
        });
        if(raiz.Hijo ==null){
          xmlActual = xml;
          // xml.forEach(element => {
          //   result += this.GetXmlText(element);
          // });
        }else{
          xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre);
        }
      }break;
      case TipoNodo.AutoReferencia :
        { 
          if(raiz.Hijo ==null){
            xmlActual = xml;
            // xml.forEach(element => {
            //   result += this.GetXmlText(element);
            // });
          }else{
            xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre);
          }
          
        }break;
      case TipoNodo.Axis :
      {  
        if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
          this.listaDescendientes.push(raiz);
        }
        switch(raiz.Tipo.Valor){
          case 'ancestor':{
          
            xml = this.GetXmlEtiqueta(xml,raiz);
          }break;
          case 'ancestor-or-self':{
            
            xml = this.GetXmlEtiqueta(xml,raiz);
          }break;
          case 'attribute':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              padre = xml;
              xml = this.GetAllAtributos(xml);
              var temp:Objeto[] =[];
              //console.log('attribute');
              //console.log(xml);
              xml.forEach(element => {
                element.listaAtributos.forEach(atr => {
                  if(atr.identificador == raiz.Tipo.AxisNodo.Valor){
                    temp.push(element);
                  }
                });
              });
              xml = temp;
            }
            
          }break;
          case 'child':{
              
              xml = this.GetXmlEtiqueta(xml,raiz);
              //console.log('xml child');
              //console.log(xml);
             
          }break;
          case 'descendant':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              padre = xml;
              xml = this.GetDescendientesXml(xml,raiz.Tipo.AxisNodo.Valor)
            }
          }break;
          case 'descendant-or-self':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              padre = xml;
              xml = this.GetDescendientesXml(xml,raiz.Tipo.AxisNodo.Valor)
            }
          }break;
          case 'following':{
            var temp :Objeto[]=[];
            xml.forEach(element => {
              temp= temp.concat(element.listaObjetos);
            });
            xml = temp;
          }break;
          case 'following-sibling':{
            var temp :Objeto[]=[];
            xml.forEach(element => {
              temp= temp.concat(element.listaObjetos);
            });
            xml = temp;
          }break;
          case 'namespace':{
            
          }break;
          case 'parent':{
            var temp :Objeto[]=[];
            xml.forEach(element => {
              if(element.padre!= null){
                if(!temp.includes(element)){
                  temp.push(element);
                }
              }
            });
            xml = temp;
          }break;
          case 'preceding':{
            
          }break;
          case 'preceding-sibling':{
            
          }break;
          case 'self':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              xmlActual = xml;
              // xml.forEach(element => {
              //   result += this.GetXmlText(element);
              // });
            }
          }break;
        }
        if(raiz.Hijo ==null){
         
          if(raiz.Tipo.Valor == 'attribute'){
            xmlActual = xml;
            // xml.forEach(element => {
            //  element.listaAtributos.forEach(atr => {
            //   result += atr.identificador + '=' + atr.valor;
            //  });
            // });
          }else{
            xmlActual = xml;
            // xml.forEach(element => {
            //   result += this.GetXmlText(element);
            // });
          }
        }else{
          xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre);
        }
      }break;
      case TipoNodo.Funcion_Text :
      {
        if(raiz.Hijo == null){
          // //console.log('text');
          // //console.log(xml);
          xmlActual = xml;
          //result += this.GetText(xml);
        }
      }break;
      case TipoNodo.Funcion_Node :
      {
        // //console.log('node');
        // //console.log(xml);
        // xml = this.GetNodes(xml);
        // //console.log(xml);
        if(raiz.Hijo ==null){
          xmlActual = xml;
          // xml.forEach(element => {
          //   result += this.GetXmlText(element);
          // });
        }else{
          xmlActual = this.ProcesarNodoRaizXquery(raiz.Hijo,xml,padre);
        }
      }break;
    }
    return xmlActual;
  }


  openTablaSimbolos() {
    
    var lista = [];
    lista.push(this.ObjetoReporte);
    this.dialog.open(TablaSimbolosComponent, {
      data: lista,
      maxHeight: '80%'
    });
  }

  ProcesarNodoRaiz(raiz:sentenciaXpath, xml:Objeto[],padre:Objeto[]):string{
    var xmlActual:Objeto[];
    var result = "";
    switch(raiz.Tipo.Tipo){
      case TipoNodo.Raiz :
      {  
        if(raiz.Hijo == null){
          throw new Error("Error por manejar luego del nodo / debe de venir un el nombre de un elemento");
        }
        result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre) 
      }break;
      case TipoNodo.ID:
      { 
        this.retroceder = true;
        //console.log('Procesando ID: ' + raiz.Tipo.Valor);
        if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
          this.listaDescendientes.push(raiz);
        }
        padre = xml;
        xml = this.GetXmlEtiqueta(xml,raiz);
        if(raiz.Hijo == null){
          if(xml.length <= 0){
            result += "No se encontraron elementos";
          }else{
            xml.forEach(element => {
              result += this.GetXmlText(element);
             });
          }
        }else{
          result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre) 
        }
      } break;
      case TipoNodo.Atributo:
      {
        //console.log("atributo");
        //console.log(xml);
        //console.log(raiz);
        if(raiz.Tipo.Valor == '*'){
          xml = this.GetAllAtributos(xml);
        }
        //console.log(xml);
        this.retroceder = false;
        if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente && raiz.Tipo.Valor != '*'){
          this.listaDescendientes.push(raiz);
          xml = this.GetXmlEtiqueta(xml,raiz);
          padre = xml;
        }

        if(xml.length <= 0){
          result += "No se encontraron elementos";
        }else{
          if( raiz.Tipo.Valor != '*')
            xml = this.GetXmlEtiqueta(xml,raiz);
          
        }

        if(raiz.Hijo == null){
          if( raiz.Tipo.Valor != '*')
          xml.forEach(element => {
            element.listaAtributos.forEach(atr => {
              if(atr.identificador == raiz.Tipo.Valor){
                result += atr.identificador + ' = ' + atr.valor + '\n';
              }
            });
          });
          else
            xml.forEach(element => {
              result += this.GetXmlText(element);
            });
            
        }else{
          //falta validar comportamiento
          result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
        }
      } break;
      case TipoNodo.Descendiente:
      { 
        if(raiz.Hijo == null){
          throw new Error("Error por manejar luego del nodo // debe de venir un el nombre de un elemento");
        }
        result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
      }break;
      case TipoNodo.NodoPadre:
      {
        //console.log(this.retroceder);
        if(this.retroceder){
          var xmlTemp = [];
          xml.forEach(element => {
          var existe = false;
          xmlTemp.forEach(item => {
              if(item == element.padre)
              existe = true;
          });
          if(!existe)
            xmlTemp.push(element.padre);
          });
          xml = xmlTemp;
        }
        this.retroceder = true;
        if(raiz.Hijo == null){
          xml.forEach(element => {
            result += this.GetXmlText(element);
          });
        }else{
          //falta validar comportamiento
          result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
        }
       
      }break;
      case TipoNodo.Asterisco :
      { 
        padre = xml;
        xml = [];
        padre.forEach(element => {
          xml = xml.concat(element.listaObjetos);
        });
        if(raiz.Hijo ==null){
          xml.forEach(element => {
            result += this.GetXmlText(element);
          });
        }else{
          result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
        }
      }break;
      case TipoNodo.AutoReferencia :
        { 
          if(raiz.Hijo ==null){
            xml.forEach(element => {
              result += this.GetXmlText(element);
            });
          }else{
            result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
          }
          
        }break;
      case TipoNodo.Axis :
      {  
        if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
          this.listaDescendientes.push(raiz);
        }
        switch(raiz.Tipo.Valor){
          case 'ancestor':{
          
            xml = this.GetXmlEtiqueta(xml,raiz);
          }break;
          case 'ancestor-or-self':{
            
            xml = this.GetXmlEtiqueta(xml,raiz);
          }break;
          case 'attribute':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              padre = xml;
              xml = this.GetAllAtributos(xml);
              var temp:Objeto[] =[];
              //console.log('attribute');
              //console.log(xml);
              xml.forEach(element => {
                element.listaAtributos.forEach(atr => {
                  if(atr.identificador == raiz.Tipo.AxisNodo.Valor){
                    temp.push(element);
                  }
                });
              });
              xml = temp;
            }
            
          }break;
          case 'child':{
              
              xml = this.GetXmlEtiqueta(xml,raiz);
              //console.log('xml child');
              //console.log(xml);
             
          }break;
          case 'descendant':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              padre = xml;
              xml = this.GetDescendientesXml(xml,raiz.Tipo.AxisNodo.Valor)
            }
          }break;
          case 'descendant-or-self':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              padre = xml;
              xml = this.GetDescendientesXml(xml,raiz.Tipo.AxisNodo.Valor)
            }
          }break;
          case 'following':{
            var temp :Objeto[]=[];
            xml.forEach(element => {
              temp= temp.concat(element.listaObjetos);
            });
            xml = temp;
          }break;
          case 'following-sibling':{
            var temp :Objeto[]=[];
            xml.forEach(element => {
              temp= temp.concat(element.listaObjetos);
            });
            xml = temp;
          }break;
          case 'namespace':{
            
          }break;
          case 'parent':{
            var temp :Objeto[]=[];
            xml.forEach(element => {
              if(element.padre!= null){
                if(!temp.includes(element)){
                  temp.push(element);
                }
              }
            });
            xml = temp;
          }break;
          case 'preceding':{
            
          }break;
          case 'preceding-sibling':{
            
          }break;
          case 'self':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              xml.forEach(element => {
                result += this.GetXmlText(element);
              });
            }
          }break;
        }
        if(raiz.Hijo ==null){
         
          if(raiz.Tipo.Valor == 'attribute'){
            xml.forEach(element => {
             element.listaAtributos.forEach(atr => {
              result += atr.identificador + '=' + atr.valor;
             });
            });
          }else{
            xml.forEach(element => {
              result += this.GetXmlText(element);
            });
          }
        }else{
          result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
        }
      }break;
      case TipoNodo.Funcion_Text :
      {
        if(raiz.Hijo == null){
          //console.log('text');
          //console.log(xml);
          result += this.GetText(xml);
        }
      }break;
      case TipoNodo.Funcion_Node :
      {
        // //console.log('node');
        // //console.log(xml);
        // xml = this.GetNodes(xml);
        // //console.log(xml);
        if(raiz.Hijo ==null){
          xml.forEach(element => {
            result += this.GetXmlText(element);
          });
        }else{
          result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
        }
      }break;
    }


    return result;
  }
  GetNodes(xml:Objeto[]):Objeto[]{
    var result:Objeto[] = [];
    xml.forEach(element => {
      result = result.concat(element.listaObjetos);
      result = this.GetNodes(element.listaObjetos);
    });
    return result;
  }
  GetText(xml:Objeto[]):string{
    var result = '';
    xml.forEach(element => {
      result += element.texto + '\n';
      result += this.GetText(element.listaObjetos);
    });
    return result;
  }
  GetXmlEtiqueta(xml:Objeto[],etiqueta:sentenciaXpath):Objeto[]
  { 
    
    var result:Objeto[] = [];
    if(this.listaDescendientes.length > 0){
      result = this.BuscarValorDescendiente(xml);
      this.listaDescendientes = [];
    }else{
      if(etiqueta.Tipo.Tipo == TipoNodo.Atributo){
        xml.forEach(element => {
          element.listaAtributos.forEach(atr => {
            if(atr.identificador == etiqueta.Tipo.Valor){
              result.push(element);
            }
          });
        });
      }else{
        xml.forEach(element => {
          if(element.listaObjetos != undefined)
          element.listaObjetos.forEach(obj => {
            if(obj.identificador == etiqueta.Tipo.Valor){
              result.push(obj);
            }
          });
        });
      }
     
    }
    if(etiqueta.Parametro!=null){
      result = this.FiltrarOperacion(result,etiqueta);
    }
    return result;
  }

  GetDescendientesXml(xml:Objeto[],etiqueta:string):Objeto[]{
    var result:Objeto[]=[];
    xml.forEach(element => {
      if(element.identificador == etiqueta){
        result.push(element);
      }
      result = result.concat(this.GetDescendientesXml(element.listaObjetos,etiqueta));
    });
    return result;
  }
  GetAllAtributos(xml:Objeto[]):Objeto[]{
    var result:Objeto[] = [];
    xml.forEach(element => {
      if(element.listaAtributos.length>0 && element.identificador != 'Encabezado'){
        result.push(element);
      }
      result = result.concat( this.GetAllAtributos(element.listaObjetos));
    });

    return result;
  }
  
  ResolverOperacion(operacion: ParametroOperacionXpath,xml:Objeto[]):any[]{
    switch (operacion.Operacion.TipoOperador){
      case TipoOperador.Mas: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
            izquierdo = xml.length;
          }else{
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }
          
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
            derecho = xml.length;
          }else{
            derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
          }
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
        }
        var ret = [];
        ret.push(izquierdo + derecho);
        return ret;
      } break;
      case TipoOperador.Menos: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
            izquierdo = xml.length;
          }else{
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }
         
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
            derecho = xml.length;
          }else{
            derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
          }
         
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
        }
        
        var ret = [];
        ret.push(izquierdo - derecho);
        return ret;

      } break;
      case TipoOperador.Por: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
            izquierdo = xml.length;
          }else{
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
            derecho = xml.length;
          }else{
            derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
          }
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
        }
        var ret = [];
        ret.push(izquierdo * derecho);
        return ret;
      } break;
      case TipoOperador.Div: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
            izquierdo = xml.length;
          }else{
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
            derecho = xml.length;
          }else{
            derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
          }
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
        }
        var ret = [];
        ret.push(izquierdo / derecho);
        return ret;
      } break;
      case TipoOperador.Mod: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + 'mod' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
            izquierdo = xml.length;
          }else{
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + 'mod' + operacion.Operacion.ParametroDerecho.Valor);
          }
          if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
            derecho = xml.length;
          }else{
            derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
          }
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
        }
        var ret = [];
        ret.push(izquierdo % derecho);
        return ret;
      } break;
      case TipoOperador.Mayor: {
        //console.log(operacion);
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Position
            &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Nodo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Nodo
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Position
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena){
            throw new Error('Error expresion invalida con operador \'>\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Nodo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Position
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>' + operacion.Operacion.ParametroDerecho.Valor);
              }
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push(">");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }
              else{
                if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
                  derecho = xml.length;
                }else{
                  derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
                }
              }
              
            }else{
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){//verficar si entra aca en algun momento
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push(">");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }else{
                //de momento solo se resulven operaciones aritmeticas
                if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Entero)
                {
                  derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
                }else{
                  derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
                }
                
              }
              
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push(">");
            ret.push( 0);
            ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if( operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>' + operacion.Operacion.ParametroDerecho.Valor);
            }
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push(">");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
                izquierdo = xml.length;
              }else{
                izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
              }
              
            }
            
            
          }else{
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push(">");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
            }
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push(">");
          ret.push(1);
          ret.push(operacion.Operacion.ParametroDerecho.Tipo);
         return ret;
        }
      } break;
      case TipoOperador.Menor: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Nodo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Nodo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Position
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Position
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena){
            throw new Error('Error expresion invalida con operador \'<\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Nodo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Position
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<' + operacion.Operacion.ParametroDerecho.Valor);
              }
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("<");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }
              else{
                if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
                  derecho = xml.length;
                }else{
                  derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
                }
              }
              
            }else{
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){//verficar si entra aca en algun momento
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("<");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }else{
                //de momento solo se resulven operaciones aritmeticas
                derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
              }
              
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("<");
            ret.push( 0);
            ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if( operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<' + operacion.Operacion.ParametroDerecho.Valor);
            }
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("<");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
                izquierdo = xml.length;
              }else{
                izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
              }
              
            }
            
            
          }else{
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("<");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
            }
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("<");
          ret.push(1);
          ret.push(operacion.Operacion.ParametroDerecho.Tipo);
         return ret;
        }
      } break;
      case TipoOperador.MenorIgual: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Nodo
        && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Nodo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Position
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Position
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena){
            throw new Error('Error expresion invalida con operador \'<=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Nodo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Position
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("<=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }
              else{
                if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
                  derecho = xml.length;
                }else{
                  derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
                }
              }
              
            }else{
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){//verficar si entra aca en algun momento
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("<=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }else{
                //de momento solo se resulven operaciones aritmeticas
                derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
              }
              
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("<=");
            ret.push( 0);
            ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if( operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("<=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
                izquierdo = xml.length;
              }else{
                izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
              }
              
            }
            
            
          }else{
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("<=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
            }
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("<=");
          ret.push(1);
          ret.push(operacion.Operacion.ParametroDerecho.Tipo);
         return ret;
        }
      } break;
      case TipoOperador.MayorIgual: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Nodo
        && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Nodo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Position
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Position
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena){
            throw new Error('Error expresion invalida con operador \'>=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Nodo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Position
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push(">=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }
              else{
                if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
                  derecho = xml.length;
                }else{
                  derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
                }
              }
              
            }else{
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){//verficar si entra aca en algun momento
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push(">=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }else{
                //de momento solo se resulven operaciones aritmeticas
                derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
              }
              
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push(">=");
            ret.push( 0);
            ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if( operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push(">=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
                izquierdo = xml.length;
              }else{
                izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
              }
              
            }
            
            
          }else{
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push(">=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
            }
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push(">=");
          ret.push(1);
          ret.push(operacion.Operacion.ParametroDerecho.Tipo);
         return ret;
        }
      } break;
      case TipoOperador.Igual: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Nodo
        && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Nodo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Position
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Position
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena){
            throw new Error('Error expresion invalida con operador \'=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Nodo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Position
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }
              else{
                if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
                  derecho = xml.length;
                }else{
                  derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
                }
              }
              
            }else{
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){//verficar si entra aca en algun momento
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }else{
                //de momento solo se resulven operaciones aritmeticas
                derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
              }
              
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("=");
            ret.push( 0);
            ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if( operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
                izquierdo = xml.length;
              }else{
                izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
              }
              
            }
            
            
          }else{
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
            }
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("=");
          ret.push(1);
          ret.push(operacion.Operacion.ParametroDerecho.Tipo);
         return ret;
        }
      } break;
      case TipoOperador.Diferente: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Nodo
        && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Nodo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Position
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Position
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena){
            throw new Error('Error expresion invalida con operador \'!=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Nodo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Position
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '!=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("!=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }
              else{
                if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Funtion_Last){
                  derecho = xml.length;
                }else{
                  derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
                }
              }
              
            }else{
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){//verficar si entra aca en algun momento
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("!=");
                ret.push( 0);
                ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
               return ret;
              }else{
                //de momento solo se resulven operaciones aritmeticas
                derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho,xml)[0];
              }
              
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("!=");
            ret.push( 0);
            ret.push(operacion.Operacion.ParametroIzquierdo.Tipo);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if( operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '!=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("!=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Funtion_Last){
                izquierdo = xml.length;
              }else{
                izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
              }
              
            }
            
            
          }else{
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("!=");
              ret.push( 1);
              ret.push(operacion.Operacion.ParametroDerecho.Tipo);
             return ret;
            }else{
              izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo,xml)[0];
            }
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("!=");
          ret.push(1);
          ret.push(operacion.Operacion.ParametroDerecho.Tipo);
         return ret;
        }
      } break;
      case TipoOperador.And: {} break;
      case TipoOperador.Or: {} break;
    }
  }

  
  GetAtributosDescendencia(xml:Objeto[],etiqueta:string):string{
    var ret = "" ;
      xml.forEach(element => {
        element.listaAtributos.forEach(atr => {
        if(atr.identificador == etiqueta){
          ret += atr.identificador + '='+ atr.valor + '\n';
        }
        });
        ret +=this.GetAtributosDescendencia(element.listaObjetos,etiqueta);
      });
    return ret;
  }

  BuscarValorDescendiente(xml:Objeto[]):Objeto[]{
    //var result = "";
    var temp = xml;
    this.listaDescendientes.forEach(item => {
      var aux:Objeto[] = [];
      if(temp!=undefined)
      { 
        //console.log('BuscarValorDescendiente');
        //console.log(xml);
        //console.log(item);
        temp.forEach(element => {
          if(item.Tipo.Tipo == TipoNodo.Atributo){
            element.listaAtributos.forEach(atr => {
              if(atr.identificador == item.Tipo.Valor){
                aux.push(element);
              }
            });
            aux = aux.concat(this.BuscarEtiqueta(element.listaObjetos,item));
          }else if(item.Tipo.Tipo == TipoNodo.Axis){
            if(item.Tipo.AxisNodo.Tipo == TipoNodo.Atributo){
              element.listaAtributos.forEach(atr => {
                if(atr.identificador == item.Tipo.AxisNodo.Valor){
                  aux.push(element);
                }
              });
              aux = aux.concat(this.BuscarEtiqueta(element.listaObjetos,item));
            }else{
              if(element.identificador == item.Tipo.AxisNodo.Valor){
                aux.push(element);
              }else{
                aux = aux.concat(this.BuscarEtiqueta(element.listaObjetos,item));
              }
            }
            
          }
          else{
            if(element.identificador == item.Tipo.Valor){
              aux.push(element);
            }else{
              aux = aux.concat(this.BuscarEtiqueta(element.listaObjetos,item));
            }
          }
        });
      }
      temp = aux;
      // if(item.Parametro!=null){
      //   //console.log('item con operacion');
      //   //console.log(temp);
      //   temp = this.FiltrarOperacion(temp,item);
      //   //console.log(temp);
      // }
    });

    //result = this.BuscarValorEtiqueta(temp,this.listaDescendientes[this.listaDescendientes.length -1],onlyParamas);

  
    return temp;
  }

  BuscarEtiqueta(xml:Objeto[],etiqueta:sentenciaXpath):Objeto[]{
    var ret:Objeto[]=[];
    xml.forEach(element => {
      if(etiqueta.Tipo.Tipo == TipoNodo.Atributo){
        element.listaAtributos.forEach(atr => {
          if(atr.identificador == etiqueta.Tipo.Valor){
            ret.push(element);
          }
        });
        if(element.listaObjetos.length > 0)
        { 
          ret = ret.concat( this.BuscarEtiqueta(element.listaObjetos,etiqueta));
        }
      }else if(etiqueta.Tipo.Tipo == TipoNodo.Axis){
        if(etiqueta.Tipo.AxisNodo.Tipo == TipoNodo.Atributo){
          element.listaAtributos.forEach(atr => {
            if(atr.identificador == etiqueta.Tipo.AxisNodo.Valor){
              ret.push(element);
            }
          });
          if(element.listaObjetos.length > 0)
          { 
            ret = ret.concat( this.BuscarEtiqueta(element.listaObjetos,etiqueta));
          }
        }else{
          if(element.identificador == etiqueta.Tipo.AxisNodo.Valor){
            ret.push(element);
          }else{
            if(element.listaObjetos.length > 0)
            ret = ret.concat( this.BuscarEtiqueta(element.listaObjetos,etiqueta));
          }
        }
      }
      else{
        if(element.identificador == etiqueta.Tipo.Valor){
          ret.push(element);
        }else{
          if(element.listaObjetos.length > 0)
          ret = ret.concat( this.BuscarEtiqueta(element.listaObjetos,etiqueta));
        }
      }
      
    });

    return ret;
  }
 
  FiltrarOperacion(xml:Objeto[],etiqueta:sentenciaXpath):Objeto[]{
    var result:Objeto[] = [];
    if(etiqueta.Parametro!=null){
      switch(etiqueta.Parametro.Tipo){
        case TipoParametro.Operacion:{
          
        
          var ret = this.ResolverOperacion(etiqueta.Parametro,xml);
          
          if(ret.length <= 1){ // operaciones aritmeticas
            if(xml.length >= ret[0]){
              result.push(xml[ret[0]-1]);
            }else{
              result = [];
            }
          }else{ // operaciones logicas
            let re = /\"/gi;
            let ra = /\\/gi;
            //console.log('logica');
            //console.log(ret);
            if(ret[4] == TipoParametro.Atributo){
              xml.forEach(element => {
                element.listaAtributos.forEach(atr => {
                  if(ret[3] == 0 ){
                    switch(ret[2]){
                      case "=":{
                        if(atr.valor.replace(re,'').replace(ra,'') == ret[1].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
                        }
                      }break;
                      case "!=":{
                        if(atr.valor.replace(re,'').replace(ra,'') != ret[1].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
                        }
                      }break;
                      case "<":{
                        if(Number(atr.valor) < Number(ret[1]))
                        {
                          result .push(element);
                        }
                      }break;
                      case ">":{
                        if(Number(atr.valor) > Number(ret[1]))
                        {
                          result .push(element);
                        }
                      }break;
                      case ">=":{
                        if(Number(atr.valor) >= Number(ret[1]))
                        {
                          result .push(element);
                        }
                      }break;
                      case "<=":{
                        if(Number(atr.valor) <= Number(ret[1]))
                        {
                          result .push(element);
                        }
                      }break;
                    }
                  }else{
                    switch(ret[2]){
                      case "=":{
                        if(atr.valor.replace(re,'').replace(ra,'') == ret[0].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
                        }
                      }break;
                      case "!=":{
                        if(atr.valor.replace(re,'').replace(ra,'') != ret[0].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
                        }
                      }break;
                      case "<":{
                        if(Number(atr.valor) < Number(ret[0]))
                        {
                          result .push(element);
                        }
                      }break;
                      case ">":{
                        if(Number(atr.valor) > Number(ret[0]))
                        {
                          result .push(element);
                        }
                      }break;
                      case "<=":{
                        if(Number(atr.valor) <= Number(ret[0]))
                        {
                          result .push(element);
                        }
                      }break;
                      case ">=":{
                        if(Number(atr.valor) >= Number(ret[0]))
                        {
                          result .push(element);
                        }
                      }break;
                    }
                  }
                });
              });
            }else if(ret[4] == TipoParametro.Funtion_Position){
              if(ret[3] == 0 ){
                switch(ret[2]){
                  case "<":{
                    for(var i = 1; i<Number(ret[1]);i++){
                      if(xml.length>=i+1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case "<=":{
                    for(var i = 1; i<Number(ret[1]);i++){
                      if(xml.length>=i+1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case ">":{
                    for(var i = Number(ret[1]+1); i<=xml.length;i++){
                      if(xml.length>=i+1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case ">=":{
                    for(var i = Number(ret[1]); i<=xml.length;i++){
                      if(xml.length>=i+1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case "=":{
                    if(xml.length>=Number(ret[1]))
                        result.push(xml[Number(ret[1])-1]);
                  }break;
                  case "!=":{
                    var int= 1;
                    xml.forEach(element => {
                      if(int != Number(ret[1]))
                        result.push(element);
                      int++;
                    });
                  }break;
                }
              }else{
                switch(ret[2]){
                  case "<":{
                    for(var i = 1; i<Number(ret[0]);i++){
                      if(xml.length >= i + 1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case "<=":{
                    for(var i = 1; i <= Number(ret[0]);i++){
                      if(xml.length >= i + 1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case ">":{
                    for(var i = Number(ret[0]+1); i<=xml.length;i++){
                      if(xml.length>=i+1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case ">=":{
                    for(var i = Number(ret[0]); i<=xml.length;i++){
                      if(xml.length>=i+1)
                        result .push(xml[i-1]);
                    }
                  }break;
                  case "=":{
                    if(xml.length>=Number(ret[0]))
                        result.push(xml[Number(ret[0])-1]);
                  }break;
                  case "!=":{
                    var int= 1;
                    xml.forEach(element => {
                      if(int != Number(ret[0]))
                        result.push(element);
                      int++;
                    });
                  }break;
                }
              }
            }else{
              //console.log('?');
              //console.log(xml);
              xml.forEach(element => {
                if(ret[3] == 0 ){
                  switch(ret[2]){
                    case "=":{
                      element.listaObjetos.forEach(obj => {
                        if(ret[0].includes('@')){
                          var arr = ret[0].split('@');
                          if(obj.identificador == arr[0]){
                            obj.listaAtributos.forEach(atr => {
                              if(atr.identificador == arr[1]){
                                if(atr.valor.replace(re,'').replace(ra,'') == ret[1].toString().replace(re,'').replace(ra,''))
                                {
                                  result .push(element);
                                }
                              }
                            });
                          }
                        }else{
                          if(obj.texto.replace(re,'').replace(ra,'') == ret[1].toString().replace(re,'').replace(ra,''))
                          {
                            result .push(element);
                          }
                        }
                      });
                    }break;
                    case "!=":{
                      element.listaObjetos.forEach(obj => {
                        if(obj.texto.replace(re,'').replace(ra,'') == ret[1].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case ">":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) > Number(ret[1]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case "<":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) < Number(ret[1]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case "<=":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) <= Number(ret[1]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case ">=":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) >= Number(ret[1]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                  }
                }else{
                  switch(ret[2]){
                    case "=":{
                      element.listaObjetos.forEach(obj => {
                        if(obj.texto.replace(re,'').replace(ra,'') == ret[0].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case "!=":{
                      element.listaObjetos.forEach(obj => {
                        if(obj.texto.replace(re,'').replace(ra,'') != ret[0].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case ">":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) > Number(ret[0]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case "<":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) < Number(ret[0]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case "<=":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) <= Number(ret[0]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                    case ">=":{
                      element.listaObjetos.forEach(obj => {
                        if(Number(obj.texto) >= Number(ret[0]))
                        {
                          result .push(element);
                        }
                      });
                    }break;
                }
                  
                }
              });
            }
            
          }
        }break;
        case TipoParametro.Nodo:{
          //console.log('Nodo')
          //console.log(xml)
          //console.log(etiqueta)
          xml.forEach(element => {
            element.listaObjetos.forEach(obj => {
              if(etiqueta.Parametro.Valor.includes('@')){
                var arr = etiqueta.Parametro.Valor.split('@');
                if(obj.identificador == arr[0]){
                  obj.listaAtributos.forEach(atr => {
                    if(atr.identificador == arr[1]){
                      result.push(element);
                    }
                  });
                }
              }else{
                if(obj.identificador == etiqueta.Parametro.Valor){
                  result.push(element);
                }
              }

              
            });
          });
          
        }break;
        case TipoParametro.Ruta:{
          //console.log('Ruta perro')
          //console.log(xml)
          //console.log(etiqueta)
          xml.forEach(element => {
            element.listaObjetos.forEach(obj => {
              if(obj.identificador == etiqueta.Parametro.Valor){
                result.push(element);
              }
            });
          });
          
        }break;
        case TipoParametro.Atributo:{
          xml.forEach(element => {
            element.listaAtributos.forEach(atr => {
              if(atr.identificador == etiqueta.Parametro.Valor){
                result.push(element);
              }
            });
          });
          
        }break;
        case TipoParametro.Entero:{
         
          var indice = Number(etiqueta.Parametro.Valor);
          if(xml.length >= indice && xml.length > 0)
          {
            result = [];
            result.push(xml[indice-1]);
          }else{
            result = [];
          }
        }break;
        case TipoParametro.Funtion_Last:{
          
          if(xml.length > 0)
          {
            result = [];
            result.push(xml[xml.length-1]);
          }else{
            result = [];
          }
        }break;
      }
      
    }
    return result ;
  }
  GetXmlText(xml:Objeto):string{
    var xmlText = "<" +xml.identificador;
    xml.listaAtributos.forEach(element => {
      xmlText +=" " + element.identificador +" = " + element.valor;
    });
    if(xml.tipo == 0)
    {
      xmlText +=">";
      xmlText +=xml.texto;
      xml.listaObjetos.forEach(element => {
        xmlText += this.GetXmlText(element);
      });
      xmlText +="</" +xml.identificador+ ">";
    }
    else if(xml.tipo == 1)
    {
      xmlText +="/>";
    }
  
    return xmlText + '\n';
  }

  openFile(){
    document.querySelector('input').click()
  }
  handle(e){
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsText(file);
  }
  _handleReaderLoaded(e) {
    //console.log(e);
    let reader = e.target;
    this.xmlText = reader.result;
  }

  expFile() {
    var fileName = "xml.txt";
    this.saveTextAsFile(this.xmlText , fileName);
    }
    saveTextAsFile (data, filename){

          if(!data) {
                console.error('Console.save: No data')
                return;
            }

            if(!filename) filename = 'console.json'

            var blob = new Blob([data], {type: 'text/plain'}),
                e    = document.createEvent('MouseEvents'),
                a    = document.createElement('a')
      // FOR IE:

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
      }
      else{
          var e = document.createEvent('MouseEvents'),
              a = document.createElement('a');

          a.download = filename;
          a.href = window.URL.createObjectURL(blob);
          a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
          e.initEvent('click', true, false);
          a.dispatchEvent(e);
      }
  }

  d3() {
    graphviz('#graph').width(500);
    graphviz('#graph').height(750);
      graphviz('#graph').renderDot('digraph {a -> b}');
    }
    dibujar(){
      graphviz('#graph').width(500);
    graphviz('#graph').height(750);
    
      const objetos = this.astXML.parse(this.xmlText);    
    //console.log('objetos almacenados--->', objetos);
    const arbol = new this.arbol.CrearArbolDot();
    ////console.log(arbol);   
    var recorrido=arbol.recorrerHijos(objetos[1]);
    //console.log(recorrido);
    this.rgxmlasc=objetos[2].arreglo_elementos;
    graphviz('#graph').renderDot('digraph {'+recorrido+'}');
//console.log();
    }

    generarReporteGramaticalXML(){
     /* var data= this.rgxmlasc;
    var table = "";

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].Produccion}</td>
                            <td>${data[i].Regla_}</td>
					  </tr>`;
			table += row;
		}
    this.tablaXML=table;*/
    }
 

    generarReporteErroresXML(){
      var xmlObject = this.astXML.parse(this.xmlText)[3] as ListaErrores;
      
    var lista = [];
    lista.push(xmlObject.l_errores);
    this.dialog.open(ErroresXMLComponent, {
      data: lista,
      maxHeight: '80%'
    });

    }

    dibujarCSTDes(){
      graphviz('#graph2').width(500);
    graphviz('#graph2').height(750);
    
    const objetos = this.cstxml.parse(this.xmlText);    
    //console.log('objetos almacenados--->', objetos);
    const arbol = new this.arbol.CrearArbolDot();
    ////console.log(arbol);   
    var recorrido=arbol.recorrerHijos(objetos[1]);
    //console.log(recorrido);
    this.rgxmldesc=objetos[2].arreglo_elementos;
    graphviz('#graph2').renderDot('digraph {'+recorrido+'}');
//console.log();
    }

  traducirXml(){
    var objetos = this.objetosTraducir.parse(this.xmlText) as Objeto;
    ////console.log(objetos.listaObjetos);
    const traduction= new this.xmlTraductor.TraductorXML_C3D();
    var codigo= traduction.traducir(objetos.listaObjetos);
    this.ObjetoReporte = objetos;
    this.xmlTraducido=codigo;

    var valor = [];
    this.ProcessedData.xPathData.forEach(element => {
      var elementoActual = element;
      element.Hijo = null;
      while(elementoActual.Padre !=null){
        elementoActual.Padre.Hijo = elementoActual;
        elementoActual = elementoActual.Padre;
      }

       valor = valor.concat(this.ProcesarNodoRaizXquery(elementoActual,[objetos],[]));
     
    });

   
   
    //console.log("**************Valor");
    //console.log(valor);
    var codigoConsulta=traduction.traducirconsulta(valor);
    this.consultac3d=codigoConsulta;
    this.c3dTemporales=traduction.generarTemporales();


  }

  dibujarAst(){
    graphviz('#graphAst').width(500);
    graphviz('#graphAst').height(750);
  
  const objetos = this.ast3d.parse(this.c3dText);    
  console.log('objetos almacenados--->', objetos);
  const arbol = new this.arbol.CrearArbolDot();
  //console.log(arbol);   
  var recorrido=arbol.recorrerHijos(objetos[1]);
  console.log(recorrido);
 //this.rgxmldesc=objetos[2].arreglo_elementos;
  graphviz('#graph2').renderDot('digraph {'+recorrido+'}');
console.log();
  }

  dibujarCst(){
    graphviz('#graphCst').width(500);
  graphviz('#graphCst').height(750);
  
  const objetos = this.cst3d.parse(this.c3dText);    
  console.log('objetos almacenados--->', objetos);
  const arbol = new this.arbol.CrearArbolDot();
  //console.log(arbol);   
  var recorrido=arbol.recorrerHijos(objetos[2]);
  console.log(recorrido);
 // this.rgxmldesc=objetos[2].arreglo_elementos;
  graphviz('#graphCst').renderDot('digraph {'+recorrido+'}');
console.log();
  }

}
