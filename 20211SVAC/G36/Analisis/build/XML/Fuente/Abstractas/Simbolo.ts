import { Entorno } from "./Entorno";
import { Tipo } from "./Tipo";

export class Simbolo{
    public nombre:String;
    public valor:String;
    public tipo:Tipo;
    public fila:Number;
    public columna:Number;
    public entorno:Entorno;

    constructor(nombre:String, valor:String, tipo:Tipo, fila:Number, columna:Number, padre?:any){
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        if(padre == undefined || padre == null){
            this.entorno = new Entorno(null);
        }else{
            this.entorno = new Entorno(padre);
        }
    }

    public getTabla(papa:String){
        var dot = "";
        if(this.entorno!=undefined || this.entorno!=null){
            this.entorno.ambito.forEach(element => {
                dot+= element.getTabla(this.nombre);
            });
        }
        if(this.tipo != 3 && this.nombre!="global"){
            var dot2 = "<tr><td>"+this.nombre+"</td>\n"
            dot2 += "<td>"+this.getTipo()+"</td>\n"
            dot2 += "<td>"+this.valor+"</td>\n"
            dot2 += "<td>"+papa+"</td>\n"
            dot2 += "<td>"+this.fila+"</td>\n"
            dot2 += "<td>"+this.columna+"</td></tr>\n"
            return dot2 + dot;
        }else{
            return dot;
        }
    }
    private getTipo(){
        switch(this.tipo){
            case 0:
                return "Texto";
            case 1:
                return "Objeto unario";
            case 2:
                return "Atributo";
            case 3:
                return "Objeto";
        }
    }
}
