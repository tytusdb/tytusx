
import{Regla} from "./Regla"
export class AtributosNodoCST {
  simbolo: any;
  regla: Regla;
  constructor(simbolo: any, regla: Regla) {
    this.simbolo=simbolo;
    this.regla = regla;
  }
}