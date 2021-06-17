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
        let aux;
        let valIzq;
        let typeIzq;
        let valDer;
        let typeDer;

        if(this.op_izq.getTipo(entorno) != TipoPrim.ATRIBUTO){
            valIzq = this.op_izq.getValor(entorno);
            typeIzq = this.op_izq.getTipo(entorno);
        }
        if(this.op_der.getTipo(entorno) != TipoPrim.ATRIBUTO){
            valDer = this.op_der.getValor(entorno);
            typeDer = this.op_der.getTipo(entorno);
        }
        
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
                                break;

                            case TipoPrim.DOUBLE:
                                break;

                            case TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = TipoPrim.FUNCION
                                if(valDer.toLowerCase() == "position()"){
                                    // ej: 3 > position()
                                    let izq: number = parseInt(valIzq);           
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal: Entorno = new Entorno("Temporal", null ,null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;                
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(izq > indice && elem.getNombre() === entorno.nombre){
                                            //Si es mayor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        }                                                                      
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                         }
                                        });
                                    return entTemporal;
                                }else{
                                    errores.agregarError('semantico', 
                                    'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                    this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);                                      
                                }
                                case TipoPrim.IDENTIFIER:
                                    this.tipo = TipoPrim.FUNCION
                                    return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, TipoPrim.INTEGER)                                                                
                                default: 
                                    break; 
                            }
                            break;
                        case TipoPrim.DOUBLE:
                            switch(typeIzq){
                            case TipoPrim.IDENTIFIER:
                                this.tipo = TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, TipoPrim.DOUBLE);
                            
                            default:
                                break;
                            
                            }
                    case TipoPrim.CADENA:
                        break;
                    case TipoPrim.ATRIBUTO:
                        break;


                    case TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = TipoPrim.FUNCION
                        if(valIzq.toLowerCase() == "position()"){
                            switch(typeDer){
                                case TipoPrim.INTEGER:
                                    //position > 3

                                    let der: number = parseInt(valDer);                                 
                                    //Devolver un entorno con los simbolos encontrados
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(indice > der && elem.getNombre() == entorno.nombre){
                                            //Si es mayor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        }
                                    
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() == entorno.nombre){
                                            indice++;
                                        }
                                        
                                    });
                                    return entTemporal;
                                default: 
                                errores.agregarError('semantico', 
                                'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                this.linea, this.columna);
                                return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);                            
                                    
                            }
                        }else{
                            errores.agregarError('semantico', 
                            'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                            this.linea, this.columna);
                            return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);                              
                        }
                        
                    case TipoPrim.IDENTIFIER:
                        this.tipo = TipoPrim.FUNCION
                        switch(typeDer){
                            case TipoPrim.INTEGER :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, TipoPrim.INTEGER)

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORQUE, TipoPrim.DOUBLE)
                                   
                                                                
                            case TipoPrim.IDENTIFIER:
                                break;
                        }
                        break;
                    default: 
                        break;
                }
                break;
            case TipoOperacion.MENORQUE:
                switch(typeIzq) {
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                break;

                            case TipoPrim.DOUBLE:
                                break;

                            case TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = TipoPrim.FUNCION
                                if(valDer.toLowerCase() == "position()"){
                                    //Ejemplo: 3 < position()
                                    let izq: number = parseInt(valIzq);           
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;                
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(izq < indice && elem.getNombre() == entorno.nombre){
                                        //Si es menor, meter al array de entornos.
                                        entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }                                                                      
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        });
                                    return entTemporal;
                                }else{
                                    errores.agregarError('semantico', 
                                    'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                    this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);                                      
                                }                                       
                                case TipoPrim.IDENTIFIER:
                                    this.tipo = TipoPrim.FUNCION
                                    return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORQUE, TipoPrim.INTEGER)                                                                
                                default: 
                                    break; 
                            }
                            break;
                        case TipoPrim.DOUBLE:
                            switch(typeIzq){
                            case TipoPrim.IDENTIFIER:
                                this.tipo = TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORQUE, TipoPrim.DOUBLE);
                            
                            default:
                                break;
                            
                            }
                    case TipoPrim.CADENA:
                        break;
                    case TipoPrim.ATRIBUTO:
                        break;


                    case TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = TipoPrim.FUNCION
                        if(valIzq.toLowerCase() == "position()"){
                            switch(typeDer){
                                case TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der: number = parseInt(valDer);                                    
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null)
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(indice < der && elem.getNombre() === entorno.nombre){
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        
                                    });
                                    return entTemporal;
                                default: 
                                errores.agregarError('semantico', 
                                'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);                            
                                    
                            }
                        }
                        break;

                    case TipoPrim.IDENTIFIER:
                        this.tipo = TipoPrim.FUNCION
                        switch(typeDer){
                            case TipoPrim.INTEGER :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORQUE, TipoPrim.INTEGER)

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORQUE, TipoPrim.DOUBLE)
                                
                            
                            case TipoPrim.IDENTIFIER:
                                break;
                        }
                    default: 
                        break;
                }
                break;

            case TipoOperacion.MAYORIGUALQUE:
                switch(typeIzq) {
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                break;

                            case TipoPrim.DOUBLE:
                                break;

                            case TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = TipoPrim.FUNCION
                                if(valDer.toLowerCase() == "position()"){
                                    //Ejemplo: 3 >= position()
                                    let izq: number = parseInt(valIzq);           
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;                
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(izq >= indice && elem.getNombre() == entorno.nombre){
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }                                                                      
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        });
                                    return entTemporal;
                                }else{
                                    errores.agregarError('semantico', 
                                    'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                    this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);                                      
                                }                                       
                                case TipoPrim.IDENTIFIER:
                                    this.tipo = TipoPrim.FUNCION
                                    return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, TipoPrim.INTEGER)                   
                                default: 
                                    break; 
                            }
                            break;
                        case TipoPrim.DOUBLE:
                            switch(typeIzq){
                            case TipoPrim.IDENTIFIER:
                                this.tipo = TipoPrim.FUNCION;
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, TipoPrim.DOUBLE);
                            
                            default:
                                break;
                            
                            }
                    case TipoPrim.CADENA:
                        break;
                    case TipoPrim.ATRIBUTO:
                        break;


                    case TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = TipoPrim.FUNCION
                        if(valIzq.toLowerCase() == "position()"){
                            switch(typeDer){
                                case TipoPrim.INTEGER:
                                    //Ej: position() >= 3
                                    let der: number = parseInt(valDer);                                    
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null)
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(indice >= der && elem.getNombre() === entorno.nombre){
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        
                                    });
                                    return entTemporal;
                                default: 
                                errores.agregarError('semantico', 
                                'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);                            
                                    
                            }
                        }
                        break;

                    case TipoPrim.IDENTIFIER:
                        this.tipo = TipoPrim.FUNCION
                        switch(typeDer){
                            case TipoPrim.INTEGER :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, TipoPrim.INTEGER)

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE, TipoPrim.DOUBLE)
                                                               
                            
                            case TipoPrim.IDENTIFIER:
                                break;
                        }
                    default: 
                        break;
                }
                break;
            
            case TipoOperacion.MENORIGUALQUE:
                switch(typeIzq) {
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                break;

                            case TipoPrim.DOUBLE:
                                break;

                            case TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = TipoPrim.FUNCION
                                if(valDer.toLowerCase() == "position()"){
                                    //Ejemplo: 3 < position()
                                    let izq: number = parseInt(valIzq);           
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;                
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(izq <= indice && elem.getNombre() == entorno.nombre){
                                        //Si es menor, meter al array de entornos.
                                        entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }                                                                      
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        });
                                    return entTemporal;
                                }else{
                                    errores.agregarError('semantico', 
                                    'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                    this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);                                      
                                }                                       
                              case TipoPrim.IDENTIFIER:
                                this.tipo = TipoPrim.FUNCION
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, TipoPrim.INTEGER)                                                                
                            default: 
                                break; 
                        }
                        break;
                    case TipoPrim.DOUBLE:
                        switch(typeIzq){
                        case TipoPrim.IDENTIFIER:
                            this.tipo = TipoPrim.FUNCION;
                            return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, TipoPrim.DOUBLE);
                        
                        default:
                            break;
                        
                        }
                    case TipoPrim.CADENA:
                        break;
                    case TipoPrim.ATRIBUTO:
                        break;


                    case TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = TipoPrim.FUNCION
                        if(valIzq.toLowerCase() == "position()"){
                            switch(typeDer){
                                case TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der: number = parseInt(valDer);                                    
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null)
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(indice <= der && elem.getNombre() === entorno.nombre){
                                            //Si es menor, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        
                                    });
                                    return entTemporal;
                                default: 
                                errores.agregarError('semantico', 
                                'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);                            
                                    
                            }
                        }
                        break;

                    case TipoPrim.IDENTIFIER:
                        this.tipo = TipoPrim.FUNCION
                        switch(typeDer){
                            case TipoPrim.INTEGER :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, TipoPrim.INTEGER)

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.MENORIGUALQUE, TipoPrim.DOUBLE)
                                                               
                            
                            case TipoPrim.IDENTIFIER:
                                break;
                        }
                    default: 
                        break;
                }
                break;
            case TipoOperacion.IGUALQUE:
                switch(typeIzq) {
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                break;

                            case TipoPrim.DOUBLE:
                                break;

                            case TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = TipoPrim.FUNCION
                                if(valDer.toLowerCase() == "position()"){
                                    //Ejemplo: 3 = position()
                                    let izq: number = parseInt(valIzq);           
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;                
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(izq === indice && elem.getNombre() == entorno.nombre){
                                        //Si es menor, meter al array de entornos.
                                        entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }                                                                      
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        });
                                    return entTemporal;
                                }else{
                                    errores.agregarError('semantico', 
                                    'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                    this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);                                      
                                }                                       
                              case TipoPrim.IDENTIFIER:
                                this.tipo = TipoPrim.FUNCION
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.IGUALQUE, TipoPrim.INTEGER)                                                                
                            default: 
                                break; 
                        }
                        break;
                    case TipoPrim.DOUBLE:
                        switch(typeIzq){
                        case TipoPrim.IDENTIFIER:
                            this.tipo = TipoPrim.FUNCION;
                            return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.IGUALQUE, TipoPrim.DOUBLE);
                        
                        default:
                            break;
                        
                        }
                    case TipoPrim.CADENA:
                        switch(typeDer){
                            case TipoPrim.ATRIBUTO:
                                console.log("CADENA = ATRIBUTO");
                                valIzq = this.op_izq.getValor(entorno);
                                
                                break;
                        }
                        break;
                    case TipoPrim.ATRIBUTO:
                        break;


                    case TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = TipoPrim.FUNCION
                        if(valIzq.toLowerCase() == "position()"){
                            switch(typeDer){
                                case TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der: number = parseInt(valDer);                                    
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null)
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        console.log("indice: "+indice, " = ", der)                                        
                                        if(indice === der && elem.getNombre() === entorno.nombre){
                                            console.log("WOWYES")
                                            //Si son iguales, meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        
                                    });
                                    return entTemporal;
                                default: 
                                errores.agregarError('semantico', 
                                'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);                            
                                    
                            }
                        }
                        break;

                    case TipoPrim.IDENTIFIER:
                        this.tipo = TipoPrim.FUNCION
                        switch(typeDer){
                            case TipoPrim.INTEGER :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.IGUALQUE, TipoPrim.INTEGER)

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.IGUALQUE, TipoPrim.DOUBLE)
                                   
                            
                            case TipoPrim.IDENTIFIER:
                                break;
                        }                        
                        break;
                    default: 
                        break;
                }
                break;
            case TipoOperacion.DIFERENTEQUE:
                switch(typeIzq) {
                    case TipoPrim.INTEGER:
                        switch(typeDer){
                            case TipoPrim.INTEGER:
                                break;

                            case TipoPrim.DOUBLE:
                                break;

                            case TipoPrim.FUNCION:
                                //Ver si es position()
                                this.tipo = TipoPrim.FUNCION
                                if(valDer.toLowerCase() == "position()"){
                                    //Ejemplo: 3 != position()
                                    let izq: number = parseInt(valIzq);           
                                    //Devolver los entornos que abarcan esto.
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;                
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(izq != indice && elem.getNombre() == entorno.nombre){
                                        //Si es diferente de !=, meter al array de entornos.
                                        entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }                                                                      
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        });
                                    return entTemporal;
                                }else{
                                    errores.agregarError('semantico', 
                                    'No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                    this.linea, this.columna);
                                    return ('Error semantico: No se puede hacer relacional ' + this.getStringTipo(typeIzq) + ' con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);                                      
                                }
                            case TipoPrim.IDENTIFIER:
                                this.tipo = TipoPrim.FUNCION
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, TipoPrim.INTEGER)                                                                
                            default: 
                                break; 
                        }
                        break;
                    case TipoPrim.DOUBLE:
                        switch(typeIzq){
                        case TipoPrim.IDENTIFIER:
                            this.tipo = TipoPrim.FUNCION;
                            return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, TipoPrim.DOUBLE);
                        
                        default:
                            break;
                        
                        }
                    case TipoPrim.CADENA:
                        break;
                    case TipoPrim.ATRIBUTO:
                        break;


                    case TipoPrim.FUNCION:
                        //Ver si es position()
                        this.tipo = TipoPrim.FUNCION
                        if(valIzq.toLowerCase() == "position()"){
                            switch(typeDer){
                                case TipoPrim.INTEGER:
                                    //Ej: position() < 3
                                    let der: number = parseInt(valDer);                                    
                                    //En un entorno temporal, devolver los que corresponden a la busqueda
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null)
                                    //1. Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //2. Con el padre, ver quienes son mayor a valDer
                                    let indice = 1;
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(indice != der && elem.getNombre() === entorno.nombre){
                                            //Si es diferente de , meter al array de entornos.
                                            entTemporal.agregarSimbolo(entorno.nombre, elem);
                                        }
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            indice++;
                                        }
                                        
                                    });
                                    return entTemporal;
                                default: 
                                errores.agregarError('semantico', 
                                'No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' + this.getStringTipo(typeDer), 
                                this.linea, this.columna);
                                return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) + ' con ' 
                                    + this.getStringTipo(typeDer)
                                    + ' en la linea ' + this.linea + ' y columna ' + this.columna);                            
                                    
                            }
                        }
                        break;

                    case TipoPrim.IDENTIFIER:
                        this.tipo = TipoPrim.FUNCION
                        switch(typeDer){
                            case TipoPrim.INTEGER :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, TipoPrim.INTEGER)

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, TipoPrim.DOUBLE)
                                                              
                            
                            case TipoPrim.IDENTIFIER:
                                break;
                        }
                    default: 
                        break;
                }
                                
                break;
            case TipoOperacion.AND:
                break;
            case TipoOperacion.OR:
                break;
                
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

    buscarTexto(elem: any): String | null{
        for(let i = 0; i < elem.valor.tsimbolos.length; i++){
            let xd = elem.valor.tsimbolos[i].valor;
            if(xd.getTipo() === Tipo.STRING){
                return xd.getValor();
            }            
        }
        return null;
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

    resolverOperacionIdNumero(valIzq: any, valDer: any, entorno: Entorno, relacional: TipoOperacion, TipoNumero: TipoPrim): Entorno{
        let der: number;
        if(TipoNumero === TipoPrim.INTEGER){
            der = parseInt(valDer);                                 
        }else{
            der = parseFloat(valDer);
        }
        let izq = valIzq.getNombre()
        //Devolver un entorno con los simbolos encontrados
        let entTemporal: Entorno = new Entorno("Temporal", null, null);
        //1. Obtener entorno padre.
        let padre = entorno.padre;
        //2. Sobre el padre, buscar el que tenga nombre entorno.nombre
        padre.tsimbolos.forEach((e: any) => {
            let elem = e.valor;
            if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                //Se encontro, ahora buscar en los simbolos de este elem
                //si se encuentra el identificador (valIzq)
                elem.valor.tsimbolos.forEach((insd: any) => {
                    let elin = insd.valor;
                    if(elin.getNombre() === izq ){
                        //Buscar el texto de este elemento.
                        let texto = this.buscarTexto(elin)
                        //Ver si el texto se puede castear a NUMERO
                        if(texto != null){
                            let numCompare = +texto;
                            //Comparar los numeros
                            switch(relacional){
                                case TipoOperacion.MAYORQUE:
                                    if(numCompare > der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MENORQUE:
                                    if(numCompare < der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MAYORIGUALQUE:
                                    if(numCompare >= der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MENORIGUALQUE:
                                    if(numCompare <= der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.IGUALQUE:
                                    if(numCompare === der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.DIFERENTEQUE:
                                    if(numCompare != der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                
                            }
                        }
                    }
                });
            }
        })
        return entTemporal;        
    }

    resolverOperacionNumeroId(valIzq: any, valDer: any, entorno: Entorno, relacional: TipoOperacion, TipoNumero: TipoPrim): Entorno{
        let izq: number;
        if(TipoNumero === TipoPrim.INTEGER){
            izq = parseInt(valIzq);                                 
        }else{
            izq = parseFloat(valIzq);
        }
        let der = valDer.getNombre()
        //Devolver un entorno con los simbolos encontrados
        let entTemporal: Entorno = new Entorno("Temporal", null, null);
        //1. Obtener entorno padre.
        let padre = entorno.padre;
        //2. Sobre el padre, buscar el que tenga nombre entorno.nombre
        padre.tsimbolos.forEach((e: any) => {
            let elem = e.valor;
            if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                //Se encontro, ahora buscar en los simbolos de este elem
                //si se encuentra el identificador (valIzq)
                elem.valor.tsimbolos.forEach((insd: any) => {
                    let elin = insd.valor;
                    if(elin.getNombre() === der ){
                        //Buscar el texto de este elemento.
                        let texto = this.buscarTexto(elin)
                        //Ver si el texto se puede castear a NUMERO
                        if(texto != null){
                            let numCompare = +texto;
                            //Comparar los numeros
                            switch(relacional){
                                case TipoOperacion.MAYORQUE:
                                    if(izq > numCompare){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MENORQUE:
                                    if(izq < numCompare){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MAYORIGUALQUE:
                                    if(izq >= numCompare){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MENORIGUALQUE:
                                    if(izq <= numCompare){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.IGUALQUE:
                                    if(izq === numCompare){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.DIFERENTEQUE:
                                    if(izq != numCompare){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                
                            }
                        }
                    }
                });
            }
        })
        return entTemporal;        
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