import { Expression } from "../Abstract/Expression";
import { _Optimizer } from './Optimizer';
export class ArrayAssignation {

    constructor(public id: string, public index: Expression, public expr: Expression, line: number, column: number) { }

    build(): string {
        return this.id + "[" + this.index.build() + "] = " + this.expr.build() + ";\n";
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
        console.log('se esta optimizando');
    }
}