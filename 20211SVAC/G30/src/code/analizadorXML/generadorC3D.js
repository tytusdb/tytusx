const fase2x = require('../analizadorXPath/fase2x')

export class GeneradorC3D {
    heapXML = [];
    stackXML = [];
    heapXPATH = [];
    stackXPATH = [];

    contadorTemporales = 0;
    contadorEtiquetas = 0;
    contadorTInicial = 0;
    contadorEInicial = 0;

    SP = 0;
    HP = 0;

    traduccionC3D = "";
    C3DXML = "";
    C3DXPATH = "";
    C3DXQUERY = "";
    
    

    constructor(){
        this.contadorTemporales = this.contadorTI = this.GetStorage('contadorTemporales');
        this.contadorEtiquetas = this.contadorEI = this.GetStorage('contadorEtiquetas');

        console.log("----> CT: " + this.contadorTemporales + "---> CE: " + this.contadorEtiquetas);
    }

    getEncabezado(){
        let encabezado = "/*------- H E A D E R --------*\/\n"
        +"#include <stdio.h>\n"
        +"#include <math.h>\n"
        +"double heap[30101999];\n"
        +"double stack[30101999];\n"
        +"double heapXP[30101999];\n"
        +"double stackXP[30101999];\n"
        +"double heapxq[30101999];\n"
        +"double stackxq[30101999];\n"
        +"double SP;\ndouble HP;\n"
        +"double SPXP;\ndouble HPXP;\n"
        +"double PQ;\ndouble HQ;\n\n";

        for (let i = 0; i < this.contadorTemporales; i++) {
            if(i==0){
                encabezado += "//Declarando Variables Temporales\n";
                encabezado += `double t${i}`
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
        let natives = `\n/*------NATIVES------*/\n
        void printQuery() {
        ${this.getNewTemp()} = SP;\n`

        natives += `\t\t${this.getNewTemp()} = stack[(int)t${this.contadorTemporales-2}];\n`

        natives += `\t\t\tL${this.contadorEtiquetas}:
        ${this.getNewTemp()} = heap[(int)t${this.contadorTemporales-2}];
            if(t${this.contadorTemporales-1} == -1) goto L${this.contadorEtiquetas+1};
            printf("%c", (char)t${this.contadorTemporales-1});
            t${this.contadorTemporales-2} = t${this.contadorTemporales-2}+1;
            goto L${this.contadorEtiquetas};
            L${this.contadorEtiquetas+1}:
            return;
        }`;
        return natives
    }
    getMain(){
        let main = "/*------   M A I N   ------*\/\n"
        +"void main() {\n"
        +"SP = 0; HP = 0;\n\n";
        return main
    }

    getTraduccionXML(ent){

        this.C3DXML += "\n//============= ALMACENANDO XML ==================\n"
        this.recursiva(ent, "");

        return this.C3DXML
    }

    getMyXpath(){
        let xpathSyntax = this.GetStorage('path');
        if (xpathSyntax=="") return "//NO HAY CONSULTA EN XPATH\n"

        let xpathRes = this.GetStorage('new_xml');
        xpathSyntax += '#'
        let trad = ""
        let c = "";
        let state = 0;
        let instrucciones = [];
        let auxlex = ""

        console.log(xpathSyntax);
        console.log(xpathRes);

        for (let i = 0; i < xpathSyntax.length; i++) {

            c = xpathSyntax[i];
            console.log("C---> "+c)

            switch(state) {
                case 0:
                    if(c == '/'){
                        if(xpathSyntax[i+1] == '/'){
                            trad += `/* // Selects nodes in the document from the current node that match the selection no matter where they are*/\n`
                            //state = 1;

                            instrucciones.push(1);
                        }else{
                            //trad += `/* / Selects the root element bookstore\n`
                            //trad += `Note: If the path starts with a slash ( / ) it always represents an absolute path to an element!*/\n`
                            //state = 11;
                            instrucciones.push(2);
                        }
                    }else if(c == '.'){
                        if(xpathSyntax[i+1] == '.'){
                            trad += `/* .. 	Selects the parent of the current node*/\n`

                            instrucciones.push(3);
                        }else{
                            trad += `/* . 	Selects the current node*/\n`
                            instrucciones.push(4);
                        }
                        //state = 2;
                    }else if(c == '@'){
                        trad += `/* @ 	Selects attributes*/\n`
                        instrucciones.push(5);
                        //state = 3;
                    }else{
                        //trad += `/* Selects all nodes with the name "nodename"*/\n`
                        auxlex += c
                        //state = 4;
                    }
                    state=4;
                    //instrucciones.push(1);
                  break;
                case 1:
                  // code block
                  break;
                case 11:
                    // code block
                    break;
                case 2:
                  // code block
                  break;
                case 3:
                  // code block
                  break;
                case 4:
                    if (c!='/' && c!='.' && c!='@' && c!='[' && c!='#')
                    {
                        state = 4;
                        auxlex += c;
                    }else if (c=='#'){
                        trad += `/* Selects all nodes with the name ${auxlex}*/\n`
                        instrucciones.push(auxlex)
                        auxlex = ""
                        state = 0;
                        trad += `// FIN XPATH QUERY\n`
                        i = xpathSyntax.length;
                    }else{
                        i -= 1
                        trad += `/* Selects all nodes with the name ${auxlex}*/\n`
                        instrucciones.push(auxlex)
                        auxlex = ""
                        state = 0;
                    }
                    console.log("4 --> "+state)
                    console.log(c)
                    break;
                default:
                  // code block
            }
        }

        console.log(instrucciones);


        let xml = this.GetStorage('XML');
        console.log(xml)
        //this.ejecutarInstrucciones(ent, instrucciones);

        return trad;
    }

    getTraduccionXpath(){
        let xpathSyntax = this.GetStorage('path');
        if (xpathSyntax=="") return "//NO HAY CONSULTA EN XPATH\n"

        let xpathRes = this.GetStorage('new_xml');
        var listaInstrucciones = fase2x.parse(xpathSyntax);
        console.log(listaInstrucciones)
        let trad = "";


        if(listaInstrucciones.length > 0){

            let xml = this.GetStorage('XML');
            console.log(xml)
            this.recursiva2(xml, "", listaInstrucciones)
            // if(listaInstrucciones[0].getTipo() == "//"){
            //     trad += `/* // Selects nodes in the document from the current node that match the selection no matter where they are*/\n`
            // }else if(listaInstrucciones[0] == "/"){
            //     trad += `/* / Selects the root element named like this...\n`
            // }
            

            

            // return trad;
        }

        return "// NO HAY CONSULTA DE XPATH :)\n"


        
    }

    recursiva2(ent, traducido, instr){

        console.log(instr);
        if(instr){

        }
        var entActual = ent.tipo;

        //PARA CADA ATRIBUTO
        for (const atributo of ent.atributos) {
            // this.C3DXML += "t"+this.contadorTemporales+" = HP;\n"
            // this.stackXML.push(this.HP);
            // for(let i=0;i<atributo.valor.length;i++){
            //     let caracter = atributo.valor
            //     this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
            //     this.heapXML.push(caracter[i]);
            //     this.C3DXML += this.aumentarHP();
            // }
            // this.C3DXML += "heap[(int)HP] =-1;\n";
            // this.heapXML.push(-1);
            // this.C3DXML += this.aumentarHP();

            // this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.contadorTemporales + ";\n\n";
            // atributo.setPosicionStack(this.SP);
            // this.SP++
            // this.contadorTemporales++
        }

        //Valor de las etiquetas
        if (ent.texto != "") {
            // this.C3DXML += "t"+this.contadorTemporales+" = HP;\n"
            // this.stackXML.push(this.HP);
            // for(let i=0;i<ent.texto.length;i++){
            //     let caracter = ent.texto
            //     this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
            //     this.heapXML.push(caracter[i]);
            //     this.C3DXML += this.aumentarHP();
            // }
            // this.C3DXML += "heap[(int)HP] =-1;\n";
            // this.heapXML.push(-1);
            // this.C3DXML += this.aumentarHP();

            // this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.contadorTemporales + ";\n\n";
            // //ent.setPosicionStack(this.SP);
            // //this.C3DXML += `\nSetPos ${this.SP}\n`
            // //console.log(ent)
            // this.SP++
            // this.contadorTemporales++
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
            //console.log(hijo);
            
            // hijo.setPosicionStack(this.SP); this.C3DXML += `\n//SetPos ${this.SP}\n`
            // this.C3DXML += `//TIENE HIJO/S ${hijo.tipo}\n`
            // this.C3DXML += `stack[(int)${this.SP}] = HP;\n`
            // this.stackXML.push(this.HP);
            // this.SP++

            // this.C3DXML += `heap[(int)${this.HP}] = ${this.SP};\n`
            // this.heapXML.push(this.SP);
            // this.HP++
            // this.contadorTemporales++;

            // this.recursiva(hijo);

        }
        return ""
    }

    getSimpleXpath(output){
        
        let cadena = output;
        this.C3DXQUERY += "/*--------------- XPATH MANAGEMENT ----------------*/\n"
        this.C3DXQUERY += "t"+this.contadorTemporales+" = HP;\n"
        this.stackXML.push(this.HP);

        for (let index = 0; index < cadena.length; index++) {
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
   

    getTraduccionCompleta(ent){   
        this.traduccionC3D += this.getNatives();     
        //this.traduccionC3D += this.getMain();
        
        this.traduccionC3D += "\n// ================== XQUERY1 =================== \n"
        let newC3D = this.GetStorageS('Code3D')
        this.traduccionC3D += newC3D;

        this.traduccionC3D += this.getTraduccionXML(ent);
        //this.traduccionC3D += this.getMyXpath();
        this.traduccionC3D += "\n// ================== XPATH1 =================== \n"
        this.getTraduccionXpath();
        //this.traduccionC3D += this.getSimpleXpath(output);
        this.traduccionC3D += `\nSP = SP+${this.SP-1};\nprintQuery();`;
            
        this.traduccionC3D += this.getFinal();

        console.log("STACKXML\n"+this.stackXML);
        console.log("HEAPXML\n"+this.heapXML);

        return this.getEncabezado()+this.traduccionC3D
    }


    getTraduccionLimpia(ent, output){   
        this.traduccionC3D += this.getNatives();     
        //this.traduccionC3D += this.getMain();

        
        this.traduccionC3D += "// ================== XQUERY2 =================== \n"
        let newC3D = this.GetStorageS('Code3D')
        this.traduccionC3D += newC3D

        this.traduccionC3D += this.getTraduccionXML(ent);
        this.traduccionC3D += "// ================== XPATH2 =================== \n"
        this.traduccionC3D += this.getSimpleXpath(output);
        this.traduccionC3D += `\nSP = SP+${this.SP-1};\nprintQuery();`;
            
        this.traduccionC3D += this.getFinal();

        console.log("STACKXML\n"+this.stackXML);
        console.log("HEAPXML\n"+this.heapXML);

        return this.getEncabezado()+this.traduccionC3D
    }

    recursiva(ent, traducido){
        var entActual = ent.tipo;

        //PARA CADA ATRIBUTO
        for (const atributo of ent.atributos) {
            this.C3DXML += "t"+this.contadorTemporales+" = HP;\n"
            this.stackXML.push(this.HP);
            for(let i=0;i<atributo.valor.length;i++){
                let caracter = atributo.valor
                this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
                this.heapXML.push(caracter[i]);
                this.C3DXML += this.aumentarHP();
            }
            this.C3DXML += "heap[(int)HP] =-1;\n";
            this.heapXML.push(-1);
            this.C3DXML += this.aumentarHP();

            this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.contadorTemporales + ";\n\n";
            atributo.setPosicionStack(this.SP);
            this.SP++
            this.contadorTemporales++
        }

        //Valor de las etiquetas
        if (ent.texto != "") {
            this.C3DXML += "t"+this.contadorTemporales+" = HP;\n"
            this.stackXML.push(this.HP);
            for(let i=0;i<ent.texto.length;i++){
                let caracter = ent.texto
                this.C3DXML += "heap[(int)HP] =" + caracter.charCodeAt(i) + ";\n";
                this.heapXML.push(caracter[i]);
                this.C3DXML += this.aumentarHP();
            }
            this.C3DXML += "heap[(int)HP] =-1;\n";
            this.heapXML.push(-1);
            this.C3DXML += this.aumentarHP();

            this.C3DXML += "stack[(int)" + this.SP + "] = t" + this.contadorTemporales + ";\n\n";
            //ent.setPosicionStack(this.SP);
            //this.C3DXML += `\nSetPos ${this.SP}\n`
            //console.log(ent)
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
            //console.log(hijo);
            
            hijo.setPosicionStack(this.SP); this.C3DXML += `\n//SetPos ${this.SP}\n`
            this.C3DXML += `//TIENE HIJO/S ${hijo.tipo}\n`
            this.C3DXML += `stack[(int)${this.SP}] = HP;\n`
            this.stackXML.push(this.HP);
            this.SP++

            this.C3DXML += `heap[(int)${this.HP}] = ${this.SP};\n`
            this.heapXML.push(this.SP);
            this.HP++
            this.contadorTemporales++;

            this.recursiva(hijo);

        }
        return ""
    }

    aumentarHP(){
        this.HP = this.HP + 1
        return "HP = HP + 1;\n"
    }

    getNewTemp(){
        let temp = `\tt${this.contadorTemporales}`
        this.contadorTemporales++
        return temp
    }

    SetStorage(data, id) {
        localStorage.setItem(id, JSON.stringify(data));
    }

    GetStorage(id){
        var data = localStorage.getItem(id);
        return JSON.parse(data);
    }

    GetStorageS(id){
        var data = localStorage.getItem(id);
        console.log("GETSTORAGESSSSSS");
        console.log(data);
        return data;
    }


}