
enum TipoDato{
    objeto = "Objeto",
    atributo = "Atributo",
    cadena = "Cadena",
    numero = "Numero",
    booleano = "Booleano",
    err = "Error",
    global = "Global",
    xpathValue = "Xpath Query",
}

enum TipoDato3D{
    objeto = 0,
    atributo = 1,
    cadena = 2,
    numero = 3,
    booleano = 4,
    err = 5,
    global = 6,
    xpathValue = 7,

}

class Tipo{
    private tipoDato: TipoDato;

    constructor(tipoDato: TipoDato) {
        this.tipoDato = tipoDato;
    }

    public toString():string{
        return this.tipoDato.toString();
    }

    public esBoolean():Boolean{
        return this.tipoDato == TipoDato.booleano;
    }
    public esNumero():Boolean{
        return this.tipoDato == TipoDato.numero;
    }
    public esCadena():Boolean{
        return this.tipoDato == TipoDato.cadena;
    }
    public esAtributo():Boolean{
        return this.tipoDato == TipoDato.atributo;
    }
    public esObjeto():Boolean{
        return this.tipoDato == TipoDato.objeto;
    }
    public esError():Boolean{
        return this.tipoDato == TipoDato.err;
    }

    public esPrimitivo(){
        return this.tipoDato == TipoDato.cadena || this.tipoDato == TipoDato.numero || this.tipoDato == TipoDato.booleano;
    }

    public esXpath():Boolean{
        return this.tipoDato == TipoDato.xpathValue;
    }

    public esGlobal():Boolean{
        return this.tipoDato == TipoDato.global;
    }

    public equals(tipo: Tipo):boolean{
        return this.tipoDato == tipo.tipoDato;
    }

    public esEquivalente(tipo: Tipo):boolean{
        let esEquivalente = false;
        if(this.esBoolean()  && tipo.esBoolean())
            esEquivalente = true;
        else if(this.esNumero() && (tipo.esNumero() || tipo.esBoolean()))
            esEquivalente = true;
        else if(this.esCadena() && (tipo.esCadena() || tipo.esNumero() || tipo.esBoolean()) )
            esEquivalente = true;
        else if( this.tipoDato == tipo.tipoDato)
            esEquivalente = true;
        return esEquivalente;
    }

    public getTipo():number{
        switch (this.tipoDato){
            case TipoDato.objeto:
                return TipoDato3D.objeto;
            case TipoDato.atributo:
                return TipoDato3D.atributo;
            case TipoDato.cadena:
                return TipoDato3D.cadena;
            case TipoDato.booleano:
                return TipoDato3D.booleano;
            case TipoDato.numero:
                return TipoDato3D.numero;
            case TipoDato.err:
                return TipoDato3D.err;
            case TipoDato.global:
                return TipoDato3D.global;
            case TipoDato.xpathValue:
                return TipoDato3D.xpathValue;
            default :
                throw new Error("Tipo de dato no reconocido: "+this.tipoDato);
        }

    }
}