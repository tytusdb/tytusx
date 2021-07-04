export class GeneradorC3D {
    heapXML = [];
    stackXML = [];
    contadorStack = 0;
    contadorTemporales = 0;
    SP = 0;
    HP = 0;
    traduccionC3D = "";
    C3DXML = "";

    constructor(){}

    getEncabezado(){
        let encabezado = "/*------H E A D E R------*\/\n"
        +"#include <stdio.h>\n#include <math.h>\n"
        +"double heap[30101999];\ndouble stack[30101999];\n"
        +"double SP;\ndouble HP;\n\n";

        for (let i = 0; i < this.contadorTemporales; i++) {
            if(i==0){
                encabezado += "//Declarando Variables Temporales\n";
                encabezado += "double t0"
            }else{
                encabezado += `, t${i}`
            }
            
        }
        if(this.contadorTemporales!=0){
            encabezado += ";\n\n"   
        }

        return encabezado; 
    }
    getMain(){
        let main = "/*------   M A I N   ------*\/\n"
        +"void main() {\n"
        +"SP = 0; HP = 0;\n\n";
        return main
    }

    getTraduccionXML(ent){
        console.log("GETTRADUCCIONXML");
        console.log(ent);

        this.recursiva(ent, "");



        return this.C3DXML
    }

    getTraduccionXPathQuery(){

    }

    getFinal(){
        return "\nreturn;\n}\n"
    }
   

    getTraduccionCompleta(ent){        
        this.traduccionC3D += this.getMain();
        this.traduccionC3D += this.getTraduccionXML(ent);

        this.traduccionC3D += `
    
            for(int loop = 0; loop < stack[1]; loop++){
                printf("%c", (char) heap[loop]);
            }`;
            
        this.traduccionC3D += this.getFinal();
        console.log("STACKXML\n"+this.stackXML);
        console.log("HEAPXML\n"+this.heapXML);

        return this.getEncabezado()+this.traduccionC3D
    }

    recursiva(ent, traducido){
        
        var entActual = ent.tipo;

        //PARA CADA ATRIBUTO
        for (const atributo of ent.atributos) {
            /*this.table.push({
                nombre: atributo.nombre,
                tipo: "Atributo",
                valor: atributo.valor,
                ambito: entActual,
                fila: atributo.linea,
                columna: atributo.columna,
                stackPosition: 0
            });*/
            this.C3DXML += "t"+this.SP+" = HP;\n"
            this.stackXML.push(this.HP);
            for(let i=0;i<atributo.valor.length;i++){
                let caracter = atributo.valor
                this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
                this.heapXML.push(caracter[i]);
                this.C3DXML += this.aumentarHP();
            }
            this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.SP + ";\n\n";
            atributo.setPosicionStack(this.SP);
            this.SP++
            this.contadorTemporales++

        }


        //Valor de las etiquetas
        if (ent.texto != "") {
            /*this.table.push({
                nombre: "ValorEtiqueta",
                tipo: "Cadena",
                valor: ent.texto,
                ambito: entActual,
                fila: ent.linea,
                columna: ent.columna,
                stackPosition: 0
            });*/
            /*this.table.push({
                nombre: ent.tipo,
                tipo: "Object",
                valor: ent.texto,
                ambito: entActual,
                fila: ent.linea,
                columna: ent.columna,
                stackPosition: 0
            });*/
            this.C3DXML += "t"+this.SP+" = HP;\n"
            this.stackXML.push(this.HP);
            for(let i=0;i<ent.texto.length;i++){
                let caracter = ent.texto
                this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
                this.heapXML.push(caracter[i]);
                this.C3DXML += this.aumentarHP();
            }
            this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.SP + ";\n\n";
            ent.setPosicionStack(this.SP);
            this.SP++
            this.contadorTemporales++
        }


        //PARA CADA HIJO
        for (const hijo of ent.hijos) {

            /*this.table.push({
                nombre: hijo.tipo,
                tipo: "Etiqueta",
                valor: "Object",
                // tipo: "Object",
                // valor: ent.texto,
                ambito: entActual,
                fila: hijo.linea,
                columna: hijo.columna,
                stackPosition: 0
            });*/
            //console.log("OBJETO: "+hijo.tipo);
            console.log(hijo);
            this.C3DXML += "//TIENE HIJOS\n"

            this.recursiva(hijo);

            
            /*this.C3DXML += "t"+this.SP+" = HP;\n"
            // console.log("ATRIBUTO: "+ atributo.nombre + " VALOR: "+atributo.valor)
            // console.log("STACK: " + this.contadorStack++)
            for(let i=0;i<atributo.valor.length;i++){
                let caracter = atributo.valor
                // console.log(caracter);
                // console.log(i);
                // console.log(caracter[i]);
                // console.log(caracter.charCodeAt(i));
                this.C3DXML += "heap[(int)HP =" + caracter.charCodeAt(i) + "]\n";
                this.C3DXML += "HP = HP + 1\n"
            }

            this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.SP + "\n";
            console.log(atributo);
            atributo.setPosicionStack(this.SP);
            console.log(atributo);*/
            
            //this.SP++

        }

        

        return ""
    }

    setComentario(){

    }

    aumentarHP(){
        this.HP = this.HP + 1
        return "HP = HP + 1;\n"
    }




}