class CST {
    constructor() {
        this.id = 0;
        this.pila = [];
        this.raiz = null;
    }
    agregarPila(nodo) {
        this.pila.push(nodo);
    }
    obtenerUltimoNodo() {
        return this.pila.pop();
    }
    setRaiz(root) {
        this.raiz = root;
    }
    getRaiz() {
        return this.raiz;
    }
    getId() {
        this.id = this.id + 1;
        return this.id;
    }
}
const cstXmlAsc = new CST();
const cstXmlDesc = new CST();
const cstXpathAsc = new CST();
const cstXpathDesc = new CST();
export { cstXmlAsc, cstXmlDesc, cstXpathAsc, cstXpathDesc };
