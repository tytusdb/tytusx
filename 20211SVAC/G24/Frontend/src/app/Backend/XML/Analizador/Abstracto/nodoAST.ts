export default class nodoAST {
  private listaNodos: Array<nodoAST>;
  private valor: string;

  constructor(valor: string) {
    this.listaNodos = new Array<nodoAST>();
    this.valor = valor;
  }
  public agregarHijo(val: string, ambito?: string, operador?: number): void {
    if (ambito != undefined) {
      switch (ambito) {
        case 'ar':
          switch (operador) {
            case 0:
              val = '+';
              break;
            case 1:
              val = '-';
              break;
            case 2:
              val = '*';
              break;
            case 3:
              val = '/';
              break;
            case 4:
              val = '^';
              break;
            case 5:
              val = '%';
              break;
          }
          break;
        case 'log':
          switch (operador) {
            case 0:
              val = '||';
              break;
            case 1:
              val = '&&';
              break;
            case 2:
              val = '!';
              break;
          }
          break;
        case 'rel':
          switch (operador) {
            case 0:
              val = '==';
              break;
            case 1:
              val = '!=';
              break;
            case 2:
              val = '>';
              break;
            case 3:
              val = '<';
              break;
            case 4:
              val = '>=';
              break;
            case 5:
              val = '<=';
              break;
          }
          break;
      }
      this.listaNodos.push(new nodoAST(val));
    } else this.listaNodos.push(new nodoAST(val));
  }
  public agregarHijoAST(hijo: nodoAST | undefined): void {
    if (hijo != undefined) this.listaNodos.push(hijo);
  }
  public getValor(): string {
    return this.valor;
  }
  public getHijos(): Array<nodoAST> {
    return this.listaNodos;
  }
}
