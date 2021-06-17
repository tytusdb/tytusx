
export class ReporteGD{
   
    public static r_gramaticad:Array<NodoReporte>=new Array<NodoReporte>();

    constructor(){
        ReporteGD.r_gramaticad=new Array<NodoReporte>();
    }

    public static agregar(b:string,p:string){
        let nuevo:NodoReporte = new NodoReporte(b,p);
        ReporteGD.r_gramaticad.unshift(nuevo);
    }

    public static recorrer(){
        for(let i=0; i<ReporteGD.r_gramaticad.length; i++){
            console.log(ReporteGD.r_gramaticad[i].getbnf());
        }
    }
}