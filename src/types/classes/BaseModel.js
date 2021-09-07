"use strict";
exports.__esModule = true;
exports.BaseModel = void 0;
var BaseModel = /** @class */ (function () {
    function BaseModel(object) {
        if (object === void 0) { object = null; }
        if (object !== null) {
            for (var member in object) {
                if (member !== '__v') {
                    // @ts-ignore TODO: revisit
                    this[member] = object[member];
                }
            }
        }
    }
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//export default BaseModel;
