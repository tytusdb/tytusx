import { Graficas } from "../Graficas/Graficas";
import { Atributo } from "./Atributo";

export class EtiquetaInicio {
    version:string
    encoding:string
    linea: number
    columna: number
    idSent:number
    constructor(listaAtributos: Array<Atributo>, linea: number, columna: number, idSent:number) {
        this.linea = linea
        this.columna = columna
        this.idSent = idSent
        listaAtributos.forEach(atributo => {
            if (atributo.nombre == "version") {
                this.version = atributo.valor
            } else if (atributo.nombre == "encoding") {
                this.encoding = atributo.valor
            }
        });
    }

    getCstDotA(idPadre:number):string {
        let texto = ""
        texto += Graficas.getElement(this.idSent, "TAG_CONFIGURACION", idPadre)
        texto += Graficas.getElement(this.idSent+1, "AbreTagConf", this.idSent)
        texto += Graficas.getElement(this.idSent+2, "<?", this.idSent+1)
        texto += Graficas.getElement(this.idSent+3, "version", this.idSent)
        texto += Graficas.getElement(this.idSent+4, this.version.split("\"").join(""), this.idSent+3)
        texto += Graficas.getElement(this.idSent+5, "encoding", this.idSent)
        texto += Graficas.getElement(this.idSent+6, this.encoding.split("\"").join(""), this.idSent+5)
        texto += Graficas.getElement(this.idSent+7, "CierreTagConf", this.idSent)
        texto += Graficas.getElement(this.idSent+8, "?>", this.idSent+7)
        return texto
    }


}