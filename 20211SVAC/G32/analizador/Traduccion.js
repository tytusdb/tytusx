"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traduccion = void 0;
const Generador_1 = require("./Generador/Generador");
class Traduccion {
    constructor(tablasim) {
        this.ts = tablasim;
        this.cadena = "";
    }
    Traducir() {
        //Instancia del generador y limpieza de variables
        const generador = Generador_1.Generador.GetInstance();
        generador.ResetGenerador();
        //Arreglar tabla de símbolos y crear heap y stack
        this.Crearestructuras();
        this.cadena = generador.Creartemp();
        console.log(this.ts);
        //Formular código
        this.Crearcadena();
        return this.cadena;
    }
    Crearestructuras() {
        //Recuperar instancia del generador
        const generador = Generador_1.Generador.GetInstance();
        //Cadena auxiliar
        let cadena;
        let tempo;
        //Se recorre cada elemento de la tabla
        this.ts.tabla.forEach(element => {
            //elem[0] = identificador, elem[1] = valor, elem[7] = direccion
            //El guardado depende de si tienen valor o no
            if (element[1] == "") {
                //Con valor únicamente se almacena el id de la etiqueta
                generador.Addcomentarioxml('Agregando un nuevo elemento sin valores');
                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);
                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadid = element[0];
                for (let i = 0; i < cadid.length; i++) {
                    //Se introduce al heap en la posición H, el caracter ascii
                    generador.Addxml(`heap[(int)H] = ${cadid.charCodeAt(i)};`);
                    //Se incrementa el registro H
                    generador.Addxml('H = H + 1;');
                    generador.Incph(1);
                }
                //Al finalizar la cadena se introduce un -1 para indicar final
                generador.Addxml(`heap[(int)H] = -1;`);
                generador.Addxml('H = H + 1;');
                generador.Incph(1);
                generador.Addcomentarioxml('Se agrega la posición de inicio del heap en el stack');
                //Se referencia al stack el inicio del heap
                let st = generador.GetStackpos();
                generador.Addxml(`stack[(int)${st}] = ${tempo};\n`);
                //Se incrementa el stack
                generador.Incps(1);
                //Se guarda la dirección en la tabla de símbolos
                element[7] = st;
            }
            else {
                //Con más de un valor se almacena el id y luego el valor
                generador.Addcomentarioxml('Agregando un nuevo elemento con valores');
                generador.Addcomentarioxml('Almacenando el identificador');
                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);
                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadid = element[0];
                for (let i = 0; i < cadid.length; i++) {
                    //Se introduce al heap en la posición H, el caracter ascii
                    generador.Addxml(`heap[(int)H] = ${cadid.charCodeAt(i)};`);
                    //Se incrementa el registro H
                    generador.Addxml('H = H + 1;');
                    generador.Incph(1);
                }
                //Al finalizar la cadena se introduce un -1 para indicar final
                generador.Addxml(`heap[(int)H] = -1;`);
                generador.Addxml('H = H + 1;');
                generador.Incph(1);
                generador.Addcomentarioxml('Se agrega la posición de inicio del heap en el stack');
                //Se referencia al stack el inicio del heap
                let st = generador.GetStackpos();
                generador.Addxml(`stack[(int)${st}] = ${tempo};\n`);
                //Se incrementa el stack
                generador.Incps(1);
                //Se guarda la dirección en la tabla de símbolos
                element[7] = st;
                /* */
                generador.Addcomentarioxml('Almacenando el valor');
                //Se obtiene la posición del puntero H y se asigna a un nuevo temporal (el cual servirá para el stack)
                tempo = generador.Creartemp();
                cadena = tempo + ' = H;';
                generador.Addxml(cadena);
                //Se obtiene el caracter ascii de los identificadores de la tabla
                let cadval = element[1];
                for (let i = 0; i < cadval.length; i++) {
                    //Se introduce al heap en la posición H, el caracter ascii
                    generador.Addxml(`heap[(int)H] = ${cadval.charCodeAt(i)};`);
                    //Se incrementa el registro H
                    generador.Addxml('H = H + 1;');
                    generador.Incph(1);
                }
                //Al finalizar la cadena se introduce un -1 para indicar final
                generador.Addxml(`heap[(int)H] = -1;`);
                generador.Addxml('H = H + 1;');
                generador.Incph(1);
                generador.Addcomentarioxml('Se agrega la posición de inicio del heap en el stack');
                //Se referencia al stack el inicio del heap
                st = generador.GetStackpos();
                generador.Addxml(`stack[(int)${st}] = ${tempo};\n`);
                //Se incrementa el stack
                generador.Incps(1);
            }
        });
    }
    Crearcadena() {
        //Recuperar instancia del generador
        const generador = Generador_1.Generador.GetInstance();
        //Se agrega primero el header
        generador.Addcomentario('Inicio del código generado');
        generador.Addcodigo('#include <stdio.h>\n');
        generador.Addcodigo('double heap[30101999];');
        generador.Addcodigo('double stack[30101999];');
        generador.Addcodigo('double S;');
        generador.Addcodigo('double H;\n');
        //Se agregan las declaraciones iniciales
        generador.Gettemporales();
        //Se agrega el inicio del main
        generador.Addcomentario('Agregando main');
        generador.Addcodigo(`int main() \n{`);
        //Contenido del main
        generador.Addcomentarioidentado('Inicializar registros');
        generador.Addcodigoidentado('S = 0;');
        generador.Addcodigoidentado('H = 0;\n');
        generador.Addcodxml();
        //Se agrega el final del main
        generador.Addcodigoidentado(`return 0; \n}\n`);
        //Retorno del código
        this.cadena = generador.GetCodigo();
    }
}
exports.Traduccion = Traduccion;
/*
Estructura C:
 -> HEADER
 -> DECLARACIONES INICIALES
 -> MAIN
    ->CODIGO X
    ->RETURN
 */ 
