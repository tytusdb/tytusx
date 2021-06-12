enum TIPO_OPERACION {
	OP_SUMA,
	OP_RESTA,
	OP_MULTIPLICACION,
    OP_DIVISION,
    OP_MODULAR,

	OP_MAYOR_QUE,
	OP_MENOR_QUE,
	OP_MAYOR_IGUAL,
	OP_MENOR_IGUAL,
	OP_IGUAL,
	OP_NO_IGUAL,

	OP_AND,
	OP_OR,
	OP_NOT
};

enum TIPO_EXPRESION {
	OP_ARITMETICA,
	OP_UNARIA,
	OP_LOGICA,
	OP_RELACIONAL
}

enum TIPO_PRIMITIVO{
    NUMERICO,    
    CADENA
}

function nodoOperacionBinaria(operandoIzq:any, operandoDer:any, tipo:TIPO_OPERACION, clase:TIPO_EXPRESION, fila:number, columna:number) {
	return {
		operandoIzq: operandoIzq,
		operandoDer: operandoDer,
		tipo_operacion: tipo,
		fila : fila,
		columna: columna,
		clase : clase
	}
}

function nodoDato(valor:any, tipo:TIPO_PRIMITIVO){
    return {
        valor : valor,
        tipo_primitivo : tipo
    }
}


function getValor(exp:any, ts:TablaSimbolos): any {
    if(exp.clase===TIPO_EXPRESION.OP_ARITMETICA){
        var exp1 = getValor(exp.operandoIzq, ts);
		var exp2 = getValor(exp.operandoDer, ts);
		var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if(exp1 === "error" || exp2 === "error" || tipo1 === "error" || tipo2 === "error"){
			return "error";
		}
        if(exp.tipo_operacion === TIPO_OPERACION.OP_SUMA){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 + exp2;
            }else if(tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA){
                return exp1 + exp2;
            }else{
                return "error";
            }            
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_RESTA){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 - exp2;
            }else{
                return "error";
            } 
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_MULTIPLICACION){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 * exp2;
            }else{
                return "error";
            } 
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_DIVISION){
            if(exp2 != 0){
                if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                    return exp1 / exp2;
                }else{
                    return "error";
                } 
            }
            return "error";
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_MODULAR){
            if(exp2 != 0){
                if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                    return exp1 % exp2;
                }else{
                    return "error";
                } 
            }
            return "error";
        }
    }else if(exp.clase===TIPO_EXPRESION.OP_RELACIONAL){
        var exp1 = getValor(exp.operandoIzq, ts);
		var exp2 = getValor(exp.operandoDer, ts);
		var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if(exp1 === "error" || exp2 === "error" || tipo1 === "error" || tipo2 === "error"){
			return "error";
        }
        if(exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_QUE){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 > exp2;
            }else{
                return "error";
            } 
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_QUE){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 < exp2;
            }else{
                return "error";
            } 
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_IGUAL){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 >= exp2;
            }else{
                return "error";
            } 
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_IGUAL){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 <= exp2;
            }else{
                return "error";
            } 
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_NO_IGUAL){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 != exp2;
            }else if(tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA){
                return exp1 != exp2;
            }else{
                return "error";
            } 
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_IGUAL){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return exp1 == exp2;
            }else if(tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA){
                return exp1 == exp2;
            }else{
                return "error";
            } 
        }else{
            return "error";
        }
    }else if(exp.clase===TIPO_EXPRESION.OP_LOGICA){
        var exp1 = getValor(exp.operandoIzq, ts);
		var exp2 = getValor(exp.operandoDer, ts);
		var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if(exp1 === "error" || exp2 === "error" || tipo1 === "error" || tipo2 === "error"){
			return "error";
        }
        if(exp.tipo_operacion === TIPO_OPERACION.OP_AND){
            const res  = exp1 && exp2;
			return res;
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_OR){
            const res  = exp1 || exp2;
			return res;
        }

    }

}

function getTipo(exp:any, ts:TablaSimbolos):any{
    if(exp.clase===TIPO_EXPRESION.OP_ARITMETICA){
		var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if(tipo1 === "error" || tipo2 === "error"){
			return "error";
		}
        if(exp.tipo_operacion === TIPO_OPERACION.OP_SUMA || exp.tipo_operacion === TIPO_OPERACION.OP_RESTA || exp.tipo_operacion === TIPO_OPERACION.OP_MULTIPLICACION){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return TIPO_PRIMITIVO.NUMERICO;
            }else if(tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA){
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error"
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_DIVISION || exp.tipo_operacion === TIPO_OPERACION.OP_MODULAR){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return TIPO_PRIMITIVO.NUMERICO;
            }else if(tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA){
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error"
        }
    }else if(exp.clase===TIPO_EXPRESION.OP_RELACIONAL){
		var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if(tipo1 === "error" || tipo2 === "error"){
			return "error";
        }
        if(exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_QUE || exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_QUE || exp.tipo_operacion === TIPO_OPERACION.OP_MAYOR_IGUAL ){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return TIPO_PRIMITIVO.NUMERICO;
            }else if(tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA){
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error"			
        }else if(exp.tipo_operacion === TIPO_OPERACION.OP_MENOR_IGUAL || exp.tipo_operacion === TIPO_OPERACION.OP_NO_IGUAL || exp.tipo_operacion === TIPO_OPERACION.OP_IGUAL){
            if(tipo1 == TIPO_PRIMITIVO.NUMERICO && tipo2 == TIPO_PRIMITIVO.NUMERICO){
                return TIPO_PRIMITIVO.NUMERICO;
            }else if(tipo1 == TIPO_PRIMITIVO.CADENA && tipo2 == TIPO_PRIMITIVO.CADENA){
                return TIPO_PRIMITIVO.CADENA;
            }
            return "error"
        }else{
            return "error";
        }
    }else if(exp.clase===TIPO_EXPRESION.OP_LOGICA){
		var tipo1 = getTipo(exp.operandoIzq, ts);
        var tipo2 = getTipo(exp.operandoDer, ts);
        if(tipo1 === "error" || tipo2 === "error"){
			return "error";
        }
        if(exp.tipo_operacion === TIPO_OPERACION.OP_AND || exp.tipo_operacion === TIPO_OPERACION.OP_OR){            
			return ;  //VALIDAR TIPO OPERACION LOGICA
        }

    }else if(exp.tipo = TIPO_PRIMITIVO.NUMERICO){
        return exp.tipo;        
    }else if(exp.tipo = TIPO_PRIMITIVO.CADENA){
        return exp.tipo;        
    }
}

function graficar():number{        
    return 0;
}
