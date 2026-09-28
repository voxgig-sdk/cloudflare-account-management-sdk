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

func TestZoneHoldEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ZoneHold(nil)
		if ent == nil {
			t.Fatal("expected non-nil ZoneHoldEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := zone_holdBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "zone_hold." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		zoneHoldRef01Ent := client.ZoneHold(nil)
		zoneHoldRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "zone_hold"}), "zone_hold_ref01"))
		zoneHoldRef01Data["zone_id"] = setup.idmap["zone01"]

		zoneHoldRef01DataResult, err := zoneHoldRef01Ent.Create(zoneHoldRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		zoneHoldRef01Data = core.ToMapAny(entityData(zoneHoldRef01DataResult))
		if zoneHoldRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if zoneHoldRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		zoneHoldRef01DataUp0Up := map[string]any{
			"id": zoneHoldRef01Data["id"],
		}

		zoneHoldRef01MarkdefUp0Name := "hold_after"
		zoneHoldRef01MarkdefUp0Value := fmt.Sprintf("Mark01-zone_hold_ref01_%d", setup.now)
		zoneHoldRef01DataUp0Up[zoneHoldRef01MarkdefUp0Name] = zoneHoldRef01MarkdefUp0Value

		zoneHoldRef01ResdataUp0Result, err := zoneHoldRef01Ent.Update(zoneHoldRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		zoneHoldRef01ResdataUp0 := core.ToMapAny(entityData(zoneHoldRef01ResdataUp0Result))
		if zoneHoldRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if zoneHoldRef01ResdataUp0["id"] != zoneHoldRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if zoneHoldRef01ResdataUp0[zoneHoldRef01MarkdefUp0Name] != zoneHoldRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", zoneHoldRef01MarkdefUp0Name, zoneHoldRef01ResdataUp0[zoneHoldRef01MarkdefUp0Name])
		}

		// LOAD
		zoneHoldRef01MatchDt0 := map[string]any{
			"id": zoneHoldRef01Data["id"],
		}
		zoneHoldRef01DataDt0Loaded, err := zoneHoldRef01Ent.Load(zoneHoldRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		zoneHoldRef01DataDt0LoadResult := core.ToMapAny(entityData(zoneHoldRef01DataDt0Loaded))
		if zoneHoldRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if zoneHoldRef01DataDt0LoadResult["id"] != zoneHoldRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		zoneHoldRef01MatchRm0 := map[string]any{
			"id": zoneHoldRef01Data["id"],
		}
		_, err = zoneHoldRef01Ent.Remove(zoneHoldRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func zone_holdBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "zone_hold", "ZoneHoldTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read zone_hold test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse zone_hold test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"zone_hold01", "zone_hold02", "zone_hold03", "zone01", "zone02", "zone03"},
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
	entidEnvRaw := os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID": idmap,
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE":      "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID"])
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
