import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "src/clases/TablaSimbolos/Tipo";
import { retorno } from "../retorno";
import Operaciones, { Operador } from "./Operaciones";


export default class Relaciones extends Operaciones implements Expreciones {
    
    lblTrue: string;
    lblFalse: string;
    public constructor(exp1, op: string, exp2, linea: number, columna:number, expU :boolean) {
        super(exp1,op,exp2,linea,columna,expU);        
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

    getValor(controlador: Controlador, TablaSimbolos: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        if(this.expU==false){
            valor_exp1=this.exp1.getValor(controlador,TablaSimbolos);
            valor_exp2=this.exp2.getValor(controlador,TablaSimbolos);
        }else{
            valor_expU=this.exp1.getValor(controlador,TablaSimbolos);
        }

        switch(this.operador){
            case Operador.IGUALIGUAL:
                return this.igualigual(valor_exp1,valor_exp2);
            case Operador.DIFERENTE:
                return this.diferente(valor_exp1,valor_exp2);
            case Operador.MENORQUE:
                return this.menorque(valor_exp1,valor_exp2);
            case Operador.MENORIGUAL:
                return this.menorigual(valor_exp1,valor_exp2);
            case Operador.MAYORQUE:
                return this.mayorque(valor_exp1,valor_exp2);
            case Operador.MAYORIGUAL:
                return this.mayoigual(valor_exp1,valor_exp2);
            default:
                break;
        }


    }

    igualigual(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if(typeof valor_exp2 == 'number'){
                return valor_exp1==valor_exp2;
            }else if (typeof valor_exp2 =='boolean'){
                //Error Semantico
            }else if(typeof valor_exp2 == 'string'){
                //char
                if(valor_exp2.length==1){
                    let num=valor_exp2.charCodeAt(0);
                    return valor_exp1==num;
                }else{
                    //String 
                    //Error semantico
                }
            }
        }else if(typeof valor_exp1 == 'boolean'){
            if(typeof valor_exp2== 'number'){
                //Error semantico
            }else if (typeof valor_exp2=='boolean'){
                return valor_exp1 ==valor_exp2;
            }else if (typeof valor_exp2 == 'string'){
                //Error semantico
            }
        }else if (typeof valor_exp1 == 'string'){
            if(valor_exp1.length==1){
                //char
                if(typeof valor_exp2=='number'){
                    let num=valor_exp1.charCodeAt(0);
                    return num==valor_exp2;
                }else if( typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if( typeof valor_exp2 == 'string'){
                    return valor_exp1 ==valor_exp2 ;
                }
            }else{
                //cadena
                if(typeof valor_exp2=='number'){
                    //error semantico
                }else if( typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if( typeof valor_exp2 == 'string'){
                    return valor_exp1 ==valor_exp2 ;
                }
            }
        }
    }

    diferente(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if(typeof valor_exp2 == 'number'){
                return valor_exp1!=valor_exp2;
            }else if (typeof valor_exp2 =='boolean'){
                //Error Semantico
            }else if(typeof valor_exp2 == 'string'){
                //char
                if(valor_exp2.length==1){
                    let num=valor_exp2.charCodeAt(0);
                    return valor_exp1!=num;
                }else{
                    //String 
                    //Error semantico
                }
            }
        }else if(typeof valor_exp1 == 'boolean'){
            if(typeof valor_exp2== 'number'){
                //Error semantico
            }else if (typeof valor_exp2=='boolean'){
                return valor_exp1 != valor_exp2;
            }else if (typeof valor_exp2 == 'string'){
                //Error semantico
            }
        }else if (typeof valor_exp1 == 'string'){
            if(valor_exp1.length==1){
                //char
                if(typeof valor_exp2=='number'){
                    let num=valor_exp1.charCodeAt(0);
                    return num!=valor_exp2;
                }else if( typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if( typeof valor_exp2 == 'string'){
                    return valor_exp1 !=valor_exp2 ;
                }
            }else{
                //cadena
                if(typeof valor_exp2=='number'){
                    //error semantico
                }else if( typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if( typeof valor_exp2 == 'string'){
                    return valor_exp1 !=valor_exp2 ;
                }
            }
        }
    }


    menorque(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if( typeof valor_exp2 == 'number'){
                return valor_exp1 < valor_exp2;
            }else if ( typeof valor_exp2 == 'boolean'){
                //Error semantico
            }else if (typeof valor_exp2 == 'string'){
                if(valor_exp2.length == 1){
                    let num=valor_exp2.charCodeAt(0);
                    return valor_exp1 <  num;
                }else{
                    // Error semantico 
                }
            }
        }else if (typeof valor_exp1 == 'boolean'){
            //Error semantico
        }else if (typeof valor_exp1 =='string'){
            if(valor_exp1.length==1){
                if(typeof valor_exp2 =='number'){
                    let num=valor_exp1.charCodeAt(0);
                    return num < valor_exp2;
                }else if (typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if ( typeof  valor_exp2 == 'string'){
                    if(valor_exp2.length==1){
                        let num1=valor_exp1.charCodeAt(0);
                        let num2=valor_exp2.charCodeAt(0);
                        return num1< num2;
                    }else{
                        //Error semantico
                    }
                }
            }else{
                //cadena
                //error semantico
            }
        }
    }

    menorigual(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if( typeof valor_exp2 == 'number'){
                return valor_exp1 <= valor_exp2;
            }else if ( typeof valor_exp2 == 'boolean'){
                //Error semantico
            }else if (typeof valor_exp2 == 'string'){
                if(valor_exp2.length == 1){
                    let num=valor_exp2.charCodeAt(0);
                    return valor_exp1 <=  num;
                }else{
                    // Error semantico 
                }
            }
        }else if (typeof valor_exp1 == 'boolean'){
            //Error semantico
        }else if (typeof valor_exp1 =='string'){
            if(valor_exp1.length==1){
                if(typeof valor_exp2 =='number'){
                    let num=valor_exp1.charCodeAt(0);
                    return num <= valor_exp2;
                }else if (typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if ( typeof  valor_exp2 == 'string'){
                    if(valor_exp2.length==1){
                        let num1=valor_exp1.charCodeAt(0);
                        let num2=valor_exp2.charCodeAt(0);
                        return num1<= num2;
                    }else{
                        //Error semantico
                    }
                }
            }else{
                //cadena
                //error semantico
            }
        }
    }

    mayorque(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if( typeof valor_exp2 == 'number'){
                return valor_exp1 > valor_exp2;
            }else if ( typeof valor_exp2 == 'boolean'){
                //Error semantico
            }else if (typeof valor_exp2 == 'string'){
                if(valor_exp2.length == 1){
                    let num=valor_exp2.charCodeAt(0);
                    return valor_exp1 >  num;
                }else{
                    // Error semantico 
                }
            }
        }else if (typeof valor_exp1 == 'boolean'){
            //Error semantico
        }else if (typeof valor_exp1 =='string'){
            if(valor_exp1.length==1){
                if(typeof valor_exp2 =='number'){
                    let num=valor_exp1.charCodeAt(0);
                    return num > valor_exp2;
                }else if (typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if ( typeof  valor_exp2 == 'string'){
                    if(valor_exp2.length==1){
                        let num1=valor_exp1.charCodeAt(0);
                        let num2=valor_exp2.charCodeAt(0);
                        return num1 > num2;
                    }else{
                        //Error semantico
                    }
                }
            }else{
                //cadena
                //error semantico
            }
        }
    }

    mayoigual(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if( typeof valor_exp2 == 'number'){
                return valor_exp1 >= valor_exp2;
            }else if ( typeof valor_exp2 == 'boolean'){
                //Error semantico
            }else if (typeof valor_exp2 == 'string'){
                if(valor_exp2.length == 1){
                    let num=valor_exp2.charCodeAt(0);
                    return valor_exp1 >=  num;
                }else{
                    // Error semantico 
                }
            }
        }else if (typeof valor_exp1 == 'boolean'){
            //Error semantico
        }else if (typeof valor_exp1 =='string'){
            if(valor_exp1.length==1){
                if(typeof valor_exp2 =='number'){
                    let num=valor_exp1.charCodeAt(0);
                    return num >= valor_exp2;
                }else if (typeof valor_exp2 == 'boolean'){
                    //Error semantico
                }else if ( typeof  valor_exp2 == 'string'){
                    if(valor_exp2.length==1){
                        let num1=valor_exp1.charCodeAt(0);
                        let num2=valor_exp2.charCodeAt(0);
                        return num1 >= num2;
                    }else{
                        //Error semantico
                    }
                }
            }else{
                //cadena
                //error semantico
            }
        }
    }

    getvalor3d(controlador: Controlador, ts : TablaSimbolos){
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        if(this.expU==false){
            valor_exp1=this.exp1.getvalor3d(controlador,ts);
            valor_exp2=this.exp2.getvalor3d(controlador,ts);
        }else{
            valor_expU=this.exp1.getvalor3d(controlador,ts);
        }

        switch(this.operador){
            case Operador.IGUALIGUAL:
                return this.igualigual3D(valor_exp1,valor_exp2,controlador);
            case Operador.DIFERENTE:
                return this.diferente3D(valor_exp1,valor_exp2,controlador);
            case Operador.MENORQUE:
                return this.menorque3D(valor_exp1,valor_exp2,controlador);
            case Operador.MENORIGUAL:
                return this.menorigual3D(valor_exp1,valor_exp2,controlador);
            case Operador.MAYORQUE:
                return this.mayorque3D(valor_exp1,valor_exp2,controlador);
            case Operador.MAYORIGUAL:
                return this.mayoigual3D(valor_exp1,valor_exp2,controlador);
            default:
                break;
        }

    }


    igualigual3D(valor_exp1:retorno,valor_exp2:retorno,controlador:Controlador){
        const generador  = controlador.generador;
        const temp = generador.newTemporal();
        if(valor_exp1.tipo.type==tipo.DOBLE){
            if(valor_exp2.tipo.type==tipo.DOBLE){
                return this.compararExp(valor_exp1,valor_exp2,controlador,'==');
            }
        }else{
            if(valor_exp1.tipo.type==tipo.CADENA){
                if(valor_exp2.tipo.type==tipo.CADENA){
                    const tempAux = generador.newTemporal();
                    generador.genExpresion(tempAux, 'p', 1 + 1, '+');
                    generador.genSetStack(tempAux, valor_exp1.getvalor3d());
                    generador.genExpresion(tempAux, tempAux, '1', '+');
                    generador.genSetStack(tempAux, valor_exp2.getvalor3d());
                    generador.genNextEnv(1);
                    generador.genCall('nativa_compararIgual_str_str');
                    generador.genGetStack(temp, 'p');
                    generador.genAntEnv(1);

                    this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
                    this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
                    generador.genIf(temp, '1', '==', this.lblTrue);
                    generador.genGoto(this.lblFalse);
                    const Retorno = new retorno(temp, true, new Tipo("BOOLEAN"));
                    Retorno.lblTrue = this.lblTrue;
                    Retorno.lblFalse = this.lblFalse;
                    return Retorno;
                }
            }
        }
    }

    menorque3D(valor_exp1:retorno,valor_exp2:retorno,controlador:Controlador){
        if(valor_exp1.tipo.type==tipo.DOBLE){
            if(valor_exp2.tipo.type==tipo.DOBLE){
                return this.compararExp(valor_exp1,valor_exp2,controlador,'<');
            }
        }
    }

    menorigual3D(valor_exp1:retorno,valor_exp2:retorno,controlador:Controlador){
        if(valor_exp1.tipo.type==tipo.DOBLE){
            if(valor_exp2.tipo.type==tipo.DOBLE){
                return this.compararExp(valor_exp1,valor_exp2,controlador,'<=');
            }
        }
    }
    mayorque3D(valor_exp1:retorno,valor_exp2:retorno,controlador:Controlador){
        if(valor_exp1.tipo.type==tipo.DOBLE){
            if(valor_exp2.tipo.type==tipo.DOBLE){
                return this.compararExp(valor_exp1,valor_exp2,controlador,'>');
            }
        }
    }

    mayoigual3D(valor_exp1:retorno,valor_exp2:retorno,controlador:Controlador){
        if(valor_exp1.tipo.type==tipo.DOBLE){
            if(valor_exp2.tipo.type==tipo.DOBLE){
                return this.compararExp(valor_exp1,valor_exp2,controlador,'>=');
            }
        }
    }

    diferente3D(valor_exp1:retorno,valor_exp2:retorno,controlador:Controlador){
        const generador  = controlador.generador;
        const temp = generador.newTemporal();
        if(valor_exp1.tipo.type==tipo.DOBLE){
            if(valor_exp2.tipo.type==tipo.DOBLE){
                return this.compararExp(valor_exp1,valor_exp2,controlador,'!=');
            }
        }else{
            if(valor_exp1.tipo.type==tipo.CADENA){
                if(valor_exp2.tipo.type==tipo.CADENA){
                    const tempAux = generador.newTemporal();
                    generador.genExpresion(tempAux, 'p', 1 + 1, '+');
                    generador.genSetStack(tempAux, valor_exp1.getvalor3d());
                    generador.genExpresion(tempAux, tempAux, '1', '+');
                    generador.genSetStack(tempAux, valor_exp2.getvalor3d());
                    generador.genNextEnv(1);
                    generador.genCall('nativa_compararIgual_str_str');
                    generador.genGetStack(temp, 'p');
                    generador.genAntEnv(1);

                    this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
                    this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
                    generador.genIf(temp, '1', '!=', this.lblTrue);
                    generador.genGoto(this.lblFalse);
                    const Retorno = new retorno(temp, true, new Tipo("BOOLEAN"));
                    Retorno.lblTrue = this.lblTrue;
                    Retorno.lblFalse = this.lblFalse;
                    return Retorno;
                }
            }
        }
    }


    compararExp(valor_exp1: retorno, valor_exp2: retorno,controlador:Controlador,signo:string): retorno {
        const generador = controlador.generador;
        this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
        this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
        generador.genIf(valor_exp1.getvalor3d(), valor_exp2.getvalor3d(),signo, this.lblTrue);
        generador.genGoto(this.lblFalse);
        const Retorno = new retorno('', false, new Tipo("BOOLEAN"));
        Retorno.lblTrue = this.lblTrue;
        Retorno.lblFalse = this.lblFalse;
        return Retorno;
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