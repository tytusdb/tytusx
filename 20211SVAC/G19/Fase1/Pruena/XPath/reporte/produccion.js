"use strict";
//import {reporteGramatica} from "./reporteGramatica";
var producion = /** @class */ (function () {
    function producion() {
        this.producion = " ";
    }
    producion.prototype.getGramatica = function (tipo) {
        switch (tipo) {
            case "ini":
                this.producion += "ini \n" +
                    "\t :XPATH EOF {}\n;\n";
                break;
            case "xpath":
                this.producion += "XPATH\n" +
                    "\t::ENTRY LIST_STEP{}\n" +
                    "\t|LIST_STEP{}\n;\n";
                break;
            case "entry":
                this.producion += "ENTRY\n" +
                    "\t:slash{}\n" +
                    "\t|doubleSlash{}\n;\n";
                break;
            case "list_step":
                this.producion += "LIST_STEP\n" +
                    "\t:LIST_STEP SEPERATE STEP {}\n" +
                    "\t|STEP{}\n;\n";
                break;
            case "seperate":
                this.producion += "SEPERATE\n" +
                    "\t:barra ENTRY{} \n" +
                    "\t|barra\n" +
                    "\t|slash{}\n" +
                    "\t|doubleSlash{}\n;\n";
                break;
            case "step":
                this.producion += "STEP\n" +
                    "\t :id LIST_PREDICATE{}\n" +
                    "\t|id\n" +
                    "\t|AXIS{}\n" +
                    "\t|PATH{}\n" +
                    "\t|WILDCARD{}\n;\n";
                break;
            case "list_pred":
                this.producion += "LIST_PREDICATE\n" +
                    "\t:LIST_PREDICATE PREDICATE\n" +
                    "\t|PREDICATE\n;\n";
                break;
            case "predicate":
                this.producion += "PREDICATE\n" +
                    "\t:corcheteIzq LIST_E corcheteDer{}\n;";
                break;
            case "list_e":
                this.producion += "LIST_E\n" +
                    "\t:LIST_E OP E{}\n" +
                    "\t|E{}\n;\n";
                break;
            case "op":
                this.producion += "OP\n" +
                    "\t:add{} \n" +
                    "\t|minus{}\n" +
                    "\t|asterisk\n" +
                    "\t|slash\n" +
                    "\t|equal\n" +
                    "\t|diferent\n" +
                    "\t|menor\n" +
                    "\t|menorIgual\n" +
                    "\t|mayorIgual\n" +
                    "\t|mayor\n" +
                    "\t|or\n" +
                    "\t|barra\n" +
                    "\t|and\n" +
                    "\t|mod\n;\n";
                break;
            case "e":
                this.producion += "E\n" +
                    " \t:STEP \n" +
                    "\t|ENTRY\n" +
                    "\t|digits\n" +
                    "\t|cadena\n" +
                    "\t|decimal\n;\n";
                break;
            case "axis":
                this.producion += "AXIS\n" +
                    "\t :AXIS_NAME doubleColon STEP\n" +
                    "\t |AXIS_NAME \n;\n";
                break;
            case "axis_name":
                this.producion += "AXIS_NAME\n" +
                    "\t:ancestor{}\n" +
                    "\t|ancestor_or_self{}\n" +
                    "\t|attribute{}\n" +
                    "\t|child{}\n" +
                    "\t|descendant{}\n" +
                    "\t|descendant_or_self{}\n" +
                    "\t|following{}\n" +
                    "\t|following_sibling{}\n" +
                    "\t|namespace{}\n" +
                    "\t|parent{}\n" +
                    "\t|preceding{}\n" +
                    "\t|preceding_sibling{}\n" +
                    "\t|self{}\n;\n";
                break;
            case "wild":
                this.producion += "WILDCARD\n" +
                    "\t:asterisk{}\n" +
                    "\t|point{}\n" +
                    "\t|twoPoint\n" +
                    "\t|at asterisk{}\n" +
                    "\t|at id PREDICATE{}\n" +
                    "\t|at id{}\n" +
                    "\t|node parIzq parDer{}\n" +
                    "\t|text parIzq parDer{}\n" +
                    "\t|last parIzq parDer{}\n;\n";
                break;
            default:
                break;
        }
        return this.producion;
    };
    return producion;
}());
//# sourceMappingURL=produccion.js.map