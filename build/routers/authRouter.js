"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var signIn_1 = require("../controllers/login/signIn");
var testToken_1 = require("../controllers/login/testToken");
var signInSchema_1 = require("../middlewares/validators/schemas/signInSchema");
var authSchema_1 = require("../middlewares/validators/schemas/authSchema");
var createValidate_1 = require("../middlewares/validators/createValidate");
var authRouter = (0, express_1.default)();
authRouter.post('/sign-in', (0, createValidate_1.default)(signInSchema_1.default), signIn_1.default);
authRouter.post('/test-login', (0, createValidate_1.default)(authSchema_1.default), testToken_1.default);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map