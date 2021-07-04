
class TablaSimbolos3D {

    private _listaSimbolos:Array<TsRow3D>;
    private _esGlobal:boolean;
    private _last:number;

    constructor(rootAST : XmlObjectInt) {
        this._listaSimbolos = (rootAST == undefined || rootAST == null) ? [] : rootAST.getTsScope3D( null, 1);
    }

    public tieneEntornoRow(): boolean{
        var resultado = this._listaSimbolos == undefined || this._listaSimbolos.length == 0
            || this._listaSimbolos[0].entorno_row == null || this._listaSimbolos[0].entorno_row == undefined;
        return resultado;
    }

    public findObjectsByNombreElemento(nombreElemento: string):TablaSimbolos3D{
        /*
        let objetos :Array<TsRow3D> = [];

        if(this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');

        for(let row of this._listaSimbolos){
            for(let simbolo of row.sub_entorno){
                if(simbolo.nombreElemento === nombreElemento && simbolo.tipo.esObjeto()){
                    objetos.push(simbolo);
                }
            }
        }


        return XpathUtil.crearTablaSimbolos3D(objetos);
        */
        return null;
    }

    public findAllObjectsOrAtributesWithText():TablaSimbolos3D{
        let objetos :Array<TsRow3D> = [];

        if(this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for(let row of this._listaSimbolos){
            if( (row.tipo.esObjeto() || row.tipo.esAtributo())  && row.contieneTexto() ){
                objetos.push(row);
            }
        }

        return XpathUtil.crearTablaSimbolos3D(objetos);
        return null;
    }

    public findAllByNombreElemento(nombreElemento: string):TablaSimbolos3D{
        let objetos :Array<TsRow3D> = [];

        if(this._listaSimbolos === undefined || this._listaSimbolos == null)
            throw Error('Lista de simbolos es nula');
        for(let row of this._listaSimbolos){
            if(row.nombreElemento === nombreElemento && (row.tipo.esObjeto() || row.tipo.esAtributo())){
                objetos.push(row);
            }
        }


        return XpathUtil.crearTablaSimbolos3D(objetos);
        return null;

    }


    public findAllAtributesInObjectsRecursive():TablaSimbolos3D{
        let objetos :Array<TsRow3D> = [];
        let tablaTemporal = this.findAllAtributesInObjects();
        if(tablaTemporal.listaSimbolos.length > 0)
            objetos = objetos.concat(tablaTemporal.listaSimbolos);

        this._listaSimbolos.forEach( function (simbolo){
            if( (simbolo.tipo.esObjeto() || simbolo.tipo.esGlobal()) &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos3D(simbolo.sub_entorno);
                tablaTemporal = ts.findAllAtributesInObjectsRecursive();
                if(tablaTemporal.listaSimbolos.length > 0)
                    objetos = objetos.concat(tablaTemporal.listaSimbolos);
            }
        });
        return XpathUtil.crearTablaSimbolos3D(objetos);
        return null;
    }

    public findAllAtributesInObjects():TablaSimbolos3D{
        let objetos :Array<TsRow3D> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.tipo.esObjeto() &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos3D(simbolo.sub_entorno);
                let objetosTemporales = ts.findAllAtributesInEntorno();
                if(objetosTemporales.length > 0)
                    objetos = objetos.concat(objetosTemporales);
            }
        });
        return XpathUtil.crearTablaSimbolos3D(objetos);
        return null;
    }

    private findAllAtributesInEntorno():Array<TsRow3D>{
        let objetos :Array<TsRow3D> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.tipo.esAtributo())
                objetos.push(simbolo);
        });
        return objetos;
        return null;
    }

    public findAtributesByNombreElementoRecursive(nombreElemento: string):TablaSimbolos3D{
        let objetos :Array<TsRow3D> = [];
        let tablaTemporal = this.findAtributesByNombreElemento(nombreElemento);
        if(tablaTemporal.listaSimbolos.length > 0)
            objetos = objetos.concat(tablaTemporal.listaSimbolos);

        this._listaSimbolos.forEach( function (simbolo){
            if( (simbolo.tipo.esObjeto() || simbolo.tipo.esGlobal()) &&
                simbolo.sub_entorno !== undefined &&
                simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos3D(simbolo.sub_entorno);
                tablaTemporal = ts.findAtributesByNombreElementoRecursive(nombreElemento);
                if(tablaTemporal.listaSimbolos.length > 0)
                    objetos = objetos.concat(tablaTemporal.listaSimbolos);
            }
        });
        return XpathUtil.crearTablaSimbolos3D(objetos);
        return null;
    }

    public findAtributesByNombreElemento(nombreElemento: string):TablaSimbolos3D{
        let objetos :Array<TsRow3D> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.tipo.esObjeto() &&
               simbolo.sub_entorno !== undefined &&
               simbolo.sub_entorno !== null)
            {
                let ts = XpathUtil.crearTablaSimbolos3D(simbolo.sub_entorno);
                let objetosTemporales = ts.findAtributesByNombre(nombreElemento);
                if(objetosTemporales.length > 0)
                    objetos = objetos.concat(objetosTemporales);
            }
        });

        return XpathUtil.crearTablaSimbolos3D(objetos);
        return null;
    }

    private findAtributesByNombre(nombreElemento: string):Array<TsRow3D>{
        let objetos :Array<TsRow3D> = [];
        this._listaSimbolos.forEach( function (simbolo){
            if(simbolo.nombreElemento === nombreElemento && simbolo.tipo.esAtributo())
                objetos.push(simbolo);
        });
        return objetos;
        return null;
    }

    public findAllObjectsByNombreElemento(nombreElemento:string):TablaSimbolos3D{
        let resultado:Array<TsRow3D>=[];
        if(this._listaSimbolos != null) {
            for (let row of this._listaSimbolos) {
                if (row == undefined || row == null) {
                    continue;
                }
                resultado = resultado.concat(row.getObjectsInRowByNombreElemento(nombreElemento));
            }
        }
        return XpathUtil.crearTablaSimbolos3D(resultado);
        return null;
    }

    public findAllSubObjects():TablaSimbolos3D{
        let resultado:Array<TsRow3D>=[];
        let ts = new TablaSimbolos3D(null);
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
        return null;
    }

    public findAllSubTextInTS():TablaSimbolos3D{
        let resultado:Array<TsRow3D>=[];
        if(!this.tieneSimbolos()){
            return XpathUtil.crearTablaSimbolos3D([]);
        }
        for(let row of this._listaSimbolos){
            if(row == undefined || row == null){
                continue;
            }
            resultado = resultado.concat(row.getAllSubTextInRow());
        }
        let ts = XpathUtil.crearTablaSimbolos3D(resultado);
        return ts;
        return null;
    }

    public findSubTextInTS():TablaSimbolos3D{
        let resultado:Array<TsRow3D>=[];
        if(!this.tieneSimbolos()){
            return XpathUtil.crearTablaSimbolos3D([]);
        }
        for(let row of this._listaSimbolos){
            if(row == undefined || row == null){
                continue;
            }
            resultado = resultado.concat(row.getSubTextInRow());
        }
        let ts = XpathUtil.crearTablaSimbolos3D(resultado);
        return ts;
        return null;
    }


    public findAllObjects():TablaSimbolos3D{
        let objetos :Array<TsRow3D> = [];

        for(let row of this._listaSimbolos){
            for(let simbolo of row.sub_entorno){
                if(simbolo.tipo.esObjeto())
                    objetos.push(simbolo);
            }
        }

        return XpathUtil.crearTablaSimbolos3D(objetos);
        return null;
    }

    public findAllParents():TablaSimbolos3D{
        let objetosPadre :Array<TsRow3D> = [];

        for (let row of this._listaSimbolos) {
            if (row.entorno_row === undefined || row.entorno_row === null) {
                throw Error('Acceso al padre, en el entorno global.');
            }
            else {
                objetosPadre.push(row.entorno_row);
            }
        }

        return XpathUtil.crearTablaSimbolos3D(objetosPadre);
        return null;
    }

    public getElementsParentsRecursive(): TablaSimbolos3D{
        // let simbolosPadre = XpathUtil.crearTablaSimbolos3D([]);
        // simbolosPadre.listaSimbolos = this.getElementsParents().listaSimbolos;
        //
        // for(let simbolo of this.listaSimbolos){
        //     if (simbolo.entorno_row !== undefined &&
        //         simbolo.entorno_row !== null ){
        //         let tablaAncestro = XpathUtil.crearTablaSimbolos3D([simbolo.entorno_row]);
        //         let tablaTemp = tablaAncestro.getElementsParentsRecursive();
        //         if(!tablaTemp.esVacia())
        //             simbolosPadre.listaSimbolos = simbolosPadre.listaSimbolos.concat(tablaTemp.listaSimbolos);
        //     }
        // }
        // return simbolosPadre;
        return null;
    }

    public getElementsParents() : TablaSimbolos3D {
        // traer todos los padres del que su id es igual a nombreElemento
        // let tablaParent = XpathUtil.crearTablaSimbolos3D([]);
        // tablaParent.listaSimbolos =
        //     this.listaSimbolos.filter(function (simbolo) {
        //         if (simbolo.entorno_row !== undefined &&
        //             simbolo.entorno_row !== null)
        //             return true;
        //         else
        //             return false;
        //     }).map(function (simbolo) {
        //         return simbolo.entorno_row;
        //     });
        // return tablaParent;
        return null;
    }

    public getElementsParentsByNombreElementoRecursive(nombreElemento: string): TablaSimbolos3D{
        // let simbolosPadre = XpathUtil.crearTablaSimbolos3D([]);
        //     simbolosPadre.listaSimbolos = this.getElementsParentsByNombreElemento(nombreElemento).listaSimbolos;
        //
        // for(let simbolo of this.listaSimbolos){
        //     if (simbolo.entorno_row !== undefined &&
        //         simbolo.entorno_row !== null ){
        //         let tablaAncestro = XpathUtil.crearTablaSimbolos3D([simbolo.entorno_row]);
        //         let tablaTemp = tablaAncestro.getElementsParentsByNombreElementoRecursive(nombreElemento);
        //         if(!tablaTemp.esVacia())
        //             simbolosPadre.listaSimbolos = simbolosPadre.listaSimbolos.concat(tablaTemp.listaSimbolos);
        //     }
        // }
        // return simbolosPadre;
        return null;
    }


    public getElementsParentsByNombreElemento(nombreElemento: string) : TablaSimbolos3D {
        // traer todos los padres del que su id es igual a nombreElemento
        // let tablaParent = XpathUtil.crearTablaSimbolos3D([]);
        // tablaParent.listaSimbolos =
        //     this.listaSimbolos.filter(function (simbolo) {
        //         if (simbolo.entorno_row !== undefined &&
        //             simbolo.entorno_row !== null &&
        //             simbolo.entorno_row.nombreElemento == nombreElemento)
        //             return true;
        //         else
        //             return false;
        //     }).map(function (simbolo) {
        //         return simbolo.entorno_row;
        //     });
        // return tablaParent;
        return null;
    }

    public replaceAtributesWithObjects(){
/*        this.listaSimbolos =
            this.listaSimbolos.map(function (simbolo) {
                if (simbolo.tipo.esAtributo())
                    return simbolo.entorno_row;
                else
                    return simbolo;
            });*/
    }

    public chageTypeTsRow3DAttribute(){
/*        var objetos:Array<TsRow3D>=[];
        for(let row of this._listaSimbolos){
            if(row.nodo instanceof XmlAttribute){
                var nodo:TsRow3DAttribute = new TsRow3DAttribute(row);
                objetos.push(nodo);
            }else{
                objetos.push(row);
            }
        }
        this._listaSimbolos = objetos;*/
    }





    public esVacia(){
        // return this.listaSimbolos == null || this.listaSimbolos == undefined || this.listaSimbolos.length == 0;
    }


    public getContentRow():Primitive{
        // let content :Primitive = null;
        //
        // if(this._listaSimbolos === undefined || this._listaSimbolos == null)
        //     throw Error('Lista de simbolos es nula');
        // for(let row of this._listaSimbolos){
        //     if( row.tipo.esObjeto() || row.tipo.esAtributo() ){
        //         content = row.obtenerTexto();
        //         break;
        //     }
        // }
        //
        // return content;
        return null;
    }

    public tieneUnElemento(){
        // return this.listaSimbolos != null && this.listaSimbolos != undefined && this.listaSimbolos.length == 1;
    }

    public getElementoInTsByPosition(position: number):TsRow3D{
        // let row = null;
        // if(this.listaSimbolos != null && this.listaSimbolos.length >= position)
        //     row = this.listaSimbolos[position];
        // return row;
        return null;
    }

    public  getHtmlTable():string{
        // let cad;
        // cad='<cite style="font-size:x-large;">REPORTE DE TABLA DE SIMBOLOS</cite><br/>'+
        //     '<table border="1">'
        //     +'<tr>'
        //     +'<th>IDENTIFICADOR</th><th>NOMBRE</th><th>INDICE</th> <th>VALOR</th> <th>TIPO</th> <th>PADRE</th> '
        //     +'</tr>'
        // ;
        //
        // if(this._listaSimbolos == undefined || this._listaSimbolos == null || this._listaSimbolos.length==0){
        //     cad+='</table>';
        //     return cad;
        // }
        // cad+=this.getHtmlRow(this._listaSimbolos[0]);
        //
        // cad+='</table>';
        // return cad;
        return null;
    }

    private getHtmlRow(row:TsRow3D):string{
        // let cad;
        // let idPadre;
        // if(row == undefined || row == null){
        //     return "";
        // }
        //
        // idPadre = (row.entorno_row == null)?"Global":row.entorno_row.identificador;
        // if(idPadre == 'null_1'){
        //     idPadre = 'Global';
        // }
        //
        // cad = '<tr>' +
        //     '<td>' + row.identificador + '</td>' +
        //     '<td>' + row.nombreElemento + '</td>' +
        //     '<td>' + row.indice + '</td>' +
        //     '<td>' + row.nodo.getValueString() + '</td>' +
        //     '<td>' + row.tipo + '</td>' +
        //     '<td>' + idPadre + '</td> '
        //     + '</tr>';
        // if(row.tipo.esGlobal()){
        //     cad = "";
        // }
        // if(row.sub_entorno == undefined || row.sub_entorno == null){
        //     return cad;
        // }
        // for(let sub_row of row.sub_entorno ){
        //     cad += this.getHtmlRow(sub_row);
        // }
        // return cad;
        return null;
    }

    set listaSimbolos(simbolos: Array<TsRow3D>){
        this._listaSimbolos = simbolos;
    }

    get listaSimbolos(){
        return this._listaSimbolos;
    }

    set esGlobal(esGlobal: boolean){
        this._esGlobal = esGlobal;
    }

    get esGlobal(){
        return this._esGlobal;
    }

    public toStr():string{
        // let i:number = 1;
        // let cad="";
        // for(let row of this._listaSimbolos){
        //     if(row != null && row.nodo instanceof XmlRoot)
        //     {
        //         continue;
        //     }
        //     cad+=i+".\n"+row.toStr("");
        //     i+=1;
        // }
        // return cad;
        return null;
    }

    public merge(TablaSimbolos3DExterna: TablaSimbolos3D){
        // if(this.isEqual(TablaSimbolos3DExterna)){
        //     return;
        // }
        // if(this._listaSimbolos == undefined || this._listaSimbolos == null){
        //     return;
        // }
        // this._listaSimbolos = this._listaSimbolos.concat(TablaSimbolos3DExterna._listaSimbolos);
    }

    public isEqual(TablaSimbolos3D : TablaSimbolos3D):boolean{
        // if(TablaSimbolos3D == null || TablaSimbolos3D == undefined){
        //     return false;
        // }
        // if(this._listaSimbolos==null && TablaSimbolos3D._listaSimbolos!=null
        //     || this._listaSimbolos!=null && TablaSimbolos3D._listaSimbolos==null){
        //     return false;
        // }
        // if(this._listaSimbolos == null && TablaSimbolos3D._listaSimbolos == null){
        //     return true;
        // }
        // if(this._listaSimbolos.length != TablaSimbolos3D._listaSimbolos.length){
        //     return false;
        // }
        // for(let i in this._listaSimbolos){
        //     let thisSubRow = this._listaSimbolos[i];
        //     let subRow = TablaSimbolos3D._listaSimbolos[i];
        //     if(!thisSubRow.isEqual(subRow)){
        //         return false;
        //     }
        // }
        // return true;
        return false;
    }

    public eliminarDuplicados(){
        // var nuevaLista:Array<TsRow3D>=[];
        // if(this._listaSimbolos == null ){
        //     this.listaSimbolos = nuevaLista;
        //     return ;
        // }
        // for(let subRow of this._listaSimbolos){
        //     let existe = false;
        //     for(let tmp of nuevaLista){
        //         if(tmp.id == subRow.id){
        //             existe = true;
        //             break;
        //         }
        //     }
        //     if(!existe){
        //         nuevaLista.push(subRow);
        //     }
        // }
        // this._listaSimbolos = nuevaLista;
    }

    public findAllNodes():TablaSimbolos3D{
        // let ts = this.findAllSubObjects();
        // return ts;
        return null;
    }

    public findAllChildsNodes():TablaSimbolos3D{
        // let result_row:Array<TsRow3D>=[];
        // let ts = this.findAllObjects();
        // if(ts==undefined || ts == null){
        //     return XpathUtil.crearTablaSimbolos3D([]);
        // }
        // for(let sub_row of ts._listaSimbolos){
        //     if(sub_row==undefined || sub_row == null){
        //         continue;
        //     }
        //     if(sub_row.sub_entorno == undefined || sub_row == null){
        //         continue;
        //     }
        //     if(sub_row.sub_entorno.length==0){
        //         continue
        //     }
        //     result_row.push(sub_row);
        // }
        // return XpathUtil.crearTablaSimbolos3D(result_row);
        return null;
    }

    public findAllSubTextRows():TablaSimbolos3D{
        // if(!this.tieneSimbolos()){
        //     return XpathUtil.crearTablaSimbolos3D([]);
        // }
        // let ts = XpathUtil.crearTablaSimbolos3D([]);
        // for(let sub_row of this._listaSimbolos){
        //     if(sub_row == undefined || sub_row == null){
        //         continue;
        //     }
        //     if(sub_row.tipo.esPrimitivo()){
        //         ts._listaSimbolos.push(sub_row);
        //     }
        // }
        // return ts;
        return null;
    }

    public tieneSimbolos():boolean{
        return this._listaSimbolos!=undefined && this._listaSimbolos!=null;
    }

    public getPosition():number{
        // let position = null;
        // for(let row of this._listaSimbolos){
        //     if(row.tipo.esObjeto()){
        //         position = row.indice;
        //         break;
        //     }
        // }
        // return position;
        return null;
    }

    public getLastPosition():number{
        // let posicionMasGrande=0;
        // this.listaSimbolos.forEach(function (TsRow3D) {
        //     if(TsRow3D.indice > posicionMasGrande)
        //         posicionMasGrande = TsRow3D.indice
        // });
        // return posicionMasGrande;
        return null;
    }

    get last(): number {
        return this._last;
    }

    set last(value: number) {
        this._last = value;
    }

    public getStrAst():string{
        // let cadena;
        // cadena = "digraph G {\n";
        // if(!this.tieneSimbolos()){
        //     cadena += "}\n";
        //     return cadena;
        // }
        //
        // var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
        // var cadenaRoot=nombreRoot+"["+'label="/",'+'color="red",'+"];\n ";
        //
        // cadena += cadenaRoot+this._listaSimbolos[0].sub_entorno[0].nodo.getStrAst(nombreRoot);
        // //cadena += "rankdir=LR;\n";
        // cadena += "}\n";
        // return cadena;
        return null;
    }
}