"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var config_1 = require("../config");
var passHasher = function (password) {
    return crypto
        .createHmac(config_1.default.hashAlgorithm, password)
        .update(config_1.default.passwordSecretKey)
        .digest('hex');
};
var validatePassword = function (password, hashedPassword) {
    return passHasher(password) === hashedPassword;
};
exports.default = { passHasher: passHasher, validatePassword: validatePassword };
//# sourceMappingURL=passHasher.js.map