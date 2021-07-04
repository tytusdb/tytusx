class If extends Instruccion implements BloqueFuncion{
    expresionBoleana:Expresion;
    instruccionIf:ValorVariable;
    _else:Else;
    constructor(expresionBoleana:Expresion,instruccionIf:ValorVariable,_else:Else){
        super(InstruccionTipos.IF);
        this.expresionBoleana = expresionBoleana;
        this.instruccionIf = instruccionIf;
        this._else = _else;
    }
    traspilar(): string {
        throw new Error("Method not implemented.");
    }
    generarC3D(): string {
        throw new Error("Method not implemented.");
    }
    static validarIf(expresionBoleana:Expresion,instruccionIf:Expresion,_else:Else,tipoDatoRetorno:TiposDatos):Instruccion{
        let retorno = new If(null,null,null);
        if(expresionBoleana.tipoDato == TiposDatos.BOOLEAN){
            if(tipoDatoRetorno == null){
                retorno = new If(expresionBoleana,instruccionIf,_else);
            }else{
                if(tipoDatoRetorno == TiposDatos.DECIMAL){
                    if(instruccionIf.tipoDato == TiposDatos.ENTERO || instruccionIf.tipoDato == TiposDatos.DECIMAL){
                        if(!(_else instanceof Expresion)){
                            retorno = new If(expresionBoleana,instruccionIf,_else);
                        }else{
                            if(_else instanceof Expresion){
                                if (_else.tipoDato == TiposDatos.DECIMAL || _else.tipoDato == TiposDatos.ENTERO){
                                    retorno = new If(expresionBoleana,instruccionIf,_else);
                                }else{
                                    console.log("error en tipo decimal en else1");
                                    return retorno;
                                }
                            }
                        }
                    }else{
                        console.log("error en tipo decimal en if");
                        return retorno;
                    }
                }else{
                    if(instruccionIf.tipoDato == tipoDatoRetorno && (_else == null || !(_else instanceof Expresion) || (_else instanceof Expresion)&&_else.tipoDato == tipoDatoRetorno)){
                        retorno = new If(expresionBoleana,instruccionIf,_else);
                    }else{
                        console.log("Error de tipo de retorno en tipos")
                        return retorno;
                    }
                }
            }
        }else{
            console.log("Error de valor en if no es booleano");
            return retorno;
        }
        return retorno;
    }
}