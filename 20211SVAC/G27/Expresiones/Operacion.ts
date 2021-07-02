enum Operador {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    IGUAL,
    MENOS_UNARIO,
    MAYOR_QUE,
    MENOR_QUE,
    IGUAL_IGUAL,
    DIFERENTE_QUE,
    OR,
    AND,
    NOT,
    MAYOR_IGUAL_QUE,
    MENOR_IGUAL_QUE,
    DESCONOCIDO
}

class Operacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;

    constructor(op_izq: Expresion, op_der: Expresion, operacion: Operador, linea: number, columna: number) {
        this.op_izquierda = op_izq;
        this.op_derecha = op_der;
        this.operador = operacion;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);

        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            return Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo.INT;
            }
            return Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo.NULL;
        }

        return Tipo.VOID;
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT) 
        {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);

            //operacion SUMA
            if (this.operador == Operador.SUMA) {
                if (typeof(op1==="number") && typeof(op2==="number")) {
                    return op1 + op2;
                }
                else if (op1 === "string" || op2 === "string") {
                    if (op1 == null) op1 = "null";
                    if (op2 == null) op2 = "null";
                    return op1.toString() + op2.toString();
                }
                else {
                    console.log(">>[ERROR]:Se están intentando sumar tipos de datos no válidos.");
                    return null;
                }
            }

            //Operacion RESTA
            else if (this.operador == Operador.RESTA)
            {
                if (typeof(op1 === "number") && typeof(op2 === "number"))
                {
                    return op1 - op2;
                }
                else
                {
                    console.log(">>[ERROR]:Se están intentando restar tipos de datos no válidos.");
                    return null;

                }
            }

            //Operación Multiplicacion
            else if (this.operador == Operador.MULTIPLICACION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 * op2;
                }
                else
                {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando una multiplicación");
                    return null;
                }
            }
            //Operación División
            else if (this.operador == Operador.DIVISION)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        console.log(">>[ERROR]:Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        return null;
                    }
                    return op1 / op2;
                }
                else
                {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando una suma");
                    return null;
                }
            }

            //operacion Módulo
            else if (this.operador == Operador.MODULO)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    if(op2===0){
                        console.log(">>[ERROR]:Resultado indefinido, no puede ejecutarse operación sobre cero.");
                        return null;
                    }
                    return op1 % op2;
                }
                else
                {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando operación módulo.");
                    return null;
                }
            }
        }
        else
        {
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.MENOS_UNARIO)
            {
                if (typeof(op1 === "number"))
                {
                    return -1 * op1;
                }
                else
                {
                    console.log(">>[ERROR]:Error de tipos de datos no permitidos realizando una operación unaria");
                    return null;
                }
            }
        }

        let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
        let op2 = this.op_derecha.getValorImplicito(ent, arbol);

        //aqui se deben agregar las operaciones relacionales
        //deben retornar true or false
        /*--------------------IGUAL-------------------------- */
        if (this.operador == Operador.IGUAL_IGUAL){
            if (op1 == op2){return true;}else{return false;}
        }
        /*--------------------MAYOR QUE-------------------------- */
        else if(this.operador == Operador.MAYOR_QUE){
            if (op1 > op2){return true;}else{return false;}
        }
        /*--------------------MAYOR IGUAL-------------------------- */
        else if(this.operador == Operador.MAYOR_IGUAL_QUE){
            if (op1 >= op2){return true;}else{return false;}
        }
        /*--------------------MENOR QUE-------------------------- */
        else if(this.operador == Operador.MENOR_QUE){
            if (op1 < op2){return true;}else{return false;}
        }
        /*--------------------MENOR IGUAL-------------------------- */
        else if(this.operador == Operador.MENOR_IGUAL_QUE){
            if (op1 <= op2){return true;}else{return false;}
        }
        /*--------------------DIFERENTE-------------------------- */
        else if(this.operador == Operador.DIFERENTE_QUE){
            if (op1 != op2){return true;}else{return false;}
        }
        else{
            return null;
        }
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
}