import { _Optimizer } from './Optimizer';

export class Return {

    constructor(line: number, column: number) { }

    regla1(env: _Optimizer) {
        env.salida += env.temp;
        env.temp = "";
    }
    regla2(env: _Optimizer) {
        env.temp = "";
    }
    regla3(env: _Optimizer) {
        env.temp = "";
    }
    regla4(env: _Optimizer) {
        env.temp = "";
    }
    regla5(env: _Optimizer) {
        env.temp = "";
    }
    optimize(env: _Optimizer) {

    }
}