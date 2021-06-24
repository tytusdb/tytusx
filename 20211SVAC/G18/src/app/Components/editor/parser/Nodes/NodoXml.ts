import { Nodo } from '../Abstract/Nodo';

export class NodoXML extends Nodo {
  constructor(id: string, tipo: string, line: number, column: number) {
    super(id, tipo, line, column);
    this.listaNodos = new Array<NodoXML>();
  }

  public getID() {
    return this.name.trim();
  }

  public getTipo() {
    return this.type;
  }

  public getLine() {
    return this.line;
  }

  public getColumn() {
    return this.column;
  }

  public plot(count: number): string {
    let result = `node${count} [label="(${this.line},${
      this.column
    }) ${this.name.replace(/["]/g, '')} (${this.type})"];`;
    return result;
  }

  public addHijo(nodo: NodoXML): void {
    this.listaNodos.push(nodo);
  }

  public getHijos() {
    return this.listaNodos;
  }


  public plotAst(count: number): string {
    return '';
  }

  public plotCst(count: number): string {
    return '';
  }
}
