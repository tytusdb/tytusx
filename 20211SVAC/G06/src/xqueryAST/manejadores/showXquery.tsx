import { Retorno } from "../../Interfaces/Expresion";
import { Entorno } from "../../xmlAST/Entorno";
import { tipoPrimitivo } from "../../xpathAST/Expresiones/Primitivo";

export class showXquery {

    static unirSalida (salida : string[]) : string{

        let salidaTexto : string = ""
        for (const element of salida) {
            salidaTexto += element
        }
        return salidaTexto;
    }

    static buildXquery (listNodes: Retorno[]) : string{

        let conten : string [] = []
        for (const element of listNodes) {
            
            if (element.type === tipoPrimitivo.NODO){
                conten.concat(this.construirNodos(element.value, "")); 
            }else {
                conten.push(element.value+ "\n");
            }
        }
        return this.unirSalida(conten);

    }

    static construirNodos(entPadre: Entorno, tab : string): string [] {

        var atributos = "";
        var content : string[] = [];

        for (const atri of entPadre.listaSimbolos) { // construyo atributos
            atributos+= atri.identificador + " = \"" + atri.valor.replaceAll("\"","") + "\"  ";
        }

        //construyo Nodos
        if(entPadre.listaEntornos.length === 0 && entPadre.texto === ''){
            content.push(tab +"<" + entPadre.identificador + " " + atributos + "/>\n");
        }
        else if(entPadre.listaEntornos.length > 0){

            content.push(tab +"<" + entPadre.identificador + " " + atributos + ">\n");
            for (const entActual of entPadre.listaEntornos) {
                content.concat(this.construirNodos(entActual, tab + "   "));    //         //nombre  /biblio/libro//nombre             
            }
            content.push(tab +"</" + entPadre.identificador + ">\n");
        
        } else{
            content.push(tab +"<"+ entPadre.identificador +" "+ atributos+">"+entPadre.texto+"</"+entPadre.identificador+">\n");
        }
        return content;
    }

}