class EtiquetaC3D extends Codigo3d{
    private _etiqueta: string;

    constructor(etiqueta: string,linea: number, columna: number) {
        super(linea, columna);
        this._etiqueta = etiqueta;
    }


    get etiqueta(): string {
        return this._etiqueta;
    }

    public toString(): string {
        return this._etiqueta+":\n";
    }
}