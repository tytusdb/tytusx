class Acceso {
  constructor() {}
  getTipo(ast) {
    return ast.valor.tipo;
  }

  getValorImplicito(entorno, ast) {
    switch (ast.valor) {
      case "ELEMENTO":
        //0->Elemento 1->itemReserva
        return this.getValorImplicito(entorno, ast.hijos[0]);
      case "EXPRESION":
        //0-> Simbolos 1->itemReserva 2->itemReserva? consulta sola
        //2-> Expresion si vienen varias
        console.error("No estamos bien");
        console.log(entorno);
        if (ast.hijos[0].valor == "SIMBOLOS") {
          let ArregloEntorno = this.getAccionNodo(ast.hijos[0], entorno); //Me devuelve el arreglo de entornos
          if (!ArregloEntorno) {
            return null;
          }
          let respuesta = "";
          let instruccion;

          if (ast.hijos[2].valor == "EXPRESION") {
            instruccion = ast.hijos[2];
          } else {
            instruccion = {
              valor: "TODO_", //Si instruccion.valor es TODO etonces muestro todo el entorno
            };
          }
          if (instruccion.valor == "TODO_") {
            if (ast.hijos[0].hijos[0] == "//") {
              let respuesta = "";
              for (const iterator of ArregloEntorno) {
                respuesta += this.getValorImplicito(iterator, instruccion);
              }
              return respuesta;
            }

            return this.getValorImplicito(entorno, instruccion);
          } else {
            for (const entorno_ of ArregloEntorno) {
              //Iteramos el arreglo de entornos para aplicar estos cambios en todos
              let temrespuesta = this.getValorImplicito(entorno_, instruccion); //Concatenamos todas las respuestas que encontramos
              if (temrespuesta) {
                respuesta += temrespuesta;
              }
            }
          }

          return respuesta;
        } else {
          
          let res = this.comparar(ast.hijos[0], entorno.etiqueta); //Me devuelve el arreglo de entornos
          if (!res) {
            return null;
          }
          let instruccion = {
            valor: "TODO_", //Si instruccion.valor es TODO etonces muestro todo el entorno
          };
          return this.getValorImplicito(entorno,instruccion );
        }

        return null;
      case "TODO_":
        
        let contenido = "";
        let atributo;
          if(entorno.atributos){
            
            atributo={
              etiqueta:entorno.atributos.nombreAtributo,
              valor:entorno.atributos.valorAtributo
            }
          }else{
            atributo="";
          }
        if(entorno.tipo=="completa"){
          
          for (const iterator of entorno.hijos) {
            contenido += this.getValorImplicito(iterator, ast);
          }
          let retorno = new Etiqueta(entorno.etiqueta, entorno.texto, contenido,atributo); //nombre,texto,contenido
          if (retorno) {
            return retorno.obtenerXML();
          }
        }else if(entorno.tipo=="unica"){

          let retorno = new Etiqueta(entorno.etiqueta, entorno.texto, "",atributo,entorno.tipo); //nombre,texto,contenido
          if (retorno) {
            return retorno.obtenerXML();
          }
        }
        
        return null;
      default:
        return null;
    }
  }
  getAccionNodo(AST, entorno) {
    if (AST.hijos[0] == "/") {
      //Accedemos al nodo barra
      if (this.getValidacion(AST.hijos[1], entorno)) {
        //Validamos que la etiqueta del nodo sea igual al entorno actual
        return entorno.hijos;
      }
    } else if (AST.hijos[0] == "//") {
      let objeto = [];
      for (const hijo of entorno.hijos) {
        if (this.getValidacion(AST.hijos[1], hijo)) {
          objeto.push(hijo);
        }
      }
      
      if (objeto.length == 0) {
        return null;
      }
      return objeto;
    }
    return null;
  }
  getValidacion(etiqueta, entorno) {
    
    if (etiqueta.valor == "CONTENIDODOS") {
      return this.comparar(etiqueta.hijos[0], entorno.etiqueta);
    }
    return false;
  }
  comparar(etiqueta, entorno) {
    return etiqueta == entorno;
  }
}
