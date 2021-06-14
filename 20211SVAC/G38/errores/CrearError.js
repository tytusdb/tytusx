"use strict";
class CrearError {
    static tiposInvalidos(operador, izquierda, derecha, linea, columna) {
        let mensaje = "Operación de " + operador + " invalida para los tipos " + izquierda + " y el tipo " + derecha;
        return new TokenError(TipoError.Semantico, mensaje, linea, columna);
    }
}
