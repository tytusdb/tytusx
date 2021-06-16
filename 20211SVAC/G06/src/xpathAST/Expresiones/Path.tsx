import { Entorno } from '../../xmlAST/Entorno';
import { Acceso} from './Acceso';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';

export class Path implements Expression{

    salida: any[];

    constructor (
    public line : Number,
    public column: Number,
    public L_Accesos : Acceso [],
    public tipoPath : string
    ){
        this.salida=[];
    }   

    ////fechaPublicacion[@año>./../../libro[3]/fechaPublicacion/@año]

    
  
    private unirSalida () : string{

        let salida : string = ""

        for (const element of this.salida) {
            salida += element
        }
        return salida;
    }

    public execute(ent : Entorno, simboloPadre?:Simbolo) :Retorno { //      /biblio

        if (this.L_Accesos.length > 0 && ent.listaEntornos.length > 0){

            if (this.L_Accesos[0].tipoAcceso === "nodo"){
                
                if(ent.identificador === this.L_Accesos[0].id){//validamos que el id entActual sea igual al id de la poscion Actual de accesos

                    if (this.validarPredicadosNodos(ent, ent, 0)){

                        if(this.L_Accesos.length >  1){ //verificamos si la consutla nos dice que accediendo a descendientes
                            this.getQuery(ent, 1); 
                        }else{
                            this.construirNodos(ent, "")
                        }
                    }
                }
            }
        }
        return {value: this.unirSalida(), type: tipoPrimitivo.STRING};
    }

    private getQuery(entPadre: Entorno, posActAcceso: number) {
        
        if(entPadre.listaEntornos.length > 0){
                      
            for (const entActual of entPadre.listaEntornos) {//recorremos los hijos del entorno padre que llamaremos entActual

                if(entActual.identificador === this.L_Accesos[posActAcceso].id){//validamos que el id del entorno sea igual al id de la poscion Actual de Accesos

                    if (this.validarPredicadosNodos(entPadre, entActual, posActAcceso)){

                        if(this.L_Accesos.length > posActAcceso + 1){ //verificamos si no es el ultimo acceso
                            this.getQuery(entActual, posActAcceso + 1); 
                        }else{
                            this.construirNodos(entActual, "");
                        }
                    }
                }
            }
        }
    }

    private construirNodos(entPadre:Entorno, tab : string){

        if (this.tipoPath === "sub"){

            if (entPadre.listaEntornos.length > 0 || (entPadre.listaEntornos.length === 0 && entPadre.texto === '')){
                this.salida.push({value : entPadre.identificador , type: tipoPrimitivo.NODO})
            }else {
                this.salida.push({value : entPadre.texto, type: tipoPrimitivo.STRING});
            }

        }else {

            var atributos = "";
            for (const atri of entPadre.listaSimbolos) { // construyo atributos
                atributos+= atri.identificador + " = \"" + atri.valor.replaceAll("\"","") + "\"  ";
            }

            //construyo Nodos
            if(entPadre.listaEntornos.length === 0 && entPadre.texto === ''){
                this.salida.push(tab +"<" + entPadre.identificador + " " + atributos + "/>\n");
            }
            else if(entPadre.listaEntornos.length > 0){

                this.salida.push(tab +"<" + entPadre.identificador + " " + atributos + ">\n");
                for (const entActual of entPadre.listaEntornos) {
                    this.construirNodos(entActual, tab + "   ");    //         //nombre  /biblio/libro//nombre             
                }
                this.salida.push(tab +"</" + entPadre.identificador + ">\n");
            
            } else{
                this.salida.push(tab +"<"+ entPadre.identificador +" "+ atributos+">"+entPadre.texto+"</"+entPadre.identificador+">\n");
            }

        }
    }

    private validarPredicadosNodos(entPadre: Entorno, entActual : Entorno, posActAcceso:number) : boolean{

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {
            
            var result : Retorno = this.L_Accesos[posActAcceso].predicados[i].execute(entActual);
            if (result.type === tipoPrimitivo.NUMBER){
                
                if (result.value - 1 >= 0 && result.value - 1 < entPadre.listaEntornos.length){
                    if (entPadre.listaEntornos[result.value - 1] !== entActual){
                        return false; 
                    }
                }
            }else if (result.value === "" && result.type === tipoPrimitivo.error){
                return false; 
            }else if (result.value === false) {
                return false ;
            }
        }
        return true;
    }

}