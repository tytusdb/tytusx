import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaz/expresion";
import { TipoPrim } from "./Primitiva";
import errores from '../Global/ListaError';

export class Operacion implements Expresion{

    linea: number;
    columna: number;
    op_izq: Expresion;
    op_der: Expresion;
    operacion: TipoOperacion;
    tipo: TipoPrim | undefined | null;
    constructor(operacion: TipoOperacion, op_izq:Expresion, op_der:Expresion, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.op_izq = op_izq;
        this.op_der = op_der;
        this.operacion = operacion;
    }

    getTipo(ent: Entorno){
        return this.tipo;
    }

    getValor(entorno: Entorno){
        let opIzq;
        let opDer;
        let resultado;
        //console.log('IZQ: ' + (this.izq === operador)?'operador':'primitivo');
        //console.log('DER: ' + (this.der === operador)?'operador':'primitivo');
        let aux;
        let valIzq;
        let typeIzq;
        let valDer;
        let typeDer;
        
        valIzq = this.op_izq.getValor(entorno);
        typeIzq = this.op_izq.getTipo(entorno);
        valDer = this.op_der.getValor(entorno);
        typeDer = this.op_der.getTipo(entorno);
        
        switch(this.operacion){
            case TipoOperacion.SUMA:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === TipoPrim.ERROR)
                    return resultado;
                switch(typeIzq){
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            case TipoPrim.DOUBLE:                                
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer), this.linea, this.columna);
                                return ('Error semantico: No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case TipoPrim.DOUBLE:
                        switch(typeDer){
                            case TipoPrim.INTEGER:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            case TipoPrim.DOUBLE:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default: 
                        errores.agregarError('semantico', 
                                        'No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                        return ('Error semantico: No se puede sumar ' + this.getStringTipo(typeIzq) + ' con ' 
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }                    
            case TipoOperacion.RESTA:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === TipoPrim.ERROR)
                    return resultado;
                switch(typeIzq){
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            case TipoPrim.DOUBLE:                                
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case TipoPrim.DOUBLE:
                        switch(typeDer){
                            case TipoPrim.INTEGER:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            case TipoPrim.DOUBLE:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq - opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default: 
                        errores.agregarError('semantico', 
                                        'No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                        return ('Error semantico: No se puede restar ' + this.getStringTipo(typeIzq) + ' con ' 
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.MULTIPLICACION:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === TipoPrim.ERROR)
                    return resultado;
                switch(typeIzq){
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            case TipoPrim.DOUBLE:                                
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case TipoPrim.DOUBLE:
                        switch(typeDer){
                            case TipoPrim.INTEGER:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            case TipoPrim.DOUBLE:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default: 
                        errores.agregarError('semantico', 
                                        'No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                        return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) + ' con ' 
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.DIVISION:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === TipoPrim.ERROR)
                    return resultado;
                switch(typeIzq){
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                if (opDer != 0){
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case TipoPrim.DOUBLE:                                
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0){
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case TipoPrim.DOUBLE:
                        switch(typeDer){
                            case TipoPrim.INTEGER:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0){
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case TipoPrim.DOUBLE:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0){
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default: 
                        errores.agregarError('semantico', 
                                        'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                        return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.MOD:
                this.tipo = this.tipoDominanteAritmetica(typeIzq, typeDer);
                if (this.tipo === TipoPrim.ERROR)
                    return resultado;
                switch(typeIzq){
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                if (opDer != 0){
                                    resultado = opIzq % opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case TipoPrim.DOUBLE:                                
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                if (opDer != 0){
                                    resultado = opIzq % opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case TipoPrim.DOUBLE:
                        switch(typeDer){
                            case TipoPrim.INTEGER:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            case TipoPrim.DOUBLE:                             
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                        'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default: 
                        errores.agregarError('semantico', 
                                        'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                        this.linea, this.columna);
                        return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case TipoOperacion.MAYORQUE:
                switch(typeIzq) {
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:

                            case TipoPrim.DOUBLE:
                        }
                    case TipoPrim.DOUBLE:

                    case TipoPrim.CADENA:

                    case TipoPrim.ATRIBUTO:

                    case TipoPrim.FUNCION:

                    case TipoPrim.IDENTIFIER:

                    default: 

                }
            case TipoOperacion.MENORQUE:

            case TipoOperacion.MAYORIGUALQUE:

            case TipoOperacion.MENORIGUALQUE:

            case TipoOperacion.IGUALQUE:

            case TipoOperacion.DIFERENTEQUE:

            case TipoOperacion.AND:

            case TipoOperacion.OR:
                
        }
    }

    getStringTipo(operadorTipo:TipoPrim):string{
        switch(operadorTipo){
            case TipoPrim.INTEGER:
                return 'entero';
            case TipoPrim.DOUBLE:
                return 'doble';
            case TipoPrim.CADENA:
                return 'cadena';
            case TipoPrim.IDENTIFIER:
                return 'id';
            case TipoPrim.ATRIBUTO:
                return 'atributo';
            case TipoPrim.DOT:
                return 'dot';
        }
        return '';
    }

    tipoDominanteAritmetica(ex1:TipoPrim, ex2:TipoPrim):TipoPrim|null {
        if (ex1 == TipoPrim.ERROR || ex2 == TipoPrim.ERROR)
            return TipoPrim.ERROR;
        if (ex1 == TipoPrim.DOUBLE || ex2 == TipoPrim.DOUBLE)
            return TipoPrim.DOUBLE;
        else if (ex1 == TipoPrim.INTEGER || ex2 == TipoPrim.INTEGER)
            return TipoPrim.INTEGER;
        return TipoPrim.ERROR;
    }

    tipoDominanteOperacion(ex1:TipoPrim, ex2:TipoPrim):TipoPrim|null {
        if (ex1 == TipoPrim.ERROR || ex2 == TipoPrim.ERROR)
            return TipoPrim.ERROR;
        if (ex1 == TipoPrim.DOUBLE || ex2 == TipoPrim.DOUBLE)
            return TipoPrim.DOUBLE;
        else if (ex1 == TipoPrim.INTEGER || ex2 == TipoPrim.INTEGER)
            return TipoPrim.INTEGER;
        return TipoPrim.ERROR;
    }
}

export enum TipoOperacion{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MAYORQUE,
    MENORQUE,
    MAYORIGUALQUE,
    MENORIGUALQUE,
    IGUALQUE,
    DIFERENTEQUE,
    OR,
    AND,
    NOT,
    MOD,
    PAR,
}