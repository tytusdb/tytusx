class EntornoXML{
    id:string;
    texto:string;
    tablaSimbolos:Array<any>;
    tablaEntornos: Array<any>;
    linea: number;
    columna: number;
   // entorno: EntornoXML;
    EtiquetaCierre:string;

    constructor(id:string, texto:string, linea:number, columna:number, tablaSimbolos:Array<any>, tablaEntornos:Array<any>,EtiquetaCierre:string){
        this.id = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.tablaSimbolos = tablaSimbolos;
        this.tablaEntornos = tablaEntornos
       // this.entorno = new EntornoXML(null);
        this.EtiquetaCierre=EtiquetaCierre;
    }
    getId() {
        return this.id;
    }
    getTexto() {
        return this.texto;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    getTablaEntornos() {
        return this.tablaEntornos;
    }
    getTablaSimbolos() {
        return this.tablaSimbolos;
    }
    getEtiquetaCierre(){
        return this.EtiquetaCierre;
    }

   /* agregar(id:string, simbolo:any){

        this.tabla[id] = simbolo;
    }

    eliminar(id:string):boolean{
        //id = id.toLowerCase();
        for (let e:EntornoXML = this; e != null; e = e.anterior)
        {   
            const value = e.tabla[id]
            if (value!==undefined)
            {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }

    existe(id:string):boolean{
        id = id.toLowerCase();
        for (let e:EntornoXML = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                return true;
            }
        }
        return false;
    }

    existeEnActual(id:string):boolean{
        id = id.toLowerCase();
        if (this.tabla[id]!==undefined)
        {
            return true;
        }
        return false;
    }

    getSimbolo(id:string):any{
        id = id.toLowerCase();
        for (let e:EntornoXML = this; e != null; e = e.anterior)
        {
            if (e.tabla[id]!==undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    reemplazar(id:string, nuevoValor:any){
        id = id.toLowerCase();
        for (let e:EntornoXML = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                e.tabla[id] = nuevoValor;
            }
        }
    }
*/
}