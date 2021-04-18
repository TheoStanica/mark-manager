"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterInvalidTokensError = void 0;
var custom_error_1 = require("./custom-error");
var errorTypes_1 = require("./errorTypes");
var TwitterInvalidTokensError = /** @class */ (function (_super) {
    __extends(TwitterInvalidTokensError, _super);
    function TwitterInvalidTokensError(accountId) {
        var _this = _super.call(this, 'Invalid or expired Twitter token') || this;
        _this.accountId = accountId;
        _this.statusCode = 400;
        Object.setPrototypeOf(_this, TwitterInvalidTokensError.prototype);
        return _this;
    }
    TwitterInvalidTokensError.prototype.serializeErrors = function () {
        return [
            {
                message: this.message,
                errorType: errorTypes_1.errorTypes.InvalidTokens,
                accountId: this.accountId,
            },
        ];
    };
    return TwitterInvalidTokensError;
}(custom_error_1.CustomError));
exports.TwitterInvalidTokensError = TwitterInvalidTokensError;
