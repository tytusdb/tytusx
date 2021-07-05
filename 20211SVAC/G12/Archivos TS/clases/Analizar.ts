import * as xpath from "../Analizadores/gramatica"
import * as xml from "../Analizadores/XML";
import * as xmlDes from "../Analizadores/XMLDescendente";
import * as xquery from "../Analizadores/XQuery";
import * as opt3d from "../Analizadores/gramaticaOpt";
import Controlador from "./Controlador";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";
import { GeneradorC3D } from '../clases/GeneradorC3D/GeneradorC3D';
import Errores from "./AST/Errores";
export let errorLex: Errores[] = []




/* let error_html = controlador.graficar_Semantico (controlador,ts_globla);  Metodos para lo errores*/  
export class Analizador {
    public ejecutar(entradaxml:string,entradaxpath:string):any {
        console.log("vamos a analizar la entrada");
            //Ejecutar xml 
            let astxml= xml.parse(entradaxml);
            let controlador = new Controlador();
            let ts_globla =new TablaSimbolos(null,"Global");

            console.log(errorLex);

            astxml.ejecutar(controlador,ts_globla);   
            
            //Ejecutar xpath
            if(entradaxpath.length>0){
                let astxpaht=xpath.parse(entradaxpath);
                console.log(astxpaht);
                astxml.ejecutarXPath(controlador,ts_globla,astxpaht);
            }
            
            let ts_html =controlador.graficar_ts(controlador,ts_globla);
            let retorno = {"ts": ts_html ,"consola":controlador.consola };
           
            return retorno;
        
    }
    
    public ejecutarXquery(entradaxml:string,entradaxpath:string):any {
        let controlador = new Controlador();
        let ts_globla;
        if(entradaxml.length>0){
            let astxml= xml.parse(entradaxml);
            controlador = new Controlador();
            ts_globla =new TablaSimbolos(null,"Global");
            astxml.ejecutar(controlador,ts_globla);   
        }

        if(entradaxpath.length>0){
           let astxquery=xquery.parse(entradaxpath);
           astxquery.ejecutarXQuery(controlador,ts_globla);
           console.log(astxquery);
        }
        let ts_html =controlador.graficar_ts(controlador,ts_globla);
        let retorno = {"ts": ts_html ,"consola":controlador.consola };
        return retorno;
        //x.ejecutarX(controlador,ts_for);

    }

    public ejecutarDes(entradaxml:string,entradaxpath:string):any {
        console.log("vamos a analizar la entrada");
            //Ejecutar xml 
            let astxml= xmlDes.parse(entradaxml);
            let controlador = new Controlador();
            let ts_globla =new TablaSimbolos(null,"Global");
            astxml.ejecutarDescendente(controlador,ts_globla);
            
            //Ejecutar xpath
            if(entradaxpath.length>0){
                let astxpaht=xpath.parse(entradaxpath);
                astxml.ejecutarXPath(controlador,ts_globla,astxpaht);
            }
           // console.log("aa");
            let ts_html =controlador.graficar_ts(controlador,ts_globla);
            let retorno = {"ts": ts_html ,"consola":controlador.consola };
           
            return retorno;
        
    }

    public traducirxml(entradaxml:string,entradaxpath:string){
        let astxml=xml.parse(entradaxml);
        let controlador = new Controlador();
            let ts_globla =new TablaSimbolos(null,"Global");
            controlador.generador.clearCode();
            astxml.ejecutar(controlador,ts_globla);
            if(entradaxpath.length>0){
                let astxpaht=xpath.parse(entradaxpath);
                astxml.ejecutarXPath(controlador,ts_globla,astxpaht);
            }    

            let ts_html =controlador.graficar_ts(controlador,ts_globla);
            let retorno = {"ts": ts_html ,"consola":controlador.generador.getCode() };
            return retorno;
    }

    public ejecutarOptimizacionC3D(entradaC3D:string):any {
        console.log("vamos a analizar la entrada");
        //Ejecutar Xquery
       let x = opt3d.parse(entradaC3D);
        
        return x;
    }
    
    public traducirXquery(entradaxml:string,entradaxpath:string){
        let controlador = new Controlador();
        let ts_globla;
        if(entradaxml.length>0){
            let astxml= xml.parse(entradaxml);
            ts_globla =new TablaSimbolos(null,"Global");
            controlador.generador.clearCode();
            astxml.ejecutar(controlador,ts_globla);   
        }

        if(entradaxpath.length>0){
           let astxquery=xquery.parse(entradaxpath);
           astxquery.ejecutarXQuery(controlador,ts_globla);
           console.log(astxquery);
        }
        let ts_html =controlador.graficar_ts(controlador,ts_globla);
        let retorno = {"ts": ts_html ,"consola":controlador.generador.getCode() };
        return retorno;
    }
    
    public recorrer(input){

        try {
            let ast = xml.parse(input);
            let nodo_ast = ast.recorrer();

            return nodo_ast;
            
        } catch (error) {
            
        }
    }

  

    public recorrerDes(input){

        try {
            let ast = xmlDes.parse(input);
            console.log(ast);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
            
        } catch (error) {
            
        }
    }

    public recorrerDesxpath(input){

        try {
            let ast = xpath.parse(input);
            console.log(ast);
            console.log(ast);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
            
        } catch (error) {
            
        }
    }

}