export class Error {
	line?: number;
	column?: number;
	type?: string;
	descripcion: string;

	constructor(
		descripcion: string,
		line: number = 0,
		column: number = 0,
		type: string = ''
	) {
		this.descripcion = descripcion;
		this.line = line;
		this.column = column;
		this.type = type;
	}
}
