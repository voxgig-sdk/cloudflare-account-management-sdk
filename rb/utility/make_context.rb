# CloudflareAccountManagement SDK utility: make_context
require_relative '../core/context'
module CloudflareAccountManagementUtilities
  MakeContext = ->(ctxmap, basectx) {
    CloudflareAccountManagementContext.new(ctxmap, basectx)
  }
end
