import { Instruccion } from '../Interfaces/Instruccion';
import { Objeto } from '../Expresiones/Objeto';

export class AST {
	public instrucciones: Array<Instruccion>;
	// public objeto:Array<Objeto>

	constructor(instrucciones: Array<Instruccion>) {
		this.instrucciones = instrucciones;
	}
}
