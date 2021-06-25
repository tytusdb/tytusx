import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';

export class Break extends Instruction {
    public translate(environment: Environment): String {
        // TODO arreglar break y return 
        return "goto l" + environment.getLastL() + ";\n";
    }

    public plot(count: number): string {
        return "node" + count + "[label=\"(" + this.line + "," + this.column + ") Break\"];";;
    }

    constructor(line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        return { line: this.line, column: this.column, type: 'Break' };
    }
}