export class Atributo{
    public nombre:string;
    public valor:string;

    constructor(nombre,valor){
        this.nombre=nombre;
        this.valor=valor;
    }

    dameNombre(){
        return this.nombre;
    }
    dameValor(){
        return this.valor;
    }

    recorrer(e, nivel:number){
        let espacio=" - ".repeat(nivel);
        let salida= espacio+`ATRIBUTO: ${this.nombre} - Valor: ${this.valor} - Etiqueta: ${e}`+'\n';
        return salida;
    }
}