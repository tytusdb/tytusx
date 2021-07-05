export class GeneradorC3D {
    heapXML = [];
    stackXML = [];
    heapXPATH = [];
    stackXPATH = [];
    contXMLStack = 0;
    contadorTemporales = 0;
    contadorEtiquetas = 0;
    SP = 0;
    HP = 0;
    traduccionC3D = "";
    C3DXML = "";
    C3DXQUERY = "";

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

    getNatives(){
        this.contadorEtiquetas += 2;
        this.contadorTemporales += 3;
        return `/*------- NATIVES -------*/
        void printQuery() {
            t0 = SP+1;
            t1 = stack[(int)t0];
            L1:
            t2 = heap[(int)t1];
            if(t2 == -1) goto L0;
            printf("%c", (char)t2);
            t1 = t1+1;
            goto L1;
            L0:
            return;
        }\n\n`;
        
    }
    getMain(){
        let main = "/*------   M A I N   ------*\/\n"
        +"void main() {\n"
        +"SP = 0; HP = 0;\n\n";
        return main
    }

    getTraduccionXML(ent){

        this.recursiva(ent, "");

        return this.C3DXML
    }

    getTraduccionXPathQuery(output){
        // console.log(output);
        // this.C3DXQUERY = `\n/*------NATIVES------*/
        // void printConsulta() {
        //     t${this.contadorTemporales} = P+1;`
        //     this.contadorTemporales++

        // this.C3DXQUERY = `t${this.contadorTemporales} = stack[(int)${this.contadorTemporales-1}];
        //     L${this.contadorEtiquetas}:
        //     t${this.contadorTemporales+1} = heap[(int)${this.contadorTemporales}];
        //     if(${this.contadorTemporales+1} == -1) goto L${this.contadorEtiquetas+1};
        //     printf("%c", (char)t${this.contadorTemporales+1});
        //     t${this.contadorTemporales} = t${this.contadorTemporales}+1;
        //     goto ${this.contadorEtiquetas};
        //     L${this.contadorEtiquetas+1}:
        //     return;
        // }`;


        //this.C3DXQUERY += `printString();`
        
        console.log(output)
        let cadena = output;
        console.log(cadena.length);
        this.C3DXQUERY += "/*--------------- RESULTADO ----------------*/\n"
        
        this.C3DXQUERY += "t"+this.contadorTemporales+" = HP;\n"
        this.stackXML.push(this.HP);

        for (let index = 0; index < cadena.length; index++) {
            const element = cadena[index];
            console.log(element)
                this.C3DXQUERY += "heap[(int)HP] =" + cadena.charCodeAt(index) + ";\n";
                this.heapXML.push(cadena[index]);
                this.C3DXQUERY += this.aumentarHP();
            


        }
        this.C3DXQUERY += "heap[(int)HP] =-1;\n";
        this.heapXML.push(-1);
        this.C3DXQUERY += this.aumentarHP();
    

        this.C3DXQUERY += "stack[(int)" + this.SP + "] = t" + this.contadorTemporales + ";\n\n";
        this.SP++
        this.contadorTemporales++

        return "\n"+this.C3DXQUERY;
    }

    getFinal(){
        return "\nreturn;\n}\n"
    }
   

    getTraduccionCompleta(ent, output){   
        this.traduccionC3D += this.getNatives();     
        this.traduccionC3D += this.getMain();
        this.traduccionC3D += this.getTraduccionXML(ent);
        console.log("!!!!!!!!!! "+output);
        this.traduccionC3D += this.getTraduccionXPathQuery(output);
        this.traduccionC3D += `printString();`;
            
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
            this.C3DXML += "t"+this.contadorTemporales+" = HP;\n"
            this.stackXML.push(this.HP);
            for(let i=0;i<atributo.valor.length;i++){
                let caracter = atributo.valor
                this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
                this.heapXML.push(caracter[i]);
                this.C3DXML += this.aumentarHP();
            }
            this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.contadorTemporales + ";\n\n";
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
            this.C3DXML += "t"+this.contadorTemporales+" = HP;\n"
            this.stackXML.push(this.HP);
            for(let i=0;i<ent.texto.length;i++){
                let caracter = ent.texto
                this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
                this.heapXML.push(caracter[i]);
                this.C3DXML += this.aumentarHP();
            }
            this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.contadorTemporales + ";\n\n";
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
            // console.log("STACK: " + this.contXMLStack++)
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

    aumentarHP(){
        this.HP = this.HP + 1
        return "HP = HP + 1;\n"
    }




}