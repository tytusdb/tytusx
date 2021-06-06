class Nodo {

    nombre: string;
    atributos: Array<Atributo>;
    nodos: Array<Nodo>;
    texto: string;
    columna: number;
    linea: number;

	constructor($nombre: string, $atributos: Array<Atributo>, $nodos: Array<Nodo>, $texto: string, $linea: number, $columna: number) {
		this.nombre = $nombre;
		this.atributos = $atributos;
		this.nodos = $nodos;
		this.texto = $texto;
		this.linea = $linea;
		this.columna = $columna;
	}
}