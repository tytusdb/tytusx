import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaz/expresion";
import { TipoPrim } from "./Primitiva";
import errores from '../Global/ListaError';
import { Nodo, TipoNodo } from "../XPath/Nodo";

export class Operacion implements Expresion{

    linea: number;
    columna: number;
    op_izq: Expresion;
    op_der: Expresion;
    operacion: TipoOperacion;
    tipo: TipoPrim | undefined | null;
    isXQuery: boolean | undefined;
    constructor(operacion: TipoOperacion, op_izq:Expresion, op_der:Expresion, linea: number, columna: number, isXQuery?: boolean){
        this.linea = linea;
        this.isXQuery = isXQuery;
        this.columna = columna;
        this.op_izq = op_izq;
        this.op_der = op_der;

        this.operacion = operacion;
    }

    getTipo(ent: Entorno){
        return this.tipo;
    }

    get3Dir(ent: Entorno){
        let x = this.op_izq.get3Dir(ent);
        let y;
        if(this.op_der != null){
            y = this.op_der.get3Dir(ent);
        }

        let w: Array<any> = [];
        w.push(x);
        w.push(this.operacion);
        w.push(y);

        return w;
    }
    
    getValorInicial(ent: Entorno){
        return "";
    }

    getValor(entorno: Entorno){
        if(this.operacion === TipoOperacion.PAR){
            //Devolver la expresion del parentesis
            let res = this.op_izq.getValor(entorno);
            this.tipo = this.op_izq.getTipo(entorno);
            return res;
        }

        let opIzq;
        let opDer;
        let resultado;
        let valIzq: any;
        let typeIzq;
        let valDer: any;
        let typeDer;
        if(this.op_izq.getTipo(entorno) != TipoPrim.ATRIBUTO && this.op_izq.getTipo(entorno) != TipoPrim.CONSULTA){
            valIzq = this.op_izq.getValor(entorno);
        }
        typeIzq = this.op_izq.getTipo(entorno);

        if(this.op_der.getTipo(entorno) != TipoPrim.ATRIBUTO){
            valDer = this.op_der.getValor(entorno);
        }
        typeDer = this.op_der.getTipo(entorno);
        if(valIzq === null){
            if(this.op_izq.getValorInicial(entorno) === entorno.nombre){
                valIzq = entorno.obtenerSimbolo(this.op_izq.getValorInicial(entorno));
            }else{
                return;
            }
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
                        switch(typeDer){
                            case TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MAYORQUE);
                                
                        }                        
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
                                   
                                case TipoPrim.CADENA:
                                    return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.MAYORQUE);                                
                                                                
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
                        switch(typeDer){
                            case TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MENORQUE);
                                
                        }                        
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
                                
                                case TipoPrim.CADENA:
                                    return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.MENORQUE);                                
                            
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
                        switch(typeDer){
                            case TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MAYORIGUALQUE);
                                
                        }
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
                                                               
                                case TipoPrim.CADENA:
                                    return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.MAYORIGUALQUE);                            
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
                        switch(typeDer){
                            case TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.MENORIGUALQUE);
                                
                        }
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
            case TipoOperacion.IGUAL:
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
                                return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.IGUAL, TipoPrim.INTEGER)                                                                
                            default: 
                                break; 
                        }
                        break;
                    case TipoPrim.DOUBLE:
                        switch(typeIzq){
                        case TipoPrim.IDENTIFIER:
                            this.tipo = TipoPrim.FUNCION;
                            return this.resolverOperacionNumeroId(valIzq, valDer, entorno, TipoOperacion.IGUAL, TipoPrim.DOUBLE);
                        
                        default:
                            break;
                        
                        }
                    case TipoPrim.CADENA:
                        switch(typeDer){
                            case TipoPrim.ATRIBUTO:
                                this.tipo = TipoPrim.FUNCION
                                valIzq = this.op_izq.getValor(entorno);
                                valDer = this.op_der.getValorInicial(entorno);
                                //Esta operacion devuelve un entorno temporan con los elementos encontrados
                                let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                //Obtener entorno padre.
                                let padre = entorno.padre;
                                //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
                                padre.tsimbolos.forEach((e: any) => {
                                    let elem = e.valor;
                                    if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                        //Se encontro, ver si este elemento tiene el atributo
                                        //  que se encuentre en valDer
                                        let flag = false;
                                        elem.valor.tsimbolos.forEach((c2: any) => {
                                            let tmp = c2.valor;

                                            if(tmp.getTipo() === Tipo.ATRIBUTO && (valDer === "*" || tmp.getNombre() === valDer)){
                                                //Por ultimo comparar, si el valor del atributo
                                                //Es igual a la cadena
                                                if(valIzq === tmp.getValor()){
                                                    //Cadena === valoratributo
                                                    //Se agrega el simbolo. (elem)
                                                    if(!flag){
                                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                                        flag = true;
                                                    }
                                                }
                                            }

                                        })
                                    }
                                })
                                return entTemporal;
                        }
                        break;
                    case TipoPrim.ATRIBUTO:
                        switch(typeDer){
                            case TipoPrim.CADENA:
                                return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.IGUAL);

                            case TipoPrim.ATRIBUTO:
                                    //Atributo con Atributo:
                                    this.tipo = TipoPrim.FUNCION
                                    valDer = this.op_der.getValorInicial(entorno);
                                    //ValIzq es el nombre del atributo que se quiere buscar.
                                    valIzq = this.op_izq.getValorInicial(entorno);
                                    //Esta operacion devuelve un entorno temporan con los elementos encontrados
                                    let entTemporalAT: Entorno = new Entorno("Temporal", null, null);
                                    //Obtener entorno padre.
                                    let padreAT = entorno.padre;
                                    //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
                                    padreAT.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            //Se encontro, ver si este elemento tiene el atributo
                                            //  que se encuentre en valDer
                                            let flag = false;
                                            elem.valor.tsimbolos.forEach((c2: any) => {
                                                let tmp = c2.valor;
                                                if(tmp.getTipo() === Tipo.ATRIBUTO && (valIzq === "*" || tmp.getNombre() === valIzq)){
                                                    //Por ultimo comparar, si el valor del atributo
                                                    //Es igual a la cadena
                                                    if(valDer === valIzq){
                                                        //Cadena === valoratributo
                                                        //Se agrega el simbolo. (elem)
                                                        if(!flag){
                                                            entTemporalAT.agregarSimbolo(elem.getNombre(), elem);
                                                            flag = true;
                                                        }
                                                    }
                                                }
                                            })
                                        }
                                    })
                                    return entTemporalAT;                                   
                        }                        
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
                                        if(indice === der && elem.getNombre() === entorno.nombre){
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
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.IGUAL, TipoPrim.INTEGER)

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.IGUAL, TipoPrim.DOUBLE)
                                   
                            case TipoPrim.CADENA:
                                return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.IGUAL);
                                
                            case TipoPrim.IDENTIFIER:
                                break;
                        }                        
                        break;
                    case TipoPrim.CONSULTA:
                        //Merge /hola/@hola = "asd" <-- 
                        this.tipo = TipoPrim.FUNCION;
                        let entTemporal: Entorno = new Entorno("Temporal", null, null)
                        switch(typeDer){
                            case TipoPrim.CADENA:
                            let l: Array<Nodo> = this.op_izq.getValorInicial(entorno)
                            let fromR = l[l.length-1].isFromRoot()
                            let lastNodeName = l[l.length-1].getNombre()
                            let entConsultaTemp = this.op_izq.getValor(entorno);                            
                           entTemporal = this.resolverConsultaRecursiva(entConsultaTemp, valDer, lastNodeName, fromR, TipoOperacion.IGUAL  )
                            return entTemporal;
                            
                            default:
                                return null;
                                

                        }                               
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
                            switch(typeDer){
                                case TipoPrim.ATRIBUTO:
                                    this.tipo = TipoPrim.FUNCION
                                    valIzq = this.op_izq.getValor(entorno);
                                    valDer = this.op_der.getValorInicial(entorno);
                                    //Esta operacion devuelve un entorno temporan con los elementos encontrados
                                    let entTemporal: Entorno = new Entorno("Temporal", null, null);
                                    //Obtener entorno padre.
                                    let padre = entorno.padre;
                                    //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
                                    padre.tsimbolos.forEach((e: any) => {
                                        let elem = e.valor;
                                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                                            //Se encontro, ver si este elemento tiene el atributo
                                            //  que se encuentre en valDer
                                            elem.valor.tsimbolos.forEach((c2: any) => {
                                                let tmp = c2.valor;
    
                                                if(tmp.getTipo() === Tipo.ATRIBUTO && (valDer === "*" || tmp.getNombre() === valDer)){
                                                    //Por ultimo comparar, si el valor del atributo
                                                    //Es igual a la cadena
                                                    if(valIzq != tmp.getValor()){
                                                        //Cadena === valoratributo
                                                        //Se agrega el simbolo. (elem)
                                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                                    }
                                                }
    
                                            })
                                        }
                                    })
                                    return entTemporal;
                            }
                            break;
                        case TipoPrim.ATRIBUTO:
                            switch(typeDer){
                                case TipoPrim.CADENA:
                                    return this.resolverOperacionAtributoCadena(entorno, TipoOperacion.DIFERENTEQUE);
                         
                            }                        
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
                                if(this.isXQuery != undefined && this.isXQuery){
                                    return this.XQresolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, TipoPrim.INTEGER)
                                }else{
                                    return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, TipoPrim.INTEGER)
                                }

                            case TipoPrim.DOUBLE :
                                return this.resolverOperacionIdNumero(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE, TipoPrim.DOUBLE)
                                                              
                                case TipoPrim.CADENA:
                                    return this.resolverOperacionIdCadena(valIzq, valDer, entorno, TipoOperacion.DIFERENTEQUE);

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
            case TipoPrim.BOOLEAN:
                return 'boolean';
            case TipoPrim.FUNCION:
                return "Funcion mae"
            case TipoPrim.CONSULTA:
                return "Consulta"
            default:
                return "ERROR"
        }
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

    XQresolverOperacionIdNumero(valIzq: any, valDer: any, entorno: Entorno, relacional: TipoOperacion, TipoNumero: TipoPrim): Entorno{
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
        //2. Sobre el padre, buscar el que tenga nombre entorno.nombre
        entorno.tsimbolos.forEach((e: any) => {
            let elem = e.valor;
            if(elem.getNombre() === izq ){
                //Buscar el texto de este elemento.
                let texto = this.buscarTexto(elem)
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
                        case TipoOperacion.IGUAL:
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
        })
        return entTemporal;        
    }



    resolverOperacionIdNumero(valIzq: any, valDer: any, entorno: Entorno, relacional: TipoOperacion, TipoNumero: TipoPrim): Entorno{
        
        if(this.isXQuery != undefined && this.isXQuery){
            return this.XQresolverOperacionIdNumero(valIzq, valDer, entorno, relacional, TipoNumero)
        }
        
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
                                case TipoOperacion.IGUAL:
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


    resolverOperacionIdCadena(valIzq: any, valDer: any, entorno: Entorno, relacional: TipoOperacion): Entorno{
        if(this.isXQuery != undefined && this.isXQuery){
            return this.XQresolverOperacionIdCadena(valIzq, valDer, entorno, relacional)
        }
        let der: string = valDer;
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
                        der = der.replace("\"", "")
                        if(texto != null){
                            //Comparar los textos
                            switch(relacional){
                                case TipoOperacion.MAYORQUE:
                                    if(texto > der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MENORQUE:
                                    if(texto < der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MAYORIGUALQUE:
                                    if(texto >= der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.MENORIGUALQUE:
                                    if(texto <= der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.IGUAL:
                                    if(texto === der){
                                        //Si lo es, meter al entorno temporal.
                                        entTemporal.agregarSimbolo(elem.nombre, elem);
                                    }                                    
                                    break;
                                case TipoOperacion.DIFERENTEQUE:
                                    if(texto != der){
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

    XQresolverOperacionIdCadena(valIzq: any, valDer: any, entorno: Entorno, relacional: TipoOperacion): Entorno{
        let der: string = valDer;
        let izq = valIzq.getNombre()
        //Devolver un entorno con los simbolos encontrados
        let entTemporal: Entorno = new Entorno("Temporal", null, null);
        entorno.tsimbolos.forEach((e: any) => {
            let elem = e.valor;
                //si se encuentra el identificador (valIzq)
            if(elem.getNombre() === izq ){
                //Buscar el texto de este elemento.
                let texto = this.buscarTexto(elem)
                der = der.replace("\"", "")
                der = der.replace("\"", "")
                der = der.replace("'", "")
                der = der.replace("\'", "")

                if(texto != null){
                    //Comparar los textos
                    switch(relacional){
                        case TipoOperacion.MAYORQUE:
                            if(texto > der){
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.MENORQUE:
                            if(texto < der){
                            //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.MAYORIGUALQUE:
                            if(texto >= der){
                            //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.MENORIGUALQUE:
                            if(texto <= der){
                            //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.IGUAL:
                            if(texto == der){
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.DIFERENTEQUE:
                            if(texto != der){
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;    
                            }
                    }
                 }
        })
        return entTemporal;        
    }        

    resolverOperacionAtributoCadena(entorno: Entorno, relacional: TipoOperacion){
        this.tipo = TipoPrim.FUNCION
        if(this.isXQuery != undefined && this.isXQuery){
            return this.XQresolverOperacionAtributoCadena(entorno, relacional)
        }        
        let valDer = this.op_der.getValor(entorno);
        //ValIzq es el nombre del atributo que se quiere buscar.
        let valIzq = this.op_izq.getValorInicial(entorno);
        //Esta operacion devuelve un entorno temporan con los elementos encontrados
        let entTemporal: Entorno = new Entorno("Temporal", null, null);
        //Obtener entorno padre.
        let padre = entorno.padre;
        //Con el padre buscar todos las etiquetas que tengan nombre entorno.nombre
        padre.tsimbolos.forEach((e: any) => {
            let elem = e.valor;
            if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === entorno.nombre){
                //Se encontro, ver si este elemento tiene el atributo
                //  que se encuentre en valDer
                let flag = false;
                elem.valor.tsimbolos.forEach((c2: any) => {
                    let tmp = c2.valor;
                    if(tmp.getTipo() === Tipo.ATRIBUTO && (valIzq === "*" || tmp.getNombre() === valIzq)){
                        //Por ultimo comparar, si el valor del atributo
                        //Es igual a la cadena
                        switch(relacional){
                            case TipoOperacion.MAYORQUE:
                                if(valDer > tmp.getValor()){
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }                                
                                break;
                            case TipoOperacion.MENORQUE:
                                if(valDer < tmp.getValor()){
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }                                
                                break;
                            case TipoOperacion.MAYORIGUALQUE:
                                if(valDer >= tmp.getValor()){
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }                                
                                break;
                            case TipoOperacion.MENORIGUALQUE:
                                if(valDer <= tmp.getValor()){
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }                                
                                break;
                            case TipoOperacion.IGUAL:
                                if(valDer === tmp.getValor()){
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }                                
                                break;
                            case TipoOperacion.DIFERENTEQUE:
                                if(valDer != tmp.getValor()){
                                    //Cadena === valoratributo
                                    //Se agrega el simbolo. (elem)
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                                        flag = true;
                                    }
                                }
                                break;
                        }
                        
                    }

                })
            }
        })   
        return entTemporal     
    }


    XQresolverOperacionAtributoCadena(entorno: Entorno, relacional: TipoOperacion): Entorno{
        this.tipo = TipoPrim.FUNCION;
        //let der: string = valDer;
        let der = this.op_der.getValor(entorno);
        //let izq = valIzq.getNombre()
        let izq = this.op_izq.getValorInicial(entorno);        
        //Devolver un entorno con los simbolos encontrados
        let entTemporal: Entorno = new Entorno("Temporal", null, null);
        entorno.tsimbolos.forEach((e: any) => {
            let elem = e.valor;
                //si se encuentra el identificador (valIzq)
            if(elem.getNombre() === izq ){
                //Buscar el texto de este elemento.
                let texto = elem.valor
                der = der.replace("\"", "")
                der = der.replace("\"", "")
                der = der.replace("'", "")
                der = der.replace("\'", "")
                texto = texto.replace("\"", "")
                texto = texto.replace("\"", "")
                texto = texto.replace("\"", "")
                texto = texto.replace("\"", "")
                    switch(relacional){
                        case TipoOperacion.MAYORQUE:
                            if(texto > der){
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.MENORQUE:
                            if(texto < der){
                            //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.MAYORIGUALQUE:
                            if(texto >= der){
                            //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.MENORIGUALQUE:
                            if(texto <= der){
                            //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;
                        case TipoOperacion.IGUAL:
                            if(texto === der){
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                   
                            break;
                        case TipoOperacion.DIFERENTEQUE:
                            if(texto != der){
                                //Si lo es, meter al entorno temporal.
                                entTemporal.agregarSimbolo(elem.nombre, elem);
                            }                                    
                            break;    
                            }
                    
                 }
        })

        return entTemporal;        
    }       

    resolverConsultaRecursiva(entConsultaTemp:any, valDer: any, lastNodeName: String, isFromRoot: Boolean, op: TipoOperacion){
        let entTemporal: Entorno = new Entorno("Temporal", null, null)
        //Sobre estos ver quienes tienen valDer
        let flag = false;
        entConsultaTemp.tsimbolos.forEach((e: any) => {
            let elemEnt = e.valor;
            flag = false;
            elemEnt.valor.tsimbolos.forEach((c1: any) => {
                let elem = c1.valor;
                if(elem.getTipo() === Tipo.ETIQUETA){
                    elem.valor.tsimbolos.forEach((c2: any) => {
                        let elemfinal = c2.valor;
                        if(op === TipoOperacion.IGUAL){
                            if(elemfinal.getTipo() === Tipo.ATRIBUTO && (lastNodeName === "*" || elemfinal.getNombre() === lastNodeName) && elemfinal.getValor() === valDer){
                                if(!flag){
                                    entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                    flag = true;
                                }
                            }
                            else if(elem.getTipo() === Tipo.ETIQUETA && !isFromRoot){
                                //Buscar recursivamente atributos.
                                let found = this.buscarAtributosRecursivamente(elem, valDer, lastNodeName, op);
                                if(found){
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                        flag = true;
                                    }
                                }
                            }                        
                        }else if(op === TipoOperacion.DIFERENTEQUE){
                            if(elemfinal.getTipo() === Tipo.ATRIBUTO && (lastNodeName === "*" || elemfinal.getNombre() === lastNodeName) && elemfinal.getValor() !== valDer){
                                if(!flag){
                                    entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                }
                            }
                            else if(elem.getTipo() === Tipo.ETIQUETA && !isFromRoot){
                                //Buscar recursivamente atributos.
                                let found = this.buscarAtributosRecursivamente(elem, valDer, lastNodeName, op);
                                if(found){
                                    if(!flag){
                                        entTemporal.agregarSimbolo(elemEnt.nombre, elemEnt);
                                        flag = true;
                                    }
                                }
                            }                        
                        }
                    });

            }
            });
        })
    return entTemporal;     
    }

    buscarAtributosRecursivamente(elem: any, valDer: any, lastNodeName: String, op: TipoOperacion): boolean{
        for(let i = 0; i < elem.valor.tsimbolos.length; i++){
            let at = elem.valor.tsimbolos[i].valor;
            if(op === TipoOperacion.IGUAL){
                if(at.getTipo() === Tipo.ATRIBUTO && (lastNodeName === "*" || at.getNombre() === lastNodeName) && at.getValor() === valDer){
                    return true;
                }
                else if(at.getTipo() === Tipo.ETIQUETA){
                    //Buscar recursivamente atributos.
                    let found = this.buscarAtributosRecursivamente(at, valDer, lastNodeName, op);
                    if(found){
                            return true;
                    }
                }                        
            }else if(op === TipoOperacion.DIFERENTEQUE){
                if(at.getTipo() === Tipo.ATRIBUTO && (lastNodeName === "*" || at.getNombre() === lastNodeName) && at.getValor() !== valDer){
                    return true
                }
                else if(at.getTipo() === Tipo.ETIQUETA){
                    //Buscar recursivamente atributos.
                    let found = this.buscarAtributosRecursivamente(at, valDer, lastNodeName, op);
                    if(found){
                        return true;
                    }
                }                        
            }
        }
        return false;
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
                                case TipoOperacion.IGUAL:
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
    IGUAL,
    DIFERENTEQUE,
    OR,
    AND,
    NOT,
    MOD,
    PAR,
    XQEQ, //igual
    XQGT, //Greather than >
    XQLT, // Lower Than
    XQNE, // Not equal
    XQLE, // Lower equal then
    XQGE // Greather equal then
}