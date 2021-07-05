export class XPATHC3D {
    contadorTemporal = 0;
    contadorEtiqueta = 0;
    heap = null;
    stack = null;
    codigo = null;
    ultimaEtiquedaSalida = ``;
    consulta = ``;

    c3d = null;

    constructor() {
        this.contadorTemporal = 0;
        this.contadorEtiqueta = 0;
        this.heap = null;
        this.stack = null;
        this.codigo = ``;
        this.ultimaEtiquedaSalida = ``;
        this.consulta = ``;
        this.c3d = ``;
    }

    getHeap(){
        return this.heap;
    }

    getStack(){
        return this.stack;
    }

    getTemporal(){ 
        this.contadorTemporal++;
        return this.contadorTemporal;
    }

    getEtiqueta(){
        return this.contadorEtiqueta;
    }

    crearTemporal() {
        this.contadorTemporal++;
        return `t${this.contadorTemporal}`;
    }
  
    crearEtiqueta() {
        this.contadorEtiqueta++;
        return `L${this.contadorEtiqueta}`;
    }

    agregarCodigo(codigo) {
        this.c3d += codigo;
    }

    getHP() {
        return `H = H + 1;\r\n`;
    }

    getXpath(analizo, resultado, temporal, heap, stack){
        this.consulta = analizo;
        this.codigo = resultado;
        this.contadorTemporal = temporal;
        this.heap = heap;
        this.stack = stack;
        /*this.c3d = this.guardarConsulta(this.consulta);
        this.c3d += this.guardarResultadoXpath(this.codigo);*/

        this.c3d = this.funciones();

        //console.log(this.c3d);
        return this.c3d;
    }

    funciones(){
        let cadena = ``;

        
        cadena = `/* --- --- --- INICIO XPATH --- --- --- */ \r\n`;
        cadena += this.guardarConsulta(this.consulta);
        cadena += this.matchAtributo();
        cadena += this.imprimirID();
        cadena += this.imprimirAtr();
        cadena += this.imprimirAtrValor();
        cadena += this.imprimirValor();
        cadena += this.guardarResultadoXpath(this.codigo);

        return cadena;
    }

    guardarResultadoXpath(resultado){
        let cadena = ``;
        let tempInicio = this.crearTemporal();
        //let temp = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        let hpInicio = 0;
        let spInicio = this.stack.lista.length;

        //Se inicia a guardar consulta
        cadena += `void Consulta() {\r\n`;
        cadena += `if (1 == 1) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;
        cadena += `${tempInicio} = H;\r\n`;
        hpInicio = this.heap.hp;

        cadena += `heap[(int)H] = 225; //Guardo esto en heap "Inicio Consulta" \r\n`;
        cadena += this.getHP();
        this.heap.lista.push(225);
        this.heap.hp++;


        for (let index = 0; index < resultado.length; index++) {
            cadena += `heap[(int)H] = ${resultado[index].charCodeAt(0)}; //Guardo esto en heap ${resultado[index]} \r\n`;
            cadena += this.getHP();
            this.heap.lista.push(resultado[index].charCodeAt(0));
            this.heap.hp++;
        }
        cadena += `heap[(int)H] = -1; //Guardo esto en heap -1 \r\n`;
        cadena += this.getHP();
        this.heap.lista.push(-1);
        this.heap.hp++;

        cadena += `stack[(int)${spInicio}] = ${tempInicio};\r\n`;
        this.stack.lista[spInicio] = hpInicio;

        

        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        let imprimir = this.imprimirXpath(spInicio);

        cadena += imprimir;
        //TODO llamar funciones

        console.log('HEAP XPATH ---->', this.heap.lista)
        console.log('STACK XPATH -->', this.stack.lista)

        return cadena;

    }

    imprimirXpath(spInicio){
        let cadena = ``;
        let temp = this.crearTemporal();
        let temp1 = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        
        let formateador = "\"%c\", (char)";
        
        //Se inicia a imprimir Consulta
        cadena = `void Imprimir() {\r\n`;

        cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${temp1} = heap[(int)${temp}];\r\n`;

        cadena += `if (${temp1} == 225) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;

        temp = this.crearTemporal();
        temp1 = this.crearTemporal();
        let temp2 = this.crearTemporal();

        let lv1 = this.crearEtiqueta();
        let lf1 = this.crearEtiqueta();
        let ls = this.crearEtiqueta();

        cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${ls}:\r\n`;
        cadena += `${temp1} = ${temp} + 1;\r\n`;
        cadena += `${temp2} = heap[(int)${temp1}];\r\n`;
        cadena += `if (${temp2} != -1) goto ${lv1};\r\n`;
        cadena += `goto ${lf1};\r\n`;
        cadena += `${lv1}:\r\n`;
        
        cadena += `printf(${formateador}${temp2});\r\n`;
        cadena += `${temp} = ${temp1};\r\n`;

        cadena += `goto ${ls};\r\n`;

        cadena += `${lf1}:\r\n`;
        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        return cadena;
    }

    imprimirAtr(){ //(spInicio)
        let cadena = ``;
        let temp = this.crearTemporal();
        let temp1 = this.crearTemporal();
        let temp2 = this.crearTemporal();
        let temp3 = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        let ls = this.crearEtiqueta();
        
        let formateador = "\"%c\", (char)";

        //Se inicia a imprimir atributo
        cadena = `void ImprimirAtr() {\r\n`;

        cadena += `${temp} = P + 1;\r\n`;
        //cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${temp1} = stack[(int)${temp}];\r\n`;
        cadena += `${ls}:\r\n`;
        cadena += `${temp2} = ${temp1} + 1;\r\n`;
        cadena += `${temp3} = heap[(int)${temp2}];\r\n`;
        cadena += `if (${temp3} == -1) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;
        
        cadena += `printf(${formateador}${temp3});\r\n`;
        cadena += `${temp1} = ${temp2};\r\n`;

        cadena += `goto ${ls};\r\n`;

        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        return cadena;        
    }

    imprimirID(){ //(spInicio)
        let cadena = ``;
        let temp = this.crearTemporal();
        let temp1 = this.crearTemporal();
        let temp2 = this.crearTemporal();
        let temp3 = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        let ls = this.crearEtiqueta();
        
        let formateador = "\"%c\", (char)";

        //Se inicia a imprimir id
        cadena = `void ImprimirID() {\r\n`;

        cadena += `${temp} = P + 1;\r\n`;
        //cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${temp1} = stack[(int)${temp}];\r\n`;
        cadena += `${ls}:\r\n`;
        cadena += `${temp2} = ${temp1} + 1;\r\n`;
        cadena += `${temp3} = heap[(int)${temp2}];\r\n`;
        cadena += `if (${temp3} == -1) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;
        
        cadena += `printf(${formateador}${temp3});\r\n`;
        cadena += `${temp1} = ${temp2};\r\n`;

        cadena += `goto ${ls};\r\n`;

        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        return cadena;        
    }

    imprimirAtrValor(){ //(spInicio)
        let cadena = ``;
        let temp = this.crearTemporal();
        let temp1 = this.crearTemporal();
        let temp2 = this.crearTemporal();
        let temp3 = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        let ls = this.crearEtiqueta();
        
        let formateador = "\"%c\", (char)";

        //Se inicia a imprimir atributo valor
        cadena = `void ImprimirAtrValor() {\r\n`;

        cadena += `${temp} = P + 1;\r\n`;
        //cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${temp1} = stack[(int)${temp}];\r\n`;
        cadena += `${ls}:\r\n`;
        cadena += `${temp2} = ${temp1} + 1;\r\n`;
        cadena += `${temp3} = heap[(int)${temp2}];\r\n`;
        cadena += `if (${temp3} == -1) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;
        
        cadena += `printf(${formateador}${temp3});\r\n`;
        cadena += `${temp1} = ${temp2};\r\n`;

        cadena += `goto ${ls};\r\n`;

        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        return cadena;        
    }

    imprimirValor(){ //(spInicio)
        let cadena = ``;
        let temp = this.crearTemporal();
        let temp1 = this.crearTemporal();
        let temp2 = this.crearTemporal();
        let temp3 = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        let ls = this.crearEtiqueta();
        
        let formateador = "\"%c\", (char)";

        //Se inicia a imprimir valor
        cadena = `void ImprimirValor() {\r\n`;

        cadena += `${temp} = P + 1;\r\n`;
        //cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${temp1} = stack[(int)${temp}];\r\n`;
        cadena += `${ls}:\r\n`;
        cadena += `${temp2} = ${temp1} + 1;\r\n`;
        cadena += `${temp3} = heap[(int)${temp2}];\r\n`;
        cadena += `if (${temp3} == -1) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;
        
        cadena += `printf(${formateador}${temp3});\r\n`;
        cadena += `${temp1} = ${temp2};\r\n`;

        cadena += `goto ${ls};\r\n`;

        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        return cadena;        
    }

    guardarConsulta(consulta){
        let cadena = ``;
        let tempInicio = this.crearTemporal();
        //let temp = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        let hpInicio = 0;
        let spInicio = this.stack.lista.length;

        //Se inicia a guardar consulta
        cadena = `void ConsultaG() {\r\n`;
        cadena += `if (4 != 1) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;
        cadena += `${tempInicio} = H;\r\n`;
        hpInicio = this.heap.hp;

        cadena += `heap[(int)H] = 230; //Guardo esto en heap "Inicio Consulta" \r\n`;
        cadena += this.getHP();
        this.heap.lista.push(230);
        this.heap.hp++;


        for (let index = 0; index < consulta.length; index++) {
            cadena += `heap[(int)H] = ${consulta[index].charCodeAt(0)}; //Guardo esto en heap ${consulta[index]} \r\n`;
            cadena += this.getHP();
            this.heap.lista.push(consulta[index].charCodeAt(0));
            this.heap.hp++;
        }
        cadena += `heap[(int)H] = -1; //Guardo esto en heap -1 \r\n`;
        cadena += this.getHP();
        this.heap.lista.push(-1);
        this.heap.hp++;

        cadena += `stack[(int)${spInicio}] = ${tempInicio};\r\n`;
        this.stack.lista[spInicio] = hpInicio;

        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        let matchID = this.matchID(spInicio);
        cadena += matchID;

        return cadena;

    }

    matchID(spInicio){
        let cadena = ``;
        let temp = this.crearTemporal();
        let temp1 = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        
        let formateador = "\"%c\", (char)";
        
        //Se inicia a imprimir Consulta
        cadena = `void MatchId() {\r\n`;

        cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${temp1} = heap[(int)${temp}];\r\n`;

        cadena += `if (${temp1} == 225) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;

        temp = this.crearTemporal();
        temp1 = this.crearTemporal();
        let temp2 = this.crearTemporal();

        let lv1 = this.crearEtiqueta();
        let lf1 = this.crearEtiqueta();
        let ls = this.crearEtiqueta();

        cadena += `${temp} = stack[(int)${spInicio}];\r\n`;
        cadena += `${ls}:\r\n`;
        cadena += `${temp1} = ${temp} + 1;\r\n`;
        cadena += `${temp2} = heap[(int)${temp1}];\r\n`;
        cadena += `if (${temp2} == -2) goto ${lv1};\r\n`;
        cadena += `goto ${lf1};\r\n`;
        cadena += `${lv1}:\r\n`;
        
        cadena += `printf(${formateador}${temp2});\r\n`;
        cadena += `${temp} = ${temp1};\r\n`;

        cadena += `goto ${ls};\r\n`;

        cadena += `${lf1}:\r\n`;
        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        return cadena;
    }

    matchAtributo(){
        let cadena = ``;
        let temp0 = this.crearTemporal();
        let temp = this.crearTemporal();
        let temp1 = this.crearTemporal();
        let lv = this.crearEtiqueta();
        let lf = this.crearEtiqueta();
        
        let formateador = "\"%c\", (char)";
        
        //Se inicia a imprimir Consulta
        cadena = `void MatchAtr() {\r\n`;

        cadena += `${temp0} = P + 1;\r\n`;
        cadena += `${temp} = stack[(int)${temp0}];\r\n`;
        cadena += `${temp1} = heap[(int)${temp}];\r\n`;

        cadena += `if (${temp1} == 225) goto ${lv};\r\n`;
        cadena += `goto ${lf};\r\n`;
        cadena += `${lv}:\r\n`;

        temp0 = this.crearTemporal();
        temp = this.crearTemporal();
        temp1 = this.crearTemporal();
        let temp2 = this.crearTemporal();

        let lv1 = this.crearEtiqueta();
        let lf1 = this.crearEtiqueta();
        let ls = this.crearEtiqueta();

        cadena += `${temp} = P + 1;\r\n`;
        cadena += `${temp} = stack[(int)${temp0}];\r\n`;
        cadena += `${ls}:\r\n`;
        cadena += `${temp1} = ${temp} + 1;\r\n`;
        cadena += `${temp2} = heap[(int)${temp1}];\r\n`;
        cadena += `if (${temp2} == -2) goto ${lv1};\r\n`;
        cadena += `goto ${lf1};\r\n`;
        cadena += `${lv1}:\r\n`;
        
        cadena += `printf(${formateador}${temp2});\r\n`;
        cadena += `${temp} = ${temp1};\r\n`;

        cadena += `goto ${ls};\r\n`;

        cadena += `${lf1}:\r\n`;
        cadena += `${lf}:\r\n`;
        cadena += `return;\r\n`;

        cadena += `}\r\n`;

        return cadena;
    }
}