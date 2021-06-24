/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gram_xpath_asc = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[5,6],$V1=[2,7],$V2=[1,5],$V3=[1,6],$V4=[26,28,29,30,31,32,35],$V5=[2,21],$V6=[1,10],$V7=[1,11],$V8=[1,12],$V9=[1,13],$Va=[1,14],$Vb=[1,15],$Vc=[1,16],$Vd=[1,17],$Ve=[1,18],$Vf=[1,19],$Vg=[1,20],$Vh=[1,21],$Vi=[1,22],$Vj=[1,26],$Vk=[1,27],$Vl=[1,28],$Vm=[1,29],$Vn=[1,30],$Vo=[1,31],$Vp=[1,32],$Vq=[5,6,8,11],$Vr=[2,31],$Vs=[1,50],$Vt=[1,65],$Vu=[1,71],$Vv=[1,73],$Vw=[1,62],$Vx=[1,63],$Vy=[1,69],$Vz=[1,64],$VA=[2,38],$VB=[1,70],$VC=[1,72],$VD=[1,74],$VE=[1,75],$VF=[1,84],$VG=[1,82],$VH=[1,83],$VI=[1,85],$VJ=[1,86],$VK=[8,26,28,30,31,32,33,34,35,39,41,43,44,45,56,57,58,59],$VL=[1,91],$VM=[1,92],$VN=[1,93],$VO=[1,94],$VP=[1,95],$VQ=[1,96],$VR=[8,26,28,30,31,32,33,34,35,39,41,43,44,45,46,48,49,50,51,52,56,57,58,59],$VS=[1,97],$VT=[1,98],$VU=[8,26,28,30,31,32,33,34,35,39,41,43,44,45,46,48,49,50,51,52,53,55,56,57,58,59];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"BEGIN":3,"INSTRUCCIONES":4,"EOF":5,"or":6,"INSTRUCCION":7,"axis":8,"AXISNAME":9,"NODO":10,"d_axis":11,"ancestor":12,"cpuntos":13,"ancestororself":14,"attribute":15,"child":16,"descendant":17,"descendantorself":18,"following":19,"followingsibling":20,"namespace":21,"parent":22,"preceding":23,"precedingsibling":24,"self":25,"identificador":26,"PREDICADOS":27,"punto":28,"ppunto":29,"por":30,"at":31,"text":32,"p_abre":33,"p_cierra":34,"node":35,"PREDICADO":36,"c_abre":37,"CONTENIDO":38,"c_cierra":39,"EXPRESION":40,"mas":41,"T":42,"menos":43,"div":44,"mod":45,"menorque":46,"F":47,"menorigual":48,"mayorque":49,"mayorigual":50,"igual":51,"diferente":52,"land":53,"G":54,"lor":55,"numero":56,"StringLiteral":57,"last":58,"position":59,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"or",8:"axis",11:"d_axis",12:"ancestor",13:"cpuntos",14:"ancestororself",15:"attribute",16:"child",17:"descendant",18:"descendantorself",19:"following",20:"followingsibling",21:"namespace",22:"parent",23:"preceding",24:"precedingsibling",25:"self",26:"identificador",28:"punto",29:"ppunto",30:"por",31:"at",32:"text",33:"p_abre",34:"p_cierra",35:"node",37:"c_abre",39:"c_cierra",41:"mas",43:"menos",44:"div",45:"mod",46:"menorque",48:"menorigual",49:"mayorque",50:"mayorigual",51:"igual",52:"diferente",53:"land",55:"lor",56:"numero",57:"StringLiteral",58:"last",59:"position"},
productions_: [0,[3,2],[4,3],[4,1],[4,1],[7,4],[7,4],[7,0],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,0],[10,2],[10,2],[10,2],[10,2],[10,3],[10,3],[10,3],[10,3],[27,2],[27,0],[36,3],[38,2],[38,3],[38,4],[38,4],[38,2],[38,0],[40,3],[40,3],[40,3],[40,3],[40,3],[40,1],[42,3],[42,3],[42,3],[42,3],[42,3],[42,3],[42,1],[47,3],[47,3],[47,1],[54,3],[54,1],[54,1],[54,1],[54,1],[54,3],[54,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 

                                                    //return $$[$0-1];
                                                
                                                
break;
case 2:
 this.$ = []; $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 3:
 this.$ = []; this.$.push($$[$0]); 
break;
case 4:
 return false 
break;
case 5: case 6:
 this.$ = []; this.$.push([$$[$0-3],$$[$0-1][0],$$[$0-1][1]]); this.$ = this.$.concat($$[$0]); 
break;
case 7:
 this.$ = []; 
break;
case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 19: case 20: case 30:
 this.$ = $$[$0-1]; 
break;
case 21:
 this.$ = ''; 
break;
case 22: case 23: case 24: case 25:
 this.$ = []; this.$.push($$[$0-1],$$[$0]); 
break;
case 26: case 27:
 this.$ = []; this.$.push($$[$0-2]+$$[$0-1],$$[$0]); 
break;
case 28: case 29:
 this.$ = []; this.$.push($$[$0-2],''); 
break;
case 31:
 this.$=''; 
break;
case 32:
 this.$ = $$[$0-1].getValorImplicito({}); 
break;
case 33:
 this.$ = $$[$0-1] 
break;
case 34:
 this.$ = $$[$0-2]+$$[$0-1] 
break;
case 35: case 36:
 this.$ = $$[$0-3] 
break;
case 37: case 54:
 this.$ = $$[$0] 
break;
case 38:
 this.$ = '' 
break;
case 39:
 this.$ = new Operacion($$[$0-2],$$[$0],'suma', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 40:
 this.$ = new Operacion($$[$0-2],$$[$0],'resta', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 41:
 this.$ = new Operacion($$[$0-2],$$[$0],'mult', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 42:
 this.$ = new Operacion($$[$0-2],$$[$0],'div', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 43:
 this.$ = new Operacion($$[$0-2],$$[$0],'mod', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 44: case 51: case 55:
 this.$ = $$[$0]; 
break;
case 45: case 46: case 47: case 48: case 49: case 50:
 this.$ = $$[$0-2]+$$[$0-1]+$$[$0]; 
break;
case 52:
 this.$ = new Operacion($$[$0-2],$$[$0],'and', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 53:
 this.$ = new Operacion($$[$0-2],$$[$0],'or', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 56:
 this.$ = new Primitivo(Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 57: case 58: case 59:
 this.$ = new Primitivo($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 60: case 61:
 this.$ = new Primitivo($$[$0-2], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
}
},
table: [o($V0,$V1,{3:1,4:2,7:3,2:[1,4],8:$V2,11:$V3}),{1:[3]},{5:[1,7],6:[1,8]},o($V0,[2,3]),o($V0,[2,4]),o($V4,$V5,{9:9,12:$V6,14:$V7,15:$V8,16:$V9,17:$Va,18:$Vb,19:$Vc,20:$Vd,21:$Ve,22:$Vf,23:$Vg,24:$Vh,25:$Vi}),o($V4,$V5,{9:23,12:$V6,14:$V7,15:$V8,16:$V9,17:$Va,18:$Vb,19:$Vc,20:$Vd,21:$Ve,22:$Vf,23:$Vg,24:$Vh,25:$Vi}),{1:[2,1]},o($V0,$V1,{7:24,8:$V2,11:$V3}),{10:25,26:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,35:$Vp},{13:[1,33]},{13:[1,34]},{13:[1,35]},{13:[1,36]},{13:[1,37]},{13:[1,38]},{13:[1,39]},{13:[1,40]},{13:[1,41]},{13:[1,42]},{13:[1,43]},{13:[1,44]},{13:[1,45]},{10:46,26:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,35:$Vp},o($V0,[2,2]),o($V0,$V1,{7:47,8:$V2,11:$V3}),o($Vq,$Vr,{27:48,36:49,37:$Vs}),o($Vq,$Vr,{36:49,27:51,37:$Vs}),o($Vq,$Vr,{36:49,27:52,37:$Vs}),o($Vq,$Vr,{36:49,27:53,37:$Vs}),{26:[1,54],30:[1,55]},{33:[1,56]},{33:[1,57]},o($V4,[2,8]),o($V4,[2,9]),o($V4,[2,10]),o($V4,[2,11]),o($V4,[2,12]),o($V4,[2,13]),o($V4,[2,14]),o($V4,[2,15]),o($V4,[2,16]),o($V4,[2,17]),o($V4,[2,18]),o($V4,[2,19]),o($V4,[2,20]),o($V0,$V1,{7:58,8:$V2,11:$V3}),o($V0,[2,5]),o($Vq,[2,22]),o($Vq,$Vr,{36:49,27:59,37:$Vs}),{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:60,39:$VA,40:61,42:66,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},o($Vq,[2,23]),o($Vq,[2,24]),o($Vq,[2,25]),o($Vq,$Vr,{36:49,27:76,37:$Vs}),o($Vq,$Vr,{36:49,27:77,37:$Vs}),{34:[1,78]},{34:[1,79]},o($V0,[2,6]),o($Vq,[2,30]),{39:[1,80]},{8:$Vt,26:$Vu,28:$Vv,30:$VF,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:81,39:$VA,40:61,41:$VG,42:66,43:$VH,44:$VI,45:$VJ,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,40:87,42:66,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{33:[1,88]},{33:[1,89]},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:90,39:$VA,40:61,42:66,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},o($VK,[2,44],{46:$VL,48:$VM,49:$VN,50:$VO,51:$VP,52:$VQ}),o($VR,[2,51],{53:$VS,55:$VT}),o($VU,[2,54]),{26:$Vu,28:$Vv,33:$Vy,40:99,42:66,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},o($VU,[2,56]),o($VU,[2,57]),o($VU,[2,58]),o($VU,[2,59]),{33:[1,100]},{33:[1,101]},o($Vq,[2,26]),o($Vq,[2,27]),o($Vq,[2,28]),o($Vq,[2,29]),o([5,6,8,11,37],[2,32]),{39:[2,33]},{26:$Vu,28:$Vv,33:$Vy,42:102,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,42:103,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,42:104,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,42:105,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,42:106,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{8:$Vt,26:$Vu,28:$Vv,30:$VF,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:107,39:$VA,40:61,41:$VG,42:66,43:$VH,44:$VI,45:$VJ,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{34:[1,108]},{34:[1,109]},{39:[2,37]},{26:$Vu,28:$Vv,33:$Vy,47:110,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,47:111,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,47:112,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,47:113,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,47:114,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,47:115,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,54:116,56:$VB,57:$VC,58:$VD,59:$VE},{26:$Vu,28:$Vv,33:$Vy,54:117,56:$VB,57:$VC,58:$VD,59:$VE},{30:$VF,34:[1,118],41:$VG,43:$VH,44:$VI,45:$VJ},{34:[1,119]},{34:[1,120]},o($VK,[2,39],{46:$VL,48:$VM,49:$VN,50:$VO,51:$VP,52:$VQ}),o($VK,[2,40],{46:$VL,48:$VM,49:$VN,50:$VO,51:$VP,52:$VQ}),o($VK,[2,41],{46:$VL,48:$VM,49:$VN,50:$VO,51:$VP,52:$VQ}),o($VK,[2,42],{46:$VL,48:$VM,49:$VN,50:$VO,51:$VP,52:$VQ}),o($VK,[2,43],{46:$VL,48:$VM,49:$VN,50:$VO,51:$VP,52:$VQ}),{39:[2,34]},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:121,39:$VA,40:61,42:66,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:122,39:$VA,40:61,42:66,47:67,54:68,56:$VB,57:$VC,58:$VD,59:$VE},o($VR,[2,45],{53:$VS,55:$VT}),o($VR,[2,46],{53:$VS,55:$VT}),o($VR,[2,47],{53:$VS,55:$VT}),o($VR,[2,48],{53:$VS,55:$VT}),o($VR,[2,49],{53:$VS,55:$VT}),o($VR,[2,50],{53:$VS,55:$VT}),o($VU,[2,52]),o($VU,[2,53]),o($VU,[2,55]),o($VU,[2,60]),o($VU,[2,61]),{39:[2,35]},{39:[2,36]}],
defaultActions: {7:[2,1],81:[2,33],90:[2,37],107:[2,34],121:[2,35],122:[2,36]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    //const {Print} = require("../Instrucciones/Primitivas/Print");
    //const {Primitivo} = require("../Expresiones/Primitivo");
    //const { Operacion, Operador } = require("../Expresiones/Operacion");
    //const { Consulta } = require("../Instrucciones/Consulta");
    errores = [];
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip white space */
break;
case 1:return 16  
break;
case 2:return 18
break;
case 3:return 20
break;
case 4:return 24
break;
case 5:return 14
break;
case 6:return 17
break;
case 7:return 19
break;
case 8:return 23
break;
case 9:return 12
break;
case 10:return 15
break;
case 11:return 25
break;
case 12:return 21
break;
case 13:return 22
break;
case 14:return 32
break;
case 15:return 35
break;
case 16:return 59
break;
case 17:return 58
break;
case 18:return 53
break;
case 19:return 55
break;
case 20:return 51
break;
case 21:return 52
break;
case 22:return 48
break;
case 23:return 46
break;
case 24:return 50
break;
case 25:return 49
break;
case 26:return 41
break;
case 27:return 43
break;
case 28:return 30
break;
case 29:return 44 
break;
case 30:return 45
break;
case 31:return 37
break;
case 32:return 39
break;
case 33:return 33
break;
case 34:return 34
break;
case 35:return 13
break;
case 36:return 'dpuntos'
break;
case 37:return 29
break;
case 38:return 28
break;
case 39:return 31
break;
case 40:return 6
break;
case 41:return 11
break;
case 42:return 8
break;
case 43:return 57
break;
case 44:return 'CharLiteral'
break;
case 45:return 56;
break;
case 46:return 26;  
break;
case 47:  
    console.error('Error léxico: ' + yy_.yytext + ', linea: ' + yy_.yylloc.first_line + ', columna: ' + yy_.yylloc.first_column);
    errores.push({'Error Type': 'Lexico', 'Row': yy_.yylloc.first_line, 'Column': yy_.yylloc.first_column, 'Description': 'El caracter: '+yy_.yytext+' no pertenece al lenguaje' });

break;
case 48:return 5
break;
}
},
rules: [/^(?:\s+)/,/^(?:child\b)/,/^(?:descendant-or-self\b)/,/^(?:following-sibling\b)/,/^(?:preceding-sibling\b)/,/^(?:ancestor-or-self\b)/,/^(?:descendant\b)/,/^(?:following\b)/,/^(?:preceding\b)/,/^(?:ancestor\b)/,/^(?:attribute\b)/,/^(?:self\b)/,/^(?:namespace\b)/,/^(?:parent\b)/,/^(?:text\b)/,/^(?:node\b)/,/^(?:position\b)/,/^(?:last\b)/,/^(?:and\b)/,/^(?:or\b)/,/^(?:=)/,/^(?:!=)/,/^(?:<=)/,/^(?:<)/,/^(?:>=)/,/^(?:>)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:div\b)/,/^(?:mod\b)/,/^(?:\[)/,/^(?:\])/,/^(?:\()/,/^(?:\))/,/^(?:::)/,/^(?::)/,/^(?:\.\.)/,/^(?:\.)/,/^(?:@)/,/^(?:\|)/,/^(?:\/\/)/,/^(?:\/)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:{charliteral})/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+))|[0-9]+)/,/^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*)/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gram_xpath_asc;
exports.Parser = gram_xpath_asc.Parser;
exports.parse = function () { return gram_xpath_asc.parse.apply(gram_xpath_asc, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}