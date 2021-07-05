import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import entornoXquery from "src/clases/ast/entornoXquery";
import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import aritmetica from "src/clases/expresiones/operaciones/aritmetica";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import FOR from "./for";
import IF from "./if";
import LET from "./let";
import nativa from "./nativa";
import variable from "./variable";

export default class Function implements instruccion{
    public local:string;
    public id:string;
    public parametros:Array<any>;
    public tipe:string;
    public tipo:tipo;
    public contenido:Array<any>;
    public llamada:boolean;
    public linea:number;
    public columna:number;
    public simbol:entorno;

    constructor(local,id,param,tipe,content,llamada,linea,columna){
        this.local = local;
        this.id = id;
        this.parametros = param;
        this.tipe = tipe;
        this.contenido = content;
        this.llamada = llamada;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        if(this.llamada){
            let newEnt = new entornoXquery().newEntorno(ent);

            let entXml:any = null;
            if(Object.prototype.hasOwnProperty.call(newEnt.tabla,"xml")){
                entXml = newEnt.tabla["xml"].valor;
            }

            let result:any = "";
            this.verificaMatch(newEnt)
            if(this.simbol){
                this.contenido = this.simbol["tabla"].content.valor
                let totalParam = true;
                for(let i = 0; i < this.parametros.length;i++){
                    let varParam = this.simbol.getSimbol("param"+i.toString());
                    let valParam:any;
                    if(this.parametros[i] instanceof Function){
                        valParam = this.parametros[i].ejecutar(newEnt,arbol);
                    }else if(this.parametros[i] instanceof aritmetica){
                        valParam = this.parametros[i].getValor(newEnt,arbol);
                    }else if(Array.isArray(this.parametros[i].xpath) && this.parametros[i].xpath.length > 0){
                        let entorno_temp;
                        let retxpa = new Array<Array<entorno>>()
                        for (let j = 0; j < this.parametros[i].xpath.length; j++) {
                            let slc = this.parametros[i].xpath[j]
                            entorno_temp = entXml
                            for (let slc_sub of slc) {
                                entorno_temp = slc_sub.getValor(entorno_temp, arbol)
                            }
                            retxpa.push(entorno_temp)
                        }
                        if(retxpa.length === 1 && retxpa[0].length === 1){
                            let valAux = retxpa[0][0]["tabla"].valor
                            if(!(valAux.valor instanceof entorno)){
                                let valPAux = Number(valAux.valor);
                                if(valPAux !== NaN){
                                    valParam = valPAux;
                                }else{
                                    valParam = valAux.valor
                                }
                            }else{
                                InsertarError("Semantico",`Error, el dato a buscar no es un valor`,"xquery",this.parametros[i].linea,this.parametros[i].columna);
                            }
                        }
                    }else{
                        valParam = this.parametros[i].getValor(newEnt,arbol);
                    }
                    if(varParam){
                        varParam.valor[0].valor = valParam
                    }else{
                        if(totalParam){
                            totalParam = false;
                            InsertarError("Semantico",`Error, cantidad de parametros ingresados a la funcion ${this.id} no cumplen`,"xquery",this.linea,this.columna);
                        }
                    }
                }

                if(this.contenido){
                    for(let i = 0; i < this.contenido.length; i++){
                        if(this.contenido[i] instanceof FOR || this.contenido[i] instanceof LET || this.contenido[i] instanceof IF
                           || this.contenido[i] instanceof nativa || this.contenido[i] instanceof Function){
                               result = this.contenido[i].ejecutar(newEnt,arbol);
                        }else{
                            result = this.contenido[i].getValor(newEnt,arbol);
                        }
                    }
                }
            }
            return result;
        }
    }

    /* Verifica que la variable a retornar exista en la tabla de simbolos */
    verificaMatch(ent:entorno){
        let match = true; let entXq = ent.tabla["xquery"].valor;
        while(match){
            let simbol = entXq.getSimbol("function");
            if(simbol){
                if(simbol.id === this.id){
                    this.simbol = simbol.valor;
                    match = false;
                }else{
                    match = false;
                    InsertarError("Semantico",`Error, la funcion a buscar ${this.id} no esta definida`,"xquery",this.linea,this.columna);
                }
            }else{
                match = false;
                InsertarError("Semantico",`Error, la funcion a buscar ${this.id} no esta definida`,"xquery",this.linea,this.columna);
            }
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        c3d.main += `\t//function\n`
        console.log("funcion: " + this.id)

        let ret = { "id": c3d.generateTemp(), "val": c3d.last_stack }
        c3d.main += `\tt${ret.id} = ${c3d.last_stack};\n`

        let ini = { "id": -1, "val": -1 }
        let pos = { "id": -1, "val": -1 }
        let index: number = -1

        ini = { "id": c3d.generateTemp(), "val": c3d.h }
        c3d.main += `\tt${ini.id} = H;\n`
    }
}