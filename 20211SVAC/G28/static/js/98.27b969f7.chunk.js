(this.webpackJsonpproyecto1compi2=this.webpackJsonpproyecto1compi2||[]).push([[98],{132:function(t,e,n){!function(t){"use strict";t.defineMode("solr",(function(){var t=/[^\s\|\!\+\-\*\?\~\^\&\:\(\)\[\]\{\}\"\\]/,e=/[\|\!\+\-\*\?\~\^\&]/,n=/^(OR|AND|NOT|TO)$/i;function o(t){return parseFloat(t).toString()===t}function r(t){return function(e,n){for(var o,r=!1;null!=(o=e.next())&&(o!=t||r);)r=!r&&"\\"==o;return r||(n.tokenize=c),"string"}}function i(t){return function(e,n){var o="operator";return"+"==t?o+=" positive":"-"==t?o+=" negative":"|"==t?e.eat(/\|/):"&"==t?e.eat(/\&/):"^"==t&&(o+=" boost"),n.tokenize=c,o}}function u(e){return function(r,i){for(var u=e;(e=r.peek())&&null!=e.match(t);)u+=r.next();return i.tokenize=c,n.test(u)?"operator":o(u)?"number":":"==r.peek()?"field":"string"}}function c(n,o){var s=n.next();return'"'==s?o.tokenize=r(s):e.test(s)?o.tokenize=i(s):t.test(s)&&(o.tokenize=u(s)),o.tokenize!=c?o.tokenize(n,o):null}return{startState:function(){return{tokenize:c}},token:function(t,e){return t.eatSpace()?null:e.tokenize(t,e)}}})),t.defineMIME("text/x-solr","solr")}(n(6))}}]);
//# sourceMappingURL=98.27b969f7.chunk.js.map