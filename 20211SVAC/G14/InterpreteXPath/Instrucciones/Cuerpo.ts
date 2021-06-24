import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import NodoAST from "../AST/NodoAST";
import { Primitivo } from "../Expresiones/Primitivo";
import { Expresion } from "../Interface/Expresion";
import { Funcion } from "./Funcion";
import { Predicado } from "./Predicado";

export class Cuerpo extends Expresion{
    
    
    
    public axisOrFunction:Funcion; // axisname :: nodestest[predicate] -> Funcion por lo tanto filtro, node, predicado = null
    public filtro: string;         //  @  ||  *  || .  || ..
    public node: any;           //    nodo     or  nodo (id)   ||  auxiliar de filtro como *  ..  .
    public predicado: Predicado;   //   [  expresion  ]


    constructor(col:number,axis:Funcion, filtro:string, node:any, predicado:Predicado){
        super(0,col);
        this.axisOrFunction = axis;
        this.filtro = filtro;
        this.node = node;
        this.predicado = predicado;
    }

    public evaluar(): Simbolo {
         throw new Error("Method not implemented.");
    }

    public concatenar(): string {
        var cadena = ""
        if(this.axisOrFunction != null){
            cadena += this.axisOrFunction.concatenar();
        }else{

            if(this.filtro != null){
                cadena += this.filtro;
            }
            if(this.node != null)
            {
                if(typeof this.node == "object"){
                    cadena += this.node.concatenar()
                }else{
                    cadena += this.node

                }
            }
            if(this.predicado != null){
                cadena += this.predicado.concatenar()
            }
        }
        return cadena
    }

    public ast(): NodoAST {
        var cuerpo = new NodoAST("CUERPO")

        if(this.axisOrFunction != null){
            cuerpo.addHijo(this.axisOrFunction.ast())
        }else{
            if(this.filtro != null){
                cuerpo.addHijoSimple(this.filtro)
            }
            if(this.node != null)
            {
                if(typeof this.node == "object"){
                    var hola:Primitivo = this.node;
                    cuerpo.addHijo(hola.ast())
                }else{
                    cuerpo.addHijoSimple(this.node)

                }
            }
            if(this.predicado != null){
                cuerpo.addHijo(this.predicado.ast())
            }
        }
        
        return cuerpo;
    }

    public buscar(lista: Array<Simbolo>, isFinal:boolean): Array<Simbolo> {
        let entorno:Array<Simbolo>=lista;
        //      /id
        if(this.node != null){
            var aux:Primitivo = this.node;
            entorno = this.BuscarEntorno(entorno,aux.valor , isFinal, 0);
        }

        return entorno;
    }

    
}