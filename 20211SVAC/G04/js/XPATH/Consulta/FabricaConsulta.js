class FabricaConsulta {
    static fabricar(diagonal, id, eje) {
        if (diagonal === "doble") {
            switch (id) {
                case "punto": return new ConsultaPunto(TipoConsulta.PUNTO, "");
                case "puntos": return new ConsultaPuntos(TipoConsulta.PUNTOS, "");
                default: {
                    if (id.startsWith('@')) {
                        switch (id) {
                            case "@all": return new ConsultaDescAttribute(TipoConsulta.DESC_ATTR, id.replace('@', ''));
                            default: return new ConsultaDescAttribute(TipoConsulta.DESC_ATTR, id.replace('@', ''));
                        }
                    }
                    else {
                        if (eje === "") {
                            switch (id) {
                                case "*": return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id);
                                case "text()": return new ConsultaDescText(TipoConsulta.DESC_TEXT, "");
                                case "node()": return new ConsultaDescNode(TipoConsulta.DESC_NODE, "");
                                default: return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id);
                            }
                        }
                        else {
                            switch (eje) {
                                case "self": return new ConsultaSelf(TipoConsulta.SELF, id);
                                case "parent": return new ConsultaParent(TipoConsulta.PARENT, id);
                                case "attribute": return new ConsultaDescAttribute(TipoConsulta.DESC_ATTR, id);
                                case "child": return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id);
                                case "descendant-or-self": return new ConsultaDescOrSelf(TipoConsulta.DESC_OR_SELF, id);
                                case "descendant": return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id);
                                case "following": return new ConsultaFollowing(TipoConsulta.FOLLOWING, id);
                                case "preceding": return new ConsultaPreceding(TipoConsulta.PRECEDING, id);
                                case "preceding-sibling": return new ConsultaPrecSibling(TipoConsulta.PREC_SIBLING, id);
                            }
                        }
                    }
                }
            }
        }
        else {
            switch (id) {
                case "punto": return new ConsultaPunto(TipoConsulta.PUNTO, "");
                case "puntos": return new ConsultaPuntos(TipoConsulta.PUNTOS, "");
                default: {
                    if (id.startsWith('@')) {
                        switch (id) {
                            case "@all": return new ConsultaAttribute(TipoConsulta.ATTRIBUTE, id.replace('@', ''));
                            default: return new ConsultaAttribute(TipoConsulta.ATTRIBUTE, id.replace('@', ''));
                        }
                    }
                    else {
                        if (eje === "") {
                            switch (id) {
                                case "*": return new ConsultaSimple(TipoConsulta.SIMPLE, id);
                                case "text()": return new ConsultaText(TipoConsulta.TEXT, "");
                                case "node()": return new ConsultaNode(TipoConsulta.NODE, "");
                                default: return new ConsultaSimple(TipoConsulta.SIMPLE, id);
                            }
                        }
                        else {
                            switch (eje) {
                                case "self": return new ConsultaSelf(TipoConsulta.SELF, id);
                                case "parent": return new ConsultaParent(TipoConsulta.PARENT, id);
                                case "attribute": return new ConsultaAttribute(TipoConsulta.DESC_ATTR, id);
                                case "child": return new ConsultaSimple(TipoConsulta.SIMPLE, id);
                                case "descendant-or-self": return new ConsultaDescOrSelf(TipoConsulta.DESC_OR_SELF, id);
                                case "descendant": return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id);
                                case "following": return new ConsultaFollowing(TipoConsulta.FOLLOWING, id);
                                case "following-sibling": return new ConsultaFollowSibling(TipoConsulta.FOLL_SIBLING, id);
                                case "preceding": return new ConsultaPreceding(TipoConsulta.PRECEDING, id);
                                case "preceding-sibling": return new ConsultaPrecSibling(TipoConsulta.PREC_SIBLING, id);
                            }
                        }
                    }
                }
            }
        }
    }
}
