class Traduccion {


    constructor() {
        this.heap = Array(30101999);
        this.stack = Array(30101999);
        this.h = 0;
        this.p = 0;
        this.t = 0;
        this.traduccion3D = ``;
        this.funciones3D = this.obtenerFuncionesC3D();
        this.Ls=0;

    }

    //Metodo que permite traducir un numero a codigo de 3Direcciones y lo agrega al Heap
    traducirNumero(numero) {
        //Se obtiene la posicion del heap
        this.t0 = this.h;
        this.traduccion3D += `
            t${this.t} = H;`;
            
        //Temporal que manejara la asignacion al heap
        this.t1 = this.t0;
        this.traduccion3D += `
            t${this.t+1} = t${this.t};`;

        //Aumento del uso del heap
        this.h = this.h + 1;
        this.traduccion3D += `
            H = H + 1;`;

        //Asignar al heap el numero
        this.heap[this.t1] = numero;
        this.traduccion3D += `
            heap[(int) t${this.t+1}] = ${numero};
            `;

        //Aumentando el valor de los temporales
        this.t += 2;


        //Retornando la direccion o posicion donde se empieza el almacenamiento
        return this.t0;
    }

    // Metodo que permite traducir una cadena a codigo de 3Direcciones y lo agrega al Heap
    traducirCadena(cadena) {        
        //Se obtiene la posicion del heap
        this.t0 = this.h;
        this.traduccion3D += `
            t${this.t} = H;`;

        //Temporal que manejara la asignacion al heap
        this.t1 = this.t0;
        this.traduccion3D += `
            t${this.t+1} = t${this.t};`;

        //Aumento del uso del heap
        this.h = this.h + cadena.length + 1;
        this.traduccion3D += `
            H = H + ${cadena.length + 1};`;

        //Asignar al heap cada uno de los caracteres que conforman la Cadena
        for (let i = 0; i < cadena.length; i++) {
            //Se obtiene el ASCII del caracter
            let asciiChar = cadena.charCodeAt(i);

            //Se asigna el caracter al heap
            this.heap[this.t1++] = asciiChar;
            this.traduccion3D += `
            heap[(int) t${this.t+1}] = ${asciiChar};  //${cadena[i]}
            t${this.t+1} = t${this.t+1} + 1;`;
            
        }

        //Asignar el fin de los caracteres
        this.heap[this.t1] = -1;
        this.traduccion3D += `
            heap[(int) t${this.t+1}] = -1;
            `;

        //Aumentando el valor de los temporales
        this.t += 2;

        //Retornando la direccion o posicion donde se empieza el almacenamiento
        return this.t0;

    }

    traducirFuncion(cadena) {
        for (let i = 0; i < cadena.length; i++) {
            //Se obtiene el ASCII del caracter
            let asciiChar = cadena.charCodeAt(i);

            this.traduccion3D += `
            t0 = ${asciiChar};
            t${Math.floor(1 + Math.random() * (this.t - 1))} = P + 0;
            t${Math.floor(1 + Math.random() * (this.t - 1))} = P;
            P = P + ${Math.floor(Math.random() * 100)}; 
            buscarIndex();
            `
        }      
    }

    //Metodo para obtener del Heap un Numero
    obtenerNumero(indice) {
        //Valor numerico obtenido del heap
        return this.heap[indice];
    }

    //Metodo para obtener del Heap un String
    obtenerCadena(indice) {
        //Cadena que se va a generar
        let cadena = '';
        //Indice que va a manejar la referencia para obtener los caracteres
        let cont = indice;
        
        //Ciclo para recorrer los caracteres 
        while (true) {
            // Se obtiene el caracter
            let asciiChar = this.heap[cont];

            //Se verifica si el caracteres es de fin de cadena
            if (asciiChar !== -1) {
                cadena += String.fromCharCode(asciiChar);
            } else {
                break;
            }

            cont++;
        }

        return cadena;
    }


    // Imprimir una cadena a partir del indice de referencia
    imprimirCadena(indice) {
        this.funciones3D.imprimirCadena.status = true;

        this.traduccion3D += `
            // Imprimir Cadena
            t0 = ${indice};
            imprimirCadena();
            `;
    }

    // Imprimir un numero a partir del indice de referencia
    imprimirNumero(indice) {
        this.funciones3D.imprimirNumero.status = true;

        this.traduccion3D += `
            // Imprimir Numero
            t0 = ${indice};
            imprimirNumero();
            `;
    }

    //Verifica si una entrada es un numero
    esNumero(entrada) {

        return !isNaN(entrada);
    }



    obtenerCodigo() {

        //Etiquetas en consola
        let auxEtiqueta = '';
        for (let i = 0; i < this.t; i++) {
            if (i === this.t - 1) {
                auxEtiqueta += `t${i};`
                break; 
            }
            
            auxEtiqueta += `t${i},` 

            if (i % 20 === 0 && i != 0) {
                auxEtiqueta += `\n        `;    
            }
        }
        
        //Funciones que se van a utilizar
        let auxFunc = '';
        for (let key in this.funciones3D) {
            let func = this.funciones3D[key];

            if (func.status) {
                auxFunc += `${func.codigo} \n       `;
            }
        }

        

        let codigoTraducido = `
        #include <stdio.h>
        #include <math.h>

        float heap[${this.heap.length}];
        float stack[${this.stack.length}];
        float P;
        float H;
        float ${auxEtiqueta}

        ${auxFunc}

        int main() {
            P = 0; H = 0;

            ${this.traduccion3D}


            return 0;
        }
        `;

        return codigoTraducido;

    }

    obtenerFuncionesC3D() {
        let func3D = {};

        // Se agrega la funcion imprimirCadena
        func3D['imprimirCadena'] = {
            "status": true,
            "codigo": `void imprimirCadena() {
            goto L0;
            L0:
                t1 = heap[(int) t0];
                    
                if (t1 == -1) goto L2;
                goto L1;
            L1:
                printf("%c", (int) t1);
                t0 = t0 + 1;
                goto L0;
            L2:
                return;
        }
            ` 
        }

        //Se agrega la funcion imprimirNumero
        func3D['imprimirNumero'] = {
            "status": true,
            "codigo": ` void imprimirNumero() {
            goto L0;
            L0:
                t1 = heap[(int) t0];
                printf("%f", t1);   
                goto L1;
            L1:
                return;
        }
            ` 
        }


        func3D['buscarIndex'] = {
            "status": true,
            "codigo": ` void buscarIndex() {
            goto L0;
            L0:
                printf("%c",(int) t0);   
                goto L1;
            L1:
                return;
        }
            ` 
        }


        return func3D;
    }
    traducirAritmeticas(cod){
        this.traduccion3D += cod;
    }

    

}

