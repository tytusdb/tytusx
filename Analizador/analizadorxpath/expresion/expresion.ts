abstract class expresion extends NodoAst
{
    expresionderecho:any;
    expresionizquierda:any;
    operador:any;
    //info:any;
    //constructor(ejemplo:NodoAst,id:string){}
    

    Interpretar(): void {
        throw new Error("Method not implemented.");
    }

    graficar():number{        
        return 0;
    }
}