<?php
declare(strict_types=1);

// KaminoEnvironment entity test

require_once __DIR__ . '/../cloudflareaccountmanagement_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class KaminoEnvironmentEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CloudflareAccountManagementSDK::test(null, null);
        $ent = $testsdk->KaminoEnvironment(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "kamino_environment" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = CloudflareAccountManagementSDK::test($seed, null);
        $seen = iterator_to_array($base->KaminoEnvironment(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = CloudflareAccountManagementConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = CloudflareAccountManagementSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->KaminoEnvironment(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = kamino_environment_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "kamino_environment." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $kamino_environment_ref01_ent = $client->KaminoEnvironment(null);
        $kamino_environment_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.kamino_environment"), "kamino_environment_ref01"));
        $kamino_environment_ref01_data["zone_id"] = $setup["idmap"]["zone01"];

        $kamino_environment_ref01_data_result = $kamino_environment_ref01_ent->create($kamino_environment_ref01_data, null);
        $kamino_environment_ref01_data = Helpers::to_map(is_object($kamino_environment_ref01_data_result) && method_exists($kamino_environment_ref01_data_result, 'data_get') ? $kamino_environment_ref01_data_result->data_get() : $kamino_environment_ref01_data_result);
        $this->assertNotNull($kamino_environment_ref01_data);
        $this->assertNotNull($kamino_environment_ref01_data["id"]);

        // LIST
        $kamino_environment_ref01_match = [
            "zone_id" => $setup["idmap"]["zone01"],
        ];

        $kamino_environment_ref01_list_result = $kamino_environment_ref01_ent->list($kamino_environment_ref01_match, null);
        $this->assertIsArray($kamino_environment_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($kamino_environment_ref01_list_result),
            ["id" => $kamino_environment_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $kamino_environment_ref01_data_up0_up = [
            "id" => $kamino_environment_ref01_data["id"],
        ];

        $kamino_environment_ref01_resdata_up0_result = $kamino_environment_ref01_ent->update($kamino_environment_ref01_data_up0_up, null);
        $kamino_environment_ref01_resdata_up0 = Helpers::to_map(is_object($kamino_environment_ref01_resdata_up0_result) && method_exists($kamino_environment_ref01_resdata_up0_result, 'data_get') ? $kamino_environment_ref01_resdata_up0_result->data_get() : $kamino_environment_ref01_resdata_up0_result);
        $this->assertNotNull($kamino_environment_ref01_resdata_up0);
        $this->assertEquals($kamino_environment_ref01_resdata_up0["id"], $kamino_environment_ref01_data_up0_up["id"]);

        // REMOVE
        $kamino_environment_ref01_match_rm0 = [
            "id" => $kamino_environment_ref01_data["id"],
        ];
        $kamino_environment_ref01_ent->remove($kamino_environment_ref01_match_rm0, null);

        // LIST
        $kamino_environment_ref01_match_rt0 = [
            "zone_id" => $setup["idmap"]["zone01"],
        ];

        $kamino_environment_ref01_list_rt0_result = $kamino_environment_ref01_ent->list($kamino_environment_ref01_match_rt0, null);
        $this->assertIsArray($kamino_environment_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($kamino_environment_ref01_list_rt0_result),
            ["id" => $kamino_environment_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function kamino_environment_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/kamino_environment/KaminoEnvironmentTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CloudflareAccountManagementSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["kamino_environment01", "kamino_environment02", "kamino_environment03", "zone01", "zone02", "zone03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID" => $idmap,
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE" => "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN" => "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new CloudflareAccountManagementSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
