import { _Optimizer } from './Optimizer';
export class Call {

    constructor(public id: string, line: number, column: number) { }
    
    build(): string {
        return this.id + "();\n";
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
        env.salida += this.build();
    }
}