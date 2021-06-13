"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function llenarTablaErrores(errores) {
    console.log('llenando Errores');
    if (errores != undefined) {
        var cuerpo = '';
        var encabezado = ' <table class=table table-bordered> ' +
            '<thead class=thead-dark>' +
            ' <tr><th scope = col >TIPO</th>' +
            '<th scope = col > LEXEMA </ th >' +
            '<th scope = col> LINEA </ th > ' +
            '<th scope = col> COLUMNA </ th > ' +
            '</tr > </thead > <tbody>';
        cuerpo = encabezado;
        for (var i = 0; i < errores.length; i++) {
            cuerpo = cuerpo +
                '<tr> ' +
                '<td> ' + errores[i].getTipo() + '</td > \n' +
                '<td > ' + errores[i].getLexema() + ' </td >\n' +
                '<td > ' + errores[i].getLinea() + ' </td >\n' +
                '<td > ' + errores[i].getColumna() + ' </td >\n' +
                '</ tr > ';
        }
        cuerpo = cuerpo + '</tbody>\n</table>\n ';
        var divTabla1 = document.getElementById('divTablaErrores');
        if (divTabla1 != null)
            divTabla1.innerHTML = cuerpo;
    }
}
