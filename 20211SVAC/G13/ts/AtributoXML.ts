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
        this.atributo = atributo.replace(/\r/g,'').replace(/\t/g,'').replace(/\n/g,'');
        this.setContenido(contenido);
        this.fila = (fila!=undefined)?fila:0;
        this.columna = (columna!=undefined)?columna:0;
    }
    
    /**
     * Normaliza entrada de un atributo y setea el contenido del atributo
     * @param cont void
     */
    setContenido(cont: string){
    
        let cadena = cont.replace(/\n/g,'').replace(/\t/g,'').replace(/\r/g,'');
        if(cadena === ''){
            this.contenido = '';
        }else{
            this.contenido = cont.replace(/"/g,'');
        }
    }

    /**
     * Este metodo calcula la longitad de la cadena del atributo de la siguiente
     * forma: atrib_name.lenght + 1 + 1 + contenido.lenght + 1 en donde cada numero uno
     * representa un '=', y dos '"" pues un atributo estaria escirto de la suguiente
     * forma: name="Carlos"
     * @returns number: longitud de cadena
     */
    getLongitud():number{
        return this.contenido.length + this.atributo.length + 3;        
    }

    /**
     * Retorna el nombre y el contenido del atributo en una cadena: atributo_name = "contenido"
     * @returns string
     */
    toString():string{
        return this.atributo + '="' + this.contenido + '"';
    }

}