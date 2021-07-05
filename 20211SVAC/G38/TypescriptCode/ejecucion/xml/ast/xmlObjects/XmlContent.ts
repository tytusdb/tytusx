class XmlContent extends XmlObjectAncestor
{

    private _value:string;
    private _type:Tipo;



    constructor(id: string, name: string, parent: XmlObjectInt, line: number, column: number, value: string) {
        super(id, "Contenido", parent, line, column);
        this._value = XpathUtil.procesarCaracteresEspeciales(value) ;
        this._type = (this.isNumber(value))?new Tipo(TipoDato.numero):
                        (this.isBoolean(value))?new Tipo(TipoDato.booleano):
                            new Tipo(TipoDato.cadena);
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
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

    /*
    OVERRIDE METHODS
     */

    public getTsScope(scope:TsRow, index:number): Array<TsRow> {
        var rows:Array<TsRow> = [];
        rows.push(new TsRow(this.name,index,this.name,this,this._type,this.parent.getNameObject(),scope));
        return rows;
    }

    getValueString():string{
        return this._value;
    }

    public isContent():boolean{
        return true;
    }


    public getStrAst(nodoPadre:string):string{
        var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
        var cadenaRoot=nombreRoot+"["+'label="'+this._value+'",'+'color="greenyellow",'+"];\n ";
        var cad = cadenaRoot + nodoPadre+"->"+nombreRoot+";\n";
        return cad;
    }

    public generateString_3d():string{
        CodeUtil.printComment("Guardamos el contenido ");
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