export class NodoCST {
    public etiqueta: string;
    public valor: string;
    public hijos: NodoCST[];
    public linea: number;
    public columna: number;


    constructor(){
        if (arguments.length == 0) {
            this.etiqueta = "";
            this.valor = "";
            this.hijos = [];
            this.linea = -1;
            this.columna = -1;
        } else if (arguments.length == 2){
            this.etiqueta = arguments[0];
            this.valor = arguments[1];
            this.hijos = [];
            this.linea = -1;
            this.columna = -1;
        } else if (arguments.length == 4) {
            this.etiqueta = arguments[0];
            this.valor = arguments[1];
            this.hijos = [];
            this.linea = arguments[2];
            this.columna = arguments[3];
        }
    }

    public agregarHijo(nuevoHijo: NodoCST){
        this.hijos.push(nuevoHijo);
    }
}