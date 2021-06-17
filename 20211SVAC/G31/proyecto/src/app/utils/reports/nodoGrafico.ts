export class NodoGrafico {
  public name: string;
  public children: Array<string>;

  constructor(name: string, children: Array<string>) {
    this.name = name;
    this.children = children;
  }
}
