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
(0, node_test_1.describe)('ZoneHoldEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CloudflareAccountManagementSDK.test();
        const ent = testsdk.ZoneHold();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
        for (const op of ['create', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'zone_hold.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "hold": { "a": true, "h": "Hold", "n": "hold", "r": false, "sh": "Whether the hostname is currently subject to a zone hold.", "t": "`$BOOLEAN`", "key$": "hold", "index$": 0 }, "hold_after": { "a": true, "fo": "date-time", "h": "Hold After", "n": "hold_after", "r": false, "sh": "The RFC3339-formatted timestamp at which the hold will be automatically re-enabled, if the hold was temporarily disabled.", "t": "`$STRING`", "key$": "hold_after", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "include_subdomains": { "a": true, "h": "Include Subdomains", "n": "include_subdomains", "r": false, "sh": "Whether the hold extends to block subdomains of the held zone.", "t": "`$BOOLEAN`", "key$": "include_subdomains", "index$": 3 }, "result": { "a": true, "h": "Result", "n": "result", "r": false, "t": "`$OBJECT`", "key$": "result", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "zone_hold", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /zones/{zone_id}/hold", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "023e105f4ecef8ad9ca31a8372d0c353", "k": "param", "n": "id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": true, "k": "query", "n": "include_subdomain", "or": "include_subdomain", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/zones/{zone_id}/hold", "q": { "exist": ["id", "include_subdomain"] }, "r": { "param": { "zone_id": "id" } }, "s": [{ "lit": "zones" }, { "var": "id" }, { "lit": "hold" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /zones/{zone_id}/hold/{zone_name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "subdomain.example.com", "k": "param", "n": "id", "or": "zone_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "023e105f4ecef8ad9ca31a8372d0c353", "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/zones/{zone_id}/hold/{zone_name}", "q": { "exist": ["id", "zone_id"] }, "r": { "param": { "zone_name": "id" } }, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "hold" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /zones/{zone_id}/hold", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "023e105f4ecef8ad9ca31a8372d0c353", "k": "param", "n": "id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/zones/{zone_id}/hold", "q": { "exist": ["id"] }, "r": { "param": { "zone_id": "id" } }, "s": [{ "lit": "zones" }, { "var": "id" }, { "lit": "hold" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /zones/{zone_id}/hold", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "023e105f4ecef8ad9ca31a8372d0c353", "k": "param", "n": "id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "2023-01-31T15:56:36Z", "k": "query", "n": "hold_after", "or": "hold_after", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/zones/{zone_id}/hold", "q": { "exist": ["hold_after", "id"] }, "r": { "param": { "zone_id": "id" } }, "s": [{ "lit": "zones" }, { "var": "id" }, { "lit": "hold" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /zones/{zone_id}/hold", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "023e105f4ecef8ad9ca31a8372d0c353", "k": "param", "n": "id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/zones/{zone_id}/hold", "q": { "exist": ["id"] }, "r": { "param": { "zone_id": "id" } }, "s": [{ "lit": "zones" }, { "var": "id" }, { "lit": "hold" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.zone"]] }, "key$": "zone_hold", "name__orig": "zone_hold", "Name": "ZoneHold", "name_": "zone_hold", "name-": "zone-hold", "NAME": "ZONE_HOLD", "index$": 15 }, { "active": true, "entity": "zone_hold", "key$": "BasicZoneHoldFlow", "kind": "basic", "name": "BasicZoneHoldFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "zone_hold_ref01" }, "m": { "zone_id": "zone01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "zone_hold_ref01", "srcdatavar": "zone_hold_ref01_data", "suffix": "_up0", "textfield": "hold_after" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-zone_hold_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "zone_hold_ref01", "srcdatavar": "zone_hold_ref01_data", "suffix": "_dt0" }, "m": { "id": "zone_hold01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-zone_hold_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "zone_hold_ref01", "suffix": "_rm0" }, "m": { "id": "zone_hold01" }, "o": "remove", "s": [], "v": [], "index$": 3 }] }, 'ZoneHold', { "POST /zones/{zone_id}/hold": { "protocol": "http", "parameters": [{ "name": "zone_id", "in": "path", "description": "Zone ID", "required": true, "schema": { "description": "Identifier.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-auditable": true, "x-ref": "#/components/schemas/zones_identifier-2" }, "index$": 0 }, { "name": "include_subdomains", "in": "query", "description": "If provided, the zone hold will extend to block any subdomain of the given zone, as well\nas SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname\n'example.com' and include_subdomains=true will block 'example.com',\n'staging.example.com', 'api.staging.example.com', etc.", "schema": { "type": "boolean" }, "example": true, "index$": 1 }] }, "GET /zones/{zone_id}/hold/{zone_name}": { "protocol": "http", "parameters": [{ "name": "zone_id", "in": "path", "description": "Zone identifier. Consumed by the API gateway for routing; the backend\nhandler does not use this value directly.", "required": true, "schema": { "description": "Identifier.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-auditable": true, "x-ref": "#/components/schemas/zones_identifier-2" }, "index$": 0 }, { "name": "zone_name", "in": "path", "description": "The hostname to check for a zone hold. May be a subdomain (e.g. `subdomain.example.com`)\nor an apex domain (e.g. `example.com`). The service checks the hostname and its ancestor\ndomains for active holds with `include_subdomains` enabled.", "required": true, "schema": { "type": "string", "example": "subdomain.example.com", "maxLength": 253, "pattern": "^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$" }, "index$": 1 }] }, "GET /zones/{zone_id}/hold": { "protocol": "http", "parameters": [{ "name": "zone_id", "in": "path", "description": "Zone ID", "required": true, "schema": { "description": "Identifier.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-auditable": true, "x-ref": "#/components/schemas/zones_identifier-2" }, "index$": 0 }] }, "DELETE /zones/{zone_id}/hold": { "protocol": "http", "parameters": [{ "name": "zone_id", "in": "path", "description": "Zone ID", "required": true, "schema": { "description": "Identifier.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-auditable": true, "x-ref": "#/components/schemas/zones_identifier-2" }, "index$": 0 }, { "name": "hold_after", "in": "query", "description": "If `hold_after` is provided, the hold will be temporarily disabled,\nthen automatically re-enabled by the system at the time specified\nin this RFC3339-formatted timestamp. Otherwise, the hold will be\ndisabled indefinitely. `hold_after` cannot be provided for CDN-only zones.", "schema": { "type": "string" }, "example": "2023-01-31T15:56:36Z", "index$": 1 }] }, "PATCH /zones/{zone_id}/hold": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "hold_after": { "description": "If `hold_after` is provided and future-dated, the hold will be temporarily disabled,\nthen automatically re-enabled by the system at the time specified\nin this RFC3339-formatted timestamp. A past-dated `hold_after` value will have\nno effect on an existing, enabled hold. Providing an empty string will set its value\nto the current time. Providing `null` will disable the hold indefinitely.", "type": "string", "example": "2023-01-31T15:56:36Z", "default": "", "nullable": true, "key$": "hold_after" }, "include_subdomains": { "description": "If `true`, the zone hold will extend to block any subdomain of the given zone, as well\nas SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname\n'example.com' and include_subdomains=true will block 'example.com',\n'staging.example.com', 'api.staging.example.com', etc.", "type": "boolean", "example": true, "default": false, "key$": "include_subdomains" } }, "index$": 1 } } } }, "parameters": [{ "name": "zone_id", "in": "path", "description": "Zone ID", "required": true, "schema": { "description": "Identifier.", "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-auditable": true, "x-ref": "#/components/schemas/zones_identifier-2" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const zone_hold_ref01_ent = client.ZoneHold();
        let zone_hold_ref01_data = setup.data.new.zone_hold['zone_hold_ref01'];
        zone_hold_ref01_data['zone_id'] = setup.idmap['zone01'];
        zone_hold_ref01_data = (await zone_hold_ref01_ent.create(zone_hold_ref01_data)).data();
        (0, node_assert_1.default)(null != zone_hold_ref01_data.id);
        // UPDATE
        const zone_hold_ref01_data_up0 = {};
        zone_hold_ref01_data_up0.id = zone_hold_ref01_data.id;
        const zone_hold_ref01_markdef_up0 = { name: 'hold_after', value: 'Mark01-zone_hold_ref01_' + setup.now };
        zone_hold_ref01_data_up0[zone_hold_ref01_markdef_up0.name] = zone_hold_ref01_markdef_up0.value;
        const zone_hold_ref01_resdata_up0 = (await zone_hold_ref01_ent.update(zone_hold_ref01_data_up0)).data();
        (0, node_assert_1.default)(zone_hold_ref01_resdata_up0.id === zone_hold_ref01_data_up0.id);
        (0, node_assert_1.default)(zone_hold_ref01_resdata_up0[zone_hold_ref01_markdef_up0.name] === zone_hold_ref01_markdef_up0.value);
        // LOAD
        const zone_hold_ref01_match_dt0 = {};
        zone_hold_ref01_match_dt0.id = zone_hold_ref01_data.id;
        const zone_hold_ref01_data_dt0 = (await zone_hold_ref01_ent.load(zone_hold_ref01_match_dt0)).data();
        (0, node_assert_1.default)(zone_hold_ref01_data_dt0.id === zone_hold_ref01_data.id);
        // REMOVE
        const zone_hold_ref01_match_rm0 = { id: zone_hold_ref01_data.id };
        await zone_hold_ref01_ent.remove(zone_hold_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/zone_hold/ZoneHoldTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CloudflareAccountManagementSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['zone_hold01', 'zone_hold02', 'zone_hold03', 'zone01', 'zone02', 'zone03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID': idmap,
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
    });
    idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID'];
    const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_HOLD_ENTID'];
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
//# sourceMappingURL=ZoneHoldEntity.test.js.map