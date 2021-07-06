export class etiqueta3d {

    etiqueta3dinicio: number;
    etiqueta3dfin: number;

    constructor(inicio: number, fin: number) {
        this.etiqueta3dinicio = inicio;
        this.etiqueta3dfin = fin;
    }

    getEtiquetafin(): number {
        return this.etiqueta3dfin;
    }

    getEtiquetainicio(): number {
        return this.etiqueta3dinicio;
    }

}