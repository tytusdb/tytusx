import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/clases/TablaSimbolos/Tipo";
import Operaciones, { Operador } from "./Operaciones";


export default class Aritmetica extends Operaciones implements Expreciones {
    constructor (exp1 : Expreciones,operador : string ,exp2 : Expreciones,linea: number,columna: number,expU : boolean){
        super (exp1,operador,exp2,linea,columna,expU);
    }
    
    
    getTipo(controlador: Controlador, ts: TablaSimbolos) : tipo{
        let valor = this.getValor(controlador,ts);
        
        if(typeof valor == 'number'){
            return tipo.DOBLE;
        }else if(typeof valor == 'string'){
            return tipo.CADENA;
        }else if(typeof valor == 'boolean'){
            return tipo.BOOLEANO;
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        if(this.expU==false){
            valor_exp1=this.exp1.getValor(controlador,ts);
            valor_exp2=this.exp2.getValor(controlador,ts);
        }else{
            valor_expU=this.exp1.getValor(controlador,ts);
        }

        switch (this.operador){
            case Operador.SUMA:
                return this.suma(valor_exp1,valor_exp2);
            case Operador.RESTA:
                return this.resta(valor_exp1,valor_exp2);
            case Operador.MULTI:
                return this.multiplicacion(valor_exp1,valor_exp2);
            case Operador.DIV:
                return this.divicion(valor_exp1,valor_exp2);
            case Operador.POT:
                return this.potencia(valor_exp1,valor_exp2);
            case Operador.MODULO:
                return this.modulo(valor_exp1,valor_exp2);
            case Operador.UNARIO:
                return this.unario(valor_expU);
            default:
                //Se produjo un error inesperado
                break;
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

    unario(valor_expU){
        if(typeof valor_expU == 'number'){
            return -valor_expU;
        }else{
            //Error semantico
        }
    }

    suma(valor_exp1,valor_exp2){
        if(typeof valor_exp1=='number'){
            if( typeof valor_exp2=='number'){
                return valor_exp1+valor_exp2;
            } else if ( typeof valor_exp2=='boolean'){
              let num =1 ;
                if( valor_exp2==false){
                    num=0;
                }
                return valor_exp1+num;
            }else if(typeof valor_exp2=='string'){
                if(valor_exp2.length==1){
                    let numascci=valor_exp2.charCodeAt(0);
                    return valor_exp1+numascci;
                }else{
                    return valor_exp1+ valor_exp2;
                }
            }
        }else if(typeof valor_exp1=='boolean'){
            if(typeof valor_exp2=='number'){
                let num =1;
                if(valor_exp1 == false){
                    num=0;
                }
                return num+valor_exp2;
            }else if(typeof valor_exp2=='boolean'){
                //Error semantico
            }else if (typeof valor_exp2==='string'){
                if(valor_exp2.length==1){
                    //Error semantico
                }else{
                    return valor_exp1+valor_exp2;
                }
            }

        }else if (typeof valor_exp1=='string'){
            // Caracter
            if(valor_exp1.length==1){
                if(typeof valor_exp2 == 'number'){
                    let numascci=valor_exp1.charCodeAt(0);
                    return numascci+valor_exp2;
                }else{
                    if(typeof valor_exp2=='string'){
                        return valor_exp1+valor_exp2;
                    }else{
                        if(typeof valor_exp2=='boolean'){
                            //Error Semantico
                        }
                    }
                }
            }else{
                //Cadena
                if(typeof valor_exp2=='number'){
                    return valor_exp1+valor_exp2;
                }else if(typeof valor_exp2=='boolean'){
                    return valor_exp1+valor_exp2;
                }else{
                    if(typeof valor_exp2=='string'){
                        return valor_exp1+valor_exp2;
                    }
                }
            }
        }
    }

    resta(valor_exp1,valor_exp2){
        if(typeof valor_exp1=='number'){
            if(typeof valor_exp2=='number'){
                return valor_exp1-valor_exp2;
            }else if(typeof valor_exp2=='boolean'){
                    let num=1;
                    if(valor_exp2==false){
                        num=0;
                    }
                    return valor_exp1-num;
            } else if (typeof valor_exp2=='string'){
                //Caracter
                if(valor_exp2.length==1){
                    let numascci=valor_exp2.charCodeAt(0);
                    return valor_exp1-numascci;
                }else{
                    //Error Semantico
                }
            }
        }else if(typeof valor_exp1=='boolean'){
            if(typeof valor_exp2=='number'){
                let num=1;
                if(valor_exp1==false){
                    num=0;
                }
                return num-valor_exp2;
            }else if(typeof valor_exp2=='boolean'){
                //Error semantico
            }else if(typeof valor_exp2=='string'){
                //Errro semantico
            }
        }else if(typeof valor_exp1=='string'){
            //caracter
            if(valor_exp1.length==1){
                if(typeof valor_exp2=='number'){
                    let numascci=valor_exp1.charCodeAt(0);
                    return numascci-valor_exp2;
                }else if(typeof valor_exp2=='boolean'){
                    // Error semantico
                }else if(typeof valor_exp2=='string'){
                    // Error semantico
                }
            }else{
                //cadena
                //Error semantico
            }
        }
    }

    multiplicacion(valor_exp1,valor_exp2){
        if(typeof valor_exp1=='number'){
            if(typeof valor_exp2=='number'){
                return valor_exp1*valor_exp2;
            }else{
                if(typeof valor_exp2=='boolean'){
                    //Error Semantico
                }else if(typeof valor_exp2=='string'){
                    //caracter
                    if(valor_exp2.length==1){
                        let numascci=valor_exp2.charCodeAt(0);
                        return valor_exp1*numascci;
                    }else{
                        //Error semantico
                        //cadena
                    }
                }
            }
        }else if(typeof valor_exp1=='boolean'){
            //Error semantico
        }else if (typeof valor_exp1=='string'){
            // caracter
            if(valor_exp1.length==1){
                if(typeof valor_exp2=='number'){
                    let numascci=valor_exp1.charCodeAt(0);
                    return numascci*valor_exp2;
                }else if(typeof valor_exp2=='boolean'){
                        //Error semantico
                }else if(typeof valor_exp2=='string'){
                        //Error semantico
                }
            }else{
                //cadena
                //Error Semantico
            }
        }
    }

    divicion(valor_exp1,valor_exp2){
        if(typeof valor_exp1=='number'){
            if(typeof valor_exp2=='number'){
                return valor_exp1/valor_exp2;
            }else{
                if(typeof valor_exp2=='boolean'){
                    //Error Semantico
                }else if(typeof valor_exp2=='string'){
                    //caracter
                    if(valor_exp2.length==1){
                        let numascci=valor_exp2.charCodeAt(0);
                        return valor_exp1/numascci;
                    }else{
                        //Error semantico
                        //cadena
                    }
                }
            }
        }else if(typeof valor_exp1=='boolean'){
            //Error semantico
        }else if (typeof valor_exp1=='string'){
            // caracter
            if(valor_exp1.length==1){
                if(typeof valor_exp2=='number'){
                    let numascci=valor_exp1.charCodeAt(0);
                    return numascci/valor_exp2;
                }else if(typeof valor_exp2=='boolean'){
                        //Error semantico
                }else if(typeof valor_exp2=='string'){
                        //Error semantico
                }
            }else{
                //cadena
                //Error Semantico
            }
        }
    }

    potencia(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if(typeof valor_exp2 == 'number'){
                return Math.pow(valor_exp1,valor_exp2);
            }else if (typeof valor_exp2=='boolean'){
                //Error semantico
            }else if( typeof valor_exp2=='string'){
                //Erroro semantico
            }
        }else if (typeof valor_exp1 == 'boolean'){
            //Erro semantico
        }else if( typeof valor_exp1 == 'string'){
            // Error semantico
        }
    }

    modulo(valor_exp1,valor_exp2){
        if(typeof valor_exp1 == 'number'){
            if(typeof valor_exp2 == 'number'){
                return valor_exp1%valor_exp2;
            }else if (typeof valor_exp2=='boolean'){
                //Error semantico
            }else if( typeof valor_exp2=='string'){
                //Erroro semantico
            }
        }else if (typeof valor_exp1 == 'boolean'){
            //Erro semantico
        }else if( typeof valor_exp1 == 'string'){
            // Error semantico
        }
    }
    
}