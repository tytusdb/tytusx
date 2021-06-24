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
import { Symbol } from '../Symbol/Symbol';

export class Declaration extends Instruction {

    private translateDimension(dim: Literal[] | Literal, environment: Environment): string {
        let result = "";
        if (dim instanceof Literal) {
            result += dim.translate(environment);
            result += "t" + _Console.count + " = h + " + _Console.heapPointer + ";\n";
            _Console.count++;
            _Console.saveInHeap((_Console.heapPointer), dim.execute(environment).value);
            result += "Heap[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
            _Console.heapPointer++;
        }
        else {
            for (let i in dim) {
                result += this.translateDimension(dim[i], environment);
            }
        }
        return result;
    }

    public translate(environment: Environment): String {
        let result = "// Inicia Declaracion\n";
        let ambito = (environment.getAnterior() == null) ? "Global" : "Local";
        if (this.value != null) {
            if (this.type instanceof ArrayType || this.value instanceof Array) {
                if (this.value != null) {
                    result += "// Inicializacion de Array\n";
                    let _heapInitial = _Console.heapPointer;
                    _Console.heapPointer++;
                    for (let i in this.value) {
                        result += this.translateDimension(this.value[i], environment);
                    }
                    _Console.symbols.set(this.id, new Symbol(_Console.stackPointer, this.id, 4, ambito));
                    environment.guardar(this.id, _Console.stackPointer, 4);
                    _Console.saveInStack(_Console.stackPointer, _heapInitial);
                    let initTerminal = _Console.count;
                    _Console.count++;
                    result += "t" + initTerminal + " = h + " + _heapInitial + ";\n";
                    _Console.saveInHeap(_heapInitial, (_Console.heapPointer - _heapInitial - 1));
                    result += "Heap[(int)t" + initTerminal + "] = " + (_Console.heapPointer - _heapInitial - 1) + ";\n";
                    result += "t" + _Console.count + " = " + "p + " + _Console.stackPointer + ";\n";
                    _Console.stackPointer++;
                    _Console.count++;
                    result += "Stack[(int)t" + (_Console.count - 1) + "] = t" + initTerminal + ";\n";
                }
            }
            else {
                // Reserva el espacio para la variable
                let varTemp = _Console.count;
                let varIndex = _Console.stackPointer  + environment.getP();
                result += "t" + _Console.count + " = " + "p + " + varIndex + ";\n";
                _Console.stackPointer++;
                _Console.count++;

                result += this.value.translate(environment);
                result += "Stack[(int)t" + varTemp + "] = t" + (_Console.count - 1) + ";\n";

                let retType = 0;
                if (this.value instanceof Literal) retType = this.value.type;
                _Console.symbols.set(this.id, new Symbol(varIndex, this.id, retType, ambito));
                environment.guardar(this.id, varIndex, retType);

            }
        }
        result += "// Finaliza Declaracion\n";
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

    constructor(private method: Literal, private type: _Type | ArrayType, private id: string, private value: Expression, line: number, column: number) {
        super(line, column);
    }

    private validacionRecursiva(): boolean {

        return true;
    }

    public execute(environment: Environment) {
        if (this.type instanceof ArrayType) {
            // Ver el metodo
            if (this.value != null) {
                //TODO Validar que las dimensiones sean exactas y validar que cada elemento sea de su tipo
                let valores = [];
                for (let i in this.value) {
                    valores[i.toString()] = this.value[i].execute(environment);
                }
                let arrObject = new _Array(this.type.dimensions, valores, this.type.type);
                if (this.validacionRecursiva()) environment.guardar(this.id, arrObject, 4);
            } else {
                if (this.method.execute(environment).value == 'const') errores.push(new Error_(this.line, this.column, 'Semantico', 'Constante no puede ser vacia'));
                let arrObject = new _Array(this.type.dimensions, new Array(), this.type.type);
                environment.guardar(this.id, arrObject, 4);
            }
        }
        else {
            // Si es un struct
            if (isArray(this.value)) {
                // Se declara el struct
                if (this.type.toString() == 'type') {
                    environment.guardar(this.id, new _Struct(this.value), 7);
                }
                // Se declara una variable tipo struct
                else {
                    // Obtener el struct para validarlo
                    const struct = environment.getVar(this.type.execute().value).valor;
                    if (struct instanceof _Struct) {
                        // Validar que los indices esten correctos
                        // Primero se valida el numero de parametros
                        // if (struct.getContent().length != this.value.length) errores.push(new Error_(this.line, this.column, 'Semantico', 'Numero de atributos invalidos en type'));
                        // Luego se valida que cada parametro exista y sea del tipo correcto
                        for (let i in this.value) {
                            const att = struct.getAtribute(this.value[i].id);
                            let object = this.value[i].value;
                            // Existe el atributo?
                            if (att == null || att == undefined) errores.push(new Error_(this.line, this.column, 'Semantico', 'Atributo no existente en type: ' + this.value[i].id));
                            // Si el objeto no es nulo entonces ejecutarlo
                            else if (object != null) {
                                let retorno = object.execute(environment);
                                if (retorno.type != att.type.execute().type) errores.push(new Error_(object.line, object.column, 'Semantico', 'Atributo de tipo invalido'));
                                // Arreglar Valor
                                this.value[i].value = retorno.value;
                            }
                        }
                    }
                    // Si todo esta bien se guarda
                    environment.guardar(this.id, new _Struct(this.value), this.type.execute().value);
                }
            }
            // Se declara una variable normal
            else if (this.value != null) {
                const val = this.value.execute(environment);

                if (this.type == null) environment.guardar(this.id, val.value, val.type);
                else {
                    switch (this.type.execute().value) {
                        case 'number':
                            if (!isNumber(val.value)) errores.push(new Error_(this.line, this.column, 'Semantico', 'Numero no valido'));
                            break;
                        case 'string':
                            if (!isString(val.value)) errores.push(new Error_(this.line, this.column, 'Semantico', 'String no valida'));
                            break;
                        case 'boolean':
                            if (!isBoolean(val.value)) errores.push(new Error_(this.line, this.column, 'Semantico', 'Booleano no valido'));
                            break;
                        default:
                            console.log('no se guarda nada');
                            break;
                    }
                    environment.guardar(this.id, val.value, val.type);
                }
            }
            else {
                if (this.method.execute(environment).value == 'const') errores.push(new Error_(this.line, this.column, 'Semantico', 'Constante no puede ser vacia'));
                environment.guardar(this.id, 'undefined', 3);
            }
        }
    }

}