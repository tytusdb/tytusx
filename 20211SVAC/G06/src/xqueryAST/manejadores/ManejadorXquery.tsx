import { Retorno } from "../../Interfaces/ExpressionXquery";
import { Entorno } from "../../xmlAST/Entorno";
import { tipoPrimitivo } from "../ExpresionesXpath/Primitivo";

export class ManejadorXquery {

    static unirSalida (salida : string[]) : string{

        let salidaTexto : string = ""
        for (const element of salida) {
            salidaTexto += element
        }
        return salidaTexto;
    }

    static buildXquery (listNodes: Retorno[]) : string{

        var content : string [] = []
        for (const element of listNodes) {
            
            if (element.type === tipoPrimitivo.NODO){
                ManejadorXquery.concatenar(content, this.construirNodos(element.value, ""));
            }else {
                content.push(element.value+ "\n");
            }
        }
        return this.unirSalida(content);
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
                ManejadorXquery.concatenar(content, this.construirNodos(entActual, tab + "   "));              
            }
            content.push(tab +"</" + entPadre.identificador + ">\n");
        
        } else{
            content.push(tab +"<"+ entPadre.identificador +" "+ atributos+">"+entPadre.texto+"</"+entPadre.identificador+">\n");
        }
        return content;
    }

    static concatenar (content : any[], resp: any[]) {

        for (const element of resp) {
            content.push(element);
        }
    }

}