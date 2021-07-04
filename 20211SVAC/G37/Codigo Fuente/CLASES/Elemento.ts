import { Ambito } from "./Ambito";
import { Atributo } from "./Atributo";
import { Simbolo } from "./Simbolo";
import { Tipo } from "./Tipo";

export class Elemento{

    identificador:string;
    texto:string;
    linea:number;
    columna:number;
    lista_atributos:Array<Atributo>;
    lista_elementos:Array<Elemento>; // Elementos hijo ( diferentes ambitos)
    ambito?:Ambito;   // No se inicializa en el constructor sino en el metodo construirTablaSimbolos

    constructor(identificador:string, texto:string, linea:number, columna:number,lista_atributos:Array<Atributo>, lista_elementos:Array<Elemento>){
        this.identificador = identificador;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.lista_atributos = lista_atributos;
        this.lista_elementos = lista_elementos;
        //this.ambito = new Ambito(null);
        //console.log("Hijos insertados: ",lista_elementos);
    }

    getTablaSimbolos(ambitoAnterior:any):Ambito{ // Construira la tabla de simbolos de 'lista_atributos' y 'lista_elementos' -> Esta es una funcion RECURSIVA
        this.ambito = new Ambito(ambitoAnterior);
        // SI la this.lista_atributos esta vacia, el foreach no se ejecuta, ni da error
        this.lista_atributos.forEach(atributo =>{ 
            console.log('atributo ->'+atributo);
            const newSimbolo:Simbolo = new Simbolo(atributo.identificador, Tipo.ATRIBUTO, atributo.linea, atributo.columna, atributo.valor); // SIMBOLO TIPO ATRIBUTO
            this.ambito?.agregar(atributo.identificador, newSimbolo); 
        });
        // SI la this.lista_elementos esta vacia, el foreach no se ejecuta, ni da error
        this.lista_elementos.forEach(elemento=>{ 
            console.log('elemento ->'+elemento);
            elemento.getTablaSimbolos(this.ambito); // contruye la tabla de simbolos del elemento
            let newSimbolo:Simbolo = new Simbolo(elemento.identificador, Tipo.ELEMENTO, elemento.linea, elemento.columna, elemento); // Almaceno el elemento en el Ambito actual
            this.ambito?.agregar(elemento.identificador, newSimbolo);
        });
        return this.ambito; // Podria retornar un ambito que no contiene ni Etiquetas ni Atributos..
    }

    
}