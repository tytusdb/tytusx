import { NodeXml } from "../../AnalizerXML";

export class SymbolXml {
  private myIndex: number;

  constructor(
    public readonly node: NodeXml,
    public readonly indexParent: number | undefined
  ) {
    this.myIndex = -1;
  }

  isRoot(): boolean {
    return this.indexParent === undefined;
  }

  setIndex(index: number): void {
    this.myIndex = index;
  }

  getIndex(): number {
    if (this.myIndex === -1) {
      throw new Error("Error an index was not sent to the symbol");
    }
    return this.myIndex;
  }
}
