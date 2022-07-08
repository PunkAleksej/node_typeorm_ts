"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var check_1 = require("express-validator/check");
var jsonwebtoken_1 = require("jsonwebtoken");
var passHasher_js_1 = require("../utils/passHasher.js");
function regUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, firstName, lastName, email, password, DoB, hashedPassword, user, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, check_1.validationResult)(request);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, response.status(400).json({
                                errors: errors.array(),
                            })];
                    }
                    _a = request.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, DoB = _a.DoB;
                    hashedPassword = (0, passHasher_js_1.default)(password);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db.User.create({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: hashedPassword,
                            DoB: DoB,
                        })];
                case 2:
                    user = _b.sent();
                    response.status(201).json({ message: 'registrartion complete' });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    response.status(400).json({ message: 'error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var token, profileData, id, user, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = request.headers.authorization;
                    if (!token) {
                        response.status(400).json({ message: 'user not auth' });
                    }
                    profileData = jsonwebtoken_1.default.verify(token, 'SECRET_KEY');
                    if (!profileData) {
                        response.sendStatus(403);
                    }
                    id = profileData.id;
                    return [4 /*yield*/, db.User.destroy({
                            where: {
                                id: id,
                            },
                        })];
                case 1:
                    user = _a.sent();
                    response.status(200).json(user);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    response.status(400).json({ message: 'error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.query.id;
                    return [4 /*yield*/, db.User.findOne({
                            where: {
                                id: id,
                            },
                        })];
                case 1:
                    user = _a.sent();
                    response.status(200).json({
                        user: user,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    response.status(400).json({ message: 'error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var token, profileData, id, _a, firstName, lastName, email, password, updateUserInfo, user, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = request.headers.authorization;
                    if (!token) {
                        response.status(400).json({ message: 'user not auth' });
                    }
                    profileData = jsonwebtoken_1.default.verify(token, 'SECRET_KEY');
                    if (!profileData) {
                        response.sendStatus(403);
                    }
                    id = profileData.id;
                    _a = request.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                    updateUserInfo = {};
                    if (password) {
                        updateUserInfo.password = (0, passHasher_js_1.default)(password);
                    }
                    if (email) {
                        updateUserInfo.email = email;
                    }
                    if (firstName) {
                        updateUserInfo.firstName = firstName;
                    }
                    if (lastName) {
                        updateUserInfo.lastName = lastName;
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db.User.update(updateUserInfo, {
                            where: {
                                id: id,
                            },
                        })];
                case 2:
                    user = _b.sent();
                    response.status(200).json({
                        user: user,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _b.sent();
                    response.status(400).json({ message: 'error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = { regUser: regUser, getUser: getUser, deleteUser: deleteUser, updateUser: updateUser };
// async function regUser (request: Request, response: Response) {
//     const errors = validationResult(request);
//     if (!errors.isEmpty()) {
//         return response.status(400).json({
//             errors: errors.array()
//         });
//     }
//     const { firstName, lastName, email, password, DoB } = request.body
//     const hashedPassword = hasher(password)
//     try {
//         const user = await db.User.create({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             DoB
//         })
//         response.status(201).json({message: "registrartion complete"})
//     } catch (err) {
//         response.status(400).json({ message: 'error'})
//     }
// };
// async function deleteUser (request: Request, response: Response) {
//     try {
//         const token = request.headers.authorization;
//         if (!token) {
//           response.status(400).json({message: "user not auth"})
//         }
//         const profileData = jwt.verify(token, 'SECRET_KEY')
//         if (!profileData) {
//           response.sendStatus(403);
//         }
//         const id = profileData.id
//         const user = await db.User.destroy({
//           where : {
//               id
//           }
//         })
//         response.status(200).json(user)
//     } catch (err) {
//         response.status(400).json({ message: 'error' })
//     }
// };
// async function getUser(request: Request, response: Response) {
//     try {
//     const { id } = request.query
//     const user = await db.User.findOne({
//             where: {
//                 id
//             }
//         })
//         response.status(200).json({
//             user
//         })
//     } catch (err) {
//         response.status(400).json({ message: 'error' })
//     }
// };
// export type UserInfo = {
//   password?: string;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
// }
// async function updateUser(request: Request, response: Response) {
//     const token = request.headers.authorization;
//     if (!token) {
//       response.status(400).json({message: "user not auth"})
//     }
//     const profileData = jwt.verify(token, 'SECRET_KEY')
//     if (!profileData) {
//       response.sendStatus(403);
//     }
//     const id = profileData.id
//     const { firstName, lastName, email, password} = request.body
//     const updateUserInfo: UserInfo = {};
//     if (password) {
//         updateUserInfo.password = hasher(password)
//     }
//     if (email) {
//         updateUserInfo.email = email
//     }
//     if (firstName) {
//         updateUserInfo.firstName = firstName
//     }
//     if (lastName) {
//         updateUserInfo.lastName = lastName
//     }
//     try {
//         const user = await db.User.update(
//             updateUserInfo,
//             {
//                 where: {
//                     id
//                 }
//             },
//         );
//         response.status(200).json({
//             user
//         })
//     } catch (err) {
//         response.status(400).json({ message: 'error' })
//     }
// };
// export default { regUser, getUser, deleteUser, updateUser };
//# sourceMappingURL=regController.js.map