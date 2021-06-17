import { Atributo } from "./atributo";

export class Etiqueta {
    

    id:string;
    atributos:Array<Atributo>;
    valor:string;
    hijos:Array<Etiqueta>;

    
   
    
    constructor(id, at, hi, val){
        this.id=id;
        this.atributos = at;
        this.hijos=hi;
        this.valor=this.resuelveEnter(val);
        //Object.assign(this, {id,at,hi,val});
    }

    public dameHijos(){
        return this.hijos;
    }

    public dameAtributos(){
        return this.atributos;
    }
    public dameValor(){
        return this.valor;
    }

    public dameID(){
        return this.id;
    }
    private resuelveEnter(val:string):string{
        let nuevo = val.replace(/[\s]{2,}/g," ");
        if (nuevo.length==1) return "";
        return nuevo;
    }



    //DEVUELVE FORMATO EN ETIQUETA
    /**EJEMPLO
     * 
     * <HOLA>VALOR</HOLA>
     */
     public DameValorFormatoEtiqueta(): string {
        //let valor=`<${this.id}>${this.valor}</${this.id}>`
        let controlador = false;
        //ESCRIBIMOS PRIMER LA ETIQUETA QUE ABRE
        let valor = `<${this.id}`

        if (this.atributos.length != 0) {
            //EN CASO DE EXISTIR ATRIBUTOS, RECORREMOS CADA UNO DE ELLOS PARA SU ESCRITURA
            for (let att of this.atributos) {
                //ESCRIBIMOS CADA ATRIBUTO LEIDO
                valor = valor + ` ${att.nombre}=${att.valor}`
            }
           
            //UNA VEZ TERMINADA LA LECTURA DE ATRIBUTOS, SE PROCEDE A DIFERENCIAR ENTRE <ETIQUETA ATRIBUTO=B/> O <ETIQUETA ATRIBUTO=B></ETIQUETA> 
            if (this.hijos.length != 0) {
                //si entra a este estado significa que es una etiqueta con cierre <ETIQUETA ATRIBUTO=B></ETIQUETA>
                valor = valor + `>`
                //valor = valor + `${this.valor}</${.id}>\n`
            } else {
                //caso contrario, etiqueta sin cierre <ETIQUETA ATRIBUTO=B/>
                if (this.valor == "") {
                    valor = valor + `/>`
                    controlador = true;
                    return valor;
                } else {
                    valor = valor + `>`
                }
            }
        } else {
            valor = valor + `>`
        }
        if(!controlador){
        //SEGUIDAMENTE SE VAN A ESCRIBIR TODOS LO QUE CONTIENE LA ETIQUETA INICIAL
        for (let entry of this.hijos) {
            //ESCRIBIMOS PARTE DE LA ETIQUETA DE INICIO, ESTO POR SI CONTIENE ATRIBUTOS
            valor = valor + `<${entry.id}`;
            //VERIFICAMOS SI REALMENTE HAY ATRIBUTOS O NO
            if (entry.atributos.length != 0) {
                //EN CASO DE EXISTIR ATRIBUTOS, RECORREMOS CADA UNO DE ELLOS PARA SU ESCRITURA
                for (let att of entry.atributos) {
                    //ESCRIBIMOS CADA ATRIBUTO LEIDO
                    valor = valor + ` ${att.nombre}=${att.valor}`
                }
               
                //UNA VEZ TERMINADA LA LECTURA DE ATRIBUTOS, SE PROCEDE A DIFERENCIAR ENTRE <ETIQUETA ATRIBUTO=B/> O <ETIQUETA ATRIBUTO=B></ETIQUETA> 
                if (entry.valor != "") {
                    //si entra a este estado significa que es una etiqueta con cierre <ETIQUETA ATRIBUTO=B></ETIQUETA>
                    valor = valor + `>`
                    valor = valor + `${entry.valor}</${entry.id}>\n`
                } else {
                    //caso contrario, etiqueta sin cierre <ETIQUETA ATRIBUTO=B/>
                    valor = valor + `/>`
                }
            }
            else {
                //SI NO EXISTIESEN ATRIBUTOS, SIMPLEMENTE SE ESCRIBE LA ETIQUETA CON SU CONTENIDO
                valor = valor + `>${entry.valor}</${entry.id}>\n`;
            }
        }
    }
        //ESTA LINEA EN ESPECIFICA ES EN CASO DE QUE LA ETIQUETA PADRE NO TENGA HIJOS, POR LO TANTO SOLO SE ESCRIBE SU CONTENIDO SI TUVIERA
        valor = valor + `${this.valor}\n`;
        valor = valor + `</${this.id}>`; //SE CIERRA LA ETIQUETA PADRE 
        return valor;
    }

    public DameValorEncriptado(enco:string):string{
        let encod = enco.toLowerCase();
        let buf = new Buffer(this.valor);
        if(encod.includes("utf-8")){
            return buf.toString("utf-8");
        }else if(encod.includes("ascii")){
            return buf.toString("ascii")
        }else if(encod.includes("iso 8859-1")){
            return buf.toString("latin1");
        }
        return this.valor;
    }


    public BuscarValorAtributo(nombre:string):string{
        let valor="";

        this.atributos.forEach(atri => {
            if (atri.dameNombre().toLowerCase().includes(nombre.toLowerCase())){
                return atri.dameValor();
            }
        });
        return valor;
    }

    public DameValorFormatoEtiquetaEncriptado(enco:string):string{
        let valor=`<${this.id}>${this.DameValorEncriptado(enco)}</${this.id}>`
        return valor;
    }

    


    recorrer(e, nivel:number){
        let espacios = " - ".repeat(nivel);
        let salida = espacios+`ETIQUETA: ${this.id} - Atributos:${this.atributos.length} - Hijos:${this.hijos.length} - Valor: «${this.valor}» - Padre: ${e}`+'\n';
        
        this.atributos.forEach(atr => {
            salida+=espacios+atr.recorrer(this.id, nivel);
        });
        this.hijos.forEach(hijo => {
            salida+=hijo.recorrer(this.id, nivel+1);
        });
        //salida+='\n';
        return salida;
    }
}