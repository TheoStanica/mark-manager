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
exports.AccountAlreadyActivatedError = void 0;
var custom_error_1 = require("./custom-error");
var AccountAlreadyActivatedError = /** @class */ (function (_super) {
    __extends(AccountAlreadyActivatedError, _super);
    function AccountAlreadyActivatedError() {
        var _this = _super.call(this, 'Account already activated.') || this;
        _this.statusCode = 410;
        Object.setPrototypeOf(_this, AccountAlreadyActivatedError.prototype);
        return _this;
    }
    AccountAlreadyActivatedError.prototype.serializeErrors = function () {
        return [{ message: this.message }];
    };
    return AccountAlreadyActivatedError;
}(custom_error_1.CustomError));
exports.AccountAlreadyActivatedError = AccountAlreadyActivatedError;
