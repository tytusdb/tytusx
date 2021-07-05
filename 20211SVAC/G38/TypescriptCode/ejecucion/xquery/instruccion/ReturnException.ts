class ReturnException extends Error{
    valor : any;
    constructor(valor: any) {
        super("msg");
        this.valor = valor;
        Object.setPrototypeOf(this,ReturnException.prototype)
    }
}