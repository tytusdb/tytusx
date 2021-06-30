

export class Optimizacion{
    fila: number;
    columna: number;
    tipo: ReglaOptimizacion;
    codigoAntes: string;
    codigoAhora: string;
    constructor(tipo: ReglaOptimizacion, codigoAntes: string, codigoAhora: string, fila: number, columna: number){
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigoAntes = codigoAntes;
        this.codigoAhora = codigoAhora;
    }

    getFila(): number{
        return this.fila;
    }

    getColumna(): number{
        return this.columna;
    }

    getCodigoAntes(){
        return this.codigoAntes;
    }

    getCodigoAhora(){
        return this.codigoAhora;
    }


    tipoReglaToString(): String{
        switch(this.tipo){
            case ReglaOptimizacion.REGLA1:
                return "Regla 1";
            case ReglaOptimizacion.REGLA2:
                return "Regla 2";
            case ReglaOptimizacion.REGLA3:
                return "Regla 3";
            case ReglaOptimizacion.REGLA4:
                return "Regla 4";
            case ReglaOptimizacion.REGLA5:
                return "Regla 5";
            case ReglaOptimizacion.REGLA6:
                return "Regla 6";
            case ReglaOptimizacion.REGLA7:
                return "Regla 7";
            case ReglaOptimizacion.REGLA8:
                return "Regla 8";
            case ReglaOptimizacion.REGLA9:
                return "Regla 9";
            case ReglaOptimizacion.REGLA10:
                return "Regla 10";
            case ReglaOptimizacion.REGLA10:
                return "Regla 11";
            case ReglaOptimizacion.REGLA10:
                return "Regla 12";
            case ReglaOptimizacion.REGLA10:
                return "Regla 13";
            case ReglaOptimizacion.REGLA10:
                return "Regla 14";                                                                
            case ReglaOptimizacion.REGLA10:
                return "Regla 15";
            case ReglaOptimizacion.REGLA10:
                return "Regla 16";                                
            default:
                return "Regla x";
        }
    }
}

export enum ReglaOptimizacion{
    REGLA1,
    REGLA2,
    REGLA3,
    REGLA4,
    REGLA5,
    REGLA6,
    REGLA7,
    REGLA8,
    REGLA9,
    REGLA10,
    REGLA11,
    REGLA12,
    REGLA13,
    REGLA14,
    REGLA15,
    REGLA16,
}