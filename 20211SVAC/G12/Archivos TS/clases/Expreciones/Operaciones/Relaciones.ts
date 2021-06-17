import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/clases/TablaSimbolos/Tipo";
import Operaciones, { Operador } from "./Operaciones";


export default class Relaciones extends Operaciones implements Expreciones {

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