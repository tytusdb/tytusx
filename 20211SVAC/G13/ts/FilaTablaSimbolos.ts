//Clase para guardar las filas de la tabla de simbolos del codigo de tres direcciones

export class FilaTablaSimbolos{
    
    /** Nombre de la objeto/etiqueta xml */
    name: string;
    /** Ambito del objeto/etiqueta xml */
    ambito: string;
    /** Tipo de objeto, para saber si es etiqueta o atributo */
    tipo: string;
    /** Linea en donde se encontro al atributo/etiqueta_xml */
    linea: number;
    /** Linea en donde se encontro al atributo/etiqueta_xml */
    columna: number;
    /** Posicion que ocupa en la estructura del Stack */
    posicion?: number;

    /**
     * Constructor de un objeto FilaTablaSimbolos
     * @param tag_name 
     * @param ambito 
     * @param tipo 
     * @param line 
     * @param col 
     * @param position 
     */
    constructor(
        tag_name:string,
        ambito:string,        
        tipo:string,
        line:number,
        col:number,
        position?:number,
        ){
        this.name = tag_name;
        this.ambito = ambito;
        this.tipo = tipo;
        this.linea = line;
        this.columna = col;
        this.posicion = position;
    }

    /**
     * Arma un arreglo con los valores de la fila para la tabla de simbolos;
     * el arreglo que arma siempre tiene un tamaño de 6, pues son 6 atributos, 
     * estructura del arreglo-> [ tipo, name, ambito, posicion, linea, columna ] 
     * El metodo es por si llega a ser util
     * @returns [string]:arreglo de strings
     */
    getFila():string[]{
        let fila:string[] = [];
        fila.push(this.tipo);
        fila.push(this.name);
        fila.push(this.ambito);
        fila.push((this.posicion!==undefined)?this.posicion.toString():'-');
        fila.push(this.linea.toString());
        fila.push(this.columna.toString());
        return fila;
    }
}