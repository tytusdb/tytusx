import { Atributo } from './../Expresiones/Atributo';
import { Objeto } from './../Expresiones/Objeto';

export class CST {

    cuerpoDot: string = '';
    public objetos: any;

    constructor(objetos: any) {
        this.objetos = objetos;
    }

    generarArbolCST(objetos: any): string {
        var num;
        this.cuerpoDot = 'digraph D { \n ';
        objetos.forEach((object: any) => {
            num = `${object.linea.toString()}_${object.columna.toString()}`;
            this.cuerpoDot += this.generarNodoObjeto(object, num, null);
            num = num + 1000;
        });
        this.cuerpoDot += '} \n ';
        return this.cuerpoDot;
    }

    generarNodoObjeto(objeto: any, pos: any, padre: any): string {
        let id:string =  objeto.identificador;
        id = id.replace(/\'/gi, "")
        id = id.replace(/\"/gi, "")
        var nodo = `nodo${pos} [label = 
        \"ETIQUETA
${id}\" ]\n`;
        if (padre !== null) {
            nodo += `nodo${padre} -> nodo${pos}\n`;
        }
        if (objeto.texto !== '') {
            let texto =  objeto.texto;
            texto = texto.replace(/\'/gi, "")
            texto = texto.replace(/\"/gi, "")
            nodo += `nodo${pos}_t [label =\"${texto}\" ]\n`;
            nodo += `nodo${pos} -> nodo${pos}_t [label=\"txt\"]\n`;
        }

        objeto.listaAtributos.forEach((atribute: any) => {
            var num = `${atribute.linea.toString()}_${atribute.columna.toString()}`;
            nodo += this.generarNodoAtributo(atribute, num, pos);
        });
        objeto.listaObjetos.forEach((obj: any) => {
            var num = `${obj.linea.toString()}_${obj.columna.toString()}`;
            nodo += this.generarNodoObjeto(obj, num, pos);
        });

        return nodo;
    }

    generarNodoAtributo(objeto: any, pos: any, padre: any): string {
        let id =  objeto.identificador;
        id = id.replace(/\'/gi, "")
        id = id.replace(/\"/gi, "")
        let valor =  objeto.valor;
        valor = valor.replace(/\'/gi, "")
        valor = valor.replace(/\"/gi, "")
        var nodo = `nodo${pos} [label =
        \"ATRIBUTO
${id}\"]\n`
        nodo += `nodo${padre} -> nodo${pos}\n`;
        nodo += `nodo${pos}_a [label=${valor}]\n`;
        nodo += `nodo${pos} -> nodo${pos}_a [label=\"valor\"]\n`;
        return nodo;
    }
}
