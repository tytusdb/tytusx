export class entFunc {
  private static instance: entFunc;
  lista: Array<any>;

  private constructor() {
    this.lista = [];
  }

  public static getInstance(): entFunc {
    if (!entFunc.instance) {
      entFunc.instance = new entFunc();
    }
    return entFunc.instance;
  }

  public ejecFuncion(): boolean {
    return this.lista.length > 0;
  }

  public iFuncion(): void {
    this.lista.push(true);
  }

  public fFuncion(): void {
    this.lista.pop();
  }
}