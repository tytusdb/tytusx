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

    public getStrAst(nodoPadre:string):string{
        var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
        var cadenaRoot=nombreRoot+"["+'label="Attribute:'+this.name+"="+this._value+'",'+'color="lightblue3",'+"];\n ";
        var cad = cadenaRoot + nodoPadre+"->"+nombreRoot+";\n";
        return cad;
    }

    public generateString_3d():string{
        CodeUtil.printComment("Guardamos el nombre del atributo ");
        var tmp = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmp+" = RP + 0 ;","Obtenemos inicio de cadena" );
        for(let caracter of this.name){
            CodeUtil.printWithComment("Repository[RP] = "+caracter.charCodeAt(0)+" ;",caracter);
            CodeUtil.print("RP = RP + 1 ;");
        }
        CodeUtil.printWithComment("Repository[RP] = -1 ;","EOF");
        CodeUtil.print("RP = RP + 1 ;");
        return tmp;
    }

    public generateValueString_3d(){
        CodeUtil.printComment("Guardamos el valor del atributo ");
        var tmp = CodeUtil.generarTemporal();
        CodeUtil.printWithComment(tmp+" = RP + 0 ;","Obtenemos inicio de cadena" );
        for(let caracter of this._value){
            CodeUtil.printWithComment("Repository[RP] = "+caracter.charCodeAt(0)+" ;",caracter);
            CodeUtil.print("RP = RP + 1 ;");
        }
        CodeUtil.printWithComment("Repository[RP] = -1 ;","EOF");
        CodeUtil.print("RP = RP + 1 ;");
        return tmp;
    }

}