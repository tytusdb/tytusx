import { EmailValidator } from '@angular/forms';
import { _Optimizer } from './Optimizer';
import { Rule } from './Rule';

export class Goto {

    constructor(public label: string, public line: number, column: number) { }

    regla1(env: _Optimizer) {
        env.label = this.label;
        env.flag = true;
        env.temp += "goto " + this.label + ";\n";
    }

    regla2(env: _Optimizer) {
        if (env.flag) {
            let temp = env.temp + " = !" + env.temp + ";\n";
            temp += "if(" + env.temp + ") goto " + this.label + ";\n";
            env.salida += temp;
            env.reglas.push(new Rule(this.line, "Mirilla", "Regla 2", "goto " + this.label + ";\n", temp));
        } else {
            env.salida += "goto " + this.label + ";\n";
        }
        env.flag = false;
    }

    regla3(env: _Optimizer) {
        if (!env.flag) env.salida += "goto " + this.label + ";\n";
        else env.reglas.push(new Rule(this.line, "Mirilla", "Regla 3", "goto " + this.label + ";\n", ""))

        env.flag = false;

    }
    regla4(env: _Optimizer) {
        env.salida += "goto " + this.label + ";\n";
    }
    regla5(env: _Optimizer) {
        env.salida += "goto " + this.label + ";\n";
    }
    optimize(env: _Optimizer) {
        // Regla 1

    }
}