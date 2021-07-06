export class GrammarReport {
  lstValues: Array<string>;
  constructor() {
    this.lstValues = new Array<string>();
  }

  setValue(value: string): void {
    this.lstValues.push(value);
  }

  getReporte(): string {
    return this.lstValues.reverse().join("");
  }
}
