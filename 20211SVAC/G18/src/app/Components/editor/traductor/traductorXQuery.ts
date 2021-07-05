import { NodoXML } from '../parser/Nodes/NodoXml';
import { EnvironmentXML } from '../parser/Symbol/EnviromentXML';
import { Error_ } from '../parser/Error';
import { errores } from '../parser/Errores';
import { XQuerySymbol, TypeXQuery } from '../parser/Symbol/xquerySymbol';
import { EnvironmentXQuery } from '../parser/Symbol/EnviromentXQueryTrad';
import { element } from 'protractor';
import { _Console } from '../parser/Util/Salida';

//traducciones

export class TraductorXQuery {
  constructor() {}

  traducir(ast: NodoXML, envXML: EnvironmentXML, envXQuery: EnvironmentXQuery) {
    // console.log(_Console.count);
    // console.log(_Console.heapPointer);
    // console.log(_Console.stackPointer);
    // console.log(_Console.heapPointer2);
    // console.log(_Console.stackPointer2);
    // console.log(_Console.labels);
    // console.log(_Console.salida);
    // console.log(ast);
    if (ast != null) {
      let tipo = ast.getTipo();
      // console.log(tipo);
      switch (tipo) {
        case 'LExpresiones':
          ast.getHijos().forEach((element) => {
            this.traducir(element, envXML, envXQuery);
          });
          break;
        case 'Let':
          this.traducirLet(ast, envXML, envXQuery);
          break;
      }
    }
    return _Console;
  }

  private traducirLet(
    ast: NodoXML,
    envXML: EnvironmentXML,
    envXQuery: EnvironmentXQuery
  ) {
    // console.log(ast, 'ejecutando let');
    //var name
    let varName = ast.getHijos()[0].name;
    //expresion
    let exp = ast.getHijos()[1];
    switch (exp.getTipo()) {
      case 'TO':
        // (exp to exp)
        break;
      case ',':
        // (exp , exp)
        break;
      case 'ExprLogica':
        // logica
        break;
      case 'Expr':
        _Console.salida += `// Operaciones Aritmeticas\n`;
        // aritmetica
        var ar = this.traducirAritmetica(exp, envXML, envXQuery);
        //traducir
        var c = _Console.count;
        var h = _Console.heapPointer;
        var s = _Console.stackPointer;
        _Console.salida += `t${c}=hxquery;\n`;
        _Console.salida += `HeapXQuery[(int)hxquery] = t${c - 1};\n`;
        _Console.salida += `hxquery = hxquery + 1;\n`;
        _Console.salida += `StackXQuery[(int)pxquery] = t${c};\n`;
        _Console.salida += 'pxquery = pxquery +1;\n\n';
        _Console.count++;
        _Console.heapPointer++;
        _Console.stackPointer++;
        //agregar a tabla de simbolos
        var sym = new XQuerySymbol(
          ar[1],
          varName,
          ar[0],
          exp.line,
          exp.column,
          envXQuery.nombre
        );
        sym.setPosicion(s);
        envXQuery.addSimbolo(sym);
        break;
      case 'Exp':
        // xpath
        break;
      case 'Lexp':
        // xpath
        break;
      case 'Syntfin':
        // xpath
        break;
      case 'Fin':
        //valor || funcion xpath
        if (exp.type == exp.name) {
          //valor opc || preservada opc
          if (!exp.listaNodos[1]) {
            var val = this.traducirValor(exp.listaNodos[0], envXML, envXQuery);
            if (val[1] < 4) {
              if (val[1] == 2) {
                //string
                // traducir
                var c = _Console.count;
                var h = _Console.heapPointer;
                var s = _Console.stackPointer;
                _Console.salida += `// let ${varName}=${val[0]}\n`;
                _Console.salida += `t${c} = hxml;\n`;
                c++;
                for (var x = 0; x < val[0].length; x++) {
                  var char = val[0].charCodeAt(x);
                  _Console.salida += `HeapXQuery[(int)hxquery] = ${char};\n`;
                  _Console.salida += `hxquery = hxquery + 1;\n`;
                  h++;
                }
                _Console.salida += `HeapXQuery[(int)hxquery] = -1;\n`;
                _Console.salida += `hxquery = hxquery + 1;\n`;
                _Console.salida += `StackXQuery[(int)pxquery] = t${c - 1};\n`;
                _Console.salida += 'pxquery = pxquery + 1;\n\n';
                _Console.count = c;
                _Console.heapPointer = h;
                _Console.stackPointer = s;
              } else {
                //traducir
                var c = _Console.count;
                var h = _Console.heapPointer;
                var s = _Console.stackPointer;
                _Console.salida += `// let ${varName}=${val[0]}\n`;
                if (val[0] == 'true') {
                  val[0] = 1;
                } else if (val[0] == 'false') {
                  val[0] = 0;
                }
                _Console.salida += `t${c}=hxquery;\n`;
                _Console.salida += `HeapXQuery[(int)hxquery] = ${val[0]};\n`;
                _Console.salida += `hxquery = hxquery + 1;\n`;
                _Console.salida += `StackXQuery[(int)pxquery] = t${c};\n`;
                _Console.salida += 'pxquery = pxquery +1;\n\n';
                _Console.count++;
                _Console.heapPointer++;
                _Console.stackPointer++;
              }
              //agregar a tabla de simbolos
              var sym = new XQuerySymbol(
                val[1],
                varName,
                val[0],
                exp.line,
                exp.column,
                envXQuery.nombre
              );
              sym.setPosicion(s);
              envXQuery.addSimbolo(sym);
            } else {
              if (val[0]) {
                //traducir
                var c = _Console.count;
                var h = _Console.heapPointer;
                var s = _Console.stackPointer;
                _Console.salida += `// let ${varName}=${val[0].nombre}\n`;
                _Console.salida += `t${c}=${val[0].posicion};\n`;
                _Console.salida += `StackXQuery[(int)pxquery] = t${c};\n`;
                _Console.salida += 'pxquery = pxquery + 1;\n\n';
                _Console.count++;
                _Console.stackPointer++;
                //agregar a tabla de simbolos
                var sym = new XQuerySymbol(
                  val[0].tipo,
                  varName,
                  val[0].valor,
                  exp.line,
                  exp.column,
                  envXQuery.nombre
                );
                sym.setPosicion(s);
                envXQuery.addSimbolo(sym);
              } else {
                //error
                errores.push(
                  new Error_(
                    exp.getLine(),
                    exp.getColumn(),
                    'Semantico',
                    `La variable no esta declarada => ${exp.listaNodos[0].nombre}`
                  )
                );
              }
            }
          } else {
            //array
          }
        }
        break;
      default:
        break;
    }
  }

  private traducirAritmetica(
    ast: NodoXML,
    envXML: EnvironmentXML,
    envXQuery: EnvironmentXQuery
  ) {
    if (ast) {
      // console.log('Traducir aritmetica');
      // console.log(ast);
      switch (ast.name) {
        case '+':
          //ejecutar izq
          var val1 = this.traducirAritmetica(
            ast.listaNodos[0],
            envXML,
            envXQuery
          );
          //ejecutar der
          var val2 = this.traducirAritmetica(
            ast.listaNodos[1],
            envXML,
            envXQuery
          );
          var t = 1;
          if (val1[1] === 2 || val2[1] === 2) t = 2;

          //traducir
          var c = _Console.count;
          var h = _Console.heapPointer;
          var s = _Console.stackPointer;

          _Console.salida += `t${c}=${val1[2]} + ${val2[2]};\n`;

          _Console.count++;
          _Console.heapPointer++;
          _Console.stackPointer++;

          //sumar
          return [val1[0] + val2[0], t, `t${c}`];
        case '-':
          //ejecutar izq
          var val1 = this.traducirAritmetica(
            ast.listaNodos[0],
            envXML,
            envXQuery
          );
          //ejecutar der
          var val2 = this.traducirAritmetica(
            ast.listaNodos[1],
            envXML,
            envXQuery
          );

          //traducir
          var c = _Console.count;
          var h = _Console.heapPointer;
          var s = _Console.stackPointer;

          _Console.salida += `t${c}=${val1[2]} - ${val2[2]};\n`;

          _Console.count++;
          _Console.heapPointer++;
          _Console.stackPointer++;

          //restar
          return [val1[0] - val2[0], 1, `t${c}`];
        case '*':
          //ejecutar izq
          var val1 = this.traducirAritmetica(
            ast.listaNodos[0],
            envXML,
            envXQuery
          );
          //ejecutar der
          var val2 = this.traducirAritmetica(
            ast.listaNodos[1],
            envXML,
            envXQuery
          );

          //traducir
          var c = _Console.count;
          var h = _Console.heapPointer;
          var s = _Console.stackPointer;

          _Console.salida += `t${c}=${val1[2]} * ${val2[2]};\n`;

          _Console.count++;
          _Console.heapPointer++;
          _Console.stackPointer++;

          //multiplicar
          return [val1[0] * val2[0], 1, `t${c}`];
        case 'div':
          //ejecutar izq
          var val1 = this.traducirAritmetica(
            ast.listaNodos[0],
            envXML,
            envXQuery
          );
          //ejecutar der
          var val2 = this.traducirAritmetica(
            ast.listaNodos[1],
            envXML,
            envXQuery
          );

          //traducir
          var c = _Console.count;
          var h = _Console.heapPointer;
          var s = _Console.stackPointer;

          _Console.salida += `t${c}=${val1[2]} / ${val2[2]};\n`;

          _Console.count++;
          _Console.heapPointer++;
          _Console.stackPointer++;

          //dividir
          return [val1[0] / val2[0], 1, `t${c}`];
        case 'mod':
          //ejecutar izq
          var val1 = this.traducirAritmetica(
            ast.listaNodos[0],
            envXML,
            envXQuery
          );
          //ejecutar der
          var val2 = this.traducirAritmetica(
            ast.listaNodos[1],
            envXML,
            envXQuery
          );
          //traducir
          var c = _Console.count;
          var h = _Console.heapPointer;
          var s = _Console.stackPointer;

          _Console.salida += `t${c}=${val1[2]} % ${val2[2]};\n`;

          _Console.count++;
          _Console.heapPointer++;
          _Console.stackPointer++;

          //residuo
          return [val1[0] % val2[0], 1, `t${c}`];
        case 'or':
          //ejecutar izq
          var val1 = this.traducirAritmetica(
            ast.listaNodos[0],
            envXML,
            envXQuery
          );
          //ejecutar der
          var val2 = this.traducirAritmetica(
            ast.listaNodos[1],
            envXML,
            envXQuery
          );
          //traducir
          var c = _Console.count;
          var h = _Console.heapPointer;
          var s = _Console.stackPointer;
          var l = _Console.labels;

          _Console.salida += `// OR\n`;
          _Console.salida += `if (${val1[2]} == 0) goto L${l};\n`;
          _Console.salida += `t${c}=1;\n`;
          _Console.salida += `goto L${l + 2};\n`;
          _Console.salida += `L${l}:\nif (${val2[2]} == 0) goto L${l + 1};\n`;
          _Console.salida += `t${c}=1;\n`;
          _Console.salida += `goto L${l + 2};\n`;
          // falso
          _Console.salida += `L${l + 1}:\n t${c}=0;\n`;
          // salida
          _Console.salida += `L${l + 2}:\n\n`;
          l = l + 2;
          c++;
          _Console.labels = l;
          _Console.count = c;
          //or
          return [val1[0] || val2[0], 3, `t${c - 1}`];
        case 'and':
          //ejecutar izq
          var val1 = this.traducirAritmetica(
            ast.listaNodos[0],
            envXML,
            envXQuery
          );
          //ejecutar der
          var val2 = this.traducirAritmetica(
            ast.listaNodos[1],
            envXML,
            envXQuery
          );
          //traducir
          var c = _Console.count;
          var h = _Console.heapPointer;
          var s = _Console.stackPointer;
          var l = _Console.labels;

          _Console.salida += `// AND\n`;
          _Console.salida += `if (${val1[2]} == 1) goto L${l};\n`;
          _Console.salida += `t${c}=0;\n`;
          _Console.salida += `goto L${l + 2};\n`;
          _Console.salida += `L${l}:\nif (${val2[2]} == 1) goto L${l + 1};\n`;
          _Console.salida += `t${c}=0;\n`;
          _Console.salida += `goto L${l + 2};\n`;
          // falso
          _Console.salida += `L${l + 1}:\n t${c}=1;\n`;
          // salida
          _Console.salida += `L${l + 2}:\n\n`;
          l = l + 2;
          c++;
          _Console.labels = l;
          _Console.count = c;
          //and
          return [val1[0] && val2[0], 3];
        case 'Fin':
          if (!ast.listaNodos[1]) {
            var val = this.traducirValor(ast.listaNodos[0], envXML, envXQuery);
            switch (val[1]) {
              case 0:
                //error
                break;
              case 1:
                return [+val[0], 1, +val[0]];
              case 2:
                //string
                // traducir
                var c = _Console.count;
                var h = _Console.heapPointer;
                var s = _Console.stackPointer;

                _Console.salida += `// cadena: ${val[0]}`;
                _Console.salida += `t${c} = hxml;\n`;
                c++;
                for (var x = 0; x < val[0].length; x++) {
                  var char = val[0].charCodeAt(x);
                  _Console.salida += `HeapXQuery[(int)hxquery] = ${char};\n`;
                  _Console.salida += `hxquery = hxquery + 1;\n`;
                  h++;
                }
                _Console.salida += `HeapXQuery[(int)hxquery] = -1;\n`;
                _Console.salida += `hxquery = hxquery + 1;\n`;
                _Console.salida += `StackXQuery[(int)pxquery] = t${c - 1};\n`;
                _Console.salida += 'pxquery = pxquery + 1;\n\n';
                _Console.salida += `t${c} = pxquery -1;\n\n`;
                c++;
                _Console.count = c;
                _Console.heapPointer = h;
                _Console.stackPointer = s;
                return [val[0], 2, `t${c - 1}`];
              case 3:
                return [
                  val[0] === 'true' ? true : false,
                  3,
                  val[0] === 'true' ? 1 : 0,
                ];
              case 4:
                if (val[0]) {
                  switch (val[0].type) {
                    case 0:
                    //error
                    case 1:
                      //traducir
                      var c = _Console.count;
                      var h = _Console.heapPointer;
                      var s = _Console.stackPointer;

                      _Console.salida += `// obtener valor ${val[0].nombre}\n`;
                      _Console.salida += `t${c}=pxquery;\n`;
                      c++;
                      _Console.salida += `pxquery=${val[0].posicion};\n`;
                      _Console.salida += `t${c}=StackXQuery[(int)pxquery];\n`;
                      _Console.salida += `pxquery=t${c - 1};\n`;
                      c++;
                      _Console.count = c;

                      return [+val[0].value, 1, +val[0].value, `t${c}`];
                    case 2:
                      //traducir
                      var c = _Console.count;
                      var h = _Console.heapPointer;
                      var s = _Console.stackPointer;

                      _Console.salida += `// obtener valor ${val[0].nombre}\n`;
                      _Console.salida += `t${c}=pxquery;\n`;
                      c++;
                      _Console.salida += `pxquery=${val[0].posicion};\n`;
                      _Console.salida += `t${c}=StackXQuery[(int)pxquery];\n`;
                      _Console.salida += `pxquery=t${c - 1};\n`;
                      c++;
                      _Console.count = c;
                      return [val[0].value, 2, `t${c}`];
                    case 3:
                      var c = _Console.count;
                      var h = _Console.heapPointer;
                      var s = _Console.stackPointer;

                      _Console.salida += `// obtener valor ${val[0].nombre}\n`;
                      _Console.salida += `t${c}=pxquery;\n`;
                      c++;
                      _Console.salida += `pxquery=${val[0].posicion};\n`;
                      _Console.salida += `t${c}=StackXQuery[(int)pxquery];\n`;
                      _Console.salida += `pxquery=t${c - 1};\n`;
                      c++;
                      _Console.count = c;
                      return [
                        val[0].value === 'true' ? true : false,
                        3,
                        `t${c}`,
                      ];
                  }
                } else {
                  //error
                  errores.push(
                    new Error_(
                      ast.getLine(),
                      ast.getColumn(),
                      'Semantico',
                      `La variable no esta declarada => ${ast.listaNodos[0].nombre}`
                    )
                  );
                  return [val[0], 4, 0];
                }
            }
          }
      }
    }
  }

  private traducirValor(
    ast: NodoXML,
    envXML: EnvironmentXML,
    envXQuery: EnvironmentXQuery
  ) {
    switch (ast.type) {
      case 'ID':
        break;
      case 'NUMBER':
        return [ast.name, 1];
      case 'STRING':
        return [ast.name, 2];
      case 'BOOLEAN':
        return [ast.name, 3];
      case 'VARIABLE':
        return [envXQuery.searchVar(ast.name), 4];
      default:
        break;
    }
  }
}
