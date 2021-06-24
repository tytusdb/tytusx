import { Expression } from "../Abstract/Expression";
import { Retorno, Type, getTypeName } from "../Abstract/Retorno";
import { _Optimizer } from '../Optimizer/Optimizer';
import { Environment } from '../Symbol/Environment';
import { _Type } from './Type';

export class ArrayType extends Expression {
    public build(): String {
        throw new Error('Method not implemented.');
    }
    public translate(environment: Environment): String {
        throw new Error('Method not implemented.');
    }

    constructor(public type: _Type, public dimensions: number, line: number, column: number) {
        super(line, column);
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Tipo: " + this.type.execute().value + " Array de " + this.dimensions + " Dimensiones\"];";
        return result;
    }

    public execute(): Retorno {
        return { value: this.dimensions, type: this.type.execute().type };
    }
}