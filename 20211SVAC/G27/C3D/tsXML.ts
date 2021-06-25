class tsXML{
    public listaObjetos: Array<tsObjeto>;
    constructor(){
        this.listaObjetos = new Array<tsObjeto>();
    }

    public getObjetoPorID(id:string): tsObjeto{
        var cantidadObjetos = this.listaObjetos.length;
        for (var i = 0; i < cantidadObjetos; i++)
        {
            var ident = this.listaObjetos[i].identificador;
            if (ident = id){
                return this.listaObjetos[i];
            }

        }
        return null;
    }

    public insertarObjeto(id:string, tipo:string, entorno:string, sp:number)
    {
        var objeto = new tsObjeto(id, tipo, entorno);
        this.listaObjetos.push(objeto);
    }

    public getCantidadObjetos(): number
    {
        return this.listaObjetos.length;
    }

    public generaEncabezadoXML3D(): string
    {   var texto: string = "";
        texto  += "/***********HEADER**********/";
        texto  += "#include <stdio.h>\n\n";
        texto  += "double heap[30101999]";
        texto  += "double stack[30101999]";
        texto  += "double S;\n";
        texto  += "double H; \n\n";
        texto  +=  "Ejemplo\n";

        texto += "/*--------MAIN---------*/\n";
        texto += "void main(){\n";
        texto += "S = 0; H = 0;\n\n";
        texto += ""+this.listaObjetos[0].identificador;
        texto += "\nreturn;\n";
        texto += "}";

        return texto;
    }
}