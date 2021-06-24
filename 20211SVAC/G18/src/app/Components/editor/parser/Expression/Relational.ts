import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Console } from '../Util/Salida';
import { _Optimizer } from '../Optimizer/Optimizer';

export enum RelationalOption {
    EQUAL,
    NOTEQUAL,
    LESS,
    LESSOREQUAL,
    GREATER,
    GREATEROREQUAL
}

export class Relational extends Expression {
    
    public build(): String {
        return this.left.build() + this.getTypeSign() + this.right.build();
    }

    public translate(environment: Environment): String {
        let result = this.left.translate(environment);
        let leftT = _Console.count - 1;
        result += "" + this.right.translate(environment);
        let rigthT = _Console.count - 1;
        result += "t" + _Console.count + " = t" + leftT + this.getTypeSign() + "t" + rigthT + ";\n";
        _Console.count++;
        return result;
    }
    private getTypeSign() {
        switch (this.type) {
            case RelationalOption.EQUAL:
                return " == ";
            case RelationalOption.NOTEQUAL:
                return " != ";
            case RelationalOption.LESS:
                return " < ";
            case RelationalOption.LESSOREQUAL:
                return " <= ";
            case RelationalOption.GREATER:
                return " > ";
            case RelationalOption.GREATEROREQUAL:
                return " >= ";
            default:
                return "Error";
        }
    }
    private getTypeName() {
        switch (this.type) {
            case RelationalOption.EQUAL:
                return "Igual =";
            case RelationalOption.NOTEQUAL:
                return "No igual !=";
            case RelationalOption.LESS:
                return "Menor <";
            case RelationalOption.LESSOREQUAL:
                return "Menor o Igual <=";
            case RelationalOption.GREATER:
                return "Mayor >";
            case RelationalOption.GREATEROREQUAL:
                return "Mayor o Igual >=";
            default:
                return "Error";
        }
    }
    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Relacional: " + this.getTypeName() + "\"];";
        result += "node" + count + "1[label=\"(" + this.left.line + "," + this.left.column + ") Izquierdo\"];";
        result += this.left.plot(Number(count + "1"));
        result += "node" + count + "2[label=\"(" + this.right.line + "," + this.right.column + ") Derecho\"];";
        result += this.right.plot(Number(count + "2"));
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";
        return result;
    }

    constructor(private left: Expression, private right: Expression, private type: RelationalOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {

        const leftValue = (this.left == null) ? { value: null, type: 3 } : this.left.execute(environment);
        const rightValue = (this.right == null) ? { value: null, type: 3 } : this.right.execute(environment);
        if (leftValue == null || rightValue == null || leftValue == undefined || rightValue == undefined) errores.push(new Error_(this.line, this.column, 'Semantico', 'Operador no definido'));
        else {
            switch (this.type) {
                case RelationalOption.EQUAL:
                    return { value: (leftValue.value == rightValue.value), type: Type.BOOLEAN };
                case RelationalOption.NOTEQUAL:
                    return { value: (leftValue.value != rightValue.value), type: Type.BOOLEAN };
                case RelationalOption.GREATER:
                    return { value: (leftValue.value > rightValue.value), type: Type.BOOLEAN };
                case RelationalOption.GREATEROREQUAL:
                    return { value: (leftValue.value >= rightValue.value), type: Type.BOOLEAN };
                case RelationalOption.LESS:
                    return { value: (leftValue.value < rightValue.value), type: Type.BOOLEAN };
                case RelationalOption.LESSOREQUAL:
                    return { value: (leftValue.value <= rightValue.value), type: Type.BOOLEAN };
                default:
                    return { value: 0, type: Type.NUMBER }
            }
        }
    }
}