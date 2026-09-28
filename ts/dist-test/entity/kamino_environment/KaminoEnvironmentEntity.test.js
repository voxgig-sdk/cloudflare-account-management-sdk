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
(0, node_test_1.describe)('KaminoEnvironmentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CloudflareAccountManagementSDK.test();
        const ent = testsdk.KaminoEnvironment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'kamino_environment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "environments": { "a": true, "h": "Environments", "n": "environments", "r": true, "t": "`$ARRAY`", "key$": "environments", "index$": 0 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": true, "t": "`$ARRAY`", "key$": "errors", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": true, "t": "`$ARRAY`", "key$": "messages", "index$": 3 }, "result": { "a": true, "h": "Result", "n": "result", "r": true, "t": "`$OBJECT`", "key$": "result", "index$": 4 }, "success": { "a": true, "h": "Success", "n": "success", "r": true, "t": "`$BOOLEAN`", "key$": "success", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "kamino_environment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /zones/{zone_id}/environments/{environment_id}/rollback", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "environment_id", "or": "environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/zones/{zone_id}/environments/{environment_id}/rollback", "q": { "exist": ["environment_id", "zone_id"] }, "r": {}, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "rollback" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /zones/{zone_id}/environments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/zones/{zone_id}/environments", "q": { "exist": ["zone_id"] }, "r": {}, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /zones/{zone_id}/environments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/zones/{zone_id}/environments", "q": { "exist": ["zone_id"] }, "r": {}, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /zones/{zone_id}/environments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/zones/{zone_id}/environments", "q": { "exist": ["zone_id"] }, "r": {}, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /zones/{zone_id}/environments/{environment_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/zones/{zone_id}/environments/{environment_id}", "q": { "exist": ["id", "zone_id"] }, "r": { "param": { "environment_id": "id" } }, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /zones/{zone_id}/environments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/zones/{zone_id}/environments", "q": { "exist": ["zone_id"] }, "r": {}, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.zone"], ["$.main.kit.entity.zone"]] }, "key$": "kamino_environment", "name__orig": "kamino_environment", "Name": "KaminoEnvironment", "name_": "kamino_environment", "name-": "kamino-environment", "NAME": "KAMINO_ENVIRONMENT", "index$": 7 }, { "active": true, "entity": "kamino_environment", "key$": "BasicKaminoEnvironmentFlow", "kind": "basic", "name": "BasicKaminoEnvironmentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "kamino_environment_ref01" }, "m": { "zone_id": "zone01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "zone_id": "zone01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "kamino_environment_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "kamino_environment_ref01", "srcdatavar": "kamino_environment_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-kamino_environment_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "kamino_environment_ref01", "suffix": "_rm0" }, "m": { "id": "kamino_environment01", "zone_id": "zone01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "zone_id": "zone01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "kamino_environment_ref01" } }], "index$": 4 }] }, 'KaminoEnvironment', { "POST /zones/{zone_id}/environments/{environment_id}/rollback": { "protocol": "http", "parameters": [{ "description": "Identifier of the zone.", "in": "path", "name": "zone_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_zone_id", "index$": 0 }, { "description": "Reference identifier for the environment.", "in": "path", "name": "environment_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_environment_id", "index$": 1 }] }, "POST /zones/{zone_id}/environments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "environments": { "type": "array", "items": { "type": "object", "properties": { "expression": { "type": "string" }, "http_application_id": { "nullable": true, "type": "string" }, "locked_on_deployment": { "nullable": true, "type": "boolean" }, "name": { "type": "string" }, "position": { "properties": {}, "type": "object", "x-ref": "#/components/schemas/kamino_environment_position" }, "ref": { "type": "string" }, "version": { "format": "int64", "nullable": true, "type": "integer" } }, "required": ["name", "ref", "version", "expression", "locked_on_deployment", "position"], "x-ref": "#/components/schemas/kamino_environment" }, "key$": "environments" } }, "required": ["environments"], "x-ref": "#/components/schemas/kamino_environments_request", "index$": 1 } } } }, "parameters": [{ "description": "Identifier of the zone.", "in": "path", "name": "zone_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_zone_id", "index$": 0 }] }, "GET /zones/{zone_id}/environments": { "protocol": "http", "parameters": [{ "description": "Identifier of the zone.", "in": "path", "name": "zone_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_zone_id", "index$": 0 }] }, "PATCH /zones/{zone_id}/environments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "environments": { "type": "array", "items": { "type": "object", "properties": { "expression": { "type": "string" }, "http_application_id": { "nullable": true, "type": "string" }, "locked_on_deployment": { "nullable": true, "type": "boolean" }, "name": { "type": "string" }, "position": { "properties": {}, "type": "object", "x-ref": "#/components/schemas/kamino_environment_position" }, "ref": { "type": "string" }, "version": { "format": "int64", "nullable": true, "type": "integer" } }, "required": ["name", "ref", "version", "expression", "locked_on_deployment", "position"], "x-ref": "#/components/schemas/kamino_environment" }, "key$": "environments" } }, "required": ["environments"], "x-ref": "#/components/schemas/kamino_environments_request", "index$": 1 } } } }, "parameters": [{ "description": "Identifier of the zone.", "in": "path", "name": "zone_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_zone_id", "index$": 0 }] }, "DELETE /zones/{zone_id}/environments/{environment_id}": { "protocol": "http", "parameters": [{ "description": "Identifier of the zone.", "in": "path", "name": "zone_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_zone_id", "index$": 0 }, { "description": "Reference identifier for the environment.", "in": "path", "name": "environment_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_environment_id", "index$": 1 }] }, "PUT /zones/{zone_id}/environments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "environments": { "type": "array", "items": { "type": "object", "properties": { "expression": { "type": "string" }, "http_application_id": { "nullable": true, "type": "string" }, "locked_on_deployment": { "nullable": true, "type": "boolean" }, "name": { "type": "string" }, "position": { "properties": {}, "type": "object", "x-ref": "#/components/schemas/kamino_environment_position" }, "ref": { "type": "string" }, "version": { "format": "int64", "nullable": true, "type": "integer" } }, "required": ["name", "ref", "version", "expression", "locked_on_deployment", "position"], "x-ref": "#/components/schemas/kamino_environment" }, "key$": "environments" } }, "required": ["environments"], "x-ref": "#/components/schemas/kamino_environments_request", "index$": 1 } } } }, "parameters": [{ "description": "Identifier of the zone.", "in": "path", "name": "zone_id", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/kamino_zone_id", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const kamino_environment_ref01_ent = client.KaminoEnvironment();
        let kamino_environment_ref01_data = setup.data.new.kamino_environment['kamino_environment_ref01'];
        kamino_environment_ref01_data['zone_id'] = setup.idmap['zone01'];
        kamino_environment_ref01_data = (await kamino_environment_ref01_ent.create(kamino_environment_ref01_data)).data();
        (0, node_assert_1.default)(null != kamino_environment_ref01_data.id);
        // LIST
        const kamino_environment_ref01_match = {};
        kamino_environment_ref01_match['zone_id'] = setup.idmap['zone01'];
        const kamino_environment_ref01_list = (await kamino_environment_ref01_ent.list(kamino_environment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(kamino_environment_ref01_list, { id: kamino_environment_ref01_data.id })));
        // UPDATE
        const kamino_environment_ref01_data_up0 = {};
        kamino_environment_ref01_data_up0.id = kamino_environment_ref01_data.id;
        const kamino_environment_ref01_resdata_up0 = (await kamino_environment_ref01_ent.update(kamino_environment_ref01_data_up0)).data();
        (0, node_assert_1.default)(kamino_environment_ref01_resdata_up0.id === kamino_environment_ref01_data_up0.id);
        // REMOVE
        const kamino_environment_ref01_match_rm0 = { id: kamino_environment_ref01_data.id };
        await kamino_environment_ref01_ent.remove(kamino_environment_ref01_match_rm0);
        // LIST
        const kamino_environment_ref01_match_rt0 = {};
        kamino_environment_ref01_match_rt0['zone_id'] = setup.idmap['zone01'];
        const kamino_environment_ref01_list_rt0 = (await kamino_environment_ref01_ent.list(kamino_environment_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(kamino_environment_ref01_list_rt0, { id: kamino_environment_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/kamino_environment/KaminoEnvironmentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CloudflareAccountManagementSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['kamino_environment01', 'kamino_environment02', 'kamino_environment03', 'zone01', 'zone02', 'zone03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID': idmap,
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
    });
    idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID'];
    const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_KAMINO_ENVIRONMENT_ENTID'];
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
//# sourceMappingURL=KaminoEnvironmentEntity.test.js.map