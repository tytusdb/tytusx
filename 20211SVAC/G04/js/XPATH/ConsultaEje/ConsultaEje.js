class ConsultaEje {
    constructor(eje, id) {
        this.eje = eje;
        this.id = id;
    }
    run(entornos) {
        let newEntornos = new Array();
        switch (this.eje) {
            case "self":
                let cSelf = new ConsultaSelf();
                newEntornos = cSelf.run(entornos, this.id);
                break;
            case "parent":
                let cParent = new ConsultaParent();
                newEntornos = cParent.run(entornos, this.id);
                break;
            case "attribute":
                let cAttr = new ConsultaAttribute();
                newEntornos = cAttr.run(entornos, this.id);
                break;
        }
        return newEntornos;
    }
}
