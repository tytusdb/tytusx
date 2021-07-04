import { Expression } from "../Abstract/Expression";
import { Arithmetic, ArithmeticOption } from '../Expression/Arithmetic';
import { Literal } from "../Expression/Literal";
import { _Optimizer } from './Optimizer';
import { Rule } from "./Rule";
export class Assignation {

    constructor(public id: string, public expr: Expression, public line: number, column: number) { }

    build(): string {
        return this.id + " = " + this.expr.build() + ";\n";
    }

    regla1(env: _Optimizer) {
        env.temp += this.build();
    }
    regla2(env: _Optimizer) {
        env.salida += this.build();
    }
    regla3(env: _Optimizer) {
        env.salida += this.build();
    }
    regla4(env: _Optimizer) {
        env.salida += this.build();
    }

    regla5(env: _Optimizer) {
        if (this.expr instanceof Literal) {
            if (this.id == env.temp) {
                env.flag = true;
            }
            else if (env.label == this.id && env.temp == this.expr.value && !env.flag) {
                env.reglas.push(new Rule(this.line, 'Mirilla', "Regla 5", this.build(), ""));
                return;
            }
            else {
                env.temp = this.id;
                env.label = this.expr.value;
                env.flag = false;
            }
        }
        env.salida += this.build();
    }

    optimize(env: _Optimizer) {
        console.log("optimizando", this);
        if (this.expr instanceof Arithmetic) {
            let left = this.expr.left;
            let right = this.expr.right;
            if (left instanceof Literal && right instanceof Literal) {
                // regla 6 
                if (right.value == "0" && this.expr.type == ArithmeticOption.PLUS && left.value == this.id) {
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 6", "", this.build()))
                }
                else if (left.value == "0" && this.expr.type == ArithmeticOption.PLUS && right.value == this.id) {
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 6", "", this.build()))
                }
                // regla 7
                else if (right.value == "0" && this.expr.type == ArithmeticOption.MINUS && left.value == this.id) {
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 7", "", this.build()))
                }
                // regla 8
                else if (right.value == "1" && this.expr.type == ArithmeticOption.TIMES && left.value == this.id) {
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 8", "", this.build()))
                }
                else if (left.value == "1" && this.expr.type == ArithmeticOption.TIMES && right.value == this.id) {
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 8", "", this.build()))
                }
                // regla 9
                else if (right.value == "1" && this.expr.type == ArithmeticOption.DIV  && left.value == this.id) {
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 9", "", this.build()))
                }
                 // regla 10
                 else if (right.value == "0" && this.expr.type == ArithmeticOption.PLUS ) {
                    env.salida += this.id + " = " + left.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 10", "", this.build()))
                }
                else if (left.value == "0" && this.expr.type == ArithmeticOption.PLUS ) {
                    env.salida += this.id + " = " + right.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 10", "", this.build()))
                }
                // regla 11
                else if (right.value == "0" && this.expr.type == ArithmeticOption.MINUS ) {
                    env.salida += this.id + " = " + right.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 11", "", this.build()))
                }
                // regla 12
                else if (right.value == "1" && this.expr.type == ArithmeticOption.TIMES) {
                    env.salida += this.id + " = " + left.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 12", this.id + " = " + left.value + ";\n", this.build()))
                }
                else if (left.value == "1" && this.expr.type == ArithmeticOption.TIMES) {
                    env.salida += this.id + " = " + right.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 12", this.id + " = " + right.value + ";\n", this.build()))
                }
                // regla 13
                else if (right.value == "1" && this.expr.type == ArithmeticOption.DIV) {
                    env.salida += this.id + " = " + left.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 13", this.id + " = " + left.value + ";\n", this.build()))
                }
                // regla 14
                else if (right.value == "2" && this.expr.type == ArithmeticOption.TIMES) {
                    env.salida += this.id + " = " + left.value + " + " + left.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 14", this.id + " = " + left.value + " + " + left.value + ";\n", this.build()))
                }
                else if (left.value == "2" && this.expr.type == ArithmeticOption.TIMES) {
                    env.salida += this.id + " = " + right.value + " + " + right.value + ";\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 14", this.id + " = " + left.value + " + " + left.value + ";\n", this.build()))
                }
                // regla 15
                else if (right.value == "0" && this.expr.type == ArithmeticOption.TIMES) {
                    env.salida += this.id + " = 0;\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 15", this.id + " = 0;\n", this.build()))
                }
                // regla 16
                else if (left.value == "0" && this.expr.type == ArithmeticOption.DIV) {
                    env.salida += this.id + " = 0;\n";
                    env.reglas.push(new Rule(this.line, "Mirilla", "Regla 16", this.id + " = 0;\n", this.build()))
                }

            }
        }
        else env.salida += this.build();
    }
}