export abstract class Instruccion {
  linea: string;
  codigo: string;

  constructor(linea: string, codigo: string) {
    //Object.assign(this, { linea: +linea, codigo});
    const aux = +linea;
    this.linea = aux.toString();
    this.codigo = codigo;
  }

  abstract optimizar(): string;
}
