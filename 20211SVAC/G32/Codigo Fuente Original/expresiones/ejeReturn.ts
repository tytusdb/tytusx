export class Retorno {
  has_value: boolean;
  value: any;

  constructor( has_value: boolean, value: any) {
    Object.assign(this, { has_value, value });
  }

  hasValue(): boolean {
    return this.has_value;
  }

  getValue(): any {
    return this.value;
  }
}