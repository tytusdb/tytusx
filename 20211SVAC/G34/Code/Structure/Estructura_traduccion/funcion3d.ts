class funcion3d {

  nombre: string;
  parametros: any;
  tipo: any;

  constructor(n: string, p: any, t: any) {
    this.nombre = n;
    this.parametros = p;
    this.tipo = t;
  }

  getNombre(): string {
    return this.nombre;
  }

  getParametros(): any {
    return this.parametros;
  }

  getTipo(): any {
    return this.tipo;
  }
}