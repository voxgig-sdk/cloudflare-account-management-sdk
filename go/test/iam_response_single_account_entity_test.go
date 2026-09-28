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

func TestIamResponseSingleAccountEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.IamResponseSingleAccount(nil)
		if ent == nil {
			t.Fatal("expected non-nil IamResponseSingleAccountEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := iam_response_single_accountBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "iam_response_single_account." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		iamResponseSingleAccountRef01Ent := client.IamResponseSingleAccount(nil)
		iamResponseSingleAccountRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "iam_response_single_account"}), "iam_response_single_account_ref01"))
		iamResponseSingleAccountRef01Data["account_id"] = setup.idmap["account01"]

		iamResponseSingleAccountRef01DataResult, err := iamResponseSingleAccountRef01Ent.Create(iamResponseSingleAccountRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		iamResponseSingleAccountRef01Data = core.ToMapAny(entityData(iamResponseSingleAccountRef01DataResult))
		if iamResponseSingleAccountRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if iamResponseSingleAccountRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		iamResponseSingleAccountRef01DataUp0Up := map[string]any{
			"id": iamResponseSingleAccountRef01Data["id"],
		}

		iamResponseSingleAccountRef01ResdataUp0Result, err := iamResponseSingleAccountRef01Ent.Update(iamResponseSingleAccountRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		iamResponseSingleAccountRef01ResdataUp0 := core.ToMapAny(entityData(iamResponseSingleAccountRef01ResdataUp0Result))
		if iamResponseSingleAccountRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if iamResponseSingleAccountRef01ResdataUp0["id"] != iamResponseSingleAccountRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// LOAD
		iamResponseSingleAccountRef01MatchDt0 := map[string]any{
			"id": iamResponseSingleAccountRef01Data["id"],
		}
		iamResponseSingleAccountRef01DataDt0Loaded, err := iamResponseSingleAccountRef01Ent.Load(iamResponseSingleAccountRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		iamResponseSingleAccountRef01DataDt0LoadResult := core.ToMapAny(entityData(iamResponseSingleAccountRef01DataDt0Loaded))
		if iamResponseSingleAccountRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if iamResponseSingleAccountRef01DataDt0LoadResult["id"] != iamResponseSingleAccountRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func iam_response_single_accountBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "iam_response_single_account", "IamResponseSingleAccountTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read iam_response_single_account test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse iam_response_single_account test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"iam_response_single_account01", "iam_response_single_account02", "iam_response_single_account03", "account01", "account02", "account03"},
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
	entidEnvRaw := os.Getenv("CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID": idmap,
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE":      "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID"])
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
