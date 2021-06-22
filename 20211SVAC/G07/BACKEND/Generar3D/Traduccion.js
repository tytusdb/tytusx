class Traduccion {


    constructor() {
        this.heap = Array(30101999);
        this.stack = Array(30101999);
        this.h = 0;
        this.p = 0;
        this.t = 1;
        this.traduccion3D = ``;

    }

    
    traducirCadena(cadena) {
        
        //Se obtiene la posicion del heap
        this.t0 = this.h;
        this.traduccion3D += `
            t0 = H;
        `;

        //Temporal que manejara la asignacion al heap
        this.t1 = this.t0;
        this.traduccion3D += `
            t1 = t0;
        `;

        //Aumento del uso del heap
        this.h = this.h + cadena.length;
        this.traduccion3D += `
            H = H + ${cadena.length};
        `;

        //Asignar al heap cada uno de los caracteres que conforman la Cadena
        for (let i = this.t1; i < cadena.length; i++) {
            //Se obtiene el ASCII del caracter
            let asciiChar = cadena.charCodeAt(i);

            //Se asigna el caracter al heap
            this.heap[i] = asciiChar;
            this.traduccion3D += `
                heap[t1] = ${asciiChar};
            `;   
        }
        
        return this.t0;

    }

    obtenerCodigo() {
        let codigoTraducido = `
        #include <studio.h>
        #include <math.h>

        double heap[${this.heap.length}];
        double stack[${this.stack.length}];
        double P;
        double H;

        void main() {
            P = 0; H = 0;

            return 0;
        }
        `;

        return codigoTraducido;

    }

}

