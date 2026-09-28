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
(0, node_test_1.describe)('IamSingleUserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CloudflareAccountManagementSDK.test();
        const ent = testsdk.IamSingleUser();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
        for (const op of ['update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'iam_single_user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "country": { "a": true, "h": "Country", "n": "country", "r": false, "sh": "The country in which the user lives.", "t": "`$STRING`", "key$": "country", "index$": 0 }, "first_name": { "a": true, "h": "First Name", "n": "first_name", "r": false, "sh": "User's first name", "t": "`$STRING`", "key$": "first_name", "index$": 1 }, "last_name": { "a": true, "h": "Last Name", "n": "last_name", "r": false, "sh": "User's last name", "t": "`$STRING`", "key$": "last_name", "index$": 2 }, "result": { "a": true, "h": "Result", "n": "result", "r": true, "t": "`$OBJECT`", "key$": "result", "index$": 3 }, "telephone": { "a": true, "h": "Telephone", "n": "telephone", "r": false, "sh": "User's telephone number", "t": "`$STRING`", "key$": "telephone", "index$": 4 }, "zipcode": { "a": true, "h": "Zipcode", "n": "zipcode", "r": false, "sh": "The zipcode or postal code where the user lives.", "t": "`$STRING`", "key$": "zipcode", "index$": 5 } }, "name": "iam_single_user", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /user", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/user", "q": {}, "r": {}, "s": [{ "lit": "user" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /user", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PATCH", "o": "/user", "q": {}, "r": {}, "s": [{ "lit": "user" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "iam_single_user", "name__orig": "iam_single_user", "Name": "IamSingleUser", "name_": "iam_single_user", "name-": "iam-single-user", "NAME": "IAM_SINGLE_USER", "index$": 6 }, { "active": true, "entity": "iam_single_user", "key$": "BasicIamSingleUserFlow", "kind": "basic", "name": "BasicIamSingleUserFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "iam_single_user_ref01", "srcdatavar": "iam_single_user_ref01_data", "suffix": "_up0", "textfield": "country" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-iam_single_user_ref01" } }], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "iam_single_user_ref01", "srcdatavar": "iam_single_user_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-iam_single_user_ref01" } }], "index$": 1 }] }, 'IamSingleUser', { "GET /user": { "protocol": "http", "parameters": [] }, "PATCH /user": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "country": { "description": "The country in which the user lives.", "type": "string", "example": "US", "maxLength": 30, "nullable": true, "x-ref": "#/components/schemas/iam_country", "key$": "country" }, "first_name": { "description": "User's first name", "type": "string", "example": "John", "maxLength": 60, "nullable": true, "x-auditable": true, "x-ref": "#/components/schemas/iam_first_name", "key$": "first_name" }, "last_name": { "description": "User's last name", "type": "string", "example": "Appleseed", "maxLength": 60, "nullable": true, "x-auditable": true, "x-ref": "#/components/schemas/iam_last_name", "key$": "last_name" }, "telephone": { "description": "User's telephone number", "type": "string", "example": "+1 123-123-1234", "maxLength": 20, "nullable": true, "x-ref": "#/components/schemas/iam_telephone", "key$": "telephone" }, "zipcode": { "description": "The zipcode or postal code where the user lives.", "type": "string", "example": "12345", "maxLength": 20, "nullable": true, "x-ref": "#/components/schemas/iam_zipcode", "key$": "zipcode" } }, "index$": 1 } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let iam_single_user_ref01_data = Object.values(setup.data.existing.iam_single_user)[0];
        // UPDATE
        const iam_single_user_ref01_ent = client.IamSingleUser();
        const iam_single_user_ref01_data_up0 = {};
        const iam_single_user_ref01_markdef_up0 = { name: 'country', value: 'Mark01-iam_single_user_ref01_' + setup.now };
        iam_single_user_ref01_data_up0[iam_single_user_ref01_markdef_up0.name] = iam_single_user_ref01_markdef_up0.value;
        const iam_single_user_ref01_resdata_up0 = (await iam_single_user_ref01_ent.update(iam_single_user_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != iam_single_user_ref01_resdata_up0);
        (0, node_assert_1.default)(iam_single_user_ref01_resdata_up0[iam_single_user_ref01_markdef_up0.name] === iam_single_user_ref01_markdef_up0.value);
        // LOAD
        const iam_single_user_ref01_match_dt0 = {};
        const iam_single_user_ref01_data_dt0 = (await iam_single_user_ref01_ent.load(iam_single_user_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != iam_single_user_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/iam_single_user/IamSingleUserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CloudflareAccountManagementSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['iam_single_user01', 'iam_single_user02', 'iam_single_user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID': idmap,
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
        'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
    });
    idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID'];
    const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_SINGLE_USER_ENTID'];
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
//# sourceMappingURL=IamSingleUserEntity.test.js.map