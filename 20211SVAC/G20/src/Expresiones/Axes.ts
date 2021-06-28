import { TipoAxes, TipoExpresioXPath } from "../AST/Tipo"

export class Axes {
    public linea
    public columna
    public expresion
    public tipo
    public resultado

    constructor(linea, columna, expresion, tipo) {
        this.linea = linea
        this.columna = columna
        this.expresion = expresion
        this.tipo = tipo
        this.resultado = null
    }

    public getLinea() { return this.linea }
    public setLinea(linea) { this.linea = linea }
    public getColumna() { return this.columna }
    public setColumna(columna) { this.columna = columna }
    public getExpresion() { return this.expresion }
    public setExpresion(expresion) { this.expresion = expresion }
    public getTipo() { return this.tipo }
    public setTipo(tipo) { this.tipo = tipo }
    public getResultado() { return this.resultado }
    public setResultado(resultado) { this.resultado = resultado }

    public getValorImplicito(ent, global, busqueda) {
        if (this.expresion.getTipo() == TipoExpresioXPath.PUNTO || 
            this.expresion.getTipo() == TipoExpresioXPath.DOBLEPUNTO ||
            this.expresion.getTipo() == TipoExpresioXPath.ARROBA) {
                return [[],[]]
            }
        var entornoActual = ent

        if (this.getTipo() == TipoAxes.ANCESTOR) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior().getAnterior()
                    while(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                        anteriorAux = anteriorAux.getAnterior()
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 13)
                    return this.resultado
                } else {
                    return [[],[]]
                }
            }
        }
        else if (this.getTipo() == TipoAxes.ANCESTOR_OR_SELF) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior()
                    while(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                        anteriorAux = anteriorAux.getAnterior()
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 13)
                    return this.resultado
                } else {
                    return [[],[]]
                }
            }
        }
        else if (this.getTipo() == TipoAxes.CHILD) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                this.resultado = this.expresion.getValorImplicito(entornoActual, 13)
                return this.resultado
            }
        }
        else if (this.getTipo() == TipoAxes.DESCENDANT) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                this.resultado = this.expresion.getValorImplicito(entornoActual, 14)
                return this.resultado
            }
        }
        else if (this.getTipo() == TipoAxes.DESCENDANT_OR_SELF) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior()
                    if(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 14)
                    return this.resultado
                } else {
                    this.resultado = this.resultado.getValorImplicito(entornoActual, 14)
                    return this.resultado
                }
            }
        }
        else if (this.getTipo() == TipoAxes.FOLLOWING) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior()
                    if(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 15)
                    return this.resultado
                } else {
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 15)
                    return this.resultado
                }
            }
        }
        else if (this.getTipo() == TipoAxes.FOLLOWING_SIBLING) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior()
                    if(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 16)
                    return this.resultado
                } else {
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 16)
                    return this.resultado
                }
            }
        }
        else if (this.getTipo() == TipoAxes.PARENT) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior().getAnterior()
                    if(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 13)
                    return this.resultado
                } else {
                    return [[],[]]
                }
            }
        }
        else if (this.getTipo() == TipoAxes.PRECEDING) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior().getAnterior()
                    while(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                        anteriorAux = anteriorAux.getAnterior()
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 17)
                    return this.resultado
                } else {
                    return [[],[]]
                }
            }
        }
        else if (this.getTipo() == TipoAxes.PRECEDING_SIBLING) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior()
                    while(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                        anteriorAux = anteriorAux.getAnterior()
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 18)
                    return this.resultado
                } else {
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 18)
                    return this.resultado
                }
            }
        }
        else if (this.getTipo() == TipoAxes.SELF) {
            if (busqueda == 14) {
                this.resultado = this.expresion.getValorImplicito(global, 14)
                return this.resultado
            } else {
                var entornoAux = []

                entornoActual.forEach(entorno => {
                    var anteriorAux = entorno.getAnterior()
                    if(anteriorAux != null) {
                        if (EntornoYaExiste(entornoAux, anteriorAux.getId()) == false) {
                            entornoAux.push(anteriorAux)
                        }
                    }
                });

                if (entornoAux.length > 0) {
                    entornoActual = entornoAux
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 19)
                    return this.resultado
                } else {
                    this.resultado = this.expresion.getValorImplicito(entornoActual, 19)
                    return this.resultado
                }
            }
        }
    }
}