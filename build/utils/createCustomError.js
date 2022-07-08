"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCustomError = function (code, payload) {
    var error = new Error(payload);
    error.customErrorData = {
        payload: payload,
        code: code,
    };
    return error;
};
exports.default = createCustomError;
//# sourceMappingURL=createCustomError.js.map