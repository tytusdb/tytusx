"use strict";
class FilaOptimizacion {
    constructor(numeroRegla, codigoEliminado, codigoAgregado, linea, columna) {
        this._numeroRegla = numeroRegla;
        this._codigoEliminado = codigoEliminado;
        this._codigoAgregado = codigoAgregado;
        this._linea = linea;
        this._columna = columna;
    }
    toString() {
        return "<tr>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=rigth><p>" + this._numeroRegla + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p>" + this._codigoEliminado + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p>" + this._codigoAgregado + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p>" + this._linea + "</p></td>\n" +
            "<td style=\"font-size: 15px;  ;\"  align=left><p>" + this._columna + "</p></td>\n" +
            "</tr>";
    }
    createCabeceras() {
        return '<tr>'
            + '<th>Regla</th><th>Código Eliminado</th><th>Código Agregado</th><th>Linea</th><th>Columna</th>'
            + '</tr>';
    }
    set codigoAgregado(value) {
        this._codigoAgregado = value;
    }
}
