class ConsultaEje implements Consulta {

    private id: string;
    private eje: string;

    constructor (eje: string, id: string) {
        this.eje = eje;
        this.id = id;
    }

    public run(entornos: Array<Entorno>): Array<Entorno> {
        let newEntornos: Array<Entorno> = new Array();

        switch (this.eje) {
            case "self":
                let cSelf: ConsultaSelf = new ConsultaSelf();
                newEntornos = cSelf.run(entornos, this.id);
                break;
            case "parent":
                let cParent: ConsultaParent = new ConsultaParent();
                newEntornos = cParent.run(entornos, this.id);
                break;
            case "attribute":
                let cAttr: ConsultaAttribute = new ConsultaAttribute();
                newEntornos = cAttr.run(entornos, this.id);
                break;

        }

        return newEntornos;
    }
}