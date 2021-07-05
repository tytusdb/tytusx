import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import errores from "../Global/ListaError";
import { Expresion} from "../Interfaz/expresion";
import { Consulta } from "../XPath/Consulta";

export class Primitiva implements Expresion {
    linea: number;
    columna: number;
    valor: any;
    tipo: TipoPrim;
    isXQuery: boolean | undefined
    constructor(valor: any, tipo: TipoPrim, linea: number, columna: number, isXQuery?: boolean){
        this.linea  = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.isXQuery = isXQuery;
    }

    getTipo(ent: Entorno){
        return this.tipo;
    }

    get3Dir(ent: Entorno){
        if(this.tipo === TipoPrim.IDENTIFIER){
            return this.getValorInicial(ent);
        }
        let x = this.getValor(ent);

        return x;

    }

    getValorInicial(ent: Entorno){
        return this.valor;
    }

    getValor(ent: Entorno): any{
        if (this.tipo === TipoPrim.IDENTIFIER){
            /* SE BUSCAN LAS ETIQUETAS CON ESTE NOMBRE */
            if (ent.existeSimbolo(this.valor)){
                return ent.obtenerSimbolo(this.valor);
            }else{
                //errores.agregarError('semantico', 'No existe el simbolo ' + this.valor, this.linea, this.columna);
                //this.tipo = TipoPrim.ERROR;
                return null;
            }
        }else if (this.tipo === TipoPrim.ATRIBUTO){
            if(!this.isXQuery){
                /* SE BUSCAN LOS ATRIBUTOS CON ESTE NOMBRE */
                this.tipo = TipoPrim.FUNCION
                //0. Se devolver un entorno temporal, que contendra todos los que coinciden con la busqueda.
                let entTemporal: Entorno = new Entorno("Temporal", null ,null );
                //1. Obtener el padre.
                let padre = ent.padre;
                //2. Sobre el padre buscar todos los que sean ent.nombre
                padre.tsimbolos.forEach((e: any) => {
                    let elem = e.valor;
                    if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === ent.nombre){
                        //Ahora en este entorno ver si tiene un atributo como el que se busca.
                        elem.valor.tsimbolos.forEach((c2: any) => {
                            let aux = c2.valor;
                            if(aux.getTipo() === Tipo.ATRIBUTO && (this.valor === "*" || this.valor === aux.getNombre())){
                                //Si se encuentra el atributo o es *, ingresar al entorno temporal
                                entTemporal.agregarSimbolo(elem.getNombre(), elem);
                            }
                    });
                    }
                })
                return entTemporal;
            }else{
                //Obtener solo si el atributo existe en este entorno (no buscar en el padre)
                let entTemporal: Entorno = new Entorno("Temporal", null ,null );
                for(let i = 0; i < ent.tsimbolos.length; i++){
                    let elem = ent.tsimbolos[i].valor;
                    if(elem.getTipo() === Tipo.ATRIBUTO && elem.getNombre() === this.valor){
                        entTemporal.agregarSimbolo(elem.getNombre(), elem);
                        return entTemporal;
                    }
                }
                return null;
            }
        }else if( this.tipo === TipoPrim.FUNCION || this.valor == "last()"){
            //Si es funcion, ver de cual funcion se trata
            if(this.valor instanceof Array){
                this.tipo = TipoPrim.CONSULTA;
                return this.getValor(ent);
            }
            switch(this.valor.toLowerCase()){
                case "last()":
                    //Para last, calcular sobre el entorno padre, cual es el numero del ultimo
                    //que tiene nombre como ent.nombre
                    //1. Obtener padre.
                    let padre = ent.padre;
                    //2. Sobre el padre, contar cual es el ultimo que tiene ent.nobmre
                    let indice = 0; //Se empieza en 0, por si no se encuentra devuelva 0. (y asi retornaria nada en la consulta)
                    padre.tsimbolos.forEach((e: any) => {
                        let elem = e.valor;

                        if(elem.getTipo() === Tipo.ETIQUETA && elem.getNombre() === ent.nombre){
                            //Se encontro, sumar al indice
                            indice++;
                        }
                    })
                    //3. al terminar devolver indice
                    //4. Cambiar su tipo a tipo INTEGER
                    this.tipo = TipoPrim.INTEGER
                    if(indice > 0){
                        return indice;
                    }else{
                        return 0;
                    }
                default:
                    //Para position(), devolver lo mismo.
                    return this.valor;
            }

        }else if(this.tipo == TipoPrim.CONSULTA){
            this.tipo = TipoPrim.FUNCION
            //Consulta devuelve TRUE si la ruta existe
            //Es una lista de nodos. entonces crear una consulta 
            let tempConsulta: Consulta = new Consulta(this.valor, this.linea, this.columna)
            //Obtener padre, porque se deben buscar en todos los que tengan ent.nombre
            let entTemporal: Entorno = new Entorno("Temporal", null, null)

            let padre = ent.padre;
            padre.tsimbolos.forEach((e: any) => {
                let elem = e.valor;
                if(elem.getNombre() === ent.nombre){
                    //Sobre este entorno ejecutar la consulta para ver si existe la ruta.
                    let result = tempConsulta.ejecutar(elem.valor);
                    if(result.length > 0 ){
                        //La consulta si existe
                        entTemporal.agregarSimbolo(elem.getNombre(), elem)
                    }else{
                    }
                }
            });
            return entTemporal;
        }
        else
            return this.valor;
    }
}

export enum TipoPrim{
    INTEGER,
    DOUBLE,
    CADENA,
    IDENTIFIER,
    ATRIBUTO,
    DOT,
    FUNCION,
    BOOLEAN,
    CONSULTA,
    ERROR,
    FUNCIONXQUERY,
    XQUERYIDENTIFIER
}