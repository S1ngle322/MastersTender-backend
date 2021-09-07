"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var inversify_1 = require("inversify");
var jsonwebtoken_1 = require("jsonwebtoken");
var UnauthorizedError_1 = require("../exceptions/UnauthorizedError");
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.getRouter = function () {
            return _this.router;
        };
        this.isValidIdInToken = function (id, req) {
            var bearerHeader = req.headers.authorization; //??
            if (!bearerHeader) {
                throw new UnauthorizedError_1["default"]('Please provide access token!');
            }
            var token = bearerHeader.toString();
            var decoded = jsonwebtoken_1["default"].decode(token, { complete: true });
            return id === decoded.payload.userId;
        };
    }
    Controller = __decorate([
        (0, inversify_1.injectable)()
    ], Controller);
    return Controller;
}());
exports["default"] = Controller;