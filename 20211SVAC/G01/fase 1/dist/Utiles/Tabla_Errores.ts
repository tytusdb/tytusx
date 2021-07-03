export class TablaError{
    private numero : number;

    constructor(private linea : number, private columna : number, private tipo : string, private mensaje : string){
    }

    public setNumero(numero : number){
        this.numero = numero;
    }
}

export let lerrores : Array<TablaError> = new Array();