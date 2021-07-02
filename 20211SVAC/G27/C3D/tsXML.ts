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

    public insertarObjeto(id:string, tipo:string, entorno:string, padre:any)
    {
        var i = this.getCantidadObjetos();
        var objeto = new tsObjeto(i,id,tipo,entorno,padre);

        this.listaObjetos.push(objeto);
    }

    public getCantidadObjetos(): number
    {
        return this.listaObjetos.length;
    }

    //funcion para insertar el temporal generado en el C3D al símbolo que se está construyendo
    public insertaTemporal(posicion:number, identificador:string, temporal:string)
    {
        var cantidadObjetos = this.getCantidadObjetos();
        if (cantidadObjetos > 0)
        {            
            //se recorre el listado de símbolos
            for (var i = 0; i < cantidadObjetos; i++)
            {         
                //si el símbolo.identificador es igual al parámetro identificador, se asigna el temporal
                if(this.listaObjetos[i].i == posicion)
                {             
                    this.listaObjetos[i].sp = temporal;
                    //INICIO MODIFICACION 28062021
                    if(this.listaObjetos[i].tipo=="Etiqueta"){                 
                        if(this.listaObjetos[i].padre){
                            this.listaObjetos[i].padre.agregarEtiquetaHija(temporal);
                        }
                    }
                    if(this.listaObjetos[i].tipo=="Atributo"){
                        this.listaObjetos[i].padre.agregarAtributo(temporal);
                    }
                    //FIN MODIFICACION 28062021
                    i = cantidadObjetos;
                }
            }
        } 
    }
}