class tsObjeto{
    i:number;
    identificador: string;
    tipo: string;
    entorno: string;
    sp: any; //stack pointer
    longitud: number; //cantidad de bytes que conforma la cadena
    padre:any;

    constructor(id:number, identificador: string, tipo: string, entorno: string, padre:any)
    {
        this.i = id;
        this.identificador = identificador;
        this.tipo = tipo;
        this.entorno = entorno;
        this.sp = 0;
        this.longitud = this.identificador.length;
        this.padre = padre;
    }

    public setPadre(padre:any){
        this.padre = padre;
    }
}