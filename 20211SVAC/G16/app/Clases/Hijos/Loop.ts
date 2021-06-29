export class Loop{
  variable:string;
  condiciones:any;
  contenido:any;
  linea:number;
  columna:number;
  loop:Loop;
  constructor(variable:string,condiciones:any,linea:number,columna:number,loop:Loop){
    this.variable=variable;
    this.condiciones=condiciones;
    this.linea=linea;
    this.columna=columna;
    this.loop=loop;
  }
}
