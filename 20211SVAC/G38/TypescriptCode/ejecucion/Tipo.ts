
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
}