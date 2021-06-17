import { Expression } from "../Abstract/Expression";
import { Arithmetic } from '../Expression/Arithmetic';
import { _Optimizer } from './Optimizer';
export class Assignation {

    constructor(public id: string, public expr: Expression, line: number, column: number) { }
    
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
        env.temp = this.id;
        if(this.expr instanceof Arithmetic) env.salida += this.expr.regla5(env);
        else env.salida += this.build();
        env.temp = "";
    }
    optimize(env: _Optimizer) {
        console.log('se esta optimizando');
    }
}