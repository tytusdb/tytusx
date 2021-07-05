import { Instruction } from '../Abstract/Instruction';
import { NodoXML } from '../Nodes/NodoXml';
import { EnvironmentXML } from '../Symbol/EnviromentXML';
import { Environment } from '../Symbol/Environment';
import { Error_ } from '../Error';
import { errores } from '../Errores';

export class Fin extends Instruction {
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

  constructor(public tree: NodoXML, line: number, column: number) {
    super(line, column);
  }

  public getValor() {
    let valor = this.tree.listaNodos[0].name;
    return valor;
  }

  public execute(env: Environment) {
    //recorrer arbol
    console.log('---ejecutando Fin---');
    console.log(this.tree);
    let nodes = this.tree.getHijos();
    console.log(nodes[0]);
    if (nodes[0].type) {
      //func
      switch (nodes[0].type) {
        case 'DIR':
          break;
        case 'TEXT':
          break;
        case 'NODE':
          break;
        case 'POSITION':
          break;
        case 'LAST':
          break;
        case 'DOC':
          break;
        case 'DATA':
          break;
        case 'UPPERCASE':
          break;
        case 'SUBSTRING':
          break;
        case '*':
          break;
        case 'Preservada':
          break;
        default:
          return nodes[0].execute(env);
      }
    } else {
      //valor
      if (!nodes[1]) {
        let result = [];
        this.seachTag(env.xmlEnvironment, nodes[0].id, result);
        return result;
      } else {
        console.log(nodes[1].tree);
        let result = [];
        this.seachTag(env.xmlEnvironment, nodes[0].id, result);
        console.log(result);
        let val = nodes[1].execute(env);
        if (val.type != 0 || parseInt(val.value) > result.length) {
          //error semantico
          errores.push(
            new Error_(
              this.line,
              this.column,
              'Semantico',
              'la posicion del objeto no es valida'
            )
          );
          return null;
        }
        let pos = parseInt(val.value);
        return result[pos - 1];
      }
    }
  }

  private seachTag(env: EnvironmentXML, name: string, result: string[]) {
    if (env) {
      if (env.nombre === name) {
        console.log(this.printContent(env));
        result.push(this.printContent(env));
      }
      env.hijos.forEach((element) => {
        this.seachTag(element, name, result);
      });
    }
  }

  private printContent(env: EnvironmentXML): string {
    let res = `<${env.nombre}`;
    env.tablaSimbolos.forEach((sim) => {
      if (sim.tipo === 0) {
        res += ` ${sim.nombre}="${sim.valor}"`;
      }
    });
    res += '>';
    env.tablaSimbolos.forEach((sim) => {
      if (sim.tipo === 1) {
        res += `${sim.valor}`;
      }
    });
    env.hijos.forEach((h) => {
      res += this.printContent(h);
    });
    res += `</${env.nombre}>`;
    return res;
  }
}
