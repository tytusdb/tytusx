export enum tipo{
    ENTERO,
    DOBLE,
    BOOLEANO,
    CARACTER,
    CADENA, 
    VOID,
    OBJETO,
    IDENTIFICADOR
}
export default class Tipo{
    
    public type : tipo; 
    public stype : string;

    constructor(stype : string) {
        this.stype = stype;
        this.type = this.getTipo(stype);
    }

    getTipo(stype: string): tipo{
        if(stype == 'DOBLE'){
            return tipo.DOBLE;
        }else if(stype == 'ENTERO'){
            return tipo.ENTERO;
        }else if(stype == 'STRING'){
            return tipo.CADENA;
        }else if(stype == 'BOOLEAN'){
            return tipo.BOOLEANO;
        }else if(stype == 'VOID'){
            return tipo.VOID;
        }else if (stype == 'CHAR'){
            return tipo.CARACTER;
        }else if (stype=='OBJETO'){
            return tipo.OBJETO;
        }else if (stype=='IDENTIFICADOR'){
            return tipo.IDENTIFICADOR;
        }
    }

    getStype():string {
        return this.stype;
    }
}