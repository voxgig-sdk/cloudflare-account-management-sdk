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
(0, node_test_1.describe)('CachePurgeApiResponseSingleIdEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CloudflareAccountManagementSDK.test();
        const ent = testsdk.CachePurgeApiResponseSingleId();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cache_purge_api_response_single_id.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "errors": { "a": true, "h": "Errors", "n": "errors", "r": true, "t": "`$ARRAY`", "key$": "errors", "index$": 0 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": true, "t": "`$ARRAY`", "key$": "messages", "index$": 1 }, "result": { "a": true, "h": "Result", "n": "result", "r": true, "t": "`$OBJECT`", "key$": "result", "index$": 2 }, "success": { "a": true, "h": "Success", "n": "success", "r": true, "sh": "Indicates the API call's success or failure.", "t": "`$BOOLEAN`", "key$": "success", "index$": 3 } }, "name": "cache_purge_api_response_single_id", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /zones/{zone_id}/environments/{environment_id}/purge_cache", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "023e105f4ecef8ad9ca31a8372d0c353", "k": "param", "n": "environment_id", "or": "environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "023e105f4ecef8ad9ca31a8372d0c353", "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/zones/{zone_id}/environments/{environment_id}/purge_cache", "q": { "exist": ["environment_id", "zone_id"] }, "r": {}, "s": [{ "lit": "zones" }, { "var": "zone_id" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "purge_cache" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.zone"]] }, "key$": "cache_purge_api_response_single_id", "name__orig": "cache_purge_api_response_single_id", "Name": "CachePurgeApiResponseSingleId", "name_": "cache_purge_api_response_single_id", "name-": "cache-purge-api-response-single-id", "NAME": "CACHE_PURGE_API_RESPONSE_SINGLE_ID", "index$": 2 }, { "active": true, "entity": "cache_purge_api_response_single_id", "key$": "BasicCachePurgeApiResponseSingleIdFlow", "kind": "basic", "name": "BasicCachePurgeApiResponseSingleIdFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "cache_purge_api_response_single_id_ref01" }, "m": { "environment_id": "environment01", "zone_id": "zone01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CachePurgeApiResponseSingleId', { "POST /zones/{zone_id}/environments/{environment_id}/purge_cache": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "examples": { "Flex Purge with Hosts": { "summary": "Flex purge example with hosts list", "value": { "hosts": ["www.example.com", "images.example.com"] } }, "Flex Purge with Prefixes": { "summary": "Flex purge example with prefixes list", "value": { "prefixes": ["www.example.com/foo", "images.example.com/bar/baz"] } }, "Flex Purge with Tags": { "summary": "Flex purge example with tags list", "value": { "tags": ["a-cache-tag", "another-cache-tag"] } }, "Purge Everything": { "summary": "Purge everything example", "value": { "purge_everything": true } }, "Single File Purge": { "summary": "Single file purge example with files list", "value": { "files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"] } }, "Single File Purge with UrlAndHeaders": { "summary": "Single file purge example with url and headers list", "value": { "files": [{ "headers": { "Accept-Language": "zh-CN", "CF-Device-Type": "desktop", "CF-IPCountry": "US" }, "url": "http://www.example.com/cat_picture.jpg" }, { "headers": { "Accept-Language": "en-US", "CF-Device-Type": "mobile", "CF-IPCountry": "EU" }, "url": "http://www.example.com/dog_picture.jpg" }] } } }, "schema": { "anyOf": [{ "type": "object", "properties": { "tags": { "description": "For more information on cache tags and purging by tags, please refer to [purge by cache-tags documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/).", "type": "array", "items": { "type": "string", "x-auditable": true }, "example": ["a-cache-tag", "another-cache-tag"] } }, "title": "Purge by tags", "x-ref": "#/components/schemas/cache-purge_FlexPurgeByTags" }, { "type": "object", "properties": { "hosts": { "description": "For more information purging by hostnames, please refer to [purge by hostname documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/).", "type": "array", "items": { "type": "string", "x-auditable": true }, "example": ["www.example.com", "images.example.com"] } }, "title": "Purge by hostnames", "x-ref": "#/components/schemas/cache-purge_FlexPurgeByHostnames" }, { "type": "object", "properties": { "prefixes": { "description": "For more information on purging by prefixes, please refer to [purge by prefix documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/).", "type": "array", "items": { "type": "string", "x-auditable": true }, "example": ["www.example.com/foo", "images.example.com/bar/baz"] } }, "title": "Purge by prefixes", "x-ref": "#/components/schemas/cache-purge_FlexPurgeByPrefixes" }, { "type": "object", "properties": { "purge_everything": { "description": "For more information, please refer to [purge everything documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/).", "type": "boolean", "example": true, "x-auditable": true } }, "title": "Purge everything", "x-ref": "#/components/schemas/cache-purge_Everything" }, { "type": "object", "properties": { "files": { "description": "For more information on purging files, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).", "type": "array", "items": { "type": "string", "x-auditable": true }, "example": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"] } }, "title": "Purge files", "x-ref": "#/components/schemas/cache-purge_SingleFile" }, { "type": "object", "properties": { "files": { "description": "For more information on purging files with URL and headers, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).", "type": "array", "items": { "properties": {}, "type": "object" }, "example": [{}, {}] } }, "title": "Purge files with URL and headers", "x-ref": "#/components/schemas/cache-purge_SingleFileWithUrlAndHeaders" }], "index$": 1 } } } }, "parameters": [{ "name": "zone_id", "in": "path", "required": true, "schema": { "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-ref": "#/components/schemas/cache-purge_identifier" }, "index$": 0 }, { "name": "environment_id", "in": "path", "required": true, "schema": { "type": "string", "example": "023e105f4ecef8ad9ca31a8372d0c353", "maxLength": 32, "x-ref": "#/components/schemas/cache-purge_identifier" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const cache_purge_api_response_single_id_ref01_ent = client.CachePurgeApiResponseSingleId();
        let cache_purge_api_response_single_id_ref01_data = setup.data.new.cache_purge_api_response_single_id['cache_purge_api_response_single_id_ref01'];
        cache_purge_api_response_single_id_ref01_data['environment_id'] = setup.idmap['environment01'];
        cache_purge_api_response_single_id_ref01_data['zone_id'] = setup.idmap['zone01'];
        cache_purge_api_response_single_id_ref01_data = (await cache_purge_api_response_single_id_ref01_ent.create(cache_purge_api_response_single_id_ref01_data)).data();
        (0, node_assert_1.default)(null != cache_purge_api_response_single_id_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cache_purge_api_response_single_id/CachePurgeApiResponseSingleIdTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CloudflareAccountManagementSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cache_purge_api_response_single_id01', 'cache_purge_api_response_single_id02', 'cache_purge_api_response_single_id03', 'zone01', 'zone02', 'zone03', 'environment01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID': idmap,
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
    });
    idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID'];
    const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CACHE_PURGE_API_RESPONSE_SINGLE_ID_ENTID'];
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
//# sourceMappingURL=CachePurgeApiResponseSingleIdEntity.test.js.map