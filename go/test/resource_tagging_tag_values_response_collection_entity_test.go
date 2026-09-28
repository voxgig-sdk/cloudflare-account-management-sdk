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

func TestResourceTaggingTagValuesResponseCollectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ResourceTaggingTagValuesResponseCollection(nil)
		if ent == nil {
			t.Fatal("expected non-nil ResourceTaggingTagValuesResponseCollectionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := resource_tagging_tag_values_response_collectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "resource_tagging_tag_values_response_collection." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_VALUES_RESPONSE_COLLECTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		resourceTaggingTagValuesResponseCollectionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.resource_tagging_tag_values_response_collection")))
		var resourceTaggingTagValuesResponseCollectionRef01Data map[string]any
		if len(resourceTaggingTagValuesResponseCollectionRef01DataRaw) > 0 {
			resourceTaggingTagValuesResponseCollectionRef01Data = core.ToMapAny(resourceTaggingTagValuesResponseCollectionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = resourceTaggingTagValuesResponseCollectionRef01Data

		// LOAD
		resourceTaggingTagValuesResponseCollectionRef01Ent := client.ResourceTaggingTagValuesResponseCollection(nil)
		resourceTaggingTagValuesResponseCollectionRef01MatchDt0 := map[string]any{}
		resourceTaggingTagValuesResponseCollectionRef01DataDt0Loaded, err := resourceTaggingTagValuesResponseCollectionRef01Ent.Load(resourceTaggingTagValuesResponseCollectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if resourceTaggingTagValuesResponseCollectionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func resource_tagging_tag_values_response_collectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "resource_tagging_tag_values_response_collection", "ResourceTaggingTagValuesResponseCollectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read resource_tagging_tag_values_response_collection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse resource_tagging_tag_values_response_collection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"resource_tagging_tag_values_response_collection01", "resource_tagging_tag_values_response_collection02", "resource_tagging_tag_values_response_collection03", "account01", "account02", "account03"},
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
	entidEnvRaw := os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_VALUES_RESPONSE_COLLECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_VALUES_RESPONSE_COLLECTION_ENTID": idmap,
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE":      "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_VALUES_RESPONSE_COLLECTION_ENTID"])
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
