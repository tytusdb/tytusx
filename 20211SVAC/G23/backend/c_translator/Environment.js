"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var Environment = /** @class */ (function () {
    function Environment() {
        this.variables = [];
        this.functions = [];
        this.environments = [];
        this.varNumber = -1;
    }
    Environment.prototype.addVariable = function (name) {
        //TODO: check variable is not already on list
        for (var i = 0; i < this.variables.length; i++) {
            if (this.variables[i]['name'] == name) {
                console.log("Environment");
            }
        }
        this.variables.push({ 'name': name, 'code_name': "var" + this.getNextVar() });
    };
    Environment.prototype.getNextVar = function () {
        return ++this.varNumber;
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map