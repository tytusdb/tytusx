export class salidaXPATH {
  private static instance: salidaXPATH;
  lista: String[];

  private constructor() {
    this.lista = [];
  }

  public static getInstance(): salidaXPATH {
    if (!salidaXPATH.instance) {
      salidaXPATH.instance = new salidaXPATH();
    }
    return salidaXPATH.instance;
  }

  public push(linea: string): void {
    this.lista.push(linea);
  }

  public clear(): void{
    this.lista = [];
  }
}
