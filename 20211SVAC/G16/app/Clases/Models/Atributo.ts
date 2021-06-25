export default class Atributo{
  identificador:string;
  valor:any;
  linea:number;
  columna:number;
  constructor(identificador:string,valor:any,linea:number,columna:number){
    this.identificador=identificador;
    this.valor=valor;
    this.linea=linea;
    this.columna=columna;
  }
}
