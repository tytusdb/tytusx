import { Nativas } from "./Nativas";

export class GeneradorC3D {
    private static generador: GeneradorC3D;
    private temporal: number;
    private label: number;
    private code: string[];
    codeFuncion: string[];
    private tempStorage: Set<string>;
    isFunc = '';

    /**
     * constructor de la clase singleton
     */
    constructor() {
        this.temporal = this.label = 0;
        this.code = [];
        this.codeFuncion = [];
        this.tempStorage = new Set();
    }

    public agregarFuncion(funcion: string[]) {
        funcion.forEach((fun) => {
            this.codeFuncion.push(fun);
        });
    }

    /**
     * Obtiene la instancia de la clase singleton
     */
    public static getInstancia() {
        return this.generador || (this.generador = new this());
    }

    /**
     * Retorna el set de los temporales que estan en uso
     */
    public getTempStorage() {
        return this.tempStorage;
    }

    /**
     * Vacia el set de los temporales
     */
    public clearTempStorage() {
        this.tempStorage.clear();
    }

    /**
     * asigna el set al set local de temporales
     * @param tempStorage lista tipo Set que se asignara al set local
     */
    public setTempStorage(tempStorage: Set<string>) {
        this.tempStorage = tempStorage;
    }

    /**
     * borra el C3D que tenga guardado la clase y reinicia los temporales y labels
     */
    public clearCode() {
        this.temporal = this.label = 0;
        this.code = [];
        this.codeFuncion = [];
        this.tempStorage = new Set();

    }

    public clearSoloCode() {
        this.code = [];
    }

    /**
     * Ingresa en el C3D el valor que se asigna como parametro
     * @param code valor que se asignara al C3D de la clase
     */
    public genCode(code: string) {
        this.code.push(this.isFunc + code);
    }

    /**
     * Retorna el C3D que se haya generado en la clase singleton
     */
    public getCode() {
        let nativas = new Nativas();
        let encabezado = '#include <stdio.h>\n#include <math.h>\ndouble Stack[60000]; double Heap[60000];\nint p; int h;\n';
        let main = `\nint main() {\n${this.code.join('\n')}\n\nreturn 0;\n}\n`;
        const funciones = this.codeFuncion.join('\n');
        this.code = [];
        let strNativas = nativas.generarNativas();
        //strNativas = ''; // comentar despues de terminar
        let c3d = `${encabezado}${this.getTemporales()};\n${strNativas}\n${funciones}\n${main}`;

        return c3d;
    }

    getSoloCode() {
        return this.code;
    }

    setSoloCode(codeA: string[]) {
        this.code = codeA;
    }

    getNativas() {
        return this.code.join('\n');
    }


    getTemporales() {
        let lista = 'double ';
        for (let i = 0; i < this.temporal; i++) {
            lista += 'T' + i;
            lista += i < this.temporal - 1 ? ',' : '';
        }
        return lista;
    }

    /**
     * Crea un nuevo temporal y lo retorna
     */
    public newTemporal(): string {
        const temp = 'T' + this.temporal++;
        this.tempStorage.add(temp);
        return temp;
    }

    /**
     * Crea una nueva etiqueta y la retorna
     */
    public newLabel(): string {
        return 'L' + this.label++;
    }

    /**
     * funcion que agrega una nueva etiqueta el C3D
     * @param label valor que se agregara al C3D como tipo etiqueta
     */
    public genLabel(label: string) {
        this.code.push(`${this.isFunc}${label}:`);
    }

    /**
     * Genera una nueva expresion y la agrega al C3D 
     * @param tem Temporal al que se le asignara la expresion
     * @param izq Expresion izquierda que se asignara al temporal
     * @param der Expresion derecha que se asignara al temporal
     * @param operator Operador de la expresion 
     */
    public genExpresion(tem: string, iqz: any, der: any = '', operator: string = '') {
        this.code.push(`${this.isFunc}${tem} = ${iqz} ${operator} ${der};`);
    }

    /**
     * asigna un valor a un temporal o puntero
     * @param tem variable que recibira el valor
     * @param val valor que sera asignado
     */
    public genAsignacion(tem: string, val: string) {
        this.code.push(`${this.isFunc}${tem} = ${val};`);
    }

    /**
     * genera un goto con el valor de label y lo agrega el C3D
     * @param label valor de etiqueta al cual se hara el goto
     */
    public genGoto(label: string) {// prnGoto
        this.code.push(`${this.isFunc}goto ${label};`);
    }

    /**
     * genera un if y lo agrega al C3D
     * @param iqz Expresion izquierda de la condicion if
     * @param der Expresion derecha de la condicion if
     * @param operator Operador boleano de la condicion
     * @param label Etiqueta de salto si la condicion es verdadera
     */
    public genIf(iqz: any, der: any, operator: string, label: string) {
        this.code.push(`${this.isFunc}if (${iqz} ${operator} ${der}) goto ${label};`);
    }

    /**
     * Intruccion que hace avanzar el puntero heap a su siguite posicion
     */
    public avanzarHeap() { //nextHeap
        this.code.push(this.isFunc + 'h = h + 1;');
    }
    
    /**
     * genera un acceso al heap en la posicion index y lo asiga al tem
     * @param tem temporal que recibira el valor del heap
     * @param index posicion del heap al cual se accedera
     */
    public genGetHeap(tem: any, index: any) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}${tem} = Heap[${index}];`);
    }

    /**
     * genera una asignacion de valor al heap en la posicion index
     * @param index posicion del heap al cual se desea acceder
     * @param valor valor que se asignara a la posicion del heap
     */
    public genSetHeap(index: any, valor: any) { // prnsetheap
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}Heap[${index}] = ${valor};`);
    }

    /**
     * genera una asignacion a tem del valor del stack en la posicion index
     * @param tem temporal al cual se asignara el valor del stack
     * @param index posicion del stack al cual se desea acceder
     */
    public genGetStack(tem: any, index: any) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}${tem} = Stack[${index}];`);
    }

    /**
     * genera una asignacion al stack en la posicion index
     * @param index posicion del stack al cual se desea acceder
     * @param value valor que sera asignado al stack
     */
    public genSetStack(index: any, value: any) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}Stack[${index}] = ${value};`);
    }

    /**
     * genera un desplazamiento del stack para generar un nuevo ambito
     * @param size posiciones que se desplazara el stack
     */
    public genNextEnv(size: number) {
        this.code.push(`${this.isFunc}p = p + ${size};`);
    }

    /**
     * genera un desplazamiento del stack para volver a un ambito anterios
     * @param size posiciones que se desplazara el stack
     */
    public genAntEnv(size: number) {
        this.code.push(`${this.isFunc}p = p - ${size};`);
    }

    /**
     * genera una llamada a una funcion
     * @param id nombre de la funcion
     */
    public genCall(id: string) {
        this.code.push(`${this.isFunc}${id}();`);
    }

    /**
     * Genera el encabezado de una funcion 
     * @param id nombre de la funcion
     */
    public genFuncion(id: string) {
        this.code.push(`\nvoid ${id}() {`);
    }

    /**
     * Genera el cierre de la definicion de una funcion
     */
    public genEndFuncion() {
        this.code.push('}')
    }

    /**
     * genera un printf con el tipo de dato y el valor
     * @param formato tipo de dato que se va a imprimir
     * @param valor valor que se va a imprimir
     */
    public genPrint(formato: string, valor: any) {
        valor = valor[0] === 'T' && formato !== 'f' ? '(int)' + valor : valor;
        this.code.push(`${this.isFunc}printf("%${formato}",${valor});`);
    }

    /**
     * genera un print del valor true
     */
    public genPrintTrue() {
        this.genPrint('c', 't'.charCodeAt(0));
        this.genPrint('c', 'r'.charCodeAt(0));
        this.genPrint('c', 'u'.charCodeAt(0));
        this.genPrint('c', 'e'.charCodeAt(0));
    }

    /**
     * genera un print del valor false
     */
    public genPrintFalse() {
        this.genPrint('c', 'f'.charCodeAt(0));
        this.genPrint('c', 'a'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
        this.genPrint('c', 's'.charCodeAt(0));
        this.genPrint('c', 'e'.charCodeAt(0));
    }

    /**
     * genera un print del valor null
     */
    public genPrintNull() {
        this.genPrint('c', 'n'.charCodeAt(0));
        this.genPrint('c', 'u'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
    }

    /**
     * genera un nuevo comentario
     * @param comment valor del comentario
     */
    public genComentario(comment: string) {
        this.code.push(`${this.isFunc}// ----- ${comment} -----`);
    }

    /**
     * borra un temporal del storage
     * @param temp temporal que ya no se utilizara 
     */
    public freeTemp(temp: string) {
        if (this.tempStorage.has(temp)) {
            this.tempStorage.delete(temp);
        }
    }

    /**
     * agrega un temporal al storage
     * @param temp temporal que se agregara al storage
     */
    public genTemp(temp: string) {
        if (!this.tempStorage.has(temp))
            this.tempStorage.add(temp);
    }
}