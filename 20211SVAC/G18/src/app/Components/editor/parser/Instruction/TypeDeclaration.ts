import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { _Type } from "../Types/Type";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Array } from '../Object/Array';
import { _Struct } from '../Object/Struct';
import { _Console } from '../Util/Salida';
import { Symbol } from "../Symbol/Symbol";

export class TypeDeclaration extends Instruction {

    public translate(environment: Environment): String {
        let result = "";
        this.content.forEach(element => {
            _Console.saveInHeap(_Console.heapPointer, element.id);
            _Console.symbols.set(element.id, new Symbol(-1, element.id, element.type.name, 'Local'));
            result += "t" + _Console.count + " = h + " + _Console.heapPointer + ";\n";
            _Console.count++;
            _Console.heapPointer++;
            result += "Heap[(int)t" + (_Console.count - 1) + "];\n";
            _Console.saveInHeap(_Console.heapPointer, element.type.name);
            console.log('agregando', element);
        });
        return result;
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Declaracion " + this.id + "\"];";
        return result;
    }

    constructor(private id: string, private content: any[], line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {

    }

}