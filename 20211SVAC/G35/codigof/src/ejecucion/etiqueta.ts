import temporal from "../traduccion/temporal";
import { Atributo } from "./atributo";

export class Etiqueta {
    

    id:string;
    atributos:Array<Atributo>;
    valor:string;
    hijos:Array<Etiqueta>;
    //TRADUCCION
    posicion:number;
    //TRADUCCION
    
   
    
    constructor(id, at, hi, val, pos){
        this.id=id;
        this.atributos = at;
        this.hijos=hi;
        this.valor=this.resuelveEnter(val);

        //TRADUCCION
        this.posicion = pos;
        //TRADUCCION
        
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
        /*
        '&lt;' return '<';
'&gt;' return '>';
'&quot;' return '"';*/ 
        let nuevo = val.replace(/[\s]{2,}/gi," ").replace(/(&lt;)/gi, "<").replace(/(&gt;)/gi, ">").replace(/(&quot;)/gi, '"');
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
        //encod = encod.replace(/[\n\"\'\`]+/g,"");
        //alert(encod);
        let icon = require('iconv-lite');
        if(encod.includes("utf-8")||encod.includes("utf8")){
            return icon.decode(this.valor, "utf-8");
        }else if(encod.includes("utf-16le")|| encod.includes("utf-16le")){
            return icon.decode(this.valor, "utf-16le");
        }else if(encod.includes("utf-16be")||encod.includes("utf16be")){
            return icon.decode(this.valor, "utf-16be");
        }else if(encod.includes("utf-16")||encod.includes("utf16")){
            return icon.decode(this.valor, "utf-16");
        }else if(encod.includes("asci")){
            return icon.decode(this.valor, "asciiutf-16be");
        }else if(encod.includes("iso-8859-1")){
            return icon.decode(this.valor, "ISO-8859-1");
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



    //TRADUCCION


    buscarMayorHijo():number{
        if (this.hijos.length>0){
            let mayor = this.hijos.length;
            this.hijos.forEach(eti => {
                let temp = eti.buscarMayorHijo();
                if (temp>mayor){
                    mayor = temp;
                }
            });
            return mayor;
        }
        return 0;
    }


    buscaLongitudCadena():number{
        let mayor = this.valor.length, temp=0;
        this.hijos.forEach(et => {
            temp = et.buscaLongitudCadena();
            if (temp>mayor) mayor=temp;
        });
        return mayor;
    }

    LinealizarHijos():Array<Etiqueta>{
        let NuevaLista =  new Array<Etiqueta>();
        NuevaLista.push(this);
        if (this.hijos.length>0){
            this.hijos.forEach(et => {
                
                NuevaLista.push(...et.LinealizarHijos())
            });
        }
        
        return NuevaLista;
    }

    //VAMOS A GENERAR EL C3D DE UNA ETIQUETA
    DameC3D(miTemp:temporal, enco:string):string{
        let cont="";
        //POR AHORA SOLO TENEMOS PENDIENTE LOS HIJOS.
        //PRIMERA PRUEBA CON ID, ATRIBUTOS, Y VALOR

        //GUARDAMOS UN NUEVO TEMPORAL PARA GUARDAR EN STACK
        miTemp.aumentar();
        let tempString = miTemp.retornarString();
        //miTemp.aumentar();
        
        cont+=miTemp.retornarString() + " = H;\n";
        //GUARDAMOS EL NOMBRE O ID DE LA ETIQUETA
        for (let i=0;i<this.id.length;i++){
            cont+=`heap[(int)H] = ${this.id.charCodeAt(i)};\n`;
            cont+=`H = H+1;\n`;
        }
        //GENERAMOS UN PIVOTE DE NOMBRE QUE SERA -1
        cont+=`heap[(int)H] = -1;\n`;
        cont+=`H = H+1;\n`;
        miTemp.aumentar();

        //AHORA LLAMAMOS A LOS ATRIBUTOS

        cont+=`//guardo atributos de ${this.id} \n`;
        cont += this.DameAtributosC3D(miTemp);
        cont+=`//guarde atributos de ${this.id} \n`;
        cont+=`heap[(int)H] = -77;\n`;
        cont+=`H = H+1;\n`;
        //LLAMAMOS EL VALOR
        //DEBEMOS BUSCAR EL ENCRIPTADO

        let valorEncriptado = this.DameValorEncriptado(enco);
        cont+=`// VALOR ENCRITPADO ${valorEncriptado}\n`;
        cont+=miTemp.retornarString() + " = H;\n";
        for(let i=0;i<valorEncriptado.length;i++){
            cont+=`heap[(int)H] = ${valorEncriptado.charCodeAt(i)};\n`;
            cont+=`H = H+1;\n`;
        }
        cont+=`heap[(int)H] = -1;\n`;
        cont+=`H = H+1;\n`;

        //POR ULTIMO AGREGAMOS A LOS HIJOS
        //SOLO AGREGAMOS LA DIRECCION DEL STACK DE CADA HIJO
        this.hijos.forEach(et => {
            let posicionStack = et.posicion;
            //POR CADA HIJO LLENAMOS LOS PIVOTES
            cont+=`//Guardo hijo ${et.id}\n`;
            cont+=`heap[(int)H] = ${posicionStack};\n`;
            cont+=`H = H+1;\n`;
            //Y POR CADA HIJO UN PIVOTE QUE SERA -2

            cont+=`heap[(int)H] = -2;\n`;
            cont+=`H = H+1;\n`;
        });
        //BANDERA FIN DE ETIQUETA
        cont += "heap[(int)H]=-9;\n";
        cont += "H = H+1;\n";

        //AHORA AGREMAMOS ESTE VALOR AL STACK
        //nuevoTem.contador--;
        cont+=`stack[(int)${this.posicion}]=${tempString};\n`;
        cont+=`//guardo la etiqueta ${this.id} en ${this.posicion}\n`;


        
        return cont;
    }

    DameAtributosC3D(miTemp:temporal):string{
        let cont="";
        this.atributos.forEach(at => {
            cont+=at.generaCodigo3D(miTemp);
        });
        return cont;
    }
    
    //TRADUCCION

}