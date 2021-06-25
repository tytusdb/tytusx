import { Expression } from '../Abstract/Expression';
import { Relational } from '../Expression/Relational';
import { Environment } from '../Symbol/Environment';
import { _Optimizer } from './Optimizer';
import { Rule } from './Rule';

export class IfGoto {

    constructor(public condition: Expression, public label: string, public line: number, column: number) { }

    build(): string {
        return "if(" + this.condition.build() + ") goto " + this.label + ";\n";
    }

    regla1(env: _Optimizer) {
        env.temp += this.build();
    }

    regla2(env: _Optimizer) {
        if (this.condition instanceof Relational) {
            env.salida += this.build();
        } else {
            env.flag = true;
            env.temp += this.condition.build();
            env.label += this.label;
        }
    }

    regla3(env: _Optimizer) {
        if (this.condition instanceof Relational) {
            env.flag = (this.condition.execute(new Environment(null)).value);
            env.salida += this.build();
        } else {
            env.salida += this.build();
        }
    }

    regla4(env: _Optimizer) {
        if (this.condition instanceof Relational) {
            if (this.condition.execute(new Environment(null)).value) env.salida += this.build();
            else env.reglas.push(new Rule(this.line, "Mirilla", "Regla 4", this.build(), ""));
        } else {
            env.salida += this.build();
        }
    }
    regla5(env: _Optimizer) {
        env.salida += this.build();
    }

    optimize(env: _Optimizer) {

    }
}