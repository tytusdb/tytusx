import { Errores } from '../arbol/errores';
import { Error } from '../arbol/error';
import { Type } from './type';
import { Variable } from './variable';
import * as _ from 'lodash';
import { EntornoAux } from './entorno_aux';
import { Etiqueta } from './etiqueta';

//XQUERY
import {Simbolo} from './Expresion/Simbolo';
import {Funcion} from './Expresion/Funcion';

export class Entorno {
  variables: Map<String, Variable>;
  padre: Entorno;
  types: Map<String, Type>;

  etiquetas:Map<String, Etiqueta>

  //NUEVO XQUERY
    simbolos: Map<String,Simbolo>;
    funciones: Map<String, Funcion>;

  constructor(padre?: Entorno) {
    this.padre = padre != null ? padre : null;
    this.variables = new Map();
    this.types = new Map();

    this.etiquetas = new Map();

    this.simbolos=new Map();
    this.funciones = new Map();
  }

  /*constructor(padre_: Entorno) {
    this.padre = padre_;
    this.variables = new Map();
    this.types = new Map();

    this.etiquetas = new Map();

    this.simbolos=new Map();
    this.funciones = new Map();
  }*/




  //NUEVO
  setEtiqueta(et:Etiqueta):void{
    this.etiquetas.set(et.dameID(), et);
  }
  getEtiqueta(id:string):Etiqueta{
    for (let e: Entorno = this; e != null; e = e.padre) {
      let variable = e.etiquetas.get(id);
      if (variable != null) return variable;
    }
  }
  

  hasEtiqueta(id: string): boolean {
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (e.etiquetas.has(id)) {
        return true;
      }
    }
    return false;
  }

  //NUEVO
  

  setVariable(variable: Variable): void {
    this.variables.set(variable.id, variable);
  }

  getVariable(id: string): Variable {
    for (let e: Entorno = this; e != null; e = e.padre) {
      let variable = e.variables.get(id);
      if (variable != null) return variable;
    }

    //Compruebo en las funciones ya declaradas
    // if (this.deboBuscarEnFunciones(id) && !EntornoAux.getInstance().estoyBuscandoEnFuncion) {
    //   EntornoAux.getInstance().estoyBuscandoEnFuncion = true;
    //   //Capturo el id de la funcion
    //   const id_funcion = this.getIdFuncionABuscar(id);

    //   //Si no existe la funcion
    //   if (!this.hasFuncion(id_funcion)) {
    //     EntornoAux.getInstance().estoyBuscandoEnFuncion = false;
    //     return null
    //   };
    //   //Si existe la funcion voy a ejecutar sus instrucciones
    //   const funcion = this.getFuncion(id_funcion);
    //   //Hago una copia del entorno actual para que me afecte la ejecucion de las instrucciones de la funcion
    //   const copia_entorno = _.cloneDeep(this);
    //   //Creo el entorno de la funcion
    //   const entorno_fn = new Entorno(copia_entorno);
    //   //Ejecuto las instrucciones de la funcion
    //   for (let instruccion of funcion.instrucciones) {
    //     instruccion.ejecutar(entorno_fn);
    //     // Valido si luego de la ejecucion de la instruccion ya existe la variable que busco
    //     if (entorno_fn.hasVariable(id)) {
    //       EntornoAux.getInstance().estoyBuscandoEnFuncion = false;
    //       return entorno_fn.getVariable(id);
    //     }
    //   }
    //   EntornoAux.getInstance().estoyBuscandoEnFuncion = false;
    // }
    return null;
  }

  hasVariable(id: string): boolean {
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (e.variables.has(id)) {
        return true;
      }
    }
    return false;
  }

  updateValorVariable(id: string, valor: any) {
    const variable = this.getVariable(id);
    if (variable) {
      variable.valor = valor;
    }
  }

  getType(id: string): Type {
    for (let e: Entorno = this; e != null; e = e.padre) {
      let type = e.types.get(id);
      if (type != null) return type;
    }
    return null;
  }

  setType(type: Type): void {
    this.types.set(type.id, type);
  }

  setFuncion(funcion: Funcion) {
    this.funciones.set(funcion.identificador, funcion);
  }

  hasFuncion(id: string): boolean {
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (e.funciones.has(id)) {
        return true;
      }
    }
    return false;
  }

  getFuncion(id: string): Funcion {
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (e.funciones.has(id)) {
        return e.funciones.get(id);
      }
    }
    return null;
  }

  //Utilizado para obtener el id de la funcion en la cual debo ir a buscar
  getIdFuncionABuscar(id: string): string {
    const ids = id.split("_", 2);
    return ids[1] ?? '';
  }

  getEntornoGlobal(): Entorno {
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (e.padre == null) return e;
    }
  }

  public toString(): string {
    let salida = `*** ETIQUETAS ****\n`;
    /*for (let variable of Array.from(this.etiquetas.values())) {
      salida += variable.recorrer("GLOBAL");
    }*/
    return salida;
  }

  getVariables() : Array<Variable>{
    return Array.from(this.variables.values());
  }

  //NUEVOS XQUERY

  insertarVariable(simbolo_: Simbolo, linea_:number):void{
    if (this.simbolos.has(simbolo_.identificador)){
      //Error, ya existe esta variable
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: linea_.toString(),
          descripcion: ('La variable '+simbolo_.identificador+' ya existe'),
        })
      );
      return;
    }
    
    this.simbolos.set(simbolo_.identificador,simbolo_);
  }

  buscarVariable(identificador_:string, linea_:number):Simbolo{
    for (let e: Entorno = this; e != null; e = e.padre) {
      let variable = e.simbolos.get(identificador_);
      if (variable != null) {
        return variable;
      }
    }
    Errores.getInstance().push(
      new Error({
        tipo: "semantico",
        linea: (linea_+1).toString(),
        descripcion: ('La variable '+identificador_+' no existe'),
      })
    );
    return null;

  }

  insertarFuncion(funcion_: Funcion, linea_:number):void{
    if (this.funciones.has(funcion_.identificador)){
      //Error, ya existe esta variable
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: linea_.toString(),
          descripcion: ('La funcion declarada ya existe'),
        })
      );
      return;
    }
    
    this.funciones.set(funcion_.identificador,funcion_);
  }

  //No se uso
  buscarFuncion3(identificador_:string, linea_:number):Funcion{
    for (let e: Entorno = this; e != null; e = e.padre) {
      let funcion_ = e.funciones.get(identificador_);
      //console.log(funccion_);
      if ((funcion_ != null)&&(funcion_!=undefined)) {
        return funcion_;
      }
    }//FIN DEL FOR
    Errores.getInstance().push(
      new Error({
        tipo: "semantico",
        linea: linea_.toString(),
        descripcion: ('La funcion no existe'),
      })
    );
    return null;
  }
  
  //No se uso
  buscarFuncion2(identificador_:string, linea_:number):Funcion{
    for (let e: Entorno = this; e != null; e = e.padre) {
      if (this.funciones.has(identificador_)) {
        let funcionRes:Funcion =e.funciones.get(identificador_);
        return funcionRes;  
      }
    }
    Errores.getInstance().push(
      new Error({
        tipo: "semantico",
        linea: linea_.toString(),
        descripcion: ('La funcion ndsadaso existe'),
      })
    );
    return null;
  }

  //ESTA SE USO
  buscarFuncion(nombre:string, linea:number):Funcion {
    var e:Entorno = this;
    while(e!=null){
       if(e.funciones.has(nombre))
       {
           var sim:Funcion = e.funciones.get(nombre);
           return sim;
       }
       e = e.padre;
    }
    Errores.getInstance().push(
      new Error({
        tipo: "semantico",
        linea: linea.toString(),
        descripcion: ('La funcion no existe'),
      })
    );
    return null;
}


//No se uso
buscarVariable2(nombre:string, linea:number):Simbolo {
  var e:Entorno = this;
  while(e!=null){
     if(e.simbolos.has(nombre))
     {
         var sim:Simbolo = e.simbolos.get(nombre);
         return sim;
     }
     e = e.padre;
     //console.log("se convirtio en padre");
  }
  return null;
}

}
