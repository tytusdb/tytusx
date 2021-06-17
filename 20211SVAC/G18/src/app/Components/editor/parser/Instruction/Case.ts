import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';
import { Statement } from './Statement';

export class Case extends Instruction {
    public translate(environment: Environment): String {
        let result = "";
        if (this.condition != null) {
            result += this.condition.translate(environment);

            let inicio = _Console.labels;
            _Console.labels++;

            let final = _Console.labels;
            _Console.labels++;

            result += "if( t" + (_Console.count - 1) + " == t" + environment.getLastT() + ") goto l" + inicio + ";\n";
            result += "goto l" + final + ";\n";

            result += "l" + inicio + ":\n";

            result += "" + this.code.translate(environment);

            result += "l" + final + ":\n";
        }
        else result += "" + this.code.translate(environment);

        return result;
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Case\"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.condition.line + "," + this.condition.column + ") Condicion\"];";
        result += this.condition.plot(Number(count + "1"));
        // Hijo 2
        result += "node" + count + "2[label=\"(" + this.code.line + "," + this.code.column + ") Codigo\"];";
        result += this.condition.plot(Number(count + "2"));
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";

        return result;
    }

    constructor(private condition: Expression, private code: Statement,
        line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        
    }
}
