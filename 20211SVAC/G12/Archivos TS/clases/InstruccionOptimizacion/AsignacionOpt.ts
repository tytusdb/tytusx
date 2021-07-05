import {Nodo} from '../InstruccionOptOtros/Nodo';
import {InstruccionOptimizada} from '../InstruccionOptOtros/InstruccionOptimizada';
import {ListaRepoOptimizacion} from '../InstruccionOptOtros/ListaRepoOptimizacion';

export  class AsignacionOpt extends Nodo {
  resultado: string;
  operandoIzq: string;
  operador: string;
  operandoDer: string;

  constructor(resultado: string, operandoIzq: string, operador: string, operandoDer: string, linea: number) {
    super(linea);
    this.resultado = resultado;
    this.operandoIzq = operandoIzq;
    this.operador = operador;
    this.operandoDer = operandoDer;
  }

  optimizar(): any {
    if (this.resultado === this.operandoIzq && this.operador === '+' && this.operandoDer === '0'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 6', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, '', this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return '';
    }
    else if (this.resultado === this.operandoIzq && this.operador === '-' && this.operandoDer === '0'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 7', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, '', this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return '';
    }
    else if (this.resultado === this.operandoIzq && this.operador === '*' && this.operandoDer === '1'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 8', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, '', this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return '';
    }
    else if (this.resultado === this.operandoIzq && this.operador === '/' && this.operandoDer === '1'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 9', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, '', this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return '';
    }

    else if (this.resultado !== this.operandoIzq && this.operador === '+' && this.operandoDer === '0'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 10', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, `${this.resultado} = ${this.operandoIzq}`, this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return `${this.resultado} = ${this.operandoIzq};\n`;
    }
    else if (this.resultado !== this.operandoIzq && this.operador === '-' && this.operandoDer === '0'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 11', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, `${this.resultado} = ${this.operandoIzq}`, this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return `${this.resultado} = ${this.operandoIzq};\n`;
    }
    else if (this.resultado !== this.operandoIzq && this.operador === '*' && this.operandoDer === '1'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 12', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, `${this.resultado} = ${this.operandoIzq}`, this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return `${this.resultado} = ${this.operandoIzq};\n`;
    }
    else if (this.resultado !== this.operandoIzq && this.operador === '/' && this.operandoDer === '1'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 13', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, `${this.resultado} = ${this.operandoIzq}`, this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return `${this.resultado} = ${this.operandoIzq};\n`;
    }

    else if (this.operador === '*' && this.operandoDer === '2'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 14', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, `${this.resultado} = ${this.operandoIzq} + ${this.operandoIzq}`, this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return `${this.resultado} = ${this.operandoIzq} + ${this.operandoIzq};\n`;
    }
    else if (this.operador === '*' && this.operandoDer === '0'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 15', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, `${this.resultado} = 0`, this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return `${this.resultado} = 0;\n`;
    }
    else if (this.operador === '/' && this.operandoIzq === '0'){
      const repo = new InstruccionOptimizada('Mirilla', 'Regla 16', `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer}`, `${this.resultado} = 0`, this.linea);
      ListaRepoOptimizacion.getLista().push(repo);
      return `${this.resultado} = 0;\n`;
    }

    if (this.operador == null && this.operandoDer == null){
      return `${this.resultado} = ${this.operandoIzq};\n`;
    }
    return `${this.resultado} = ${this.operandoIzq} ${this.operador} ${this.operandoDer};\n`;
  }
}
