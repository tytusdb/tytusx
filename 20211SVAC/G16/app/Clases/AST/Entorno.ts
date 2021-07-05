import Simbolo from "./Simbolo";

export default class Entorno{
    public nombre:string;
    public padre:Entorno;
    public variables:Array<Simbolo>;
    public instrucciones:Array<Simbolo>;
    public funciones:Array<Simbolo>;
    public entornos:Array<Simbolo>;
    public arreglo:Array<any>;
    constructor(nombre:string, padre:Entorno){
        this.variables = new Array<Simbolo>();
        this.instrucciones = new Array<Simbolo>();
        this.entornos=new Array<Simbolo>();
        this.funciones=new Array<Simbolo>();
        this.arreglo=new Array<any>();
        this.nombre = nombre;
        this.padre=padre;
    }

    AddVariables(Simbolo:Simbolo){
        this.variables.push(Simbolo);
    }
    AddInstruccion(Simbolo:Simbolo){
       this.instrucciones.push(Simbolo);
   }
     Add(Simbolo:Simbolo){
     this.entornos.push(Simbolo);
   }
    AddFuncion(Simbolo:Simbolo){
      this.funciones.push(Simbolo);
    }

   Get(){
     return this.entornos;
   }

  ExisteFuncion(identificador:string,actual:Entorno){
    while(actual!=null){
      for(let i=0;i<actual.funciones.length;i++){
        let funcion=actual.funciones[i]
        if(funcion.Nombre==identificador){
          return funcion
        }
      }
      actual=actual.padre;
    }
    return null;
  }

  public buscarVariable(varia:string,actual:Entorno):Simbolo{
    while(actual!=null){
      for(let i=0;i<actual.variables.length;i++){
        let variable=actual.variables[i];
        if(variable.Nombre==varia){
          return variable;
        }
      }
      actual=actual.padre;
    }
    return null;
  }

  public buscarVariableEntorno(varia:string,actual:Entorno):Simbolo{
    for(let i=0;i<this.variables.length;i++){
      let variable=this.variables[i];
      if(varia==variable.Nombre){
        return variable;
      }
    }
    return null;
  }

  public setVariable(varia:string,valor:any):Simbolo{
    for(let i=0;i<this.variables.length;i++){
      let variable=this.variables[i];
      if(varia==variable.Nombre){
        variable.Valor.valor=valor;
        return variable
      }
    }
    return null;
  }
}
