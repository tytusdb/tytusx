"use strict";
var TIPO_RUTA;
(function (TIPO_RUTA) {
    TIPO_RUTA[TIPO_RUTA["DIAGONALSIMPLE"] = 0] = "DIAGONALSIMPLE";
    TIPO_RUTA[TIPO_RUTA["DIAGOBALDOBLE"] = 1] = "DIAGOBALDOBLE";
    TIPO_RUTA[TIPO_RUTA["DIAGONALVACIA"] = 2] = "DIAGONALVACIA";
})(TIPO_RUTA || (TIPO_RUTA = {}));
var TIPO_DATO;
(function (TIPO_DATO) {
    TIPO_DATO[TIPO_DATO["IDENTIFICADOR"] = 0] = "IDENTIFICADOR";
    TIPO_DATO[TIPO_DATO["ASTERISCO"] = 1] = "ASTERISCO";
    TIPO_DATO[TIPO_DATO["ARROBA"] = 2] = "ARROBA";
    TIPO_DATO[TIPO_DATO["PUNTO"] = 3] = "PUNTO";
    TIPO_DATO[TIPO_DATO["DOBLEPUNTO"] = 4] = "DOBLEPUNTO";
    TIPO_DATO[TIPO_DATO["SIGUIENTE"] = 5] = "SIGUIENTE";
    TIPO_DATO[TIPO_DATO["TEXTO"] = 6] = "TEXTO";
    TIPO_DATO[TIPO_DATO["NODO"] = 7] = "NODO";
    TIPO_DATO[TIPO_DATO["POSICION"] = 8] = "POSICION";
    TIPO_DATO[TIPO_DATO["RESERVADAS"] = 9] = "RESERVADAS";
})(TIPO_DATO || (TIPO_DATO = {}));
function nodoRuta(dato, mostrar, ruta2, tipoRuta, fila, columna) {
    return {
        dato: dato,
        tipoRuta: tipoRuta,
        mostrar: mostrar,
        ruta2: ruta2,
        fila: fila,
        columna: columna
    };
}
//nodo simple
function nodoDator(valor, tipo, fila, columna) {
    return {
        valor: valor,
        tipo: tipo,
        fila: fila,
        columna: columna
    };
}
//nodo para dato reservadas
function nodoDatorersva(reservadas, dato, tipo, fila, columna) {
    return {
        reservadas: reservadas,
        dato: dato,
        tipo: tipo,
        fila: fila,
        columna: columna
    };
}
function nodoMostrar(exp, mostrar, fila, columna) {
    return {
        exp: exp,
        mostrar: mostrar
    };
}
