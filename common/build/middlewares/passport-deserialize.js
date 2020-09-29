"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializer = void 0;
var passport_1 = __importDefault(require("passport"));
exports.deserializer = function (req, res, next) {
    passport_1.default.deserializeUser(function (id, done) {
        done(id);
    });
    next();
};
