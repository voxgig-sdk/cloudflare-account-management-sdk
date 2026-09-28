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

func TestAccountSettingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AccountSetting(nil)
		if ent == nil {
			t.Fatal("expected non-nil AccountSettingEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"account_setting": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.AccountSetting(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.AccountSetting(nil).Stream("list", nil, nil) {
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
		setup := account_settingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "account_setting." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_SETTING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		accountSettingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.account_setting")))
		var accountSettingRef01Data map[string]any
		if len(accountSettingRef01DataRaw) > 0 {
			accountSettingRef01Data = core.ToMapAny(accountSettingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = accountSettingRef01Data

		// LIST
		accountSettingRef01Ent := client.AccountSetting(nil)
		accountSettingRef01Match := map[string]any{
			"account_id": setup.idmap["account01"],
		}

		accountSettingRef01ListResult, err := accountSettingRef01Ent.List(accountSettingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, accountSettingRef01ListOk := accountSettingRef01ListResult.([]any)
		if !accountSettingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", accountSettingRef01ListResult)
		}

		// UPDATE
		accountSettingRef01DataUp0Up := map[string]any{
		}

		accountSettingRef01MarkdefUp0Name := "value"
		accountSettingRef01MarkdefUp0Value := fmt.Sprintf("Mark01-account_setting_ref01_%d", setup.now)
		accountSettingRef01DataUp0Up[accountSettingRef01MarkdefUp0Name] = accountSettingRef01MarkdefUp0Value

		accountSettingRef01ResdataUp0Result, err := accountSettingRef01Ent.Update(accountSettingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		accountSettingRef01ResdataUp0 := core.ToMapAny(entityData(accountSettingRef01ResdataUp0Result))
		if accountSettingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if accountSettingRef01ResdataUp0[accountSettingRef01MarkdefUp0Name] != accountSettingRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", accountSettingRef01MarkdefUp0Name, accountSettingRef01ResdataUp0[accountSettingRef01MarkdefUp0Name])
		}

	})
}

func account_settingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "account_setting", "AccountSettingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read account_setting test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse account_setting test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"account_setting01", "account_setting02", "account_setting03", "account01", "account02", "account03"},
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
	entidEnvRaw := os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_SETTING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_SETTING_ENTID": idmap,
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE":      "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_SETTING_ENTID"])
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
