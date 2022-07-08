"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    var _a;
    var _b = err.statusCode, statusCode = _b === void 0 ? 500 : _b;
    if (err.customErrorData) {
        return res
            .status(statusCode)
            .json({ message: (_a = err.customErrorData) === null || _a === void 0 ? void 0 : _a.payload });
    }
    return res
        .status(404)
        .json({ message: 'unknown error' });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map