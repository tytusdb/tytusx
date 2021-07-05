import { expresion } from "src/clases/interfaces/expresion";
import IF from "./if";
import variable from "./variable";


export default class subReturn {
    public variable: variable;
    public exp: expresion;
    public func: any;
    public iF: IF;

    constructor(vari,exp,func,ifs){
        this.variable = vari;
        this.exp = exp;
        this.func = func;
        this.iF = ifs;
    }
}