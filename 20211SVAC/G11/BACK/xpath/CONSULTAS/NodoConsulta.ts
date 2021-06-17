
export class NodoConsulta{

    
    private id:string;
    private accion:string;
    private valor:any;

    constructor(id:string, accion:string, val:any){
        this.accion=accion;
        this.id=id;
        this.valor=val;
    }

    public getaccion():any{
        return this.accion;
    }

    public getid():any{
        return this.id
    }

    public getval():any{
        return this.valor;
    }

}