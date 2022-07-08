"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var localConfig = dotenv_1.default.config({ path: path_1.default.normalize("".concat(__dirname, "/../.env")) }).parsed;
var defaultConfig = dotenv_1.default.config({ path: path_1.default.normalize("".concat(__dirname, "/../default.env")) }).parsed;
if (!localConfig) {
    console.warn('.env file missed');
}
var parsedEnv = __assign(__assign({}, defaultConfig), localConfig);
var config = {
    db: {},
    port: +parsedEnv.CONNECTION_PORT,
    passwordSecretKey: parsedEnv.PASSWORD_SALT,
    tokenSecretKey: parsedEnv.JWT_TOKEN_SECRET_KEY,
    tokenExpiresTime: parsedEnv.TOKEN_EXPIRES_TIME,
    currentURL: parsedEnv.CURRENT_URL,
    hashAlgorithm: parsedEnv.HASH_ALGORITHM,
};
exports.default = config;
//# sourceMappingURL=config.js.map