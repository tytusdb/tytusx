export class NodoX{
    public estado: string;
    public identificador:any;
    public nodos: Array<NodoX>;

    public constructor(estado:string, identificador:any, nodos:Array<NodoX>) {
        this.estado = estado;
        this.identificador = identificador;
        this.nodos = nodos;
    }
}