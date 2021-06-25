
import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import NodoAST from "../AST/NodoAST";
import { Expresion } from "../Interface/Expresion";
import { Cuerpo } from "./Cuerpo";
import { Predicado } from "./Predicado";

export class Consulta extends Expresion{
    
    
    //     //  id    /
    private typeBarra: string; //   //   /
    private cuerpo:Cuerpo;
    private next: Consulta;

    constructor(col:number,typeBarra:string, cuerpo:Cuerpo,  next:Consulta){
         super(0,col);
         this.typeBarra = typeBarra;
         this.cuerpo = cuerpo;
         this.next = next;
        }

    public evaluar(): Simbolo {
        var lista:Simbolo;
        if(this.typeBarra ==="//"){
            var cuerpo:Simbolo =  this.cuerpo.evaluar();
            lista = cuerpo;
            //lista = this.predicado.evaluar(); // se le mandaria por parametro la lista que retorna el cuerpo.
        }else{
            var cuerpo:Simbolo =  this.cuerpo.evaluar();
            lista = cuerpo;
           // lista = this.predicado.evaluar(); // se le mandaria por parametro la lista que retorna el cuerpo.
            // Metodologia para / barra simple
        }

        return lista;
    }

    public concatenar(): string {
        var cadena:string = "";
        if(this.next != null){
            cadena += this.next.concatenar()
        }
        cadena += this.typeBarra 
        if(this.cuerpo != null){
            cadena += this.cuerpo.concatenar()
        }
       
        return cadena;
    }

    public ast(): NodoAST {
        var consulta = new NodoAST("CONSULTA")
        
        if(this.next != null){
            consulta.addHijo(this.next.ast())
        }
        consulta.addHijoSimple(this.typeBarra)
        if(this.cuerpo != null){
            consulta.addHijo(this.cuerpo.ast())
        }
        
        
        return consulta;
    }


    public buscar(lista:Array<Simbolo>):Array<Simbolo> {

        //    //bookstore
        let entorno:Array<Simbolo> = lista;
        let aux:Array<Simbolo> = [];

        if(this.next != null){
            entorno = this.next.buscar(entorno);
        }
        if(this.typeBarra === "//"){
            entorno = []
        }
        else
        {
            this.cuerpo.buscar(entorno, false)
            // aux = this.cuerpo.buscar(entorno, true)
            // if(this.next !== null){
            //    aux = this.cuerpo.buscar(entorno, false)
            // }
            // entorno = aux;
            // aux =[]
        }

        return entorno;
    }
}