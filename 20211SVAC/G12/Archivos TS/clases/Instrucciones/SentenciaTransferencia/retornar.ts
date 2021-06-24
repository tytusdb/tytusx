
import Nodo from "src/clases/AST/Nodo";
import Controlador from "src/clases/Controlador";
import { Expreciones } from "src/clases/Interfaces.ts/Expreciones";
import { Instruccion } from "src/clases/Interfaces.ts/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";

export default class retornar implements Instruccion{
    public valor :Expreciones ;
    constructor (valor){
        this.valor=valor;
    }
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        if(this.valor!=null){
            return this.valor.getValor(controlador,ts);
        }else{
            return null;
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo("RETURN","");
        padre.AddHijo(new Nodo("return",""));
        if(this.valor!=null){
            padre.AddHijo(this.valor.recorrer());
        }
        return padre;
    }

}