class TablaSimbolos
{
    //Clase tabla simbolos
    private anterior:TablaSimbolos;
    private tabla:[NodoTablaSimbolo];

    constructor(anterior:any){
        this.tabla = [];
        this.anterior = anterior;
    }

    agregar( simbolo:NodoTablaSimbolo){
        
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        this.tabla.push(simbolo);
        
    }


    
}