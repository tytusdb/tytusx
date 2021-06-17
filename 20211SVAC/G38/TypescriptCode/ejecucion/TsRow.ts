class TsRow{
    private _identificador:string;
    private _indice:number;
    private _nombreElemento:string;
    private _nodo:XmlObjectInt;
    private _tipo:Tipo;
    private _entorno:string;
    private _entorno_row:TsRow;
    private _sub_entorno:Array<TsRow>;
    private _id:string;


    constructor(identificador: string, indice: number, nombreElemento: string, nodo: XmlObjectInt,
                tipo: Tipo, entorno: string, entorno_row: TsRow) {
        this._identificador = identificador;
        this._indice = indice;
        this._nombreElemento = nombreElemento;
        this._nodo = nodo;
        this._tipo = (nodo instanceof XmlRoot)? new Tipo(TipoDato.global) : tipo ;
        this._entorno = entorno;
        this._entorno_row = entorno_row;
        this._sub_entorno = [];
        this._id = XpathUtil.generarIdUnicoTsRow();
    }

    public contieneTexto(){
        let contieneTexto = false;
        if (this._sub_entorno !== undefined && this._sub_entorno !== null) {
            for(let row of this.sub_entorno){
                if(row.tipo.esPrimitivo()){
                    contieneTexto = true;
                    break;
                }
            }
        }
        return contieneTexto;
    }

    public obtenerTexto():Primitive{
        let primitivo : Primitive;
        if(this.tipo.esAtributo() && this.nodo instanceof XmlAttribute){
            primitivo = new Primitive(this.nodo.value,this.nodo.type,0,0);
        }else if(this.tipo.esObjeto()){
            if (this._sub_entorno !== undefined && this._sub_entorno !== null) {
                for(let row of this.sub_entorno){
                    if(row.tipo.esPrimitivo()){
                        primitivo = new Primitive(row.nodo.getValueString(),row.tipo,0,0);
                        break;
                    }
                }
            }
        }
        return primitivo;
    }

    public toStr(tab:string):string{
        if(this._nodo.isContent()){
            return tab+"\t"+this.nodo.getValueString()+"\n";
        }else if (this._nodo.isAttribute()){
            return "";
        }else{
            let cadena = tab+'<'+this._nombreElemento+" "+this.getStrAttributes()+' > \n';
            for(let sub_rob of this._sub_entorno){
                cadena+=sub_rob.toStr(tab+"\t");
            }
            cadena += '\n'+tab+'</'+this._nombreElemento+'> \n';
            return cadena;
        }
    }

    private getStrAttributes():string{
        let cad = this._nodo.getStrAttributes();
        return cad;
    }

    public toString():string{
        return this._nombreElemento;
    }

    get identificador(): string {
        return this._identificador;
    }

    set identificador(value: string) {
        this._identificador = value;
    }

    get indice(): number {
        return this._indice;
    }

    set indice(value: number) {
        this._indice = value;
    }

    get nombreElemento(): string {
        return this._nombreElemento;
    }

    set nombreElemento(value: string) {
        this._nombreElemento = value;
    }

    get nodo(): XmlObjectInt {
        return this._nodo;
    }

    set nodo(value: XmlObjectInt) {
        this._nodo = value;
    }

    get tipo(): Tipo {
        return this._tipo;
    }

    set tipo(value: Tipo) {
        this._tipo = value;
    }

    get entorno(): string {
        return this._entorno;
    }

    set entorno(value: string) {
        this._entorno = value;
    }

    get entorno_row(): TsRow {
        return this._entorno_row;
    }

    set entorno_row(value: TsRow) {
        this._entorno_row = value;
    }

    get sub_entorno(): Array<TsRow> {
        return this._sub_entorno;
    }

    set sub_entorno(value: Array<TsRow>) {
        this._sub_entorno = value;
    }

    public obtenerTablaSimbolos(): TablaSimbolos{
        let ts = new TablaSimbolos(null);
        if(this._sub_entorno !== undefined && this._sub_entorno !== null )
            ts.listaSimbolos = this._sub_entorno;
        return ts;
    }

    public getObjectsInRowByNombreElemento(nombreElemento:string ):Array<TsRow>{
        let result : Array<TsRow> = [];
        if(this._nodo instanceof XmlAttribute || this._nodo instanceof XmlContent ){
            return  result;
        }
        if(this._nombreElemento == nombreElemento){
            result.push(this);
        }
        if(this._sub_entorno == null || this._sub_entorno.length == 0){
            return result;
        }
        for(let sub_row of this._sub_entorno){
            result = result.concat(sub_row.getObjectsInRowByNombreElemento(nombreElemento));
        }
        return result;
    }

    public getAllSubTextInRow():Array<TsRow>{
        let result : Array<TsRow> = [];

        if(this._sub_entorno == undefined || this._sub_entorno == null || this._sub_entorno.length == 0){
            return result;
        }
        for(let sub_row of this._sub_entorno){
            if(sub_row._nodo instanceof XmlContent ){
                result.push(sub_row);
            }else if(sub_row._nodo instanceof XmlElement){
                var subText = sub_row.getAllSubTextInRow();
                result = result.concat(subText);
            }
        }
        return result;
    }

    public getSubTextInRow():Array<TsRow>{
        let result : Array<TsRow> = [];
        if(this._sub_entorno == undefined || this._sub_entorno == null
            || this._sub_entorno.length == 0 ){
            return result;
        }
        for(let sub_row of this._sub_entorno){
            if(sub_row._nodo instanceof XmlContent ){
                result.push(sub_row);
            }
        }
        return result;
    }


    public getSubObjectsInRow (  ):Array<TsRow>{
        let result : Array<TsRow> = [];
        if(!(this._nodo instanceof XmlElement)){
            return  result;
        }
        if(this._sub_entorno == undefined || this._sub_entorno == null || this._sub_entorno.length == 0){
            return result;
        }
        for(let sub_row of this._sub_entorno){
            if(sub_row._nodo instanceof XmlContent || sub_row._nodo instanceof  XmlAttribute){
                continue;
            }
            result.push(sub_row);
            result = result.concat(sub_row.getSubObjectsInRow());
        }
        return result;
    }

    public isEqual(tsRow:TsRow):boolean{
        if(tsRow == undefined || tsRow == null){
            return false;
        }
        if(this._nombreElemento != tsRow._nombreElemento ){
            return false;
        }
        if(this._indice  != tsRow._indice){
            return false;
        }
        if(this._sub_entorno!=null && tsRow.sub_entorno == null
                || this.sub_entorno == null && tsRow.sub_entorno !=null ){
            return false;
        }
        if(this.sub_entorno == null || tsRow.sub_entorno ==null){
            return true;
        }
        if(this.sub_entorno.length != tsRow.sub_entorno.length){
            return false;
        }
        for(let i in this._sub_entorno ){
            let thisSubRow = this._sub_entorno[i];
            let subRow = tsRow._sub_entorno[i];
            if(!thisSubRow.isEqual(subRow)){
                return false;
            }
        }
        return true;
    }


    get id(): string {
        return this._id;
    }
}