import { _Optimizer } from './Optimizer';
import { Rule } from './Rule';

export class Label {

    constructor(public label: string, public line: number, public column: number) { }

    regla1(env: _Optimizer) {
        if (env.label != this.label) {
            env.flag = false;
            env.salida += env.temp;
            env.salida += this.label + ":\n";
        }
        else if (!env.flag) {
            env.salida += env.temp;
            env.salida += this.label + ":\n";
        } 
        else env.reglas.push(new Rule(this.line, 'Bloque', "Regla 1", env.temp, ""));

        env.temp = "";
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
        env.flag = false;
    }
    optimize(env: _Optimizer) {
        env.salida += this.label + ":\n";
    }
}