export class comprimidoInst {
    
}

export class Instruccion {
    tipo: string;
    resultado: string;
    arg1: string;
    arg2: string;
    operador: string;
    cadena: string;

    constructor (tipo: string, cadena:string, resultado: string, operador:string, arg1: string, arg2:string ) {
        this.tipo = tipo;
        this.resultado = resultado;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.cadena = cadena;
        this.operador = operador;
    }


    public getTipo(){
        return this.tipo;
    }

    public getCadena(){
        return this.cadena;
    }
}

export enum tipoInstruccion {
    salto = 1, 
    salto_condicional,

    print, 
    
    etiqueta, 
    llamada_metodo, 

    inicio_metodo,   
    return,

    asignacion_temporal,
    asignacion_stack,
    asignacion_heap,
    
    acceso_stack,
    acceso_heap,
    encabezado
}