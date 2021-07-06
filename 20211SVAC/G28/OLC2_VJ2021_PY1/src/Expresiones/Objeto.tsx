import { Atributo } from './Atributo';

export class Objeto {
	identificador: string;
	texto: string;
	linea: number;
	columna: number;
	listaAtributos: Array<Atributo>;
	listaObjetos: Array<Objeto>;
	padre: Objeto | undefined;

	constructor(
		id: string,
		texto: string,
		linea: number,
		columna: number,
		listaAtributos: Array<Atributo>,
		listaObjetos: Array<Objeto>
	) {
		this.identificador = id;
		this.texto = texto;
		this.linea = linea;
		this.columna = columna;
		this.listaAtributos = listaAtributos;
		this.listaObjetos = listaObjetos;
	}
}
