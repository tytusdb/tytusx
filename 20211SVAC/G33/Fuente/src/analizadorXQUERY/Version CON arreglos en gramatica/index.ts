import * as gramatica from './GramaticaXquery';

export class AnalizadorXquery {

    public ejecutarCodigo(entrada: string) {
        entrada = `
        declare function local:minPrice($p as xs:decimal?,$d as xs:decimal?) as xs:decimal? {
        let $alv  := 2
        if  ($efe gt 1) then $integer + local:factorial($integer -1 )  else 1
        let $efe := 2
        };
        `
        console.log(gramatica.parse(entrada));

        console.log("aaalv")
    }

}