import { Etiqueta } from './Etiqueta';

export class AST {
        public instrucciones: Array<Etiqueta>;
        public etiquetas: Array<Etiqueta>;
        public etiquetasBetadas: Array<string>;

        public constructor(instrucciones: Array<Etiqueta>) {
            this.instrucciones = instrucciones;
            this.etiquetas = new Array<Etiqueta>();
            this.etiquetasBetadas = new Array<string>();
        }

        public AST(instrucciones: Array<Etiqueta>) {
            this.instrucciones = instrucciones;
            this.etiquetas = new Array<Etiqueta>();
            this.etiquetasBetadas = new Array<string>();
        }

        public existeEtiqueta(id:string ): boolean {
            this.etiquetas.forEach(Element => {
                //let comparacion = Element.id.Equals(id);
                if (Element.id == id) return true;
            });
            return false;
        }

        public agregarEtiqueta(etiqueta: Etiqueta) {
            this.etiquetas.push(etiqueta);
        }

        public obtenerEtiqueta(texto: string): Etiqueta {
            this.etiquetas.forEach(Element => {
                if(Element.id == texto) return Element
            });
            
            return null;
        }

        public obtenerSiguienteEtiqueta(texto: string): Etiqueta {
            let contador = 0;
            this.etiquetas.forEach(Element => {
                if(Element.id == texto) {
                    if(this.etiquetas.length > contador +1) return this.etiquetas[contador + 1]
                }
            });
            return null;
        }

    }