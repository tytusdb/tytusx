import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import entornoXquery from "src/clases/ast/entornoXquery";
import { nodo3d } from "src/clases/c3d/nodo3d";
import primitivo from "src/clases/expresiones/primitivo";
import select from "src/clases/expresiones/select";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import order from "./order";
import Return from "./return";
import variable from "./variable";
import where from "./where";

export default class FOR implements instruccion {
    public id: Array<variable>;
    public idat: Array<string>;
    public condicion: any
    public at: Array<boolean>;
    public contenido: Array<any>
    public linea: Array<number>;
    public columna: Array<number>;
    public slc: Array<select>;
    public simbol:simbolo;

    constructor(id, idat, condicion, at, content, linea, columna) {
        this.id = id;
        this.idat = idat;
        this.condicion = condicion;
        this.at = at;
        this.contenido = content;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        let newEnt = new entornoXquery().newEntorno(ent);

        let result:any = ""; let entXml:any = null;
        if(Object.prototype.hasOwnProperty.call(newEnt.tabla,"xml")){
            entXml = newEnt.tabla["xml"].valor;
        }

        if(this.id.length === this.condicion.length){
            for(let i = 0; i < this.id.length; i++){
                this.verificaMatch(newEnt,i);
                result = [];
                if(Array.isArray(this.condicion[i])){
                    if(this.condicion[i][0] === ","){
                        for(let j = 1; j < this.condicion[i].length; j++){
                            result.push(this.condicion[i][j].getValor(newEnt,arbol));
                        }
                        this.id[i].valor = result;
                        this.simbol.valor = result;
                    }else if(this.condicion[i][0] === "to"){
                        if(this.condicion[i][1] instanceof primitivo && this.condicion[i][2] instanceof primitivo){
                            for(let j = Number(this.condicion[i][1].getValor(newEnt,arbol)); j <= Number(this.condicion[i][2].getValor(newEnt,arbol)); j++){
                                result.push(j);
                            }
                            this.id[i].valor = result;
                            this.simbol.valor = result;
                        }
                    }
                } else {
                    if (this.condicion[i] instanceof variable) {
                        let entorno_temp;
                        result = new Array<Array<entorno>>()
                        for (let j = 0; j < this.condicion[i].xpath.length; j++) {
                            this.slc = this.condicion[i].xpath[j]
                            entorno_temp = entXml
                            for (let slc_sub of this.slc) {
                                entorno_temp = slc_sub.getValor(entorno_temp, arbol)
                            }
                            result.push(entorno_temp)
                        }
                        this.id[i].valor = result;
                        result.push("xpath");
                        this.simbol.valor = result
                    }
                }
            }
            for(let i = 0; i < this.contenido.length; i++){
                if(this.contenido[i] instanceof Return){
                    result = this.contenido[i].ejecutar(newEnt,arbol);
                }else if(this.contenido[i] instanceof where){
                    result = this.contenido[i].ejecutar(newEnt,arbol);
                }else if(this.contenido[i] instanceof order){
                    result = this.contenido[i].ejecutar(newEnt,arbol);
                }
            }
            return result;
        } else {
            InsertarError("Semantico", `Error, la cantidad de variables ${this.id.length} no es igual a la cantidad de condiciones ${this.condicion.length}`, "xquery", this.linea[this.linea.length - 1], this.columna[this.columna.length - 1]);
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        c3d.main += `\t//for\n`
        let id_ = this.id[0].valor
        if (this.slc != null){
            let id_str = this.id[0].id
            for (let slc_sub of this.slc){
                slc_sub.traducir(slc_sub.matches, c3d)
            }
            for (let key in ent[0].tabla){
                if (key.startsWith("var")){
                    let simbol: simbolo = ent[0].tabla[key]
                    if (simbol.id == id_str){
                        let ret = { "id": c3d.generateTemp(), "val": c3d.last_stack }
                        simbol.stack = ret.val
                        break
                    }
                }
            }
        } else {
            this.id[0].traducir(ent, c3d)
        }
        console.log("ID")
        console.log(this.id)
        console.log("IDAT")
        console.log(this.idat)
        console.log("COND")
        console.log(this.condicion)
        console.log("AT")
        console.log(this.at)
        console.log("CONT")
        console.log(this.contenido)
        for (let c of this.contenido){
            c.traducir(ent, c3d)
        }
    }

    /* Verifica que la variable a retornar exista en la tabla de simbolos */
    verificaMatch(ent:entorno,i:number){
        let match = true; let entXq = ent.tabla["xquery"].valor;
        let func = entXq.getSimbol("function");
        if(func){
            entXq = func.valor;
        }
        while(match){
            let simbol = entXq.getSimbol("var"+i.toString());
            if (!simbol){
                simbol = entXq.getSimbol("param"+i.toString());
            }else{
                if(simbol.valor.id !== this.id[i].id){
                    simbol = entXq.getSimbol("param"+i.toString());
                }
            }
            if(simbol && simbol.valor instanceof variable){
                if(simbol.valor.id === this.id[i].id){
                    this.simbol = simbol.valor;
                    match = false;
                }
            }else{
                match = false;
            }
        }
    }
}