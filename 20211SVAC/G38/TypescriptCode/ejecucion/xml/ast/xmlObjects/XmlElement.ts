class XmlElement extends XmlObjectAncestor{

    private _childs: Array<XmlObjectInt>;
    private _attributes:Array<XmlAttribute>;

    constructor(id: string, name: string, parent: XmlObjectInt, line: number, column: number, childs: Array<XmlObjectInt>, attributes: Array<XmlAttribute>) {
        super(id, name, parent, line, column);
        this._childs = (childs == undefined || childs == null) ? [] : childs ;
        this._attributes = (attributes == undefined || attributes == null)?[]:attributes ;
    }

    get childs(): Array<XmlObjectInt> {
        return this._childs;
    }

    set childs(value: Array<XmlObjectInt>) {
        this._childs = value;
    }


    get attributes(): Array<XmlAttribute> {
        return this._attributes;
    }

    set attributes(value: Array<XmlAttribute>) {
        this._attributes = value;
    }

    private getChildsTs(entornoRow:TsRow):Array<TsRow>{
        var rows:Array<TsRow>;
        var index:number = 1;
        if(this._childs == undefined || this._childs == null){
            return [];
        }
        rows = [];
        for(let child of this._childs){
            if(child==undefined || child == null){
                continue;
            }
            rows = rows.concat(child.getTsScope(entornoRow,index));
            index = index + 1 ;
        }
        //entornoRow.sub_entorno = entornoRow.sub_entorno.concat(rows);
        return rows;
    }

    private getAttributesTs(entornoRow:TsRow):Array<TsRow>{
        var rows:Array<TsRow>;
        var index:number = 1;
        if(this._attributes == undefined || this._attributes == null){
            return [];
        }
        rows = [];
        for(let attribute of this._attributes){
            if(attribute==undefined || attribute == null){
                continue;
            }
            rows.push(new TsRow(attribute.name,index,attribute.name,attribute,new Tipo(TipoDato.atributo),this.name,entornoRow));
            index = index + 1 ;
        }
        //entornoRow.sub_entorno = entornoRow.sub_entorno.concat(rows);
        return rows;
    }

    /*
    OVERRIDE METHODS
     */

    public getTsScope(scope:TsRow, index:number): Array<TsRow> {
        var list:Array<TsRow> = [];
        var attributes:Array<TsRow>;
        var childs:Array<TsRow>;
        var row = new TsRow(index==null?this.name:this.name+'_'+index,
            index,this.name,this,new Tipo(TipoDato.objeto), (scope==null)?"Global":this.parent.getNameObject(), scope);


        attributes = this.getAttributesTs(row);
        childs = this.getChildsTs(row);
        list = list.concat(attributes);
        list = list.concat(childs);
        row.sub_entorno = list;

        return [row];
    }

    public getStrAttributes():string{
        let cad:string='';
        for(let attribute of this._attributes){
            cad+=attribute.name + '="' + attribute.getValueString()+'"';
        }
        return cad;
    }




}