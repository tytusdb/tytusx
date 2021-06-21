export class Plotter {
  count: number;
  public makeDotCST(ast: any) {
    this.count = 1;
    let result = 'digraph AST{ node[shape="box"];';
    result += 'node0 [label="(0,0) Inicio"];';
    result += this.printCST(ast, 0);
    return result + '}';
  }

  private printCST(ast: any, parent: number): string {
    var res = '';
    if (ast != null) {
      res += ast.plot(Number(this.count));
      res += `node${parent} -> node${this.count};`;
      this.count += 1;
      if (ast.getHijos().length > 0) {
        parent = this.count - 1;
      }
      ast.getHijos().forEach((element) => {
        res += this.printCST(element, parent);
      });
    }
    return res;
  }

  public makeDotAST(ast: any) {
    this.count = 1;
    let result = 'digraph AST{ node[shape="box"];';
    result += 'node0 [label="(0,0) Inicio"];';
    result += this.printAST(ast, 0);
    return result + '}';
  }

  private printAST(ast: any, parent: number): string {
    var res = '';
    if (ast != null) {
      if (ast.getID() != ast.getTipo()) {
        res += ast.plot(Number(this.count));
        res += `node${parent} -> node${this.count};`;
        this.count += 1;
      }
      if (ast.getHijos().length > 0) {
        parent = this.count - 1;
      }
      ast.getHijos().forEach((element) => {
        res += this.printAST(element, parent);
      });
    }
    return res;
  }

  public makeDotXML(node: any) {
    this.count = 1;
    let result = 'digraph AST{ node[shape="box"];';
    result += 'node0 [label="Inicio"];';
    result += this.printXML(node, 0);
    return result + '}';
  }

  private printXML(node: any, parent: number): string {
    var res = '';
    if (node != null) {
      res += `node${this.count} [label="${node.nombre.replace(/["]/g, '')}"];`;
      res += `node${parent} -> node${this.count};`;
      this.count += 1;
      if (node.hijos.length > 0) {
        parent = this.count - 1;
      }
      node.hijos.forEach((element) => {
        res += this.printXML(element, parent);
      });
    }
    return res;
  }
}
