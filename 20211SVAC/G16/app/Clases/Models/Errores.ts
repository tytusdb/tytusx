export class Error{

  tipo:string;
  valor:string;
  linea:number;
  columna:number;
  analizador:string;

  constructor(tipo:string,valor:string,linea:number,columna:number,analizador:string){
    this.tipo=tipo;
    this.valor=valor;
    this.linea=linea;
    this.columna=columna;
    this.analizador=analizador;
  }
}
