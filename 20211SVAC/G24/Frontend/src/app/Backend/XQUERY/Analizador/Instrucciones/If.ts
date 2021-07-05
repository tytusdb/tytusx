import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import BarrasNodo from "src/app/Backend/XQUERY/Analizador/Instrucciones/BarrasNodo";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import CondicionSimple from "./CondicionSimple";

export default class If extends Instruccion {
    private condicion: Instruccion;
    private insThen: Array<Instruccion> | null;
    private insElse: Instruccion | null;

    constructor(condicion: Instruccion, linea: number, columna: number, insThen: Array<Instruccion>, insElse?: Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.condicion = condicion;
        this.insThen = insThen;
        this.insElse = insElse;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        let c = 0;
        let sym;
        let searchconsulta;

                if (this.condicion instanceof CondicionSimple) {
                    let thecondi = this.condicion.interpretar(arbol, tabla, tablaxml);
                        thecondi.consulta.forEach(element => {
                        c++
                        if (element instanceof BarrasNodo) {
                            var resultador = element.interpretar(arbol, tabla, tablaxml);
                            if (resultador instanceof tablaSimbolosxml) {       
                                tablaxml = resultador
                                if (c == thecondi.consulta.length) {
                                    if (arbol != null) {
                                        sym = new Simbolo(new Tipo(tipoDato.FUNCION), thecondi.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                                        tabla.setVariable(sym);
                                        var buscar = tabla.getVariable(thecondi.variables);

                                        if (buscar != null) {
                                            searchconsulta = buscar.getvalor()

                                            return buscar
                                        }
                                    }
                                }
                            } else if (resultador instanceof Array) {
                                sym = new Simbolo(new Tipo(tipoDato.FUNCION), thecondi.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                                tabla.setVariable(sym)
                                var buscar = tabla.getVariable(thecondi.variables.toString());
                                if (buscar != null) {
                                    searchconsulta = buscar.getvalor()
                                    return buscar
                                }
                            }
                        }
                    });
                }
          
        if(this.insThen!=null){
            let Sentencia;
            if (this.insThen instanceof CondicionSimple) {
                Sentencia = this.insThen.interpretar(arbol, tabla, tablaxml);
                Sentencia.consulta.forEach(element => {
                    c++;
                    if (element instanceof BarrasNodo) {
                        var resultador = element.interpretar(arbol, tabla, tablaxml)
                        if (resultador instanceof tablaSimbolosxml) {
                            tablaxml = resultador
                            if (c == Sentencia.consulta.length) {
                                if (arbol != null) {
                                    var buscar = tabla.getVariable(Sentencia.variables);
                                    if (buscar != null) {
                                        buscar.setvalor(resultador)
                                        return buscar
                                    }
                                }
                            }

                        } else if (resultador instanceof Array) {
                            sym = new Simbolo(new Tipo(tipoDato.WHERE), Sentencia.variables, this.fila.toString(), this.columna.toString(), "", resultador);
                            tabla.setVariable(sym)
                            var buscar = tabla.getVariable(Sentencia.variables.toString());
                            if (buscar != null) {
                                searchconsulta = buscar.getvalor()
                                return buscar
                            }
                        }
                    }
                });
           
            } else {
                
            }

        }
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }




}