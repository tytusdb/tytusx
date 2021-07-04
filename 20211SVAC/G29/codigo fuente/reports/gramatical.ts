export default class gramatical{
    private produccion:string;
    private regla:string;
    private reporteG:string;

    constructor(prod:string,rule:string){
        this.produccion = prod;
        this.regla = rule;
    }

    public getReporteG(arbol:Array<any>):string{
        this.reporteG = '<table class="table">\n\
                        <thead>\n\
                        <tr>\n\
                            <th scope="col">#</th>\n\
                            <th scope="col">Produccion</th>\n\
                            <th scope="col">Regla Gramatical</th>\n\
                        </tr>\n\
                        </thead>\n\
                        <tbody>\n';
        for (let index = 0; index < arbol.length; index++) {
            this.reporteG += '<tr>\n\
                                <th scope="row">' + (index + 1).toString() +'</th>\n\
                                <td>' + arbol[index].produccion + '</td>\n\
                                <td>' + arbol[index].regla + '</td>\n\
                            </tr>';
        }
        this.reporteG += '</tbody>\n\
                        </table>\n';
        return this.reporteG
    }

}