import { Symbol } from "./Symbol";
import { Function } from '../Instruction/Function';
import { Type } from "../Abstract/Retorno";
import { _Console } from '../Util/Salida';
import { EnvironmentXML } from '../../parser/Symbol/EnviromentXML';
import { Error_ } from '../Error';
import { errores } from '../Errores';

export class Environment {

    public variables: Map<string, Symbol>;
    public funciones: Map<string, Function>;
    public apuntadores: Map<string, number>;

    constructor(public anterior: Environment | null, public xmlEnvironment: EnvironmentXML) {
        this.xmlEnvironment = xmlEnvironment;
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
    
    save_error(line:number, column: number, msg: string){
        errores.push(new Error_(line, column, "Semantico", msg));
    }

    public guardarFuncion(id: string, funcion: Function) {
        if (this.funciones.has(id)){
            this.save_error(funcion.line,funcion.column,"Funcion ya definida");
        } 
        else {
            _Console.symbols.set(id, new Symbol('Instrucciones', id, 8, 'Global'));
            this.funciones.set(id, funcion);
        }
    }

    public getVar(id: string): Symbol {
        let env: Environment = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            else env = env.anterior;
        }
        return null;
    }

    public getFuncion(id: string): Function{
        let env: Environment | null = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return null;
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