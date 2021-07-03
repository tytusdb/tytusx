

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
    public respuesta: Instruccion;
    public thewhere: Instruccion;
    public theorderby: Instruccion;
    public cadena: string;
    public consolita:any;


    constructor(consulta: Instruccion, respuesta: Instruccion, linea: number, columna: number, thewhere?: Instruccion, theorderby?: Instruccion) {
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
        if (this.consulta instanceof Array) {
            this.consulta.forEach(cons => {
                if (cons instanceof CondicionSimple) {
                    let temconsulta = cons.interpretar(arbol, tabla, tablaxml)
                    temconsulta.consulta.forEach(element => {
                        c++;
                        if (element instanceof BarrasNodo) {
                            var resultador = element.interpretar(arbol, tabla, tablaxml)

                            if (resultador instanceof tablaSimbolosxml) {
                                tablaxml = resultador
                                if (c == temconsulta.consulta.length) {
                                    if (arbol != null) {
                                        sim = new Simbolo(new Tipo(tipoDato.FUNCION), temconsulta.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                                        tabla.setVariable(sim)
                                        var buscar = tabla.getVariable(temconsulta.variables);

                                        if (buscar != null) {
                                            searchconsulta = buscar.getvalor()

                                            return buscar
                                        }
                                    }
                                }

                            } else if (resultador instanceof Array) {
                                sim = new Simbolo(new Tipo(tipoDato.FUNCION), temconsulta.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                                tabla.setVariable(sim)
                                var buscar = tabla.getVariable(temconsulta.variables.toString());
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

        if (this.thewhere != null) {
            let cuando;
            if (this.thewhere instanceof CondicionSimple) {
                cuando = this.thewhere.interpretar(arbol, tabla, tablaxml);
            } else if (this.thewhere instanceof Condicion) {

            } else {

            }
            if (searchconsulta != null) {
                if (searchconsulta instanceof SimboloXQuery) {
                    //cadena += respuesta.getvalor()
                } else if (searchconsulta instanceof Array) {
                    /*respuesta.forEach(element => {
                        cadena += element.getvalor();
                    });*/
                } else if (searchconsulta instanceof tablaSimbolosxml) {
                    /*if (TreeAsc != null) {
                        cadena += this.recorrerTablaXquery(respuesta, TreeAsc);
                        cadena += "\n"
                    }*/

                }
            }
        }

        if(this.theorderby!=null){

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
    }
    public getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    public codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}
