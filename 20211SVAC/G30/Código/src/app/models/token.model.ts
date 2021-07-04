export class Token {
    private tipo: string;
    private valorToken: string;
    /*private noFila: number;
    private noColumna: number;
    private ambito: string;
    private profundidad: number;

    /*constructor( tipo:string, f:number,c:number,val: string, ambito:string, profundidad:number) {
        this.tipo = tipo;
        this.valorToken = val;
        this.noFila=f;
        this.noColumna=c;
        this.ambito = ambito;
        this.profundidad = profundidad;
    }*/

    constructor(valor: string, tipo:string){
        this.valorToken = valor;
        this.tipo = tipo;
    }
    
    /*public get sFila() : string {
        return this.noFila.toString();
    }
    public get sColumna() : string {
        return this.noColumna.toString();
    }
    public get nFila() : number {
        return this.noFila;
    }
    public get nColumna() : number {
        return this.noColumna;
    }
    
    public get sTipo() : string {
        return this.tipo;
    }
    public get sValorToken() : string {
        return this.valorToken;
    }
    public get sAmbito() : string {
        return this.ambito;
    }
    public get sProfundidad() : number {
        return this.profundidad;
    }*/
}