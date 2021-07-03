class Errors{
  tipo: string;
  desc: string;
  analizador: string;
  linea: number;
  columna:number;

  constructor(tipo: string, desc: string, analis: string, linea: number, columna: number) {
    this.tipo = tipo;
    this.desc = desc;
    this.analizador = analis;
    this.linea = linea;
    this.columna = columna;
  }
  toString():string{
    return "Error, tipo: " + this.tipo + ", descripcion: " + this.desc + ", analizador: " + this.analizador;
  }
}
export {Errors};
