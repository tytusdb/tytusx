import { Objeto } from './Expresiones/Objeto';
import { Entorno } from './AST/Entorno';
import gramaticaA from './GramaticaXPATH/XPATH_A';
import gramaticaD from './GramaticaXPATH/XPATH_D';
import gramaticaXMLA from './GramaticaXML/gramaticaA';
import gramaticaXMLD from './GramaticaXML/gramaticaD';

var Salidas = 1;

export default function ejecutarCodigo(entrada: string, tipo: string, entradaxml: string) {
	Salidas = 1;
	if (tipo === 'a') {
		const XPATH = gramaticaA.parse(entrada);
		const XML = gramaticaXMLA.parse(entradaxml);
		darPadre(XML[0].listaObjetos);
		var Supp = [];
		Supp.push(XML[0].listaObjetos);
		var Salida = ConsultasAscendente(XPATH.Consultas, Supp);
		var retorno = {
			XPATH: XPATH,
			XML: XML,
			Salida: Salida
		};
		return retorno;
	} else {
		const XPATH2 = gramaticaD.parse(entrada);
		const XML2 = gramaticaXMLD.parse(entradaxml);
		darPadre(XML2[0].listaObjetos);
		var Salida2 = '';
		var retorno2 = {
			XPATH: XPATH2,
			XML: XML2,
			Salida: Salida2
		};
		return retorno2;
	}
}

const darPadre = (p: Objeto) => {
	for (const i in p.listaObjetos) {
		p.listaObjetos[i].padre = p;
		darPadre(p.listaObjetos[i]);
	}
};

function ConsultasAscendente(Consultas: any, objetos: any): any {
	var SalidaConsulta = '';
	for (var i = 0; i < Consultas.length; i++) {
		SalidaConsulta += ConsultaAscendente(Consultas[i], objetos);
	}
	return SalidaConsulta;
}

function ConsultaAscendente(Consulta: any, objetos: any): any {
	if (Consulta.Relativo === '' || Consulta.Relativo === '/') {
		return AR(Consulta, objetos);
	} else if (Consulta.Relativo === '//') {
		return AN(Consulta, objetos);
	}
	return '';
}

//Ascendente Relativa
function AR(Consulta: any, objetos: any): any {
	switch (Consulta.Posicion.Valor) {
		case 'ID': {
			return ARI(Consulta, objetos, Consulta.Posicion.Hijos[0].Valor);
		}
		case '*': {
			break;
		}
		case 'node()': {
			break;
		}
		case 'text()': {
			break;
		}
		case '@': {
			break;
		}
		case '.': {
			break;
		}
		case '..': {
			break;
		}
	}
	return '';
}

//Ascendente Relativa ID
function ARI(Consulta: any, objetos: any, ID: string): any {
	var ListaObjetos = [];
	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].identificador === ID) {
			ListaObjetos.push(objetos[i]);
		}
	}
	if (ListaObjetos.length > 0) {
		if (Consulta.Predicado.Valor === '') {
			if (Consulta.Secuencia === '') {
				var texto = '';
				for (var i = 0; i < ListaObjetos.length; i++) {
					texto += Salidas + '. ' + ImprimirTextoA(ListaObjetos[i]) + '\n';
					Salidas += 1;
				}
				return texto;
			} else {
				var texto = '';
				for (var i = 0; i < ListaObjetos.length; i++) {
					texto += ConsultaAscendente(Consulta.Secuencia, ListaObjetos[i].listaObjetos);
				}
				return texto;
			}
		}
	}
	return '';
}

//ImprimirTextosA
function ImprimirTextoA(objeto: any): any {
	var texto = '';
	if (objeto.texto != '') {
		for (var i = 0; i < objeto.texto.length; i++) {
			texto += objeto.texto[i] + ' ';
		}
	} else {
		for (var i = 0; i < objeto.listaObjetos.length; i++) {
			texto += ImprimirTextoA(objeto.listaObjetos[i]);
		}
	}
	return texto;
}

//Ascendente NoRelativa
function AN(Consulta: any, objetos: any): any {
	switch (Consulta.Posicion.Valor) {
		case 'ID': {
			break;
		}
		case '*': {
			break;
		}
		case 'node()': {
			break;
		}
		case 'text()': {
			break;
		}
		case '@': {
			break;
		}
		case '.': {
			break;
		}
		case '..': {
			break;
		}
	}
	return '';
}
