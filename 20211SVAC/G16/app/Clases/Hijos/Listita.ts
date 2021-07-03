export class Listita extends Array<any>{
  constructor(){
      super();
  }

  public static add(nodo:any){
      this.prototype.push(nodo);
  }

  public static getLista(){
    return this.prototype;
  }
  public static clear(){
    while(this.prototype.length>0){
      this.prototype.pop();
    }
  }
}
