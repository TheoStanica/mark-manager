"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var not_authorized_error_1 = require("../errors/not-authorized-error");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var forbidden_error_1 = require("../errors/forbidden-error");
// declare global {
//   namespace Express {
//     interface Request {
//       user?: string[];
//     }
//   }
// }
exports.requireAuth = function (req, res, next) {
    // if (!req.user) {
    //   throw new NotAuthorizedError();
    // }
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('Token not found');
        throw new forbidden_error_1.ForbiddenError();
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        next();
    }
    catch (e) {
        console.log('invalid token');
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    // next();
};
