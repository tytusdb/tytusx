class SaltoC3D extends Codigo3d{
    private _etiquetaSalto : string;

    constructor(etiquetaSalto: string,linea: number, columna: number) {
        super(linea, columna);
        this._etiquetaSalto = etiquetaSalto;
    }


    set etiquetaSalto(value: string) {
        this._etiquetaSalto = value;
    }

    get etiquetaSalto(): string {
        return this._etiquetaSalto;
    }

    regla1():string{
        return this._etiquetaSalto;
    }

    public toString(): string {
        return "goto "+this._etiquetaSalto+";\n";
    }
}