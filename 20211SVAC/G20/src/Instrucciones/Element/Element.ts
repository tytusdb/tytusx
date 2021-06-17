import { AST } from '../../AST/AST';
import { Entorno } from '../../AST/Entorno';
import { Instruccion } from '../../Interfaces/Instruccion';

export enum TypeOperation {
	SUMA,
	RESTA,
	MULTIPLICACION,
	DIVISION,
	IGUAL,
	DIFERENTE,
	MENOR,
	MAYOR,
	MENOR_IGUAL,
	MAYOR_IGUAL,
	OR,
	AND,
	MOD,
	DOUBLE,
	INTEGER,
	STRING,
	ID,
	LAST,
	POSITION,
	TEXT,
	ATRIBUTO,
}

export enum TypeElement {
	ATRIBUTO,
	NODO,
	ALL,
	CURRENT,
	PARENT,
	ALL_ATRIBTO,
}

export class Operation implements Instruccion {
	linea: number;
	columna: number;
	leftOp?: Operation;
	rightOp?: Operation;
	typeOp: TypeOperation;
	value?: string;

	constructor(line: number, column: number, type: TypeOperation) {
		this.linea = line;
		this.columna = column;
		this.typeOp = type;
	}

	/* OPERACION BINARIA */
	saveBinaryOp(left: Operation, right: Operation) {
		this.leftOp = left;
		this.rightOp = right;
	}

	/* OPERACION UNARIA */
	saveUnaryOp(left: Operation) {
		this.leftOp = left;
	}

	/* OPERACION PRIMITIVA */
	savePrimitiveOp(value: string) {
		this.value = value;
	}

	ejecutar(ent: Entorno, arbol: AST) {
		throw new Error('Method not implemented.');
	}
}

export class Filter implements Instruccion {
	linea: number;
	columna: number;
	name: string;
	operation: Operation;

	constructor(
		line: number,
		column: number,
		name: string,
		operation: Operation
	) {
		this.linea = line;
		this.columna = column;
		this.name = name;
		this.operation = operation;
	}

	ejecutar(ent: Entorno, arbol: AST) {
		throw new Error('Method not implemented.');
	}
}

export class Element implements Instruccion {
	linea: number;
	columna: number;
	name: string;
	type: TypeElement;
	slashes: number;
	filters: Operation;

	constructor(
		name: string,
		type: TypeElement,
		filters: Operation,
		line: number,
		column: number
	) {
		this.linea = line;
		this.columna = column;
		this.name = name;
		this.type = type;
		this.slashes = 0;
		this.filters = filters;
	}

	ejecutar(ent: Entorno, arbol: AST) {
		throw new Error('Method not implemented.');
	}
}
