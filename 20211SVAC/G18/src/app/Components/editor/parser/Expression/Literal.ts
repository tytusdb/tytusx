import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Console } from '../Util/Salida';
import { _Optimizer } from '../Optimizer/Optimizer';

export class Literal extends Expression {
    public build(): String {
       let env = new Environment(null);
       return this.execute(env).value;
    }

    public translate(environment: Environment): String {
        let result = "";
        if (this.type == 1) {
            let nwStr: String = this.fixString(this.value);
            result += "Heap[" + _Console.heapPointer + "] = " + nwStr.length + ";\n";
            _Console.saveInHeap(_Console.heapPointer, nwStr.length);
            _Console.heapPointer++;
            for (let index = 0; index < nwStr.length; index++) {
                _Console.saveInHeap(_Console.heapPointer, nwStr.charCodeAt(index));
                result += "Heap[" + _Console.heapPointer + "] = " + nwStr.charCodeAt(index) + ";\n";
                _Console.heapPointer++;
            }
            result += "t" + _Console.count + " = h + " + (_Console.heapPointer - nwStr.length - 1) + ";\n";
            _Console.printOption = this.type;
        }
        else if (this.type == 2) {
            result += "t" + _Console.count + " = " + ((this.value == 'true') ? 1 : 0) + ";\n";
            _Console.printOption = this.type;
        }
        else if (this.type == 0){
            result += "t" + _Console.count + " = " + this.value + ";\n";
            if(String(this.value).includes('.')) _Console.printOption = 9;
            else _Console.printOption = this.type;
        }
        else {
            result += "t" + _Console.count + " = " + this.value + ";\n";
            _Console.printOption = this.type;
        }
        _Console.count++;
        return result;
    }

    constructor(private value: any, line: number, column: number, public type: number) {
        super(line, column);
    }
    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Literal\"];";
        return result;
    }

    private fixString(str: String) {
        let result = str;
        if (str.endsWith('"')) result = str.replace(/\"/g, "");
        if (str.endsWith("'")) result = str.replace(/\'/g, "");
        result = result.replace(/\\t/g, '  ');
        result = result.replace(/\\n/g, '\n');
        result = result.replace(/\\r/g, '\n');

        return result;
    }

    private stringTemplateParser(expression: string, environment: Environment) {
        const templateMatcher = /\${\s?([^{}\s]*)\s?}/g;
        let text = expression.replace(templateMatcher, (substring, value, index) => {
            value = environment.getVar(value);
            if (value == null)
                errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no definida'));
            return value.valor;
        });
        let result = text.replace(/`/g, "");
        result = result.replace(/\\t/g, '  ');
        result = result.replace(/\\n/g, '\n');
        result = result.replace(/\\r/g, '\n');
        return result;
    }

    public execute(environment: Environment): Retorno {
        switch (this.type) {
            case 0:
                return { value: Number(this.value), type: Type.NUMBER };
            case 1:
                return { value: this.fixString(this.value), type: Type.STRING };
            case 2:
                return { value: (this.value == 'false') ? false : true, type: Type.BOOLEAN };
            case 6:
                return { value: this.stringTemplateParser(this.value, environment), type: Type.STRING };
            default:
                return { value: this.value, type: Type.STRING };
        }
    }
}