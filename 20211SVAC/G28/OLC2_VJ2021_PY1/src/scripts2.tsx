import { Objeto } from './Expresiones/Objeto';
import { Entorno } from './AST/Entorno';
// import { AST } from './AST/AST';
// import { Instruccion } from './Interfaces/Instruccion';

import gramaticaA from './GramaticaXML/gramaticaA';
import gramaticaD from './GramaticaXML/gramaticaD';

export default function ejecutarCodigo(entrada: string, tipo: string) {
	if (tipo === 'a') {
		// aqui ascendente
		const objetos = gramaticaA.parse(entrada);
		darPadre(objetos[0].listaObjetos);
		console.log('impresion 2' + objetos[0].listaObjetos);
		const entornoGlobal: Entorno = new Entorno(null);
		return objetos;
	} else {
		// aqui descendente
		const objetos2 = gramaticaD.parse(entrada);
		const entornoGlobal2: Entorno = new Entorno(null);
		// return gramaticaD;
		return objetos2;
	}
}

const darPadre = (p: Objeto) => {
	for (const i in p.listaObjetos) {
		p.listaObjetos[i].padre = p;
		darPadre(p.listaObjetos[i]);
	}
};
