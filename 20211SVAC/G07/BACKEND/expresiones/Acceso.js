class Acceso {
  constructor() {
    this.entornosDoble = [];
    this.indice = -1;
  }
  getTipo(ast) {
    return ast.valor.tipo;
  }

  getValorImplicito(entorno, ast, padre) {
    switch (ast.valor) {
      case "ELEMENTO":
        //0->EXPRESION 1->ELEMENTO_P

        if (ast.hijos[1].valor == "ELEMENTO_P") {
          return (
            this.getValorImplicito(entorno, ast.hijos[0], null) +
            this.getValorImplicito(entorno, ast.hijos[1], null)
          );
        }
        //0->EXPRESION 1->itemReserva
        return this.getValorImplicito(entorno, ast.hijos[0], null);
      case "ELEMENTO_P":
        this.indice = -1;
        indiceAux = 0;
        if (ast.hijos[2].valor == "ELEMENTO_P") {
          return (
            this.getValorImplicito(entorno, ast.hijos[1], null) +
            this.getValorImplicito(entorno, ast.hijos[2], null)
          );
        }
        return this.getValorImplicito(entorno, ast.hijos[1], null);

      case "SIMBOLOSSECU":
      case "EXPRESION":
        //0-> Simbolos 1->itemReserva 2->itemReserva? consulta sola
        //2-> Expresion si vienen varias

        if (ast.hijos[0].valor == "SIMBOLOS") {
          let ArregloEntorno = this.getAccionNodo(ast.hijos[0], entorno, padre); //Me devuelve el arreglo de entornos

          if (ast.hijos[1].valor == "CAJETIN") {
            if (ArregloEntorno) {
              if (padre) {
                this.indice =
                  this.procesarIndice(
                    ast.hijos[1].hijos[1],
                    padre.hijos.length,
                    padre
                  ) - 1;
              } else {
                this.indice =
                  this.procesarIndice(
                    ast.hijos[1].hijos[1],
                    ArregloEntorno.length,
                    ArregloEntorno
                  ) - 1;
              }
            }
            console.error(this.indice);
          }

          if (!ArregloEntorno) {
            return null;
          }

          let respuesta = "";
          let instruccion;
          if (ast.hijos[0].hijos[1].hijos[1]) {
            if (ast.hijos[0].hijos[1].hijos[1].valor == "ARROPROD") {
              let nombreATRIBUTO = ast.hijos[0].hijos[1].hijos[1].hijos[0];

              return this.pocesarArtibuto(nombreATRIBUTO, ArregloEntorno);
            }
          }
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
                if (indiceAux == this.indice || this.indice == -1) {
                  respuesta += this.getValorImplicito(
                    iterator,
                    instruccion,
                    entorno
                  );
                }
                indiceAux++;
              }

              return respuesta;
            }

            if (ast.hijos[0].hijos[1].hijos[0] == "..") {
              return this.getValorImplicito(
                ArregloEntorno[0],
                instruccion,
                padre
              );
            }

            return this.getValorImplicito(entorno, instruccion, padre);
          } else {
            if (ArregloEntorno.length == 0) {
              let temrespuesta = this.getValorImplicito(
                ArregloEntorno,
                instruccion,
                entorno
              );
              return temrespuesta;
            }
            let index = 0;

            for (const entorno_ of ArregloEntorno) {
              //Iteramos el arreglo de entornos para aplicar estos cambios en todos

              let temrespuesta = [];
              let atri = false;

              if (instruccion.hijos[0].hijos[1].hijos[1]) {
                if (
                  instruccion.hijos[0].hijos[1].hijos[1].valor == "ARROPROD"
                ) {
                  let nombreATRIBUTO =
                    instruccion.hijos[0].hijos[1].hijos[1].hijos[0];
                  let res = this.pocesarArtibuto(nombreATRIBUTO, [entorno_]);
                  if (res != null) {
                    atri = true;
                  }
                  temrespuesta.push(res);
                }
              } else {
                for (const iterator of entorno_.hijos) {
                  temrespuesta.push(
                    this.getValorImplicito(iterator, instruccion, entorno_)
                  ); //Concatenamos todas las respuestas que encontramos
                }
              }
              for (const res of temrespuesta) {
                if (res != null) {
                  if (indiceAux == this.indice || this.indice == -1) {
                    respuesta += res;
                  }
                  if (res) {
                    indiceAux++;
                  }
                }
              }
              this.indice = -1;
            }
          }

          return respuesta;
        } else {
          let res = this.comparar(ast.hijos[0], entorno.etiqueta); //Me devuelve el arreglo de entornos
          if (!res) {
            return null;
          }
          //Si solo es nodo entonces si que imprima todo 0->selva
          //si viene mas entonces 0->sselva 1->INTEMRESERVA 2->SimboloSecu
          if (ast.hijos.length > 1) {
            let respuesta = "";
            for (const hijo of entorno.hijos) {
              respuesta += this.getValorImplicito(hijo, ast.hijos[2], entorno);
            }

            return respuesta;
          }
          let instruccion = {
            valor: "TODO_", //Si instruccion.valor es TODO etonces muestro todo el entorno
          };
          return this.getValorImplicito(entorno, instruccion, padre);
        }

        return null;
      case "TODO_":
        let contenido = "";
        let atributo=[];
        if (entorno.atributos) {
          for (const atr of entorno.atributos) {
            atributo.push({
              etiqueta: atr.nombreAtributo,
              valor: atr.valorAtributo,
            });
          }
        } else {
          atributo = "";
        }

        if (entorno.tipo == "completa") {
          for (const iterator of entorno.hijos) {
            contenido += this.getValorImplicito(iterator, ast, entorno);
          }

          let retorno = new Etiqueta(
            entorno.etiqueta,
            entorno.texto,
            contenido,
            atributo
          ); //nombre,texto,contenido
          if (retorno) {
            return retorno.obtenerXML();
          }
        } else if (entorno.tipo == "unica") {
          let retorno = new Etiqueta(
            entorno.etiqueta,
            entorno.texto,
            "",
            atributo,
            entorno.tipo
          ); //nombre,texto,contenido
          if (retorno) {
            return retorno.obtenerXML();
          }
        }

        return null;
      default:
        return null;
    }
  }
  getAccionNodo(AST, entorno, padre) {
    if (AST.hijos[0] == "/") {
      //Accedemos al nodo barra

      if (this.getValidacion(AST.hijos[1], entorno)) {
        //Validamos que la etiqueta del nodo sea igual al entorno actual
        if (!entorno.hijos == []) {
          return [entorno];
        }
        return entorno.hijos;
      } else if (AST.hijos[1].hijos[0] == "@") {
        return [entorno];
      } else if (AST.hijos[1].hijos[0] == "..") {
        return [padre];
      }
    } else if (AST.hijos[0] == "//") {
      this.entornosDoble = [];

      if (AST.hijos[1].hijos[0] == "@") {
        return this.getConsultaDobleAtributo(
          AST.hijos[1].hijos[1].hijos[0],
          entorno.hijos
        );
      }

      return this.getConsultaDoble(AST.hijos[1].hijos[0], entorno.hijos);
    }

    return null;
  }
  pocesarArtibuto(nombreATRIBUTO, entornos) {
    let txt = "";
    for (const entorno of entornos) {
      if (entorno.atributos) {
        if (entorno.atributos.nombreAtributo) {
          if (
            nombreATRIBUTO == entorno.atributos.nombreAtributo ||
            nombreATRIBUTO == "*"
          ) {
            txt +=
              entorno.atributos.nombreAtributo +
              '="' +
              entorno.atributos.valorAtributo +
              '"\n';
          }
        }
      }
    }

    if (txt != "") {
      return txt;
    }

    return null;
  }
  getValidacion(etiqueta, entorno) {
    if (etiqueta.valor == "CONTENIDODOS") {
      if (etiqueta.hijos[0].valor == "RESERVA") {
        return true;
      }

      return this.comparar(etiqueta.hijos[0], entorno.etiqueta);
    }

    return false;
  }
  comparar(etiqueta, entorno) {
    return etiqueta == entorno || etiqueta == "*";
  }
  getConsultaDoble(etiqueta, entornos) {
    if (entornos != null) {
      for (const entorno of entornos) {
        this.getConsultaDoble(etiqueta, entorno.hijos);

        if (etiqueta == entorno.etiqueta || etiqueta == "*") {
          this.entornosDoble.push(entorno);
        }
      }
      if (this.entornosDoble) {
        return this.entornosDoble;
      }
    }
    return null;
  }
  procesarIndice(operaciones, last,entorno) {
    if (operaciones.valor) {
      if (operaciones.valor == "SUM") {
        let num1 = this.procesarIndice(operaciones.hijos[0], last);
        let num2 = this.procesarIndice(operaciones.hijos[2], last);
        return parseInt(num1) + parseInt(num2);
      } else if (operaciones.valor == "RES") {
        let num1 = this.procesarIndice(operaciones.hijos[0], last);
        let num2 = this.procesarIndice(operaciones.hijos[2], last);
        return parseInt(num1) - parseInt(num2);
      } else if (operaciones.valor == "MUL") {
        let num1 = this.procesarIndice(operaciones.hijos[0], last);
        let num2 = this.procesarIndice(operaciones.hijos[2], last);
        return parseInt(num1) * parseInt(num2);
      } else if (operaciones.valor == "DIV") {
        let num1 = this.procesarIndice(operaciones.hijos[0], last);
        let num2 = this.procesarIndice(operaciones.hijos[2], last);
        return parseInt(num1) / parseInt(num2);
      } else if (operaciones.valor == "LAST") {
        return parseInt(last);
      } else if (operaciones.valor == "IGUAL") {
        let tipo;
        let cadena;
        if (operaciones.hijos[0].valor == "ATRIBUTO") {
          tipo={
              tipo:"ATRIBUTO",
              valor:operaciones.hijos[0].hijos[0]
          }
        }
        if (operaciones.hijos[2].valor == "CADENA") {
            cadena=operaciones.hijos[2].hijos[0];
        }

        return this.getIndexByData(tipo,cadena,entorno);

      }
    }
    return operaciones; //No devuelve nada
  }
  getIndexByData(tipo,cadena,entorno){
    
    let index_=-1;
    for (const iterator of entorno.hijos) {
      index_++;
      if(iterator.atributos){
        if(iterator.atributos.nombreAtributo==tipo.valor){
          if(cadena==iterator.atributos.valorAtributo){
            
            return index_;
          }
        }
      }
    }
    return null;
  }

  getConsultaDobleAtributo(etiqueta, entornos) {
    if (entornos != null) {
      for (const entorno of entornos) {
        this.getConsultaDobleAtributo(etiqueta, entorno.hijos);

        if (entorno.atributos) {
          if (etiqueta == entorno.atributos.nombreAtributo || etiqueta == "*") {
            this.entornosDoble.push(entorno);
          }
        }
      }
      if (this.entornosDoble) {
        return this.entornosDoble;
      }
    }
    return null;
  }
}
/*
  
let objeto = [];
      for (const hijo of entorno.hijos) {
        
      }
      
      
*/
