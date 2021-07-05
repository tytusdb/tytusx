import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Retorno } from "../Abstract/Retorno";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Console } from '../Util/Salida';

export class Access extends Expression {
    public build(): String {
        throw new Error('Method not implemented.');
    }
    public translate(environment: Environment): String {
        let result = "";
        if (this.id instanceof Array) {
            let smb = environment.getVar(this.id[0]);
            if (smb != undefined) {
                result += "t" + _Console.count + " = p + " + smb.valor + ";\n";
                _Console.count++;
                let initalIndex = _Console.count;
                result += "t" + _Console.count + " = " + "Stack[(int)t" + (_Console.count - 1) + "];\n";
                result += "t" + _Console.count + " = " + "t" + (_Console.count) + " + 1;\n";
                _Console.count++;
                for (let dim in this.id) {
                    if (dim != '0') {
                        result += this.id[dim][0].translate(environment);
                        result += "t" + initalIndex + " = t" + initalIndex + " + t" + (_Console.count - 1) + ";\n";
                    }
                }
                result += "t" + _Console.count + " = Heap[(int)t" + initalIndex + "];\n";
                _Console.count++;
            } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
        }
        else {
            let smb = environment.getVar(this.id);
            if (smb != undefined) {
                let stackIndex = smb.valor;
                result += "t" + _Console.count + " = p + " + (stackIndex) + ";\n";
                _Console.count++;
                result += "t" + _Console.count + " = " + "Stack[(int)t" + (_Console.count - 1) + "];\n";
                _Console.count++;
                _Console.printOption = smb.type;
            } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
        }
        return result;
    }

    constructor(private id: any, line: number, column: number) {
        super(line, column);
    }

    public getID() { return this.id }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") " + this.id + ": Acceso\"];";
        return result;
    }

    public execute(environment: Environment): Retorno {
        const symbol = environment.getVar(this.id);
        if (symbol == null)
            errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no definida'));
        else return { value: symbol.valor, type: symbol.type };
    }
}