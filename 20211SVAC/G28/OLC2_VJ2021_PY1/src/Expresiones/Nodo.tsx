export class Nodo{
    Tipo: string;
    Valor: any;
    Hijos: Array<Nodo>;
    Cadena: string | undefined;
    i: number | undefined;

    constructor(Tipo: string, Valor: any){
        this.Tipo = Tipo;
        this.Valor = Valor;
        this.Hijos = [];
    }

    Mostrar(){
        this.Cadena = "";
        console.log(this.Tipo + ";" + this.Valor);
        for(this.i=0; this.i<this.Hijos.length; this.i++){
            if(this.Hijos[this.i] != undefined){
                this.Cadena += this.Hijos[this.i].Mostrar();
            }
        }
        return this.Cadena
    }

}