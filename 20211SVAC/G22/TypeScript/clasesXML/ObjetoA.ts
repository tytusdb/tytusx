export class ObjetoA{
  objeto: any;
  idAST: number;
  idCST: number;

  constructor(objeto: any, idAST: number, idCST: number) {
    this.objeto = objeto;
    this.idAST = idAST;
    this.idCST = idCST;
  }

  public getObjeto(): any{
    return this.objeto;
  }

  public getIdAST(): number{
    return this.idAST;
  }

  public getIdCst(): number{
    return this.idAST;
  }

}