import { Element } from "../../../model/xml/Element";
import { Atributo } from "../../../model/xml/Atributo";
import { Tipos } from "../../../model/xpath/Enum";

function pushIterators(input: Array<any>): Array<any> {
    let iterators: Array<string> = [];
    // console.log(input, 36363638)
    for (let i = 0; i < input.length; i++) {
        const path = input[i];
        if (path.items && path.items.length > 0) {
            return input;
        }
        if (path.notFound) {
            return [{ notFound: 'No se encontraron elementos.' }];
        }
        if (path.valor || path.valor === 0) {
            iterators.unshift(path.valor);
        }
        if (path.cadena === Tipos.TEXTOS) {
            let root: Array<string> = path.texto;
            root.forEach(txt => {
                iterators.push(concatText(txt).substring(1));
            });
        }
        else if (path.cadena === Tipos.ELEMENTOS) {
            let root: Array<Element> = path.elementos;
            root.forEach(element => {
                iterators.push(concatChilds(element, "").substring(1));
            });
        }
        else if (path.cadena === Tipos.ATRIBUTOS) {
            if (path.atributos) {
                let root: Array<Atributo> = path.atributos; // <-- muestra sólo el atributo
                root.forEach(attr => {
                    iterators.push(concatAttributes(attr).substring(1));
                });
            }
            else {
                let root: Array<Element> = path.elementos; // <-- muestra toda la etiqueta
                root.forEach(element => {
                    iterators.push(extractAttributes(element, "").substring(1));
                });
            }
        }
        else if (path.cadena === Tipos.COMBINADO) {
            let root: Array<any> = path.nodos;
            root.forEach((elemento: any) => {
                if (elemento.elementos) {
                    iterators.push(concatChilds(elemento.elementos, "").substring(1));
                }
                else if (elemento.textos) {
                    iterators.push(concatText(elemento.textos).substring(1));
                }
            });
        }
    }
    if (iterators.length > 0)
        return [iterators];
    return [{ notFound: 'No se encontraron elementos.' }];
}

function concatChilds(_element: Element, cadena: string): string {
    cadena = ("\n<" + _element.id_open);
    if (_element.attributes) {
        _element.attributes.forEach(attribute => {
            cadena += (" " + attribute.id + "=\"" + attribute.value + "\"");
        });
    }
    if (_element.childs) {
        cadena += ">";
        _element.childs.forEach(child => {
            cadena += concatChilds(child, cadena);
        });
        cadena += ("\n</" + _element.id_close + ">\n");
    }
    else {
        if (_element.id_close === null)
            cadena += "/>";
        else {
            cadena += ">";
            cadena += (_element.value + "</" + _element.id_close + ">");
        }
    }
    return cadena;
}

function concatAttributes(_attribute: Atributo): string {
    return `\n${_attribute.id}="${_attribute.value}"`;
}

function extractAttributes(_element: Element, cadena: string): string {
    if (_element.attributes) {
        _element.attributes.forEach(attribute => {
            cadena += `\n${attribute.id}="${attribute.value}"`;
        });
    }
    return cadena;
}

function concatText(_text: string): string {
    return `\n${_text}`;
}

export = pushIterators;