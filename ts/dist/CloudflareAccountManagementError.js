"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudflareAccountManagementError = void 0;
class CloudflareAccountManagementError extends Error {
    isCloudflareAccountManagementError = true;
    sdk = 'CloudflareAccountManagement';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CloudflareAccountManagementError = CloudflareAccountManagementError;
//# sourceMappingURL=CloudflareAccountManagementError.js.map