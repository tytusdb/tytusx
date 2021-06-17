interface XmlObjectInt {

    getTsScope(scope:TsRow, index:number): Array<TsRow>;

    getNameObject():string;

    getValueString():string;

    isContent():boolean;

    getStrAttributes():string;

    isAttribute():boolean;

}