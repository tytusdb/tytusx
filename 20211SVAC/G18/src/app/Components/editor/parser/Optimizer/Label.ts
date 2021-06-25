import { _Optimizer } from './Optimizer';
import { Rule } from './Rule';

export class Label {

    constructor(public label: string, public line: number, public column: number) { }

    regla1(env: _Optimizer) {
        if (env.label != this.label) {
            env.flag = false;
            env.salida += env.temp;
        }
        else if (!env.flag) env.salida += env.temp;
        else env.reglas.push(new Rule(this.line, 'Mirilla', "Regla 1", env.temp, ""));

        env.temp = "";
        env.salida += this.label + ":\n";
    }
    regla2(env: _Optimizer) {
        env.salida += this.label + ":\n";
    }
    regla3(env: _Optimizer) {
        env.salida += this.label + ":\n";
    }
    regla4(env: _Optimizer) {
        env.salida += this.label + ":\n";
    }
    regla5(env: _Optimizer) {
        env.salida += this.label + ":\n";
    }
    optimize(env: _Optimizer) {

    }
}