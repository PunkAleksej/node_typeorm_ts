"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var signUp_1 = require("../controllers/users/signUp");
var deleteUser_1 = require("../controllers/users/deleteUser");
var update_1 = require("../controllers/users/update");
var getMe_1 = require("../controllers/users/getMe");
var signUpSchema_1 = require("../middlewares/validators/schemas/signUpSchema");
var createValidate_1 = require("../middlewares/validators/createValidate");
var userRouter = (0, express_1.default)();
userRouter.post('/sign-up', (0, createValidate_1.default)(signUpSchema_1.default), signUp_1.default);
userRouter.delete('/:id', deleteUser_1.default);
userRouter.patch('/:id', update_1.default);
userRouter.get('/:id', getMe_1.default);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map