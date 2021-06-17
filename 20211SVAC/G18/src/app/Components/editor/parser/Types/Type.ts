import { Expression } from "../Abstract/Expression";
import { Retorno, Type, getTypeName } from "../Abstract/Retorno";
import { _Optimizer } from '../Optimizer/Optimizer';
import { Environment } from '../Symbol/Environment';

export class _Type extends Expression {
    public build(): String {
        throw new Error('Method not implemented.');
    }
    public translate(environment: Environment): String {
        throw new Error('Method not implemented.');
    }

    constructor(private name: string, private type: number, line: number, column: number) {
        super(line, column);
    }
    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Tipo:" + this.name + "\"];";

        return result;
    }

    public execute(): Retorno {
        return { value: this.name, type: this.type };
    }
}