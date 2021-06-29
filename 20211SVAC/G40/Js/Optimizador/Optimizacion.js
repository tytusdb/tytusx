class Optimizacion{
    constructor(fila, columna, tipo, antes, despues, regla, iteracion){
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.antes = antes;
        this.despues = despues;
        this.regla = regla;
        this.iteracion = iteracion;
    }
    getFila(){
        return this.fila;
    }

    getColumna(){
        return this.columna;
    }

    getTipo(){
        return this.tipo;
    }

    getAntes(){
        return this.antes;
    }

    getDespues(){
        return this.despues;
    }
    
    getRegla(){
        return this.regla;
    }

    getIteracion(){
        return this.iteracion;
    }
}