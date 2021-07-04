abstract class Simbolo {

    private nombre: string;
    private type: Type;
    private ambito: string;
    private linea: number;
    private columna: number;
    private stackPointer: number;

    constructor(nombre: string, type: Type, linea: number, columna: number) {
        this.nombre = nombre;
        this.type = type;
        this.linea = linea;
        this.columna = columna;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getType(): Type {
        return this.type;
    }

    public setType(type: Type): void {
        this.type = type;
    }

    public getLinea(): number {
        return this.linea;
    }

    public setLinea(linea: number): void {
        this.linea = linea;
    }

    public getColumna(): number {
        return this.columna;
    }

    public setColumna(columna: number): void {
        this.columna = columna;
    }

    public getAmbito(): string {
        return this.ambito;
    }

    public setAmbito(ambito: string): void {
        this.ambito =ambito;
    }

    public getStackPointer(): number {
        return this.stackPointer;
    }

    public setStackPointer(stackPointer: number): void {
        this.stackPointer = stackPointer;
    }

    public abstract getValorImplicito(): string;

    public abstract generateC3D(resultC3D: C3DResult): C3DResult;
}