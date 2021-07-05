export class NodeError {
  lexeme: string;
  typeerror: string;
  description: string;
  row: number;
  column: number;
  language: string;

  constructor(
    lexeme: string,
    typeerror: string,
    description: string,
    row: number,
    column: number,
    language: string
  ) {
    this.lexeme = lexeme;
    this.typeerror = typeerror;
    this.description = description;
    this.row = row;
    this.column = column;
    this.language = language;
  }
}
