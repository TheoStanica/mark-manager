"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var not_authorized_error_1 = require("../errors/not-authorized-error");
// declare global {
//   namespace Express {
//     interface Request {
//       user?: string[];
//     }
//   }
// }
exports.requireAuth = function (req, res, next) {
    if (!req.user) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
