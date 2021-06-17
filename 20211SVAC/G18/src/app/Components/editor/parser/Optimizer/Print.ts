import { Expression } from '../Abstract/Expression';
import { _Optimizer } from './Optimizer';

export class Print {

    constructor(public content: string, public expression: Expression, line: number, column: number) { }

    build(): string {
        if (this.expression == null)
            return "printf(" + this.content + ");\n";
        else
            return "printf(" + this.content + ", " + this.expression.build() + ");\n";
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
        env.salida += this.build();
    }
    optimize(env: _Optimizer) {

    }
}