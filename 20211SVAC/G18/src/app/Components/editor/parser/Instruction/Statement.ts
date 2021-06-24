import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { errores } from "../Errores";

export class Statement extends Instruction {
    public translate(environment: Environment): String {
        let result = "";
        for (const instr of this.code) result += instr.translate(environment);
        return result;
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Statement\"];";;
        let temp = 1;
        this.code.forEach(element => {
            result += element.plot(Number(count + "" + temp));
            result += "node" + count + " -> " + "node" + count + "" + temp + ";";
            temp++;
        });
        return result;
    }

    constructor(private code: Array<Instruction>, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        // const newEnv = new Environment(env);
        for (const instr of this.code) {
            try {
                const element = instr.execute(env);
                if (element != undefined || element != null)
                    return element;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
