class XmlAttribute extends XmlObjectAncestor
{
    private _value:string;
    private _type:Tipo;

    constructor(nombre: string, valor: string, parent:XmlObjectInt,line:number,column:number) {
        super("", nombre, parent, line, column);
        this._value = valor.substr(1,valor.length-2);
        this._value = XpathUtil.procesarCaracteresEspeciales(this._value) ;
        this._type = (this.isNumber(this._value))?new Tipo(TipoDato.numero):
            (this.isBoolean(this._value))?new Tipo(TipoDato.booleano):
                new Tipo(TipoDato.cadena);
    }

    isNumber(value:string):boolean {
        var number = parseInt(value);
        return !isNaN(number);

    }

    isBoolean(value:string):boolean{
        if(value == undefined || value == null){
            return false;
        }
        var boolean = value.toUpperCase().trim();
        return boolean == 'TRUE' || boolean == "FALSE";
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    get type(): Tipo {
        return this._type;
    }

    set type(value: Tipo) {
        this._type = value;
    }

    public getValueString():string{
        return this._value;
    }

    public isAttribute():boolean{
        return true;
    }
}