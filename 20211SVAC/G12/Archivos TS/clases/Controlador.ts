import Errores from "./AST/Errores";
import { GeneradorC3D } from "./GeneradorC3D/GeneradorC3D";
import Simbolos from "./TablaSimbolos/Simbolos";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";

export default class Controlador{
    public errores: Array<Errores>;
    public consola: string;
    public ambito: string;
    public cuerpo: string;
    public idlast: string;
    public position:number;
    public posicionid:number;
    public acceso:number;
    public entrada:string;
    public generador: GeneradorC3D;
    public exprecion;
    public ts;
    public extxt;

    constructor (){
        this.errores = new  Array<Errores>();
        this.consola ="";
        this.cuerpo;
        this.idlast="";
        this.position=0;
        this.acceso=1;
        this.generador=GeneradorC3D.getInstancia();
    }

    public append (consola: string){
        this.consola+=consola+"\n";
    }

    graficar_ts(controlador:Controlador, ts:TablaSimbolos):string{
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"6\">Tabla de Simbolos </td></tr><tr><th>Tipo</th><th>Nombre</th><th>Ambito</th><th>Valor</th></tr></thead>";

        cuerpohtml+=this.cuerpo;
        
        return cuerpohtml;
    }

    graficarEntornos(controlador:Controlador, ts:TablaSimbolos,ubicacion:string){
        var cuerpohtml="";
        for(let sim of ts.tabla){
            cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" +  this.getRol(sim.sim) + "</th><td>" + sim.identificador + 
            "</td>"+
            "</td><td>" + ubicacion + 
            "</td><td>" + this.getValor(sim.sim) +  "</tr>";
        }
        this.cuerpo=this.cuerpo+cuerpohtml;
    }

    graficar_Semantico(controlador:Controlador, ts:TablaSimbolos):string{
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"4\">Errores Semanticos </td></tr><tr><th>Tipo</th><th>Descripcion</th><th>Fila</th><th>Columna</th></tr></thead>";


        for(let sim of controlador.errores){
            console.log(`Errores`);
                
            cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" + sim.tipo + "</th><td>" + sim.descripcion + 
                "</td><td>" + sim.linea +"</td>"  + 
                "</td><td>" + sim.columna +  "</tr>";
        }
            
        
        
        return cuerpohtml;
    }
    getValor(sim:Simbolos):string{
        if(sim.valor != null){
            return sim.valor.toString(); 
        }else{
            return '...';
        }
    }
    getTipo(sim):string{

        return sim.tipo.stype.toLowerCase();
    }
    getRol(sim:Simbolos):string{
        let rol : string = '';
        switch(sim.simbolo){
            case 1:
                rol = "objeto"
                break
            case 2:
                rol = "identificador";
                break;
            case 3:
                rol = "metodo";
                break;
             case 4:
                rol = "vector";
                break
             case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro"
                break;
        }
        return rol;
    }

    getAmbito():string{
        return 'global'
    }
    parametros(sim){
        if(sim.lista_params != undefined){
            return sim.lista_params.length
        }else{
            return "...";
        }
    }

}