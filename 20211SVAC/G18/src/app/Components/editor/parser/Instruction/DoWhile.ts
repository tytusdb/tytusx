import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";
import { _Console } from '../Util/Salida';

export class DoWhile extends Instruction {
    public translate(environment: Environment): String {
        let inicio = _Console.labels;
        _Console.labels++;
        let result = "l" + inicio + ":\n";
        result += this.code.translate(environment);
        result += this.condition.translate(environment);
        result += "if(t" + (_Console.count - 1) + ") goto l" + inicio + ";\n";
        return result;
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") DoWhile\"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.code.line + "," + this.code.column + ") Codigo\"];";
        result += this.code.plot(Number(count + "1"));
        // Hijo 1
        result += "node" + count + "2[label=\"(" + this.condition.line + "," + this.condition.column + ") Condicion\"];";
        result += this.condition.plot(Number(count + "2"));
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";

        return result;
    }

    constructor(private code: Instruction, private condition: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        let condition = this.condition.execute(env);
        if (condition.type != Type.BOOLEAN) {
            throw { error: "La condicion no es booleana", linea: this.line, columna: this.column };
        }
        do {
            const element = this.code.execute(env);
            if (element != null || element != undefined) {
                console.log(element);
                if (element.type == 'Break')
                    break;
                else if (element.type == 'Continue')
                    continue;
            }
            condition = this.condition.execute(env);
            if (condition.type != Type.BOOLEAN) {
                throw { error: "La condicion no es booleana", linea: this.line, columna: this.column };
            }
        }
        while (condition.value == true);
    }
}