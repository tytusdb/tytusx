class Traduccion {


    constructor() {
        this.heap = Array(30101999);
        this.stack = Array(30101999);
        this.h = 0;
        this.p = 0;
        this.t = 0;
        this.traduccion3D = ``;

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
            H = H + ${cadena.length};`;

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

    esNumero(entrada) {

        return !isNaN(entrada);
    }

    obtenerCodigo() {

        // Se obtienen las etiquetas
        let etiquetas = '';
        for (let i = 0; i < this.t; i++) {
            if (i === this.t - 1) {
                etiquetas += `t${i};`
                break; 
            }
            etiquetas += `t${i},` 
        }

        //Etiquetas en consola
        let auxEtiqueta = '';
        for (let i = 0; i < this.t; i++) {
            if (i === this.t - 1) {
                auxEtiqueta += `t${i};`
                break; 
            }
            
            auxEtiqueta += `t${i},` 

            if (i % 50 === 0 && i != 0) {
                auxEtiqueta += `\n        `;    
            }
        }
        console.log(auxEtiqueta);

        

        let codigoTraducido = `
        #include <stdio.h>
        #include <math.h>

        float heap[${this.heap.length}];
        float stack[${this.stack.length}];
        float P;
        float H;
        float ${auxEtiqueta}

        void main() {
            P = 0; H = 0;

            ${this.traduccion3D}

            printf("Hello World");

            return;
        }
        `;

        return codigoTraducido;

    }

}

