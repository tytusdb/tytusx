//Clase para los objetos de XML
import { AtributoXML } from './AtributoXML';

export class ObjetoXML {
    
    etiqueta_id: string;                               //nombre de una etiqueta en XML
    linea: number;                                     //linea de etiqueta xml
    columna: number;                                   //columna de etiqueta xml
    contenido: string = '';                            //contenido de la etiqueta, el texto
    padre?: ObjetoXML;                                 //referencia a padre de una etiqueta xml: <father><son /></father>
    tipo: number;                                      //para distiguir que tipo de etiqueta es, con o sin etiqueta de cierre
    lista_atributos: Array<AtributoXML>;               //arreglo con lista de atributos
    lista_objetos: Array<ObjetoXML>;                   //arreglo con lista de etiquetas
    
    /**
     * Constructor para un objeto/etiqueta XML
     * @param tipo tipo de objeto/etiqueta xml, 1:<tag /> | 0:<tag></tag>
     * @param etiqueta_id nombre que identifica la etiqueta de objeto xml
     * @param contenido contenido dentro de una etiqueta xml, string
     * @param lista_atributos lista con atributos de un objeto/etiqueta xml
     * @param lista_objetos lista de objetos que un objeto/etiqueta xml puede contener
     * @param linea linea donde fue encontrada la etiqueta
     * @param columna columna donde fue encontrada la etiqueta
     */
    constructor(
            tipo: number,
            etiqueta_id: string,
            contenido: string,
            lista_atributos?: Array < AtributoXML >,
            lista_objetos?:Array<ObjetoXML>,
            linea?: number,
            columna?: number
        ){
        this.tipo = tipo;
        this.setContenido(contenido);
        this.etiqueta_id = etiqueta_id;
        this.linea = (linea != undefined)? linea : 0;
        this.columna = (columna != undefined)? columna : 0;
        this.lista_atributos = (lista_atributos != undefined)? lista_atributos : [];
        this.lista_objetos = (lista_objetos!=undefined)? lista_objetos : [];

    }

    /**
     * Asigna el padre de una etiqueta
     * @param padre void
     */
    setPadre(padre: ObjetoXML){
        this.padre = padre;
    }

    /**
     * Agrega un atributo a la lista de atributos de una etiqueta XML
     * @param atributo void
     */
    addAtributo(atributo: AtributoXML){
        if(atributo!=undefined){
            this.lista_atributos.push(atributo);
        }
    }

    /**
     * Agrega un nuevo objeto a la lista de objetos de una etiqueta
     * @param objeto void
     */
    addObjeto(objeto: ObjetoXML){
        if(objeto!=undefined){
            this.lista_objetos.push(objeto);
        }
    }

    /**
     * Verifica si la lista de atributos esta vacia
     * @returns boolean
     */
    atributosIsEmpty(): boolean{

        if (this.lista_atributos === null) {
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * Verifica que la cadena de entrada no este vacia y arregla la cadena si hay caracteres especiales
     * @param cont void
     */
    setContenido(cont: string){
        //comprueba que la cadena no solo tenga espacios_en_blanco/tabs/saltos
        let cadena:string = cont.toString().replace(/\n/g,'').replace(/\t/g,'').replace(/\r/g,'').replace(/ /g,'');
        if(cadena != ''){
            /**
             * reemplaza los caracteres especiales
             * &alt = <
             * &amp = &
             * &gt  = >
             * &quot = "
             * &apos = '
             */
            cont = cont.toString().replace(/&alt;/g,'<').replace(/&amp/g,'&').replace(/&gt/g,'>').replace(/&quot;/g,'"'.replace(/&apos;/g,"'"));
            this.contenido = cont;
        }else{
            this.contenido = '';
        }
    }

    /**
     * retorna cadena con el formato de XML <tag {atributos} > {elementos/contenido} </tag>
     * @returns string
     */
    toString(iden:string = ''): string{
        
        let cadena = '';
        let elementos = '';
        let atributos = '';
        if(this.lista_atributos.length > 0){
            atributos += ' ';
            this.lista_atributos.forEach(element =>{atributos += element.toString() + ' ';})
            atributos += '';
        }
        this.lista_objetos.forEach(element => {elementos += iden + element.toString(iden+'\t') + '\n';});
        if(this.tipo === 0){
            cadena += `${iden}<${this.etiqueta_id}${atributos}>${this.contenido}${(elementos!='')?'\n'+elementos:''}${(elementos!='')?iden:''}</${this.etiqueta_id}>`;
        }else{
            cadena += `${iden}<${this.etiqueta_id}${atributos}/>`;
        }
        return cadena;
    }

    /**
     * Metodo que pasa una refencia del la etiqueta padre a sus respectivos hijos
     */
    pasarPadre(){
        let size = this.lista_objetos.length;
        for(let i = 0; i < size ;i++){
            this.lista_objetos[i].setPadre(this);
            this.lista_objetos[i].pasarPadre(); 
        }
    }

    /**
     * Obtiene una copia del objeto, pero este esta arreglado para no eliminar el parametro
     * 'padre' al objeto
     * @returns ObjetoXML
     */
    getFixedCopy():ObjetoXML{
        let nuevo = Object.assign({},this) as ObjetoXML;
        delete nuevo.padre;
        let size = nuevo.lista_objetos.length;
        for(let i = 0; i<size ;i++){
            nuevo.lista_objetos[i].getFixedCopy;
        }
        return nuevo;
    }

    /**
     * Devuelve el nombre del padre de una etiqueta, si es que posee uno
     * @returns string
     */
    getNameFather(): string{
        return (this.padre!=undefined)?this.padre.etiqueta_id:'';
    }

}