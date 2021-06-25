import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";


export class tablaSimbolos{
    private numeroSimbolo:number;
    private simbolitos:string;
    private nombreHijo:string;

    public getTableSimbolos(simbolo:entorno):string{
        this.simbolitos = '<table class="table">\n\
                        <thead>\n\
                        <tr>\n\
                            <th scope="col">#</th>\n\
                            <th scope="col">Nombre</th>\n\
                            <th scope="col">Tipo</th>\n\
                            <th scope="col">Ambito</th>\n\
                            <th scope="col">Fila</th>\n\
                            <th scope="col">Columna</th>\n\
                            <th scope="col">Valor</th>\n\
                        </tr>\n\
                        </thead>\n\
                        <tbody>\n\
                        <tr>\n\
                                <th scope="row"> 1 </th>\n\
                                <td>' + simbolo.tabla.xml.id + '</td>\n\
                                <td>' + tipo[simbolo.tabla.xml.getTipo(simbolo,null)] + '</td>\n\
                                <td> Global </td>\n\
                                <td>' + simbolo.tabla.xml.linea.toString() + '</td>\n\
                                <td>' + simbolo.tabla.xml.columna.toString() + '</td>\n\
                                <td></td>\n\
                            </tr>';
        this.numeroSimbolo = 1;
        this.recorrerEntorno(simbolo.tabla.xml.getValor(simbolo,null));
        this.simbolitos += '</tbody>\n</table>\n';

        return this.simbolitos;
    }

    private recorrerEntorno(raiz:entorno){
        for (const key in raiz.tabla) {
            if (Object.prototype.hasOwnProperty.call(raiz.tabla, key)) {
                if (key != "id" && key != "n_etiquetas" && key != "index"){
                    this.numeroSimbolo++;
                    this.simbolitos += '<tr>\n\
                                        <th scope="row">' + this.numeroSimbolo + '</th>\n\
                                        <td>' + raiz.tabla[key].id + '</td>\n\
                                        <td>' + tipo[raiz.tabla[key].getTipo(raiz,null)] + '</td>\n\
                                        <td>' + raiz.tabla["id"].valor + '</td>\n\
                                        <td>' + raiz.tabla[key].linea + '</td>\n\
                                        <td>' + raiz.tabla[key].columna + '</td>\n';
                    if (raiz.tabla[key].getTipo(raiz,null) === tipo.VALOR || raiz.tabla[key].getTipo(raiz,null) === tipo.ATRIBUTE){
                        this.simbolitos += '<td>' + raiz.tabla[key].valor + '</td>\n';
                    }else{
                        this.simbolitos += '<td></td>\n';
                    }
                    this.simbolitos += '</tr>';
                    this.recorrerEntorno(raiz.tabla[key].getValor(raiz,null))
                }
            }
        }
    }
}