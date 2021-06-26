class Objeto implements Expresion {
    id1: string;
    id2: string;
    text: string;
    listAtributos:Array<Atributo>;
    listObjetos:Array<Objeto>;
    line:number;
    column:number;
    entorno:Entorno;
    
    constructor(id1: string, id2: string, text:string,
        listAtributos:Array<Atributo>, listObjetos:Array<Objeto>,
        line:number, column:number) {
        this.id1 = id1;
        this.id2 =  id2;
        this.text = text;
        this.listAtributos = listAtributos;
        this.listObjetos = listObjetos;
        this.line = line;
        this.column = column;
        this.entorno = new Entorno(null);
    }

    getTipo(e: Entorno):Tipo {
        return Tipo.OBJETO;
    }

    getListaAtributos() {
        return this.listAtributos;
    }

    getValorImplicito(e: Entorno):any {
        return this;
    }

    generarGrafo(g:GraphValue, padre:String): any{
        let nombreHijo:String = "nodo"+g.count;
        let padre2:String;
        let padre3:String;//para atributos

        if (this.text == '' && this.listObjetos == null) {
            g.graph += "    " + nombreHijo + "[label=\" < \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + this.id1 + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" LISTA_ATRIBUTOS \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
    
            padre3 = nombreHijo
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" / \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";        
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" > \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
    
        } else {

            g.graph += "    " + nombreHijo + "[label=\" < \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + this.id1 + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" LISTA_ATRIBUTOS \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;
    
            padre3 = nombreHijo
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" > \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
            g.count++;

            nombreHijo = "nodo"+g.count;
            if (this.listObjetos !=null) {
                g.graph += "    " + nombreHijo + "[label=\" LISTA_ELEMENTOS \"];\n";
            } else {
                g.graph += "    " + nombreHijo + "[label=\" TEXTO \"];\n";
            }
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";    
            g.count++;
            padre2 = nombreHijo;

            if(this.listObjetos == null) {
                nombreHijo = "nodo"+g.count;
                g.graph += "    " + nombreHijo + "[label=\""+this.text+"\"];\n";
                g.graph += "    " + padre2 + " -> " + nombreHijo + ";\n";        
                g.count++;
            }
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" < \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";        
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" / \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";        
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\"" + this.id1 + "\"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";        
            g.count++;
    
            nombreHijo = "nodo"+g.count;
            g.graph += "    " + nombreHijo + "[label=\" > \"];\n";
            g.graph += "    " + padre + " -> " + nombreHijo + ";\n";        
            g.count++;
        }
 
        padre = nombreHijo;

        if (this.listAtributos != undefined) {
            this.listAtributos.forEach((o:Atributo) => {
                nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\""+ o.getNombreHijo() +"\"];\n";
                g.graph += "    " + padre3 + " -> " + nombreHijo + ";\n";
                g.count++;
                o.generarGrafo(g, nombreHijo);
            });
        }

        if (this.listObjetos != undefined) {
            this.listObjetos.forEach((o:Objeto) => {
                nombreHijo = "nodo" + g.count;
                g.graph += "    " + nombreHijo + "[label=\""+ o.getNombreHijo() +"\"];\n";

                if(this.text == '' && this.listObjetos == null) {
                    g.graph += "    " + padre + " -> " + nombreHijo + ";\n";
                } else {
                    g.graph += "    " + padre2 + " -> " + nombreHijo + ";\n";
                }
                
                g.count++;
                o.generarGrafo(g, nombreHijo);
            });
        }

        return null;
    }

    getNombreHijo():String {
        return "OBJETO";
    }

}