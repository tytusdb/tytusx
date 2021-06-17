import { Objeto } from "../Objetos/Objeto";

export class Tabla{
    
    private global:Objeto[];
    private errores:any[];
    private encode:String;

    constructor(global:any, errores:any,encode:String){
        this.global = global;
        this.errores = errores;
        this.encode = encode;
    }

    public insertObjet(nuevo:Objeto){
        this.global.push(nuevo);
    }
    public getReporteTS():String{
        //Metodo para reporte de tabla de simbolos
        return "";
    }
    public getErroresDot(){
        //Metodo para reporte de errores
        return this.errores;
    }
    public getNodo(nombre:String){
        //Hacer metodo para buscar 
    }

    public ejecutar(){
        this.global.forEach(element => {
            //element.ejecutar(this,);
        });
    }

    public insertError(error:any){
        this.errores.push(error);
    }

    public getErrores(){
        return this.errores;
    }
    //book/asdsaf/asdfsdf{}

}