export class EjecucionXpath {

    objetos: any;
    dot: any;

    constructor (objetos: any, dot: any) {
        this.objetos = objetos;
        this.dot = dot;
    }

    //constructor(){}

    ejecutarArbol():string {
        this.dot = "";
        
        if(this.objetos.length > 1){
            for (let i = 0; i < this.objetos.length; i++){
                this.dot += this.ejecutarNodoArbol(this.objetos[i]);
                if (i != this.objetos.length - 1) { this.dot += "|"; }
            }
        }else{
            this.dot += this.ejecutarNodoArbol(this.objetos[0])
        }
        
        return this.dot
    }

    ejecutarNodoArbol(objeto: any):string {
        var aux:string = objeto.estado + objeto.identificador;
        
        if (objeto.nodos.length > 0){
            aux += this.ejecutarNodoArbol(objeto.nodos[0]);
        }

        return aux
    }

}

