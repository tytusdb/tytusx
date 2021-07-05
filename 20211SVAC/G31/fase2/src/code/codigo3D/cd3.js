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
        let traduccion = `/* --- --- --- MAIN --- --- --- */\nvoid main() {\n\tP = ${this.stack.sp}; H =  ${this.heap.hp}; \n \n`; 
        console.log('VOY A TRADUCIR ESTO ->', entorno)
        let traducir = this.traducirXML2(entorno, '', 0, 0)
        traduccion += traducir.traduccion; 
        /*traduccion += `Consulta();\r\nImprimir();\r\n`;
        traduccion += '\t return ; \n} // Fin de la traducción de XML '*/

        //traducir.traduccion = this.getEncabezado() + traduccion; 
        traducir.traduccion = traduccion; 
        console.log('HEAP ---->', this.heap.lista)
        console.log('STACK -->', this.stack.lista)
        return traducir
    }

    traducirXML(entorno, contadorObjeto){
        let traduccion = ''
        var valorH = this.heap.hp;  // para ver el valor que lleva el temporal del Heap Pointer 

        for(let atributo of entorno.atributos){  // Traducimos los atributos 
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
            atributo.tamanio = atributo.valor.length; 
            contadorObjeto += atributo.tamanio; 
            this.stack.lista[this.stack.sp] = valorH; 
            this.stack.sp++; 
            
        }

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
                entorno.tamanio = entorno.texto.length; 
                contadorObjeto += entorno.tamanio; 
                this.stack.lista[this.stack.sp] = valorH; 
                this.stack.sp++; 
                

            }else{  // VER QUE HACER CON LOS OBJETOS DENTRO DE OBJETOS 
                traduccion += '// Aqui debo guardar un objeto que contiene mas objetos\n'
            }
        }

        for(let objeto of entorno.hijos){   // METODO RECURSIVO PARA LOS DEMAS OBJETOS
            var retorno = this.traducirXML(objeto, contadorObjeto); 
            traduccion +=  retorno.traduccion; 
            objeto = retorno.objeto; 
            contadorObjeto = retorno.contador; 
        }

        entorno.tamanio = contadorObjeto; 
        
        return {traduccion: traduccion, entorno: entorno, contador: contadorObjeto }
    }

    traducirXML2(objeto, traduccion, hp, sp){
        let temporalInicioObjeto = 0; 
        let temporalObjeto = 0; 
        let heapObjeto = 0; 
        let stackObjeto = 0; 
       
        if((objeto.hijos.length > 0 ||  objeto.atributos.length > 0) &&  objeto.tipo != "/" ){ 
            traduccion += ` t${this.contadorTemporales} = H;  // Objeto trae otros objetos ${objeto.tipo}\n`    // temporal donde va iniciar mi objeto este lo tengo que guardar en el stack []
            
            /* Temporales para el Objeto General  */ 
            temporalInicioObjeto = this.contadorTemporales          // guardo el numero de temporal donde inicia mi objeto             
            this.contadorTemporales++; 
            temporalObjeto = this.contadorTemporales;      // el numero de temporal que va ir manejando mi objeto 
            this.contadorTemporales++;
            
            hp = this.heap.hp; 
            heapObjeto = hp; 
            stackObjeto = sp; 
            sp++;
            objeto.posicion = stackObjeto; 
            this.stack.lista[stackObjeto] = heapObjeto; 
            

            traduccion += ` H = H + ${objeto.hijos.length + objeto.atributos.length + 1}; \n`   // reservo el espacio de memoria en mi heap 
            this.heap.hp += objeto.hijos.length + objeto.atributos.length + 1;       // Guardamos el espacio en el heap 
            traduccion += ` t${temporalObjeto} = t${temporalInicioObjeto}; \n`   // En este temporal es que se va ir guardando la posicion en el stack donde estan los demas objetos 
               
        }   

        for(let atributo of objeto.atributos){
            traduccion += ` t${this.contadorTemporales} = H;  // Empieza ${atributo.nombre} = ${atributo.valor}\n`
            hp = this.heap.hp;                                            // contador del heap 
            let hpInicio = hp;                                            // posicion en el heap donde inicia mi atributo 
            
            /* Temporales Atributos para manejar la traduccion */ 
            let inicioAtributo =  this.contadorTemporales;                // temporal que usa mi atributo en donde esta el inicio 
            this.contadorTemporales++;                   
            let temporalAtributo =  this.contadorTemporales; 
            this.contadorTemporales++; 

            traduccion += ` t${temporalAtributo} = t${inicioAtributo}; \n`
            traduccion += ` H = H + ${atributo.valor.length + 1}; \n` 
            this.heap.hp += atributo.valor.length + 1; 

            for (let index = 0; index < atributo.valor.length; index++) {
                traduccion += ` heap[(int)t${temporalAtributo}] = ${atributo.valor[index].charCodeAt(0)}; \n`
                traduccion += ` t${temporalAtributo} = t${temporalAtributo} + 1; \n`
                this.heap.lista[hp] = atributo.valor[index].charCodeAt(0);          
                hp++       
            }

            traduccion += ` heap[(int)t${temporalAtributo}] = -1; \n`
            this.heap.lista[hp] = -1; 
            hp++; 
            traduccion += ` stack[(int)${sp}] = t${inicioAtributo}; // Agregue mi atributo al stack []\n`
            atributo.posicion  = sp; 
            this.stack.lista[sp] = hpInicio

            if(objeto.tipo != "/"){
                traduccion += ` t${this.contadorTemporales} = stack[(int)${sp}];  // agregue mi atributo en el heap del objeto \n`   // agregar mi atributo al objeto 
               
                traduccion += ` heap[(int)${heapObjeto}] = t${this.contadorTemporales}; // agregue mi atributo en el heap del objeto\n`
                this.heap.lista[heapObjeto] = sp; 
                heapObjeto++; 
                this.contadorTemporales++; 
            }

            sp++; 
        }
        
        if(objeto.texto != ""){           

            //Temporales para el objeto con texto puede o no tener atributos
            let temporalInicioO = this.contadorTemporales; 
            this.contadorTemporales++; 
            let temporalO = this.contadorTemporales; 
            this.contadorTemporales++; 
            
            hp = this.heap.hp; 
            let inicioO = hp; 


            traduccion += ` t${temporalInicioO} = H ; /* Empieza <${objeto.tipo}> ${objeto.texto} </${objeto.tipo}> */ \n`
            traduccion += ` t${temporalO} = t${temporalInicioO}; \n`; 
            traduccion += ` H = H + ${objeto.texto.length + 1}; \n` 
            this.heap.hp += objeto.texto.length + 1; 

            for (let index = 0; index < objeto.texto.length; index++) {
                traduccion += ` heap[(int)t${temporalO}] = ${objeto.texto[index].charCodeAt(0)}; \n`
                traduccion += ` t${temporalO} = t${temporalO} + 1; \n`; 
                this.heap.lista[hp] = objeto.texto[index].charCodeAt(0); 
                hp++; 
            }

            traduccion += ` heap[(int)t${temporalO}] = -1; \n`; 
            traduccion += ` stack[(int)${sp}] = t${temporalInicioO}; \n`; 
            this.heap.lista[hp] = -1; 
            objeto.posicion = sp; 
            this.stack.lista[sp] = inicioO; 
            sp++; 
        }

        for(let hijo of objeto.hijos){
            let resultado = this.traducirXML2(hijo, traduccion, hp, sp); 
            traduccion = resultado.traduccion; 
            hijo = resultado.objeto; 
            hp = resultado.hp; 
            sp = resultado.sp; 

            if(objeto.tipo != "/"){
                traduccion += ` t${this.contadorTemporales} = stack[(int)${hijo.posicion}]; \n`
                traduccion += ` heap[(int)t${temporalObjeto}] = t${this.contadorTemporales}; \n`
                traduccion += ` t${temporalObjeto} = t${temporalObjeto} + 1; \n`
                this.contadorTemporales++; 
                this.heap.lista[heapObjeto] = hijo.posicion; 
                heapObjeto++; 
            }
            
        }

        if(objeto.tipo != "/" && (objeto.atributos.length > 0 || objeto.hijos.length > 0 )){
            traduccion += ` heap[(int)t${temporalObjeto}] = -2; \n`            
            this.heap.lista[heapObjeto] = -2; 
        }
        
        return {traduccion: traduccion, objeto: objeto, hp: hp, sp: sp }; 
    }

    imprimirCD3(){

    }

    getHeap(){
        return this.heap;
    }

    getStack(){
        return this.stack;
    }

    getTemporal(){ 
        return this.contadorTemporales;
    }
}