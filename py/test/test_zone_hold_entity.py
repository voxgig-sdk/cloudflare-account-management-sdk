# ZoneHold entity test

import json
import os
import time

import pytest

from cloudflareaccountmanagement_sdk.utility.voxgig_struct import voxgig_struct as vs
from cloudflareaccountmanagement_sdk import CloudflareAccountManagementSDK
from cloudflareaccountmanagement_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestZoneHoldEntity:

    def test_should_create_instance(self):
        testsdk = CloudflareAccountManagementSDK.test(None, None)
        ent = testsdk.ZoneHold(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _zone_hold_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "zone_hold." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        zone_hold_ref01_ent = client.ZoneHold(None)
        zone_hold_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.zone_hold"), "zone_hold_ref01"))
        zone_hold_ref01_data["zone_id"] = setup["idmap"]["zone01"]

        zone_hold_ref01_data = helpers.to_map(runner.entity_data(zone_hold_ref01_ent.create(zone_hold_ref01_data, None)))
        assert zone_hold_ref01_data is not None
        assert zone_hold_ref01_data["id"] is not None

        # UPDATE
        zone_hold_ref01_data_up0_up = {
            "id": zone_hold_ref01_data["id"],
        }

        zone_hold_ref01_markdef_up0_name = "hold_after"
        zone_hold_ref01_markdef_up0_value = "Mark01-zone_hold_ref01_" + str(setup["now"])
        zone_hold_ref01_data_up0_up[zone_hold_ref01_markdef_up0_name] = zone_hold_ref01_markdef_up0_value

        zone_hold_ref01_resdata_up0 = helpers.to_map(runner.entity_data(zone_hold_ref01_ent.update(zone_hold_ref01_data_up0_up, None)))
        assert zone_hold_ref01_resdata_up0 is not None
        assert zone_hold_ref01_resdata_up0["id"] == zone_hold_ref01_data_up0_up["id"]
        assert zone_hold_ref01_resdata_up0[zone_hold_ref01_markdef_up0_name] == zone_hold_ref01_markdef_up0_value

        # LOAD
        zone_hold_ref01_match_dt0 = {
            "id": zone_hold_ref01_data["id"],
        }
        zone_hold_ref01_data_dt0_loaded = zone_hold_ref01_ent.load(zone_hold_ref01_match_dt0, None)
        zone_hold_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(zone_hold_ref01_data_dt0_loaded))
        assert zone_hold_ref01_data_dt0_load_result is not None
        assert zone_hold_ref01_data_dt0_load_result["id"] == zone_hold_ref01_data["id"]

        # REMOVE
        zone_hold_ref01_match_rm0 = {
            "id": zone_hold_ref01_data["id"],
        }
        zone_hold_ref01_ent.remove(zone_hold_ref01_match_rm0, None)



def _zone_hold_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/zone_hold/ZoneHoldTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CloudflareAccountManagementSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["zone_hold01", "zone_hold02", "zone_hold03", "zone01", "zone02", "zone03"],
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
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID": idmap,
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE": "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN": "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID"))
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
