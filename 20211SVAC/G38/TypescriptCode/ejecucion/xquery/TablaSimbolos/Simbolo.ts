class Simbolo{
    private _identificador:string;
    private _tipo:Tipo;
    private _valorPrimitvo:any;
    private _valorXpath:TablaSimbolos;
    //Generacion C3D
    private _offset:number;


    constructor(identificador: string, tipo: Tipo, valorPrimitvo: any, valorXpath: TablaSimbolos) {
        this._identificador = identificador;
        this._tipo = tipo;
        this._valorPrimitvo = valorPrimitvo;
        this._valorXpath = valorXpath;
    }


    get identificador(): string {
        return this._identificador;
    }

    set identificador(value: string) {
        this._identificador = value;
    }

    get tipo(): Tipo {
        return this._tipo;
    }

    set tipo(value: Tipo) {
        this._tipo = value;
    }

    get valorPrimitvo(): any {
        return this._valorPrimitvo;
    }

    set valorPrimitvo(value: any) {
        this._valorPrimitvo = value;
    }

    get valorXpath(): TablaSimbolos {
        return this._valorXpath;
    }

    set valorXpath(value: TablaSimbolos) {
        this._valorXpath = value;
    }

    public equals(simbolo: Simbolo): boolean{
        if(this.identificador != null && simbolo.identificador != null &&
           this.identificador == simbolo.identificador &&
           this.tipo != null && simbolo.tipo != null &&
           this.tipo.equals(simbolo.tipo) ){
            return true;
        }
        return false;
    }


    get offset(): number {
        return this._offset;
    }

    set offset(value: number) {
        this._offset = value;
    }
}