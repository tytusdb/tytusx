import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { SimboloXQ } from "../Entorno/SimboloXQ";
import { EnumTipo, TipoXQ } from "../Entorno/TipoXQ";
import { LiteralXQ } from "../Expresiones/LiteralXQ";
import { FuncionXQ } from "./Funcion";
import { ReturnXQ } from "./ReturnXQ";
var localStorage = require('localStorage');

export class LlamadaF extends ExpresionXQ {
    nombre:string;
    listaP:[ExpresionXQ];

    constructor(n:string, lp:[ExpresionXQ], l:number, c:number) {
        super();
        this.nombre = n;
        this.listaP = lp;
        this.linea = l;
        this.columna = c;
    }
    
    getValor(ent: EntornoXQ): ExpresionXQ {
        let retorno:LiteralXQ = new LiteralXQ(new TipoXQ(EnumTipo.error), "@Error@", this.linea, this.columna);

        let lpar:[ExpresionXQ] = [];
        this.listaP.forEach(par => {
            let pr:ExpresionXQ = par.getValor(ent);
            lpar.push(pr);
        });

        let auxN:string = "$" + this.nombre;
        lpar.forEach(ex => {
            auxN += "_" + ex.tipo.tipo;
        });

        let b:SimboloXQ = ent.buscar(auxN, this.linea, this.columna, 'La funcion');
        if(b != null) {
            let func:FuncionXQ = b.valor;
            //Insertar una acceso a la pila
            var cn = parseInt(localStorage.getItem('contador')) + 1;
            localStorage.setItem('contador', cn);
            //console.log('Pila.length = ' + localStorage.getItem('contador'));

            let nuevo:EntornoXQ = new EntornoXQ(ent.global);
            for (let i = 0; i < lpar.length; i++) {
                let sim:SimboloXQ = new SimboloXQ(lpar[i].tipo, lpar[i].valor);
                nuevo.insertar(func.listaP[i].nombre, sim, this.linea, this.columna, "La variable");
            }

            let reti = func.listaI.ejecutar(nuevo);
            //Se remueve un acceso
            var cn = parseInt(localStorage.getItem('contador')) - 1;
            localStorage.setItem('contador', cn);
            //console.log('Pila.length = ' + localStorage.getItem('contador'));

            if(reti != null) {
                //Existe un return
                if(reti instanceof ReturnXQ) {
                    let devolver:ExpresionXQ = reti.retorno;
                    if(devolver != null && devolver != undefined) {
                        if(func.tipo.tipo == EnumTipo.tvoid) {
                            //console.log('La funcion de tipo void no debe de tener una expresion de retorno');
                            return new LiteralXQ(new TipoXQ(EnumTipo.tvoid), 'void', this.linea, this.columna);
                        } else {
                            //Aqui se mira lo de los objetos... pero no hay en este lenguaje
                            if(func.tipo.tipo == devolver.tipo.tipo) {
                                //console.log('Los retornos estan bien');
                                return devolver;
                            } else {
                                //console.log('El tipo de retorno no coincide con el esperado por la funcion ' + this.nombre);
                                return retorno;
                            }
                        }
                    } else {
                        if(func.tipo.tipo == EnumTipo.tvoid) {
                            //console.log('Esta bien que tenga return pero que no devuelva nada ya que la funcion es de tipo void');
                            return new LiteralXQ(new TipoXQ(EnumTipo.tvoid), 'void', this.linea, this.columna);
                        } else {
                            //console.log('La funcion no esperaba un retorno vacio ya que NO ES de tipo void');
                            return retorno;
                        }
                    }
                } else {
                    console.log('Se encontro un problema con el retorno de la funcion, lo obtenido no es de tipo retorno');
                    return retorno;
                }
            } else {
                //No habia instruccion return
                if(func.tipo.tipo == EnumTipo.tvoid) {
                    //Esta bien que no tenga return
                    //console.log('Esta bien que no tenga return ya que la funcion es de tipo void');
                    return new LiteralXQ(new TipoXQ(EnumTipo.tvoid), 'void', this.linea, this.columna);
                } else {
                    //console.log('La funcion esperaba una expresion de retorno ya que dicha funcion no es void');
                    return retorno;
                }
            }
        } else {
            console.log('No se encotro la funcion :v con ese nombre y parametros');
        }

        return retorno;
    }

    copiar(): ExpresionXQ {
        return new LlamadaF(this.nombre, this.listaP, this.linea, this.columna);
    }
}