export class Graph {
  count: number;
  constructor() {
    this.count = 0;
  }
  incrementCount(): number {
    return this.count++;
  }

  getContador(): number {
    return this.count;
  }
}
