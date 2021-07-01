import { sentenciaXpath } from "./sentenciaXpath";
import { SentenciaXquery } from "./Xquery/SentenciaXquery";

export class Entrada{
    xQueryData:SentenciaXquery[];
    xPathData:sentenciaXpath[];
    Tipo:number;
    constructor(xQueryData:SentenciaXquery[], xPathData:sentenciaXpath[], Tipo:number){
        this.xQueryData = xQueryData;
        this.xPathData = xPathData;
        this.Tipo = Tipo;
    }
}