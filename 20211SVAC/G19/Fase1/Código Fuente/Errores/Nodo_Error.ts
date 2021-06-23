class NodoError{
    private tipo:string;
    private analizador:string;
    private descripcion:string;
    private linea:number;
    private columna:number;

    constructor(tipo:string,analizador:string,descripcion:string,linea:number,columna:number){
        this.tipo=tipo;
        this.analizador=analizador;
        this.descripcion=descripcion;
        this.linea=(linea+1);
        this.columna=(columna+1);
    }

    public gettipo():string{
        return this.tipo;
    }
    public getAnalizador():string{
        return this.analizador;
    }

    public getdescripcion():string{
        return this.descripcion;
    }

    public getlinea():number{
        return this.linea;
    }

    public getcolumna():number{
        return this.columna;
    }
    
}