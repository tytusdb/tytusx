class FabricaConsulta {

    public static fabricar(diagonal: string, id: string, eje: string): Consulta {

        if (diagonal === "doble"){
            switch(id) {
                case "punto":   return new ConsultaPunto();
                case "puntos":  return new ConsultaPuntos();
                default: {
                    if (id.startsWith('@')) {
                        switch(id) {
                            case "@all":    return new ConsultaDescAllAttr(id.replace('@', ''));
                            default:        return new ConsultaDescAttr(id.replace('@', ''));
                        }
                    } else {
                        if (eje === "") {
                            switch (id) {
                                case "*":     return new ConsultaSimple(id);
                                case "text()":  return new ConsultaDescText();
                                case "node()":  return new ConsultaDescNode();
                                default:        return new ConsultaDescendente2(id);
                            }
                        } else {
                            switch(eje) {
                                case "self":    return new ConsultaSelf(id);
                                case "parent":  return new ConsultaParent(id);
                            }
                        }
                    }
                }
            }
        } else {
            switch(id) {
                case "punto":   return new ConsultaPunto();
                case "puntos":  return new ConsultaPuntos();
                default: {
                    if (id.startsWith('@')) {
                        switch(id) {
                            case "@all":    return new ConsultaAllAttribs(id.replace('@', ''));
                            default:        return new ConsultaAtributo(id.replace('@', ''));
                        }
                    } else {
                        if (eje === "") {
                            switch(id) {
                                case "*":     return new ConsultaSimple(id);
                                case "text()":  return new ConsultaText();
                                case "noe()":   return new ConsultaNode();
                                default :       return new ConsultaSimple(id);
                            }
                        } else {
                            switch(eje) {
                                case "self":        return new ConsultaSelf(id);
                                case "parent":      return new ConsultaParent(id);
                                case "attribute":   return new ConsultaAttribute(id);
                                case "child":       return new ConsultaSimple(id);
                            }
                        }
                    }
                }
            }
        }
    }
}