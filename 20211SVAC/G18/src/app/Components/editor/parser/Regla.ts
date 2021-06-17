export class Regla_{
    
    constructor(private rsintactica : string, private rsemantica : string){

    }
    getRSint() { return this.rsintactica }
    getRSema() { return this.rsemantica }

    htmlRow() : string {       
        let result = "<td>"+this.rsintactica+"</td>";
        result += "<td>"+this.rsemantica+"</td>";
        return result;
    }
}