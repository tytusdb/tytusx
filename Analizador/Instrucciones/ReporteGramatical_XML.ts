class ReporteGramatical_XML
{
    lista_xml:Array<string>;
    constructor()
    {
        this.lista_xml = new Array<string>();
    }

    setValor(valor:string):void
    {
        this.lista_xml.push(valor);
    }

    getReporte():string
    {
        let cadena:string = "";
        //this.lista_xml.forEach(err=>{
        //    cadena += err;
        //});
        //let arr = [];
        for(let i:number = this.lista_xml.length - 1; i >= 0; i--)
        {
            cadena += this.lista_xml[i];
        }
        return cadena;
    }
}