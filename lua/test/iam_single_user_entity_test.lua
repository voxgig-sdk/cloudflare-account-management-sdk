-- IamSingleUser entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("cloudflare-account-management_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("IamSingleUserEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:IamSingleUser(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = iam_single_user_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "iam_single_user." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local iam_single_user_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.iam_single_user")))
    local iam_single_user_ref01_data = nil
    if #iam_single_user_ref01_data_raw > 0 then
      iam_single_user_ref01_data = helpers.to_map(iam_single_user_ref01_data_raw[1][2])
    end

    -- UPDATE
    local iam_single_user_ref01_ent = client:IamSingleUser(nil)
    local iam_single_user_ref01_data_up0_up = {
    }

    local iam_single_user_ref01_markdef_up0_name = "country"
    local iam_single_user_ref01_markdef_up0_value = "Mark01-iam_single_user_ref01_" .. tostring(setup.now)
    iam_single_user_ref01_data_up0_up[iam_single_user_ref01_markdef_up0_name] = iam_single_user_ref01_markdef_up0_value

    local iam_single_user_ref01_resdata_up0_result, err = iam_single_user_ref01_ent:update(iam_single_user_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local iam_single_user_ref01_resdata_up0 = helpers.to_map(type(iam_single_user_ref01_resdata_up0_result) == 'table' and iam_single_user_ref01_resdata_up0_result.data_get and iam_single_user_ref01_resdata_up0_result:data_get() or iam_single_user_ref01_resdata_up0_result)
    assert.is_not_nil(iam_single_user_ref01_resdata_up0)
    assert.are.equal(iam_single_user_ref01_resdata_up0[iam_single_user_ref01_markdef_up0_name], iam_single_user_ref01_markdef_up0_value)

    -- LOAD
    local iam_single_user_ref01_match_dt0 = {}
    local iam_single_user_ref01_data_dt0_loaded, err = iam_single_user_ref01_ent:load(iam_single_user_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(iam_single_user_ref01_data_dt0_loaded)

  end)
end)

function iam_single_user_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/iam_single_user/IamSingleUserTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read iam_single_user test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "iam_single_user01", "iam_single_user02", "iam_single_user03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID"] = idmap,
    ["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] = "FALSE",
    ["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN"] = "FALSE",
    ["CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
