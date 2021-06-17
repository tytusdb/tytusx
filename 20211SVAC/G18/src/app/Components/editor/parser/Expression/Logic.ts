import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Console } from '../Util/Salida';
import { _Optimizer } from '../Optimizer/Optimizer';

export enum LogicOption {
    AND,
    OR,
    NOT
}

export class Logic extends Expression {
    public build(): String {
        throw new Error('Method not implemented.');
    }


    public translate(environment: Environment): String {
        let result = "";
        if (this.type == LogicOption.AND) {
            result += this.left.translate(environment);
            let rigthT = _Console.count - 1;
            let nextLabel = _Console.labels;
            _Console.labels++;
            let falseLabel = _Console.labels;
            _Console.labels++;
            result += "if(t" + rigthT + ") goto l" + nextLabel + ";\n";
            result += "goto l" + falseLabel + ";\n";
            result += "l" + nextLabel + ":\n"
            result += "" + this.right.translate(environment);
            let leftT = _Console.count - 1;
            let trueLabel = _Console.labels;
            _Console.labels++;
            result += "if(t" + leftT + ") goto l" + trueLabel + ";\n";
            result += "l" + falseLabel + ":\n"
            result += "t" + _Console.count + " = " + "0;\n";
            let exitLabel = _Console.labels;
            _Console.labels++;
            result += "goto l" + exitLabel + ";\n";
            result += "l" + trueLabel + ":\n"
            result += "t" + _Console.count + " = " + "1;\n";
            result += "l" + exitLabel + ":\n"
            _Console.count++;
        } else 
        {
            result += this.left.translate(environment);
            let rigthT = _Console.count - 1;
            let trueLabel = _Console.labels;
            _Console.labels++;
            result += "if(t" + rigthT + ") goto l" + trueLabel + ";\n";
            result += "" + this.right.translate(environment);
            let leftT = _Console.count - 1;
            result += "if(t" + leftT + ") goto l" + trueLabel + ";\n";
            let falseLabel = _Console.labels;
            _Console.labels++;
            result += "goto l" + falseLabel + ";\n";
            result += "l" + trueLabel + ":\n"
            result += "t" + _Console.count + " = " + "1;\n";
            let exitLabel = _Console.labels;
            _Console.labels++;
            result += "goto l" + exitLabel + ";\n";
            result += "l" + falseLabel + ":\n"
            result += "t" + _Console.count + " = " + "0;\n";
            result += "l" + exitLabel + ":\n";
            _Console.count++;
        }

        return result;
    }

    private getTypeName() {
        switch (this.type) {
            case LogicOption.AND:
                return "And &&";
            case LogicOption.OR:
                return "Or ||";
            case LogicOption.NOT:
                return "Not !";
            default:
                return "Error";
        }
    }
    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Logica: " + this.getTypeName() + "\"];";
        result += "node" + count + "1[label=\"(" + this.left.line + "," + this.left.column + ") Izquierdo\"];";
        result += this.left.plot(Number(count + "11"));
        result += "node" + count + "1 -> " + "node" + count + "11;";

        result += "node" + count + "2[label=\"(" + this.right.line + "," + this.right.column + ") Derecho\"];";
        result += this.right.plot(Number(count + "21"));
        result += "node" + count + "2 -> " + "node" + count + "21;";
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";
        return result;
    }

    constructor(private left: Expression, private right: Expression, private type: LogicOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const leftValue = (this.left == null) ? { value: null, type: 3 } : this.left.execute(environment);

        const rightValue = (this.right == null) ? { value: null, type: 3 } : this.right.execute(environment);
        if (leftValue == null || rightValue == null) errores.push(new Error_(this.line, this.column, 'Semantico', 'Operador no definido'));
        switch (this.type) {
            case LogicOption.AND:
                return { value: (leftValue.value && rightValue.value), type: Type.BOOLEAN };
            case LogicOption.OR:
                return { value: (leftValue.value || rightValue.value), type: Type.BOOLEAN };
            default:
                return { value: 0, type: Type.NUMBER }
        }
    }
}