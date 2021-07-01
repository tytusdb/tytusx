import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import Simbolo from 'src/app/Backend/XML/Analizador/Simbolos/Simbolo';

export default class AtributoSimple extends Instruccion {
    public Operacion: string;
    public tipoAtributo: string
    public cadena = ""
    constructor(select: string, tipo: string, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
        this.tipoAtributo = tipo

    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        this.cadena=""
        let salidas = new tablaSimbolos();
        if (this.tipoAtributo === "*") {
            for (var key of tabla.getTabla()) {
                if (key.getAtributo().size != 0) {
                    key.getAtributo().forEach(element => {
                        this.cadena += element.trim()+"\n"
                    });
                }
                if (key.getvalor() instanceof tablaSimbolos) {
                    for (let sim of key.getvalor().getTabla()) {
                        salidas.setVariable(sim)
                        if (sim instanceof Simbolo) {
                            if (sim.getAtributo().size != 0) {
                                sim.getAtributo().forEach(element => {
                                    this.cadena += element.trim()+"\n"
                                });
                            }
                            if (sim.getvalor() instanceof tablaSimbolos) {
                                this.CollectAtribute(sim,this.cadena, salidas)
                            }
                        }
                    }

                } 
            }
        }
        return salidas
    }

    CollectAtribute(key: Simbolo, cad: string, salidas: tablaSimbolos) {
        if (key.getvalor().getTabla() != null) {
            for (let sim of key.getvalor().getTabla()) {
                salidas.setVariable(sim)
                if (sim instanceof Simbolo) {
                    if (sim.getAtributo().size != 0) {
                        sim.getAtributo().forEach(element => {
                            this.cadena += element.trim()+"\n"
                        });
                    }
                    if (sim.getvalor() instanceof tablaSimbolos) {
                        this.CollectAtribute(sim,this.cadena, salidas)
                    }
                }
            }
        }
    }

    getNodosAST(): nodoAST {
        var nodo = new nodoAST("ATRIBUTO"); //PADRE SELECT
        if (this.tipoAtributo === ".") {
            var nodoselect = new nodoAST(this.Operacion);
            nodo.agregarHijoAST(nodoselect)
            nodo.agregarHijo(this.tipoAtributo)
        } else if (this.tipoAtributo === "*") {
            var nodoselect = new nodoAST(this.Operacion);
            nodo.agregarHijoAST(nodoselect)
            nodo.agregarHijo(this.tipoAtributo)
        }


        return nodo;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error('Method not implemented.');
    }
}