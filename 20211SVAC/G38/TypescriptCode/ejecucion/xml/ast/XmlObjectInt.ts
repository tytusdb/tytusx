interface XmlObjectInt {

    getTsScope3D(scope:TsRow3D,index:number):Array<TsRow3D>;

    getTsScope(scope:TsRow, index:number): Array<TsRow>;

    getNameObject():string;

    getValueString():string;

    isContent():boolean;

    getStrAttributes():string;

    isAttribute():boolean;

    getStrAst(nodoPadre:string):string;

    generateString_3d():string;

}