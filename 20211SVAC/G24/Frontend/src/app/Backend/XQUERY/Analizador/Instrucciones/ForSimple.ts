

import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import CondicionSimple from "./CondicionSimple";
import SimboloXQuery from 'src/app/Backend/XQUERY/Analizador/Simbolos/Simbolo';
import BarrasNodo from "./BarrasNodo";
import Condicion from "./Condicion";

export default class ForSimple extends Instruccion {

    public consulta: Instruccion;
    public respuesta: Instruccion | String;
    public thewhere: Instruccion;
    public theorderby: Instruccion;
    public cadena: string;
    public consolita: any;
    public variableanterior: string;

    constructor(consulta: Instruccion, respuesta: Instruccion | String, linea: number, columna: number, thewhere?: Instruccion, theorderby?: Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.consulta = consulta;
        this.respuesta = respuesta;
        this.thewhere = thewhere;
        this.theorderby = theorderby;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        let c = 0;
        let searchconsulta;
        let sim;
        let entorno= new tablaSimbolos(tabla);
        if (this.consulta instanceof Array) {
            this.consulta.forEach(cons => {
                if (cons instanceof CondicionSimple) {
                    let temconsulta = cons.interpretar(arbol, entorno, tablaxml)
                    temconsulta.consulta.forEach(element => {
                        c++;
                        if (element instanceof BarrasNodo) {
                            var resultador = element.interpretar(arbol, entorno, tablaxml)

                            if (resultador instanceof tablaSimbolosxml) {
                                tablaxml = resultador
                                if (c == temconsulta.consulta.length) {
                                    if (arbol != null) {
                                        sim = new Simbolo(new Tipo(tipoDato.FUNCION), temconsulta.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                                        entorno.setVariable(sim)
                                        var buscar = entorno.getVariable(temconsulta.variables);

                                        if (buscar != null) {
                                            searchconsulta = buscar.getvalor()

                                            return buscar
                                        }
                                    }
                                }

                            } else if (resultador instanceof Array) {
                                sim = new Simbolo(new Tipo(tipoDato.FUNCION), temconsulta.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                                entorno.setVariable(sim)
                                var buscar = entorno.getVariable(temconsulta.variables.toString());
                                if (buscar != null) {
                                    searchconsulta = buscar.getvalor()
                                    return buscar
                                }
                            }
                        }
                    });
                }
            });
        }
        console.log(this.variableanterior)
        c = 0;
        if (this.thewhere != null) {
            let cuando;
            if (this.thewhere instanceof CondicionSimple) {
                cuando = this.thewhere.interpretar(arbol, entorno, tablaxml);
                cuando.consulta.forEach(element => {
                    c++;
                    if (element instanceof BarrasNodo) {
                        var resultador = element.interpretar(arbol, entorno, tablaxml)
                        if (resultador instanceof tablaSimbolosxml) {
                            tablaxml = resultador
                            if (c == cuando.consulta.length) {
                                if (arbol != null) {
                                    var buscar = entorno.getVariable(cuando.variables);
                                    if (buscar != null) {
                                        buscar.setvalor(resultador)
                                        return buscar
                                    }
                                }
                            }

                        } else if (resultador instanceof Array) {
                            sim = new Simbolo(new Tipo(tipoDato.WHERE), cuando.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                            entorno.setVariable(sim)
                            var buscar = entorno.getVariable(cuando.variables.toString());
                            if (buscar != null) {
                                searchconsulta = buscar.getvalor()
                                return buscar
                            }
                        }
                    }
                });
            } else if (this.thewhere instanceof Condicion) {

            } else {

            }

        }

        if (this.respuesta != null) {
            if (this.respuesta as string) {
                var buscar = entorno.getVariable(this.respuesta.toString());
                if (buscar != null) {
                    return buscar.getvalor()
                }
            }
        }
        /* if(this.theorderby!=null){
 
         }
 
         if(this.respuesta!=null){
             this.consolita='';
             if(this.respuesta instanceof Array){
                 console.log("Aqui vendra si viene una consulta")
             }else{
                 console.log("Entra aca si solo es una variable")
                  if (searchconsulta instanceof Array) {
                     console.log("aca viene la magic")
                     searchconsulta.forEach(element => {
                         this.respuesta=this.consolita;
                         this.consolita += <string>element.getvalor() + "\n";
                         return this.consolita;
                         
                     });
                 } else if (searchconsulta instanceof tablaSimbolosxml) {
                     if (arbol != null) {
                         this.consolita += this.recorrerTabla(searchconsulta, arbol);
                         this.consolita += "\n"
                         this.respuesta=this.consolita
                         return this.consolita;
                     }
 
                 }else{
                     console.log("Entra aca si solo es una variable")
                     searchconsulta.forEach(element => {
                         this.respuesta=this.consolita;
                         this.consolita += <string>element.getvalor() + "\n";
                         return this.consolita;
                         
                     });
 
                 }
             }
         }
     }
 
 
 
     recorrerTabla(t: tablaSimbolosxml, arbol: Arbol) {
         var salida = ''
         for (var key of t.tablaActual) {
 
 
             let objetos = key.getvalor();
            this.consolita+=<string>objetos + "\n";;
 
         }
         return this.consolita;
 */
        
    }


    public getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    public codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}
