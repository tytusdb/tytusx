
export class Nodo{
    public id: number;
    public nombre: string;
    public valor: string;
    public linea: number;
    public columna: number;
    public hijos: Nodo[];

    constructor(ide: number, nom: string, val: string, fila: number, columna: number){
        this.id = ide;
        this.nombre = nom;
        this.valor = val;
        this.linea = fila;
        this.columna = columna;
        this.hijos = [];
    }

    public NuevoHijo(hijo: Nodo){
        this.hijos.push(hijo);
    }

    public imprimir(){
        console.log(this.id+'-*'+this.nombre);
        this.hijos.forEach(element => {
            if(element.valor == ''){
                element.imprimir();
            } else {
                console.log(element.valor+'*-'+element.id);
            }
        });
    }

}