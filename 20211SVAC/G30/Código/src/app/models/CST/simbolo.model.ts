export class Simbolo {
    private tipo: string;
    private identificador: string;
    private valor: string;
    private ambito: string;
    private noFila: number;
    private noColumna: number;
    private simbolosInternos: Array<Simbolo>;
  
    constructor(tipo: string, identificador: string, valor: string, noFila: number, noColumna: number, simbolosInternos: Array<Simbolo>) { 
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.noFila = noFila;
        this.noColumna = noColumna;
        this.ambito = "";
        this.simbolosInternos = simbolosInternos;
    }
    
    public get sTipo() : string {
        return this.tipo;
    }

    public get sIdentificador() : string {
        return this.identificador;
    }

    public get sValor() : string {
        return this.valor;
    }

    public set sAmbito(ambito: string){
        this.ambito = ambito;
    }

    public get sAmbito(): string{
        return this.ambito;
    }
  
    public get sFila() : string {
        return this.noFila.toString();
    }
  
    public get sColumna() : string {
        return this.noColumna.toString();
    }

    public getSimbolosInternos(): Array<Simbolo>{
        return this.simbolosInternos;
    }
  
    public toString = (): string => {
      return `\nSimbolo ${this.tipo} en la linea ${this.noFila} y columna ${this.noColumna}: ${this.valor}\n`;
    }
  };