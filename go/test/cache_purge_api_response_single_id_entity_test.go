package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/cloudflare-account-management-sdk/go"
	"github.com/voxgig-sdk/cloudflare-account-management-sdk/go/core"

	vs "github.com/voxgig-sdk/cloudflare-account-management-sdk/go/utility/struct"
)

func TestCachePurgeApiResponseSingleIdEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CachePurgeApiResponseSingleId(nil)
		if ent == nil {
			t.Fatal("expected non-nil CachePurgeApiResponseSingleIdEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := cache_purge_api_response_single_idBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cache_purge_api_response_single_id." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		cachePurgeApiResponseSingleIdRef01Ent := client.CachePurgeApiResponseSingleId(nil)
		cachePurgeApiResponseSingleIdRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "cache_purge_api_response_single_id"}), "cache_purge_api_response_single_id_ref01"))
		cachePurgeApiResponseSingleIdRef01Data["environment_id"] = setup.idmap["environment01"]
		cachePurgeApiResponseSingleIdRef01Data["zone_id"] = setup.idmap["zone01"]

		cachePurgeApiResponseSingleIdRef01DataResult, err := cachePurgeApiResponseSingleIdRef01Ent.Create(cachePurgeApiResponseSingleIdRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		cachePurgeApiResponseSingleIdRef01Data = core.ToMapAny(entityData(cachePurgeApiResponseSingleIdRef01DataResult))
		if cachePurgeApiResponseSingleIdRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func cache_purge_api_response_single_idBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cache_purge_api_response_single_id", "CachePurgeApiResponseSingleIdTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cache_purge_api_response_single_id test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cache_purge_api_response_single_id test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"cache_purge_api_response_single_id01", "cache_purge_api_response_single_id02", "cache_purge_api_response_single_id03", "zone01", "zone02", "zone03", "environment01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID": idmap,
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE":      "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewCloudflareAccountManagementSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
