"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../config");
var generateAccessToken = function (id) {
    var payload = { id: id };
    return jsonwebtoken_1.default.sign(payload, config_1.default.tokenSecretKey, { expiresIn: config_1.default.tokenExpiresTime });
};
var validateAccessToken = function (token) {
    return jsonwebtoken_1.default.verify(token, config_1.default.tokenSecretKey);
};
exports.default = { validateAccessToken: validateAccessToken, generateAccessToken: generateAccessToken };
//# sourceMappingURL=jwtTools.js.map