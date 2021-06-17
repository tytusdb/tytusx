import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Retorno } from "../Abstract/Retorno";
import { _Type } from '../Types/Type';
import { _Optimizer } from '../Optimizer/Optimizer';

export class Param extends Expression {
    public build(): String {
        throw new Error('Method not implemented.');
    }
    public translate(environment: Environment): String {
        throw new Error('Method not implemented.');
    }

    constructor(public id: string, public type: _Type, line: number, column: number) {
        super(line, column);
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") " + this.id + ": Parametro\";";
        return result;
    }

    public execute(): Retorno {
        if (this.type.execute().type == 5) return { value: this.id, type: this.type.execute().value }
        return { value: this.id, type: this.type.execute().type }
    }
}