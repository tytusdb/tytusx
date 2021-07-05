import { Instruccion } from "../Interfaces/Instruccion";
import { Entorno } from "./Entorno";

export class AST{
    
    public instrucciones:Array<Instruccion>;
    public entornos:Array<Entorno> = [];
    public errores: Array<any> = [];
    public ast: Array<any> = [];
    public respuesta: any;

    constructor(instrucciones:Array<Instruccion>, entornos: Entorno){
        this.instrucciones = instrucciones;
        this.entornos.push(entornos);
    }

    GetRespuesta(){
        return this.respuesta;
    }

    addResultado(res: any){
        this.respuesta = res;
    }

    addErrores(err: any){
        this.errores = err;
    }

   /*  AddC3D(codigo:string){
        this.C3D = codigo;
    } */

    // AddTabla(){
    //     var tabla = this.GetTablaStorage();
    //     this.tabla = tabla;
    //     console.log(this.tabla)
    // }

    //obtener errores
    GetErrorStorage(): any {
        var data = localStorage.getItem('errores_xquery');
        return JSON.parse(data);
    }

    CrearEntorno(id, anterior){
        var exist_ent = false;
        for(let ent of this.entornos){
            if(ent.getIdentificador() == id){
                exist_ent = true;
            }
        }
        if (!exist_ent){
            var entorno_nuevo = new Entorno(id,anterior);
            this.entornos.push(entorno_nuevo);
        }
    }

    getEntorno(id): Entorno{
        for(let ent of this.entornos){
            if(ent.getIdentificador() == id){
                return ent;
            }
        }
        return null;
    }

    //actualizar contador
    SetTablaStorage(tabla: any) {
        localStorage.setItem('tabla', JSON.stringify(tabla));
    }
    //obtener tabla simbolos
    GetTablaStorage(): any {
        var data = localStorage.getItem('tabla');
        return JSON.parse(data);
    }

}