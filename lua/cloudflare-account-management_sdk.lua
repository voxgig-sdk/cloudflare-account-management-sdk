-- CloudflareAccountManagement SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("cloudflare-account-management_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local CloudflareAccountManagementSDK = {}
CloudflareAccountManagementSDK.__index = CloudflareAccountManagementSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

CloudflareAccountManagementSDK._make_feature = _make_feature


function CloudflareAccountManagementSDK.new(options)
  local self = setmetatable({}, CloudflareAccountManagementSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: test


  return self
end


function CloudflareAccountManagementSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function CloudflareAccountManagementSDK:get_utility()
  return Utility.copy(self._utility)
end


function CloudflareAccountManagementSDK:get_root_ctx()
  return self._rootctx
end


function CloudflareAccountManagementSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function CloudflareAccountManagementSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function CloudflareAccountManagementSDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function CloudflareAccountManagementSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "CloudflareAccountManagementSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function CloudflareAccountManagementSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function CloudflareAccountManagementSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "CloudflareAccountManagementSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Account():list() / client:Account():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:Account(data)
  local EntityMod = require("entity.account_entity")
  if data == nil then
    if self._account == nil then
      self._account = EntityMod.new(self, nil)
    end
    return self._account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AccountSetting():list() / client:AccountSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:AccountSetting(data)
  local EntityMod = require("entity.account_setting_entity")
  if data == nil then
    if self._account_setting == nil then
      self._account_setting = EntityMod.new(self, nil)
    end
    return self._account_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CachePurgeApiResponseSingleId():list() / client:CachePurgeApiResponseSingleId():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:CachePurgeApiResponseSingleId(data)
  local EntityMod = require("entity.cache_purge_api_response_single_id_entity")
  if data == nil then
    if self._cache_purge_api_response_single_id == nil then
      self._cache_purge_api_response_single_id = EntityMod.new(self, nil)
    end
    return self._cache_purge_api_response_single_id
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CpsCommunicationPreference():list() / client:CpsCommunicationPreference():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:CpsCommunicationPreference(data)
  local EntityMod = require("entity.cps_communication_preference_entity")
  if data == nil then
    if self._cps_communication_preference == nil then
      self._cps_communication_preference = EntityMod.new(self, nil)
    end
    return self._cps_communication_preference
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IamApiResponseSingleId():list() / client:IamApiResponseSingleId():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:IamApiResponseSingleId(data)
  local EntityMod = require("entity.iam_api_response_single_id_entity")
  if data == nil then
    if self._iam_api_response_single_id == nil then
      self._iam_api_response_single_id = EntityMod.new(self, nil)
    end
    return self._iam_api_response_single_id
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IamResponseSingleAccount():list() / client:IamResponseSingleAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:IamResponseSingleAccount(data)
  local EntityMod = require("entity.iam_response_single_account_entity")
  if data == nil then
    if self._iam_response_single_account == nil then
      self._iam_response_single_account = EntityMod.new(self, nil)
    end
    return self._iam_response_single_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IamSingleUser():list() / client:IamSingleUser():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:IamSingleUser(data)
  local EntityMod = require("entity.iam_single_user_entity")
  if data == nil then
    if self._iam_single_user == nil then
      self._iam_single_user = EntityMod.new(self, nil)
    end
    return self._iam_single_user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:KaminoEnvironment():list() / client:KaminoEnvironment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:KaminoEnvironment(data)
  local EntityMod = require("entity.kamino_environment_entity")
  if data == nil then
    if self._kamino_environment == nil then
      self._kamino_environment = EntityMod.new(self, nil)
    end
    return self._kamino_environment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Resource():list() / client:Resource():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:Resource(data)
  local EntityMod = require("entity.resource_entity")
  if data == nil then
    if self._resource == nil then
      self._resource = EntityMod.new(self, nil)
    end
    return self._resource
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ResourceTagging():list() / client:ResourceTagging():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:ResourceTagging(data)
  local EntityMod = require("entity.resource_tagging_entity")
  if data == nil then
    if self._resource_tagging == nil then
      self._resource_tagging = EntityMod.new(self, nil)
    end
    return self._resource_tagging
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ResourceTaggingTagKeySummaryResponseCollection():list() / client:ResourceTaggingTagKeySummaryResponseCollection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:ResourceTaggingTagKeySummaryResponseCollection(data)
  local EntityMod = require("entity.resource_tagging_tag_key_summary_response_collection_entity")
  if data == nil then
    if self._resource_tagging_tag_key_summary_response_collection == nil then
      self._resource_tagging_tag_key_summary_response_collection = EntityMod.new(self, nil)
    end
    return self._resource_tagging_tag_key_summary_response_collection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ResourceTaggingTagKeysResponseCollection():list() / client:ResourceTaggingTagKeysResponseCollection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:ResourceTaggingTagKeysResponseCollection(data)
  local EntityMod = require("entity.resource_tagging_tag_keys_response_collection_entity")
  if data == nil then
    if self._resource_tagging_tag_keys_response_collection == nil then
      self._resource_tagging_tag_keys_response_collection = EntityMod.new(self, nil)
    end
    return self._resource_tagging_tag_keys_response_collection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ResourceTaggingTagValuesResponseCollection():list() / client:ResourceTaggingTagValuesResponseCollection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:ResourceTaggingTagValuesResponseCollection(data)
  local EntityMod = require("entity.resource_tagging_tag_values_response_collection_entity")
  if data == nil then
    if self._resource_tagging_tag_values_response_collection == nil then
      self._resource_tagging_tag_values_response_collection = EntityMod.new(self, nil)
    end
    return self._resource_tagging_tag_values_response_collection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ResourceTaggingTaggedResourceResponseSingle():list() / client:ResourceTaggingTaggedResourceResponseSingle():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:ResourceTaggingTaggedResourceResponseSingle(data)
  local EntityMod = require("entity.resource_tagging_tagged_resource_response_single_entity")
  if data == nil then
    if self._resource_tagging_tagged_resource_response_single == nil then
      self._resource_tagging_tagged_resource_response_single = EntityMod.new(self, nil)
    end
    return self._resource_tagging_tagged_resource_response_single
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Zone():list() / client:Zone():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:Zone(data)
  local EntityMod = require("entity.zone_entity")
  if data == nil then
    if self._zone == nil then
      self._zone = EntityMod.new(self, nil)
    end
    return self._zone
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ZoneHold():list() / client:ZoneHold():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function CloudflareAccountManagementSDK:ZoneHold(data)
  local EntityMod = require("entity.zone_hold_entity")
  if data == nil then
    if self._zone_hold == nil then
      self._zone_hold = EntityMod.new(self, nil)
    end
    return self._zone_hold
  end
  return EntityMod.new(self, data)
end




function CloudflareAccountManagementSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = CloudflareAccountManagementSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return CloudflareAccountManagementSDK
