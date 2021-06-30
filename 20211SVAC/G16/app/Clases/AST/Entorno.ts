import Simbolo from "./Simbolo";

export default class Entorno{
    public nombre:string;
    public padre:Entorno;
    public variables:Array<Simbolo>;
    public instrucciones:Array<Simbolo>;
    public funciones:Array<Simbolo>;
    public entornos:Array<Simbolo>;
    constructor(nombre:string, padre:Entorno){
        this.variables = new Array<Simbolo>();
        this.instrucciones = new Array<Simbolo>();
        this.entornos=new Array<Simbolo>();
        this.funciones=new Array<Simbolo>();
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

  ExisteFuncion(identificador:string){
    let actual:Entorno=this;
    for(let i=0;i<actual.funciones.length;i++){
      let funcion=actual.funciones[i]
      if(funcion.Nombre==identificador){
        return funcion
      }
    }
    return null;
  }

  public buscarVariable(varia:string,actual:Entorno):Simbolo{
    console.log(actual)
    console.log(varia)
    while(actual!=null){
      for(let i=0;i<this.variables.length;i++){
        let variable=this.variables[i];
        if(variable.Nombre==varia){
          return variable;
        }
      }
      actual=actual.padre;
    }
    return null;
  }
}
