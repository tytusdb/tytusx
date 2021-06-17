import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { _Type } from '../Types/Type';
import { Param } from '../Expression/Param';
import { _Console } from '../Util/Salida';
import { Symbol } from '../Symbol/Symbol';

export class Function extends Instruction {
    public translate(environment: Environment): String {
        // Nuevo entorno
        let newEnv = new Environment(environment);
        let initialPointer = _Console.stackPointer;
        newEnv.setP(initialPointer);
        newEnv.setLastL(_Console.labels);
        _Console.labels++;
        // Guardar parametros
        this.parametros.forEach(element => {
            _Console.symbols.set(element.id, new Symbol(_Console.stackPointer, element.id, element.type.execute().type, 'Local'));
            newEnv.variables.set(element.id, new Symbol(_Console.stackPointer, element.id, element.type.execute().type, 'Local'));
            _Console.stackPointer++;
        });
        newEnv.setP(_Console.stackPointer);
        _Console.stackPointer = 1;
        environment.guardarFuncion(this.id, this);
        let result = "void " + this.id + "() {\n";
        result += this.statment.translate(newEnv);
        result += "\nl" + newEnv.getLastL() + ":\n";
        result += "return; \n"
        result += "}\n\n";
        // lo mando a salida para no meterlo en mi void
        _Console.salida += result;
        _Console.stackPointer = initialPointer;
        return "";

    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Funcion:" + this.id + "\"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.statment.line + "," + this.statment.column + ") Elemento\"];";
        result += this.statment.plot(Number(count + "1"));
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        return result;
    }

    htmlRow() {
        let result = "";
        result += "<td>Instrucciones</td>" + "<td>" + this.id + "</td>" + "<td>Funcion</td>";
        return result;
    }

    constructor(private id: string, public statment: Instruction, public parametros: Array<Param>, public type: _Type, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        environment.guardarFuncion(this.id, this);
    }
}

