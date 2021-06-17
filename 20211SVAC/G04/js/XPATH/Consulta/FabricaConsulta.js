class FabricaConsulta {
    static fabricar(diagonal, id, eje) {
        if (diagonal === "doble") {
            switch (id) {
                case "punto": return new ConsultaPunto();
                case "puntos": return new ConsultaPuntos();
                default: {
                    if (id.startsWith('@')) {
                        switch (id) {
                            case "@all": return new ConsultaDescAttribute(id.replace('@', ''));
                            default: return new ConsultaDescAttribute(id.replace('@', ''));
                        }
                    }
                    else {
                        if (eje === "") {
                            switch (id) {
                                case "*": return new ConsultaDescendente2(id);
                                case "text()": return new ConsultaDescText();
                                case "node()": return new ConsultaDescNode();
                                default: return new ConsultaDescendente2(id);
                            }
                        }
                        else {
                            switch (eje) {
                                case "self": return new ConsultaSelf(id);
                                case "parent": return new ConsultaParent(id);
                                case "attribute": return new ConsultaDescAttribute(id);
                                case "child": return new ConsultaDescendente2(id);
                                case "descendant-or-self": return new ConsultaDescOrSelf(id);
                                case "descendant": return new ConsultaDescendente2(id);
                                case "following": return new ConsultaFollowing(id);
                            }
                        }
                    }
                }
            }
        }
        else {
            switch (id) {
                case "punto": return new ConsultaPunto();
                case "puntos": return new ConsultaPuntos();
                default: {
                    if (id.startsWith('@')) {
                        switch (id) {
                            case "@all": return new ConsultaAttribute(id.replace('@', ''));
                            default: return new ConsultaAttribute(id.replace('@', ''));
                        }
                    }
                    else {
                        if (eje === "") {
                            switch (id) {
                                case "*": return new ConsultaSimple(id);
                                case "text()": return new ConsultaText();
                                case "node()": return new ConsultaNode();
                                default: return new ConsultaSimple(id);
                            }
                        }
                        else {
                            switch (eje) {
                                case "self": return new ConsultaSelf(id);
                                case "parent": return new ConsultaParent(id);
                                case "attribute": return new ConsultaAttribute(id);
                                case "child": return new ConsultaSimple(id);
                                case "descendant-or-self": return new ConsultaDescOrSelf(id);
                                case "descendant": return new ConsultaDescendente2(id);
                                case "following": return new ConsultaFollowing(id);
                                case "following-sibling": return new ConsultaFollowSibling(id);
                            }
                        }
                    }
                }
            }
        }
    }
}
