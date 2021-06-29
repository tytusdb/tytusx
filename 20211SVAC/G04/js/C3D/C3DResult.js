class C3DResult {
    constructor(codigo, sp, nextTemp, nextLabel, entornos) {
        this.codigo = codigo;
        this.sp = sp;
        this.nextTemp = nextTemp;
        this.nextLabel = nextLabel;
        this.entornos = entornos;
    }
    getCodigo() {
        return this.codigo;
    }
    setCodigo(codigo) {
        this.codigo = codigo;
    }
    getSp() {
        return this.sp;
    }
    setSp(sp) {
        this.sp = sp;
    }
    getNextTemp() {
        return this.nextTemp;
    }
    setNextTemp(nextTemp) {
        this.nextTemp = nextTemp;
    }
    getNextLabel() {
        return this.nextLabel;
    }
    setNextLabel(nextLabel) {
        this.nextLabel = nextLabel;
    }
    getEntornos() {
        return this.entornos;
    }
    setEntornos(entornos) {
        this.entornos = entornos;
    }
}
