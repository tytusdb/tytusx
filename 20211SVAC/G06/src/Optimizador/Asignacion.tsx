export class Asignacion{
    indice:string;
    operador1:string;
    signo:string;
    operador2:string;

    constructor(indice:string,operador1:string,signo:string,operador2:string){
        this.indice = indice;
        this.operador1 = operador1;
        this.signo = signo;
        this.operador2 = operador2;
    }

}