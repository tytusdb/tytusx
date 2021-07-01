
export class NodoXQuery
{
    constructor(tipo,valor)
    {
        this.tipo=tipo
        this.valor=valor
    }

    getValor()
    {

    }
}

export const Tipo = {
    "INTEGER" : 0,
    "DECIMAL" : 1,
    "STRING"  : 2,
    "NODO"    : 3,
    "BOOLEAN" : 4,
    "ATRIB"   : 5,
    "ERROR"   : 6,
    "SIBLING" : 7, 
    "FLWOR": 8, 
    "PRIMITIVO": 9, 
    "CONSULTA" : 10
} 


export const TipoPath = {
    "ABS": 0, 
    "RELATIVO": 1
}


export class PathExpresion{
    linea = 0; 
    columna = 0; 
    caminos = null; 

    constructor(linea, columna, caminos){
        this.linea = linea; 
        this.columna = columna; 
        this.caminos = caminos;
    }

    getValor(tabla, xml){
        var retorno = xml 
        for(let camino of this.caminos){
            console.log(camino)
            retorno = camino.getValor(retorno); 
        }
    }
}

export class Camino {
    nombre = "";  
    predicado = null; 
    tipo = null; 
    linea = 0; 
    columna = 0; 


    constructor(nombre, predicado, tipo, linea, columna){
        this.nombre = nombre; 
        this.predicado = predicado; 
        this.tipo = tipo; 
        this.linea = linea; 
        this.columna = columna; 

    }

    getValor(tabla, xml){
        var retorno = []; 
        var posicion 

    }
}