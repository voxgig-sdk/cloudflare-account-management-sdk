# CloudflareAccountManagement SDK utility: make_context

from cloudflareaccountmanagement_sdk.core.context import CloudflareAccountManagementContext


def make_context_util(ctxmap, basectx):
    return CloudflareAccountManagementContext(ctxmap, basectx)
