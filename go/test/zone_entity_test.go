package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestZoneEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Zone(nil)
		if ent == nil {
			t.Fatal("expected non-nil ZoneEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"zone": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Zone(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Zone(nil).Stream("list", nil, nil) {
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
		setup := zoneBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "zone." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		zoneRef01Ent := client.Zone(nil)
		zoneRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "zone"}), "zone_ref01"))

		zoneRef01DataResult, err := zoneRef01Ent.Create(zoneRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		zoneRef01Data = core.ToMapAny(entityData(zoneRef01DataResult))
		if zoneRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if zoneRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		zoneRef01Match := map[string]any{}

		zoneRef01ListResult, err := zoneRef01Ent.List(zoneRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		zoneRef01List, zoneRef01ListOk := zoneRef01ListResult.([]any)
		if !zoneRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", zoneRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(zoneRef01List), map[string]any{"id": zoneRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		zoneRef01DataUp0Up := map[string]any{
			"id": zoneRef01Data["id"],
		}

		zoneRef01MarkdefUp0Name := "name"
		zoneRef01MarkdefUp0Value := fmt.Sprintf("Mark01-zone_ref01_%d", setup.now)
		zoneRef01DataUp0Up[zoneRef01MarkdefUp0Name] = zoneRef01MarkdefUp0Value

		zoneRef01ResdataUp0Result, err := zoneRef01Ent.Update(zoneRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		zoneRef01ResdataUp0 := core.ToMapAny(entityData(zoneRef01ResdataUp0Result))
		if zoneRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if zoneRef01ResdataUp0["id"] != zoneRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if zoneRef01ResdataUp0[zoneRef01MarkdefUp0Name] != zoneRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", zoneRef01MarkdefUp0Name, zoneRef01ResdataUp0[zoneRef01MarkdefUp0Name])
		}

		// LOAD
		zoneRef01MatchDt0 := map[string]any{
			"id": zoneRef01Data["id"],
		}
		zoneRef01DataDt0Loaded, err := zoneRef01Ent.Load(zoneRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		zoneRef01DataDt0LoadResult := core.ToMapAny(entityData(zoneRef01DataDt0Loaded))
		if zoneRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if zoneRef01DataDt0LoadResult["id"] != zoneRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		zoneRef01MatchRm0 := map[string]any{
			"id": zoneRef01Data["id"],
		}
		_, err = zoneRef01Ent.Remove(zoneRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		zoneRef01MatchRt0 := map[string]any{}

		zoneRef01ListRt0Result, err := zoneRef01Ent.List(zoneRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		zoneRef01ListRt0, zoneRef01ListRt0Ok := zoneRef01ListRt0Result.([]any)
		if !zoneRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", zoneRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(zoneRef01ListRt0), map[string]any{"id": zoneRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func zoneBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "zone", "ZoneTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read zone test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse zone test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"zone01", "zone02", "zone03"},
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
	entidEnvRaw := os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_ENTID": idmap,
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE":      "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_ENTID"])
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
