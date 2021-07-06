interface retornoBNF {
    no: number,
    produccion: string
    accion: string
}

export class GramaticaBNF {

    public reporte: any;
    public reporte2: any;

    constructor(repo: any, repo2: any) {
        this.reporte = repo;
        this.reporte2 = repo2;
    }

    getBNFReport(): retornoBNF[] {
        let ret: retornoBNF[] = [];

        for (let i = 0; i < this.reporte.length; i++) {
            ret.push(this.generarBodyReporte(this.reporte[i], this.reporte2[i], i));
        }

        return ret
    }

    generarBodyReporte(object: any, object2: any, iterator: number): retornoBNF {
        var fila: retornoBNF = {
            no: iterator,
            produccion: object,
            accion: object2
        }
        return fila;
    }

}

