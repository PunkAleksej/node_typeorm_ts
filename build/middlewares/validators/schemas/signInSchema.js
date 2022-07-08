"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup = require("yup");
var signInSchema = yup.object({
    body: yup.object({
        password: yup.string().min(8).max(32).required(),
        email: yup.string().email().required(),
    }),
});
exports.default = signInSchema;
//# sourceMappingURL=signInSchema.js.map