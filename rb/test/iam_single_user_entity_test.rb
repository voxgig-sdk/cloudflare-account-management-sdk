# IamSingleUser entity test

require "minitest/autorun"
require "json"
require_relative "../CloudflareAccountManagement_sdk"
require_relative "runner"

class IamSingleUserEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CloudflareAccountManagementSDK.test(nil, nil)
    ent = testsdk.IamSingleUser(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = iam_single_user_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "iam_single_user." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    iam_single_user_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.iam_single_user")))
    iam_single_user_ref01_data = nil
    if iam_single_user_ref01_data_raw.length > 0
      iam_single_user_ref01_data = Helpers.to_map(iam_single_user_ref01_data_raw[0][1])
    end

    # UPDATE
    iam_single_user_ref01_ent = client.IamSingleUser(nil)
    iam_single_user_ref01_data_up0_up = {
    }

    iam_single_user_ref01_markdef_up0_name = "country"
    iam_single_user_ref01_markdef_up0_value = "Mark01-iam_single_user_ref01_#{setup[:now]}"
    iam_single_user_ref01_data_up0_up[iam_single_user_ref01_markdef_up0_name] = iam_single_user_ref01_markdef_up0_value

    iam_single_user_ref01_resdata_up0_result = iam_single_user_ref01_ent.update(iam_single_user_ref01_data_up0_up, nil)
    iam_single_user_ref01_resdata_up0 = Helpers.to_map(iam_single_user_ref01_resdata_up0_result.respond_to?(:data_get) ? iam_single_user_ref01_resdata_up0_result.data_get : iam_single_user_ref01_resdata_up0_result)
    assert !iam_single_user_ref01_resdata_up0.nil?
    assert_equal iam_single_user_ref01_resdata_up0[iam_single_user_ref01_markdef_up0_name], iam_single_user_ref01_markdef_up0_value

    # LOAD
    iam_single_user_ref01_match_dt0 = {}
    iam_single_user_ref01_data_dt0_loaded = iam_single_user_ref01_ent.load(iam_single_user_ref01_match_dt0, nil)
    assert !iam_single_user_ref01_data_dt0_loaded.nil?

  end
end

def iam_single_user_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "iam_single_user", "IamSingleUserTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CloudflareAccountManagementSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["iam_single_user01", "iam_single_user02", "iam_single_user03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID" => idmap,
    "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE" => "FALSE",
    "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN" => "FALSE",
    "CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"],
      },
      extra || {},
    ])
    client = CloudflareAccountManagementSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
