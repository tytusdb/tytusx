import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { isArray } from 'util';
import { Access } from '../Expression/Access';
import { Property } from '../Expression/Property';
import { _Array } from '../Object/Array';
import { errores } from '../Errores';
import { Error_ } from '../Error';
import { Retorno } from '../Abstract/Retorno';
import { _Struct } from '../Object/Struct';
import { Literal } from '../Expression/Literal';
import { _Console } from '../Util/Salida';

export class Assignation extends Instruction {

    public translate(environment: Environment): String {
        let result = "// Inicia asignacion\n";
        let ID = this.id.id;
        if (ID instanceof Array) {
            let smb = _Console.symbols.get(ID[0]);
            if (smb != undefined) {
                result += this.value.translate(environment)
                let resTemp = _Console.count - 1;
                result += "t" + _Console.count + " = " + "p + " + smb.valor + ";\n";
                _Console.count++;
                let initalIndex = _Console.count;
                result += "t" + _Console.count + " = " + "Stack[(int)t" + (_Console.count - 1) + "];\n";
                result += "t" + _Console.count + " = " + "t" + (_Console.count) + " + 1;\n";
                _Console.count++;
                for (let dim in ID) {
                    if (dim != '0') {
                        result += ID[dim][0].translate(environment);
                        result += "t" + initalIndex + " = t" + initalIndex + " + t" + (_Console.count - 1) + ";\n";
                    }
                }
                result += "Heap[(int)t" + initalIndex + "] = t" + resTemp + ";\n";
            } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
        }
        else {
            let smb = _Console.symbols.get(ID);
            if (smb != undefined) {
                result += this.value.translate(environment)
                result += "t" + _Console.count + " = " + "p + " + smb.valor + ";\n";
                _Console.count++;
                result += "Stack[(int)t" + (_Console.count - 1) + "] = t" + (_Console.count - 2) + ";\n";
            } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no exitente'));
        }

        return result + "// Finaliza asignacion\n";
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Assignacion \"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.value.line + "," + this.value.column + ") Valor\"];";
        result += this.value.plot(Number(count + "11"));
        result += "node" + count + "1 -> " + "node" + count + "11;";
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        return result;
    }

    constructor(private id: any, private value: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        if (isArray(this.id.id)) {
            // Si es un array
            const value = environment.getVar(this.id.id[0]);
            if (value.valor instanceof _Array) {
                let indexArray = this.id.id[1];
                if (value.valor.dimensions < indexArray.length) errores.push(new Error_(this.line, this.column, 'Semantico', 'Index invalido'));
                // Valores iniciales
                let count = 0;
                let index: Retorno = (indexArray[0] instanceof Access) ? indexArray[0].execute(environment) : indexArray[0];
                let newValue: _Array = value.valor;
                while (count < indexArray.length - 1) {
                    // Obteniendo el index
                    index = (indexArray[count] instanceof Access) ? indexArray[count].execute(environment) : indexArray[count];
                    // Obtiene el array
                    if (newValue == undefined) errores.push(new Error_(this.line, this.column, 'Semantico', 'Variable no definida'));
                    else newValue = newValue.getAtributo(index.value);
                    count++;
                }
                index = (indexArray[count] instanceof Access) ? indexArray[count].execute(environment) : indexArray[count];
                if (this.value != null) {
                    if (isArray(this.value)) {
                        newValue.setAtributo(index.value, new _Array(value.valor.dimensions - count - 1, new Array(), value.valor.tipo));
                    }
                    else newValue.setAtributo(index.value, this.value.execute(environment));
                }
            }
        }
        else if (isArray(this.value)) {
            // Es un struct
            if (this.id instanceof Access) {
                // Arreglar los Accesos
                for (let index in this.value) {
                    let element = this.value[index];
                    if (element.value == null) this.value[index].value = null;
                    else if (element.value instanceof Literal || element.value instanceof Access) this.value[index].value = element.value.execute(environment).value
                }
                let symbol = environment.getVar(this.id.getID());
                environment.guardar(symbol.id, new _Struct(this.value), symbol.type);
            }
        }
        else if (this.id instanceof Property) {
            // Obtener el objeto para validarlo
            const symbol = this.id.getObject(environment);
            //Asignarle valor a una propiedad del symbol
            const result = this.value.execute(environment);
            // Buscar la propiedad que se asignara
            if (symbol.value instanceof _Struct) {
                // TODO comprobar tipos para la asignacion
                if (symbol.value.hasAtribute(this.id.getProperty())) {
                    symbol.value.setAtribute(this.id.getProperty(), { id: this.id.getProperty(), value: result.value });
                } else errores.push(new Error_(this.line, this.column, 'Semantico', 'Atributo no existente en el type'));
            }
        }
        else if (this.value != null) {
            const val = this.value.execute(environment);
            // TODO Comprobar tipos en la asignacion
            if (this.id instanceof Access) environment.guardar(this.id.getID(), val.value, val.type);
            else environment.guardar(this.id, val.value, val.type);
        }
    }
}