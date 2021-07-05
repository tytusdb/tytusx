export class tError {

    public tipo: any;
    public texto: string;
    public linea: number;
    public columna: number;

    /**
     * @constructor creamos un nuevo primitivo
     * @param tipo hace referencia al tipo de error
     * @param texto hace referencia al contenido del mensaje del error
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    constructor(tipo: any, texto: string, linea: number, columna: number) {
        this.columna = columna;
        this.linea = linea;
        this.texto = texto;
        this.tipo = tipo;
    }
}