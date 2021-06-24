import { Rule } from './Rule';

export class _Optimizer {
    public salida: string;
    public temp: string;
    public label: string;
    public flag: boolean;
    public reglas: Array<Rule>;

    constructor() {
        this.salida = "";
        this.temp = "";
        this.flag = false;
        this.label = "";
        this.reglas = new Array();
    }
}
