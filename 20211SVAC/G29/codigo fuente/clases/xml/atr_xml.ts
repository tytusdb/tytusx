import ASTNodo from "../../reports/ASTNodo";

export default class atr_xml{
    public id: string
    public valor: any
    public linea: number
    public columna: number
    public cst: ASTNodo

    constructor(id,valor,linea,columna){
        this.id = id
        this.valor = valor
        this.linea = linea
        this.columna = columna
    }

  nuevo(produccion : string, token : string, regla :string){
    this.cst = new ASTNodo(produccion,token, regla);
  }

}
