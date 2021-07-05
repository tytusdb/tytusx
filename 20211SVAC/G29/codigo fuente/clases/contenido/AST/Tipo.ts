enum tipos{
    NUMBER,
    STRING,
    BOOLEAN,
    VOID,
    ANY,
    ARREGLO,
    TYPE
}

class Tipo{
    type: tipos;
    constructor(type: tipos){
        this.type = type;
    }
    toString(){
        if(this.type === tipos.BOOLEAN){
            return 'boolean';
        }else if(this.type === tipos.NUMBER){
            return 'number';
        }else if(this.type === tipos.STRING){
            return 'string';
        }else if(this.type === tipos.ANY){
            return 'any';
        }else if(this.type === tipos.VOID){
            return 'void';
        }
        return '';
    }
}

export {tipos, Tipo};
