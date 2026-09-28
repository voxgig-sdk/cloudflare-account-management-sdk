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

func TestKaminoEnvironmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.KaminoEnvironment(nil)
		if ent == nil {
			t.Fatal("expected non-nil KaminoEnvironmentEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"kamino_environment": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.KaminoEnvironment(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.KaminoEnvironment(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := kamino_environmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "kamino_environment." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		kaminoEnvironmentRef01Ent := client.KaminoEnvironment(nil)
		kaminoEnvironmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "kamino_environment"}), "kamino_environment_ref01"))
		kaminoEnvironmentRef01Data["zone_id"] = setup.idmap["zone01"]

		kaminoEnvironmentRef01DataResult, err := kaminoEnvironmentRef01Ent.Create(kaminoEnvironmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		kaminoEnvironmentRef01Data = core.ToMapAny(entityData(kaminoEnvironmentRef01DataResult))
		if kaminoEnvironmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if kaminoEnvironmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		kaminoEnvironmentRef01Match := map[string]any{
			"zone_id": setup.idmap["zone01"],
		}

		kaminoEnvironmentRef01ListResult, err := kaminoEnvironmentRef01Ent.List(kaminoEnvironmentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		kaminoEnvironmentRef01List, kaminoEnvironmentRef01ListOk := kaminoEnvironmentRef01ListResult.([]any)
		if !kaminoEnvironmentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", kaminoEnvironmentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(kaminoEnvironmentRef01List), map[string]any{"id": kaminoEnvironmentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		kaminoEnvironmentRef01DataUp0Up := map[string]any{
			"id": kaminoEnvironmentRef01Data["id"],
		}

		kaminoEnvironmentRef01ResdataUp0Result, err := kaminoEnvironmentRef01Ent.Update(kaminoEnvironmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		kaminoEnvironmentRef01ResdataUp0 := core.ToMapAny(entityData(kaminoEnvironmentRef01ResdataUp0Result))
		if kaminoEnvironmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if kaminoEnvironmentRef01ResdataUp0["id"] != kaminoEnvironmentRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// REMOVE
		kaminoEnvironmentRef01MatchRm0 := map[string]any{
			"id": kaminoEnvironmentRef01Data["id"],
		}
		_, err = kaminoEnvironmentRef01Ent.Remove(kaminoEnvironmentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		kaminoEnvironmentRef01MatchRt0 := map[string]any{
			"zone_id": setup.idmap["zone01"],
		}

		kaminoEnvironmentRef01ListRt0Result, err := kaminoEnvironmentRef01Ent.List(kaminoEnvironmentRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		kaminoEnvironmentRef01ListRt0, kaminoEnvironmentRef01ListRt0Ok := kaminoEnvironmentRef01ListRt0Result.([]any)
		if !kaminoEnvironmentRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", kaminoEnvironmentRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(kaminoEnvironmentRef01ListRt0), map[string]any{"id": kaminoEnvironmentRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func kamino_environmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "kamino_environment", "KaminoEnvironmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read kamino_environment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse kamino_environment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"kamino_environment01", "kamino_environment02", "kamino_environment03", "zone01", "zone02", "zone03"},
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
	entidEnvRaw := os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID": idmap,
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE":      "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID"])
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
