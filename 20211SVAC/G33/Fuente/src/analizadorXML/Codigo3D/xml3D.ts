//const fs = require('fs');

export class xml3D {

    public salida3D = '';
    public tmpArray: any = [];
    public contadorSalidas = 0;
    public contadorEtiqueta = 0;
    public contadort4 = 0;
    public contadort5 = 0;
    public contadorStack = 0;
    constructor() {
    }

    //Construccion del codigo 3D en C
    /*
    EJEMPLO LLAMADA:
    const dir = new xml3D();
    dir.getNodesByFilters(salidaG.objetos,lError.validateEtiquetas(salidaG.objetos).length,busqueda.returnListValues());
    */
    getNodesByFilters(objects: any, validationEt = 0, xpath: any, definiciones = null) {
        this.salida3D += `
#include <stdio.h>
#include <locale.h>
#include <stdlib.h>\n\n

int STACK[30101999];
int HEAP[30101999];
int H = 0;
int S = 0;
int sp = 0;
int t0 = 0;
int t1 = 0;
int t2 = 0;
int t3 = 0;
int t4 = 0;
int t5 = 0;
int t6 = 0;
int t7 = 0;

void imprimir(){

    etiqueta_a:
        if(HEAP[t2] == 160){
            printf("á");
            goto etiqueta_exit;
        }
    etiqueta_e:
        if(HEAP[t2] == 130){
            printf("é");
            goto etiqueta_exit;
        }
    etiqueta_i:
        if(HEAP[t2] == 161){
            printf("í");
            goto etiqueta_exit;
        }
    etiqueta_o:
        if(HEAP[t2] == 162){
            printf("ó");
            goto etiqueta_exit;
        }
    etiqueta_u:
        if(HEAP[t2] == 163){
            printf("ú");
            goto etiqueta_exit;
        }
    etiqueta_n:
        if(HEAP[t2] == 164 ){
            printf("ñ");
            goto etiqueta_exit;
        }
    imprimir_todo:
        printf("%c",  HEAP[t2]);
        goto etiqueta_exit;

    etiqueta_exit:
        return;
}

void imprimir2(){
    etiqueta_a:
        if(HEAP[t4] == 160){
            printf("á");
            goto etiqueta_exit;
        }
    etiqueta_e:
        if(HEAP[t4] == 130){
            printf("é");
            goto etiqueta_exit;
        }
    etiqueta_i:
        if(HEAP[t4] == 161){
            printf("í");
            goto etiqueta_exit;
        }
    etiqueta_o:
        if(HEAP[t4] == 162){
            printf("ó");
            goto etiqueta_exit;
        }
    etiqueta_u:
        if(HEAP[t4] == 163){
            printf("ú");
            goto etiqueta_exit;
        }
    etiqueta_n:
        if(HEAP[t4] == 164 ){
            printf("ñ");
            goto etiqueta_exit;
        }
    etiqueta_neg:
        if(HEAP[t4] == -1 ){
            printf(" ");
            goto etiqueta_exit;
        }
    imprimir_todo:
        printf("%c",  HEAP[t4]);
        goto etiqueta_exit;

    etiqueta_exit:
        return;
}

void imprimir3(){

    etiqueta_a:
        if(HEAP[t6] == 160){
            printf("á");
            goto etiqueta_exit;
        }
    etiqueta_e:
        if(HEAP[t6] == 130){
            printf("é");
            goto etiqueta_exit;
        }
    etiqueta_i:
        if(HEAP[t6] == 161){
            printf("í");
            goto etiqueta_exit;
        }
    etiqueta_o:
        if(HEAP[t6] == 162){
            printf("ó");
            goto etiqueta_exit;
        }
    etiqueta_u:
        if(HEAP[t6] == 163){
            printf("ú");
            goto etiqueta_exit;
        }
    etiqueta_n:
        if(HEAP[t6] == 164 ){
            printf("ñ");
            goto etiqueta_exit;
        }
    imprimir_todo:
        printf("%c",  HEAP[t6]);
        goto etiqueta_exit;

    etiqueta_exit:
        return;
}


void xml(){
    ${this.salida3D += this.create3dC(this.initSearchMethod(objects))}
    \n
    // ---------------------------------------- INICIO CODIGO PARA IMPRIMIR LOS VALORES XML
    sp = t1 - 1;
    int t4 = 0;
    t4 = t4 + 0;

    printf("VALORES XML:%c",10);

    etiqueta_for:
        //printf("%d",HEAP[t4]);
        if( HEAP[t4] == -1 ){
            printf("%c", 10);            
            goto etiqueta_for2;
        }
        goto etiqueta_imp;
    etiqueta_for2:
        t4 = t4 + 1;
        if (t4 >= sp ) {
            goto etiqueta_salida;
        }
        goto etiqueta_for;

    etiqueta_imp:
        if( HEAP[t4] == 152 ){
            goto etiqueta_for2;
        }
    etiqueta_imp1:
        if( HEAP[t4] == 153 ){
            goto etiqueta_for2;
        }
    etiqueta_imp2:
        if( HEAP[t4] == 154 ){
            goto etiqueta_for2;
        }
    etiqueta_imp3:
        t2 = t4;
        t2 = t2 + 0;
        imprimir();
        goto etiqueta_for2;
    // ---------------------------------------- FIN CODIGO PARA IMPRIMIR LOS VALORES

    etiqueta_salida:
        printf("Final Valores XML%c",10);

    return;
}

${this.getXpath3D(xpath)}

${this.crear3DDecla(definiciones)}


\n\n`


        this.salida3D += `int main() {
    setlocale(LC_ALL,"");
    int ID_0 = 0;
    ID_0 = ${validationEt};

    if(ID_0 == 0){
        xml();
        goto impresion_xpath;
    }
    printf("Existe un error en las etiquetas");
    goto etiqueta_final;

    impresion_xpath:
        xpath();

    manejo_declaraciones:
        declaraciones();

    etiqueta_final:    
        return 0;`;
        this.salida3D += `\n}`;

        //Crear archivo 3d .c
       // fs.appendFile('codigo3D.c', this.salida3D, (error: any) => {
         //   if (error) {
           //     throw error;
            //}
        //});
        return this.salida3D;
    }

    //Recorrer objetos obtenidos del analisis, para crear lista de 1d
    initSearchMethod(objects: any): string {
        var qryValue = '';
        var index = 0;
        for (let i = 0; i < objects.length; i++) {
            qryValue += `152\n`;
            //qryValue += `${objects[i].linea}_${objects[i].columna}\n`;
            qryValue += `${objects[i].identificador}\n`;
            qryValue += this.findByRootNode(objects[i], index);

        }
        //console.log('-Salida {0}\n', qryValue);
        return qryValue;
    }

    findByRootNode(nodeObject: any, index = 0, parent = null): string {
        var valueQry = '';
        var tamObj = 0;
        var tamAtr = 0;

        var arr = nodeObject.listaObjetos;
        var arr2 = nodeObject.listaAtributos;
        tamObj = arr.length;
        tamAtr = arr2.length;

        for (let i = 0; i < arr.length; i++) {
            valueQry += `153\n `; //OBJETO
            //valueQry += `${arr[i].linea}_${arr[i].columna}\n`;
            valueQry += `${arr[i].identificador}\n`;
            valueQry += `${arr[i].texto}\n`;
            valueQry += this.findByRootNode(arr[i]);
        }
        for (let i = 0; i < arr2.length; i++) {
            valueQry += `154\n`; //ATRIBUTO
            //valueQry += `${arr2[i].linea}_${arr2[i].columna}\n`;
            valueQry += `${arr2[i].identificador}\n`;
            valueQry += `${arr2[i].valor}\n`;
        }
        return valueQry;
    }

    //Colocar los valores de la lista1d en arreglo de caracteres en C
    create3dC(list: any): string {
        var lista = '';
        var valores = list.split('\n');

        //var contadorStack = 0;
        for (let i = 0; i < valores.length; i++) {
            if (valores[i] === '') {
                lista += `  HEAP[t1] = 32;   //TEXTO VACIO \n`;
                lista += `  t1 = t1 + 1;\n`;

                this.tmpArray.push('32');
            }
            else if (valores[i].includes("152")) {
                //lista += `    STACK[(int)${this.contadorStack}] =  t1;   // --- AGREGAR OBJETO\n`;
                //this.contadorStack++;
                lista += `  t0 = t1;\n`;
                lista += `  t0 = t0 + 0;\n`;
                lista += `  HEAP[t1] = ${valores[i]};   //RAIZ\n`;
                lista += `  t1 = t1 + 1;\n`;
                lista += `  STACK[(int)${this.contadorStack}] =  t0;   // --- AGREGAR OBJETO\n`;

                this.tmpArray.push(153);
            }
            else if (valores[i].includes("153")) {
                this.contadorStack++;
                lista += `  t0 = t1;\n`;
                lista += `  t0 = t0 + 0;\n`;
                lista += `  HEAP[t1] = ${valores[i]};   //OBJETO\n`;
                lista += `  t1 = t1 + 1;\n`;
                lista += `  STACK[(int)${this.contadorStack}] =  t0;   // --- AGREGAR OBJETO\n`;

                this.tmpArray.push(valores[i]);
            }
            else if (valores[i].includes("154")) {
                lista += `  HEAP[t1] = ${valores[i]};   //ATRIBUTO\n`;
                lista += `  t1 = t1 + 1;\n`;

                this.tmpArray.push(valores[i]);
            }
            else if (valores[i].startsWith(" ")) {
                lista += this.splitString(valores[i].substring(1));
                lista += `  HEAP[t1] = -1;   // --------- FIN DEL STRING\n`;
                lista += `  t1 = t1 + 1;\n`;

                this.tmpArray.push(-1);
            } else {
                lista += this.splitString(valores[i]);
                lista += `  HEAP[t1] = -1;   // --------- FIN DEL STRING\n`;
                lista += `  t1 = t1 + 1;\n`;

                this.tmpArray.push(-1);
            }
        }
        return lista;
    }
    //Pasar string a cadena de caracteres
    splitString(word: any): string {
        var tmpWord = '';
        var tmp = word.split('');
        for (let i = 0; i < tmp.length; i++) {
            var letter = '';
            if (tmp[i] === 'á' || tmp[i] === 'Á') {
                letter = '160';
            } else if (tmp[i] === 'é' || tmp[i] === 'É') {
                letter = '130';
            } else if (tmp[i] === 'í' || tmp[i] === 'Í') {
                letter = '161';
            } else if (tmp[i] === 'ó' || tmp[i] === 'Ó') {
                letter = '162';
            } else if (tmp[i] === 'ú' || tmp[i] === 'Ú') {
                letter = '163';
            } else if (tmp[i] === 'ñ' || tmp[i] === 'Ñ') {
                letter = '164';
            } else {
                letter = tmp[i].charCodeAt(0);
            }
            tmpWord += `    HEAP[t1] = ${letter};     //${tmp[i]}\n`;
            tmpWord += `    t1 = t1 + 1;\n`;

            this.tmpArray.push(letter);
        }
        return tmpWord;
    }

    getXpath3D(xpath: any): string {
        var tmpCodigo = `void xpath(){
    printf("%c", 10);            
    printf("INICIO VALORES XPATH%c",10);

    `;
        for (let contAtr = 0; contAtr < xpath.length; contAtr++) {
            // console.log('--- ', xpath[contAtr]); //XPATH VALS
            tmpCodigo += this.findPosition(this.getSplitString(xpath[contAtr]));
        }

        tmpCodigo += `
    etiqueta_salida:
        printf("FIN VALORES XPATH%c",10);
        return;
}`;
        return tmpCodigo;
    }
    // Pasar el resultado del xpath a un arreglo de caracteres
    getSplitString(valList: any) {
        var tmp: any = [];
        if (valList.tipo === 'A') {
            tmp.push(154);
        } else if (valList.tipo === 'O') {
            tmp.push(153);
        }
        tmp = tmp.concat(this.getCharAtCodeSplit(valList.id));
        tmp = tmp.concat(-1);
        tmp = tmp.concat(this.getCharAtCodeSplit(valList.val));
        return tmp;
    }
    // Obtener code del caracter 
    getCharAtCodeSplit(valL: any) {
        var tmpAr: any = [];
        valL = valL.toString()
        valL = valL.split('');
        for (let i = 0; i < valL.length; i++) {
            var letter = '';
            if (valL[i] === 'á' || valL[i] === 'Á') {
                letter = '160';
            } else if (valL[i] === 'é' || valL[i] === 'É') {
                letter = '130';
            } else if (valL[i] === 'í' || valL[i] === 'Í') {
                letter = '161';
            } else if (valL[i] === 'ó' || valL[i] === 'Ó') {
                letter = '162';
            } else if (valL[i] === 'ú' || valL[i] === 'Ú') {
                letter = '163';
            } else if (valL[i] === 'ñ' || valL[i] === 'Ñ') {
                letter = '164';
            } else if (valL[i] === 155) {
                letter = '155';
            } else if (valL[i] === '') {
                letter = '32';
            } else {
                letter = valL[i].charCodeAt(0);
            }
            tmpAr.push(letter);
        }
        return tmpAr;
    }
    // buscar posicion
    findPosition(xpathL: any): string {
        var xpath3dCode = '';
        var found = false;
        for (let i = 0; i < this.tmpArray.length; i++) {
            if (this.tmpArray[i] == xpathL[0]) {
                found = this.validate(this.tmpArray, xpathL, i, 0);
                if (found) {
                    //console.log(' -- ', i, ' tam ', xpathL.length);
                    xpath3dCode += this.traducir3DXpath(i, xpathL.length);
                    break;
                }
            }
        }
        return xpath3dCode;
    }

    validate(arrTodo: any, arrPath: any, contTodo: any, contPath: any): any {
        var hasFounded = false;
        if (arrTodo[contTodo] == arrPath[contPath]) {
            //console.log(contTodo, ' ', String.fromCharCode(arrPath[contPath]),' -- ', contPath);
            contTodo++;
            contPath++;
            hasFounded = this.validate(arrTodo, arrPath, contTodo, contPath);
        }
        if (contPath == (arrPath.length - 1)) {
            hasFounded = true;
        }
        return hasFounded;
    }

    traducir3DXpath(pos: any, tam: any): any {
        var tmp = `
    t4 = ${pos};
    t5 = ${tam};
    etiqueta_part${this.contadorEtiqueta}:
        imprimir2();
        t4 = t4 + 1;
        t5 = t5 - 1; 
        if(t5 == 0) goto inicio${this.contadorSalidas};
        goto etiqueta_part${this.contadorEtiqueta};
        
    inicio${this.contadorSalidas}:
    printf("%c", 10);            
    \n`;
        this.contadorEtiqueta++;
        this.contadorSalidas++;
        return tmp;
    }

    //Construcción deficiones
    crear3DDecla(lista: any): string {
        var decla3D = `void declaraciones(){
         
    t6 = sp + 1;
    t7 = t6;
    t7 = t7 * 1;

    ${this.generate3DDecla(lista)}

    // ---------------------------------------- INICIO CODIGO PARA IMPRIMIR LOS VALORES DECLARACIONES
    printf("VALORES DECLARACIONES:%c",10);
    etiqueta_for:
        //printf("%d",HEAP[t4]);
        if( HEAP[t6] == -1 ){
            printf("%c", 10);            
            goto etiqueta_for2;
        }
        goto etiqueta_imp;
    etiqueta_for2:
        t6 = t6 + 1;
        if (t6 >= t1 ) {
            goto etiqueta_salida;
        }
        goto etiqueta_for;

    etiqueta_imp:
        if( HEAP[t6] == 155 ){
            goto etiqueta_for2;
        }
    etiqueta_imp1:
        if( HEAP[t6] == -2 ){
            printf(" = "); 
            goto etiqueta_for2;
        }
    etiqueta_imp3:
        imprimir3();
        goto etiqueta_for2;
    // ---------------------------------------- FIN CODIGO PARA IMPRIMIR LAS DECLARACIONES

    etiqueta_salida:
        return;
}`;
        return decla3D;
    }
    generate3DDecla(list: any): string {
        var tmp = '';

        if (list !== null) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id.startsWith("$")) {
                    tmp += this.generate3Decla('int', list[i].id, list[i].valor);
                }
            }
        }
        return tmp;
    }
    ///155 156 157
    generate3Decla(tipo: any, nombre: any, valor: any): string {
        var caracteres = [];
        var tmpWord = '';
        caracteres.push(155); //tipo int
        caracteres = caracteres.concat(this.getCharAtCodeSplit(nombre));
        caracteres = caracteres.concat(-2);
        caracteres = caracteres.concat(this.getCharAtCodeSplit(valor));
        this.contadorStack++;    
        tmpWord += `    t0 = t1;\n`;
        tmpWord += `    t0 = t0 * 1;\n`;
        for (let i = 0; i < caracteres.length; i++) {
            tmpWord += `    HEAP[t1] = ${caracteres[i]};     //${caracteres[i]}\n`;
            tmpWord += `    t1 = t1 + 1;\n`;
        }
        tmpWord += `    HEAP[t1] = -1;     //FIN DE LA DECLARACIÓN\n`;
        tmpWord += `    t1 = t1 + 1;\n`;
        tmpWord += `    STACK[(int)${this.contadorStack}] =  t0;   // --- AGREGAR VARIABLE\n`;
        return tmpWord
    }

}
/*
    if(valores[i] === "OBJETO"){
    lista += `
    \n\n
    // ------------------------------ INICIA A GUARDAR UN OBJETO
    t1 = H;
    H = H + 5
    HEAP[(int)t1] = ${valores[i+2]};
    t1 = t1 + 1;
    HEAP[(int)t1] = ${valores[i+3]};
    t1 = t1 + 1;
    HEAP[(int)t1] = LISTA_OBJETOS};
    t1 = t1 + 1;
    HEAP[(int)t1] = -1};
    // ------------------------------ TERMINA GUARDAR UN OBJETO
    \n`;

    } else if(valores[i] === "ATRIBUTO"){

    }
*/
