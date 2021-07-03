"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLTranslator = void 0;
var XMLTranslator = /** @class */ (function () {
    function XMLTranslator(root) {
        this.root = root;
    }
    XMLTranslator.prototype.set3DCode = function (node) {
        var stack_temp = XMLTranslator.getNextTemp();
        XMLTranslator.code_definition = XMLTranslator.code_definition + ("float " + stack_temp + " = SP;\n        ");
        this.stack_index_ = XMLTranslator.stack_index;
        XMLTranslator.stack_index = XMLTranslator.stack_index + 4;
        XMLTranslator.code_definition = XMLTranslator.code_definition + ("SP = " + XMLTranslator.stack_index + ";\n        STACK[(int)" + stack_temp + "] = (float) " + XMLTranslator.heap_index + ";         \n        ");
        XMLTranslator.pushStringToHeap(this.root.id_open);
        this.setContent(stack_temp);
        this.setAttributes(stack_temp);
        this.setChildren(stack_temp, node);
    };
    /*
 1) tipo
 2) apuntador al valor si es string o valor si es number
*/
    XMLTranslator.prototype.setContent = function (current_stack_index) {
        var temp_content_index = XMLTranslator.heap_index;
        var temp = XMLTranslator.getNextTemp();
        if (this.root.value == null) {
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("\n            int " + temp + " = " + current_stack_index + " + 1;\n            STACK[(int) " + temp + "] = (float) -1;\n            ");
            return;
        }
        else {
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("\n            int " + temp + " = " + current_stack_index + " + 1;\n            STACK[(int) " + temp + "] = (float) " + XMLTranslator.heap_index + ";\n            ");
            var str_val = this.root.value;
            if (isNaN(Number(str_val))) { // Is string
                XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + XMLTranslator.heap_index + ";\n            HEAP[" + temp + "] = 2;");
                XMLTranslator.heap_index++;
                XMLTranslator.pushStringToHeap(str_val);
            }
            else { //Is Number
                XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + XMLTranslator.heap_index + ";\n            HEAP[" + temp + "] = 1;");
                XMLTranslator.heap_index++;
                XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + XMLTranslator.heap_index + ";\n                HEAP[" + temp + "] = " + str_val + ";\n                ");
                XMLTranslator.heap_index++;
            }
        }
    };
    XMLTranslator.prototype.setAttributes = function (current_heap_index) {
        var temp = XMLTranslator.getNextTemp();
        if (this.root.attributes == null) {
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("\n            float " + temp + " = " + current_heap_index + " + 2;\n            STACK[(int) " + temp + "] = (float) -1;\n            ");
            return;
        }
        else {
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("/*  ***********Atributos********** */\n            float " + temp + " = " + current_heap_index + " + 2;\n            STACK[(int) " + temp + "] = (float) " + XMLTranslator.heap_index + ";\n            ");
            // temp_att_gen_index es el indice para mis atributos y el heap es el indice para los actual key value
            var temp_att_gen_index = XMLTranslator.heap_index;
            XMLTranslator.heap_index = XMLTranslator.heap_index + this.root.attributes.length + 1;
            for (var i = 0; i < this.root.attributes.length; i++) {
                var temp1 = XMLTranslator.getNextTemp();
                var index_attr = XMLTranslator.setSingleAttribute(this.root.attributes[i]);
                XMLTranslator.code_definition = XMLTranslator.code_definition + ("\n                float " + temp1 + " = " + (temp_att_gen_index + i) + ";  \n                HEAP[(int) " + temp1 + "] = " + index_attr + ";\n                ");
            }
            var temp2 = XMLTranslator.getNextTemp();
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("float " + temp2 + " = " + (temp_att_gen_index + this.root.attributes.length) + ";\n            HEAP[(int)" + temp2 + "] = 0;\n            "); //TODO: \\0
        }
    };
    /*
    1) reservar su memoria en heap
    2) devolverme su indice inicial

    Type = 1 number; = 2 String
        */
    XMLTranslator.setSingleAttribute = function (attr) {
        var temp_att_index = XMLTranslator.heap_index;
        XMLTranslator.heap_index = XMLTranslator.heap_index + 4; // 1) key 2) value 3) type 4) NULL
        var temp = XMLTranslator.getNextTemp();
        var attr_id_index = XMLTranslator.setAttributeKey(attr.id.slice(0, -1));
        XMLTranslator.code_definition = XMLTranslator.code_definition + ("\n        /*Start single attribute*/\n        int " + temp + " = " + temp_att_index + ";\n        HEAP[ " + temp + "] = " + attr_id_index + ";  \n                ");
        temp_att_index++;
        var attr_val = attr.value.slice(0, -1).substring(1);
        if (isNaN(Number(attr_val))) { // Is string
            XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + temp_att_index + ";\n            HEAP[" + temp + "] = 2;\n            ");
            temp_att_index++;
            var attr_val_index = XMLTranslator.setAttributeValue(attr.value.slice(0, -1).substring(1));
            XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + temp_att_index + ";\n        HEAP[(int) " + temp + "] = " + attr_val_index + ";  \n                ");
            temp_att_index++;
        }
        else { // Is number
            XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + temp_att_index + ";\n            HEAP[" + temp + "] = 1;\n            ");
            temp_att_index++;
            XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + temp_att_index + ";\n        HEAP[(int) " + temp + "] = " + attr_val + ";  \n                ");
            temp_att_index++;
        }
        XMLTranslator.code_definition = XMLTranslator.code_definition + (temp + " = " + temp_att_index + ";\n        HEAP[(int) " + temp + "] = 0;\n        /*End single attribute*/\n                "); //TODO \\0
        return temp_att_index - 3;
    };
    XMLTranslator.setAttributeKey = function (val) {
        var temp = XMLTranslator.heap_index;
        XMLTranslator.pushStringToHeap(val);
        return temp;
    };
    XMLTranslator.setAttributeValue = function (val) {
        var temp = XMLTranslator.heap_index;
        XMLTranslator.pushStringToHeap(val);
        return temp;
    };
    XMLTranslator.prototype.setChildren = function (current_heap_index, node) {
        var temp = XMLTranslator.getNextTemp();
        if (this.root.childs == null) {
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("\n            float " + temp + " = " + current_heap_index + " + 3;\n            STACK[(int) " + temp + "] = (float) -1;\n            ");
            return;
        }
        else {
            var temp_att_index = XMLTranslator.heap_index;
            XMLTranslator.heap_index = XMLTranslator.heap_index + this.root.childs.length + 1;
            for (var i = 0; i < this.root.childs.length; i++) {
                this.set3DCode(this.root.childs[i]);
            }
            for (var i = 0; i < this.root.childs.length; i++) {
                var temp1 = XMLTranslator.getNextTemp();
                XMLTranslator.code_definition = XMLTranslator.code_definition + ("float " + temp1 + " = " + (temp_att_index + i) + "; \n                HEAP[(int) " + temp1 + "] = " + this.root.childs[i].stack_index_ + ";\n                ");
            }
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("float " + temp + " = " + current_heap_index + " + 3;\n            STACK[(int) " + temp + "] = (float) " + temp_att_index + ";\n            ");
        }
    };
    XMLTranslator.pushStringToHeap = function (str_val) {
        for (var i = 0; i < str_val.length; i++) {
            var temp_1 = XMLTranslator.getNextTemp();
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("float " + temp_1 + " = " + XMLTranslator.heap_index + ";\n            HEAP[(int)" + temp_1 + "] = (float) " + str_val[i].charCodeAt(0) + ";\n            ");
            XMLTranslator.heap_index++;
            XMLTranslator.code_definition = XMLTranslator.code_definition + ("HP = " + XMLTranslator.heap_index + ";\n            ");
        }
        var temp = XMLTranslator.getNextTemp();
        XMLTranslator.code_definition = XMLTranslator.code_definition + ("float " + temp + " = HP;\n            HEAP[(int)" + temp + "] = (float) 0;\n            ");
        XMLTranslator.heap_index++;
        /*Element.code_definition = Element.code_definition + `HP = ${Element.heap_index};

        Heap pointer value is ${Element.heap_index}
        Stack pointer value is ${Element.stack_index}

            `;*/
    };
    XMLTranslator.getNextTemp = function () {
        XMLTranslator.temp_counter++;
        var temp = XMLTranslator.temp_counter;
        return "t" + temp;
    };
    XMLTranslator.temp_counter = -1;
    XMLTranslator.heap_index = 0;
    XMLTranslator.stack_index = 0;
    XMLTranslator.code_definition = "";
    return XMLTranslator;
}());
exports.XMLTranslator = XMLTranslator;
//# sourceMappingURL=XMLTranslator.js.map