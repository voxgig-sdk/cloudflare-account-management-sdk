package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/cloudflare-account-management-sdk/go"
)

// Args is the common argument shape for both tools. `entity` selects
// the SDK entity to operate on; `query` is the optional reqmatch /
// reqdata map passed through to the SDK. For load, `query` should be
// `{"id": <value>}`. For list, omit `query` or pass an empty map.
type Args struct {
	Entity string         `json:"entity" jsonschema:"account | account_setting | cache_purge_api_response_single_id | cps_communication_preference | iam_api_response_single_id | iam_response_single_account | iam_single_user | kamino_environment | resource | resource_tagging | resource_tagging_tag_key_summary_response_collection | resource_tagging_tag_keys_response_collection | resource_tagging_tag_values_response_collection | resource_tagging_tagged_resource_response_single | zone | zone_hold"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional match map e.g. {\"id\":1} for load, omit for list"`
}

func registerTools(server *mcp.Server, client *sdk.CloudflareAccountManagementSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name: "cloudflare-account-management_list",
		Description: "List records from CloudflareAccountManagement. " +
			"Args: entity (one of the supported SDK entities), query (optional filter map). " +
			"Returns the first page of records as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "list", args)
	})

	mcp.AddTool(server, &mcp.Tool{
		Name: "cloudflare-account-management_load",
		Description: "Load a single record from CloudflareAccountManagement. " +
			"Args: entity, query ({\"id\":N} required). Returns the record as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "load", args)
	})
}

func runOp(client *sdk.CloudflareAccountManagementSDK, op string, args Args) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, args.Entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(args.Query, nil)
	case "load":
		result, err = ent.Load(args.Query, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.CloudflareAccountManagementSDK, name string) (sdk.CloudflareAccountManagementEntity, error) {
	switch strings.ToLower(name) {
	case "account":
		return client.Account(nil), nil
	case "account_setting":
		return client.AccountSetting(nil), nil
	case "cache_purge_api_response_single_id":
		return client.CachePurgeApiResponseSingleId(nil), nil
	case "cps_communication_preference":
		return client.CpsCommunicationPreference(nil), nil
	case "iam_api_response_single_id":
		return client.IamApiResponseSingleId(nil), nil
	case "iam_response_single_account":
		return client.IamResponseSingleAccount(nil), nil
	case "iam_single_user":
		return client.IamSingleUser(nil), nil
	case "kamino_environment":
		return client.KaminoEnvironment(nil), nil
	case "resource":
		return client.Resource(nil), nil
	case "resource_tagging":
		return client.ResourceTagging(nil), nil
	case "resource_tagging_tag_key_summary_response_collection":
		return client.ResourceTaggingTagKeySummaryResponseCollection(nil), nil
	case "resource_tagging_tag_keys_response_collection":
		return client.ResourceTaggingTagKeysResponseCollection(nil), nil
	case "resource_tagging_tag_values_response_collection":
		return client.ResourceTaggingTagValuesResponseCollection(nil), nil
	case "resource_tagging_tagged_resource_response_single":
		return client.ResourceTaggingTaggedResourceResponseSingle(nil), nil
	case "zone":
		return client.Zone(nil), nil
	case "zone_hold":
		return client.ZoneHold(nil), nil

	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}
