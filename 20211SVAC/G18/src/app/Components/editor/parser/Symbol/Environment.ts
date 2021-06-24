import { Symbol } from "./Symbol";
import { Type } from "../Abstract/Retorno";
import { Function } from "../Instruction/Function";
import { errores } from '../Errores';
import { Error_ } from '../Error';
import { _Console } from '../Util/Salida';

export class Environment {

    public variables: Map<string, Symbol>;
    public funciones: Map<string, Function>;
    public apuntadores: Map<string, number>;

    constructor(public anterior: Environment | null) {
        this.anterior = anterior;
        this.variables = new Map<string, Symbol>();
        this.funciones = new Map<string, Function>();
        this.apuntadores = new Map<string, number>();
        this.setP(0);
        this.setH(0);
        this.setLastT(0);
        this.setLastL(0);
    }

    public guardar(id: string, valor: any, type: Type) {
        let env: Environment | null = this;
        if (env.anterior == null) _Console.symbols.set(id, new Symbol(valor, id, type, 'Global'));
        else _Console.symbols.set(id, new Symbol(valor, id, type, 'Local'));
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Symbol(valor, id, type));
                return;
            }
            env = env.anterior;
        }
        this.variables.set(id, new Symbol(valor, id, type));
    }

    public guardarFuncion(id: string, funcion: Function) {
        if (this.funciones.has(id)) errores.push(new Error_(funcion.line, funcion.column, "Semantico", "Funcion ya definida"));
        else {
            _Console.symbols.set(id, new Symbol('Instrucciones', id, 8, 'Global'));
            this.funciones.set(id, funcion);
        }
    }

    public getVar(id: string): Symbol | undefined | null {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }

    public getFuncion(id: string): Function | undefined {
        let env: Environment | null = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getGlobal(): Environment {
        let env: Environment | null = this;
        while (env.anterior != null) {
            env = env.anterior;
        }
        return env;
    }

    public getAnterior() : Environment  {
        return this.anterior;
    }

    public setLastT(count: number) {
        this.apuntadores.set("t", count);
    }
    public getLastT() {
        return this.apuntadores.get("t");
    }
    public setLastL(count: number) {
        this.apuntadores.set("l", count);
    }
    public getLastL() {
        return this.apuntadores.get("l");
    }
    public setP(index: number) {
        this.apuntadores.set("p", index);
    }
    public getP() {
        return this.apuntadores.get("p");
    }
    public setH(index: number) {
        this.apuntadores.set("h", index);
    }
    public getH() {
        return this.apuntadores.get("h");
    }
}