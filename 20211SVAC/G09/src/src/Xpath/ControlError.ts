import { TipoSeleccion } from "./TipoSeleccion"
import { NodoControlError } from "./NodoControlError"
export class ControlError {
   
    NodoControl : NodoControlError
    static ListaE:any=[]


    constructor(simbolo: string, tipo: TipoSeleccion, linea: any, columna: any, entorno: string) {

        console.log("adentro")
        ControlError.ListaE.push(new NodoControlError(simbolo,tipo,linea,columna,entorno))

        console.log(ControlError.ListaE)


    }  

   static Agregar(simbolo: string, tipo: TipoSeleccion, linea: any, columna: any, entorno: string){
    ControlError.ListaE.push(new NodoControlError(simbolo,tipo,linea,columna,entorno))

  
   }
    
   

}  

export function graficar(errores:any, errorbusqueda = {
    simbolo: "",
    tipo: "",
    linea: "",
    columna: "",
}):string {
    var text:string = ""
    for (let set of errores) {
        if(set.tipo === TipoSeleccion.ERROR_LEXICO){
            text = text + '\n' + "simbolo de error: " + set.simbolo + " tipo: error lexico" + " "+ set.linea  +" "+ set.columna;
        }else if(set.tipo === TipoSeleccion.ERROR_SINTACTICO){
            text = text + '\n' +"simbolo de error: " +set.simbolo + " tipo: error sintactico" + " "+ set.linea  +" "+ set.columna;
        }
    }
    return text
}