import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import BarrasNodo from "src/app/Backend/XPATH/Analizador/Instrucciones/BarrasNodo";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import CondicionSimple from "./CondicionSimple";
import variablePublica from "../../../XPATH/Analizador/Instrucciones/BarrasNodo"
import { VariableBinding } from "@angular/compiler";
import Identificador from "src/app/Backend/XPATH/Analizador/Expresiones/Identificador";

export default class ForSimple extends Instruccion {

    public consulta: Instruccion;
    public respuesta: Instruccion;
    public thewhere: Instruccion;
    public theorderby: Instruccion;

    constructor(consulta: Instruccion, respuesta: Instruccion, linea: number, columna: number, thewhere?: Instruccion, theorderby?: Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.consulta = consulta;
        this.respuesta = respuesta;
        this.thewhere = thewhere;
        this.theorderby = theorderby;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        let c=0;
        
       /*  console.log("Lo que trae consulta");
        console.log(this.consulta)
        console.log("Lo que trae return");
        console.log(this.respuesta)
        console.log("Lo que trae el where");
        console.log(this.thewhere)
        console.log("Lo que trae orderby");
        console.log(this.theorderby)


        console.log("Lo que trae arbol");
        console.log(arbol)
        console.log("Lo que trae tabla");
        console.log(tabla)
        console.log("Lo que trae tabla xml");
        console.log(tablaxml) */
        let cadena
        for (var key of tablaxml.getTabla()) {
            /* console.log("AQUI VIENE GET VALOR")
            console.log(key.getvalor()); */
            if (key.getvalor() instanceof tablaSimbolosxml) {
                for (let sim of key.getvalor().getTabla()) {
                    c++;
                    /* console.log("Aqui esta sim")
                    console.log(sim) */
                    /*if(c==key.getvalor())
                    
                    
                  
                  /* if(key.getidentificador==){
                        console.log("Adrian crack")
                    }*/
                }
            }else{
                cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
                console.log(cadena)
                console.log("salida")
            }}
            /**
             * 
             * for (var key of tabla.getTabla()) {
             
              if (key.getidentificador() == variable) {
                
                console.log(key.getidentificador())
                if (key.getvalor() instanceof tablaSimbolos) {
                  for (let sim of key.getvalor().getTabla()) {
                    salidas.setVariable(sim)
                  }
    
                }
                else {
                  cadena += key.getvalor().replaceAll("%20", " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", "\"").replaceAll("   ", "\n");
                }
              } else {
                error = "Nodo no encontrado ";
                console.log(error);
              }
    
            }
             */
            /*for()
      
            if (this.expresion instanceof Instruccion) {
                var search = tabla.getVariable(this.variable);
                if (search == null) {
                    //NO SE ENCONTRO NINGUNA COINCIDENCIA CON LA VARIABLE
                    var resexp = this.expresion.interpretar(arbol, tabla, tablaxml)
    
                    var simbolo = new Simbolo(new Tipo(tipoDato.FUNCION), this.variable, this.fila.toString(), this.columna.toString(), "", resexp);
                    tabla.setVariable(simbolo)
                    //PARTE DE RETORNO QUE FUNCIONA COMO UN PRINT
                    //var resultadoretorno = this.retorno.interpretar(arbol, tabla, tablaxml);
    
                    if (this.retorno instanceof Instruccion) {
    
                    } else {
                        if (this.retorno as string) {
                            console.log(typeof this.retorno)
                            var buscar = tabla.getVariable(this.retorno);
                            if (buscar != null) {
                                return buscar
                            }
                        }
                    }
                } else {
                    //SI SE ENCONTRO COINCIDENCIA POR ENDE NO SE PUEDE VOLVER A DECLARAR ESE LET
                }
    
            } else {
    
                var simbolo = new Simbolo(new Tipo(tipoDato.FUNCION), this.variable, this.fila.toString(), this.columna.toString(), this.expresion.toString());
                tabla.setVariable(simbolo)
            }*/
        }
    public getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    public codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}