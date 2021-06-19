export class Nodo{
    id: number;
    valor: string;
    padre: Nodo | null;
    hijos: Array<Nodo>;

    constructor(id: number, valor: string, padre: Nodo | null, hijos: Array<Nodo>){
        this.id = id;
        this.valor = valor;
        this.padre = padre;
        this.hijos = hijos;
        this.hijos.forEach((hijo: Nodo) => {
            hijo.setPadre(this);
        });
    }

    agregarHijo(hijo:Nodo){
        this.hijos.push(hijo);
    }

    setPadre(padre:Nodo){
        this.padre = padre;
    }
}