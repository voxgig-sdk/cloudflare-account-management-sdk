<?php
declare(strict_types=1);

// CloudflareAccountManagement SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class CloudflareAccountManagementSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new CloudflareAccountManagementUtility();
        $this->_utility = $utility;

        $config = CloudflareAccountManagementConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = CloudflareAccountManagementHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = CloudflareAccountManagementHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!CloudflareAccountManagementFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, CloudflareAccountManagementFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return CloudflareAccountManagementUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = CloudflareAccountManagementHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = CloudflareAccountManagementHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = CloudflareAccountManagementHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new CloudflareAccountManagementSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new CloudflareAccountManagementError($op . "_allow",
                "CloudflareAccountManagementSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = CloudflareAccountManagementHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = CloudflareAccountManagementHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new CloudflareAccountManagementError("graphql_error",
                "CloudflareAccountManagementSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_account = null;

    // Canonical facade: $client->Account()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->account()
    // resolves here too.
    public function Account($data = null)
    {
        require_once __DIR__ . '/entity/account_entity.php';
        if ($data === null) {
            if ($this->_account === null) {
                $this->_account = new AccountEntity($this, null);
            }
            return $this->_account;
        }
        return new AccountEntity($this, $data);
    }


    private $_account_setting = null;

    // Canonical facade: $client->AccountSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->account_setting()
    // resolves here too.
    public function AccountSetting($data = null)
    {
        require_once __DIR__ . '/entity/account_setting_entity.php';
        if ($data === null) {
            if ($this->_account_setting === null) {
                $this->_account_setting = new AccountSettingEntity($this, null);
            }
            return $this->_account_setting;
        }
        return new AccountSettingEntity($this, $data);
    }


    private $_cache_purge_api_response_single_id = null;

    // Canonical facade: $client->CachePurgeApiResponseSingleId()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cache_purge_api_response_single_id()
    // resolves here too.
    public function CachePurgeApiResponseSingleId($data = null)
    {
        require_once __DIR__ . '/entity/cache_purge_api_response_single_id_entity.php';
        if ($data === null) {
            if ($this->_cache_purge_api_response_single_id === null) {
                $this->_cache_purge_api_response_single_id = new CachePurgeApiResponseSingleIdEntity($this, null);
            }
            return $this->_cache_purge_api_response_single_id;
        }
        return new CachePurgeApiResponseSingleIdEntity($this, $data);
    }


    private $_cps_communication_preference = null;

    // Canonical facade: $client->CpsCommunicationPreference()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cps_communication_preference()
    // resolves here too.
    public function CpsCommunicationPreference($data = null)
    {
        require_once __DIR__ . '/entity/cps_communication_preference_entity.php';
        if ($data === null) {
            if ($this->_cps_communication_preference === null) {
                $this->_cps_communication_preference = new CpsCommunicationPreferenceEntity($this, null);
            }
            return $this->_cps_communication_preference;
        }
        return new CpsCommunicationPreferenceEntity($this, $data);
    }


    private $_iam_api_response_single_id = null;

    // Canonical facade: $client->IamApiResponseSingleId()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->iam_api_response_single_id()
    // resolves here too.
    public function IamApiResponseSingleId($data = null)
    {
        require_once __DIR__ . '/entity/iam_api_response_single_id_entity.php';
        if ($data === null) {
            if ($this->_iam_api_response_single_id === null) {
                $this->_iam_api_response_single_id = new IamApiResponseSingleIdEntity($this, null);
            }
            return $this->_iam_api_response_single_id;
        }
        return new IamApiResponseSingleIdEntity($this, $data);
    }


    private $_iam_response_single_account = null;

    // Canonical facade: $client->IamResponseSingleAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->iam_response_single_account()
    // resolves here too.
    public function IamResponseSingleAccount($data = null)
    {
        require_once __DIR__ . '/entity/iam_response_single_account_entity.php';
        if ($data === null) {
            if ($this->_iam_response_single_account === null) {
                $this->_iam_response_single_account = new IamResponseSingleAccountEntity($this, null);
            }
            return $this->_iam_response_single_account;
        }
        return new IamResponseSingleAccountEntity($this, $data);
    }


    private $_iam_single_user = null;

    // Canonical facade: $client->IamSingleUser()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->iam_single_user()
    // resolves here too.
    public function IamSingleUser($data = null)
    {
        require_once __DIR__ . '/entity/iam_single_user_entity.php';
        if ($data === null) {
            if ($this->_iam_single_user === null) {
                $this->_iam_single_user = new IamSingleUserEntity($this, null);
            }
            return $this->_iam_single_user;
        }
        return new IamSingleUserEntity($this, $data);
    }


    private $_kamino_environment = null;

    // Canonical facade: $client->KaminoEnvironment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->kamino_environment()
    // resolves here too.
    public function KaminoEnvironment($data = null)
    {
        require_once __DIR__ . '/entity/kamino_environment_entity.php';
        if ($data === null) {
            if ($this->_kamino_environment === null) {
                $this->_kamino_environment = new KaminoEnvironmentEntity($this, null);
            }
            return $this->_kamino_environment;
        }
        return new KaminoEnvironmentEntity($this, $data);
    }


    private $_resource = null;

    // Canonical facade: $client->Resource()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resource()
    // resolves here too.
    public function Resource($data = null)
    {
        require_once __DIR__ . '/entity/resource_entity.php';
        if ($data === null) {
            if ($this->_resource === null) {
                $this->_resource = new ResourceEntity($this, null);
            }
            return $this->_resource;
        }
        return new ResourceEntity($this, $data);
    }


    private $_resource_tagging = null;

    // Canonical facade: $client->ResourceTagging()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resource_tagging()
    // resolves here too.
    public function ResourceTagging($data = null)
    {
        require_once __DIR__ . '/entity/resource_tagging_entity.php';
        if ($data === null) {
            if ($this->_resource_tagging === null) {
                $this->_resource_tagging = new ResourceTaggingEntity($this, null);
            }
            return $this->_resource_tagging;
        }
        return new ResourceTaggingEntity($this, $data);
    }


    private $_resource_tagging_tag_key_summary_response_collection = null;

    // Canonical facade: $client->ResourceTaggingTagKeySummaryResponseCollection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resource_tagging_tag_key_summary_response_collection()
    // resolves here too.
    public function ResourceTaggingTagKeySummaryResponseCollection($data = null)
    {
        require_once __DIR__ . '/entity/resource_tagging_tag_key_summary_response_collection_entity.php';
        if ($data === null) {
            if ($this->_resource_tagging_tag_key_summary_response_collection === null) {
                $this->_resource_tagging_tag_key_summary_response_collection = new ResourceTaggingTagKeySummaryResponseCollectionEntity($this, null);
            }
            return $this->_resource_tagging_tag_key_summary_response_collection;
        }
        return new ResourceTaggingTagKeySummaryResponseCollectionEntity($this, $data);
    }


    private $_resource_tagging_tag_keys_response_collection = null;

    // Canonical facade: $client->ResourceTaggingTagKeysResponseCollection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resource_tagging_tag_keys_response_collection()
    // resolves here too.
    public function ResourceTaggingTagKeysResponseCollection($data = null)
    {
        require_once __DIR__ . '/entity/resource_tagging_tag_keys_response_collection_entity.php';
        if ($data === null) {
            if ($this->_resource_tagging_tag_keys_response_collection === null) {
                $this->_resource_tagging_tag_keys_response_collection = new ResourceTaggingTagKeysResponseCollectionEntity($this, null);
            }
            return $this->_resource_tagging_tag_keys_response_collection;
        }
        return new ResourceTaggingTagKeysResponseCollectionEntity($this, $data);
    }


    private $_resource_tagging_tag_values_response_collection = null;

    // Canonical facade: $client->ResourceTaggingTagValuesResponseCollection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resource_tagging_tag_values_response_collection()
    // resolves here too.
    public function ResourceTaggingTagValuesResponseCollection($data = null)
    {
        require_once __DIR__ . '/entity/resource_tagging_tag_values_response_collection_entity.php';
        if ($data === null) {
            if ($this->_resource_tagging_tag_values_response_collection === null) {
                $this->_resource_tagging_tag_values_response_collection = new ResourceTaggingTagValuesResponseCollectionEntity($this, null);
            }
            return $this->_resource_tagging_tag_values_response_collection;
        }
        return new ResourceTaggingTagValuesResponseCollectionEntity($this, $data);
    }


    private $_resource_tagging_tagged_resource_response_single = null;

    // Canonical facade: $client->ResourceTaggingTaggedResourceResponseSingle()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resource_tagging_tagged_resource_response_single()
    // resolves here too.
    public function ResourceTaggingTaggedResourceResponseSingle($data = null)
    {
        require_once __DIR__ . '/entity/resource_tagging_tagged_resource_response_single_entity.php';
        if ($data === null) {
            if ($this->_resource_tagging_tagged_resource_response_single === null) {
                $this->_resource_tagging_tagged_resource_response_single = new ResourceTaggingTaggedResourceResponseSingleEntity($this, null);
            }
            return $this->_resource_tagging_tagged_resource_response_single;
        }
        return new ResourceTaggingTaggedResourceResponseSingleEntity($this, $data);
    }


    private $_zone = null;

    // Canonical facade: $client->Zone()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->zone()
    // resolves here too.
    public function Zone($data = null)
    {
        require_once __DIR__ . '/entity/zone_entity.php';
        if ($data === null) {
            if ($this->_zone === null) {
                $this->_zone = new ZoneEntity($this, null);
            }
            return $this->_zone;
        }
        return new ZoneEntity($this, $data);
    }


    private $_zone_hold = null;

    // Canonical facade: $client->ZoneHold()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->zone_hold()
    // resolves here too.
    public function ZoneHold($data = null)
    {
        require_once __DIR__ . '/entity/zone_hold_entity.php';
        if ($data === null) {
            if ($this->_zone_hold === null) {
                $this->_zone_hold = new ZoneHoldEntity($this, null);
            }
            return $this->_zone_hold;
        }
        return new ZoneHoldEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new CloudflareAccountManagementSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
