"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup = require("yup");
var authSchema = yup.object({
    headers: yup.object({
        authorization: yup.string().required(),
    }),
});
exports.default = authSchema;
//# sourceMappingURL=authSchema.js.map