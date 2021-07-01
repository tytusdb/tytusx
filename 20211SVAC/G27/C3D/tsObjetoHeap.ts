class tsObjetoHeap{    
    posicion: number;
    valor:string;

    constructor(posicion:number, valor:string){        
        this.posicion=posicion;
        this.valor=valor;        
    }   

    public getPosicion(){
        return this.posicion;
    }

    public setPosicion(posicion:number){
        this.posicion=posicion;
    }

    public getValor(){
        return this.valor;
    }

    public setValor(valor:string){
        return this.valor=valor;
    }
}