"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ResourceTaggingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CloudflareAccountManagementSDK.test();
        const ent = testsdk.ResourceTagging();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'resource_tagging.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "resource_tagging", "op": { "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /accounts/{account_id}/tags", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"", "k": "header", "n": "if_match", "or": "if_match", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "account_id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/accounts/{account_id}/tags", "q": { "exist": ["account_id", "if_match"] }, "r": {}, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /zones/{zone_id}/tags", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"", "k": "header", "n": "if_match", "or": "if_match", "r": false, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/zones/{zone_id}/tags", "q": { "exist": ["if_match", "zone_id"] }, "r": {}, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.account"], ["$.main.kit.entity.zone"]] }, "key$": "resource_tagging", "name__orig": "resource_tagging", "Name": "ResourceTagging", "name_": "resource_tagging", "name-": "resource-tagging", "NAME": "RESOURCE_TAGGING", "index$": 9 }, { "active": true, "entity": "resource_tagging", "key$": "BasicResourceTaggingFlow", "kind": "basic", "name": "BasicResourceTaggingFlow", "param": {}, "step": [] }, 'ResourceTagging', { "DELETE /accounts/{account_id}/tags": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "description": "Request body schema for deleting tags from account-level resources. Use /zones/{zone_id}/tags for zone-level resources.", "discriminator": { "mapping": { "access_application": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "access_group": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "account": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "account_ruleset": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "ai_gateway": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "alerting_policy": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "alerting_webhook": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "cloudflared_tunnel": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "cws_deployment": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "cws_policy": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "cws_policy_set": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "cws_workload": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "d1_database": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "durable_object_namespace": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "gateway_list": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "gateway_rule": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "image": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "infrastructure_target": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "kv_namespace": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "load_balancer_monitor": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "load_balancer_pool": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "pages_project": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "queue": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "r2_bucket": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "resource_share": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "stream_live_input": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "stream_video": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "vectorize_index": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "worker": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base", "worker_version": "#/components/schemas/resource-tagging_delete_tags_request_account_level_worker_version" }, "propertyName": "resource_type" }, "oneOf": [{ "description": "Request body schema for deleting tags from worker_version resources.", "allOf": [{ "description": "Request body schema for deleting tags from account-level resources.", "type": "object", "properties": { "resource_id": {}, "resource_type": {} }, "required": ["resource_type", "resource_id"], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base" }, { "properties": { "resource_type": {}, "worker_id": {} }, "required": ["worker_id"], "type": "object" }], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_account_level_worker_version" }, { "description": "Request body schema for deleting tags from account-level resources.", "type": "object", "properties": { "resource_id": { "description": "Identifies the unique resource.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "x-auditable": true, "x-ref": "#/components/schemas/resource-tagging_resource_id" }, "resource_type": { "description": "Enum for base account-level resource types (those with no extra required fields).", "type": "string", "example": "worker", "enum": ["access_application", "access_group", "account", "account_ruleset", "ai_gateway", "alerting_policy", "alerting_webhook", "cloudflared_tunnel", "cws_deployment", "cws_policy", "cws_policy_set", "cws_workload", "d1_database", "durable_object_namespace", "gateway_list", "gateway_rule", "image", "infrastructure_target", "kv_namespace", "load_balancer_monitor", "load_balancer_pool", "pages_project", "queue", "r2_bucket", "resource_share", "stream_live_input", "stream_video", "vectorize_index", "worker"], "x-auditable": true, "x-ref": "#/components/schemas/resource-tagging_account_resource_type_base_enum" } }, "required": ["resource_type", "resource_id"], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_account_level_base" }], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_account_level" } } } }, "parameters": [{ "name": "account_id", "in": "path", "required": true, "schema": { "allOf": [{ "description": "Identifier.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-auditable": true, "x-ref": "#/components/schemas/resource-tagging_identifier" }], "minLength": 32, "x-ref": "#/components/schemas/resource-tagging_account_id" }, "index$": 0 }, { "description": "ETag value for optimistic concurrency control. When provided, the server will\nverify the current resource ETag matches before applying the write. Returns\n412 Precondition Failed if the resource has been modified since the ETag was\nobtained. Omit this header for unconditional writes.\n", "in": "header", "name": "If-Match", "schema": { "type": "string", "example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"" }, "x-ref": "#/components/parameters/resource-tagging_if_match", "index$": 1 }] }, "DELETE /zones/{zone_id}/tags": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "description": "Request body schema for deleting tags from zone-level resources.", "discriminator": { "mapping": { "access_application_policy": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_access_application_policy", "api_gateway_operation": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "custom_certificate": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "custom_hostname": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "dns_record": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "healthcheck": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "load_balancer": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "managed_client_certificate": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "worker_route": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "zone": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base", "zone_ruleset": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base" }, "propertyName": "resource_type" }, "oneOf": [{ "description": "Request body schema for deleting tags from zone-level resources. Zone ID comes from URL path.", "type": "object", "properties": { "resource_id": { "description": "Identifies the unique resource.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "x-auditable": true, "x-ref": "#/components/schemas/resource-tagging_resource_id" }, "resource_type": { "description": "Enum for base zone-level resource types (those with no extra required fields).", "type": "string", "example": "zone", "enum": ["api_gateway_operation", "custom_certificate", "custom_hostname", "dns_record", "healthcheck", "load_balancer", "managed_client_certificate", "worker_route", "zone", "zone_ruleset"], "x-auditable": true, "x-ref": "#/components/schemas/resource-tagging_zone_resource_type_base_enum" } }, "required": ["resource_type", "resource_id"], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base" }, { "description": "Request body schema for deleting tags from access_application_policy resources.", "allOf": [{ "description": "Request body schema for deleting tags from zone-level resources. Zone ID comes from URL path.", "type": "object", "properties": { "resource_id": {}, "resource_type": {} }, "required": ["resource_type", "resource_id"], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_base" }, { "properties": { "access_application_id": {}, "resource_type": {} }, "required": ["access_application_id"], "type": "object" }], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_zone_level_access_application_policy" }], "x-ref": "#/components/schemas/resource-tagging_delete_tags_request_zone_level" } } } }, "parameters": [{ "name": "zone_id", "in": "path", "required": true, "schema": { "description": "Zone ID is required only for zone-level resources", "type": "string", "allOf": [{ "description": "Identifier.", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "type": "string", "x-auditable": true, "x-ref": "#/components/schemas/resource-tagging_identifier" }], "minLength": 32, "x-ref": "#/components/schemas/resource-tagging_zone_id" }, "index$": 0 }, { "description": "ETag value for optimistic concurrency control. When provided, the server will\nverify the current resource ETag matches before applying the write. Returns\n412 Precondition Failed if the resource has been modified since the ETag was\nobtained. Omit this header for unconditional writes.\n", "in": "header", "name": "If-Match", "schema": { "type": "string", "example": "\"v1:RBNvo1WzZ4oRRq0W9-hkng\"" }, "x-ref": "#/components/parameters/resource-tagging_if_match", "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let resource_tagging_ref01_data = Object.values(setup.data.existing.resource_tagging)[0];
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/resource_tagging/ResourceTaggingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CloudflareAccountManagementSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['resource_tagging01', 'resource_tagging02', 'resource_tagging03', 'account01', 'account02', 'account03', 'zone01', 'zone02', 'zone03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_ENTID': idmap,
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
    });
    idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_ENTID'];
    const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CloudflareAccountManagementSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ResourceTaggingEntity.test.js.map