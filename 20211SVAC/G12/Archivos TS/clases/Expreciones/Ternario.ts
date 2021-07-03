import Errores from "../AST/Errores";
import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Expreciones } from "../Interfaces.ts/Expreciones";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";


export default class Ternario implements Expreciones{

    
    public condicion : Expreciones;
    public verdadero : Expreciones;
    public falso : Expreciones;
    public linea : number;
    public columna : number;

    constructor(condicion, verdadero, falso, linea, columna) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(typeof valor_condicion == 'boolean'){
            return valor_condicion ? this.verdadero.getTipo(controlador,ts) : this.falso.getTipo(controlador,ts); 
        }else{
            let error = new Errores('Semantico', `La condicion del ternario no es booleana.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : La condicion del ternario no es booleana. En la linea ${this.linea} y columan ${this.columna}`);
        }
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(typeof valor_condicion == 'boolean'){
            return valor_condicion ? this.verdadero.getValor(controlador,ts) : this.falso.getValor(controlador,ts); 
        }else{
            let error = new Errores('Semantico', `La condicion del ternario no es booleana.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : La condicion del ternario no es booleana. En la linea ${this.linea} y columan ${this.columna}`);
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo("Ternario","");
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new Nodo(":",""));
        padre.AddHijo(this.falso.recorrer());
        padre.AddHijo(new Nodo("?",""));
        padre.AddHijo(this.verdadero.recorrer());
       return padre;
    }

}