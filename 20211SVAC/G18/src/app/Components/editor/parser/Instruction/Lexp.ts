import { Instruction } from '../Abstract/Instruction';
import { NodoXML } from '../Nodes/NodoXml';
import { EnvironmentXML } from '../Symbol/EnviromentXML';
import { Environment } from '../Symbol/Environment';
import { Error_ } from '../Error';
import { errores } from '../Errores';

export class Lexp extends Instruction {
  public translate(environment: Environment): String {
    let result = '';
    //añadir a heap y stack
    return result;
  }

  public plot(count: number): string {
    let result =
      'node' + count + '[label="(' + this.line + ',' + this.column + ') Let"];';
    let temp = 1;
    // this.tree.forEach(element => {
    //     result += element.plot(Number(count + "" + temp));
    //     result += "node" + count + " -> " + "node" + count + "" + temp + ";";
    //     temp++;
    // });
    return result;
  }

  constructor(private tree: NodoXML, line: number, column: number) {
    super(line, column);
  }

  public execute(env: Environment) {
    console.log('executing lexp');
    console.log(this.tree);
  }
}
