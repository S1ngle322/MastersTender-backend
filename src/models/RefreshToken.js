"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.refreshTokenSchema = exports.RefreshToken = void 0;
var mongoose_1 = require("mongoose");
var BaseModel_1 = require("../types/classes/BaseModel");
var RefreshToken = /** @class */ (function (_super) {
    __extends(RefreshToken, _super);
    function RefreshToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RefreshToken;
}(BaseModel_1.BaseModel));
exports.RefreshToken = RefreshToken;
exports.refreshTokenSchema = new mongoose_1["default"].Schema(//описание RT(рефреш токен) для работы с бд
{
    user: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: "User" },
    value: { type: String, "default": "", required: true } //value = token
}, { timestamps: true });
var RefreshTokenModel = mongoose_1["default"].model("RefreshToken", exports.refreshTokenSchema);
exports["default"] = RefreshToken;
