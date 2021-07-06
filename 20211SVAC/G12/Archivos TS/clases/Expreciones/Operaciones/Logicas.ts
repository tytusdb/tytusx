import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "src/clases/TablaSimbolos/Tipo";
import { retorno } from "../retorno";
import Operaciones, { Operador } from "./Operaciones";


export default class Logicas extends Operaciones implements Expreciones{

    lblTrue: string;
    lblFalse: string;
    public constructor(exp1, op: string, exp2, linea: number, columna:number, expU :boolean) {
        super(exp1,op,exp2,linea,columna,expU);        
    }
    limpiar() {
        this.lblFalse='';
        this.lblTrue='';
        if(this.expU==false){
         this.exp1.limpiar();
         this.exp2.limpiar();
        }else{
         this.exp1.limpiar();
        }
        
     }
   

    getTipo(controlador: Controlador, ts: TablaSimbolos) : tipo{
        let valor = this.getValor(controlador, ts);

        if(typeof valor === 'number'){   
            return tipo.DOBLE;
        }else if(typeof valor === 'string'){
            return tipo.CADENA;
        }else if(typeof valor === 'boolean'){
            return tipo.BOOLEANO;
        }
    }
    
    getValor(controlador: Controlador, TablaSimbolos: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        
        
        if(this.expU == false){
            valor_exp1 = this.exp1.getValor(controlador, TablaSimbolos);
            valor_exp2 = this.exp2.getValor(controlador, TablaSimbolos);
        }else{
            valor_expU = this.exp1.getValor(controlador, TablaSimbolos);
        }

        switch (this.operador){

            case Operador.AND:
                return this.and(valor_exp1,valor_exp2);
            case Operador.NOT:
                return this.not(valor_expU);
            case Operador.OR:
                return this.or(valor_exp1,valor_exp2);
            default:
                break;
            
        }

    }

    and(valor_exp1,valor_exp2){
        if(typeof valor_exp1 =='boolean'){
            if(typeof valor_exp2 == 'boolean'){
                return valor_exp1 && valor_exp2;
            }else{
                //Error semantico
            }
        }
    }

    or(valor_exp1,valor_exp2){
        if(typeof valor_exp1 =='boolean'){
            if(typeof valor_exp2=='boolean'){
                return valor_exp1 || valor_exp2;
            }else{
                //Erro semantico
            }
        }
    }

    not(valor_expU){
        if(typeof valor_expU =='boolean'){
            return !valor_expU;
        }else{
            //Erro semantico
        }
    }
    getvalor3d(controlador: Controlador, ts: TablaSimbolos) {
        switch (this.operador){
            case Operador.AND:
                return this.and3D(controlador,ts);
            case Operador.NOT:

            break;
            case Operador.OR:
                return this.or3D(controlador,ts);
            default:
                break;
            
        }
    }

    and3D(controlador:Controlador, ts:TablaSimbolos){
        const generador =controlador.generador;
        this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
        this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;

        this.exp1.lblTrue = generador.newLabel();
        this.exp2.lblTrue = this.lblTrue;
        this.exp1.lblFalse = this.exp2.lblFalse = this.lblFalse;

        const expIzq = this.exp1.getvalor3d(controlador,ts);
        generador.genLabel(this.exp1.lblTrue);
        const expDer = this.exp2.getvalor3d(controlador,ts);

        if(expIzq.tipo.type==tipo.BOOLEANO && expDer.tipo.type==tipo.BOOLEANO){
            const Retorno = new retorno('', false, new Tipo("BOOLEAN"));
            Retorno.lblTrue = this.lblTrue;
            Retorno.lblFalse = this.exp2.lblFalse;
            return Retorno;
        }
        
    }

    or3D(controlador:Controlador, ts:TablaSimbolos){
        const generador = controlador.generador;
        this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
        this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;

        this.exp1.lblTrue = this.exp2.lblTrue = this.lblTrue;
        this.exp1.lblFalse = generador.newLabel();
        this.exp2.lblFalse = this.lblFalse;

        const expIzq = this.exp1.getvalor3d(controlador,ts);
        generador.genLabel(this.exp1.lblFalse);
        const expDer = this.exp2.getvalor3d(controlador,ts);

        if(expIzq.tipo.type==tipo.BOOLEANO && expDer.tipo.type==tipo.BOOLEANO){
        
        const Retorno = new retorno('', false, new Tipo("BOOLEAN"));
        Retorno.lblTrue = this.lblTrue;
        Retorno.lblFalse = this.exp2.lblFalse;
        return Retorno;
        }
    }
    

    recorrer(): Nodo {
        let padre = new Nodo("Exp","");

        if(this.expU){
            padre.AddHijo(new Nodo(this.op,""));
            padre.AddHijo(this.exp1.recorrer());
        }else{
            padre.AddHijo(this.exp1.recorrer());
            padre.AddHijo(new Nodo(this.op,""));
            padre.AddHijo(this.exp2.recorrer());
        }
        return padre;
    }

}