import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { Literal } from "../Expression/Literal";
import { _Type } from "../Types/Type";
import { isNumber, isString, isBoolean, isArray } from "util";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { _Array } from '../Object/Array';
import { ArrayType } from '../Types/Array';
import { _Struct } from '../Object/Struct';
import { _Console } from '../Util/Salida';
import { environment } from 'src/environments/environment';
import { env } from 'process';
import { Symbol } from '../Symbol/Symbol';

export class ArrayDeclaration extends Instruction {

    private translateDimension(dimNumber: number, value: Expression, environment: Environment): String {
        let result = value.translate(environment);
        let lengthTemp = _Console.count - 1;
        let heapTemp = _Console.count;
        result += "t" + _Console.count + " = h + " + _Console.heapPointer + ";\n";
        _Console.count++;
        let pointerTemp = _Console.count;
        result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + lengthTemp + ";\n";
        result += "t" + _Console.count + " = 0;\n";
        _Console.count++;
        result += "l" + _Console.labels + ":\n";
        result += "t" + heapTemp + " = t" + heapTemp + " + 1;\n";
        result += "t" + pointerTemp + " = t" + pointerTemp + " + 1;\n";
        _Console.saveInHeap((_Console.heapPointer), 0);
        if (dimNumber > 1) result += "Heap[(int)t" + heapTemp + "] = -1;\n";
        else result += "Heap[(int)t" + heapTemp + "] = 0;\n";

        result += "t" + _Console.count + " = t" + pointerTemp + " <= t" + lengthTemp + ";\n";
        result += "if(t" + _Console.count + ") goto l" + _Console.labels + ";\n";
        _Console.labels++;
        _Console.heapPointer++;
        return result;
    }

    public translate(environment: Environment): String {
        let result = "// Inicializacion de Array\n";
        let _heapInitial = _Console.heapPointer;
        result += this.translateDimension(this.type.dimensions, this.value, environment);
        let ambito = (environment.getAnterior() == null) ? "Global" : "Local";
        _Console.symbols.set(this.id, new Symbol(_Console.stackPointer, this.id, 5, ambito))
        environment.guardar(this.id, _Console.stackPointer, 5);
        _Console.saveInStack(_Console.stackPointer, _heapInitial);
        let initTerminal = _Console.count;
        _Console.count++;
        result += "t" + initTerminal + " = h + " + _heapInitial + ";\n";
        _Console.saveInHeap(_heapInitial, (_Console.heapPointer - _heapInitial - 1));
        result += "t" + _Console.count + " = " + "p + " + _Console.stackPointer + ";\n";
        _Console.stackPointer++;
        _Console.count++;
        result += "Stack[(int)t" + (_Console.count - 1) + "] = t" + initTerminal + ";\n";

        return result;
    }

    public plot(count: number): string {

        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Declaracion " + this.id + "\"];";

        // Hijo 1
        if (this.method != null) {
            result += "node" + count + "1[label=\"(" + this.method.line + "," + this.method.column + ") Metodo\"];";
            result += "node" + count + " -> " + "node" + count + "1;";
        }
        // Hijo 2
        if (this.type != null) {
            result += "node" + count + "2[label=\"(" + this.type.line + "," + this.type.column + ") Tipo\"];";
            result += "node" + count + " -> " + "node" + count + "2;";
        }
        // Hijo 3
        if (this.value != null) {
            result += "node" + count + "3[label=\"(" + this.value.line + "," + this.value.column + ") Valor\"];";
            result += "node" + count + " -> " + "node" + count + "3;";
        }
        return result;
    }

    constructor(private method: Literal, private type: ArrayType, private id: string, private value: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
    }

}