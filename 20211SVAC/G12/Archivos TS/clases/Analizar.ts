import * as xpath from "../Analizadores/gramatica"
import * as xml from "../Analizadores/XML";
import * as xmlDes from "../Analizadores/XMLDescendente";
import Controlador from "./Controlador";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";



/* let error_html = controlador.graficar_Semantico (controlador,ts_globla);  Metodos para lo errores*/  
export class Analizador {
    public ejecutar(entradaxml:string,entradaxpath:string):any {
        console.log("vamos a analizar la entrada");
            //Ejecutar xml 
            let astxml= xml.parse(entradaxml);
            let controlador = new Controlador();
            let ts_globla =new TablaSimbolos(null,"Global");
            astxml.ejecutar(controlador,ts_globla);
            
            //Ejecutar xpath

            let astxpaht=xpath.parse(entradaxpath);
            console.log(astxpaht);
            astxml.ejecutarXPath(controlador,ts_globla,astxpaht);
         
           // console.log("aa");
            let ts_html =controlador.graficar_ts(controlador,ts_globla);
            let retorno = {"ts": ts_html ,"consola":controlador.consola };
           
            return retorno;
        
    }

    public ejecutarDes(entradaxml:string,entradaxpath:string):any {
        console.log("vamos a analizar la entrada");
            //Ejecutar xml 
            let astxml= xmlDes.parse(entradaxml);
            let controlador = new Controlador();
            let ts_globla =new TablaSimbolos(null,"Global");
            astxml.ejecutarDescendente(controlador,ts_globla);
            
            //Ejecutar xpath

            let astxpaht=xpath.parse(entradaxpath);
            console.log(astxpaht);
            astxml.ejecutarXPath(controlador,ts_globla,astxpaht);
         
           // console.log("aa");
            let ts_html =controlador.graficar_ts(controlador,ts_globla);
            let retorno = {"ts": ts_html ,"consola":controlador.consola };
           
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