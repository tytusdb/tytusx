"use strict";
var AxeType;
(function (AxeType) {
    AxeType[AxeType["ancestoOrSelfType"] = 0] = "ancestoOrSelfType";
    AxeType[AxeType["ancestorType"] = 1] = "ancestorType";
    AxeType[AxeType["attributeType"] = 2] = "attributeType";
    AxeType[AxeType["childType"] = 3] = "childType";
    AxeType[AxeType["descendantOrSelfType"] = 4] = "descendantOrSelfType";
    AxeType[AxeType["descendantType"] = 5] = "descendantType";
    AxeType[AxeType["followingSiblingType"] = 6] = "followingSiblingType";
    AxeType[AxeType["followingType"] = 7] = "followingType";
    AxeType[AxeType["namespaceType"] = 8] = "namespaceType";
    AxeType[AxeType["precedingSiblingType"] = 9] = "precedingSiblingType";
    AxeType[AxeType["precedingType"] = 10] = "precedingType";
    AxeType[AxeType["parentType"] = 11] = "parentType";
    AxeType[AxeType["selfType"] = 12] = "selfType";
})(AxeType || (AxeType = {}));
var AxeOperation;
(function (AxeOperation) {
    AxeOperation[AxeOperation["identifier"] = 0] = "identifier";
    AxeOperation[AxeOperation["times"] = 1] = "times";
    AxeOperation[AxeOperation["node"] = 2] = "node";
    AxeOperation[AxeOperation["text"] = 3] = "text";
})(AxeOperation || (AxeOperation = {}));
