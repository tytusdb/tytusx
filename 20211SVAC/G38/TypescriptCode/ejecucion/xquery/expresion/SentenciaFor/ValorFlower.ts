class ValorFlower{
    private idVariable: string;
    private listaNumeros : number[];
    private _valorInicial: number;
    private _valorFinal: number;
    private linea : number;
    private columna : number;
    private valorActual:number;

    constructor(idVariable: string, listaNumeros: number[], valorInicial: number, valorFinal: number,
                linea: number, columna: number) {
        this.idVariable = idVariable;
        this.listaNumeros = listaNumeros;
        this._valorInicial = valorInicial;
        this._valorFinal = valorFinal;
        this.linea = linea;
        this.columna = columna;
    }


    declaracionInicial(ent:TablaSimbolosXquery, tabla:TablaSimbolos){
        if(this.listaNumeros != null && this.listaNumeros != undefined  ){
            let valor = this.listaNumeros[0];
            let primitiva = new Primitive(valor, new Tipo(TipoDato.numero),this.linea,this.columna);
            let declaracion = new Declaracion(this.idVariable, primitiva, this.linea,this.columna);
            declaracion.ejecutar(ent,tabla);
            this.valorActual = 0;
        }else{
            let valor = this.valorInicial;
            let primitiva = new Primitive(valor, new Tipo(TipoDato.numero),this.linea,this.columna);
            let declaracion = new Declaracion(this.idVariable, primitiva, this.linea,this.columna);
            declaracion.ejecutar(ent,tabla);
            this.valorActual = valor;
        }
    }

    private actualizarValor(ent:TablaSimbolosXquery, tabla:TablaSimbolos,valor:number){
            let primitiva = new Primitive(valor, new Tipo(TipoDato.numero),this.linea,this.columna);
            let asignacion = new Asignacion(this.idVariable, primitiva, this.linea,this.columna);
            asignacion.ejecutar(ent,tabla);
    }

    esValorInicial(ent:TablaSimbolosXquery, tabla:TablaSimbolos):boolean{
        if(this.listaNumeros != null && this.listaNumeros != undefined){
            if(this.valorActual == 0){
                return true;
            }
        }else{
            if(this.valorActual == this.valorInicial){
                return true;
            }
        }
        return false;
    }

    aumentarValor(ent:TablaSimbolosXquery, tabla:TablaSimbolos):boolean{
        if(this.listaNumeros != null && this.listaNumeros != undefined){
            this.valorActual++;
            if(this.valorActual<this.listaNumeros.length-1){
                this.actualizarValor(ent,tabla,this.listaNumeros[this.valorActual])
            }else if(this.valorActual == this.listaNumeros.length-1){
                this.actualizarValor(ent,tabla,this.listaNumeros[this.valorActual])
            }else{
                this.valorActual = 0 ;
                this.actualizarValor(ent,tabla,this.listaNumeros[this.valorActual])
                return true;
            }
        }else{
            this.valorActual++;
            if(this.valorActual<this.valorFinal){
                this.actualizarValor(ent,tabla,this.valorActual)
            }else if(this.valorActual == this.valorFinal){
                this.actualizarValor(ent,tabla,this.valorActual)
            }else{
                this.valorActual = this.valorInicial;
                this.actualizarValor(ent,tabla,this.valorActual)
                return true;
            }
        }
        return false;
    }


    set valorInicial(value: number) {
        this._valorInicial = value;
    }

    set valorFinal(value: number) {
        this._valorFinal = value;
    }


    get valorInicial(): number {
        return this._valorInicial;
    }

    get valorFinal(): number {
        return this._valorFinal;
    }
}