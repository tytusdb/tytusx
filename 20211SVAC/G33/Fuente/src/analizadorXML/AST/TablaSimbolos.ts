import { ArrayType, ThisReceiver } from "@angular/compiler";
import { ObjectUnsubscribedError } from "rxjs";
import { Objeto } from "../Expresiones/Objeto";

interface elementoTabla {
    no: number,
    nombre: string,
    tipo: string,
    valor: string,
    tipoEtiqueta: any,
    linea: number,
    columna: number,
    ambito: string
}

export class TablaSimbolos {
    contador: number = 1;

    constructor() { this.contador = 1;}

    generarReporteTablaObjetos(objetos: any): elementoTabla[] {
        var arrayCuerpo: elementoTabla[] = [];
        objetos.forEach((object: any) => {
            this.generarFilaObjeto(object, null, 'Etiqueta', arrayCuerpo);
        });
        return arrayCuerpo;
    }

    generarFilaObjeto(objeto: any, ambito: any, tipo: any, array: Array<elementoTabla>) {
        let valor: any;
        objeto.texto === '' ? valor = "Etiqueta raiz" : valor = objeto.texto;
    
        let ambitoElemento: any;
        ambito === null ? ambitoElemento = "Global" : ambitoElemento = ambito

        let tipoEti: any;
        objeto.completa === 1 ? tipoEti = "Doble" : tipoEti = "Simple" 

        let fila: elementoTabla = {no: this.contador,
            nombre: objeto.identificador,
            tipo: tipo,
            valor: valor,
            tipoEtiqueta: tipoEti,
            linea: objeto.linea,
            columna: objeto.columna,
            ambito: ambitoElemento
        }
        array.push(fila)

        this.contador++;

        objeto.listaAtributos.forEach((atribute: any) => {
            this.generarFilaAtributo(atribute, objeto.identificador, 'Atributo', array);
        });
        objeto.listaObjetos.forEach((atribute: any) => {
            this.generarFilaObjeto(atribute, objeto.identificador, 'Etiqueta', array);
        });


    }

    generarFilaAtributo(objeto: any, ambito: any, tipo: any, array: Array<elementoTabla>) {
        let fila: elementoTabla = {
            no: this.contador,
            nombre: objeto.identificador,
            tipo: tipo,
            valor: objeto.valor,
            tipoEtiqueta: "No aplica",
            linea: objeto.linea,
            columna: objeto.columna,
            ambito: ambito
        }
        array.push(fila)
        this.contador++;
    }
}