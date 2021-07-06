
import ambito from "./ambito";
import contenido from "./contenido";
import Simbolos from "./Simbolos";


export class TablaSimbolos{

    public ant : TablaSimbolos;
    public sig : Array<ambito>=[];
    public tabla : Array<contenido>=[];
    public ambito:string;

    public tabla2 : Map<string,Simbolos>;


    constructor ( ant: TablaSimbolos,ambito?){
        this.ant=ant;
        this.ambito=ambito;
        this.tabla2= new Map<string,Simbolos>();
    }

    agregar(id: string, simbolo : Simbolos){
        let cont= new contenido(id,simbolo);
        this.tabla.push(cont);
        //this.tabla.set(id.toLowerCase(), simbolo); 
    }

    agregar2(id: string, simbolo : Simbolos){
        console.log(id);
        this.tabla2.set(id, simbolo); 
    }
    agregarSiguiente(id:string,sig:TablaSimbolos){
        let amb=new ambito(id,sig);
        this.sig.push(amb);
    }

    existe(id: string): boolean{
       let ts : TablaSimbolos = this;

        while(ts != null){
            let existe = ts.tabla2.get(id);

            if(existe != null){
                return true;
            }
            ts = ts.ant;
        }
        return false;
    }

    getSimbolo2(id: string){
        let ts : TablaSimbolos = this; 
        
        while(ts != null){
            let existe = ts.tabla2.get(id);
            console.log(this.tabla2);
            if(existe != null){
                console.log("si existe es cosa");
                return existe;
            }
            ts = ts.ant;
        }
        
        return null;
    }

    existeEnActual(id: string): boolean{
        let ts : TablaSimbolos = this;

        let existe = ts.tabla2.get(id);

        if(existe != null){
            return true;
        }
        return false;
    }

    getSimbolo(id: string,tipoval?){
        let ts : TablaSimbolos = this; 
        console.log("-----------------");
        for( let informacion of ts.tabla){
            console.log(informacion.identificador+"=="+id  +" && "+ tipoval+"=="+informacion.sim.simbolo)
            if(informacion.identificador==id && tipoval==informacion.sim.simbolo){
                return informacion.sim;
            }
        }
        return null;
    }
}