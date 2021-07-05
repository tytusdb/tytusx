import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Console } from '../Util/Salida';

export class Variable extends Expression {
    public build(): String {
        let result = "";
        return result;
    }

    public translate(environment: Environment): String {
        let result = "";
        return result;
    }

    constructor(private value: string, public type: string, line: number, column: number) {
        super(line, column);
    }
    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Literal\"];";
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

    private fixString(str: String) {
        let result = str;
        if (str.endsWith('"')) result = str.replace(/\"/g, "");
        if (str.endsWith("'")) result = str.replace(/\'/g, "");
        result = result.replace(/\\t/g, '  ');
        result = result.replace(/\\n/g, '\n');
        result = result.replace(/\\r/g, '\n');

        return result;
    }

    public execute(environment: Environment): Retorno {
        switch (this.type) {
            case "integer":
                return { value: this.value, type: Type.NUMBER }
            case "string":
                return { value: this.value, type: Type.STRING }
            default:
                environment.save_error(this.line, this.column, "Tipo no existente");
                return { value: this.value, type: Type.NULL }
        }
    }
}