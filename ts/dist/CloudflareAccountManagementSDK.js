"use strict";
// CloudflareAccountManagement Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.CloudflareAccountManagementSDK = exports.CloudflareAccountManagementEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AccountEntity_1 = require("./entity/AccountEntity");
const AccountSettingEntity_1 = require("./entity/AccountSettingEntity");
const CachePurgeApiResponseSingleIdEntity_1 = require("./entity/CachePurgeApiResponseSingleIdEntity");
const CpsCommunicationPreferenceEntity_1 = require("./entity/CpsCommunicationPreferenceEntity");
const IamApiResponseSingleIdEntity_1 = require("./entity/IamApiResponseSingleIdEntity");
const IamResponseSingleAccountEntity_1 = require("./entity/IamResponseSingleAccountEntity");
const IamSingleUserEntity_1 = require("./entity/IamSingleUserEntity");
const KaminoEnvironmentEntity_1 = require("./entity/KaminoEnvironmentEntity");
const ResourceEntity_1 = require("./entity/ResourceEntity");
const ResourceTaggingEntity_1 = require("./entity/ResourceTaggingEntity");
const ResourceTaggingTagKeySummaryResponseCollectionEntity_1 = require("./entity/ResourceTaggingTagKeySummaryResponseCollectionEntity");
const ResourceTaggingTagKeysResponseCollectionEntity_1 = require("./entity/ResourceTaggingTagKeysResponseCollectionEntity");
const ResourceTaggingTagValuesResponseCollectionEntity_1 = require("./entity/ResourceTaggingTagValuesResponseCollectionEntity");
const ResourceTaggingTaggedResourceResponseSingleEntity_1 = require("./entity/ResourceTaggingTaggedResourceResponseSingleEntity");
const ZoneEntity_1 = require("./entity/ZoneEntity");
const ZoneHoldEntity_1 = require("./entity/ZoneHoldEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const CloudflareAccountManagementEntityBase_1 = require("./CloudflareAccountManagementEntityBase");
Object.defineProperty(exports, "CloudflareAccountManagementEntityBase", { enumerable: true, get: function () { return CloudflareAccountManagementEntityBase_1.CloudflareAccountManagementEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class CloudflareAccountManagementSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('CloudflareAccountManagementSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('CloudflareAccountManagementSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('CloudflareAccountManagementSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Account().list()` / `client.Account().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Account(entopts) {
        const self = this;
        return new AccountEntity_1.AccountEntity(self, entopts);
    }
    // Entity access: `client.AccountSetting().list()` / `client.AccountSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccountSetting(entopts) {
        const self = this;
        return new AccountSettingEntity_1.AccountSettingEntity(self, entopts);
    }
    // Entity access: `client.CachePurgeApiResponseSingleId().list()` / `client.CachePurgeApiResponseSingleId().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CachePurgeApiResponseSingleId(entopts) {
        const self = this;
        return new CachePurgeApiResponseSingleIdEntity_1.CachePurgeApiResponseSingleIdEntity(self, entopts);
    }
    // Entity access: `client.CpsCommunicationPreference().list()` / `client.CpsCommunicationPreference().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CpsCommunicationPreference(entopts) {
        const self = this;
        return new CpsCommunicationPreferenceEntity_1.CpsCommunicationPreferenceEntity(self, entopts);
    }
    // Entity access: `client.IamApiResponseSingleId().list()` / `client.IamApiResponseSingleId().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IamApiResponseSingleId(entopts) {
        const self = this;
        return new IamApiResponseSingleIdEntity_1.IamApiResponseSingleIdEntity(self, entopts);
    }
    // Entity access: `client.IamResponseSingleAccount().list()` / `client.IamResponseSingleAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IamResponseSingleAccount(entopts) {
        const self = this;
        return new IamResponseSingleAccountEntity_1.IamResponseSingleAccountEntity(self, entopts);
    }
    // Entity access: `client.IamSingleUser().list()` / `client.IamSingleUser().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IamSingleUser(entopts) {
        const self = this;
        return new IamSingleUserEntity_1.IamSingleUserEntity(self, entopts);
    }
    // Entity access: `client.KaminoEnvironment().list()` / `client.KaminoEnvironment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    KaminoEnvironment(entopts) {
        const self = this;
        return new KaminoEnvironmentEntity_1.KaminoEnvironmentEntity(self, entopts);
    }
    // Entity access: `client.Resource().list()` / `client.Resource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Resource(entopts) {
        const self = this;
        return new ResourceEntity_1.ResourceEntity(self, entopts);
    }
    // Entity access: `client.ResourceTagging().list()` / `client.ResourceTagging().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ResourceTagging(entopts) {
        const self = this;
        return new ResourceTaggingEntity_1.ResourceTaggingEntity(self, entopts);
    }
    // Entity access: `client.ResourceTaggingTagKeySummaryResponseCollection().list()` / `client.ResourceTaggingTagKeySummaryResponseCollection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ResourceTaggingTagKeySummaryResponseCollection(entopts) {
        const self = this;
        return new ResourceTaggingTagKeySummaryResponseCollectionEntity_1.ResourceTaggingTagKeySummaryResponseCollectionEntity(self, entopts);
    }
    // Entity access: `client.ResourceTaggingTagKeysResponseCollection().list()` / `client.ResourceTaggingTagKeysResponseCollection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ResourceTaggingTagKeysResponseCollection(entopts) {
        const self = this;
        return new ResourceTaggingTagKeysResponseCollectionEntity_1.ResourceTaggingTagKeysResponseCollectionEntity(self, entopts);
    }
    // Entity access: `client.ResourceTaggingTagValuesResponseCollection().list()` / `client.ResourceTaggingTagValuesResponseCollection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ResourceTaggingTagValuesResponseCollection(entopts) {
        const self = this;
        return new ResourceTaggingTagValuesResponseCollectionEntity_1.ResourceTaggingTagValuesResponseCollectionEntity(self, entopts);
    }
    // Entity access: `client.ResourceTaggingTaggedResourceResponseSingle().list()` / `client.ResourceTaggingTaggedResourceResponseSingle().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ResourceTaggingTaggedResourceResponseSingle(entopts) {
        const self = this;
        return new ResourceTaggingTaggedResourceResponseSingleEntity_1.ResourceTaggingTaggedResourceResponseSingleEntity(self, entopts);
    }
    // Entity access: `client.Zone().list()` / `client.Zone().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Zone(entopts) {
        const self = this;
        return new ZoneEntity_1.ZoneEntity(self, entopts);
    }
    // Entity access: `client.ZoneHold().list()` / `client.ZoneHold().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ZoneHold(entopts) {
        const self = this;
        return new ZoneHoldEntity_1.ZoneHoldEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new CloudflareAccountManagementSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return CloudflareAccountManagementSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'CloudflareAccountManagement' };
    }
    toString() {
        return 'CloudflareAccountManagement ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.CloudflareAccountManagementSDK = CloudflareAccountManagementSDK;
const SDK = CloudflareAccountManagementSDK;
exports.SDK = SDK;
//# sourceMappingURL=CloudflareAccountManagementSDK.js.map