class ReporteGramatical_XPATH
{
    lista_xpath:Array<string>;
    constructor()
    {
        this.lista_xpath = new Array<string>();
    }

    setValor(valor:string):void
    {
        this.lista_xpath.push(valor);
    }

    getReporte():string
    {
        let cadena:string = "";
        //this.lista_xpath.forEach(err=>{
        //    cadena += err;
        //});
        //let arr = [];
        for(let i:number = this.lista_xpath.length - 1; i >= 0; i--)
        {
            cadena += this.lista_xpath[i];
        }
        return cadena;
    }
}