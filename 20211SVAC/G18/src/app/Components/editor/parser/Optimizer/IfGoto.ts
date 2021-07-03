import { env } from 'process';
import { Expression } from '../Abstract/Expression';
import { Literal } from '../Expression/Literal';
import { Relational, RelationalOption } from '../Expression/Relational';
import { Environment } from '../Symbol/Environment';
import { _Optimizer } from './Optimizer';
import { Rule } from './Rule';

export class IfGoto {

    constructor(public condition: Expression, public label: string, public line: number, column: number) { }

    build(): string {
        return "if(" + this.condition.build() + ") goto " + this.label + ";\n";
    }

    build_opossite(): string {
        if (this.condition instanceof Relational) {
            return "if(" + this.condition.build_opossite() + ") goto " + this.label + ";\n";
        }
        else return this.build();
    }

    regla1(env: _Optimizer) {
        env.temp += this.build();
    }

    regla2(env: _Optimizer) {
        env.flag = true;
        if (this.condition instanceof Relational) {
            env.temp = this.condition.build_opossite().toString();
        }
        else {
            env.temp += this.build();
        } 

        env.label += this.label;
    }

    regla3(env: _Optimizer) {
        if (this.condition instanceof Relational) {
            if(this.condition.left instanceof Literal && this.condition.right instanceof Literal){
                if(
                    (this.condition.left.value == this.condition.right.value && this.condition.type == RelationalOption.EQUAL) ||
                    (this.condition.left.value > this.condition.right.value && this.condition.type == RelationalOption.GREATER) ||
                    (this.condition.left.value >= this.condition.right.value && this.condition.type == RelationalOption.GREATEROREQUAL) ||
                    (this.condition.left.value < this.condition.right.value && this.condition.type == RelationalOption.LESS) ||
                    (this.condition.left.value <= this.condition.right.value && this.condition.type == RelationalOption.LESSOREQUAL) ||
                    (this.condition.left.value != this.condition.right.value && this.condition.type == RelationalOption.NOTEQUAL) 
                ){
                    env.salida += "goto " + this.label + ";\n";
                    env.flag = true;
                    return;
                }
            }
        } 
        env.salida += this.build();
        
    }

    regla4(env: _Optimizer) {
        if (this.condition instanceof Relational) {
            if(this.condition.left instanceof Literal && this.condition.right instanceof Literal){
                if(
                    (this.condition.left.value != this.condition.right.value && this.condition.type == RelationalOption.EQUAL) ||
                    (this.condition.left.value <= this.condition.right.value && this.condition.type == RelationalOption.GREATER) ||
                    (this.condition.left.value > this.condition.right.value && this.condition.type == RelationalOption.GREATEROREQUAL) ||
                    (this.condition.left.value >= this.condition.right.value && this.condition.type == RelationalOption.LESS) ||
                    (this.condition.left.value > this.condition.right.value && this.condition.type == RelationalOption.LESSOREQUAL) ||
                    (this.condition.left.value == this.condition.right.value && this.condition.type == RelationalOption.NOTEQUAL) 
                ){
                    env.flag = true;
                    return;
                }
            }
        } 
        env.salida += this.build();
        
    }
    regla5(env: _Optimizer) {
        env.salida += this.build();
    }

    optimize(env: _Optimizer) {
        env.salida += this.build();
    }
}