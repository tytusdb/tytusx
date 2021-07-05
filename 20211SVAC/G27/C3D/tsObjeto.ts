class tsObjeto{
    i:number;
    identificador: string;
    tipo: string;
    entorno: string;
    sp: any; //stack pointer
    longitud: number; //cantidad de bytes que conforma la cadena
    padre:any;
    listaAtributos: Array<string>;
    listaEtiquetasHijas: Array<string>;

    constructor(id:number, identificador: string, tipo: string, entorno: string, padre:any)
    {
        this.i = id;
        this.identificador = identificador;
        this.tipo = tipo;
        this.entorno = entorno;
        this.sp = 0;
        this.longitud = this.identificador.length;
        this.padre = padre;
        this.listaEtiquetasHijas=new Array<string>();
        this.listaAtributos=new Array<string>();
    }

    public setPadre(padre:any){
        this.padre = padre;
    }

    public agregarAtributo(atributo:string){
        this.listaAtributos.push(atributo);
    }

    public agregarEtiquetaHija(eHija:string){
        this.listaEtiquetasHijas.push(eHija);
    }


}