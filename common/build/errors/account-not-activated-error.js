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
exports.AccountNotActivatedError = void 0;
var custom_error_1 = require("./custom-error");
var AccountNotActivatedError = /** @class */ (function (_super) {
    __extends(AccountNotActivatedError, _super);
    function AccountNotActivatedError(userID) {
        var _this = _super.call(this, 'Please activate your account first!') || this;
        _this.userID = userID;
        _this.statusCode = 403;
        Object.setPrototypeOf(_this, AccountNotActivatedError.prototype);
        return _this;
    }
    AccountNotActivatedError.prototype.serializeErrors = function () {
        return [
            {
                message: this.message,
                userID: this.userID,
                errorType: 'accountNotActivated',
            },
        ];
    };
    return AccountNotActivatedError;
}(custom_error_1.CustomError));
exports.AccountNotActivatedError = AccountNotActivatedError;
