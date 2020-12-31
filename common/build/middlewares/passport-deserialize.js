"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializer = void 0;
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bad_request_error_1 = require("../errors/bad-request-error");
exports.deserializer = function (req, res, next) {
    passport_1.default.deserializeUser(function (userJwt, done) {
        try {
            var payload = jsonwebtoken_1.default.verify(userJwt, process.env.JWT_KEY);
            done(undefined, payload.id);
        }
        catch (err) {
            done(new bad_request_error_1.BadRequestError('Invalid Token'), null);
        }
    });
    next();
};
