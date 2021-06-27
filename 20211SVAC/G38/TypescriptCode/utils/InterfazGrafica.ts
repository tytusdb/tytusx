class InterfazGrafica {
    private static readonly CONSOLE_LINE_MARK : string = '>';
    private static readonly CONSOLE_MESSAGE_SUCCESSFULL="OK XML";
    private static readonly CONSOLE_MESSAGE_SUCCESSFULL_XPATH="OK XPATH";
    private static readonly CONSOLE_MESSAGE_SUCCESSFULL_XQUERY="OK XQUERY";
    private static readonly ENTER = "\n";
    private static txtConsola : any = null;

    static print = function (strTexto: string) {
        let strCad = InterfazGrafica.txtConsola.val();
        InterfazGrafica.txtConsola.val(strCad + strTexto + InterfazGrafica.ENTER + InterfazGrafica.CONSOLE_LINE_MARK);
    };
}