(this.webpackJsonpproyecto1compi2=this.webpackJsonpproyecto1compi2||[]).push([[112],{147:function(t,e,n){!function(t){"use strict";t.defineMode("turtle",(function(t){var e,n=t.indentUnit;function o(t){return new RegExp("^(?:"+t.join("|")+")$","i")}o([]);var r=o(["@prefix","@base","a"]),i=/[*+\-<>=&|]/;function c(t,n){var o=t.next();if(e=null,"<"!=o||t.match(/^[\s\u00a0=]/,!1)){if('"'==o||"'"==o)return n.tokenize=u(o),n.tokenize(t,n);if(/[{}\(\),\.;\[\]]/.test(o))return e=o,null;if("#"==o)return t.skipToEnd(),"comment";if(i.test(o))return t.eatWhile(i),null;if(":"==o)return"operator";if(t.eatWhile(/[_\w\d]/),":"==t.peek())return"variable-3";var c=t.current();return r.test(c)?"meta":o>="A"&&o<="Z"?"comment":"keyword"}return t.match(/^[^\s\u00a0>]*>?/),"atom"}function u(t){return function(e,n){for(var o,r=!1;null!=(o=e.next());){if(o==t&&!r){n.tokenize=c;break}r=!r&&"\\"==o}return"string"}}function a(t,e,n){t.context={prev:t.context,indent:t.indent,col:n,type:e}}function l(t){t.indent=t.context.indent,t.context=t.context.prev}return{startState:function(){return{tokenize:c,context:null,indent:0,col:0}},token:function(t,n){if(t.sol()&&(n.context&&null==n.context.align&&(n.context.align=!1),n.indent=t.indentation()),t.eatSpace())return null;var o=n.tokenize(t,n);if("comment"!=o&&n.context&&null==n.context.align&&"pattern"!=n.context.type&&(n.context.align=!0),"("==e)a(n,")",t.column());else if("["==e)a(n,"]",t.column());else if("{"==e)a(n,"}",t.column());else if(/[\]\}\)]/.test(e)){for(;n.context&&"pattern"==n.context.type;)l(n);n.context&&e==n.context.type&&l(n)}else"."==e&&n.context&&"pattern"==n.context.type?l(n):/atom|string|variable/.test(o)&&n.context&&(/[\}\]]/.test(n.context.type)?a(n,"pattern",t.column()):"pattern"!=n.context.type||n.context.align||(n.context.align=!0,n.context.col=t.column()));return o},indent:function(t,e){var o=e&&e.charAt(0),r=t.context;if(/[\]\}]/.test(o))for(;r&&"pattern"==r.type;)r=r.prev;var i=r&&o==r.type;return r?"pattern"==r.type?r.col:r.align?r.col+(i?0:1):r.indent+(i?0:n):0},lineComment:"#"}})),t.defineMIME("text/turtle","turtle")}(n(6))}}]);
//# sourceMappingURL=112.22235147.chunk.js.map