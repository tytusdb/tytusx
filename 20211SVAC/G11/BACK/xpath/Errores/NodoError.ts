
export class NodoError {
    Columna: number;
    Fila: number;
    Error: string;
    Token: any;
    

    constructor(Token:any, Error:string, Fila:number, Columna:number) {
        this.Token = Token;
        this.Error = Error;
        this.Fila = Fila;
        this.Columna = Columna;
    }

    
    public getToken():any{
        return this.Token;
    }

    public getdescripcion():string{
        return this.Error;
    }

    public getFila():number{
        return this.Fila;
    }
    public getColumna():number{
        return this.Columna;
    }
}