class Token {

    

    constructor(tipo, lexema, linea, columna) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.linea = linea;
        this.columna = columna;
    }

}
class TokenError {

    

    constructor(analizador,tipo, descripcion, linea, columna) {
        this.analizador=analizador;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }

}


