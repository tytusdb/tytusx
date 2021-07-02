
class TablaSimbolos {

    private _listaSimbolos:Array<TsRow>;
    private _last:number;

    constructor(rootAST : XmlObjectInt) {
        this._listaSimbolos = (rootAST == undefined || rootAST == null) ? [] : rootAST.getTsScope( null, 1);
    }

    public tieneEntornoRow(): boolean{
        var resultado = this._listaSimbolos == undefined || this._listaSimbolos.length == 0
            || this._listaSimbolos[0].entorno_row == null || this._listaSimbolos[0].entorno_row == undefined;
        return resultado;
    }

    public findObjectsByNombreElemento(nombreElemento: string):TablaSimbolos{
        let objetos :Array<TsRow> = [];

        if(this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');

        for(let row of this._listaSimbolos){
            for(let simbolo of row.sub_entorno){
                if(simbolo.nombreElemento === nombreElemento && simbolo.tipo.esObjeto()){
                    objetos.push(simbolo);
                }
            }
        }


        return XpathUtil.crearTablaSimbolos(objetos);
    }

    public findAllObjectsOrAtributesWithText():TablaSimbolos{
        let objetos :Array<TsRow> = [];

        if(this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for(let row of this._listaSimbolos){
            if( (row.tipo.esObjeto() || row.tipo.esAtributo())  && row.contieneTexto() ){
                objetos.push(row);
            }
        }

        return XpathUtil.crearTablaSimbolos(objetos);
    }

    public findAllByNombreElemento(nombreElemento: string):TablaSimbolos{
        let objetos :Array<TsRow> = [];

        if(this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for(let row of this._listaSimbolos){
            if(row.nombreElemento === nombreElemento && (row.tipo.esObjeto() || row.tipo.esAtributo())){
                objetos.push(row);
            }
        }


        return XpathUtil.crearTablaSimbolos(objetos);

    }


    public findAllAtributesInObjectsRecursive():TablaSimbolos{
        let objetos :Array<TsRow> = [];
        let tablaTemporal = this.findAllAtributesInObjects();
        if(tablaTemporal.listaSimbolos.length > 0)
            objetos = objetos.concat(tablaTemporal.listaSimbolos);

        this._listaSimbolos.forEach( function (simbolo){
            if( (simbolo.tipo.esObjeto() || simbolo.tipo.esGlobal()) &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                tablaTemporal = ts.findAllAtributesInObjectsRecursive();
                if(tablaTemporal.listaSimbolos.length > 0)
                    objetos = objetos.concat(tablaTemporal.listaSimbolos);
            }
        });
        return XpathUtil.crearTablaSimbolos(objetos);
    }

    public findAllAtributesInObjects():TablaSimbolos{
        let objetos :Array<TsRow> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.tipo.esObjeto() &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                let objetosTemporales = ts.findAllAtributesInEntorno();
                if(objetosTemporales.length > 0)
                    objetos = objetos.concat(objetosTemporales);
            }
        });
        return XpathUtil.crearTablaSimbolos(objetos);
    }

    private findAllAtributesInEntorno():Array<TsRow>{
        let objetos :Array<TsRow> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.tipo.esAtributo())
                objetos.push(simbolo);
        });
        return objetos;
    }

    public findAtributesByNombreElementoRecursive(nombreElemento: string):TablaSimbolos{
        let objetos :Array<TsRow> = [];
        let tablaTemporal = this.findAtributesByNombreElemento(nombreElemento);
        if(tablaTemporal.listaSimbolos.length > 0)
            objetos = objetos.concat(tablaTemporal.listaSimbolos);

        this._listaSimbolos.forEach( function (simbolo){
            if( (simbolo.tipo.esObjeto() || simbolo.tipo.esGlobal()) &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                tablaTemporal = ts.findAtributesByNombreElementoRecursive(nombreElemento);
                if(tablaTemporal.listaSimbolos.length > 0)
                    objetos = objetos.concat(tablaTemporal.listaSimbolos);
            }
        });
        return XpathUtil.crearTablaSimbolos(objetos);
    }

    public findAtributesByNombreElemento(nombreElemento: string):TablaSimbolos{
        let objetos :Array<TsRow> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.tipo.esObjeto() &&
               simbolo.sub_entorno !== undefined &&
               simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos(simbolo.sub_entorno);
                let objetosTemporales = ts.findAtributesByNombre(nombreElemento);
                if(objetosTemporales.length > 0)
                    objetos = objetos.concat(objetosTemporales);
            }
        });

        return XpathUtil.crearTablaSimbolos(objetos);
    }

    private findAtributesByNombre(nombreElemento: string):Array<TsRow>{
        let objetos :Array<TsRow> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.nombreElemento === nombreElemento && simbolo.tipo.esAtributo())
                objetos.push(simbolo);
        });
        return objetos;
    }

    public findAllObjectsByNombreElemento(nombreElemento:string):TablaSimbolos{
        let resultado:Array<TsRow>=[];
        if(this._listaSimbolos != null) {
            for (let row of this._listaSimbolos) {
                if (row == undefined || row == null) {
                    continue;
                }
                resultado = resultado.concat(row.getObjectsInRowByNombreElemento(nombreElemento));
            }
        }
        return XpathUtil.crearTablaSimbolos(resultado);
    }

    public findAllSubObjects():TablaSimbolos{
        let resultado:Array<TsRow>=[];
        let ts = new TablaSimbolos(null);
        if(this._listaSimbolos == null){
            return ts;
        }
        for(let row of this._listaSimbolos){
            if(row == undefined || row == null){
                continue;
            }
            resultado = resultado.concat(row.getSubObjectsInRow());
        }
        ts._listaSimbolos = resultado;
        return ts;
    }

    public findAllSubTextInTS():TablaSimbolos{
        let resultado:Array<TsRow>=[];
        if(!this.tieneSimbolos()){
            return XpathUtil.crearTablaSimbolos([]);
        }
        for(let row of this._listaSimbolos){
            if(row == undefined || row == null){
                continue;
            }
            resultado = resultado.concat(row.getAllSubTextInRow());
        }
        let ts = XpathUtil.crearTablaSimbolos(resultado);
        return ts;
    }

    public findSubTextInTS():TablaSimbolos{
        let resultado:Array<TsRow>=[];
        if(!this.tieneSimbolos()){
            return XpathUtil.crearTablaSimbolos([]);
        }
        for(let row of this._listaSimbolos){
            if(row == undefined || row == null){
                continue;
            }
            resultado = resultado.concat(row.getSubTextInRow());
        }
        let ts = XpathUtil.crearTablaSimbolos(resultado);
        return ts;
    }


    public findAllObjects():TablaSimbolos{
        let objetos :Array<TsRow> = [];

        for(let row of this._listaSimbolos){
            for(let simbolo of row.sub_entorno){
                if(simbolo.tipo.esObjeto())
                    objetos.push(simbolo);
            }
        }

        return XpathUtil.crearTablaSimbolos(objetos);
    }

    public findAllParents():TablaSimbolos{
        let objetosPadre :Array<TsRow> = [];

        for (let row of this._listaSimbolos) {
            if (row.entorno_row === undefined || row.entorno_row === null) {
                throw Error('Acceso al padre, en el entorno global.');
            }
            else {
                objetosPadre.push(row.entorno_row);
            }
        }

        return XpathUtil.crearTablaSimbolos(objetosPadre);
    }

    public getElementsParentsRecursive(): TablaSimbolos{
        let simbolosPadre = XpathUtil.crearTablaSimbolos([]);
        simbolosPadre.listaSimbolos = this.getElementsParents().listaSimbolos;

        for(let simbolo of this.listaSimbolos){
            if (simbolo.entorno_row !== undefined &&
                simbolo.entorno_row !== null ){
                let tablaAncestro = XpathUtil.crearTablaSimbolos([simbolo.entorno_row]);
                let tablaTemp = tablaAncestro.getElementsParentsRecursive();
                if(!tablaTemp.esVacia())
                    simbolosPadre.listaSimbolos = simbolosPadre.listaSimbolos.concat(tablaTemp.listaSimbolos);
            }
        }
        return simbolosPadre;
    }

    public getElementsParents() : TablaSimbolos {
        // traer todos los padres del que su id es igual a nombreElemento
        let tablaParent = XpathUtil.crearTablaSimbolos([]);
        tablaParent.listaSimbolos =
            this.listaSimbolos.filter(function (simbolo) {
                if (simbolo.entorno_row !== undefined &&
                    simbolo.entorno_row !== null)
                    return true;
                else
                    return false;
            }).map(function (simbolo) {
                return simbolo.entorno_row;
            });
        return tablaParent;
    }

    public getElementsParentsByNombreElementoRecursive(nombreElemento: string): TablaSimbolos{
        let simbolosPadre = XpathUtil.crearTablaSimbolos([]);
            simbolosPadre.listaSimbolos = this.getElementsParentsByNombreElemento(nombreElemento).listaSimbolos;

        for(let simbolo of this.listaSimbolos){
            if (simbolo.entorno_row !== undefined &&
                simbolo.entorno_row !== null ){
                let tablaAncestro = XpathUtil.crearTablaSimbolos([simbolo.entorno_row]);
                let tablaTemp = tablaAncestro.getElementsParentsByNombreElementoRecursive(nombreElemento);
                if(!tablaTemp.esVacia())
                    simbolosPadre.listaSimbolos = simbolosPadre.listaSimbolos.concat(tablaTemp.listaSimbolos);
            }
        }
        return simbolosPadre;
    }


    public getElementsParentsByNombreElemento(nombreElemento: string) : TablaSimbolos {
        // traer todos los padres del que su id es igual a nombreElemento
        let tablaParent = XpathUtil.crearTablaSimbolos([]);
        tablaParent.listaSimbolos =
            this.listaSimbolos.filter(function (simbolo) {
                if (simbolo.entorno_row !== undefined &&
                    simbolo.entorno_row !== null &&
                    simbolo.entorno_row.nombreElemento == nombreElemento)
                    return true;
                else
                    return false;
            }).map(function (simbolo) {
                return simbolo.entorno_row;
            });
        return tablaParent;
    }

    public replaceAtributesWithObjects(){
        this.listaSimbolos =
            this.listaSimbolos.map(function (simbolo) {
                if (simbolo.tipo.esAtributo())
                    return simbolo.entorno_row;
                else
                    return simbolo;
            });
    }

    public chageTypeTsRowAttribute(){
        var objetos:Array<TsRow>=[];
        for(let row of this._listaSimbolos){
            if(row.nodo instanceof XmlAttribute){
                var nodo:TsRowAttribute = new TsRowAttribute(row);
                objetos.push(nodo);
            }else{
                objetos.push(row);
            }
        }
        this._listaSimbolos = objetos;
    }





    public esVacia(){
        return this.listaSimbolos == null || this.listaSimbolos == undefined || this.listaSimbolos.length == 0;
    }


    public getContentRow():Primitive{
        let content :Primitive = null;

        if(this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for(let row of this._listaSimbolos){
            if( row.tipo.esObjeto() || row.tipo.esAtributo() ){
                content = row.obtenerTexto();
                break;
            }
        }

        return content;
    }

    public tieneUnElemento(){
        return this.listaSimbolos != null && this.listaSimbolos != undefined && this.listaSimbolos.length == 1;
    }

    public getElementoInTsByPosition(position: number):TsRow{
        let row = null;
        if(this.listaSimbolos != null && this.listaSimbolos.length >= position)
            row = this.listaSimbolos[position];
        return row;
    }

    public  getHtmlTable():string{
        let cad;
        cad='<cite style="font-size:x-large;">REPORTE DE TABLA DE SIMBOLOS</cite><br/>'+
            '<table border="1">'
            +'<tr>'
            +'<th>IDENTIFICADOR</th><th>NOMBRE</th><th>INDICE</th> <th>VALOR</th> <th>TIPO</th> <th>PADRE</th> '
            +'</tr>'
        ;

        if(this._listaSimbolos == undefined || this._listaSimbolos == null || this._listaSimbolos.length==0){
            cad+='</table>';
            return cad;
        }
        cad+=this.getHtmlRow(this._listaSimbolos[0]);

        cad+='</table>';
        return cad;
    }

    private getHtmlRow(row:TsRow):string{
        let cad;
        let idPadre;
        if(row == undefined || row == null){
            return "";
        }

        idPadre = (row.entorno_row == null)?"Global":row.entorno_row.identificador;
        if(idPadre == 'null_1'){
            idPadre = 'Global';
        }

        cad = '<tr>' +
            '<td>' + row.identificador + '</td>' +
            '<td>' + row.nombreElemento + '</td>' +
            '<td>' + row.indice + '</td>' +
            '<td>' + row.nodo.getValueString() + '</td>' +
            '<td>' + row.tipo + '</td>' +
            '<td>' + idPadre + '</td> '
            + '</tr>';
        if(row.tipo.esGlobal()){
            cad = "";
        }
        if(row.sub_entorno == undefined || row.sub_entorno == null){
            return cad;
        }
        for(let sub_row of row.sub_entorno ){
            cad += this.getHtmlRow(sub_row);
        }
        return cad;
    }

    set listaSimbolos(simbolos: Array<TsRow>){
        this._listaSimbolos = simbolos;
    }

    get listaSimbolos(){
        return this._listaSimbolos;
    }


    public toStr():string{
        let i:number = 1;
        let cad="";
        for(let row of this._listaSimbolos){
            if(row != null && row.nodo instanceof XmlRoot)
            {
                continue;
            }
            cad+=i+".\n"+row.toStr("");
            i+=1;
        }
        return cad;
    }

    public merge(tablaSimbolosExterna: TablaSimbolos){
        if(this.isEqual(tablaSimbolosExterna)){
            return;
        }
        if(this._listaSimbolos == undefined || this._listaSimbolos == null){
            return;
        }
        this._listaSimbolos = this._listaSimbolos.concat(tablaSimbolosExterna._listaSimbolos);
    }

    public isEqual(tablaSimbolos : TablaSimbolos):boolean{
        if(tablaSimbolos == null || tablaSimbolos == undefined){
            return false;
        }
        if(this._listaSimbolos==null && tablaSimbolos._listaSimbolos!=null
            || this._listaSimbolos!=null && tablaSimbolos._listaSimbolos==null){
            return false;
        }
        if(this._listaSimbolos == null && tablaSimbolos._listaSimbolos == null){
            return true;
        }
        if(this._listaSimbolos.length != tablaSimbolos._listaSimbolos.length){
            return false;
        }
        for(let i in this._listaSimbolos){
            let thisSubRow = this._listaSimbolos[i];
            let subRow = tablaSimbolos._listaSimbolos[i];
            if(!thisSubRow.isEqual(subRow)){
                return false;
            }
        }
        return true;
    }

    public eliminarDuplicados(){
        var nuevaLista:Array<TsRow>=[];
        if(this._listaSimbolos == null ){
            this.listaSimbolos = nuevaLista;
            return ;
        }
        for(let subRow of this._listaSimbolos){
            let existe = false;
            for(let tmp of nuevaLista){
                if(tmp.id == subRow.id){
                    existe = true;
                    break;
                }
            }
            if(!existe){
                nuevaLista.push(subRow);
            }
        }
        this._listaSimbolos = nuevaLista;
    }

    public findAllNodes():TablaSimbolos{
        let ts = this.findAllSubObjects();
        return ts;
    }

    public findAllChildsNodes():TablaSimbolos{
        let result_row:Array<TsRow>=[];
        let ts = this.findAllObjects();
        if(ts==undefined || ts == null){
            return XpathUtil.crearTablaSimbolos([]);
        }
        for(let sub_row of ts._listaSimbolos){
            if(sub_row==undefined || sub_row == null){
                continue;
            }
            if(sub_row.sub_entorno == undefined || sub_row == null){
                continue;
            }
            if(sub_row.sub_entorno.length==0){
                continue
            }
            result_row.push(sub_row);
        }
        return XpathUtil.crearTablaSimbolos(result_row);
    }

    public findAllSubTextRows():TablaSimbolos{
        if(!this.tieneSimbolos()){
            return XpathUtil.crearTablaSimbolos([]);
        }
        let ts = XpathUtil.crearTablaSimbolos([]);
        for(let sub_row of this._listaSimbolos){
            if(sub_row == undefined || sub_row == null){
                continue;
            }
            if(sub_row.tipo.esPrimitivo()){
                ts._listaSimbolos.push(sub_row);
            }
        }
        return ts;
    }

    public tieneSimbolos():boolean{
        return this._listaSimbolos!=undefined && this._listaSimbolos!=null;
    }

    public getPosition():number{
        let position = null;
        for(let row of this._listaSimbolos){
            if(row.tipo.esObjeto()){
                position = row.indice;
                break;
            }
        }
        return position;
    }

    public getLastPosition():number{
        let posicionMasGrande=0;
        this.listaSimbolos.forEach(function (tsRow) {
            if(tsRow.indice > posicionMasGrande)
                posicionMasGrande = tsRow.indice
        });
        return posicionMasGrande;
    }

    get last(): number {
        return this._last;
    }

    set last(value: number) {
        this._last = value;
    }

    public getStrAst():string{
        let cadena;
        cadena = "digraph G {\n";
        if(!this.tieneSimbolos()){
            cadena += "}\n";
            return cadena;
        }

        var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
        var cadenaRoot=nombreRoot+"["+'label="/",'+'color="red",'+"];\n ";

        cadena += cadenaRoot+this._listaSimbolos[0].sub_entorno[0].nodo.getStrAst(nombreRoot);
        //cadena += "rankdir=LR;\n";
        cadena += "}\n";
        return cadena;
    }


    public cargarXml_3d(){
        var ambitoGlobal:string;
        CodeUtil.printWithComment("void cargarXml()","Carga el xml al stack,heap y repository");
        CodeUtil.print("{");
        ambitoGlobal = this.listaSimbolos[0].sub_entorno[0].generarCodigo_3d("-1");
        CodeUtil.printComment("Dejamos el entorno global en la primera pos del stack");
        CodeUtil.printWithComment("Stack[0] = "+ambitoGlobal+" ; ","Stack[0] = Ambito Global ;");
        CodeUtil.print("SP = SP + 1 ;");
        CodeUtil.print("crearLista();");
        let tmpPosParametroObjeto = CodeUtil.generarTemporal();
        CodeUtil.print(tmpPosParametroObjeto + " = SP + 1 ;");
        CodeUtil.printWithComment("Stack[(int)"+tmpPosParametroObjeto+"] = "+ambitoGlobal+" ;",
            "Pasamos la referencia del objeto global para ser agregada a la lista. ");
        CodeUtil.printWithComment("concatenarObjeto();","El resultado se queda en Stack[SP]");
        CodeUtil.print("SP = SP - 1 ;")
        CodeUtil.registrarTamañoHeapCargaXML("HP");
        CodeUtil.printWithComment("}","Fin de cargarXml()");
        CodeUtil.print("");

    }



}