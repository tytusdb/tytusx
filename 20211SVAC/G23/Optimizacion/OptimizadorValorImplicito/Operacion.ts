import { Expresion } from '../OptimizadorAST/Expresion';
import { Simbolo } from '../OptimizadorAST/Simbolo';
import { OptimizacionResultado } from '../Reporte/OptimizacionResultado';
import { Primitivo } from './Primitivo';

export enum TIPO_OPERACION {
    SUMA = 1,
    RESTA = 2,
    MULTIPLICACION = 3,
    DIVISION = 4,
    MODULO = 5,
    MAYOR_QUE = 6,
    MENOR_QUE = 7,
    MAYOR_IGUA_QUE = 8,
    MENOR_IGUA_QUE = 9,
    IGUAL_IGUAL = 10,
    DIFERENTE_QUE = 11,
    PRIMITIVO = 12,
    ID = 13
}

export class Operacion extends Expresion
{
    public operadorIzq: Operacion;
    public operadorDer: Operacion;
    public valor: object;
    public linea: number;
    public columna: number;
    public tipo: TIPO_OPERACION;

    public constructor(){
        super();
        this.tipo = 0;
        this.operadorIzq = null;
        this.operadorDer = null;
        this.valor = null;
        this.linea = 0;
        this.columna = 0;
    }

    public Primitivo(valor: object)
    {
        this.tipo = TIPO_OPERACION.PRIMITIVO;
        this.valor = valor;
    }

    public Identificador(valor: object, linea: number, columna: number)
    {
        this.tipo = TIPO_OPERACION.ID;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    public Operation(izq: Operacion, der: Operacion, operacion: TIPO_OPERACION, linea: number, columna: number)
    {
        this.tipo = operacion;
        this.operadorIzq = izq;
        this.operadorDer = der;
        this.linea = linea;
        this.columna = columna;
    }

    public optimizarCodigo(): OptimizacionResultado
    {
        let antes = this.generarAugus();
        let resultado = new OptimizacionResultado();
        resultado.codigo = antes;
        return resultado;
    }

    public generarAugus(): string
    {
        //PRIMITIVOS
        if (this.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let primvalor = this.valor as Primitivo;
            return primvalor.generarAugus();
        }
        //IDENTIFICADORES
        else if (this.tipo == TIPO_OPERACION.ID)
        {
            let simbolo = new Simbolo(this.valor as unknown as string, this.linea, this.columna);
            return simbolo.generarAugus();
        }
        //SUMA
        else if (this.tipo == TIPO_OPERACION.SUMA) return this.operadorIzq.generarAugus() + "+" + this.operadorDer.generarAugus();

        //RESTA
        else if (this.tipo == TIPO_OPERACION.RESTA) return this.operadorIzq.generarAugus() + "-" + this.operadorDer.generarAugus();

        //MULTIPLICACION
        else if (this.tipo == TIPO_OPERACION.MULTIPLICACION) return this.operadorIzq.generarAugus() + "*" + this.operadorDer.generarAugus();

        //DIVISION
        else if (this.tipo == TIPO_OPERACION.DIVISION) return this.operadorIzq.generarAugus() + "/" + this.operadorDer.generarAugus();

        //MODULO
        else if (this.tipo == TIPO_OPERACION.MODULO) return this.operadorIzq.generarAugus() + "%" + this.operadorDer.generarAugus();

        //MAYOR QUE
        else if (this.tipo == TIPO_OPERACION.MAYOR_QUE) return this.operadorIzq.generarAugus() + ">" + this.operadorDer.generarAugus();

        //MAYOR IGUAL
        else if (this.tipo == TIPO_OPERACION.MAYOR_IGUA_QUE) return this.operadorIzq.generarAugus() + ">=" + this.operadorDer.generarAugus();

        //MENOR
        else if (this.tipo == TIPO_OPERACION.MENOR_QUE) return this.operadorIzq.generarAugus() + "<" + this.operadorDer.generarAugus();

        //MENOR IGUAL
        else if (this.tipo == TIPO_OPERACION.MENOR_IGUA_QUE) return this.operadorIzq.generarAugus() + "<=" + this.operadorDer.generarAugus();

        //IGUAL
        else if (this.tipo == TIPO_OPERACION.IGUAL_IGUAL) return this.operadorIzq.generarAugus() + "==" + this.operadorDer.generarAugus();

        //DIFERENTE
        else if (this.tipo == TIPO_OPERACION.DIFERENTE_QUE) return this.operadorIzq.generarAugus() + "!=" + this.operadorDer.generarAugus();

        else return "";
    }


    public invertirCondicion(): string
    {
        //IGUAL
        if (this.tipo == TIPO_OPERACION.IGUAL_IGUAL) return this.operadorIzq.generarAugus() + "!=" + this.operadorDer.generarAugus();

        //DIFERENTE
        else if (this.tipo == TIPO_OPERACION.DIFERENTE_QUE) return this.operadorIzq.generarAugus() + "==" + this.operadorDer.generarAugus();

        else return this.generarAugus();

    }

    //MI REGLA 5
    public validarRegla1(varActual: object, varAsigna: object, varPrevia:object, varAsignaPrevia: object): boolean
    {
        let varA = varAsignaPrevia as unknown as string;
        let varB = varPrevia as unknown as string;
        if (varA == varActual as unknown as string && varB == varAsigna as unknown as string) return true;
        return false;
    }

    //MI REGLA 3
    public validarRegla4(): boolean
    {
        if(this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorIzq.generarAugus();
            let value2 = this.operadorDer.generarAugus();
            if (value == value2) return true;
        } 
        else if(this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.ID)
        {
            let value = this.operadorIzq.generarAugus();
            let value2 = this.operadorDer.generarAugus();
            if(value == value2) return true;
        }
        return false;
    }

    //MI REGLA 4
    public validarRegla5(): boolean
    {
        if(this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorIzq.generarAugus();
            let value2 = this.operadorDer.generarAugus();
            if (value != value2) return true;
        }
        return false;
    }

    //MI REGLA 6
    public validarRegla8(id: string): boolean
    {
        if(this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            if (this.operadorIzq.valor as unknown as string == id)
            {
                let value = this.operadorDer.generarAugus();
                if (value == "0") return true;
            }
        }
        else if(this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            if(this.operadorDer.valor as unknown as string == id)
            {
                let value = this.operadorIzq.generarAugus();
                if (value == "0")
                {
                    return true;
                }
            }
        }
        return false;
    }

    //MI REGLA 7
    public validarRegla9(id: string): boolean
    {
        if(this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            if (this.operadorIzq.valor as unknown as string == id)
            {
                let value = this.operadorDer.generarAugus();
                if (value == "0") return true;
            }
        }
        return false;
    }

    //MI REGLA 8
    public validarRegla10(id: string): boolean
    {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            if (this.operadorIzq.valor as unknown as string == id)
            {
                let value = this.operadorDer.generarAugus();
                if (value == "1") return true;
            }
        }
        else if (this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            if (this.operadorDer.valor as unknown as string == id)
            {
                let value = this.operadorIzq.generarAugus();
                if (value == "1")
                {
                    return true;
                }
            }
        }
        return false;
    }

    //MI REGLA 9
    public validarRegla11(id: string): boolean
    {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            if (this.operadorIzq.valor as unknown as string == id)
            {
                let value = this.operadorDer.generarAugus();
                if (value == "1") return true;
            }
        }
        return false;
    }

    //MI REGLA 10 revisar esta regla en caso de que me encuentre con problemas
    public validarRegla12()
    {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorDer.generarAugus();
            if (value == "0") return this.operadorIzq.valor;
            
        }
        else if (this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorIzq.generarAugus();
            if (value == "0") return this.operadorDer.valor;
        }
        return "";
    }

    //MI REGLA 11
    public validarRegla13()
    {
        if(this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorDer.generarAugus();
            if (value == "0") return this.operadorIzq.valor;
        }
        return "";
    }

    //MI REGLA 12
    public validarRegla14()
    {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorDer.generarAugus();
            if (value == "1") return this.operadorIzq.valor;
        }
        else if (this.operadorDer.tipo == TIPO_OPERACION.ID && this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorIzq.generarAugus();
            if (value == "1") return this.operadorDer.valor;
        }
        return "";
    }

    //MI REGLA 13
    public validarRegla15()
    {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorDer.generarAugus();
            if (value == "1") return this.operadorIzq.valor;
        }
        return "";
    }

    //MI REGLA 14
    public validarRegla16()
    {
        if (this.operadorIzq.tipo == TIPO_OPERACION.ID && this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorDer.generarAugus();
            if (value == "2") return this.operadorIzq.valor + "+" + this.operadorIzq.valor;
        }
        return "";
    }

    //MI REGLA 15
    public validarRegla17(): string
    {
        if(this.operadorDer.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorDer.generarAugus();
            if (value == "0") return "0";
        }
        else if(this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO)
        {
            let value = this.operadorIzq.generarAugus();
            if (value == "0") return "0";
        }
        return "";
    }

    //MI REGLA 16
    public validarRegla18(): string
    {
        if (this.operadorIzq.tipo == TIPO_OPERACION.PRIMITIVO && this.operadorDer.tipo == TIPO_OPERACION.ID)
        {
            let value = this.operadorIzq.generarAugus();
            if (value == "0") return "0";
        }
        return "";
    }

}