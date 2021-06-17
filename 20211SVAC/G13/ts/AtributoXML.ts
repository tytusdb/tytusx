//Clase de los atributos que puede tener una etiqueta XML

export class AtributoXML {

    atributo: string;           //Nombre del atributo
    contenido: string = '';          //Contenido del atributo
    fila: number;                   //numero fila
    columna: number;                //numero columna

    /**
     * Constructor de un atributo para una etiqueta xml
     * @param atributo nombre de atributo
     * @param contenido cadena con contenido del atributo
     * @param fila fila donde se encontro un atributo
     * @param columna columna donde se entonctro un atributo
     */
    constructor(atributo: string, contenido: string, fila: number, columna:number) {
        this.atributo = atributo;
        this.setContenido(contenido);
        this.fila = (fila!=undefined)?fila:0;
        this.columna = (columna!=undefined)?columna:0;
    }
    
    /**
     * Normaliza entrada de un atributo y setea el contenido del atributo
     * @param cont void
     */
    setContenido(cont: string){
    
        let cadena = cont.replace('\n','').replace('\t','').replace('\r','');
        if(cadena.replace('\n','') === ''){
            this.contenido = '';
        }else{
            this.contenido = cont.replace(/"/g,'');
        }
    }

    /**
     * Retorna el atributo  en una cadena: atributo = contenido
     * @returns string
     */
    toString():string{
        return this.atributo + '=' + this.contenido;
    }

}