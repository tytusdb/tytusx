import { Nodo } from '../AST/Nodo';
import { tipos } from '../AST/Tipo';
import { Aritmetica } from '../Expresiones/Aritmetica';
import { Break } from '../Expresiones/Break';
import { Continue } from '../Expresiones/Continue';
import { Logica } from '../Expresiones/Logica';
import { Primitivo } from '../Expresiones/Primitivo';
import { Relacional } from '../Expresiones/Relacional';
import { Return } from '../Expresiones/Return';
import { Arreglo, GD_Arreglo, Pop, Push, SD_Arreglo } from '../Instrucciones/Arreglo';
import { Asignacion } from '../Instrucciones/Asignacion';
import { Case } from '../Instrucciones/Case';
import { Declaracion } from '../Instrucciones/Declaracion';
import { Default } from '../Instrucciones/Default';
import { Do_while } from '../Instrucciones/Do_while';
import { For } from '../Instrucciones/For';
import { For_1 } from '../Instrucciones/For_1';
import { Funcion } from '../Instrucciones/Funcion';
import { Identificador } from '../Instrucciones/Identificador';
import { If } from '../Instrucciones/If';
import { Imprimir } from '../Instrucciones/Imprimir';
import { Llamada_funcion } from '../Instrucciones/Llamada_funcion';
import { Llamada_type } from '../Instrucciones/Llamada_type';
import { Switch } from '../Instrucciones/Switch';
import { Set_type, Type_object } from '../Instrucciones/Type_object';
import { Typo } from '../Instrucciones/Typo';
import { While } from '../Instrucciones/While';
import {Length} from '../Instrucciones/Length';

class Traducir{

    traducir(contenido):string{
        let traduccion = "";
        for(let i = 0; i < contenido.length; i++){
            let val =  contenido[i];
            if(val instanceof Funcion){
                traduccion += this.funcion(val,"");
            }else{
                traduccion += this.sentencias(val, "");
            }
            traduccion += "\n";
        }
        return traduccion;
    }

    funcion(func:Funcion,tab):string{
        let cont = "function "+ func.nombre + "("+ this.calcular_par(func.parametros)+ "):"+ func.tipo +"{";
        func.contenido.forEach(element => {cont +="\n" + this.sentencias(element, "  ");});
        return cont + "\n}";;
    }
    sentencias(sent:Object, tab): string{
        let cont = "";
        if(sent instanceof If){
           cont = this.sent_if(sent, tab);
        }else if(sent instanceof Declaracion){
            cont = this.sent_declaracion(sent, tab);
        }else if(sent instanceof Asignacion){
            cont = this.sent_asignacion(sent, tab) + ";";
        }else if(sent instanceof Break){
            cont = tab + "break;";
        }else if(sent instanceof Continue){
            cont = tab + "continue;";
        }else if(sent instanceof Return){
            cont = this.sent_return(sent, tab);
        }else if(sent instanceof While){
            cont = this.sent_while(sent, tab);
        }else if(sent instanceof Do_while){
            cont = this.sent_do_while(sent, tab);
        }else if(sent instanceof Switch){
            cont = this.sent_switch(sent, tab);
        }else if(sent instanceof For){
            cont = this.sent_for(sent, tab);
        }else if(sent instanceof For_1){
            cont = this.sent_for_inof(sent, tab);
        }else if(sent instanceof Imprimir){
            cont = this.sent_imprimir(sent, tab);
        }else if(sent instanceof Llamada_funcion){
            cont  = this.sent_llamada_funcion(sent,tab);
        }else if(sent instanceof Arreglo){
            cont = this.sent_arreglo(sent, tab);
        }else if(sent instanceof Push){
            cont = this.sent_arreglo_push(sent, tab);
        }else if(sent instanceof Pop){
            cont = this.sent_arreglo_pop(sent, tab) + ";";
        }else if(sent instanceof SD_Arreglo){
            cont = this.sent_arreglo_set(sent, tab);
        }else if(sent instanceof Typo){
            cont = this.sent_type(sent, tab);
        }else if(sent instanceof Type_object){
            cont = this.sent_type_obj(sent, tab);
        }else if(sent instanceof Set_type){
            cont = this.sd_type_obj(sent, tab);
        }
        return cont;
    }

    sent_return(sent:Return, tab):string{
        let cont = tab + "return ";
        if(sent.condicion != null){cont += this.expresion(sent.condicion);}
        return cont + ";";
    }

    sent_llamada_funcion(sent:Llamada_funcion, tab):string{
        return tab + this.llamada_funcion(sent) + ";";
    }

    llamada_funcion(sent:Llamada_funcion):string{
        let cont = sent.nombre + "(";
        for(let i = 0; i < sent.parametros.length; i++){
            if(i != 0){
                cont +=  ", " ;
            }
            cont += this.expresion(sent.parametros[i]);
        }
        return cont + ")";
    }
    sent_for(sent: For, tab):string{
        let cont = tab + "for(";
        if(sent.exp1 instanceof Declaracion){
            cont += this.sent_declaracion(sent.exp1,"");
        }else if(sent.exp1 instanceof Asignacion){
            cont += this.sent_asignacion(sent.exp1,"");
        }
        cont += " "+ this.expresion(sent.exp2) + "; " + this.sent_asignacion(sent.exp3, "") + "){";
        sent.contenido.forEach(element => {
            this.sentencias(element, tab + "  ")
        });
        return cont + "\n" + tab + "}";

    }

    sent_if(sent:If,tab):string{
        let cont = tab + "if (" + this.expresion(sent.condicion) + "){";
        sent.lista_if.forEach(element => {
            cont += "\n" +this.sentencias(element, tab + "  ");
        });
        if(sent.lista_else.length > 0){
            cont += "\n" + tab+ "}else{";
            sent.lista_else.forEach(element => {
                cont += "\n" +this.sentencias(element, tab + "  ");
            });
        }
        return cont + "\n" + tab+ "}";
    }

    sent_declaracion(sent: Declaracion,tab): string{
        let cont = tab + sent.tipo_declaracion + " " + sent.id + " " ;
        if(sent.tipo != null){ cont += ":" + sent.tipo; }
        if(sent.valor != null){cont += "= "+ this.expresion(sent.valor);}
        return cont + ";";;
    }

    sent_asignacion(sent: Asignacion, tab){
        return tab + sent.id + " = " + this.expresion(sent.valor);
    }
    sent_imprimir(sent: Imprimir,tab){
        let cont = tab +"console.log(";
        if(sent.expresion != null){cont += this.expresion(sent.expresion);}
        return cont + ");";

    }

    sent_type(sent: Typo, tab){
        let cont = tab + "type " + sent.nombre + " = {";
        let i =0;
        for(let key of Array.from( sent.attributos.keys()) ) {
            let  tipo = sent.attributos.get(key);
            if(i == 0){
                cont += "\n"+ tab + "  " + key + ": " + tipo.toString();

            }else{
                cont += "," +  "\n" + tab + "  " + key + ": " + tipo.toString();
            }
            i++;
        }
        return cont + "\n" + tab + "};";
    }
    sent_type_obj(sent: Type_object, tab){
        let cont = tab + "type " + sent.nombre + " = {";
        let i =0;
        sent.atributos.forEach(element => {
            if(i == 0){
                cont += "\n"+ tab + "  " + element[0] + ": " + this.expresion(element[1]);

            }else{
                cont += "," +  "\n" + tab + "  " + element[0] + ": " + this.expresion(element[1]);
            }
            i++;
        });
        return cont + "\n" + tab + "};";
    }
    gd_type_obj(sent: Llamada_type, tab){
        return tab + this.list_id(sent.parms);
    }
    sd_type_obj(sent: Set_type, tab){
        return tab + this.list_id(sent.parms) + " = " + this.expresion(sent.valor) + ";";
    }
    list_id(ids){
        let cont = ids[0];
        for(let i = 1; i < ids.length; i++){
            cont += "." + ids[i];
        }
        return cont;
    }

    sent_arreglo(sent :Arreglo, tab){
        let cont = tab + "let " + sent.nombre + ": " +
                    sent.tipo.toString() + " = " +
                    this.cont_arreglo(sent.contenido) + ";";
        return cont;
    }

    cont_arreglo(arr){
        let cont = "[";
        for(let i = 0; i < arr.length; i++){
            if(arr[i] instanceof Array){
                if(i == 0){
                    cont +=  this.cont_arreglo(arr[i]);
                }else{
                    cont += ", " + this.cont_arreglo(arr[i]);
                }
            }else{
                if(arr[i] instanceof Nodo){
                    if(i == 0){
                        cont += this.expresion(arr[i]);
                    }else{
                        cont += ", " + this.expresion(arr[i]);
                    }
                }
            }
        }
        cont += "]";
        return cont;
    }

    sent_arreglo_push(sent: Push, tab){
        return tab + sent.nombre + ".push(" + this.expresion(sent.valor) + ");";
    }
    sent_arreglo_pop(sent: Pop, tab){
        return tab + sent.nombre + ".pop()";
    }
    sent_arreglo_length(sent: Length, tab){
        return tab + this.expresion(sent.expresion) + ".length" ;
    }
    sent_arreglo_set(sent: SD_Arreglo, tab){
        return tab + sent.nombre + this.pos_arreglo(sent.posicion) + " = "
        + this.expresion(sent.valor) + ";";
    }

    sent_arreglo_get(sent: GD_Arreglo, tab){
        return tab + sent.nombre + this.pos_arreglo(sent.posicion);
    }
    pos_arreglo(val){
        let cont = "";
        val.forEach(element => {
            cont += "[" + this.expresion(element) + "]";
        });
        return cont;
    }

    sent_for_inof(sent: For_1, tab){
        let cont  = "for( let " + sent.variable + " " +sent.tipo_for + " " + sent.id + "){";
        sent.contenido.forEach(element => {
            cont += "\n" + this.sentencias(element, tab + "  ");
        });
        return cont + "\n" + tab + "}";
    }
    sent_while(sent: While,tab){
        let cont = tab + "while(" + this.expresion(sent.condicion) + "){";
        sent.contenido.forEach(element => {cont +="\n" + this.sentencias(element, tab + "  ");});
        return cont + "\n" + tab + "}";
    }
    sent_do_while(sent: Do_while, tab){
        let cont = tab + "do{";
        sent.contenido.forEach(element => {cont +="\n" + this.sentencias(element, tab + "  ");});
        return cont  + "\n" + tab + "}while(" + this.expresion(sent.condicion) + ");";

    }
    sent_switch(sent: Switch, tab){
        let cont = tab + "switch(" + this.expresion(sent.expresion) + "){";
        sent.contenido.forEach(element => {
            if(element instanceof Case){
                cont += "\n" + this.sent_case(element, tab + "  ");
            }
            if(element instanceof Default){
                cont += "\n" + this.sent_default(element, tab + "  ");
            }
        });
        return cont + "\n" + tab + "}";
    }

    sent_case(sent: Case, tab){
        let cont = tab + "case " + this.expresion(sent.expresion) + " :";
        sent.contenido.forEach(element => {
            cont += "\n" + tab  + this.sentencias(element, tab + "  ");
        });
        return cont;
    }
    sent_default(sent: Default, tab){
        let cont = tab + "default :";
        sent.contenido.forEach(element => {
            cont += "\n" + tab + this.sentencias(element, tab + "  ");
        });
        return cont;
    }

    expresion(exp:Object){
        let val = "";
        if(exp instanceof Logica || exp instanceof Relacional || exp instanceof Aritmetica){
             if(exp.nodo_derecho != null){
                    val += this.expresion(exp.nodo_izquierdo) + " " +exp.operador + " "+
                     this.expresion(exp.nodo_derecho);
            }else{
                   val += exp.operador + this.expresion(exp.nodo_izquierdo);
            }
        }else if(exp instanceof Primitivo){
            let temp;
            if(exp.tipo.type == tipos.STRING){
                temp  =  "\"" + exp.valor + "\"";
            }else{
                temp = exp.valor;
            }
            return temp;
        }else if(exp instanceof Identificador){return exp.id;
        }else if(exp instanceof Llamada_funcion){return this.llamada_funcion(exp);
        }else if(exp instanceof Array){
            return this.cont_arreglo(exp);
        }else if(exp instanceof Pop){
            return this.sent_arreglo_pop(exp, "");
        }else if(exp instanceof Length){
            return this.sent_arreglo_length(exp, "");
        }else if(exp instanceof GD_Arreglo){
            return this.sent_arreglo_get(exp, "");
        }else if(exp instanceof Llamada_type){
            return this.gd_type_obj(exp, "");
        }
        return val;
    }

    calcular_par(params: Array<Declaracion>):string{
        let res = "";
        for(let i = 0; i < params.length; i++){
            if(i != 0){ res += ", "; }
            res += params[i].id + ": " + params[i].tipo;
        }
        return res;
    }
}
export{Traducir};
