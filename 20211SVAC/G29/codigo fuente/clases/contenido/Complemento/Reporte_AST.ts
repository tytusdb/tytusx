import { Arbol } from '../AST/Arbol';
import { Nodo } from '../AST/Nodo';
import { Nodo_AST } from '../AST/Nodo_AST';
import { Tipo } from '../AST/Tipo';
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

class Reporte_AST{

    get_Report(arbol: Arbol){
        let raiz = new Nodo_AST("Raiz",null,[]);  
        arbol.instrucciones.forEach(element => {
        raiz.children.push(this.sentencias_ast(element));      
    });
        return raiz;
    }

    sentencias_ast(sent):any{
        if(sent instanceof If){
          return this.if_ast(sent);
        }else if(sent instanceof Declaracion){
          return this.declaracion_ast(sent);
        }else if(sent instanceof Asignacion){
          return this.asignacion_ast(sent);
        }else if(sent instanceof Break){
          return new Nodo_AST("Break",null,[]);
        }else if(sent instanceof Continue){
          return new Nodo_AST("Continue",null,[]);
        }else if(sent instanceof Return){
          return this.return_ast(sent);
        }else if(sent instanceof While){
          return this.while_ast(sent);
        }else if(sent instanceof Do_while){
          return this.do_while_ast(sent);
        }else if(sent instanceof Switch){
          return this.switch_ast(sent);
        }else if(sent instanceof For){
          return this.for_ast(sent);
        }else if(sent instanceof For_1){
          return this.for_1_ast(sent);
        }else if(sent instanceof Imprimir){
          return this.imprimir_ast(sent);
        }else if(sent instanceof Llamada_funcion){
          return this.llamada_funcion_ast(sent);
        }else if(sent instanceof Funcion){
          return this.funcion_ast(sent);
        }else if(sent instanceof Typo){
          return this.type_ast(sent);
        }else if(sent instanceof Type_object){
          return this.type_object_ast(sent);
        }else if(sent instanceof Arreglo){
          return this.arreglo_ast(sent);
        }else if(sent instanceof Push){
          return this.arreglo_push_ast(sent);
        }else if(sent instanceof Pop){
          return this.arreglo_pop_ast(sent);
        }else if(sent instanceof SD_Arreglo){
          return this.sd_arreglo_ast(sent);
        }else if(sent instanceof Set_type){
          return this.set_type_ast(sent);
        }
      }
      if_ast(sent:If):any{
        let padre = new Nodo_AST("If", null,[]); 
        let condicion = new Nodo_AST("Condicion", padre,[]);
        let cont_if = new Nodo_AST("Contenido If", padre,[]);
        let cont_else = new Nodo_AST("Contenido Else", padre,[]);
        condicion.children.push(this.ast(sent.condicion));
        sent.lista_if.forEach(element => {
          cont_if.children.push(this.sentencias_ast(element));
        });
        sent.lista_else.forEach(element => {
          cont_else.children.push(this.sentencias_ast(element));
        });       
        padre.children = [condicion, cont_if, cont_else];
        return padre;
      }
      while_ast(sent: While){
        let padre = new Nodo_AST("While", null,[]); 
        let condicion = new Nodo_AST("Condicion", padre,[]);
        let contenido = new Nodo_AST("Contenido", padre,[]);
        condicion.children.push(this.ast(sent.condicion));
        sent.contenido.forEach(element => {
          contenido.children.push(this.sentencias_ast(element));
        });
        padre.children = [condicion, contenido];
        return padre;
      }
    
      declaracion_ast(sent: Declaracion){
        let padre = new Nodo_AST("Declaracion", null,[]);
        padre.children.push(this.tipo_ast("Tipo declaracion", sent.tipo_declaracion));
        padre.children.push(this.tipo_ast("Identificador", sent.id));
        padre.children.push(this.tipo_ast("Tipo de dato", sent.tipo));
        if(sent.valor != null){
          let valor =  new Nodo_AST("Valor", padre, [this.ast(sent.valor)]);
          padre.children.push(valor);
        }
        return padre;
      }
    
      asignacion_ast(sent: Asignacion){
        let padre = new Nodo_AST("Asignacion ", null,[]); 
        padre.children.push(this.tipo_ast("Identificador", sent.id));
        let valor =  new Nodo_AST("Valor", padre, [this.ast(sent.valor)]);
        padre.children.push(valor);
        return padre; 
      }
    
      imprimir_ast(sent: Imprimir){
        let padre = new Nodo_AST("Imprimir ", null,[]); 
        padre.children.push(this.ast(sent.expresion)); 
        return padre;
      }
      return_ast(sent: Return){
        let padre = new Nodo_AST("Return ", null,[]); 
        padre.children.push(this.ast(sent.condicion)); 
        return padre;
      }
      
      llamada_funcion_ast(sent: Llamada_funcion){
          let padre =  new Nodo_AST("LLamada Funcion " + sent.nombre, null, []);
          sent.parametros.forEach(element => {
            padre.children.push(this.ast(element));
          });
          return padre;
      }
      funcion_ast(sent: Funcion){
        let padre =  new Nodo_AST("Funcion ", null, []);
        padre.children.push(this.tipo_ast("Identificador", sent.nombre));
        
        if(sent.parametros.length > 0){
          let parametros = new Nodo_AST("Parametros ", padre, []);
          sent.parametros.forEach(element => {
            parametros.children.push(this.sentencias_ast(element));
          });
          padre.children.push(parametros);  
        }
        padre.children.push(this.tipo_ast("Tipo", sent.tipo));
        
        if(sent.contenido.length > 0){
          let contenido = new Nodo_AST("Contenido", padre,[]);
          sent.contenido.forEach(element => {
            contenido.children.push(this.sentencias_ast(element));
          });
          padre.children.push(contenido);  
        }
        
        return padre;
      }
    
      switch_ast(sent: Switch){
        let padre =  new Nodo_AST("Switch" , null, []);
        let exp1 = new Nodo_AST("Expresion", padre,[]);
        exp1.children.push(this.ast(sent.expresion));
    
        sent.contenido.forEach(element => {
          if(element instanceof Case){
              padre.children.push(this.case_ast(element));
          }else if(element instanceof Default){
            padre.children.push(this.default_ast(element));
          }
        });
        return padre;
      }
      case_ast(sent: Case){
        let padre =  new Nodo_AST("Case" , null, []);
        let exp1 = new Nodo_AST("Expresion", padre,[]);
        exp1.children.push(this.ast(sent.expresion));
        let contenido = new Nodo_AST("Contenido", padre,[]);
        sent.contenido.forEach(element => {
          contenido.children.push(this.sentencias_ast(element));
        });
        padre.children = [exp1, contenido];
        return padre;
      }
      default_ast(sent: Default){
        let padre =  new Nodo_AST("Default" , null, []);
        let contenido = new Nodo_AST("Contenido", padre,[]);
        sent.contenido.forEach(element => {
          contenido.children.push(this.sentencias_ast(element));
        });
        padre.children = [contenido];
        return padre;
      }
    
      for_ast(sent: For){
        let padre =  new Nodo_AST("For" , null, []);
        let exp1 = new Nodo_AST("Expresion 1", padre,[]);
        let exp2 = new Nodo_AST("Expresion 2", padre,[]);
        let exp3 = new Nodo_AST("Expresion 3", padre,[]);
        let contenido = new Nodo_AST("Contenido", padre,[]);
       
        exp1.children.push(this.sentencias_ast(sent.exp1));
        exp2.children.push(this.ast(sent.exp2));
        exp3.children.push(this.sentencias_ast(sent.exp3));
    
        sent.contenido.forEach(element => {
          contenido.children.push(this.sentencias_ast(element));
        });
        padre.children = [exp1, exp2, exp3, contenido];
        return padre;
      }
    
      for_1_ast(sent: For_1){
        let padre =  new Nodo_AST("For " , null, []);
        let dec = this.tipo_ast("Variable", sent.variable);
        let tipo = this.tipo_ast("Tipo", sent.tipo_for);
        let id = this.tipo_ast("Id", sent.id);
        let contenido = new Nodo_AST("Contenido", padre,[]);
       
        sent.contenido.forEach(element => {
          contenido.children.push(this.sentencias_ast(element));
        });
        padre.children = [dec,tipo, id, contenido];
        return padre;
      }

      type_ast(sent: Typo){
        let padre =  new Nodo_AST("Type" , null, []);
        let id = this.tipo_ast("Id", sent.nombre);
        padre.children.push(id);
        let atributos = new Nodo_AST("Attributos" , null, []);
        for(let key of Array.from( sent.attributos.keys()) ) {
            atributos.children.push(this.att_type_ast(key, sent.attributos.get(key)));
      }
        padre.children.push(atributos);
        return padre;
        
      }
      
      type_object_ast(sent: Type_object){
        let padre =  new Nodo_AST("Type Object" , null, []);
        let id = this.tipo_ast("Id", sent.nombre);
        let tipo = this.tipo_ast("Tipo", sent.nombre_tipo);
        padre.children.push(id,tipo);
        let atributos = new Nodo_AST("Attributos" , null, []);
        sent.atributos.forEach(element => {
          atributos.children.push(this.att_type_ast(element[0], element[1]));
        });  
      
        padre.children.push(atributos);
        return padre;
        
      }

      att_type_ast(key, val){
        let padre =  new Nodo_AST("Atributo" , null, []);
        let id = this.tipo_ast("Id", key);
        let value;
        if(val instanceof Tipo){
          value= this.tipo_ast("Tipo", val.toString());
        }else{
          value = new Nodo_AST("Valor", padre, [this.ast(val)]);
        }
        padre.children = [id, value];
        return padre;
      }

      set_type_ast(sent: Set_type){
        let padre = new Nodo_AST("Set type", null, []);
        padre.children.push(new Nodo_AST("Lista id", padre, [this.list_type_ast(sent.parms,0)]));
        padre.children.push(new Nodo_AST("Valor", padre, [this.ast(sent.valor)]));
        return padre;
      }
      get_type_ast(sent: Llamada_type){
        let padre = new Nodo_AST("Get type", null, []);
        padre.children.push(new Nodo_AST("Lista id", padre, [this.list_type_ast(sent.parms,0)]));
        return padre;
      }

      list_type_ast(list, i){
        let padre = new Nodo_AST(list[i], null, []);
        if(i < list.length){
          padre.children.push(this.list_type_ast(list, i+1));
        }  
        return padre;
      }

      arreglo_ast(sent: Arreglo){
        let padre = new Nodo_AST("Declaracion Arreglo", null, []);
        let id = this.tipo_ast("Id", sent.nombre);
        let dimension = this.tipo_ast("Dimension", sent.dimension);
        let tipo = this.tipo_ast("Tipo", sent.tipo);
        padre.children = [id, dimension, tipo];
        return padre;
      }
      arreglo_push_ast(sent: Push){
        let padre = new Nodo_AST("Push arreglo", null, []);
        let id = this.tipo_ast("Id", sent.nombre);
        let valor = new Nodo_AST("Valor", padre, [this.ast(sent.valor)]);
        padre.children = [id, valor];
        return padre;
      }
      
      arreglo_pop_ast(sent: Pop){
        let padre = new Nodo_AST("Pop arreglo", null, []);
        let id = this.tipo_ast("Id", sent.nombre);
        padre.children = [id];
        return padre;
      }
      arreglo_length_ast(sent: Length){
        let padre = new Nodo_AST("Length arreglo", null, []);
        let id = this.tipo_ast("Id", sent.expresion);
        padre.children = [id];
        return padre;
      }
      
      sd_arreglo_ast(sent: SD_Arreglo){
        let padre = new Nodo_AST("Asignacion arreglo", null, []);
        let id = this.tipo_ast("Id", sent.nombre);
        let pos  = this.pos_arreglo_ast(sent.posicion);
        let valor = new Nodo_AST("Valor", padre, [this.ast(sent.valor)]);

        padre.children = [id, pos,valor];
        return padre;
      }

      gd_arreglo_ast(sent: GD_Arreglo){
        let padre = new Nodo_AST("Get arreglo", null, []);
        let id = this.tipo_ast("Id", sent.nombre);
        let pos  = this.pos_arreglo_ast(sent.posicion);
        padre.children = [id, pos];
        return padre;
      }
      
      pos_arreglo_ast(pos: Array<Nodo>){
        let i = 1;  
        let padre = new Nodo_AST("Posicion", null, []);
        pos.forEach(element => {
          let dim = new Nodo_AST("Dimension " + i, padre, [this.ast(element)]);
          padre.children.push(dim);
          i++;    
        });
        return padre;
      }

      do_while_ast(sent: Do_while){
        let padre = new Nodo_AST("Do While", null,[]); 
        let condicion = new Nodo_AST("Condicion", padre,[]);
        let contenido = new Nodo_AST("Contenido", padre,[]);
        condicion.children.push(this.ast(sent.condicion));
        sent.contenido.forEach(element => {
          contenido.children.push(this.sentencias_ast(element));
        });
        padre.children = [condicion, contenido];
        return padre; 
      }
    
      ast(element):any{
        let exp = new Nodo_AST("E",null,[]);
        if(element instanceof Aritmetica || element instanceof Logica || element instanceof Relacional){     
          
          if(element.nodo_derecho != null){
              let izq: Nodo_AST= this.ast(element.nodo_izquierdo);
              izq.parent = exp;
              exp.children.push(izq);
              exp.children.push(new Nodo_AST(element.operador,exp,[]));
              let der: Nodo_AST= this.ast(element.nodo_derecho);
              der.parent = exp;
              exp.children.push(der);
          }else{
            exp.children.push(new Nodo_AST(element.operador,exp,[]));
            let izq: Nodo_AST= this.ast(element.nodo_izquierdo);
            exp.children.push(izq);          
          } 
        }else if(element instanceof Primitivo){
          let hijo = new Nodo_AST(element.valor.toString(), null, []);
          let e = new Nodo_AST("E",null,[hijo]);   
          return e;
    
        }else if(element instanceof Identificador){
          let hijo = new Nodo_AST(element.id.toString(), null, []);
          let e = new Nodo_AST("E",null,[hijo]); 
          return e; 
        }else if(element instanceof Llamada_funcion){
          let hijo = this.llamada_funcion_ast(element);
          let e = new Nodo_AST("E",null,[hijo]); 
          return e;
        }else if(element instanceof Pop){
          let hijo = this.arreglo_pop_ast(element);
          let e = new Nodo_AST("E",null,[hijo]); 
          return e;
        }else if(element instanceof Length){
          let hijo = this.arreglo_length_ast(element);
          let e = new Nodo_AST("E",null,[hijo]); 
          return e;
        }else if(element instanceof GD_Arreglo){
          let hijo = this.gd_arreglo_ast(element);
          let e = new Nodo_AST("E",null,[hijo]); 
          return e;
        }else if(element instanceof Llamada_type){
          let hijo = this.get_type_ast(element);
          let e = new Nodo_AST("E",null,[hijo]); 
          return e;
        }
        return exp;
      }
    
      tipo_ast(tipo, valor){
        return new Nodo_AST(tipo, null,[new Nodo_AST(valor, null, [])]);
      }
    
}
export {Reporte_AST};