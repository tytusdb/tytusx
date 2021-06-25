class tsObjeto{
    identificador: string;
    tipo: string;
    entorno: string;
    sp: any; //stack pointer
    longitud: number; //cantidad de bytes que conforma la cadena

    constructor(identificador: string, tipo: string, entorno: string)
    {
        this.identificador = identificador;
        this.tipo = tipo;
        this.entorno = entorno;
        this.sp = 0;
        this.longitud = this.identificador.length;
    }
}