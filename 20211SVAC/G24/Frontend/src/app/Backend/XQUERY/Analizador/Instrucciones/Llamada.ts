import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Nativo from "../Expresiones/Nativo";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import BarrasNodo from "./BarrasNodo";
import Declaracion from "./Declaracion";
import IfFuncionAnidado from "./IfFuncionAnidado";
import Let from "./Let";


export default class Llamada extends Instruccion {

    public identificador: string;
    public parametros: Instruccion[];
    constructor(identificador: string, parametros: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var ListaParametros: Array<Instruccion> = new Array<Instruccion>();
        var listaInstrucciones: Array<Instruccion> = new Array<Instruccion>();
        var cadenaparametros = ""
        var c = 0;
        var sim
        var tabxmlanterior;
        let countparameter = 0
        let countparameter2 = 0
        var tablasimbol= new tablaSimbolos();
        /************************************************************************************************************************
         *******************************************************AREA DE PARAMETROS************************************************
         * **********************************************************************************************************************
         */
        var buscarFuncion = tabla.getVariable(this.identificador);
        if (buscarFuncion != null) {
            if (this.parametros != null) {
                for (var key of tabla.getTabla()) {
                    if (key.getidentificador() == this.identificador) {
                        ///aqui se agrega la lista de instrucciones
                        listaInstrucciones = buscarFuncion.getvalor()
                    } else {
                        ////aqui se agregan y declaran los paramentros
                        ListaParametros = key.getvalor()
                    }
                }
                if (this.parametros instanceof Array) {
                    this.parametros.forEach(element => {
                        if (element instanceof Array) {
                            element.forEach(iteracion => {

                                if (iteracion instanceof Nativo) {
                                    countparameter++
                                    var declaravalor = iteracion.interpretar(arbol, tabla, tablaxml)
                                    ListaParametros.forEach(element => {
                                        countparameter2++
                                        if (countparameter == countparameter2) {
                                            if (element instanceof Declaracion) {
                                                var declara = element.interpretar(arbol, tabla, tablaxml)
                                                var buscar1 = tabla.getVariable(declara);
                                                if (buscar1 != null) {
                                                    buscar1.setvalor(declaravalor)
                                                    tablasimbol.setVariable(buscar1)
                                                }
                                            }
                                        }
                                    });
                                    countparameter2 = 0
                                } else if (iteracion instanceof BarrasNodo) {
                                    var resultador = element.interpretar(arbol, tabla, tablaxml)
                                    if (resultador instanceof tablaSimbolosxml) {
                                        c++;
                                        tabxmlanterior = tablaxml
                                        tablaxml = resultador
                                        if (c == element.length) {
                                            if (arbol != null) {
                                                console.log("LOS ELEMENTOS DE EL RESULTADO DE LA CONSULTA\n")
                                                sim = new Simbolo(new Tipo(tipoDato.FUNCION), this.identificador, this.fila.toString(), this.columna.toString(), "", resultador);
                                                tabla.setVariable(sim)
                                                tablaxml = tabxmlanterior
                                            }
                                        }

                                    }
                                    if (resultador instanceof Array) {
                                        console.log(resultador)
                                        resultador.forEach(element => {
                                            console.log(element.getvalor());
                                        });
                                    }
                                }
                            });
                        } else {
                            ////SI FUERA STRING
                        }
                    });
                }
            } else {

            }

            /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
             * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ EJECUTAR INSTRUCCIONES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
             * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
             */
           
            if(listaInstrucciones!=null){
                listaInstrucciones.forEach(element => {
                    if(element instanceof Let){
                        var respuesta= element.interpretar(arbol,tablasimbol, tablaxml)
                        if (respuesta instanceof Simbolo) {
                            buscarFuncion.setvalor(respuesta.getvalor())
                          } else if (respuesta instanceof Array) {
                              buscarFuncion.setvalor(respuesta);
                          } else if (respuesta instanceof tablaSimbolos) {
                            buscarFuncion.setvalor(respuesta);
                          }else{
                            buscarFuncion.setvalor(respuesta);
                          }
                    }
                    if (element instanceof IfFuncionAnidado) {
                        var theifani = element.interpretar(arbol, tabla, tablaxml);
                       // respuesta=theifani;
                       buscarFuncion.setvalor(theifani)
                        console.log("hola estamos en if anidado")
                        
                        //cadena = theifani;
                
                      }
                });

            }
            return buscarFuncion.getvalor()
        }
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}