import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Console } from '../Util/Salida';
import { _Optimizer } from '../Optimizer/Optimizer';
import { Rule } from '../Optimizer/Rule';
import { Literal } from './Literal';

export enum ArithmeticOption {
    PLUS,
    MINUS,
    TIMES,
    DIV,
    POWER,
    MOD
}

export class Arithmetic extends Expression {
    public build(): String {
        return this.left.build() + this.getTypeSign() + this.right.build();
    }

    public regla5(env: _Optimizer): String {
        let r = this.right.build();
        let l = this.left.build();
        let result = env.temp + " = " + this.build().toString() + ";\n";
        // Regla 6 Suma de 0
        if (this.type == ArithmeticOption.PLUS && ((r == '0' && l == env.temp) || (l == '0' && r == env.temp)))
            env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 6", result, ""));

        // Regla 7 Resta de 0
        else if (this.type == ArithmeticOption.MINUS && ((r == '0' && l == env.temp)))
            env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 7", result, ""));

        // Regla 8 Multiplicar por 1
        else if (this.type == ArithmeticOption.TIMES && ((r == '1' && l == env.temp) || (l == '1' && r == env.temp)))
            env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 8", result, ""));

        // Regla 9 Dividir por 1
        else if (this.type == ArithmeticOption.DIV && ((r == '1' && l == env.temp)))
            env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 9", result, ""));

        // Regla 10 Suma de 0 Asignacion
        else if (this.type == ArithmeticOption.PLUS) {
            if (r == '0' && l != '0') {
                let newResult = env.temp + " = " + l + ";\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 10", result, newResult));
                return newResult;
            }
            else if (r != '0' && l == '0') {
                let newResult = env.temp + " = " + r + ";\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 10", result, newResult));
                return newResult;
            }
        }

        // Regla 11 resta de 0 Asignacion
        else if (this.type == ArithmeticOption.MINUS && (r == '0' && l != '0')) {
            let newResult = env.temp + " = " + l + ";\n";
            env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 11", result, newResult));
            return newResult;
        }

         // Regla 12, 14 y 15 Multiplicacion por 1 Asignacion
         else if (this.type == ArithmeticOption.TIMES) {
            if (r == '0' && l != '0') {
                let newResult = env.temp + " = 0;\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 15", result, newResult));
                return newResult;
            }
            else if (r != '0' && l == '0') {
                let newResult = env.temp + " = 0;\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 15", result, newResult));
                return newResult;
            }
            if (r == '1' && l != '1') {
                let newResult = env.temp + " = " + l + ";\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 12", result, newResult));
                return newResult;
            }
            else if (r != '1' && l == '1') {
                let newResult = env.temp + " = " + r + ";\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 12", result, newResult));
                return newResult;
            }
            else if (r != '2' && l == '2') {
                let newResult = env.temp + " = " + r + " + " + r + ";\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 14", result, newResult));
                return newResult;
            }
            else if (r == '2' && l != '2') {
                let newResult = env.temp + " = " + l + " + " + l + ";\n";
                env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 14", result, newResult));
                return newResult;
            }
        }

        // Regla 13 Division de 1 Asignacion
        else if (this.type == ArithmeticOption.DIV && (r == '1' && l != '1')) {
            let newResult = env.temp + " = " + l + ";\n";
            env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 13", result, newResult));
            return newResult;
        }

         // Regla 16 Division de 0 Asignacion
         else if (this.type == ArithmeticOption.DIV && (r == '0' && l != '0')) {
            let newResult = env.temp + " = 0;\n";
            env.reglas.push(new Rule(this.line, "Por Bloque", "Regla 16", result, newResult));
            return newResult;
        }
        else return result;
        return '';
    }

    constructor(private left: Expression, private right: Expression, private type: ArithmeticOption, line: number, column: number) {
        super(line, column);
    }

    private getTypeName() {
        switch (this.type) {
            case ArithmeticOption.PLUS:
                return "Suma";
            case ArithmeticOption.MINUS:
                return "Resta";
            case ArithmeticOption.TIMES:
                return "Multiplicacion";
            case ArithmeticOption.POWER:
                return "Exponencia";
            case ArithmeticOption.MOD:
                return "Modulo";
            default:
                return "Error";
        }
    }

    private getTypeSign() {
        switch (this.type) {
            case ArithmeticOption.PLUS:
                return " + ";
            case ArithmeticOption.MINUS:
                return " - ";
            case ArithmeticOption.TIMES:
                return " * ";
            case ArithmeticOption.DIV:
                return " / ";
            case ArithmeticOption.POWER:
                return " ** ";
            case ArithmeticOption.MOD:
                return " % ";
            default:
                return "Error";
        }
    }
    public plot(count: number): string {

        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Aritmetica: " + this.getTypeName() + "\"];";
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


    public translate(environment: Environment): String {
        let result = this.left.translate(environment);
        let leftT = _Console.count - 1;
        result += "" + this.right.translate(environment);
        let rigthT = _Console.count - 1;
        if (this.type == ArithmeticOption.POWER) {
            let alpha = _Console.labels;
            _Console.labels++;
            let expT = _Console.count;
            _Console.count++;
            result += "t" + expT + " = t" + rigthT + ";\n";
            result += "l" + alpha + ":\n";
            result += "t" + leftT + " = t" + leftT + " * t" + leftT + ";\n";
            result += "t" + expT + " = t" + expT + " - 1;\n";
            result += "if(t" + expT + " > 0) goto l" + alpha + ";\n";
            result += "t" + _Console.count + " = t" + leftT + ";\n";
            _Console.count++;
        } else if (this.type == ArithmeticOption.PLUS) {
            const leftValue = (this.left instanceof Literal) ? this.left.type  : 0;
            const rightValue = (this.right instanceof Literal) ? this.right.type  : 0;
            if (leftValue == 1 && rightValue == 1) {
                result += "// Inicia Concatenacion\n";
                // obtiene el size del string
                let sizeTemp = _Console.count;
                result += "t" + _Console.count + " = Heap[(int)t" + leftT + "];\n";
                _Console.count++;
                // obtiene el size del string2
                let sizeTemp2 = _Console.count;
                result += "t" + _Console.count + " = Heap[(int)t" + rigthT + "];\n";
                _Console.count++;
                // Suma los size
                let newSizeTemp = _Console.count;
                result += "t" + _Console.count + " = t" + sizeTemp + " + t" + sizeTemp2 + ";\n";
                _Console.count++;
                // obtiene la nueva direccion para la string
                let newStrInd = _Console.count;
                result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
                _Console.count++;
                let initialIndex = _Console.count;
                result += "t" + initialIndex + " = t" + (_Console.count - 1) + ";\n";
                _Console.count++;
                result += "Heap[(int)t" + newStrInd + "] = t" + newSizeTemp + ";\n";
                _Console.heapPointer++;
                // El fin de la primer string
                let end = _Console.count;
                result += "t" + end + " = t" + leftT + " + t" + sizeTemp + ";\n";
                _Console.count++;
                // Copia la primer string
                result += "l" + _Console.labels + ":\n";
                _Console.labels++;
                result += "t" + leftT + " = t" + leftT + " + 1;\n";
                result += "t" + _Console.count + " = Heap[(int)t" + leftT + "];\n";
                _Console.count++;
                result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                _Console.count++;
                result += "t" + _Console.count + " = t" + leftT + " <= t" + end + ";\n";
                _Console.count++;
                result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
                // El fin de la segunda string
                let end2 = _Console.count;
                result += "t" + end2 + " = t" + rigthT + " + t" + sizeTemp2 + ";\n";
                _Console.count++;
                // Copia la segunda string
                result += "l" + _Console.labels + ":\n";
                _Console.labels++;
                result += "t" + rigthT + " = t" + rigthT + " + 1;\n";
                result += "t" + _Console.count + " = Heap[(int)t" + rigthT + "];\n";
                _Console.count++;
                result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                _Console.count++;
                result += "t" + _Console.count + " = t" + rigthT + " <= t" + end2 + ";\n";
                _Console.count++;
                result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
                // Regresa el index de la nueva string
                result += "t" + _Console.count + " = t" + initialIndex + ";\n";
                _Console.count++;
                result += "// Finaliza Concatenacion\n";
            } else if (rightValue == 1) {
                result += "// Inicia Concatenacion\n";
                // obtiene el size del string
                let sizeTemp = _Console.count;
                result += "t" + _Console.count + " = Heap[(int)t" + leftT + "];\n";
                _Console.count++;
                // obtiene el size del string2
                let sizeTemp2 = _Console.count;
                result += "t" + _Console.count + " = Heap[(int)t" + rigthT + "];\n";
                _Console.count++;
                // Suma los size
                let newSizeTemp = _Console.count;
                result += "t" + _Console.count + " = t" + sizeTemp + " + t" + sizeTemp2 + ";\n";
                _Console.count++;
                // obtiene la nueva direccion para la string
                let newStrInd = _Console.count;
                result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
                _Console.count++;
                let initialIndex = _Console.count;
                result += "t" + initialIndex + " = t" + (_Console.count - 1) + ";\n";
                _Console.count++;
                result += "Heap[(int)t" + newStrInd + "] = t" + newSizeTemp + ";\n";
                _Console.heapPointer++;
                // El fin de la primer string
                let end = _Console.count;
                result += "t" + end + " = t" + leftT + " + t" + sizeTemp + ";\n";
                _Console.count++;
                // Copia la primer string
                result += "l" + _Console.labels + ":\n";
                _Console.labels++;
                result += "t" + leftT + " = t" + leftT + " + 1;\n";
                result += "t" + _Console.count + " = Heap[(int)t" + leftT + "];\n";
                _Console.count++;
                result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                _Console.count++;
                result += "t" + _Console.count + " = t" + leftT + " <= t" + end + ";\n";
                _Console.count++;
                result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
                // El fin de la segunda string
                let end2 = _Console.count;
                result += "t" + end2 + " = t" + rigthT + " + t" + sizeTemp2 + ";\n";
                _Console.count++;
                // Copia la segunda string
                result += "l" + _Console.labels + ":\n";
                _Console.labels++;
                result += "t" + rigthT + " = t" + rigthT + " + 1;\n";
                result += "t" + _Console.count + " = Heap[(int)t" + rigthT + "];\n";
                _Console.count++;
                result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                _Console.count++;
                result += "t" + _Console.count + " = t" + rigthT + " <= t" + end2 + ";\n";
                _Console.count++;
                result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
                // Regresa el index de la nueva string
                result += "t" + _Console.count + " = t" + initialIndex + ";\n";
                _Console.count++;
                result += "// Finaliza Concatenacion\n";
            } else {
                result += "t" + _Console.count + " = t" + leftT + this.getTypeSign() + "t" + rigthT + ";\n";
                _Console.count++;
            }
        }
        else {
            result += "t" + _Console.count + " = t" + leftT + this.getTypeSign() + "t" + rigthT + ";\n";
            _Console.count++;
        }
        return result;
    }

    public execute(environment: Environment): Retorno {
        const leftValue = (this.left == null) ? { value: null, type: 3 } : this.left.execute(environment);
        const rightValue = (this.right == null) ? { value: null, type: 3 } : this.right.execute(environment);

        if (leftValue == null || rightValue == null || leftValue == undefined || rightValue == undefined) errores.push(new Error_(this.line, this.column, 'Semantico', 'Operador no definido'));
        else {
            switch (this.type) {
                case ArithmeticOption.PLUS:
                    switch (this.tipoDominante(leftValue.type, rightValue.type)) {
                        case Type.STRING:
                            return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING };
                        case Type.NUMBER:
                            return { value: (leftValue.value + rightValue.value), type: Type.NUMBER };
                        default:
                            errores.push(new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type));
                    }
                case ArithmeticOption.MINUS:
                    switch (this.tipoDominante(leftValue.type, rightValue.type)) {
                        case Type.STRING:
                            errores.push(new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type));
                        case Type.NUMBER:
                            return { value: (leftValue.value - rightValue.value), type: Type.NUMBER };
                        default:
                            errores.push(new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type));
                    }
                case ArithmeticOption.TIMES:
                    switch (this.tipoDominante(leftValue.type, rightValue.type)) {
                        case Type.NUMBER:
                            return { value: (leftValue.value * rightValue.value), type: Type.NUMBER };
                        default:
                            errores.push(new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type));
                    }
                case ArithmeticOption.POWER:
                    switch (this.tipoDominante(leftValue.type, rightValue.type)) {
                        case Type.NUMBER:
                            return { value: (Math.pow(leftValue.value, rightValue.value)), type: Type.NUMBER };
                        default:
                            errores.push(new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type));
                    }
                case ArithmeticOption.MOD:
                    switch (this.tipoDominante(leftValue.type, rightValue.type)) {
                        case Type.NUMBER:
                            return { value: (leftValue.value % rightValue.value), type: Type.NUMBER };
                        default:
                            errores.push(new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type));
                    }
                default:
                    switch (this.tipoDominante(leftValue.type, rightValue.type)) {
                        case Type.NUMBER:
                            if (rightValue.value == 0)
                                errores.push(new Error_(this.line, this.column, "Semantico", "No se puede dividir entre 0"));
                            return { value: (leftValue.value / rightValue.value), type: Type.NUMBER };
                        default:
                            errores.push(new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type));
                    }
            }
        }
    }
}