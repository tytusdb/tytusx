import "../Library/CodeMirror/xml";
import "../Library/CodeMirror/xquery";
import CodeMirror from "../Library/CodeMirror/codemirror";

const editorentrada = document.getElementById(
  "editorentrada"
) as HTMLTextAreaElement;
const editorsalida = document.getElementById(
  "editorsalida"
) as HTMLTextAreaElement;
export const editorConsola = document.getElementById(
  "consola"
) as HTMLTextAreaElement;
export const rgconsola = document.getElementById(
  "rgconsola"
) as HTMLTextAreaElement;

export const optconsola = document.getElementById(
  "optconsola"
) as HTMLTextAreaElement;

export const editorXml = CodeMirror.fromTextArea(editorentrada, {
  lineNumbers: true,
  mode: "application/xml",
  htmlMode: true,
  matchClosing: true,
  alignCDATA: true,
  autoCloseTags: true,
});

export const editorXquery = CodeMirror.fromTextArea(editorsalida, {
  lineNumbers: true,
  mode: "xquery",
});

export const consola = CodeMirror.fromTextArea(editorConsola, {
  mode: "application/xml",
  theme: "material-darker",
  lineNumbers: true,
  lineWrapping: true,
  readOnly: true,
  cursorBlinkRate: -1,
});

(consola as any).setSize("100%", 300);
