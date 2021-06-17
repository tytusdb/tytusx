class Errores {
    constructor() {
        this.errores1 = new Array();
    }
    agregarError(tipo, descripcion, linea, columna) {
        this.errores1.push(new Erro(tipo, descripcion, linea, columna));
    }
    agregarError1(errorEntrada) {
        this.errores1.push(errorEntrada);
    }
    agregarEncabezado(tipo) {
        this.errores1.unshift(new Erro("Listado de errores del lenguaje: " + tipo, "----------------------------------------", 0, 0));
    }
    agregarEncabezadoFinal(tipo) {
        this.errores1.push(new Erro("Listado de errores del lenguaje: " + tipo, "----------------------------------------", 0, 0));
    }
    getErrores() {
        return this.errores1;
    }
    getError(index) {
        return this.errores1[index];
    }
    get getSize() {
        return this.errores1.length;
    }
}
function agregarErrorLexico(tipo, contenido, linea, columna) {
    if (errores.getSize > 0) {
        let posErrorAnterior = errores.getSize - 1;
        let errorAnterior = errores.getError(posErrorAnterior);
        if (errorAnterior.getTipo.toUpperCase() == "LEXICO") {
            if (errorAnterior.getLinea == linea && (columna - errorAnterior.getColumna == 1)) {
                let texto = errorAnterior.getLexema + contenido;
                let descripcionSalida = "Palabra no valida: " + texto;
                errorAnterior.setDescripcion(descripcionSalida);
                errorAnterior.setLexema(texto);
                errorAnterior.setColumna(columna);
            }
        }
        else {
            let error = new Erro("Lexico", "Caracter invalido: " + contenido, linea, columna);
            error.setLexema(contenido);
            errores.agregarError1(error);
        }
    }
    else {
        let error = new Erro("Lexico", "Caracter invalido: " + contenido, linea, columna);
        error.setLexema(contenido);
        errores.agregarError1(error);
    }
}
