import { attempt } from "lodash";
import { Texto } from "../analizadorXPath/Expresion/postfix";
import { Heap } from "./heap";
import { Stack } from "./stack";


export class CD3 {
    heap = null; 
    stack = null; 
    contadorTemporales = 0; 

    constructor(){
        this.heap = new Heap(31110999, 0); 
        this.stack = new Stack(31110999, 0); 
        this.contadorTemporales = 0; 
    }

    getEncabezado(){
        let traduccion = `/* --- --- --- ENCABEZADO --- --- --- */\n#include <stdio.h> \n#include <math.h>\n`
        traduccion += ` double heap[${this.heap.tamanio}];\n double stack[${this.stack.tamanio}];\n double P;\n double H; \n double t0`   
        for (let index = 1; index < this.contadorTemporales; index++) {
            traduccion += `, t${index}`
        }

        traduccion += `; \n\n`

        return traduccion; 
    }
   

    getTraduccion(entorno){        
        let traduccion = `/* --- --- --- MAIN --- --- --- */\nvoid main() {\n\tP = ${this.stack.sp}; H =  ${this.heap.hp}; \n \n`
        let traducir = this.traducir(entorno)
        traduccion += traducir.traduccion; 
        traduccion += '\t return ; \n} // Fin de la traducción'

        traducir.traduccion = this.getEncabezado() + traduccion; 
        console.log('HEAP ---->', this.heap.lista)
        console.log('STACK -->', this.stack.lista)
        return traducir
    }

    traducir(entorno){
        let traduccion = ''
        var valorH = this.heap.hp;  // para ver el valor que lleva el temporal del Heap Pointer 

        if(entorno.tipo != "/"){  // Los objetos que no tienen objetos dentro
            if(entorno.texto != ""){
                traduccion += ` t${this.contadorTemporales} = H; \n`
                valorH = this.heap.hp; 
                for (let index = 0; index < entorno.texto.length; index++) {
                    traduccion += ` heap[(int)H] = ${entorno.texto[index].charCodeAt(0)}; \n H = H + 1 ; \n`  // aumentamos el heap y guardamos caracter por caracter el texto
                    this.heap.lista.push(entorno.texto[index].charCodeAt(0)); 
                    this.heap.hp++;                     
                }
                traduccion += ` heap[(int)H] = -1; \n H = H + 1; \n stack[(int)${this.stack.sp}] = t${this.contadorTemporales}; // Objeto guardado\n`
                this.heap.lista.push(-1); 
                this.heap.hp++; 
                this.contadorTemporales++; 
                entorno.posicion = this.stack.sp;
                this.stack.lista[this.stack.sp] = valorH; 
                this.stack.sp++; 

            }else{  // VER QUE HACER CON LOS OBJETOS DENTRO DE OBJETOS 
                traduccion += '// Aqui debo guardar un objeto que contiene mas objetos\n'
            }
        }

        for(let atributo of entorno.atributos){
            traduccion += ` t${this.contadorTemporales} = H;\n`
            valorH = this.heap.hp; 
            
            
            for (let index = 0; index < atributo.valor.length; index++) {
                //console.log(atributo.valor[index])
                traduccion += ` heap[(int)H] = ${atributo.valor[index].charCodeAt(0)}; \n H = H + 1 ; \n`  // aumentamos el heap y guardamos caracter por caracter de la cadena
                this.heap.lista.push(atributo.valor[index].charCodeAt(0)); 
                this.heap.hp++; 
            }

            traduccion += ` heap[(int)H] = -1; \n H = H + 1; \n stack[(int)${this.stack.sp}] = t${this.contadorTemporales}; // Atributo guardado\n`
            this.heap.lista.push(-1); 
            this.heap.hp++; 
            this.contadorTemporales++; 
            atributo.posicion = this.stack.sp;
            this.stack.lista[this.stack.sp] = valorH; 
            this.stack.sp++; 
            
        }

        for(let objeto of entorno.hijos){
            var retorno = this.traducir(objeto); 
            traduccion +=  retorno.traduccion; 
            objeto = retorno.objeto; 
        }

        return {traduccion: traduccion, entorno: entorno }
    }


}