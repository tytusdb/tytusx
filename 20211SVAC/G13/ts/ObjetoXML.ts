//Clase para los objetos de XML
import { AtributoXML } from './AtributoXML';
//Clase para guardar los objetos/etiquetas XML; incluyento sus atributos,nombre,lista_etiquetas, etc...
export class ObjetoXML {
    
    /** Posicion en el stack en donde se encuentra la etiqueta */
    stack_position?:number;
    /** Numero unico para una etiqueta, propiedad opcional */
    id?:number;
    /** Nombre de una etiqueta en XML <name></name>*/
    etiqueta_id: string;
    /** Linea de donde se encontro la etiqueta xml */
    linea: number;
    /** Columna de donde se encontro la etiqueta xml */
    columna: number;
    /** Contenido de la etiqueta, el texto <>contenido(texto)</> */
    contenido: string = '';
    /** Referencia a padre de una etiqueta xml: <father><son /></father> */
    padre?: ObjetoXML;
    /** Nombre de la etiqueta padre si es que lo tiene */
    padre_name?:string;
    /** Numero distiguir que tipo de etiqueta es, con o sin etiqueta de cierre */    
    tipo: number;
    /** Arreglo con lista de atributos */
    lista_atributos: Array<AtributoXML>;
    /** Arreglo con lista de etiquetas */
    lista_objetos: Array<ObjetoXML>;
    
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
        this.etiqueta_id = etiqueta_id.replace(/\n/g,'').replace(/\r/g,'').replace(/\t/g,'').replace(/ /g,'');
        this.linea = (linea != undefined)? linea : 0;
        this.columna = (columna != undefined)? columna : 0;
        this.lista_atributos = (lista_atributos != undefined)? lista_atributos : [];
        this.lista_objetos = (lista_objetos!=undefined)? lista_objetos : [];

    }

    /**
     * Arma el codigo de tres direcciones de una etiqueta xml
     * @param cont cuenta los numeros de etiquetas que corresponden al generar una
     * instruccione en 3D_code, por defecto es 0 si no se pasa un argumento
     * @returns cadena con instrucciones para ingresar el en archivo con C_syntax
     */
    getCode3DXML(cont:number=0):string[]{
        console.log('GENERATION CODE....');
        let cad:string[] = ['/*XML INSTRUNCTIONS*/'];
        let t_stack,t_heap,t_act_heap:string = '';
        //guardo tamaño de las listas de etiquetas y la lista de atributos si es que contienen elementos
        let size_atribs = this.lista_atributos.length;
        let size_tags = this.lista_objetos.length;

        //le sumo 2; 1 para el nombre de la etiqueta y 1 mas para el contenido o texto de la etiqueta 
        //esto para 'reservar' espacio de los punteros hacia celdas del hip/stack      
        let size_total = size_atribs + size_tags + 2;

        /** Seccion de inicio para definicion de las etiquetas */        
        cad.push('/**Se inicia guardado de etiqueta xml raiz/padre**/');
        t_stack = `t${cont}`;
        cad.push(`${t_stack} = H;`); //t0 = H; guarda la posicion en el stack;
        cont ++;

        //t1=t0; t1 puntero actual del heap, es el numero de posicion/celda en el hip: hip[t1]
        t_heap = `t${cont}`;
        cad.push(`${t_heap} = ${t_stack};`);
        
        cad.push(`H = H + ${size_total};`); //reserva de espacio en el hip, son posiciones que se usaran
        cont ++;
        t_act_heap = `t${cont}`;
        cad.push(`${t_act_heap} = H;`); //t2 = H, -> posicion donde inicia cadena que esta apunto de ser ingresada en heap

        /** Primera seccion se guarda el nombre de etiqueta */
        cad = cad.concat(this.turnTextTo3D(this.etiqueta_id));

        cad.push(`heap[(int)${t_heap}] = ${t_act_heap};`);        
        cad.push(`${t_heap} = ${t_heap} + 1;`);
        cont++;
        t_act_heap = `t${cont}`;
        cad.push(`${t_act_heap} = H;`);

        /** Segunda seccion se guarda el texto/contenido de etiqueta */
        cad = cad.concat(this.turnTextTo3D(this.contenido));

        cad.push(`heap[(int)${t_heap}] = ${t_act_heap};`);
        cad.push(`${t_heap} = ${t_heap} + 1;`);

        /** Tercera seccion se guardan los atributos de etiqueta */
        cont++;
        t_act_heap = `t${cont}`;
        cad.push('H = H + 2;');

        /** Cuarta seccion se guardan las etiquetas hijas de la etiqueta */
        return cad;
    }

    /**
     * Forma una lista con todas las etiquetas hijas de una etiqueta incluyendo
     * las hijas de estas hijas de forma recursiva hasta tener todas las etiquetas
     * en una sola lista, una etiqueta xml despues de otra.
     * @returns arreglo [ObjetoXML]
     */
    getXmlToList():ObjetoXML[]{
        let lista:ObjetoXML[] = [];
        lista.push(this);
        let size = this.lista_objetos.length;
        for(let i = 0; i<size ;i++){
            lista = lista.concat(this.lista_objetos[i].getXmlToList());
        }
        return lista;
    }

    /**
     * Convierte una cadena de texto en codigo de tres direcciones para devolver
     * las instrucciones de 3 direcciones en un arreglo
     * @param texto string | texto a convertir en 3D_Code
     * @returns [string] | arreglo de cadenas
     */
    turnTextTo3D(texto:string):string[]{

        let code3d:string[] = ['\n/* Guardar cadena en heap:inicio */'];
        let size = texto.length;
        for(let i = 0 ; i<size ;i++){
            code3d.push(`heap[(int)H] = ${texto.charCodeAt(i)};`);
            code3d.push('H = H + 1;');
        }
        code3d.push('heap[(int)H] = -1;\t//fin de cadena');
        code3d.push('H = H + 1;');
        code3d.push('/* Guardar cadena en heap:fin */\n');
        return code3d;
    }

    /**
     * Asigna un numero como identificador al ObjetoXML de forma recursiva hasta que todas
     * las etiquetas xml hijas tienen su propio identificador unico
     * @param num number, numero 'ENTERO' desde donde empieza a enumerar a los objetos, 
     * si no se le pasa uno inicia por defecto desde el numero cero
     * @returns number, ultimo numero asignado a la ultima etiqueta
     */
    setIdToTags(num:number=0):number{
        this.id = num;
        let size = this.lista_objetos.length;
        for(let i = 0; i<size ;i++){
            num++;
            num = this.lista_objetos[i].setIdToTags(num);
        }
        return num;
    }

    /**
     * Retorna una cadena simple con nombre de etiqueta y su id, asi como el de sus hijos,
     * de forma recursiva hasta basicamente obtener un esqueleto simple de la estructura XML
     * @param ident cadena de identado
     * @returns cadena/string
     */
    getSimpleString(ident:string=''):string{
        let cad = '';
        cad += ident+'name: '+this.etiqueta_id+' id: '+this.id+'\n';
        for(let i = 0; i<this.lista_objetos.length ;i++){
            cad+= this.lista_objetos[i].getSimpleString(ident+'\t');
            //cad+='\n';
        }
        return cad;
    }

    /**
     * Asigna el padre de una etiqueta, que sera la referencia del padre de este nodo
     * @param padre objeto de ObjetoXML
     */
    setPadre(padre: ObjetoXML){
        this.padre = padre;
    }

    /**
     * Busca una un atributo dentro de la lista de atributos del obejto xml
     * usando como referencia para encontrarla el valor de ese atributo, no su nombre,
     * para posteriormente regresar el indice de ese atributo dentro de la lista de atributos
     * del objeto/etiqueta xml
     * @param valor string: valor o texto que contiene un atributo
     * @returns number: indice en donde se encuentra ese atributo en la lista
     * de atributos del objeto xml
     */
    findTagByVal(valor:string):number|undefined{
        let atributo;
        for(let i = 0; i<this.lista_atributos.length ;i++){
            atributo = this.lista_atributos[i];
            if(atributo.contenido==valor){
                return i;
            }
        }
        return undefined;
    }

    /**
     * Agrega un atributo a la lista de atributos de una etiqueta XML
     * @param atributo objeto tipo AtributoXML
     */
    addAtributo(atributo: AtributoXML){
        if(atributo!=undefined){
            this.lista_atributos.push(atributo);
        }
    }

    /**
     * Agrega un nuevo ObjetoXML a la lista de objetos de esta etiqueta
     * @param objeto obejto de tipo ObjetoXML
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
     * @param cont cadena/string
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
            cont = cont.toString().replace(/&alt;/g,'<').replace(/&amp/g,'&').replace(/&gt/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
            this.contenido = cont;
        }else{
            this.contenido = '';
        }
    }

    /**
     * retorna cadena con el formato de XML <tag {atributos} > {elementos/contenido} </tag>
     * pero de forma completa, no solo de la etiqueta actual sino la de todos sus hijos y
     * los hijos de los hijos, basicamente el XML completo con todos sus atributos,texto y
     * sus etiquetas hijas
     * @returns cadena/string de identado
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
     * Metodo que unicamente pasa el 'NOMBRE' a todos sus hijos, si es que los tiene
     * de forma recursiva hasta que todos los hijos y los hijos de esos hijos
     * tiene el nombre de su respectivo padre
     */
    pasarPadreName(){
        let size = this.lista_objetos.length;
        for(let i = 0; i < size ;i++){
            this.lista_objetos[i].padre_name = this.etiqueta_id;
            this.lista_objetos[i].pasarPadre();
        }
    }

    /**
     * Metodo que pasa una REFERENCIA de la etiqueta padre a sus respectivos hijos,
     * si es que tiene un padre, de forma recursiva hasta que todos los hijos 
     * tienen una referencia de su padre
     * respectivo
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

    getIdentificador():number{
        return (this.id!==undefined)?this.id:0;
    }

    /**
     * Devuelve el nombre del padre de una etiqueta, si es que posee uno
     * @returns string
     */
    getNameFather(): string{
        return (this.padre!=undefined)?this.padre.etiqueta_id:'';
    }

}