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
exports.User = void 0;
var BaseUser_1 = require("./BaseUser");
var mongoose_1 = require("mongoose");
var BaseUser_2 = require("./BaseUser");
var UserType_1 = require("../../types/enums/UserType");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(BaseUser_1.BaseUser));
exports.User = User;
var userSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    middle_name: { type: String, required: true },
    age: { type: Number, required: false },
    position: { type: String, required: true },
    work_experience: { type: Number, required: false },
    marital_status: { type: String, required: false },
    amount_of_children: { type: Number, required: false },
    country: { type: String, required: true },
    city: { type: String, required: true }
});
var UserModel = BaseUser_2["default"].discriminator(UserType_1["default"].USER, userSchema);
exports["default"] = UserModel;
