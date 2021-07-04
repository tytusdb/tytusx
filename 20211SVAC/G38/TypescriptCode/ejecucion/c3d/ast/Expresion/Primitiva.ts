enum TipoValor{
    temporal,
    identifier,
    double,
    integer,
    arreglo
}
class Primitiva extends Codigo3d{
    private _tipoPrimitiva : TipoValor;
    private _valor: any;
    private _negativo: boolean;

    private _valorCasteo : TipoValor;
    private _valorAcceso : Primitiva;

    constructor(tipoPrimitiva: TipoValor, valor: any,linea:number,columna:number) {
        super(linea,columna);
        this._tipoPrimitiva = tipoPrimitiva;
        this._valor = valor;
        this._negativo = false;
        this._valorCasteo = null;
        this._valorAcceso = null;
    }


    get negativo(): boolean {
        return this._negativo;
    }

    set negativo(value: boolean) {
        this._negativo = value;
    }


    get tipoPrimitiva(): TipoValor {
        return this._tipoPrimitiva;
    }

    get valor(): any {
        return this._valor;
    }


    get valorCasteo(): TipoValor {
        return this._valorCasteo;
    }

    set valorCasteo(value: TipoValor) {
        this._valorCasteo = value;
    }

    get valorAcceso(): Primitiva {
        return this._valorAcceso;
    }

    set valorAcceso(value: Primitiva) {
        this._valorAcceso = value;
    }

    public toString():string{
        let cadenaSalida = "";
        if(this._tipoPrimitiva == TipoValor.arreglo){
            if(this._valorCasteo != null){
                cadenaSalida = this._valor+'[('+this._valorCasteo.toString()+')'+this._valorAcceso.toString()+']';
            }else if(this._valorAcceso != null){
                cadenaSalida = this._valor+'['+this._valorAcceso.toString()+']'
            }
        }else{
            cadenaSalida = this._valor;
        }
        if(this.negativo)
            cadenaSalida  = "-"+cadenaSalida;
        return cadenaSalida;
    }
}