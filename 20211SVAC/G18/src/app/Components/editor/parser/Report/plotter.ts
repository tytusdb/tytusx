export class Plotter {
  count: number;
  public makeDot(ast: any) {
    this.count = 1;
    let result = 'digraph AST{ node[shape="box"];';
    result += 'node0 [label="(0,0) Inicio"];';
    result += this.printAST(ast, 0);
    return result + '}';
  }

  private printAST(ast: any, parent: number): string {
    var res = '';
    if (ast != null) {
      res += ast.plot(Number(this.count));
      res += `node${parent} -> node${this.count};`;
      this.count += 1;
      if (ast.getHijos().length > 0) {
        parent = this.count - 1;
      }
      ast.getHijos().forEach((element) => {
        res += this.printAST(element, parent);
      });
    }
    return res;
  }
}
