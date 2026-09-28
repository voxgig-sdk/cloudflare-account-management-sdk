<?php
declare(strict_types=1);

// CachePurgeApiResponseSingleId entity test

require_once __DIR__ . '/../cloudflareaccountmanagement_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CachePurgeApiResponseSingleIdEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CloudflareAccountManagementSDK::test(null, null);
        $ent = $testsdk->CachePurgeApiResponseSingleId(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = cache_purge_api_response_single_id_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "cache_purge_api_response_single_id." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $cache_purge_api_response_single_id_ref01_ent = $client->CachePurgeApiResponseSingleId(null);
        $cache_purge_api_response_single_id_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.cache_purge_api_response_single_id"), "cache_purge_api_response_single_id_ref01"));
        $cache_purge_api_response_single_id_ref01_data["environment_id"] = $setup["idmap"]["environment01"];
        $cache_purge_api_response_single_id_ref01_data["zone_id"] = $setup["idmap"]["zone01"];

        $cache_purge_api_response_single_id_ref01_data_result = $cache_purge_api_response_single_id_ref01_ent->create($cache_purge_api_response_single_id_ref01_data, null);
        $cache_purge_api_response_single_id_ref01_data = Helpers::to_map(is_object($cache_purge_api_response_single_id_ref01_data_result) && method_exists($cache_purge_api_response_single_id_ref01_data_result, 'data_get') ? $cache_purge_api_response_single_id_ref01_data_result->data_get() : $cache_purge_api_response_single_id_ref01_data_result);
        $this->assertNotNull($cache_purge_api_response_single_id_ref01_data);

    }
}

function cache_purge_api_response_single_id_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/cache_purge_api_response_single_id/CachePurgeApiResponseSingleIdTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CloudflareAccountManagementSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["cache_purge_api_response_single_id01", "cache_purge_api_response_single_id02", "cache_purge_api_response_single_id03", "zone01", "zone02", "zone03", "environment01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID" => $idmap,
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE" => "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN" => "FALSE",
        "CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID"]);
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
