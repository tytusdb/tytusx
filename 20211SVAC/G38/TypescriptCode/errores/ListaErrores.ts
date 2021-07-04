class ListaErrores {
    private static _erroresXpath: ListaErrores = new ListaErrores();
    private static _erroresXML: ListaErrores = new ListaErrores();

    private lista: TokenError[];

    private constructor() {
        this.lista = [];
    }

    static hayErroresXml():boolean{
        if(this._erroresXML.lista == null || this._erroresXML.lista.length==0){
            return false;
        }
        return true;
    }

    static hayErroresXpath():boolean{
        if(this._erroresXpath.lista == null || this._erroresXpath.lista.length==0){
            return false;
        }
        return true;
    }

    public static InicializarXpath() {
        this._erroresXpath = new ListaErrores();
    }

    public static InicializarXML() {
        this._erroresXpath = new ListaErrores();
    }

    public static AgregarErrorXML(error: TokenError) {
        if (this._erroresXML == undefined || Object.keys(this._erroresXML).length === 0) {
            this.InicializarXML();
        }
        this._erroresXML.lista.push(error);
    }

    public static AgregarErrorXPATH(error: TokenError) {
        if (this._erroresXpath == undefined || Object.keys(this._erroresXpath).length === 0) {
            this.InicializarXpath();
        }
        this._erroresXpath.lista.push(error);
    }


    static ValidarEtiquetas(idApertura:string, idCierre:string, linea:number, columna:number){
        if(idApertura == undefined || idApertura == null
            ||    idCierre == undefined || idCierre == null){
            return;
        }
        if(idApertura != idCierre){
            ListaErrores.AgregarErrorXML(
                new TokenError(TipoError.Semantico,"Tag de cierre ''"+idCierre+"' no coresponde al tag de apertura ''"+idApertura+"'."
                    ,linea,columna));
        }
    }



    static getHtmlTableXml():string{
        return this.getCadHtmlFromReprote(ListaErrores._erroresXML,"Errores XML");
    }

    static getHtmlTableXPath():string{
        return this.getCadHtmlFromReprote(ListaErrores._erroresXpath,"Errores XPath");
    }


    static getCadHtmlFromReprote(listaErrores:ListaErrores,encabezado:string):string {
        let cad;
        var index = 1;
        cad='<cite style="font-size:x-large;">'+encabezado+'</cite><br/>'+
            '<table border="1">'
            +'<tr>'
            +'<th>LINEA</th><th>COLUMNA</th><th>TIPO</th><th>DESCRIPCION</th>'
            +'</tr>';
        for(let e of listaErrores.lista){
            let linea=e.linea;
            let columna=e.columna;
            let tipo=e.tipoError;
            let descripcion=e.mensaje;
            let row;
            row='<tr>';
            row+='<td>'+linea+'</td>'+'<td>'+columna+'</td>'+'<td>'+tipo+'</td>'+'<td>'+descripcion+'</td>';
            row+='</tr>'
            cad+=row;
        }
        return cad;
    }



}