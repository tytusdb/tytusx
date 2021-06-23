import { Expresion } from '../Operaciones/InterfazExpresion';

export default class Primitivo implements Expresion{

    public primitivo: any; 
    public linea: number;
    public columna: number;

    /**
     * @constructor creamos un nuevo primitivo
     * @param primitivo hace referencia a los valores enteros, dobles, cadenas, caracteres, booleanos
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    constructor(primitivo: any, linea: number, columna: number) {
        this.columna = columna;
        this.linea = linea;
        this.primitivo = primitivo;
    }

    getTipo() :any {
        let valor = this.getValor();

        if(typeof valor === 'number'){   
            return "numero";
        }else if(typeof valor === 'string'){
            return "string";
        }
    }

    /**
     * @returns retorna el valor exacto del primitivo 
     */
    getValor(): any {
        return this.primitivo;
    }
}