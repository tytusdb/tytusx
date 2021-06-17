import Objeto from "../xml/objeto";
import Tipo from "./Tipo";


export default class Simbolos {
    
    public simbolo: number; 

    // Para la variables
    public tipo : Tipo;
    public identificador : string ;
    public valor: any;
    public objeto:Objeto;
  
    // funcion/metodo

    public lista_params : Array<Simbolos>;
    public metodo: boolean;

    constructor(simbolo : number, tipo : Tipo, identificador : string, valor : any,objeto?, lista_params?, metodo?) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor; 
        this.lista_params = lista_params;
        this.metodo = metodo;
        this.objeto=objeto;
    }

    setValor(valor): void{
        this.valor = valor;
    }

}