export class reglaGramatical {
    produccion: string;
    regla: string;
  
    constructor({ produccion,regla }: { produccion: string, regla: string }) {
      Object.assign(this, {produccion, regla})
    }
  }