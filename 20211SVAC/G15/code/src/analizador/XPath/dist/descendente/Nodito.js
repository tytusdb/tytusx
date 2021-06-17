class NoditoAST{
    constructor(Valor,Tipo){
        this.Valor=Valor;
        this.Tipo=Tipo;
        this.Hijos = [];
        this.ID=0;
    }


    agregarHijos(Hijos){
        this.Hijos.push(Hijos);
    }

}
export default NoditoAST;
