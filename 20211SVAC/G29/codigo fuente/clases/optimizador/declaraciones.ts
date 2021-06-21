import declaracion from "./declaracion";

export default class declaraciones {
  public ld: Array<declaracion>;

  constructor(ld : Array<declaracion>){
    this.ld = ld;
  }

  getText(){
    let temp : string = "";
    for(let x of  this.ld){
      temp += x.getText() + '\n';
    }
    return temp;
  }

}
