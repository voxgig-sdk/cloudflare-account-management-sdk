

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CloudflareAccountManagementSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.Resource()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errors":{"a":true,"h":"Errors","n":"errors","r":true,"t":"`$ARRAY`","key$":"errors","index$":0},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"t":"`$ARRAY`","key$":"messages","index$":1},"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$ARRAY`","key$":"result","index$":2},"result_info":{"a":true,"h":"Result Info","n":"result_info","r":false,"t":"`$OBJECT`","key$":"result_info","index$":3},"success":{"a":true,"h":"Success","n":"success","r":true,"sh":"Whether the API call was successful.","t":"`$BOOLEAN`","key$":"success","index$":4}},"name":"resource","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /accounts/{account_id}/tags/resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"case_insensitive","or":"case_insensitive","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ","k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"id","or":"id","r":false,"t":"`$ARRAY`","index$":2},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":["production","env=prod","env=prod,staging","!archived","region!=us-west-1"],"k":"query","n":"tag","or":"tag","r":false,"t":"`$ARRAY`","index$":4},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ARRAY`","index$":5}]},"k":"http","m":"GET","o":"/accounts/{account_id}/tags/resources","q":{"exist":["account_id","case_insensitive","cursor","id","name","tag","type"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"tags"},{"lit":"resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.account"]]},"key$":"resource","name__orig":"resource","Name":"Resource","name_":"resource","name-":"resource","NAME":"RESOURCE","index$":8}, {"active":true,"entity":"resource","key$":"BasicResourceFlow","kind":"basic","name":"BasicResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"account_id":"account01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"resource_ref01"}}],"index$":0}]}, 'Resource', {"GET /accounts/{account_id}/tags/resources":{"protocol":"http","parameters":[{"name":"account_id","in":"path","required":true,"schema":{"allOf":[{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_identifier"}],"minLength":32,"x-ref":"#/components/schemas/resource-tagging_account_id"},"index$":0},{"name":"type","in":"query","description":"Filter by resource type. Can be repeated to filter by multiple types (OR logic). Example: ?type=zone&type=worker","schema":{"type":"array","items":{"description":"Identifies the type of resource.","type":"string","example":"zone","enum":["access_application","access_application_policy","access_group","account","account_ruleset","ai_gateway","alerting_policy","alerting_webhook","api_gateway_operation","cloudflared_tunnel","custom_certificate","custom_hostname","cws_deployment","cws_policy","cws_policy_set","cws_workload","d1_database","dns_record","durable_object_namespace","gateway_list","gateway_rule","healthcheck","image","infrastructure_target","kv_namespace","load_balancer","load_balancer_monitor","load_balancer_pool","managed_client_certificate","pages_project","queue","r2_bucket","resource_share","stream_live_input","stream_video","vectorize_index","worker","worker_route","worker_version","zone","zone_ruleset"],"x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_resource_type"}},"explode":true,"style":"form","index$":1},{"name":"name","in":"query","description":"Filter by resource name. Performs a case-insensitive substring match. Example: ?name=my-zone","schema":{"type":"string","maxLength":256},"index$":2},{"name":"id","in":"query","description":"Filter by resource ID. Can be repeated up to 50 times to filter by multiple IDs. Example: ?id=abc&id=def","schema":{"type":"array","items":{"description":"Identifies the unique resource.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_resource_id"},"maxItems":50},"explode":true,"style":"form","index$":3},{"name":"case_insensitive","in":"query","description":"Match `tag` keys and values case-insensitively. Stored casing is unchanged. Example: ?tag=environment=production&case_insensitive=true","schema":{"type":"boolean","default":false},"index$":4},{"description":"Filter resources by tag criteria. This parameter can be repeated multiple times, with AND logic between parameters.\n\nSupported syntax:\n- **Key-only**: `tag=<key>` - Resource must have the tag key (e.g., `tag=production`)\n- **Key-value**: `tag=<key>=<value>` - Resource must have the tag with specific value (e.g., `tag=env=prod`)\n- **Multiple values (OR)**: `tag=<key>=<v1>,<v2>` - Resource must have tag with any of the values (e.g., `tag=env=prod,staging`)\n- **Negate key-only**: `tag=!<key>` - Resource must not have the tag key (e.g., `tag=!archived`)\n- **Negate key-value**: `tag=<key>!=<value>` - Resource must not have the tag with specific value (e.g., `tag=region!=us-west-1`)\n\nMultiple tag parameters are combined with AND logic.\n","explode":true,"in":"query","name":"tag","schema":{"type":"array","items":{"type":"string"},"example":["production","env=prod","env=prod,staging","!archived","region!=us-west-1"]},"x-ref":"#/components/parameters/resource-tagging_tag","index$":5},{"description":"Cursor for pagination.","in":"query","name":"cursor","schema":{"type":"string","example":"eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"},"x-ref":"#/components/parameters/resource-tagging_cursor","index$":6}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let resource_ref01_data = Object.values(setup.data.existing.resource)[0] as any

    // LIST
    const resource_ref01_ent = client.Resource()
    const resource_ref01_match: any = {}
    resource_ref01_match['account_id'] = setup.idmap['account01']

    const resource_ref01_list = (await resource_ref01_ent.list(resource_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/resource/ResourceTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CloudflareAccountManagementSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['resource01','resource02','resource03','account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CloudflareAccountManagementSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
