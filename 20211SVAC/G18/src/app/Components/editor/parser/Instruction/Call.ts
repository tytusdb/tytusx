import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';
import { Retorno } from "../Abstract/Retorno";
import { Function } from "./Function";

export class Call extends Instruction {

    public translate(environment: Environment): String {
        // // let result = "// Inicia Llamada\n";
        // // let iniciaP = _Console.stackPointer;
        // // let tempPointer = iniciaP;
        // // this.expresiones.forEach(element => {
        // //     result += element.translate(environment);
        // //     result += "t" + _Console.count + " = p + " + (tempPointer + environment.getP()) + ";\n";
        // //     result += "Stack[(int)t" + _Console.count + "] = t" + (_Console.count - 1) + ";\n";
        // //     tempPointer++;
        // //     _Console.count++;
        // // });
        // // if (this.id instanceof Access) {
        // //     let fnc = environment.getFuncion(this.id.getID());
        // //     if(fnc == undefined) {
        // //         errores.push(new Error_(this.line, this.column, 'Semantico', 'Funcion no definida'));
        // //         return '';
        // //     }
        // //     result += "p = p + " + (iniciaP + environment.getP()) + ";\n";
        // //     result += this.id.getID() + "();\n"
        // //     result += "t" + _Console.count + " = p + " + (fnc.parametros.length) + ";\n";
        // //     _Console.count++;
        // //     result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
        // //     _Console.count++;
        // //     result += "p = p - " + (iniciaP + environment.getP()) + ";\n";
        // // }
        // // else if (this.id instanceof Property) {
        // //     let strId = this.id.id.id;
        // //     let smb = _Console.symbols.get(strId);
        // //     if (smb != undefined) {
        // //         let strIndex = smb.valor;
        // //         let originalIndex, sizeTemp, newStrInd, pointerTemp, labelInicio, labelSalida, originTemp;
        // //         switch (this.id.getProperty().toLowerCase()) {
        // //             case "charat":
        // //                 result += "// Inicia CharAt\n";
        // //                 // Obtener string
        // //                 result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = p + " + (_Console.stackPointer - 1) + ";\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = t" + (_Console.count - 1) + " + t" + (_Console.count - 3) + ";\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = t" + (_Console.count - 1) + " + 1;\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
        // //                 _Console.count++;
        // //                 result += "// Finaliza CharAt\n";
        // //                 _Console.printOption = 10;
        // //                 break;
        // //             case "tolowercase":
        // //                 result += "// Inicia ToLowerCase\n";
        // //                 // Obtener string
        // //                 result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
        // //                 _Console.count++;
        // //                 originalIndex = _Console.count;
        // //                 result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
        // //                 _Console.count++;
        // //                 // obtiene el size del string
        // //                 sizeTemp = _Console.count;
        // //                 result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
        // //                 _Console.count++;
        // //                 // obtiene la nueva direccion para la string
        // //                 newStrInd = _Console.count;
        // //                 result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
        // //                 _Console.count++;
        // //                 result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
        // //                 _Console.saveInHeap(_Console.heapPointer, _Console.heap[_Console.stack[strIndex]]);
        // //                 _Console.heapPointer++;
        // //                 pointerTemp = _Console.count;
        // //                 result += "t" + pointerTemp + " = t" + newStrInd + " + t" + sizeTemp + ";\n";
        // //                 _Console.count++;
        // //                 labelInicio = _Console.labels;
        // //                 result += "l" + labelInicio + ":\n";
        // //                 _Console.labels++;
        // //                 result += "t" + originalIndex + " = t" + originalIndex + " + 1;\n";
        // //                 originTemp = _Console.count;
        // //                 result += "t" + _Console.count + " = Heap[(int)t" + originalIndex + "];\n";
        // //                 _Console.count++;
        // //                 // Ver si es letra
        // //                 result += "t" + _Console.count + " = t" + originTemp + " > 64;\n";
        // //                 _Console.count++;
        // //                 result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 labelSalida = _Console.labels;
        // //                 result += "goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 result += "l" + (_Console.labels - 2) + ":\n";
        // //                 result += "t" + _Console.count + " = t" + (_Console.count - 2) + " < 91;\n";
        // //                 _Console.count++;
        // //                 result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 result += "goto l" + labelSalida + ";\n";
        // //                 result += "l" + (_Console.labels - 1) + ":\n";
        // //                 result += "t" + _Console.count + " = t" + originTemp + " + 32;\n";
        // //                 result += "goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 result += "l" + labelSalida + ":\n";
        // //                 result += "t" + _Console.count + " = t" + originTemp + ";\n";
        // //                 _Console.count++;
        // //                 result += "l" + (_Console.labels - 1) + ":\n";
        // //                 // Guardar nueva string en heap
        // //                 result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
        // //                 result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = t" + newStrInd + " <= t" + pointerTemp + ";\n";
        // //                 _Console.count++;
        // //                 result += "if(t" + (_Console.count - 1) + ") goto l" + labelInicio + ";\n";
        // //                 result += "t" + _Console.count + " = t" + newStrInd + " - t" + sizeTemp + ";\n";
        // //                 _Console.count++;
        // //                 _Console.printOption = 1;
        // //                 result += "// Finaliza ToLowerCase\n";
        // //                 break;
        // //             case "touppercase":
        // //                 result += "// Inicia ToUpperCase\n";
        // //                 // Obtener string
        // //                 result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
        // //                 _Console.count++;
        // //                 originalIndex = _Console.count;
        // //                 result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
        // //                 _Console.count++;
        // //                 // obtiene el size del string
        // //                 sizeTemp = _Console.count;
        // //                 result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
        // //                 _Console.count++;
        // //                 // obtiene la nueva direccion para la string
        // //                 newStrInd = _Console.count;
        // //                 result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
        // //                 _Console.count++;
        // //                 result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
        // //                 _Console.saveInHeap(_Console.heapPointer, _Console.heap[_Console.stack[strIndex]]);
        // //                 _Console.heapPointer++;
        // //                 pointerTemp = _Console.count;
        // //                 result += "t" + pointerTemp + " = t" + newStrInd + " + t" + sizeTemp + ";\n";
        // //                 _Console.count++;
        // //                 labelInicio = _Console.labels;
        // //                 result += "l" + labelInicio + ":\n";
        // //                 _Console.labels++;
        // //                 result += "t" + originalIndex + " = t" + originalIndex + " + 1;\n";
        // //                 originTemp = _Console.count;
        // //                 result += "t" + _Console.count + " = Heap[(int)t" + originalIndex + "];\n";
        // //                 _Console.count++;
        // //                 // Ver si es letra
        // //                 result += "t" + _Console.count + " = t" + originTemp + " > 96;\n";
        // //                 _Console.count++;
        // //                 result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 labelSalida = _Console.labels;
        // //                 result += "goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 result += "l" + (_Console.labels - 2) + ":\n";
        // //                 result += "t" + _Console.count + " = t" + (_Console.count - 2) + " < 123;\n";
        // //                 _Console.count++;
        // //                 result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 result += "goto l" + labelSalida + ";\n";
        // //                 result += "l" + (_Console.labels - 1) + ":\n";
        // //                 result += "t" + _Console.count + " = t" + originTemp + " - 32;\n";
        // //                 result += "goto l" + _Console.labels + ";\n";
        // //                 _Console.labels++;
        // //                 result += "l" + labelSalida + ":\n";
        // //                 result += "t" + _Console.count + " = t" + originTemp + ";\n";
        // //                 _Console.count++;
        // //                 result += "l" + (_Console.labels - 1) + ":\n";
        // //                 // Guardar nueva string en heap
        // //                 result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
        // //                 result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
        // //                 _Console.count++;
        // //                 result += "t" + _Console.count + " = t" + newStrInd + " <= t" + pointerTemp + ";\n";
        // //                 _Console.count++;
        // //                 result += "if(t" + (_Console.count - 1) + ") goto l" + labelInicio + ";\n";
        // //                 result += "t" + _Console.count + " = t" + newStrInd + " - t" + sizeTemp + ";\n";
        // //                 _Console.count++;
        // //                 _Console.printOption = 1;
        // //                 result += "// Finaliza ToUpperCase\n";
        // //                 break;
        // //             case "concat":
        // //                 let smb2 = _Console.symbols.get(this.expresiones[0].id);
        // //                 if (smb2 != undefined) {
        // //                     let strIndex2 = smb2.valor;
        // //                     result += "// Inicia concat\n";
        // //                     // Obtener string
        // //                     result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
        // //                     _Console.count++;
        // //                     originalIndex = _Console.count;
        // //                     result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
        // //                     _Console.count++;
        // //                     // obtiene el size del string
        // //                     sizeTemp = _Console.count;
        // //                     result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
        // //                     _Console.count++;
        // //                     // Obtener string2
        // //                     result += "t" + _Console.count + " = p + " + (strIndex2) + ";\n";
        // //                     _Console.count++;
        // //                     let originalIndex2 = _Console.count;
        // //                     result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
        // //                     _Console.count++;
        // //                     // obtiene el size del string2
        // //                     let sizeTemp2 = _Console.count;
        // //                     result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
        // //                     _Console.count++;
        // //                     // Suma los size
        // //                     let newSizeTemp = _Console.count;
        // //                     result += "t" + _Console.count + " = t" + sizeTemp + " + t" + sizeTemp2 + ";\n";
        // //                     _Console.count++;
        // //                     // obtiene la nueva direccion para la string
        // //                     newStrInd = _Console.count;
        // //                     result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
        // //                     _Console.count++;
        // //                     result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
        // //                     _Console.saveInHeap(_Console.heapPointer, _Console.heap[_Console.stack[strIndex]]);
        // //                     _Console.heapPointer++;
        // //                     // Copia la primer string
        // //                     pointerTemp = _Console.count;
        // //                     _Console.count++;
        // //                     result += "t" + pointerTemp + " = 0;\n";
        // //                     result += "l" + _Console.labels + ":\n";
        // //                     _Console.labels++;
        // //                     result += "t" + pointerTemp + " = t" + pointerTemp + " + 1;\n";
        // //                     result += "t" + originalIndex + " = t" + originalIndex + " + 1;\n";
        // //                     result += "t" + _Console.count + " = Heap[(int)t" + originalIndex + "];\n";
        // //                     _Console.count++;
        // //                     result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
        // //                     result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
        // //                     _Console.count++;
        // //                     result += "t" + _Console.count + " = t" + pointerTemp + " <= t" + sizeTemp + ";\n";
        // //                     _Console.count++;
        // //                     result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
        // //                     // Copia la segunda string
        // //                     pointerTemp = _Console.count;
        // //                     _Console.count++;
        // //                     result += "t" + pointerTemp + " = 0;\n";
        // //                     result += "l" + _Console.labels + ":\n";
        // //                     _Console.labels++;
        // //                     result += "t" + pointerTemp + " = t" + pointerTemp + " + 1;\n";
        // //                     result += "t" + originalIndex2 + " = t" + originalIndex2 + " + 1;\n";
        // //                     result += "t" + _Console.count + " = Heap[(int)t" + originalIndex2 + "];\n";
        // //                     _Console.count++;
        // //                     result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
        // //                     result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
        // //                     _Console.count++;
        // //                     result += "t" + _Console.count + " = t" + pointerTemp + " <= t" + sizeTemp2 + ";\n";
        // //                     _Console.count++;
        // //                     result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
        // //                     result += "t" + _Console.count + " = t" + newStrInd + " - t" + newSizeTemp + ";\n";
        // //                     _Console.count++;
        // //                     _Console.printOption = 1;
        // //                     result += "// Finaliza concat\n";
        // //                 } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
        // //                 break;
        // //             default:
        // //                 errores.push(new Error_(this.line, this.column, 'Semantico', 'Propiedad no exitente'));
        // //                 break

        // //         }
        // //     } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
        // // }

        // return result + "// Finaliza Llamada\n";
        return "";
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Llamada\"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.line + "," + this.column + ") ID\"];";
        // Hijo 2
        result += "node" + count + "2[label=\"(" + this.line + "," + this.column + ") Statement\"];";
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";
        return result;
    }

    constructor(private id: string, private parameters: Array<Expression>, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        const p_function: Function = environment.getFuncion(this.id);
        // Semantic Errors
        // 1. Function not defined
        if (p_function == null) {
            environment.save_error(this.line, this.column, "Llamada a función no definida");
        }
        // 2. Parameters number invalid
        else if (
            (
                (this.parameters != null && p_function.parameters != null)
                && (this.parameters.length != p_function.parameters.length)
            )
            || (
                (this.parameters == null && p_function.parameters != null)
                || (this.parameters != null && p_function.parameters == null)
            )
        ) {
            environment.save_error(this.line, this.column, "Numero de parametros invalidos");
        }
        // Validated
        else {
            const local_environment = new Environment(environment, environment.xmlEnvironment);
            // Save local variables
            if (this.parameters != null) {
                for (let index = 0; index < this.parameters.length; index++) {
                    const parameter: Retorno = this.parameters[index].execute(environment);
                    const p_parameter: Retorno = p_function.parameters[index].execute(environment);
                    // Semantic Errors
                    // 3. Parameters with different type
                    if (parameter.type != p_parameter.type) {
                        environment.save_error(this.line, this.column, "Tipo no corresponde a la función");
                    }
                    else {
                        // Saving parameters and executing function
                        local_environment.guardar(p_parameter.value, parameter.value, parameter.type);
                        const result = p_function.statment.execute(local_environment);
                        // console.log(result);
                    }
                }
            }

        }
    }
}