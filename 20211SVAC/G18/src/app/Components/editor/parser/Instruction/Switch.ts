import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';
import { Case } from './Case';

export class Switch extends Instruction {

    public translate(environment: Environment): String {
        let result = "// Inicia Switch\n";
        let salida = _Console.labels;
        _Console.labels++;
        result += this.condition.translate(environment);
        environment.setLastT(_Console.count - 1);
        environment.setLastL(salida);
        this.casos.forEach(element => {
            result += "" + element.translate(environment);
        });
        if (this.def != null) {
            result += "" + this.def.translate(environment);
        }
        result += "l" + salida + ":\n";
        return result + "// Finaliza Switch\n";
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Switch\"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.condition.line + "," + this.condition.column + ") Condicion\"];";
        result += this.condition.plot(Number(count + "1"));
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";

        return result;
    }

    constructor(private condition: Expression, private casos: Case[], private def: Case,
        line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {

    }
}
