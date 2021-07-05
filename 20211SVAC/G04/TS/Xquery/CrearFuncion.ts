class CrearFuncion extends Instruccion{
    id:string;
    listadoParametros:Array<Parametro>;
    tipoRetorno:TiposDatos;
    bloqueFuncion:Array<BloqueFuncion>;

    constructor(id:string,listadoParametros:Array<Parametro>,tipoRetorno:TiposDatos){
        super(InstruccionTipos.CREACION_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
        this.tipoRetorno = tipoRetorno;
    }

    setBloquecodigo(bloqueCodigo:Array<BloqueFuncion>){
        this.bloqueFuncion = bloqueCodigo;
    }

    getTipoRetornoTexto():string{
        let tipos = ["ENTERO","STRING","DECIMAL","BOOLEAN"];
        let retorno = "Any";
        if(this.tipoRetorno != null){
            retorno = tipos[this.tipoRetorno];
        }
        return retorno;
    }

    traspilar(): string {
        let retorno:Array<string> = new Array<string>();
        retorno.push(`function ${this.id}(${this.parametros()}){`);
        this.bloqueFuncion.forEach((e,i)=>{
            if((i+1) == this.bloqueFuncion.length){
                if(e instanceof Expresion){
                    retorno.push(e.traspilarUltimo());
                }else if (e instanceof Instruccion){
                    retorno.push(e.traspilar());
                }
            }else{
                if(e instanceof Instruccion){
                    retorno.push(e.traspilar());
                }
            }
            
        });
        retorno.push(`}`)
        return retorno.join("\n");
    }
    private parametros():string{
        let retorno:Array<string> = new Array<string>();
        this.listadoParametros.forEach(e => {
            retorno.push(e.id);
        });
        if(retorno.length>0){
            return retorno.join(",");
        }else{
            return "";
        }
        
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }

}