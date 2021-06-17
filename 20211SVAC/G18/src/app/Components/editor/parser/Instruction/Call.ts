import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Symbol } from "../Symbol/Symbol";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { Access } from '../Expression/Access';
import { Property } from '../Expression/Property';
import { _Array } from '../Object/Array';
import { _Type } from '../Types/Type';
import { ArrayType } from '../Types/Array';
import { isArray, isString } from 'util';
import { _Struct } from '../Object/Struct';
import { _Console } from '../Util/Salida';
import { Literal } from '../Expression/Literal';

export class Call extends Instruction {

    public translate(environment: Environment): String {
        let result = "// Inicia Llamada\n";
        let iniciaP = _Console.stackPointer;
        let tempPointer = iniciaP;
        this.expresiones.forEach(element => {
            result += element.translate(environment);
            result += "t" + _Console.count + " = p + " + (tempPointer + environment.getP()) + ";\n";
            result += "Stack[(int)t" + _Console.count + "] = t" + (_Console.count - 1) + ";\n";
            tempPointer++;
            _Console.count++;
        });
        if (this.id instanceof Access) {
            let fnc = environment.getFuncion(this.id.getID());
            if(fnc == undefined) {
                errores.push(new Error_(this.line, this.column, 'Semantico', 'Funcion no definida'));
                return '';
            }
            result += "p = p + " + (iniciaP + environment.getP()) + ";\n";
            result += this.id.getID() + "();\n"
            result += "t" + _Console.count + " = p + " + (fnc.parametros.length) + ";\n";
            _Console.count++;
            result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
            _Console.count++;
            result += "p = p - " + (iniciaP + environment.getP()) + ";\n";
        }
        else if (this.id instanceof Property) {
            let strId = this.id.id.id;
            let smb = _Console.symbols.get(strId);
            if (smb != undefined) {
                let strIndex = smb.valor;
                let originalIndex, sizeTemp, newStrInd, pointerTemp, labelInicio, labelSalida, originTemp;
                switch (this.id.getProperty().toLowerCase()) {
                    case "charat":
                        result += "// Inicia CharAt\n";
                        // Obtener string
                        result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = p + " + (_Console.stackPointer - 1) + ";\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = t" + (_Console.count - 1) + " + t" + (_Console.count - 3) + ";\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = t" + (_Console.count - 1) + " + 1;\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
                        _Console.count++;
                        result += "// Finaliza CharAt\n";
                        _Console.printOption = 10;
                        break;
                    case "tolowercase":
                        result += "// Inicia ToLowerCase\n";
                        // Obtener string
                        result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
                        _Console.count++;
                        originalIndex = _Console.count;
                        result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
                        _Console.count++;
                        // obtiene el size del string
                        sizeTemp = _Console.count;
                        result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
                        _Console.count++;
                        // obtiene la nueva direccion para la string
                        newStrInd = _Console.count;
                        result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
                        _Console.count++;
                        result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
                        _Console.saveInHeap(_Console.heapPointer, _Console.heap[_Console.stack[strIndex]]);
                        _Console.heapPointer++;
                        pointerTemp = _Console.count;
                        result += "t" + pointerTemp + " = t" + newStrInd + " + t" + sizeTemp + ";\n";
                        _Console.count++;
                        labelInicio = _Console.labels;
                        result += "l" + labelInicio + ":\n";
                        _Console.labels++;
                        result += "t" + originalIndex + " = t" + originalIndex + " + 1;\n";
                        originTemp = _Console.count;
                        result += "t" + _Console.count + " = Heap[(int)t" + originalIndex + "];\n";
                        _Console.count++;
                        // Ver si es letra
                        result += "t" + _Console.count + " = t" + originTemp + " > 64;\n";
                        _Console.count++;
                        result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        labelSalida = _Console.labels;
                        result += "goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        result += "l" + (_Console.labels - 2) + ":\n";
                        result += "t" + _Console.count + " = t" + (_Console.count - 2) + " < 91;\n";
                        _Console.count++;
                        result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        result += "goto l" + labelSalida + ";\n";
                        result += "l" + (_Console.labels - 1) + ":\n";
                        result += "t" + _Console.count + " = t" + originTemp + " + 32;\n";
                        result += "goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        result += "l" + labelSalida + ":\n";
                        result += "t" + _Console.count + " = t" + originTemp + ";\n";
                        _Console.count++;
                        result += "l" + (_Console.labels - 1) + ":\n";
                        // Guardar nueva string en heap
                        result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                        result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = t" + newStrInd + " <= t" + pointerTemp + ";\n";
                        _Console.count++;
                        result += "if(t" + (_Console.count - 1) + ") goto l" + labelInicio + ";\n";
                        result += "t" + _Console.count + " = t" + newStrInd + " - t" + sizeTemp + ";\n";
                        _Console.count++;
                        _Console.printOption = 1;
                        result += "// Finaliza ToLowerCase\n";
                        break;
                    case "touppercase":
                        result += "// Inicia ToUpperCase\n";
                        // Obtener string
                        result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
                        _Console.count++;
                        originalIndex = _Console.count;
                        result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
                        _Console.count++;
                        // obtiene el size del string
                        sizeTemp = _Console.count;
                        result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
                        _Console.count++;
                        // obtiene la nueva direccion para la string
                        newStrInd = _Console.count;
                        result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
                        _Console.count++;
                        result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
                        _Console.saveInHeap(_Console.heapPointer, _Console.heap[_Console.stack[strIndex]]);
                        _Console.heapPointer++;
                        pointerTemp = _Console.count;
                        result += "t" + pointerTemp + " = t" + newStrInd + " + t" + sizeTemp + ";\n";
                        _Console.count++;
                        labelInicio = _Console.labels;
                        result += "l" + labelInicio + ":\n";
                        _Console.labels++;
                        result += "t" + originalIndex + " = t" + originalIndex + " + 1;\n";
                        originTemp = _Console.count;
                        result += "t" + _Console.count + " = Heap[(int)t" + originalIndex + "];\n";
                        _Console.count++;
                        // Ver si es letra
                        result += "t" + _Console.count + " = t" + originTemp + " > 96;\n";
                        _Console.count++;
                        result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        labelSalida = _Console.labels;
                        result += "goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        result += "l" + (_Console.labels - 2) + ":\n";
                        result += "t" + _Console.count + " = t" + (_Console.count - 2) + " < 123;\n";
                        _Console.count++;
                        result += "if(t" + (_Console.count - 1) + ") goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        result += "goto l" + labelSalida + ";\n";
                        result += "l" + (_Console.labels - 1) + ":\n";
                        result += "t" + _Console.count + " = t" + originTemp + " - 32;\n";
                        result += "goto l" + _Console.labels + ";\n";
                        _Console.labels++;
                        result += "l" + labelSalida + ":\n";
                        result += "t" + _Console.count + " = t" + originTemp + ";\n";
                        _Console.count++;
                        result += "l" + (_Console.labels - 1) + ":\n";
                        // Guardar nueva string en heap
                        result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                        result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                        _Console.count++;
                        result += "t" + _Console.count + " = t" + newStrInd + " <= t" + pointerTemp + ";\n";
                        _Console.count++;
                        result += "if(t" + (_Console.count - 1) + ") goto l" + labelInicio + ";\n";
                        result += "t" + _Console.count + " = t" + newStrInd + " - t" + sizeTemp + ";\n";
                        _Console.count++;
                        _Console.printOption = 1;
                        result += "// Finaliza ToUpperCase\n";
                        break;
                    case "concat":
                        let smb2 = _Console.symbols.get(this.expresiones[0].id);
                        if (smb2 != undefined) {
                            let strIndex2 = smb2.valor;
                            result += "// Inicia concat\n";
                            // Obtener string
                            result += "t" + _Console.count + " = p + " + (strIndex) + ";\n";
                            _Console.count++;
                            originalIndex = _Console.count;
                            result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
                            _Console.count++;
                            // obtiene el size del string
                            sizeTemp = _Console.count;
                            result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
                            _Console.count++;
                            // Obtener string2
                            result += "t" + _Console.count + " = p + " + (strIndex2) + ";\n";
                            _Console.count++;
                            let originalIndex2 = _Console.count;
                            result += "t" + _Console.count + " = Stack[(int)t" + (_Console.count - 1) + "];\n";
                            _Console.count++;
                            // obtiene el size del string2
                            let sizeTemp2 = _Console.count;
                            result += "t" + _Console.count + " = Heap[(int)t" + (_Console.count - 1) + "];\n";
                            _Console.count++;
                            // Suma los size
                            let newSizeTemp = _Console.count;
                            result += "t" + _Console.count + " = t" + sizeTemp + " + t" + sizeTemp2 + ";\n";
                            _Console.count++;
                            // obtiene la nueva direccion para la string
                            newStrInd = _Console.count;
                            result += "t" + newStrInd + " = h + " + _Console.heapPointer + ";\n";
                            _Console.count++;
                            result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
                            _Console.saveInHeap(_Console.heapPointer, _Console.heap[_Console.stack[strIndex]]);
                            _Console.heapPointer++;
                            // Copia la primer string
                            pointerTemp = _Console.count;
                            _Console.count++;
                            result += "t" + pointerTemp + " = 0;\n";
                            result += "l" + _Console.labels + ":\n";
                            _Console.labels++;
                            result += "t" + pointerTemp + " = t" + pointerTemp + " + 1;\n";
                            result += "t" + originalIndex + " = t" + originalIndex + " + 1;\n";
                            result += "t" + _Console.count + " = Heap[(int)t" + originalIndex + "];\n";
                            _Console.count++;
                            result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                            result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                            _Console.count++;
                            result += "t" + _Console.count + " = t" + pointerTemp + " <= t" + sizeTemp + ";\n";
                            _Console.count++;
                            result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
                            // Copia la segunda string
                            pointerTemp = _Console.count;
                            _Console.count++;
                            result += "t" + pointerTemp + " = 0;\n";
                            result += "l" + _Console.labels + ":\n";
                            _Console.labels++;
                            result += "t" + pointerTemp + " = t" + pointerTemp + " + 1;\n";
                            result += "t" + originalIndex2 + " = t" + originalIndex2 + " + 1;\n";
                            result += "t" + _Console.count + " = Heap[(int)t" + originalIndex2 + "];\n";
                            _Console.count++;
                            result += "t" + newStrInd + " = t" + newStrInd + " + 1;\n";
                            result += "Heap[(int)t" + newStrInd + "] = t" + (_Console.count - 1) + ";\n";
                            _Console.count++;
                            result += "t" + _Console.count + " = t" + pointerTemp + " <= t" + sizeTemp2 + ";\n";
                            _Console.count++;
                            result += "if(t" + (_Console.count - 1) + ") goto l" + (_Console.labels - 1) + ";\n";
                            result += "t" + _Console.count + " = t" + newStrInd + " - t" + newSizeTemp + ";\n";
                            _Console.count++;
                            _Console.printOption = 1;
                            result += "// Finaliza concat\n";
                        } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
                        break;
                    default:
                        errores.push(new Error_(this.line, this.column, 'Semantico', 'Propiedad no exitente'));
                        break

                }
            } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
        }

        return result + "// Finaliza Llamada\n";
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

    constructor(private id: Access | Property, private expresiones: Array<any>, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        //console.log('llamando', this);

        if (this.id instanceof Access) {
            const func = environment.getFuncion(this.id.getID());
            if (func != undefined) {
                //console.log('antes de crear el newEnv', environment);
                const newEnv = new Environment(environment.getGlobal());
                //console.log('se crea', newEnv);
                for (let i = 0; i < this.expresiones.length; i++) {
                    const param = func.parametros[i];
                    if (param.type instanceof _Type) {
                        let newType = param.execute();
                        const value = this.expresiones[i].execute(environment);

                        // Sino son del mismo tipo
                        if (newType.type == value.type) {
                            //console.log('newT', newType);
                            //console.log('variable', value);
                            // Se usa true para crear la variable
                            newEnv.guardar(newType.value, value.value, value.type);
                        }
                        // es un struct
                        else if (isString(newType.type)) {
                            let variable;
                            if (this.expresiones[i] instanceof Property) {
                                // Obtener el struct para validarlo
                                let struct = this.expresiones[i].getObject(environment).value;
                                // Buscar la propiedad que se asignara
                                if (struct instanceof _Struct) {
                                    // TODO comprobar tipos para la asignacion
                                    if (struct.hasAtribute(this.expresiones[i].getProperty())) {
                                        variable = struct.getAtribute(this.expresiones[i].getProperty());
                                        //console.log('newT', newType);
                                        //console.log('variable', variable);
                                        if (variable.value == null) newEnv.guardar(newType.value, null, newType.type);
                                        else newEnv.guardar(newType.value, variable.value, newType.type);
                                    } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Atributo no existente en el type'));
                                }
                            }
                            else {
                                // No es una propiedad
                                variable = environment.getVar(this.expresiones[i].id);
                                if (newType.type == variable.type) newEnv.guardar(newType.value, variable.valor, variable.type);
                                else errores.push(new Error_(this.line, this.column, 'Semantico', 'Parametro de tipo invalido'));
                            }
                        }
                        else errores.push(new Error_(this.line, this.column, 'Semantico', 'Parametro de tipo invalido'));
                    } else {
                        // Obtener array
                        if (this.expresiones[i] instanceof Access) {
                            const arr = environment.getVar(this.expresiones[i].getID());
                            // Comprobar Dimensiones
                            let tipo: ArrayType = param.type;
                            if (tipo.dimensions != arr.valor.dimensions) errores.push(new Error_(this.line, this.column, 'Semantico', 'Parametro con dimensiones no validas'));
                            // Comprobar Tipo
                            if (tipo.type.execute().type != arr.valor.tipo.execute().type) errores.push(new Error_(this.line, this.column, 'Semantico', 'Parametro de tipo invalido'));
                            // No hubo error 
                            newEnv.guardar(param.execute().value, arr.valor, 4);
                        }
                    }
                }
                //console.log('antes de ejecutar newEnv', newEnv);
                const result = func.statment.execute(newEnv);
                // Para el void
                if (func.type == null || func.type.execute().type == 3) return result;
                // Para Otras funciones
                if (result != null) {
                    //console.log('return', result);
                    //console.log('tipo', func.type.execute());
                    if (result.type == func.type.execute().type || result.type == func.type.execute().value) return result;
                    else errores.push(new Error_(this.line, this.column, 'Semantico', 'Return y funcion de tipos distintos '));
                }
                else errores.push(new Error_(this.line, this.column, 'Semantico', 'Return y funcion de tipos distintos'));

            } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Funcion no definida'));
        }
        else if (this.id instanceof Property) {
            // Obtener el objeto
            // //console.log('propiedad', this);)
            let obj: Symbol = new Symbol(null, null, null);
            if (isArray(this.id.id.id)) {
                obj.valor = this.id.id.execute(environment);
            }
            else {
                obj = environment.getVar(this.id.id.getID());
            }
            // funciones nativas
            switch (this.id.getProperty()) {
                case 'push':
                    if (obj.valor instanceof _Array) {
                        if (this.expresiones.length == 1) {
                            obj.valor.push(this.expresiones[0].execute(environment));
                        } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Numero de parametros incorrecto'));
                    } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Propiedad no definida para el objeto'));
                    break;
                case 'pop':
                    if (obj.valor instanceof _Array) {
                        if (this.expresiones.length == 0) {
                            const retorno = obj.valor.pop();
                            return { value: retorno.value, type: retorno.type }
                        } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Numero de parametros incorrecto'));
                    } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Propiedad no definida para el objeto'));
                    break;
                case 'length':
                    if (obj.valor instanceof _Array) {
                        if (this.expresiones.length == 0) {
                            const retorno = obj.valor.length();
                            return { value: retorno, type: 0 }
                        } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Numero de parametros incorrecto'));
                    } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Propiedad no definida para el objeto'));
                    break;
            }
        }
    }
}
