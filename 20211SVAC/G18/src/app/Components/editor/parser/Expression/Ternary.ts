import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { _Optimizer } from '../Optimizer/Optimizer';
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';


export class Ternary extends Expression {
    public build(): String {
        throw new Error('Method not implemented.');
    }
    public translate(environment: Environment): String {
        let result = this.condition.translate(environment);
        let condition = _Console.count - 1;
        result += "if(t" + condition + ") goto l" + _Console.labels + ";\n";
        _Console.labels++;
        result += "goto l" + _Console.labels + ";\n";
        _Console.labels++;
        result += "l" + (_Console.labels - 2) + ":\n";
        result += "" + this.isTrue.translate(environment);
        _Console.count--;
        result += "goto l" + (_Console.labels) + ";\n";
        result += "l" + (_Console.labels - 1) + ":\n";
        result += "" + this.isFalse.translate(environment);
        result += "l" + (_Console.labels) + ":\n";
        _Console.labels++;

        return result;
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Ternaria\"];";
        // Hijos
        result += "node" + count + "1[label=\"(" + this.condition.line + "," + this.condition.column + ") Condicion\"];";
        result += this.condition.plot(Number(count + "11"));
        result += "node" + count + "1 -> " + "node" + count + "11;";
        result += "node" + count + "2[label=\"(" + this.isTrue.line + "," + this.isTrue.column + ") Valor Verdadero\"];";
        result += this.isTrue.plot(Number(count + "21"));
        result += "node" + count + "2 -> " + "node" + count + "21;";
        result += "node" + count + "3[label=\"(" + this.isFalse.line + "," + this.isFalse.column + ") Valor Verdadero\"];";
        result += this.isTrue.plot(Number(count + "31"));
        result += "node" + count + "2 -> " + "node" + count + "31;";
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";
        result += "node" + count + " -> " + "node" + count + "3;";
        return result;
    }

    constructor(private condition: Expression, private isTrue: Expression, private isFalse: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const condition = this.condition.execute(environment);

        if (condition.value == true) {
            const isTrue = this.isTrue.execute(environment);
            if (isTrue != null) return { type: isTrue.type, value: isTrue.value }
            else return { type: 3, value: 'undefined' }
        }
        else {
            const isFalse = this.isFalse.execute(environment);
            if (isFalse != null) return { type: isFalse.type, value: isFalse.value }
            else return { type: 3, value: 'undefined' }
        }
    }
}