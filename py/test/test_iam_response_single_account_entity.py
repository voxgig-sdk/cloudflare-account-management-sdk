# IamResponseSingleAccount entity test

import json
import os
import time

import pytest

from cloudflareaccountmanagement_sdk.utility.voxgig_struct import voxgig_struct as vs
from cloudflareaccountmanagement_sdk import CloudflareAccountManagementSDK
from cloudflareaccountmanagement_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestIamResponseSingleAccountEntity:

    def test_should_create_instance(self):
        testsdk = CloudflareAccountManagementSDK.test(None, None)
        ent = testsdk.IamResponseSingleAccount(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _iam_response_single_account_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "iam_response_single_account." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        iam_response_single_account_ref01_ent = client.IamResponseSingleAccount(None)
        iam_response_single_account_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.iam_response_single_account"), "iam_response_single_account_ref01"))
        iam_response_single_account_ref01_data["account_id"] = setup["idmap"]["account01"]

        iam_response_single_account_ref01_data = helpers.to_map(runner.entity_data(iam_response_single_account_ref01_ent.create(iam_response_single_account_ref01_data, None)))
        assert iam_response_single_account_ref01_data is not None
        assert iam_response_single_account_ref01_data["id"] is not None

        # UPDATE
        iam_response_single_account_ref01_data_up0_up = {
            "id": iam_response_single_account_ref01_data["id"],
        }

        iam_response_single_account_ref01_resdata_up0 = helpers.to_map(runner.entity_data(iam_response_single_account_ref01_ent.update(iam_response_single_account_ref01_data_up0_up, None)))
        assert iam_response_single_account_ref01_resdata_up0 is not None
        assert iam_response_single_account_ref01_resdata_up0["id"] == iam_response_single_account_ref01_data_up0_up["id"]

        # LOAD
        iam_response_single_account_ref01_match_dt0 = {
            "id": iam_response_single_account_ref01_data["id"],
        }
        iam_response_single_account_ref01_data_dt0_loaded = iam_response_single_account_ref01_ent.load(iam_response_single_account_ref01_match_dt0, None)
        iam_response_single_account_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(iam_response_single_account_ref01_data_dt0_loaded))
        assert iam_response_single_account_ref01_data_dt0_load_result is not None
        assert iam_response_single_account_ref01_data_dt0_load_result["id"] == iam_response_single_account_ref01_data["id"]



def _iam_response_single_account_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/iam_response_single_account/IamResponseSingleAccountTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CloudflareAccountManagementSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["iam_response_single_account01", "iam_response_single_account02", "iam_response_single_account03", "account01", "account02", "account03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID": idmap,
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE": "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN": "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"),
            },
            extra or {},
        ])
        client = CloudflareAccountManagementSDK(helpers.to_map(merged_opts))

    _live = env.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
