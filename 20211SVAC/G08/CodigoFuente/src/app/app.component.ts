import { HttpClient } from '@angular/common/http';
import { ParsedProperty } from '@angular/compiler';
import { Component, Inject} from '@angular/core';
import { observable } from 'rxjs';
import {sentenciaXpath} from '../app/Estructuras/sentenciaXpath'
import {Objeto} from '../Expresiones/Objeto'
import { OperacionXpath } from './Estructuras/OperacionXpath';
import { ParametroOperacionXpath } from './Estructuras/ParametroOperacionXpath';
import { parametroXpath } from './Estructuras/parametroXpath';
import {TipoParametro, TipoOperador, TipoNodo} from './Estructuras/tipificacion';
import { graphviz }  from 'd3-graphviz';
import {crearArbolDot} from './AST/crearArbolDot';
import {MatDialog} from '@angular/material/dialog';
import {TablaSimbolosComponent} from '../app/Reportes/tabla-simbolos/tabla-simbolos.component';
import { Error } from 'src/app/AST/Error';
import {ErroresXMLComponent} from '../app/Reportes/errores-xml/errores-xml.component';
import { ListaErrores } from 'src/app/AST/ListaErrores';
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
  title = 'proyecto1';
  txtXpath = `/catalog/book[@id="bk101"]/./*/text()`;
  consoleValue = "";
  parser;
  retroceder = true;
  showTablaSimbolo = true;
  listaDescendientes:sentenciaXpath[] = [];
  xmlOriginal:Objeto[];
  parserXml;
  astXML;
  arbol;
  rgxmlasc;
  tablaXML="";
  xmlText = `<?xml version="1.0" encoding="UTF-8"?>
  <biblioteca>
    <libro>
      <titulo>La vida esta en otra parte</titulo>
      <autor>Milan Kundera</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Pantaleon y las visitadoras</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Conversacion en la catedral</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1969"/>
    </libro>
  </biblioteca>`;
  
  private httpClient: HttpClient;
  constructor(http: HttpClient,public dialog: MatDialog) {
    this.httpClient = http;
    //this.parser = require("./Gramatica/gramatica");
    this.parser = require("./Gramatica/xpathGramatica");
    this.parserXml = require("./Gramatica/gramatica");
    this.astXML= require("./Gramatica/gramaticaXMLAsc_Arbol");
    this.arbol=require("./AST/crearArbolDot");
  }

  Compilar() {
    this.consoleValue ="";
    var xmlObject = this.parserXml.parse(this.xmlText) as Objeto[];
    console.log('parseando: ' + this.txtXpath);
    var xPathObject = this.parser.parse(this.txtXpath) as sentenciaXpath[];
    //console.log('xPathObject');
    //console.log(xPathObject);
    //Agregamos para cada sentencia su sentencia hija para simular lista doblemente enlazada (padre,hijo)
    var elementoActual:sentenciaXpath; 
    this.xmlOriginal = xmlObject;
    var lista = [];
    lista.push(xmlObject);
    console.log(xmlObject);
    this.consoleValue = '';
    xPathObject.forEach(element => {
      elementoActual = element;
      element.Hijo = null;
      while(elementoActual.Padre !=null){
        elementoActual.Padre.Hijo = elementoActual;
        elementoActual = elementoActual.Padre;
      }
      this.listaDescendientes = [];
      console.log(elementoActual);
     
      
      this.consoleValue += this.ProcesarNodoRaiz(elementoActual,lista,null);
    });
    //elementoActual en este momento es la raiz de la entrada Xpath
   
    
  }
  openTablaSimbolos() {
    var xmlObject = this.parserXml.parse(this.xmlText) as Objeto[];
    var lista = [];
    lista.push(xmlObject);
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
        console.log('Procesando ID: ' + raiz.Tipo.Valor);
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
        console.log("atributo");
        console.log(xml);
        console.log(raiz);
        if(raiz.Tipo.Valor == '*'){
          xml = this.GetAllAtributos(xml);
        }
        console.log(xml);
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
        console.log(this.retroceder);
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
        switch(raiz.Tipo.Valor){
          case 'ancestor':{
            //result += this.BuscarAncestros(xml,);
          }break;
          case 'ancestor-or-self':{
            
          }break;
          case 'attribute':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              padre.forEach(element => {
                element.listaAtributos.forEach(atr => {
                  if(atr.identificador == raiz.Tipo.AxisNodo.Valor){
                    result += atr.identificador + ' = ' + atr.valor + '\n';
                  }
                });
              });
            }
            
          }break;
          case 'child':{
            if(raiz.Tipo.AxisNodo.Tipo == TipoNodo.ID){
              xml.forEach(element => {
                if(element.identificador == raiz.Tipo.AxisNodo.Valor){
                  result += this.GetXmlText(element);
                }
              });
            }
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
            
          }break;
          case 'following-sibling':{
            
          }break;
          case 'namespace':{
            
          }break;
          case 'parent':{
            
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
          xml.forEach(element => {
            result += this.GetXmlText(element);
          });
        }else{
          result += this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
        }
      }break;
      case TipoNodo.Funcion_Text :
      {
        if(raiz.Hijo == null){
          console.log('text');
          console.log(xml);
          result += this.GetText(xml);
        }
      }break;
      case TipoNodo.Funcion_Node :
      {
        console.log('node');
        console.log(xml);
        xml = this.GetNodes(xml);
        console.log(xml);
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
          element.listaObjetos.forEach(obj => {
            if(obj.identificador == etiqueta.Tipo.Valor){
              result.push(obj);
            }
          });
        });
      }
     
    }
    if(etiqueta.Parametro!=null){
      console.log('item con operacion');
      console.log(etiqueta);
      console.log(result);
      result = this.FiltrarOperacion(result,etiqueta);
      console.log(result);
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
  
  ResolverOperacion(operacion: parametroXpath,xml:Objeto[]):any[]{
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
        console.log(operacion);
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
        temp.forEach(element => {
          if(item.Tipo.Tipo == TipoNodo.Atributo){
            element.listaAtributos.forEach(atr => {
              if(atr.identificador == item.Tipo.Valor){
                aux.push(element);
              }
            });
            aux = aux.concat(this.BuscarEtiqueta(element.listaObjetos,item));
          }else{
            if(element.identificador == item.Tipo.Valor){
              aux.push(element);
            }else{
              aux = aux.concat(this.BuscarEtiqueta(element.listaObjetos,item));
            }
          }
        });
      }
      temp = aux;
      if(item.Parametro!=null){
        console.log('item con operacion');
        console.log(temp);
        temp = this.FiltrarOperacion(temp,item);
        console.log(temp);
      }
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
      }else{
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
            console.log('logica');
            console.log(ret);
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
              console.log('?');
              console.log(xml);
              xml.forEach(element => {
                if(ret[3] == 0 ){
                  switch(ret[2]){
                    case "=":{
                      element.listaObjetos.forEach(obj => {
                        if(obj.texto.replace(re,'').replace(ra,'') == ret[1].toString().replace(re,'').replace(ra,''))
                        {
                          result .push(element);
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
          xml.forEach(element => {
            element.listaObjetos.forEach(obj => {
              if(obj.identificador == etiqueta.Tipo.Valor){
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
    console.log(e);
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
    console.log('objetos almacenados--->', objetos);
    const arbol = new this.arbol.CrearArbolDot();
    //console.log(arbol);   
    var recorrido=arbol.recorrerHijos(objetos[1]);
    console.log(recorrido);
    this.rgxmlasc=objetos[2].arreglo_elementos;
    graphviz('#graph').renderDot('digraph {'+recorrido+'}');
console.log();
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

}
