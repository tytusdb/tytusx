abstract class Codigo3d{
    private _linea: number;
    private _columna: number;
    private _eliminado: boolean;

    constructor(linea: number, columna: number) {
        this._linea = linea;
        this._columna = columna;
        this._eliminado = false;
    }

    optimizarCodigo():any{

    }


    get eliminado(): boolean {
        return this._eliminado;
    }

    set eliminado(value: boolean) {
        this._eliminado = value;
    }


    get linea(): number {
        return this._linea;
    }

    get columna(): number {
        return this._columna;
    }

    public toString():string{
        return "";
    }
}