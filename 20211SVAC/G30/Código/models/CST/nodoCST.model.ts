export class NodoCST {
    public name: string;
    public children: Array<string>;
  
    constructor(name: string, children: Array<string>) {
      this.name = name;
      this.children = children;
    }

    public addChild(child: string): void{
      this.children.push();
    }
  }