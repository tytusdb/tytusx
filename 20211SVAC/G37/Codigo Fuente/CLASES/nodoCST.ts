

export class nodoCST {

    public idPadre:string;
    private label:string 
    //public hijos?:[nodoCST];
    public hijos:nodoCST[] ;
    //mierda:[] = [];

    constructor(id:string, label:string){
        this.idPadre = id;
        this.label = label.replace(/"/g,''); // eliminar "
        this.hijos = []; // inicializamos el arreglo en vacio
        
    }
 
    generarDotString():string{

        let stringDot:string = `${this.idPadre}[label = "${this.label}"]\n`;
        this.hijos?.forEach(e =>{
            console.log("INGRESO?", this.idPadre);
            stringDot += e.generarDotString();
            stringDot += `${this.idPadre}->${e.idPadre}; `;
        });
        return stringDot; 
    }
}