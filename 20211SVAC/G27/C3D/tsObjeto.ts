class tsObjeto{
    identificador: string;
    tipo: string;
    entorno: string;
    sp: number; //stack pointer

    constructor(identificador: string, tipo: string, entorno: string)
    {
        this.identificador = identificador;
        this.tipo = tipo;
        this.entorno = entorno;
        this.sp = 0;
    }
}