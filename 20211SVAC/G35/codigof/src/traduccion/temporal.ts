export default class temporal{
    id:string;
    contador: number;
    contadorEtiqueta: number;
    idEtiqueta:string
    constructor(id){
        this.id = id;
        this.contador = 0;
        this.contadorEtiqueta = 0;
        this.idEtiqueta = "L";
    }

    aumentar(){
        this.contador++;
    }

    aumentarEtiqueta()
    {
        this.contadorEtiqueta++;
    }

    retornarString():string{
        return this.id+this.contador;
    }

    retornarStringEtiqueta():string{
        return this.idEtiqueta+this.contadorEtiqueta;
    }
    
}