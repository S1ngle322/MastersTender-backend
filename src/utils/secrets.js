"use strict";
exports.__esModule = true;
exports.JWT_REFRESH_LIFETIME = exports.JWT_ACCESS_LIFETIME = exports.JWT_ACCESS_SECRET = exports.JWT_REFRESH_SECRET = exports.DB_URL = exports.SERVER_PORT = exports.IS_PROD = exports.ENVIRONMENT = void 0;
var winston_1 = require("./winston"); //что это за файл и зачем он нужен?
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.IS_PROD = exports.ENVIRONMENT === "NODE_ENV";
exports.SERVER_PORT = parseInt(process.env.SERVER_PORT, 3000);
exports.DB_URL = process.env.DB_URL;
if (!exports.DB_URL) {
    winston_1["default"].info("No mongo connection string. Set the DB_URL environment variable.");
}
exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
if (!exports.JWT_REFRESH_SECRET) {
    winston_1["default"].info("No refresh token secret. Set the JWT_REFRESH_SECRET environment variable.");
}
exports.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
if (!exports.JWT_ACCESS_SECRET) {
    winston_1["default"].info("No access token secret. Set the JWT_ACCESS_SECRET environment variable.");
}
exports.JWT_ACCESS_LIFETIME = process.env.JWT_ACCESS_LIFETIME || 999999;
exports.JWT_REFRESH_LIFETIME = process.env.JWT_REFRESH_LIFETIME || 999999;
