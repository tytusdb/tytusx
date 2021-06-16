//Clase para los errores encontrados durante el analisis

export class Error{

    tipo: string;
    contenido: string;
    linea: number;
    columna: number;
    mensaje: string;

    /**
     * Contructor de un objeto de error
     * @param tipo tipo de error (lexico|sintactico|semantico)
     * @param contenido contenido del error
     * @param linea linea de error
     * @param columna columna de error
     * @param mensaje mensaje sobre tipo de error encontrado
     */
    constructor(
            tipo: string,  
            contenido: string,
            linea: number,
            columna: number,
            mensaje: string){

        this.tipo = tipo;
        this.contenido = contenido;
        this.linea = linea;
        this.columna = columna;
        this.mensaje = mensaje;
    }

    /**
     * Retorna cadena con informacion del error
     * @returns string
     */
    toString(): string{
        let cadena = '';
        cadena += ' Tipo: ' + this.tipo + 
        " Error:'" + this.contenido + "' en linea:" + this.linea + ' columna:' + this.columna
        + ' Mensaje:' + this.mensaje;
        return cadena;
    }
}