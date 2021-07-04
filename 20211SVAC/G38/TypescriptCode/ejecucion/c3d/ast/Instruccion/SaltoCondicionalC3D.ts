class SaltoCondicionalC3D extends Codigo3d{
    private _condicion : ExpresionRelacional;
    private _etiquetaSalto : string;

    constructor(condicion: ExpresionRelacional, etiquetaSalto: string,linea: number, columna: number, ) {
        super(linea, columna);
        this._condicion = condicion;
        this._etiquetaSalto = etiquetaSalto;
    }

    set etiquetaSalto(value: string) {
        this._etiquetaSalto = value;
    }

    get etiquetaSalto(): string {
        return this._etiquetaSalto;
    }


    get condicion(): ExpresionRelacional {
        return this._condicion;
    }

    set condicion(value: ExpresionRelacional) {
        this._condicion = value;
    }

    regla3(etiquetaSaltoIns: Codigo3d):boolean{
        if(etiquetaSaltoIns instanceof  SaltoC3D) {
            if((this._condicion.primitivaIzquierda.tipoPrimitiva == TipoValor.integer ||
                this._condicion.primitivaIzquierda.tipoPrimitiva == TipoValor.double ) &&
                (this._condicion.primitivaDerecha.tipoPrimitiva == TipoValor.integer ||
                    this._condicion.primitivaDerecha.tipoPrimitiva == TipoValor.double )
            ){
                let valorCondicion : boolean;
                switch (this._condicion.tipoRelacional){
                    case TipoRelacional.gt:
                        valorCondicion = this._condicion.primitivaIzquierda.valor > this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.gte:
                        valorCondicion = this._condicion.primitivaIzquierda.valor >= this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.lt:
                        valorCondicion = this._condicion.primitivaIzquierda.valor < this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.lte:
                        valorCondicion = this._condicion.primitivaIzquierda.valor <= this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.equal_equal:
                        valorCondicion = this._condicion.primitivaIzquierda.valor == this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.nequal:
                        valorCondicion = this._condicion.primitivaIzquierda.valor != this._condicion.primitivaDerecha.valor;
                        break;
                }

                if(valorCondicion){
                    var opt = new FilaOptimizacion("3",this.toString() +etiquetaSaltoIns.toString(),"",this.linea,this.columna);
                    this.eliminado = true;
                    etiquetaSaltoIns.etiquetaSalto = this._etiquetaSalto;
                    opt.codigoAgregado = etiquetaSaltoIns.toString();
                    ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                    return true;
                }
            }
        }

        return false;
    }

    regla4(etiquetaSaltoIns: Codigo3d):boolean{
        if(etiquetaSaltoIns instanceof  SaltoC3D) {
            if((this._condicion.primitivaIzquierda.tipoPrimitiva == TipoValor.integer ||
                this._condicion.primitivaIzquierda.tipoPrimitiva == TipoValor.double ) &&
                (this._condicion.primitivaDerecha.tipoPrimitiva == TipoValor.integer ||
                    this._condicion.primitivaDerecha.tipoPrimitiva == TipoValor.double )
            ){
                let valorCondicion : boolean;
                switch (this._condicion.tipoRelacional){
                    case TipoRelacional.gt:
                        valorCondicion = this._condicion.primitivaIzquierda.valor > this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.gte:
                        valorCondicion = this._condicion.primitivaIzquierda.valor >= this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.lt:
                        valorCondicion = this._condicion.primitivaIzquierda.valor < this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.lte:
                        valorCondicion = this._condicion.primitivaIzquierda.valor <= this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.equal_equal:
                        valorCondicion = this._condicion.primitivaIzquierda.valor == this._condicion.primitivaDerecha.valor;
                        break;
                    case TipoRelacional.nequal:
                        valorCondicion = this._condicion.primitivaIzquierda.valor != this._condicion.primitivaDerecha.valor;
                        break;
                }

                if(!valorCondicion){
                    var opt = new FilaOptimizacion("4",this.toString() +etiquetaSaltoIns.toString(),etiquetaSaltoIns.toString(),this.linea,this.columna);
                    this.eliminado = true;
                    ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                    return true;
                }
            }
        }
        return false;
    }


    public toString(): string {
        let salida = "";
        if(this._condicion != null)
            salida = "if( "+this._condicion.toString()+" ) goto "+this._etiquetaSalto +";\n"
        else
            salida =  "goto "+this._etiquetaSalto +";\n"
        return salida;
    }
}