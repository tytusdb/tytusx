class Erro {
    tipo:string;
    descripcion:string;
    linea:number;
    columna:number;
    lexema:string;

    constructor(tipo:string,descripcion:string,linea:number,columna:number){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }

    get getTipo():string{
        return this.tipo;
    }
    get getDescripcion():string{
        return this.descripcion;
    }
    get getLinea():number{
        return this.linea;
    }
    get getColumna():number{
        return this.columna;
    }

    get getLexema():string{
        return this.lexema;
    }

    setColumna(pos:number){
        this.columna = pos;
    }

    setDescripcion(descripcion:string){
        this.descripcion = descripcion;
    }

    setLexema(lexema:string):void{
        this.lexema = lexema;
    }
}