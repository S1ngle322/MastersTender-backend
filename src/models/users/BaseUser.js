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
exports.baseUserSchema = exports.BaseUser = void 0;
var BaseModel_1 = require("../../types/classes/BaseModel");
var mongoose_1 = require("mongoose");
var mongoose_unique_validator_1 = require("mongoose-unique-validator");
var bcrypt = require('bcryptjs');
var BaseUser = /** @class */ (function (_super) {
    __extends(BaseUser, _super);
    function BaseUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseUser;
}(BaseModel_1.BaseModel));
exports.BaseUser = BaseUser;
exports.baseUserSchema = new mongoose_1["default"].Schema({
    username: { type: String, "default": "", unique: true, required: true },
    email: { type: String, "default": "" },
    password: { type: String },
    isVerified: { type: Boolean, "default": false },
    type: { type: String, required: true, immutable: true }
}, { discriminatorKey: "type", timestamps: true });
exports.baseUserSchema.plugin(mongoose_unique_validator_1["default"]);
exports.baseUserSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) {
        return next();
    }
    if (!user.password) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
exports.baseUserSchema.pre("findOneAndUpdate", function (next) {
    var user = this;
    if (!user._update || !user._update.password) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user._update.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user._update.password = hash;
            next();
        });
    });
});
var comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};
exports.baseUserSchema.methods.comparePassword = comparePassword;
var BaseUserModel = mongoose_1["default"].model("BaseUser", exports.baseUserSchema);
exports["default"] = BaseUserModel;
