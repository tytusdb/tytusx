import { Instruction } from '../Abstract/Instruction';
import { NodoXML } from '../Nodes/NodoXml';
import { Environment } from '../Symbol/Environment';

export class Let extends Instruction {
  public translate(environment: Environment): String {
    let result = '';
    //añadir a heap y stack
    return result;
  }

  public plot(count: number): string {
    let result =
      'node' + count + '[label="(' + this.line + ',' + this.column + ') Let"];';
    // let temp = 1;
    // this.code.forEach(element => {
    //     result += element.plot(Number(count + "" + temp));
    //     result += "node" + count + " -> " + "node" + count + "" + temp + ";";
    //     temp++;
    // });
    return result;
  }

  constructor(
    private name: string,
    private code: any,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Environment) {
    // get val from env
    // add to tablaSimbolos
    if (this.code != null) {
      console.log('var name: ' + this.name);
      let resp = [];
      switch (this.code.tree.type) {
        case 'Lexp':
          console.log('Lexp');
          console.log(this.code);
          //let nodos = this.code.tree.listaNodos;
          // nodos[0].execute(env);
          //console.log(nodos[0].execute(env));
          // console.log(nodos[1].listaNodos[0].execute(env));
          // resp = nodos[1].listaNodos[0].execute(env);
          break;
        case 'OR':
          console.log('OR');
          console.log(this.code);
          break;
        case 'Fin':
          console.log('Fin');
          console.log(this.code.execute(env));
          resp = this.code.execute(env);
          break;
        default:
          break;
      }
      console.log(this.name, resp);
    }
  }

  private executeTree(node: any) {
    switch (node.type) {
      case 'Lexp':
        break;
      case 'OR':
        break;
      case 'Fin':
        break;
    }
  }
}
