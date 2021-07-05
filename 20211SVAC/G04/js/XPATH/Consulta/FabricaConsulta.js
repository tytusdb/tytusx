class FabricaConsulta {
    static fabricar(diagonal, id, eje, filtros) {
        if (diagonal === "doble") {
            switch (id) {
                case "punto": return new ConsultaPunto(TipoConsulta.PUNTO, "", filtros);
                case "puntos": return new ConsultaPuntos(TipoConsulta.PUNTOS, "", filtros);
                default: {
                    if (id.startsWith('@')) {
                        switch (id) {
                            case "@all": return new ConsultaDescAttribute(TipoConsulta.DESC_ATTR, id.replace('@', ''), filtros);
                            default: return new ConsultaDescAttribute(TipoConsulta.DESC_ATTR, id.replace('@', ''), filtros);
                        }
                    }
                    else {
                        if (eje === "") {
                            switch (id) {
                                case "*": return new ConsultaSimple(TipoConsulta.DESCENDENTE, id, filtros, true);
                                case "text()": return new ConsultaDescText(TipoConsulta.DESC_TEXT, "", filtros);
                                case "node()": return new ConsultaDescNode(TipoConsulta.DESC_NODE, "", filtros);
                                default: return new ConsultaSimple(TipoConsulta.DESCENDENTE, id, filtros, true);
                            }
                        }
                        else {
                            switch (eje) {
                                case "self": return new ConsultaSelf(TipoConsulta.SELF, id, filtros);
                                case "parent": return new ConsultaParent(TipoConsulta.PARENT, id, filtros);
                                case "attribute": return new ConsultaDescAttribute(TipoConsulta.DESC_ATTR, id, filtros);
                                case "child": return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id, filtros);
                                case "descendant-or-self": return new ConsultaDescOrSelf(TipoConsulta.DESC_OR_SELF, id, filtros);
                                case "descendant": return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id, filtros);
                                case "following": return new ConsultaFollowing(TipoConsulta.FOLLOWING, id, filtros);
                                case "preceding": return new ConsultaPreceding(TipoConsulta.PRECEDING, id, filtros);
                                case "preceding-sibling": return new ConsultaPrecSibling(TipoConsulta.PREC_SIBLING, id, filtros);
                            }
                        }
                    }
                }
            }
        }
        else {
            switch (id) {
                case "punto": return new ConsultaPunto(TipoConsulta.PUNTO, "", filtros);
                case "puntos": return new ConsultaPuntos(TipoConsulta.PUNTOS, "", filtros);
                default: {
                    if (id.startsWith('@')) {
                        switch (id) {
                            case "@all": return new ConsultaAttribute(TipoConsulta.ATTRIBUTE, id.replace('@', ''), filtros);
                            default: return new ConsultaAttribute(TipoConsulta.ATTRIBUTE, id.replace('@', ''), filtros);
                        }
                    }
                    else {
                        if (eje === "") {
                            switch (id) {
                                case "*": return new ConsultaSimple(TipoConsulta.SIMPLE, id, filtros, false);
                                case "text()": return new ConsultaText(TipoConsulta.TEXT, "", filtros);
                                case "node()": return new ConsultaNode(TipoConsulta.NODE, "", filtros);
                                default: return new ConsultaSimple(TipoConsulta.SIMPLE, id, filtros, false);
                            }
                        }
                        else {
                            switch (eje) {
                                case "self": return new ConsultaSelf(TipoConsulta.SELF, id, filtros);
                                case "parent": return new ConsultaParent(TipoConsulta.PARENT, id, filtros);
                                case "attribute": return new ConsultaAttribute(TipoConsulta.DESC_ATTR, id, filtros);
                                case "child": return new ConsultaSimple(TipoConsulta.SIMPLE, id, filtros, false);
                                case "descendant-or-self": return new ConsultaDescOrSelf(TipoConsulta.DESC_OR_SELF, id, filtros);
                                case "descendant": return new ConsultaDescendente2(TipoConsulta.DESCENDENTE, id, filtros);
                                case "following": return new ConsultaFollowing(TipoConsulta.FOLLOWING, id, filtros);
                                case "following-sibling": return new ConsultaFollowSibling(TipoConsulta.FOLL_SIBLING, id, filtros);
                                case "preceding": return new ConsultaPreceding(TipoConsulta.PRECEDING, id, filtros);
                                case "preceding-sibling": return new ConsultaPrecSibling(TipoConsulta.PREC_SIBLING, id, filtros);
                            }
                        }
                    }
                }
            }
        }
    }
}
