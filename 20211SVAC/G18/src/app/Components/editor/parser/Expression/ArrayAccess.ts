import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Retorno } from "../Abstract/Retorno";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { isArray, isNumber } from 'util';
import { _Array } from '../Object/Array';
import { _Struct } from '../Object/Struct';
import { _Console } from '../Util/Salida';
import { Literal } from './Literal';
import { _Optimizer } from '../Optimizer/Optimizer';

export class ArrayAccess extends Expression {
    
    public build(): String {
        if(this.cast != null) return this.id + "[(" + this.cast + ") " + this.index + "]";
        else return this.id + "[" + this.index + "]";
    }

    public translate(environment: Environment): String {
        return "";
    }

    constructor(private id: string, private cast: string, private index: string, line: number, column: number) {
        super(line, column);
    }

    public getID() { return this.id }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") " + this.id + ": Acceso\"];";
        return result;
    }

    public execute(environment: Environment): Retorno {
        return null;
    }
}