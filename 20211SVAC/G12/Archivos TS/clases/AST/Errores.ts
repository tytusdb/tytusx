
export default class Errores{
    public tipo: String;
    public descripcion: String;
    public linea: number;
    public columna: number;

    constructor (tipo,descripcion,linea,columna){
        this.tipo =tipo;
        this.descripcion=descripcion;
        this.linea=linea;
        this.columna=columna;
    }

}