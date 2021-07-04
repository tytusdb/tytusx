export default class RepGramatical{

    private NoTerminal    : string;
    private Produccion    : string;

    constructor( symbol1 : string, symbol2 : string ){
        this.NoTerminal   = symbol1;
        this.Produccion   = symbol2;
    }

    
    public get rule() : string {
        return `<${this.NoTerminal}>  ::=  ${ this.format() }\n`
    }

    private format(): string {
        const result = this.Produccion.split(" ");
        const result2 = result.map( item => ( item.includes("\'") || item.includes("\"") ) ? item : `<${item}>` );
        return result2.join(" ");
    }
    
}