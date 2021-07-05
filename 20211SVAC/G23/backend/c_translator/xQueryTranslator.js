"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XQueryTranslator = void 0;
var Environment_1 = require("./Environment");
var Element_1 = require("../model/xml/Element");
var FOR_TYPE;
(function (FOR_TYPE) {
    FOR_TYPE[FOR_TYPE["SELECT_FROM_CURRENT"] = 0] = "SELECT_FROM_CURRENT";
    FOR_TYPE[FOR_TYPE["SELECT_FROM_ROOT"] = 1] = "SELECT_FROM_ROOT";
    FOR_TYPE[FOR_TYPE["EXPRESION"] = 2] = "EXPRESION";
})(FOR_TYPE || (FOR_TYPE = {}));
var XQueryTranslator = /** @class */ (function () {
    function XQueryTranslator(ast, root) {
        this.ast = ast;
        this.root = root;
        this.str = "";
        this.debug = false;
        this.show_obj = false;
        this.environment = new Environment_1.Environment();
        this.header = "";
        this.code = "";
        this.tagNumber = -1;
        this.varNumber = -1;
        this.funNumber = -1;
        this.functions_Arr = [];
        this.HP = Element_1.Element.heap_index;
        this.SP = Element_1.Element.stack_index;
        console.log(this.HP);
        console.log(this.SP);
    }
    XQueryTranslator.prototype.translate = function () {
        var xquery = this.ast['xquery'];
        var xpath = this.ast['xpath'];
        if (xquery != undefined) {
            this.ast = this.ast['xquery'];
            this.xQueryTranslate();
        }
        else if (xpath != undefined) {
            this.ast = this.ast['xpath'];
            this.xPathTranslate();
        }
        else {
            console.log("Error 8");
        }
    };
    XQueryTranslator.prototype.xQueryTranslate = function () {
        for (var i = 0; i < this.ast.length; i++) {
            switch (this.ast[i]['tipo']) {
                case 'FOR_LOOP':
                    this.FOR_LOOP(this.ast[i], this.environment);
                    break;
                case 'ORDER_BY_CLAUSE':
                    this.ORDER_BY_CLAUSE(this.ast[i]);
                    break;
                case 'RETURN_STATEMENT':
                    this.RETURN_STATEMENT(this.ast[i]);
                    break;
                default:
                    console.log("Error 1");
            }
        }
    };
    XQueryTranslator.prototype.xPathTranslate = function () {
    };
    XQueryTranslator.prototype.FOR_LOOP = function (obj, env) {
        if (this.debug) {
            console.log("FOR_LOOP" + (this.show_obj ? "\n" + obj : ""));
        }
        for (var i = 0; i < obj['cuerpo'].length; i++) {
            switch (obj['cuerpo'][i]['tipo']) {
                case 'DECLARACION':
                    this.DECLARACION(obj['cuerpo'][i], env);
                    break;
                default:
                    console.log("ERROR 2:\n" + obj);
            }
        }
        for (var i = 0; i < obj['instrucciones'].length; i++) {
            //TODO
        }
        /*
        switch () {
        }*/
    };
    XQueryTranslator.prototype.ORDER_BY_CLAUSE = function (obj) {
        if (this.debug) {
            console.log("ORDER_BY_CLAUSE" + (this.show_obj ? "\n" + obj : ""));
        }
    };
    XQueryTranslator.prototype.RETURN_STATEMENT = function (obj) {
        if (this.debug) {
            console.log("RETURN_STATEMENT" + (this.show_obj ? "\n" + obj : ""));
        }
    };
    XQueryTranslator.prototype.DECLARACION = function (obj, env) {
        console.log(obj);
        if (this.debug) {
            console.log('DECLARATION' + (this.show_obj ? "\n" + obj : ""));
        }
        if (obj['variable'] != null) {
            env.addVariable(obj['variable']['variable']);
        }
        else {
            console.log("ERROR 4");
        }
        //let length = obj['iterators'].length;
        var function_name = null;
        for (var i = obj['iterators'].length - 1; i >= 0; i--) {
            switch (obj['iterators'][i]['tipo']) {
                case 'SELECT_FROM_CURRENT':
                    //console.log('SELECT_FROM_CURRENT');
                    //console.log(obj['iterators'][i]);
                    function_name = this.EXPRESION(obj['iterators'][i]['expresion'], (i == 0), function_name, FOR_TYPE.SELECT_FROM_CURRENT);
                    break;
                case 'SELECT_FROM_ROOT':
                    //console.log('SELECT_FROM_ROOT');
                    //console.log(obj['iterators'][i]);
                    function_name = this.EXPRESION(obj['iterators'][i]['expresion'], (i == 0), function_name, FOR_TYPE.SELECT_FROM_ROOT);
                    break;
                case 'EXPRESION':
                    console.log('EXPRESION');
                    function_name = this.EXPRESION(obj['iterators'][i], (i == 0), function_name, FOR_TYPE.EXPRESION);
                    break;
                case 'VALORES':
                    console.log('VALORES');
                    break;
                default:
                    console.log(obj);
                    console.log("ERROR 3\n" + obj['iterators'][i]);
                    break;
            }
        }
        //TODO: al final el ultimo function name es el correcto
    };
    //fromStack if its the first iteration will look on stack
    XQueryTranslator.prototype.EXPRESION = function (obj, fromStack, next_fun, type) {
        var func_return = null;
        var predicate = obj['predicate'];
        if (predicate == null) { }
        func_return = this.expresion_(obj['expresion'], fromStack, (predicate == null ? null : this.predicate(obj['predicate'])), next_fun, type);
        console.log("***************************");
        return func_return;
    };
    XQueryTranslator.prototype.expresion_ = function (obj, fromStack, predicate_f, next_fun, type) {
        console.log(obj);
        var func_return = null;
        switch (obj['tipo']) {
            case 'NODENAME':
                //console.log(obj);
                //console.log(obj['nodename']);
                if (fromStack) {
                    if (type == FOR_TYPE.SELECT_FROM_CURRENT || type == FOR_TYPE.EXPRESION) {
                        func_return = this.setSearchMethodFromStack(obj['nodename'], predicate_f, next_fun);
                    }
                    else if (type == FOR_TYPE.SELECT_FROM_ROOT) {
                        func_return = this.setSearchMethodFromFirstStack(obj['nodename'], predicate_f, next_fun);
                    }
                    else {
                        console.log("Error 9");
                    }
                }
                else {
                    if (type == FOR_TYPE.SELECT_FROM_CURRENT) {
                        func_return = this.setSearchDoubleBar(obj['nodename'], predicate_f, next_fun);
                    }
                    else if (type == FOR_TYPE.SELECT_FROM_ROOT) {
                        func_return = this.setSearchOneBar(obj['nodename'], predicate_f, next_fun);
                    }
                    else {
                    }
                }
                /*buscar en el stack todos los que coincidan con nodeName obj['nodename']
                // push obj['nodename'] en un the heap while increasing heap counter
                // push nodename index into stack_params
                // iterate through the stack by increments of 4 send the pointer of each element to the compare funciont
                // if returns true save the element returned on the heap keeping track of the first one
                // to keep it like index*/
                break;
            case 'SELECT_CURRENT':
                //si es from root tambien usar
                console.log("Error 5");
                //console.log(obj);
                //console.log(obj['expresion']);
                break;
            default:
                console.log("Error 6");
                break;
        }
        return func_return;
    };
    XQueryTranslator.prototype.predicate = function (obj) {
        //console.log(obj);
        var function_name = this.getNextFun();
        return function_name;
    };
    XQueryTranslator.prototype.setSearchOneBar = function (node_name, predicate_f, next_fun) {
        var function_name = this.getNextFun();
        this.functions_Arr.push(function_name);
        var var1 = this.getNextVar();
        var var2 = this.getNextVar();
        var var3 = this.getNextVar();
        var var4 = this.getNextVar();
        var var5 = this.getNextVar();
        var var6 = this.getNextVar();
        var var7 = this.getNextVar();
        var var8 = this.getNextVar();
        var var9 = this.getNextVar();
        var var10 = this.getNextVar();
        var var11 = this.getNextVar();
        var var12 = this.getNextVar();
        var var13 = this.getNextVar();
        var var14 = this.getNextVar();
        var var15 = this.getNextVar();
        var tag1 = this.getNextTag();
        var tag2 = this.getNextTag();
        var tag3 = this.getNextTag();
        var tag4 = this.getNextTag();
        var tag5 = this.getNextTag();
        var tag6 = this.getNextTag();
        var tag7 = this.getNextTag();
        var tag8 = this.getNextTag();
        var tag9 = this.getNextTag();
        var tag10 = this.getNextTag();
        var tag11 = this.getNextTag();
        var tag12 = this.getNextTag();
        var tag13 = this.getNextTag();
        var tag14 = this.getNextTag();
        var tag15 = this.getNextTag();
        this.header = this.header + ("\nvoid " + function_name + "();\n");
        this.code = this.code + ("\nvoid " + function_name + "(){\n    \n    \n    int " + var1 + " = SF - 1;\n    int " + var15 + " = STACK_FUNC[" + var1 + "];//List in HEAP to pointers on STACK\n    \n    STACK_FUNC[SF] = HP; //Pointer to Node value\n    SF = SF + 1;\n");
        for (var i = 0; i < node_name.length; i++) {
            this.code = this.code + ("   HEAP[(int)HP] = " + node_name[i].charCodeAt(0) + "; //STR_val = " + node_name[i] + "\n    HP = HP + 1;\n");
        }
        this.code = this.code + ("    HEAP[(int)HP] = 0;\n    HP = HP + 1;\n\n    int " + var4 + " = HP; // sets the start of the result list\n    HEAP[(int) HP] = 0; // If no Nodes found then the list will start with 0\n\n    int " + var3 + " = " + var15 + ";\n    int " + var2 + " = HEAP[" + var3 + "];\n    \n    " + tag12 + "://inicio del primer for\n    if(" + var2 + " == 0){goto " + tag8 + ";}//exit extern for\n    if(" + var2 + " == -1){goto " + tag11 + ";}\n    " + var2 + " = " + var2 + " + 3; //index to children of first node in HEAP    //" + var2 + " = 4\n    int tag_child_index = STACK[" + var2 + "];\n    if(tag_child_index == -1){goto " + tag11 + ";}\n    int child = HEAP[tag_child_index];\n\n\n    " + tag10 + ":\n    if(child == 0){goto " + tag9 + ";}\n\n    int " + var5 + " = STACK[child];\n    STACK_FUNC[SF] = " + var5 + ";\n    SF = SF + 1;\n    compareTwoStrings();\n    int " + var6 + " = (int) STACK_FUNC[SF];\n    if(" + var6 + " != 1){goto " + tag6 + ";}\n    HEAP[(int)HP] = child;\n    HP = HP + 1;\n    " + tag6 + ":\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    tag_child_index = tag_child_index + 1;\n    child = HEAP[tag_child_index];\n    goto " + tag10 + ";\n    " + tag9 + ":\n\n\n    " + tag11 + ": // Next iteration extern for / Exit inner for\n    " + var3 + " = " + var3 + " + 1;\n    " + var2 + " = HEAP[" + var3 + "];\n    goto " + tag12 + "; //Repeat extern for\n    " + tag8 + "://Exit extern for\n    HEAP[(int) HP] = 0;\n    HP = HP + 1;\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    \n    \n    STACK_FUNC[SF] = " + var4 + ";// merged_list\n    \n}\n    \n    \n    \n    ");
        return function_name;
    };
    XQueryTranslator.prototype.setSearchDoubleBar = function (node_name, predicate_f, next_fun) {
        var function_name = this.getNextFun();
        this.functions_Arr.push(function_name);
        var var1 = this.getNextVar();
        var var2 = this.getNextVar();
        var var3 = this.getNextVar();
        var var4 = this.getNextVar();
        var var5 = this.getNextVar();
        var var6 = this.getNextVar();
        var var7 = this.getNextVar();
        var var8 = this.getNextVar();
        var var9 = this.getNextVar();
        var var10 = this.getNextVar();
        var var11 = this.getNextVar();
        var var12 = this.getNextVar();
        var var13 = this.getNextVar();
        var var14 = this.getNextVar();
        var var15 = this.getNextVar();
        var tag1 = this.getNextTag();
        var tag2 = this.getNextTag();
        var tag3 = this.getNextTag();
        var tag4 = this.getNextTag();
        var tag5 = this.getNextTag();
        var tag6 = this.getNextTag();
        var tag7 = this.getNextTag();
        var tag8 = this.getNextTag();
        var tag9 = this.getNextTag();
        var tag10 = this.getNextTag();
        var tag11 = this.getNextTag();
        var tag12 = this.getNextTag();
        var tag13 = this.getNextTag();
        var tag14 = this.getNextTag();
        var tag15 = this.getNextTag();
        this.header = this.header + ("void " + function_name + "();\n");
        this.code = this.code + ("\nvoid " + function_name + "(){\n    \n    \n    int " + var1 + " = SF - 1;\n    int " + var15 + " = STACK_FUNC[" + var1 + "];//List in HEAP to pointers on STACK\n    \n    STACK_FUNC[SF] = HP; //Pointer to Node value\n    SF = SF + 1;\n");
        for (var i = 0; i < node_name.length; i++) {
            this.code = this.code + ("   HEAP[(int)HP] = " + node_name[i].charCodeAt(0) + "; //STR_val = " + node_name[i] + "\n    HP = HP + 1;\n");
        }
        this.code = this.code + ("    HEAP[(int)HP] = 0;\n    HP = HP + 1;\n\n    int " + var4 + " = HP; // sets the start of the result list\n    HEAP[(int) HP] = 0; // If no Nodes found then the list will start with 0\n\n    int " + var3 + " = " + var15 + ";\n    int " + var2 + " = HEAP[" + var3 + "];\n    \n    " + tag12 + "://inicio del primer for\n    if(" + var2 + " == 0){goto " + tag8 + ";}//exit extern for\n    if(" + var2 + " == -1){goto " + tag11 + ";}\n    " + var2 + " = " + var2 + " + 3; //index to children of first node in HEAP    //" + var2 + " = 4\n    int tag_child_index = STACK[" + var2 + "];\n    if(tag_child_index == -1){goto " + tag11 + ";}\n    int child = HEAP[tag_child_index];\n\n\n    " + tag10 + ":\n    if(child == 0){goto " + tag9 + ";}\n\n    int " + var5 + " = STACK[child];\n    STACK_FUNC[SF] = " + var5 + ";\n    SF = SF + 1;\n    compareTwoStrings();\n    int " + var6 + " = (int) STACK_FUNC[SF];\n    if(" + var6 + " != 1){goto " + tag6 + ";}\n    HEAP[(int)HP] = child;\n    HP = HP + 1;\n    " + tag6 + ":\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    tag_child_index = tag_child_index + 1;\n    child = HEAP[tag_child_index];\n    goto " + tag10 + ";\n    " + tag9 + ":\n\n\n    " + tag11 + ": // Next iteration extern for / Exit inner for\n    " + var3 + " = " + var3 + " + 1;\n    " + var2 + " = HEAP[" + var3 + "];\n    goto " + tag12 + "; //Repeat extern for\n    " + tag8 + "://Exit extern for\n    HEAP[(int) HP] = 0;\n    HP = HP + 1;\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n\n    /**************************** End of first list*************/\n    //La primera lista esta en " + var4 + ";\n    //Crear una segunda lista vacia del tamano de los hijos de " + var15 + ";\n    /********************Reserve spaces in HEAP for the possible list of its children********************************/\n\n    int index_of_lists = HP;\n    int " + var13 + " = " + var15 + ";\n    //int copy_of_actual_index = actual_index;\n    " + tag5 + ":\n    int " + var7 + " = HEAP[" + var13 + "];\n    if(" + var7 + " == 0){goto " + tag4 + ";}\n    int " + var8 + " = HEAP[" + var13 + "];\n    int index_to_children_ = " + var8 + " + 3; //Children pointer\n    int " + var9 + " = STACK[index_to_children_];\n    if(" + var9 + " == -1){goto " + tag3 + ";}\n    int children_ =  STACK[index_to_children_];// indice al heap of children\n    HP = HP + 1;\n    " + tag3 + ":\n    " + var13 + " = " + var13 + " + 1;\n    goto " + tag5 + ";\n    " + tag4 + ":\n    HEAP[(int)HP] = 0;\n    HP = HP + 1;\n    /********************Reserve spaces in HEAP for the possible list of its children********************************/\n\n\n    /*******************************Set up the list to return**********************************/\n    int " + var14 + " = " + var15 + ";\n    int copy_of_list_index = index_of_lists;\n    " + tag2 + ":\n    int " + var10 + " = HEAP[" + var14 + "];\n    if(" + var10 + " == 0){goto " + tag1 + ";}\n    int " + var11 + " = HEAP[" + var14 + "];\n    int index_to_children = " + var11 + " + 3; //Pointer to Children of element in HEAP\n    int index_to_children_heap = STACK[index_to_children];\n\n    if( index_to_children_heap == -1){goto " + tag7 + ";}\n    int " + var12 + " = STACK[index_to_children];\n    STACK_FUNC[SF] = " + var12 + ";//HEAP[children];\n    SF = SF + 1;\n    f0();\n    int return_list_pointer = (int) STACK_FUNC[SF];\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    HEAP[copy_of_list_index] = return_list_pointer;\n    copy_of_list_index = copy_of_list_index + 1;\n    " + tag7 + ":\n    " + var14 + " = " + var14 + " + 1;\n    goto " + tag2 + ";\n    " + tag1 + ":\n    STACK_FUNC[SF] = index_of_lists;\n    SF = SF + 1;\n    STACK_FUNC[SF] = " + var4 + ";\n    SF = SF + 1;\n    mergeLists();\n    int merged_list = STACK_FUNC[SF];\n    //pop result\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    STACK_FUNC[SF] = merged_list;// merged_list\n    \n    }\n    ");
        return function_name;
    };
    //Look only index 1
    XQueryTranslator.prototype.setSearchMethodFromFirstStack = function (node_name, predicate_f, next_fun) {
        console.log("setSearchMethodFromFirstStack");
        var main_var = this.getNextVar();
        var function_name = this.getNextFun();
        var var1 = this.getNextVar();
        var var2 = this.getNextVar();
        var label1 = this.getNextTag();
        this.header = this.header + ("void " + function_name + "();\n");
        this.code = this.code + ("\n        /*This is the code to pull data from the stack, searches for ONLY FIRST tag " + node_name + " // setSearchMethodFromFirstStack*/\nvoid " + function_name + "(){\n    STACK_FUNC[SF] = HP;\n    SF = SF + 1;\n");
        for (var i = 0; i < node_name.length; i++) {
            this.code = this.code + ("   HEAP[(int)HP] = " + node_name[i].charCodeAt(0) + "; //STR_val = " + node_name[i] + "\n    HP = HP + 1;\n");
        }
        this.code = this.code + ("   HEAP[(int)HP] = 0;\n    HP = HP + 1;\n    int " + main_var + " = HP; // sets the start of the result list\n    HEAP[(int) HP] = 0; // If no Nodes found then the list will start with 0\n    int " + var1 + " = 1; // This is pulling the root which is in the 1st pos of stack\n    STACK_FUNC[SF] = STACK[" + var1 + "];\n    SF = SF + 1;\n    compareTwoStrings();\n    int " + var2 + " = (int) STACK_FUNC[SF];\n    if(" + var2 + " != 1){goto " + label1 + ";}\n    HEAP[(int)HP] = " + var1 + ";\n    HP = HP + 1;\n    " + label1 + ":\n    STACK_FUNC[SF] = 0;\n    SF = SF -1;\n    STACK_FUNC[SF] = 0;\n    \n    SF = SF -1;\n    STACK_FUNC[SF] = 0;\n    HEAP[(int)HP] = 0;\n    HP = HP + 1;\n    //TODO si retorna 0 no continuar la busqueda no dio ningun resultado\n    //TODO Manage Predicate\n    \n    \n    \n    \n    ");
        this.code = this.code + ("\n    STACK_FUNC[SF] = " + main_var + ";\n    SF = SF + 1;\n    " + next_fun + "();\n    int result = STACK_FUNC[SF];\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    \n    \n        int counter = 0;\n    while(HEAP[result] != 0){\n        print_child_by_index(HEAP[result]);\n        result++;\n        counter ++;\n    }\n\n    printf(\"Total: %d\", SF);\n");
        this.code = this.code + "}";
        return function_name;
    };
    //Look for all nodes
    XQueryTranslator.prototype.setSearchMethodFromStack = function (node_name, predicate_f, next_fun) {
        console.log("setSearchMethodFromStack");
        var main_var = this.getNextVar();
        var function_name = this.getNextFun();
        var var1 = this.getNextVar();
        var var2 = this.getNextVar();
        var var3 = this.getNextVar();
        var label1 = this.getNextTag();
        var label2 = this.getNextTag();
        var label3 = this.getNextTag();
        var label4 = this.getNextTag();
        this.header = this.header + ("void " + function_name + "();\n");
        this.code = this.code + ("\n        /*This is the code to pull data from the stack, searches for tag " + node_name + " // setSearchMethodFromStack*/\nvoid " + function_name + "(){\n    STACK_FUNC[SF] = HP;\n    SF = SF + 1;\n");
        for (var i = 0; i < node_name.length; i++) {
            this.code = this.code + ("   HEAP[(int)HP] = " + node_name[i].charCodeAt(0) + "; //STR_val = " + node_name[i] + "\n    HP = HP + 1;\n");
        }
        this.code = this.code + ("   HEAP[(int)HP] = 0;\n    HP = HP + 1;\n    int " + main_var + " = HP; // sets the start of the result list\n    HEAP[(int) HP] = 0; // If no Nodes found then the list will start with 0\n    int " + var1 + " = 1; // This is pulling the root which is in the 1st pos of stack\n    STACK_FUNC[SF] = STACK[" + var1 + "];\n    SF = SF + 1;\n    compareTwoStrings();\n    int " + var2 + " = (int) STACK_FUNC[SF];\n    if(" + var2 + " != 1){goto " + label1 + ";}\n    HEAP[(int)HP] = " + var1 + ";\n    HP = HP + 1;\n    " + label1 + ":\n    STACK_FUNC[SF] = 0;\n    SF = SF -1;\n    STACK_FUNC[SF] = 0;\n \n    " + var1 + " = 5;\n    " + label2 + ":\n    ;\n    if(STACK[" + var1 + "] == 0){goto " + label3 + ";}\n    STACK_FUNC[SF] = STACK[" + var1 + "];\n    SF = SF + 1;\n    compareTwoStrings();\n    int " + var3 + " = (int) STACK_FUNC[SF];\n    if(" + var3 + " != 1){goto " + label4 + ";}\n    HEAP[(int)HP] = " + var1 + ";\n    HP = HP + 1;\n    " + label4 + ":\n    STACK_FUNC[SF] = 0;\n    SF = SF -1;\n    STACK_FUNC[SF] = 0;\n    " + var1 + " = " + var1 + " + 4;\n    goto " + label2 + ";\n    " + label3 + ":\n    SF = SF -1;\n    STACK_FUNC[SF] = 0;;\n    HEAP[(int)HP] = 0;\n    HP = HP + 1;\n    //Manage Predicate\n    STACK_FUNC[SF] = " + main_var + ";\n    SF = SF + 1;    \n");
        this.code = this.code + ("   " + (predicate_f == null ? "" : predicate_f + '();') + "\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    //TODO resolver si existe predicado obtener su valor\n    //Manage next function to call\n    int result = 0;\n");
        for (var i = this.functions_Arr.length - 1; i >= 0; i--) {
            //functions_Arr
            this.code = this.code + ("STACK_FUNC[SF] = " + (i == this.functions_Arr.length - 1 ? main_var : "result") + ";");
            //if(i == this.functions_Arr.length -1){}else {}
            this.code = this.code + ("    SF = SF + 1;\n    " + this.functions_Arr[i] + "();\n    result = STACK_FUNC[SF];\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    \n");
        }
        this.code = this.code + (" /*STACK_FUNC[SF] = " + main_var + ";\n    SF = SF + 1;    \n    " + next_fun + "();\n    int result = STACK_FUNC[SF];\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;*/\n");
        this.code = this.code + "\n    //TODELETE\n    int counter = 0;\n    while(HEAP[result] != 0){\n        print_child_by_index(HEAP[result]);\n        result++;\n        counter ++;\n    }\n\n    printf(\"Total: %d\", SF);\n";
        this.code = this.code + "}";
        return function_name;
    };
    XQueryTranslator.prototype.setSearchNodeDoubleBar = function (node_name, predicate_f, next_fun) {
        var main_var = this.getNextVar();
        return main_var;
    };
    XQueryTranslator.prototype.setSearchNodeOneBar = function (node_name, predicate_f, next_fun) {
        var main_var = this.getNextVar();
        return main_var;
    };
    XQueryTranslator.prototype.setHelpFunctions = function () {
        var var1 = this.getNextVar();
        var var2 = this.getNextVar();
        var var3 = this.getNextVar();
        var var4 = this.getNextVar();
        var var5 = this.getNextVar();
        var var6 = this.getNextVar();
        var var7 = this.getNextVar();
        var var8 = this.getNextVar();
        var var9 = this.getNextVar();
        var var10 = this.getNextVar();
        var var11 = this.getNextVar();
        var var12 = this.getNextVar();
        var var13 = this.getNextVar();
        var var14 = this.getNextVar();
        var var15 = this.getNextVar();
        var var16 = this.getNextVar();
        var var17 = this.getNextVar();
        var var18 = this.getNextVar();
        var var19 = this.getNextVar();
        var var20 = this.getNextVar();
        var var21 = this.getNextVar();
        var var22 = this.getNextVar();
        var var23 = this.getNextVar();
        var var24 = this.getNextVar();
        var var25 = this.getNextVar();
        var var26 = this.getNextVar();
        var var27 = this.getNextVar();
        var var28 = this.getNextVar();
        var var29 = this.getNextVar();
        var var30 = this.getNextVar();
        var var31 = this.getNextVar();
        var var32 = this.getNextVar();
        var var33 = this.getNextVar();
        var var34 = this.getNextVar();
        var var35 = this.getNextVar();
        var var36 = this.getNextVar();
        var var37 = this.getNextVar();
        var var38 = this.getNextVar();
        var var39 = this.getNextVar();
        var var40 = this.getNextVar();
        var var41 = this.getNextVar();
        var var42 = this.getNextVar();
        var var43 = this.getNextVar();
        var var44 = this.getNextVar();
        var var45 = this.getNextVar();
        var var46 = this.getNextVar();
        var var47 = this.getNextVar();
        var var48 = this.getNextVar();
        var var49 = this.getNextVar();
        var var50 = this.getNextVar();
        var var51 = this.getNextVar();
        var var52 = this.getNextVar();
        var var53 = this.getNextVar();
        var var54 = this.getNextVar();
        var var55 = this.getNextVar();
        var var56 = this.getNextVar();
        var var57 = this.getNextVar();
        var var58 = this.getNextVar();
        var var59 = this.getNextVar();
        var var60 = this.getNextVar();
        var tag1 = this.getNextTag();
        var tag2 = this.getNextTag();
        var tag3 = this.getNextTag();
        var tag4 = this.getNextTag();
        var tag5 = this.getNextTag();
        var tag6 = this.getNextTag();
        var tag7 = this.getNextTag();
        var tag8 = this.getNextTag();
        var tag9 = this.getNextTag();
        var tag10 = this.getNextTag();
        var tag11 = this.getNextTag();
        var tag12 = this.getNextTag();
        var tag13 = this.getNextTag();
        var tag14 = this.getNextTag();
        var tag15 = this.getNextTag();
        var tag16 = this.getNextTag();
        var tag17 = this.getNextTag();
        var tag18 = this.getNextTag();
        var tag19 = this.getNextTag();
        var tag20 = this.getNextTag();
        var tag21 = this.getNextTag();
        var tag22 = this.getNextTag();
        var tag23 = this.getNextTag();
        var tag24 = this.getNextTag();
        var tag25 = this.getNextTag();
        var tag26 = this.getNextTag();
        var tag27 = this.getNextTag();
        var tag28 = this.getNextTag();
        var tag29 = this.getNextTag();
        var tag30 = this.getNextTag();
        var tag31 = this.getNextTag();
        var tag32 = this.getNextTag();
        var tag33 = this.getNextTag();
        var tag34 = this.getNextTag();
        var tag35 = this.getNextTag();
        var tag36 = this.getNextTag();
        var tag37 = this.getNextTag();
        var tag38 = this.getNextTag();
        var tag39 = this.getNextTag();
        var tag40 = this.getNextTag();
        this.code = this.code + ("\nvoid isItemInList(){\n    int " + var55 + " = SF - 1;\n    int " + var56 + " = STACK_FUNC[" + var55 + "];\n    " + var55 + " = SF - 2;\n    int " + var57 + " = STACK_FUNC[" + var55 + "];\n    " + var55 + " = SF - 3;\n    int " + var58 + " = STACK_FUNC[" + var55 + "];\n\n    " + tag37 + ":\n    if(" + var58 + " >= " + var57 + "){goto " + tag38 + ";}\n    int " + var59 + " = HEAP[" + var58 + "];\n    if(" + var59 + " == " + var56 + "){goto " + tag39 + ";}\n    " + var58 + " = " + var58 + " + 1;\n    goto " + tag37 + ";\n    " + tag38 + ":\n    //Item is not in list\n    HEAP[(int)HP] = " + var56 + ";\n    HP = HP + 1;\n    return;\n    " + tag39 + ":\n    //The Item is already in list;\n    ;\n}\n        \n//0 are different 1 are equal\nvoid compareTwoStrings(){\n    int " + var1 + " = SF -1;\n    int " + var2 + " = (int )STACK_FUNC[" + var1 + "];\n    " + var1 + " = SF -2;\n    int " + var3 + " = (int )STACK_FUNC[" + var1 + "];\n    int " + var8 + " = 0;\n\n    " + tag1 + ":\n    if(HEAP[" + var2 + "] == 0){goto " + tag3 + ";}\n    if(HEAP[" + var3 + "] == 0 ){goto " + tag3 + ";}\n    int " + var4 + " = HEAP[" + var2 + "];\n    int " + var5 + " = HEAP[" + var3 + "];\n    if(" + var4 + " == " + var5 + "){goto " + tag2 + ";}\n    goto " + tag4 + ";\n    " + tag2 + ":\n    " + var2 + " = " + var2 + " + 1;\n    " + var3 + " = " + var3 + " + 1;\n    goto " + tag1 + ";\n    " + tag3 + ":\n    int " + var6 + " = HEAP[" + var2 + "];\n    int " + var7 + " = HEAP[" + var3 + "];\n    if(" + var6 + " == " + var7 + "){goto " + tag5 + ";}\n    " + tag4 + ":\n    " + var1 + " = SF;\n    " + var8 + " = 0;\n    STACK_FUNC[" + var1 + "] = " + var8 + ";\n    goto " + tag6 + ";\n\n    " + tag5 + ":\n    " + var1 + " = SF;\n    " + var8 + " = 1;\n    STACK_FUNC[" + var1 + "] = " + var8 + ";\n\n    " + tag6 + ":\n    ;\n}\n\n//Functions to print Tags\n// Receives index from heap, print itself and its children\nvoid print_tag(){\n    int " + var9 + " = SF - 1;\n    int " + var10 + " = STACK_FUNC[" + var9 + "];\n    int " + var11 + " = " + var10 + " + 1;\n    int " + var12 + " = " + var10 + " + 2;\n    int " + var13 + " = " + var10 + " + 3;\n\n    int tag_name = STACK[" + var10 + "];\n    int tag_val = STACK[" + var11 + "];\n    int tag_attr_index = STACK[" + var12 + "];\n    int tag_child_index = STACK[" + var13 + "];\n\n\n    STACK_FUNC[SF] = tag_name;\n    SF = SF + 1;\n    print_open_tag();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n    if(tag_attr_index == -1){goto " + tag7 + ";}\n    STACK_FUNC[SF] = tag_attr_index;\n    SF = SF + 1;\n    print_attributes();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n\n    " + tag7 + ":\n    int " + var14 + " = 62; //TODO\n    printf(\"%c\", (char) " + var14 + ");\n    if(tag_child_index == -1){goto " + tag8 + ";}\n    " + var14 + " = 10; // TODO\n    printf(\"%c\", (char) " + var14 + ");\n    " + var14 + " = 13; // TODO\n    printf(\"%c\", (char) " + var14 + ");\n    STACK_FUNC[SF] = tag_child_index;\n    SF = SF + 1;\n    print_children();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n\n    " + tag8 + "://CLOSING TAG\n    if(tag_val == -1){goto " + tag9 + ";}\n    STACK_FUNC[SF] = tag_val;\n    SF = SF + 1;\n    print_content();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n    " + tag9 + ":\n    STACK_FUNC[SF] = tag_name;\n    SF = SF + 1;\n    print_close_tag();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n}\n\nvoid print_content(){\n    int " + var15 + " = SF - 1;\n    int " + var16 + " = STACK_FUNC[" + var15 + "];\n    int " + var17 + " = HEAP[" + var16 + "]; // type\n    int " + var18 + " = " + var16 + " + 1;\n    float " + var19 + " = HEAP[" + var18 + "]; // Pointer to heap\n\n    if(" + var17 + " == 1){goto " + tag10 + ";}\n    STACK_FUNC[SF] = " + var18 + ";\n    SF = SF + 1;\n    print_val();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    goto " + tag11 + ";\n    " + tag10 + ":\n    STACK_FUNC[SF] = " + var19 + ";\n    SF = SF + 1;\n    print_number();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    " + tag11 + ":\n    ;\n}\n\nvoid print_children(){\n    int " + var20 + " = SF - 1;\n    int " + var21 + " = STACK_FUNC[" + var20 + "];\n    int " + var22 + " = HEAP[" + var21 + "];\n\n    " + tag12 + ":\n    if(" + var22 + "==0){goto " + tag13 + ";}\n\n    STACK_FUNC[SF] = " + var22 + ";\n    SF = SF + 1;\n    print_tag();\n    SF = SF - 1;\n    " + var21 + " = " + var21 + " + 1;\n    " + var22 + " = HEAP[" + var21 + "];\n\n    goto " + tag12 + ";\n    " + tag13 + ":\n    ;\n}\n\n//Receives an index for stack;\nvoid print_attributes(){\n    int " + var23 + " = SF - 1;\n    int " + var24 + " = STACK_FUNC[" + var23 + "];\n    int " + var25 + " = HEAP[" + var24 + "];\n    " + tag14 + ":\n    if(" + var25 + " == 0){goto " + tag15 + ";}\n    STACK_FUNC[SF] = " + var25 + ";\n    SF = SF + 1;\n    print_single_attribute();\n    SF = SF - 1;\n    " + var24 + " = " + var24 + " + 1;\n    " + var25 + " = HEAP[" + var24 + "];\n\n    goto " + tag14 + ";\n    " + tag15 + ":\n    ;\n}\n\nvoid print_single_attribute(){\n\n    int " + var26 + " = SF - 1;\n    int " + var27 + " = (int)  STACK_FUNC[" + var26 + "];\n    int " + var28 + " = (int) HEAP[" + var27 + "];// Name\n    int " + var29 + " = " + var27 + " + 1;\n    int " + var30 + " = (int) HEAP[" + var29 + "];//Type\n    int " + var31 + " = " + var27 + " + 2;\n    float " + var32 + " =  HEAP[" + var31 + "];// Value\n\n    printf(\" \");\n    STACK_FUNC[SF] = " + var28 + ";\n    SF = SF + 1;\n    print_val();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    printf(\"=\\\"\");\n\n\n    if (" + var30 + " == 2) goto " + tag16 + ";\n    STACK_FUNC[SF] = " + var32 + ";\n    SF = SF + 1;\n    print_number();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n    goto " + tag17 + ";\n    " + tag16 + ":\n    STACK_FUNC[SF] = " + var32 + ";\n    SF = SF + 1;\n    print_val();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n    " + tag17 + ":\n    printf(\"\\\"\");\n\n\n}\n\nvoid print_val(){\n    int " + var33 + " = SF - 1;\n    int " + var34 + " = STACK_FUNC[" + var33 + "];\n    int " + var35 + " = HEAP[" + var34 + "];\n\n    " + tag18 + ":\n    if (" + var35 + " == 0){goto " + tag19 + ";}\n    printf(\"%c\", (char) " + var35 + ");\n    " + var34 + " = " + var34 + " +1;\n    " + var35 + " = HEAP[" + var34 + "];\n    goto " + tag18 + ";\n    " + tag19 + ":\n    ;\n}\n\nvoid print_number(){\n    int " + var36 + " = SF - 1;\n    float " + var37 + " = STACK_FUNC[" + var36 + "];\n    int " + var38 + " = (int) " + var37 + ";\n    float " + var39 + " = " + var37 + " - " + var38 + ";\n    if(" + var39 + " == 0.0f){goto " + tag20 + ";}\n    printf(\"%0.2f\", " + var37 + ");\n    goto " + tag21 + ";\n    " + tag20 + ":\n    printf(\"%d\", " + var38 + ");\n    " + tag21 + ":\n    ;\n}\n\nvoid print_open_tag(){\n    int " + var40 + " = 60;\n    printf(\"%c\", (char) " + var40 + ");\n    int " + var41 + " = SF - 1;\n    int " + var42 + " = STACK_FUNC[" + var41 + "];\n    " + tag22 + ":\n    int " + var43 + " = HEAP[" + var42 + "];\n    if(" + var43 + " ==0){goto " + tag23 + ";}\n    printf(\"%c\", (char) " + var43 + ");\n    " + var42 + " = " + var42 + " + 1;\n    goto " + tag22 + ";\n\n    " + tag23 + ":\n    ;\n\n\n\n}\n\nvoid print_close_tag(){\n    int " + var44 + " = 60;\n    printf(\"%c\", (char) " + var44 + ");\n    " + var44 + " = 47;\n    printf(\"%c\", (char) " + var44 + ");\n    int " + var45 + " = SF - 1;\n    int " + var46 + " = STACK_FUNC[" + var45 + "];\n    " + tag24 + ":\n    int " + var47 + " = HEAP[" + var46 + "];\n    if(" + var47 + " ==0){goto " + tag25 + ";}\n    printf(\"%c\", (char) " + var47 + ");\n    " + var46 + " = " + var46 + " + 1;\n    goto " + tag24 + ";\n    " + tag25 + ":\n    " + var44 + " = 62;\n    printf(\"%c\", (char) " + var44 + ");\n    " + var44 + " = 10;\n    printf(\"%c\", (char) " + var44 + ");\n    " + var44 + " = 13;\n    printf(\"%c\", (char) " + var44 + ");\n}\n\n \n\n\n\n\nvoid mergeLists(){\n    int " + var48 + " = SF - 1;\n    int " + var51 + " = STACK_FUNC[" + var48 + "];\n    " + var48 + " = SF - 2;\n    int " + var52 + " = STACK_FUNC[" + var48 + "]; // index_of_lists\n    int " + var53 + " = HP;\n\n\n    " + tag26 + ":\n    if(HEAP[" + var51 + "] == 0){goto " + tag28 + ";}\n    if(HEAP[" + var51 + "] == -1){goto " + tag27 + ";}\n    int " + var49 + " = HEAP[" + var51 + "];\n    HEAP[(int)HP] = " + var49 + ";\n    HP = HP + 1;\n    " + tag27 + ":\n    " + var51 + " = " + var51 + " + 1;\n    goto " + tag26 + ";\n    " + tag28 + ":\n    ;\n\n\n    " + tag29 + ":\n    if(HEAP[" + var52 + "] == 0){goto " + tag34 + ";}\n    if(HEAP[" + var52 + "] == -1){goto " + tag33 + ";}\n\n    /**********************Inner For**************************/\n    int " + var54 + " = HEAP[" + var52 + "];\n    " + tag30 + ":\n    if(HEAP[" + var54 + "] == 0){goto " + tag32 + ";}\n    if(HEAP[" + var54 + "] == -1){goto " + tag31 + ";}\n    STACK_FUNC[SF] = " + var53 + "; // Beginning\n    SF = SF + 1;\n    int t2 = HP - 1;\n    STACK_FUNC[SF] = t2;// Ending\n    SF = SF + 1;\n    int " + var50 + " = HEAP[" + var54 + "];\n    STACK_FUNC[SF] = " + var50 + "; // Value\n    SF = SF + 1;\n    isItemInList();\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n    SF = SF - 1;\n    STACK_FUNC[SF] = 0;\n\n    " + tag31 + ":\n    " + var54 + " = " + var54 + " + 1;\n    goto " + tag30 + ";\n    " + tag32 + ":\n    /**********************Inner For**************************/\n    " + tag33 + ":\n    " + var52 + " = " + var52 + " + 1;\n    goto " + tag29 + ";\n    " + tag34 + ":\n    ;\n    if(" + var53 + " == HP){ goto " + tag35 + ";}\n    HEAP[(int)HP] = 0;\n    HP = HP + 1;\n    STACK_FUNC[SF] = " + var53 + ";\n    goto " + tag36 + ";\n    " + tag35 + ":\n    STACK_FUNC[SF] = -1;\n    " + tag36 + ":\n    ;\n}\n\n\n\n/*************************TODELETE***************************************/\n\nvoid print_tags_from_heap(){\n    //printf(\"First: %d\\n\", SF);\n    //SF = SF - 1;\n    int t0 = SF - 1;\n    int t1 = STACK_FUNC[t0];\n    int t2 = HEAP[t1];\n    //printf(\"%d\\n\", t1);\n\n    label_x10:\n    if(t2 == 0){goto label_x11;}\n    STACK_FUNC[SF] = t2;\n    //printf(\"t3: %d val: %d\\n\", t2, (int)STACK_FUNC[SF]);\n    SF = SF + 1;\n    print_tag();\n    SF = SF - 1;\n\n    t1 = t1 + 1;\n    t2 = HEAP[t1];\n    //printf(\"%d\\n\", (int)SF);\n    goto label_x10;\n    label_x11:\n    int t3 = 0;\n    STACK_FUNC[SF] = t3;\n    ;\n    printf(\"%d\\n\", SF);\n}\nvoid print_value_by_index(int index) {\n    //int t0 = STACK[index];\n    int t0 = index;\n    char val = (char) HEAP[t0];\n    while (val != '\\0') { printf(\"%c\", val); t0++; val = (char) HEAP[t0];\n\n    }\n    printf(\"\\n\");\n}\n\n\nvoid print_child_by_index(int index) {\n    int t0 = STACK[index];\n    //int t0 = index;\n    char val = (char) HEAP[t0];\n    while (val != '\\0') { printf(\"%c\", val); t0++; val = (char) HEAP[t0];\n\n    }\n    printf(\"\\n\");\n}\n\n\n\n\nvoid printHeap(){\n    int i = 0;\n    for(int i = 1; i <1000; i++ ){\n        printf(\"HEAP[%d] = %f\\n\", i, HEAP[i]);\n    }\n\n}\n");
        this.header = this.header + "void compareTwoStrings();\nvoid print_tag();\nvoid print_content();        \nvoid print_children();        \nvoid print_attributes();        \nvoid print_single_attribute();\nvoid print_val();\nvoid print_number();\nvoid print_open_tag();\nvoid print_close_tag();\nvoid mergeLists();\nvoid isItemInList();\n\n\n\n\n/*************************TODELETE***************************************/\nvoid print_tags_from_heap();\nvoid print_value_by_index(int);\nvoid print_child_by_index(int);      \nvoid printHeap(); \nvoid isItemInList();\n        ";
    };
    XQueryTranslator.prototype.getCode = function () {
        this.root.set3DCode();
        this.code = "float HEAP[100000];\nfloat STACK[10000];\nfloat STACK_FUNC[10000];\nfloat SP = 1;\nfloat HP = 1;\nint SF = 0;\n        \nint main(){\n" + Element_1.Element.code_definition + ("\n    HP = " + Element_1.Element.heap_index + ";\n    SP = " + Element_1.Element.stack_index + ";\n    f1(); //TODELETE\n    return 0;\n}\n ") + this.code;
        this.setHelpFunctions();
        return "#include <stdio.h>\n" + this.header + this.code;
    };
    XQueryTranslator.prototype.getNextVar = function () {
        return 't' + (++this.varNumber);
    };
    XQueryTranslator.prototype.getNextTag = function () {
        return 'label_' + (++this.tagNumber);
    };
    XQueryTranslator.prototype.getNextFun = function () {
        return 'f' + (++this.funNumber);
    };
    return XQueryTranslator;
}());
exports.XQueryTranslator = XQueryTranslator;
//# sourceMappingURL=xQueryTranslator.js.map