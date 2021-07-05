class Error{
    constructor(No, Fila, Columna, Tipo, Descripcion, Gramatica){
        this.No = No;
        this.Fila = Fila;
        this.Columna = Columna;
        this.Tipo = Tipo;
        this.Descripcion = Descripcion;
        this.Gramatica = Gramatica;
    }
    getNo(){
       return this.No;
    }

    getFila(){
        return this.Fila;
     }

     getColumna(){
        return this.Columna;
     }

     getTipo(){
        return this.Tipo;
     }

     getDescripcion(){
        return this.Descripcion;
     }

     getGramatica(){
        return this.Gramatica;
     }
}
