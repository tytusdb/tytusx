
import { encode } from "querystring";
import { isParameterPropertyDeclaration } from "typescript";
import { Entorno } from "../Abstractas/Entorno";
import { Nodo } from "../Abstractas/Nodo";
import { Simbolo } from "../Abstractas/Simbolo";
import { Tipo } from "../Abstractas/Tipo";
import { NodoAST } from "../AST/NodoAST";

export class Objeto extends Nodo{
    private tipo:Tipo;
    private Eabre:String;
    private Ecierra:String;
    private texto:String;
    private atributos:any[];
    private hijos:any[];

    constructor(tipo:Tipo, Eabre:String, Ecierra:String, texto:String, atributos:any, hijos:any,fila:Number, columna:Number){
        super(fila,columna);
        this.tipo = tipo;
        this.Eabre = Eabre;
        this.Ecierra = Ecierra;
        this.texto = texto;
        this.atributos = atributos;
        this.hijos = hijos;
    }
    public ejecutar(padre:any, errores:any){
        if(this.Eabre!=this.Ecierra){
            errores.push({lexema: "EtiqAbre: "+this.Eabre+"\nEtiqCierra: "+this.Ecierra, fila:this.getFila(),columna:this.getColumna(),tipo:"Semantico", desc: "Las etiquetas de apertura y cierre no coinciden"});
            return;
        }
        if(this.tipo == Tipo.OBJETO){
            var nuevo = new Simbolo(this.Eabre,"",Tipo.OBJETO,this.getFila(),this.getColumna(),padre);
            if(this.atributos.length>0){
                this.atributos.forEach(element => {
                    nuevo.entorno.insertarObjeto(new Simbolo(element.nombre,element.valor,Tipo.ATRIBUTO,this.getFila(),this.getColumna(),nuevo));
                });
            }
            if(this.hijos.length>0){
                this.hijos.forEach(element => {
                    element.ejecutar(nuevo,errores);                   
                });
            }
            padre.entorno.insertarObjeto(nuevo);
                 
        }
        else if(this.tipo == Tipo.TEXTO){
            
            if(this.atributos.length>0){
                var nuevo = new Simbolo(this.Eabre,this.texto,Tipo.TEXTO,this.getFila(),this.getColumna(),padre);
                this.atributos.forEach(element => {
                    nuevo.entorno.insertarObjeto(new Simbolo(element.nombre,element.valor,Tipo.ATRIBUTO,this.getFila(),this.getColumna(),nuevo));
                });
                padre.entorno.insertarObjeto(nuevo);
            }
            else{
                padre.entorno.insertarObjeto(new Simbolo(this.Eabre,this.texto,Tipo.TEXTO,this.getFila(),this.getColumna(),padre));
            }
            
        }

        else if(this.tipo == Tipo.UNITARIA){
            if(this.atributos.length>0){
                var nuevo = new Simbolo(this.Eabre,this.texto,Tipo.UNITARIA,this.getFila(),this.getColumna(),padre);
                this.atributos.forEach(element => {
                    nuevo.entorno.insertarObjeto(new Simbolo(element.nombre,element.valor,Tipo.ATRIBUTO,this.getFila(),this.getColumna(),nuevo));
                });
                padre.entorno.insertarObjeto(nuevo);
            }
            else{
                padre.entorno.insertarObjeto(new Simbolo(this.Eabre,this.texto,Tipo.UNITARIA,this.getFila(),this.getColumna(),padre));
            }
        }
    }

    public getAST(){
       var nodo = new NodoAST(this.Eabre);
       
        if(this.atributos.length>0){
            var atr = new NodoAST("Atributos");
            this.atributos.forEach(element => {
                atr.addHijo(new NodoAST(element.nombre+" = "+element.valor));
            });
            nodo.addHijo(atr);
        }
        if(this.tipo == 0){
            nodo.addHijo(new NodoAST(this.texto));
         }
        if(this.hijos.length>0){
            var lh = new NodoAST("Objetos");
            this.hijos.forEach(element => {
                lh.addHijo(element.getAST());
            });
            nodo.addHijo(lh);
        }
        return nodo;
    }

    public getCST(){
        var nodo = new NodoAST("OB");
        nodo.addHijo(new NodoAST("<"));
        nodo.addHijo(new NodoAST(this.Eabre));

         if(this.atributos.length>0){
             var lta = new NodoAST("LISTATR");
             this.atributos.forEach(element => {
                 var aux = new NodoAST("ATRIBUTO");
                 aux.addHijo(new NodoAST(element.nombre+" = "+element.valor));
                 lta.addHijo(aux);
             });
             nodo.addHijo(lta);
         }
         nodo.addHijo(new NodoAST(">"));
         if(this.tipo == 0){
            nodo.addHijo(new NodoAST(this.texto));
         }
         if(this.hijos.length>0){
             var lh = new NodoAST("LOBJETO");
             this.hijos.forEach(element => {
                 lh.addHijo(element.getCST());
             });
             nodo.addHijo(lh);
         }

         if(this.tipo == 1){
            nodo.addHijo(new NodoAST("/"));
            nodo.addHijo(new NodoAST(">"));
         }else{
            nodo.addHijo(new NodoAST("<"));
            nodo.addHijo(new NodoAST("/"));
            nodo.addHijo(new NodoAST(this.Ecierra));
            nodo.addHijo(new NodoAST(">"));
         }
         return nodo;
     }

}