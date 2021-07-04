import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import Simbolo from 'src/app/Backend/XML/Analizador/Simbolos/Simbolo';


export default class Todo extends Instruccion {
    public Operacion: string;
    private cadena: string;
    constructor(select: string, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        
        return this.Operacion
    }
    getNodosAST(): nodoAST {
        var nodo = new nodoAST(this.Operacion); //PADRE SELECT    
        return nodo;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
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
}