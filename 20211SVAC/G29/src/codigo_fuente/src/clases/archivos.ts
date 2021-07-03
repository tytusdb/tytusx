import { entorno } from "./ast/entorno"

export default class archivo{
    public n: number
    public nombre: string
    public contenido: string
    public ent: entorno
    constructor(n,nombre,contenido){
        this.n = n
        this.nombre = nombre
        this.contenido = contenido
    }
}