export class Heap {
    tamanio = 0; 
    hp = 0; 
    lista = null; 

    constructor(tamanio, hp){
        this.tamanio = tamanio; 
        this.hp = hp;
        this.lista = []; 
    }
}