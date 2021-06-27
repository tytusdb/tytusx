
class TablaSimbolosXquery {
    private _tsPadre:TablaSimbolosXquery;
    private _nombre:string;
    private _listaSimbolos:Array<Simbolo>;
    private _esGlobal:boolean;

    constructor(tsPadre : TablaSimbolosXquery, nombre:string) {
        this._tsPadre = tsPadre;
        this._nombre = nombre;
        this._listaSimbolos = [];
        this._esGlobal = nombre == 'GLOBAL' ? true : false;
    }

    public agregarSimbolo(simbolo: Simbolo): boolean{
        if(!this.existeSimbolo(simbolo)){
            this._listaSimbolos.push(simbolo);
            return true;
        }
        return false;
    }

    public existeSimbolo(simbolo:Simbolo): boolean{
        for(let actual of this._listaSimbolos){
            if(actual.equals(simbolo))
                return true;
        }
        return false;
    }

    public modificarSimbolo(simbolo: Simbolo): boolean{
        for(let actual : TablaSimbolosXquery = this; actual != null; actual = actual.tsPadre  ){
            if(actual.modifySimbol(simbolo)){
                return true;
            }
        }
        return false;
    }

    private modifySimbol(simbolo:Simbolo):boolean{
        let i = 0;
        for(let actual of this._listaSimbolos){
            if(actual.equals(simbolo)){
                this._listaSimbolos[i] = simbolo;
                return true;
            }
            i++;
        }
        return false;
    }

    public obtenerSimbolo(identifier: string): Simbolo{
        let simbolo:Simbolo;
        for(let actual : TablaSimbolosXquery = this; actual != null; actual = actual.tsPadre  ){
            simbolo = actual.getSimbolo(identifier);
            if(simbolo != null){
                return simbolo;
            }
        }
        return null;
    }


    private getSimbolo(identifier:string): Simbolo{
        for(let actual of this._listaSimbolos){
            if(actual.identificador == identifier)
                return actual;
        }
        return null;
    }


    get tsPadre(): TablaSimbolosXquery {
        return this._tsPadre;
    }

    set tsPadre(value: TablaSimbolosXquery) {
        this._tsPadre = value;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(value: string) {
        this._nombre = value;
    }

    get listaSimbolos(): Array<Simbolo> {
        return this._listaSimbolos;
    }

    set listaSimbolos(value: Array<Simbolo>) {
        this._listaSimbolos = value;
    }

    get esGlobal(): boolean {
        return this._esGlobal;
    }

    set esGlobal(value: boolean) {
        this._esGlobal = value;
    }
}