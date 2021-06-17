class TsRowAttribute extends TsRow{

    private _valueAttribute:string;


    constructor(tsRow:TsRow) {
        super(tsRow.identificador, tsRow.indice, tsRow.nombreElemento, tsRow.nodo, tsRow.tipo, tsRow.entorno, tsRow.entorno_row);
        this._valueAttribute = (this.nodo==undefined || this.nodo==null)?"":this.nodo.getValueString();
    }

    public toStr(tab:string):string{
        return tab+"\t"+this._valueAttribute+"\n";
    }


    get valueAttribute(): string {
        return this._valueAttribute;
    }

    set valueAttribute(value: string) {
        this._valueAttribute = value;
    }
}