-- CloudflareAccountManagement SDK error

local CloudflareAccountManagementError = {}
CloudflareAccountManagementError.__index = CloudflareAccountManagementError


function CloudflareAccountManagementError.new(code, msg, ctx)
  local self = setmetatable({}, CloudflareAccountManagementError)
  self.is_sdk_error = true
  self.sdk = "CloudflareAccountManagement"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CloudflareAccountManagementError:error()
  return self.msg
end


function CloudflareAccountManagementError:__tostring()
  return self.msg
end


return CloudflareAccountManagementError
