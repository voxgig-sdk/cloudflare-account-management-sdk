# ResourceTaggingTagKeysResponseCollection entity test

import json
import os
import time

import pytest

from cloudflareaccountmanagement_sdk.utility.voxgig_struct import voxgig_struct as vs
from cloudflareaccountmanagement_sdk import CloudflareAccountManagementSDK
from cloudflareaccountmanagement_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestResourceTaggingTagKeysResponseCollectionEntity:

    def test_should_create_instance(self):
        testsdk = CloudflareAccountManagementSDK.test(None, None)
        ent = testsdk.ResourceTaggingTagKeysResponseCollection(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "resource_tagging_tag_keys_response_collection": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = CloudflareAccountManagementSDK.test(seed, None)
        seen = list(base.ResourceTaggingTagKeysResponseCollection(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from cloudflareaccountmanagement_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = CloudflareAccountManagementSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.ResourceTaggingTagKeysResponseCollection(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _resource_tagging_tag_keys_response_collection_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "resource_tagging_tag_keys_response_collection." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        resource_tagging_tag_keys_response_collection_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.resource_tagging_tag_keys_response_collection")))
        resource_tagging_tag_keys_response_collection_ref01_data = None
        if len(resource_tagging_tag_keys_response_collection_ref01_data_raw) > 0:
            resource_tagging_tag_keys_response_collection_ref01_data = helpers.to_map(resource_tagging_tag_keys_response_collection_ref01_data_raw[0][1])

        # LIST
        resource_tagging_tag_keys_response_collection_ref01_ent = client.ResourceTaggingTagKeysResponseCollection(None)
        resource_tagging_tag_keys_response_collection_ref01_match = {
            "account_id": setup["idmap"]["account01"],
        }

        resource_tagging_tag_keys_response_collection_ref01_list_result = resource_tagging_tag_keys_response_collection_ref01_ent.list(resource_tagging_tag_keys_response_collection_ref01_match, None)
        assert isinstance(resource_tagging_tag_keys_response_collection_ref01_list_result, list)



def _resource_tagging_tag_keys_response_collection_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/resource_tagging_tag_keys_response_collection/ResourceTaggingTagKeysResponseCollectionTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CloudflareAccountManagementSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["resource_tagging_tag_keys_response_collection01", "resource_tagging_tag_keys_response_collection02", "resource_tagging_tag_keys_response_collection03", "account01", "account02", "account03"],
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
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION_ENTID": idmap,
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE": "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN": "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION_ENTID"))
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
