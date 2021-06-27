"use strict";
class InterfazGrafica {
}
InterfazGrafica.CONSOLE_LINE_MARK = '>';
InterfazGrafica.CONSOLE_MESSAGE_SUCCESSFULL = "OK XML";
InterfazGrafica.CONSOLE_MESSAGE_SUCCESSFULL_XPATH = "OK XPATH";
InterfazGrafica.CONSOLE_MESSAGE_SUCCESSFULL_XQUERY = "OK XQUERY";
InterfazGrafica.ENTER = "\n";
InterfazGrafica.txtConsola = null;
InterfazGrafica.print = function (strTexto) {
    let strCad = InterfazGrafica.txtConsola.val();
    InterfazGrafica.txtConsola.val(strCad + strTexto + InterfazGrafica.ENTER + InterfazGrafica.CONSOLE_LINE_MARK);
};
