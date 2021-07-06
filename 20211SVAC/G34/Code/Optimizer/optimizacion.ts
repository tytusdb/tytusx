export class Optimizacion {
  linea: string;
  antiguo: string;
  nuevo: string;
  regla: string;

  constructor(linea: string, antiguo: string, nuevo: string, regla: string) {
    const aux = +linea + 1;
    //Object.assign(this, {linea: aux, antiguo, nuevo, regla});
    this.linea = aux.toString();
    this.antiguo = antiguo;
    this.nuevo = nuevo;
    this.regla = regla;
  }
}
