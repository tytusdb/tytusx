(this.webpackJsonpproyecto1compi2=this.webpackJsonpproyecto1compi2||[]).push([[88],{121:function(t,e,n){!function(t){"use strict";t.registerHelper("wordChars","r",/[\w.]/),t.defineMode("r",(function(e){function n(t){for(var e={},n=0;n<t.length;++n)e[t[n]]=!0;return e}var r=["NULL","NA","Inf","NaN","NA_integer_","NA_real_","NA_complex_","NA_character_","TRUE","FALSE"],i=["list","quote","bquote","eval","return","call","parse","deparse"],a=["if","else","repeat","while","function","for","in","next","break"],o=["if","else","repeat","while","function","for"];t.registerHelper("hintWords","r",r.concat(i,a));var c,l=n(r),u=n(i),f=n(a),s=n(o),p=/[+\-*\/^<>=!&|~$:]/;function d(t,e){c=null;var n=t.next();if("#"==n)return t.skipToEnd(),"comment";if("0"==n&&t.eat("x"))return t.eatWhile(/[\da-f]/i),"number";if("."==n&&t.eat(/\d/))return t.match(/\d*(?:e[+\-]?\d+)?/),"number";if(/\d/.test(n))return t.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/),"number";if("'"==n||'"'==n)return e.tokenize=m(n),"string";if("`"==n)return t.match(/[^`]+`/),"variable-3";if("."==n&&t.match(/.(?:[.]|\d+)/))return"keyword";if(/[a-zA-Z\.]/.test(n)){t.eatWhile(/[\w\.]/);var r=t.current();return l.propertyIsEnumerable(r)?"atom":f.propertyIsEnumerable(r)?(s.propertyIsEnumerable(r)&&!t.match(/\s*if(\s+|$)/,!1)&&(c="block"),"keyword"):u.propertyIsEnumerable(r)?"builtin":"variable"}return"%"==n?(t.skipTo("%")&&t.next(),"operator variable-2"):"<"==n&&t.eat("-")||"<"==n&&t.match("<-")||"-"==n&&t.match(/>>?/)?"operator arrow":"="==n&&e.ctx.argList?"arg-is":p.test(n)?"$"==n?"operator dollar":(t.eatWhile(p),"operator"):/[\(\){}\[\];]/.test(n)?(c=n,";"==n?"semi":null):null}function m(t){return function(e,n){if(e.eat("\\")){var r=e.next();return"x"==r?e.match(/^[a-f0-9]{2}/i):("u"==r||"U"==r)&&e.eat("{")&&e.skipTo("}")?e.next():"u"==r?e.match(/^[a-f0-9]{4}/i):"U"==r?e.match(/^[a-f0-9]{8}/i):/[0-7]/.test(r)&&e.match(/^[0-7]{1,2}/),"string-2"}for(var i;null!=(i=e.next());){if(i==t){n.tokenize=d;break}if("\\"==i){e.backUp(1);break}}return"string"}}var x=1,b=2,h=4;function k(t,e,n){t.ctx={type:e,indent:t.indent,flags:0,column:n.column(),prev:t.ctx}}function v(t,e){var n=t.ctx;t.ctx={type:n.type,indent:n.indent,flags:n.flags|e,column:n.column,prev:n.prev}}function g(t){t.indent=t.ctx.indent,t.ctx=t.ctx.prev}return{startState:function(){return{tokenize:d,ctx:{type:"top",indent:-e.indentUnit,flags:b},indent:0,afterIdent:!1}},token:function(t,e){if(t.sol()&&(0==(3&e.ctx.flags)&&(e.ctx.flags|=b),e.ctx.flags&h&&g(e),e.indent=t.indentation()),t.eatSpace())return null;var n=e.tokenize(t,e);return"comment"!=n&&0==(e.ctx.flags&b)&&v(e,x),";"!=c&&"{"!=c&&"}"!=c||"block"!=e.ctx.type||g(e),"{"==c?k(e,"}",t):"("==c?(k(e,")",t),e.afterIdent&&(e.ctx.argList=!0)):"["==c?k(e,"]",t):"block"==c?k(e,"block",t):c==e.ctx.type?g(e):"block"==e.ctx.type&&"comment"!=n&&v(e,h),e.afterIdent="variable"==n||"keyword"==n,n},indent:function(t,n){if(t.tokenize!=d)return 0;var r=n&&n.charAt(0),i=t.ctx,a=r==i.type;return i.flags&h&&(i=i.prev),"block"==i.type?i.indent+("{"==r?0:e.indentUnit):i.flags&x?i.column+(a?0:1):i.indent+(a?0:e.indentUnit)},lineComment:"#"}})),t.defineMIME("text/x-rsrc","r")}(n(6))}}]);
//# sourceMappingURL=88.8b857b56.chunk.js.map