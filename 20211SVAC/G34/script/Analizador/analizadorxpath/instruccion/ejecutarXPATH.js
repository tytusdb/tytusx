"use strict";
//aca recibe la raiz
function ejecutarXPATH(tds, listaDir) {
    if (listaDir.dato.tipo == TIPO_DATO.IDENTIFICADOR) {
        var temporal = BusquedaXML(tds, listaDir.dato.valor);
        var t = void 0;
        if (listaDir.ruta2 != undefined) {
            t = ejecutarXPATHr(temporal, listaDir.ruta2);
        }
        console.log('ESTO ES LO QUE IMPRIME');
        console.log(t);
    }
}
function ejecutarXPATHr(tds, listaDir) {
    var entornos = [];
    var p;
    for (var _i = 0, tds_1 = tds; _i < tds_1.length; _i++) {
        var aux = tds_1[_i];
        var temporal = BusquedaXML(aux, listaDir.dato.valor);
        entornos = entornos.concat(temporal);
    }
    if (listaDir.ruta2.ruta2 != undefined) {
        p = ejecutarXPATHr(entornos, listaDir.ruta2);
    }
    else {
        p = BusquedaXMLfinal(entornos, listaDir.ruta2.dato.valor);
    }
    return p;
}
