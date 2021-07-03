
export class xpathBusqueda {

    constructor() {
    }

    getNodesByFilters(filter: any, param: any, objects: any) {
        var salida: any;
        // solo el nombre del root ej: mundo
        if (filter === '1') {
            salida = this.findByRootName(param, objects);
        }
        // rutas 
        if (filter === '2') {
            salida = this.startTypeSearch(param, objects);
        }
        //multiples rutas ej. /mundo/continente/pais1/nombre|/mundo/continente/pais/nombre
        if (filter === '3') {
            salida = [];
            if (param.includes('|')) {
                var parameters = param.split('|');
                //console.log('val nodo m ', parameters);
                for (let i = 0; i < parameters.length; i++) {
                    salida.push(this.startTypeSearch(parameters[i], objects));
                }
            }
        }

        return salida;
    }

    startTypeSearch(param: any, objects: any) {
        // console.log('param ', param);
        param = param.replace('//', '/-');
        // console.log('param replace ', param);
        //ruta relativa, inicia con /        
        if (param.startsWith('/')) {
            /*console.log('val nodo\n\t', */return this.initSearchMethod(param.substring(1), objects)//);
        } else {
            /*console.log('val nodo\n\t',*/ return this.initSearchMethod(param, objects)//);
        }
    }


    // 1. Obtener cuando solo se escribe el nombre
    findByRootName(param: any, objects: any): string {
        var valorNodo = '';
        objects.forEach((obj: any) => {
            if (obj.identificador === param) {
                valorNodo += '\n - ';
                if (obj.listaObjetos.length !== 0) {
                    valorNodo += this.findValuesNodes(obj);
                } else {
                    valorNodo += obj.text;
                }
            }
        });
        return valorNodo;
    }

    // 2. Obtener cuando la ruta empiza por el root '/'
    initSearchMethod(param: any, objects: any) {
        var qryValue = '';
        var parameters = param.split('/');
        for (let i = 0; i < objects.length; i++) {
            qryValue = this.findByRootNode(parameters, objects[i]);
        }
        return qryValue;
    }

    findByRootNode(param: any, nodeObject: any, index = 0, parent = null): string {
        // console.log('\nNODE: ', nodeObject.identificador);
        // console.log('PARAM: ', index);
        // console.log('TMP ROOT: ', param[index]);
        var valueQry = '';
        const tmp = index + 1;
        var root = param[index];
        var hasDoubleSlash = false;
        if (root.startsWith('-')) {
            hasDoubleSlash = true;
        }
        if (nodeObject.identificador === root && tmp === param.length) {
            //console.log('FINAL NODE ', nodeObject.identificador);
            valueQry += this.findValuesNodes(nodeObject);
        } else if (nodeObject.identificador === root && param.length > tmp) {
            var arr = nodeObject.listaObjetos;
            var secondR = param[tmp];
            // console.log('SECOND ROOT', secondR);
            var hasPassedDot = false;
            var hasAtribute = false;
            for (let i = 0; i < arr.length; i++) {
                var tmpParam = param;
                if (arr[i].identificador === secondR) {
                    valueQry += `${this.findByRootNode(tmpParam, arr[i], tmp, nodeObject)}\n`;
                } else if (secondR.startsWith('-')) {
                    valueQry += `${this.findByRootNode(tmpParam, arr[i], tmp, nodeObject)}\n`;
                } else if (secondR === '.' && !hasPassedDot) {
                    hasPassedDot = true;
                    valueQry += this.findValuesNodes(nodeObject);
                } else if (secondR === '..' && !hasPassedDot) {
                    hasPassedDot = true;
                    valueQry += this.findValuesNodes(parent);
                } else if (secondR.startsWith('@*') && !hasAtribute) {
                    hasAtribute = true;
                    valueQry += this.findAllAtribute(nodeObject);
                } else if (secondR.startsWith('@') && !hasAtribute) {
                    hasAtribute = true;
                    valueQry += this.findAtribute(nodeObject, secondR);
                }

            }
            if (arr.length === 0 && secondR === '.') {
                valueQry += this.findValuesNodes(nodeObject);
            } else if (arr.length === 0 && secondR === '..') {
                valueQry += this.findValuesNodes(parent);
            } else if (arr.length === 0 && secondR.startsWith('@*')) {
                valueQry += this.findAllAtribute(nodeObject);
            } else if (arr.length === 0 && secondR.startsWith('@')) {
                valueQry += this.findAtribute(nodeObject, secondR);
            }

        } else if (hasDoubleSlash) {
            //  console.log('TIENE SLASH');
            const tmpName = param[index].substring(1);
            if (tmpName === nodeObject.identificador && tmp === param.length) {
                valueQry += this.findValuesNodes(nodeObject);
            } else if (tmpName === nodeObject.identificador) {
                var arr = nodeObject.listaObjetos;
                var secondR = param[tmp];
                // console.log('SECOND ROOT+', secondR);
                var hasPassedDot = false;
                var hasAtribute = false;
                for (let i = 0; i < arr.length; i++) {
                    var tmpParam = param;
                    if (arr[i].identificador === secondR) {
                        valueQry += `${this.findByRootNode(tmpParam, arr[i], tmp, nodeObject)}\n`;
                    } else if (secondR.startsWith('-')) {
                        valueQry += `${this.findByRootNode(tmpParam, arr[i], tmp, nodeObject)}\n`;
                    } else if (secondR === '.' && !hasPassedDot) {
                        hasPassedDot = true;
                        valueQry += this.findValuesNodes(nodeObject);
                    } else if (secondR === '..' && !hasPassedDot) {
                        hasPassedDot = true;
                        valueQry += this.findValuesNodes(parent);
                    } else if (secondR.startsWith('@*') && !hasAtribute) {
                        hasAtribute = true;
                        valueQry += this.findAllAtribute(nodeObject);
                    } else if (secondR.startsWith('@') && !hasAtribute) {
                        hasAtribute = true;
                        valueQry += this.findAtribute(nodeObject, secondR);
                    }

                }
                if (arr.length === 0 && secondR === '.') {
                    valueQry += this.findValuesNodes(nodeObject);
                } else if (arr.length === 0 && secondR === '..') {
                    valueQry += this.findValuesNodes(parent);
                } else if (arr.length === 0 && secondR.startsWith('@*')) {
                    valueQry += this.findAllAtribute(nodeObject);
                } else if (arr.length === 0 && secondR.startsWith('@')) {
                    valueQry += this.findAtribute(nodeObject, secondR);
                }

            } else {
                if (param[index].startsWith('-@*')) {
                    valueQry += this.findAllAtribute(nodeObject);
                } else if (param[index].startsWith('-@')) {
                    valueQry += this.findAtribute(nodeObject, param[index].substring(1));
                } else if (param[index].startsWith('-*')) {
                    valueQry += `NODOS: \n\t ${this.findValuesNodes(nodeObject)}`;
                    // valueQry += `ATRIBUTOS: \n\t ${this.findAllAtribute(nodeObject)}`;
                }
                var arr1 = nodeObject.listaObjetos;
                for (let i = 0; i < arr1.length; i++) {
                    var tmpParam = param;
                    valueQry += `${this.findByRootNode(tmpParam, arr1[i], index)}`;
                }
            }
        }
        else {
            console.log('ELSEEEEEEEEEEE', nodeObject.identificador, '-', param);
        }
        return valueQry;
    }


    // Obtener el valor de los nodos
    findValuesNodes(nodeList: any): string {
        var texto = ' ';
        if (nodeList.listaObjetos.length !== 0) {
            nodeList.listaObjetos.forEach((obj: any) => {
                texto += this.findValuesNodes(obj);
            });
        } else {
            texto += `<${nodeList.identificador}>${nodeList.texto}</${nodeList.cierre}>\n`;
        }
        // console.log('TEXTO ', texto);
        return texto;
    }

    findAtribute(nodeList: any, param: any): string {
        var texto = ' ';
        if (nodeList.listaAtributos.length !== 0) {
            nodeList.listaAtributos.forEach((obj: any) => {
                if (obj.identificador === param.substring(1)) {
                    texto += `- ${obj.valor}\n`;
                }
            });
        }
        return texto;
    }

    findAllAtribute(nodeList: any): string {
        var texto = ' ';
        if (nodeList.listaAtributos.length !== 0) {
            nodeList.listaAtributos.forEach((obj: any) => {
                texto += `- ${obj.valor}\n`;
            });
        }
        return texto;
    }

}