import {Element} from "../model/xml/Element";
import {Atributo} from "../model/xml/Atributo";

export class XMLTranslator{

    static temp_counter: number = -1;
    static heap_index: number = 0;
    static stack_index: number = 0;
    static code_definition: string = "";
    stack_index_: number;

    constructor(public root: Element) {
    }

    public set3DCode(node: Element){
        let stack_temp: string = XMLTranslator.getNextTemp();
        XMLTranslator.code_definition = XMLTranslator.code_definition + `float ${stack_temp} = SP;
        `;
        this.stack_index_ = XMLTranslator.stack_index;
        XMLTranslator.stack_index = XMLTranslator.stack_index + 4;
        XMLTranslator.code_definition = XMLTranslator.code_definition + `SP = ${XMLTranslator.stack_index};
        STACK[(int)${stack_temp}] = (float) ${XMLTranslator.heap_index};         
        `;
        XMLTranslator.pushStringToHeap(this.root.id_open);
        this.setContent(stack_temp);
        this.setAttributes(stack_temp);
        this.setChildren(stack_temp, node);
    }

    /*
 1) tipo
 2) apuntador al valor si es string o valor si es number
*/
    private setContent(current_stack_index: string){
        let temp_content_index: number = XMLTranslator.heap_index;
        let temp: string = XMLTranslator.getNextTemp();
        if (this.root.value == null){
            XMLTranslator.code_definition = XMLTranslator.code_definition + `
            int ${temp} = ${current_stack_index} + 1;
            STACK[(int) ${temp}] = (float) -1;
            `;
            return;
        }else{
            XMLTranslator.code_definition = XMLTranslator.code_definition + `
            int ${temp} = ${current_stack_index} + 1;
            STACK[(int) ${temp}] = (float) ${XMLTranslator.heap_index};
            `;
            let str_val: string = this.root.value;
            if(isNaN(Number(str_val))) {// Is string
                XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${XMLTranslator.heap_index};
            HEAP[${temp}] = 2;`;
                XMLTranslator.heap_index++;
                XMLTranslator.pushStringToHeap(str_val);
            }else{ //Is Number
                XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${XMLTranslator.heap_index};
            HEAP[${temp}] = 1;`;
                XMLTranslator.heap_index++;
                XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${XMLTranslator.heap_index};
                HEAP[${temp}] = ${str_val};
                `;
                XMLTranslator.heap_index++;
            }



        }
    }

    private setAttributes(current_heap_index: string){
        let temp: string = XMLTranslator.getNextTemp();
        if (this.root.attributes == null){
            XMLTranslator.code_definition = XMLTranslator.code_definition + `
            float ${temp} = ${current_heap_index} + 2;
            STACK[(int) ${temp}] = (float) -1;
            `;
            return;
        }else{
            XMLTranslator.code_definition = XMLTranslator.code_definition + `/*  ***********Atributos********** */
            float ${temp} = ${current_heap_index} + 2;
            STACK[(int) ${temp}] = (float) ${XMLTranslator.heap_index};
            `;
            // temp_att_gen_index es el indice para mis atributos y el heap es el indice para los actual key value
            let temp_att_gen_index: number = XMLTranslator.heap_index;
            XMLTranslator.heap_index = XMLTranslator.heap_index +  this.root.attributes.length + 1;

            for (let i = 0; i < this.root.attributes.length; i++){
                let temp1: string = XMLTranslator.getNextTemp();
                let index_attr =  XMLTranslator.setSingleAttribute(this.root.attributes[i]);
                XMLTranslator.code_definition = XMLTranslator.code_definition + `
                float ${temp1} = ${temp_att_gen_index + i};  
                HEAP[(int) ${temp1}] = ${index_attr};
                `;
            }
            let temp2: string = XMLTranslator.getNextTemp();
            XMLTranslator.code_definition = XMLTranslator.code_definition + `float ${temp2} = ${temp_att_gen_index + this.root.attributes.length};
            HEAP[(int)${temp2}] = 0;
            `;//TODO: \\0
        }
    }

    /*
    1) reservar su memoria en heap
    2) devolverme su indice inicial

    Type = 1 number; = 2 String
        */

    private static setSingleAttribute(attr: Atributo ):number{

        let temp_att_index: number = XMLTranslator.heap_index;
        XMLTranslator.heap_index = XMLTranslator.heap_index + 4;// 1) key 2) value 3) type 4) NULL
        let temp: string = XMLTranslator.getNextTemp();
        let attr_id_index = XMLTranslator.setAttributeKey(attr.id.slice(0,-1));
        XMLTranslator.code_definition = XMLTranslator.code_definition + `
        /*Start single attribute*/
        int ${temp} = ${temp_att_index};
        HEAP[ ${temp}] = ${attr_id_index};  
                `;
        temp_att_index++;

        let attr_val: string = attr.value.slice(0,-1).substring(1);
        if(isNaN(Number(attr_val))){// Is string
            XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${temp_att_index};
            HEAP[${temp}] = 2;
            `;
            temp_att_index++;
            let attr_val_index = XMLTranslator.setAttributeValue(attr.value.slice(0,-1).substring(1));
            XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${temp_att_index};
        HEAP[(int) ${temp}] = ${attr_val_index};  
                `;
            temp_att_index++;
        }else { // Is number
            XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${temp_att_index};
            HEAP[${temp}] = 1;
            `;
            temp_att_index++;
            XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${temp_att_index};
        HEAP[(int) ${temp}] = ${attr_val};  
                `;
            temp_att_index++;
        }

        XMLTranslator.code_definition = XMLTranslator.code_definition + `${temp} = ${temp_att_index};
        HEAP[(int) ${temp}] = 0;
        /*End single attribute*/
                `;//TODO \\0
        return temp_att_index - 3;
    }

    private static setAttributeKey(val:string):number{
        let temp: number = XMLTranslator.heap_index;
        XMLTranslator.pushStringToHeap(val);
        return temp;
    }

    private static setAttributeValue(val:string):number{
        let temp: number = XMLTranslator.heap_index;
        XMLTranslator.pushStringToHeap(val);
        return temp;
    }


    private setChildren(current_heap_index: string, node: Element){
        let temp: string = XMLTranslator.getNextTemp();
        if (this.root.childs == null){
            XMLTranslator.code_definition = XMLTranslator.code_definition + `
            float ${temp} = ${current_heap_index} + 3;
            STACK[(int) ${temp}] = (float) -1;
            `;
            return;
        }else{
            let temp_att_index: number = XMLTranslator.heap_index;
            XMLTranslator.heap_index = XMLTranslator.heap_index + this.root.childs.length + 1;
            for (let i = 0; i < this.root.childs.length;i++){
                this.set3DCode(this.root.childs[i]);
            }
            for (let i = 0; i < this.root.childs.length;i++){
                let temp1: string = XMLTranslator.getNextTemp();

                XMLTranslator.code_definition = XMLTranslator.code_definition + `float ${temp1} = ${temp_att_index + i}; 
                HEAP[(int) ${temp1}] = ${this.root.childs[i].stack_index_};
                `;
            }
            XMLTranslator.code_definition = XMLTranslator.code_definition + `float ${temp} = ${current_heap_index} + 3;
            STACK[(int) ${temp}] = (float) ${temp_att_index};
            `;
        }
    }

    private static pushStringToHeap(str_val){

        for(let i = 0; i < str_val.length; i++){
            let temp = XMLTranslator.getNextTemp();
            XMLTranslator.code_definition = XMLTranslator.code_definition + `float ${temp} = ${XMLTranslator.heap_index};
            HEAP[(int)${temp}] = (float) ${str_val[i].charCodeAt(0)};
            `;
            XMLTranslator.heap_index ++;
            XMLTranslator.code_definition = XMLTranslator.code_definition + `HP = ${XMLTranslator.heap_index};
            `;
        }
        let temp = XMLTranslator.getNextTemp();
        XMLTranslator.code_definition = XMLTranslator.code_definition + `float ${temp} = HP;
            HEAP[(int)${temp}] = (float) 0;
            `;
        XMLTranslator.heap_index ++;
        /*Element.code_definition = Element.code_definition + `HP = ${Element.heap_index};

        Heap pointer value is ${Element.heap_index}
        Stack pointer value is ${Element.stack_index}

            `;*/
    }


    public static getNextTemp():string{
        XMLTranslator.temp_counter++;
        let temp: number = XMLTranslator.temp_counter;
        return "t" + temp;
    }

}