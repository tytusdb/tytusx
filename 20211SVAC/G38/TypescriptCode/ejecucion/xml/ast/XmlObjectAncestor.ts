class XmlObjectAncestor implements XmlObjectInt{

    private _id:string;
    private _name:string;
    private _parent:XmlObjectInt;
    private _line:number;
    private _column:number;


    constructor(id: string, name: string, parent: XmlObjectInt, line: number, column: number) {
        this._id = XpathUtil.generarIdUnicoXmlNode();
        this._name = name;
        this._parent = parent;
        this._line = line;
        this._column = column;
    }

    /*
    GETTERS AND SETTERS
     */
    get line(): number {
        return this._line;
    }

    set line(value: number) {
        this._line = value;
    }

    get column(): number {
        return this._column;
    }

    set column(value: number) {
        this._column = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get parent(): XmlObjectInt {
        return this._parent;
    }

    set parent(value: XmlObjectInt) {
        this._parent = value;
    }



    /*
    OVERRIDE METHODS
     */
    public getTsScope3D(scope:TsRow3D, index:number): Array<TsRow3D> {
        throw new Error("Method not implemented.");
    }

    public getTsScope(scope:TsRow, index:number): Array<TsRow> {
        throw new Error("Method not implemented.");
    }

    public getNameObject():string{
        return this._name;
    }

    public getValueString():string{
        return "";
    }

    public isContent():boolean{
        return false;
    }

    public getStrAttributes():string{
        return "";
    }

    public isAttribute():boolean{
        return false;
    }

    public getStrAst(nodoPadre:string):string{
        return "";
    }


    public generateString_3d():string{
        throw new Error("Method not implemented generateString_3d().");
    }

}