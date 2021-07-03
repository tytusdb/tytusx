import { NodoXML } from '../parser/Nodes/NodoXml';
import { EnvironmentXML } from '../parser/Symbol/EnviromentXML';
import { Error_ } from '../parser/Error';
import { errores } from '../parser/Errores';
import { XMLSymbol, TypeXml } from '../parser/Symbol/xmlSymbol';

export class TraductorXQuery {
  constructor() {}

  traducir(ast: NodoXML, env: EnvironmentXML) {
    console.log(ast);
    if (ast != null) {
      let tipo = ast.getTipo();
      console.log(tipo);
      // switch (tipo) {

      // }
    }
    return '//traduccion\n';
  }
}
