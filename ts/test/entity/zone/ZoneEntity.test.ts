

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


describe('ZoneEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.Zone()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'zone.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account":{"a":true,"h":"Account","n":"account","r":true,"t":"`$OBJECT`","key$":"account","index$":0},"errors":{"a":true,"h":"Errors","n":"errors","r":true,"t":"`$ARRAY`","key$":"errors","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"t":"`$ARRAY`","key$":"messages","index$":3},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The domain name.","t":"`$STRING`","key$":"name","index$":4},"paused":{"a":true,"h":"Paused","n":"paused","r":false,"sh":"Indicates whether the zone is only using Cloudflare DNS services.","t":"`$BOOLEAN`","key$":"paused","index$":5},"plan":{"a":true,"h":"Plan","n":"plan","r":false,"sh":"(Deprecated) Please use the `/zones/{zone_id}/subscription` API to update a zone's plan.","t":"`$OBJECT`","key$":"plan","index$":6},"result":{"a":true,"h":"Result","n":"result","op":{"list":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$OBJECT`","key$":"result","index$":7},"result_info":{"a":true,"h":"Result Info","n":"result_info","r":false,"t":"`$OBJECT`","key$":"result_info","index$":8},"success":{"a":true,"h":"Success","n":"success","r":true,"sh":"Whether the API call was successful.","t":"`$BOOLEAN`","key$":"success","index$":9},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"A full zone implies that DNS is hosted with Cloudflare.","t":"`$STRING`","key$":"type","index$":10},"vanity_name_servers":{"a":true,"h":"Vanity Name Servers","n":"vanity_name_servers","r":false,"sh":"An array of domains used for custom name servers.","t":"`$ARRAY`","key$":"vanity_name_servers","index$":11}},"id":{"field":"id","name":"id"},"name":"zone","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /zones","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/zones","q":{},"r":{},"s":[{"lit":"zones"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /zones","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"account_id","or":"account_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"Dev Account","k":"query","n":"account_name","or":"account_name","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"desc","k":"query","n":"direction","or":"direction","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"all","k":"query","n":"match","or":"match","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"example.com","k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"status","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$NUMBER`","index$":6},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$NUMBER`","index$":7},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ARRAY`","index$":9}]},"k":"http","m":"GET","o":"/zones","q":{"exist":["account_id","account_name","direction","match","name","order","page","per_page","status","type"]},"r":{},"s":[{"lit":"zones"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /zones/{zone_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"param","n":"id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/zones/{zone_id}","q":{"exist":["id"]},"r":{"param":{"zone_id":"id"}},"s":[{"lit":"zones"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /zones/{zone_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"param","n":"id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/zones/{zone_id}","q":{"exist":["id"]},"r":{"param":{"zone_id":"id"}},"s":[{"lit":"zones"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /zones/{zone_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"param","n":"id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/zones/{zone_id}","q":{"exist":["id"]},"r":{"param":{"zone_id":"id"}},"s":[{"lit":"zones"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PUT /zones/{zone_id}/activation_check","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"param","n":"id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/zones/{zone_id}/activation_check","q":{"$action":"activation_check","exist":["id"]},"r":{"param":{"zone_id":"id"}},"s":[{"lit":"zones"},{"var":"id"},{"lit":"activation_check"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"zone","name__orig":"zone","Name":"Zone","name_":"zone","name-":"zone","NAME":"ZONE","index$":14}, {"active":true,"entity":"zone","key$":"BasicZoneFlow","kind":"basic","name":"BasicZoneFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"zone_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"zone_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"zone_ref01","srcdatavar":"zone_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-zone_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"zone_ref01","srcdatavar":"zone_ref01_data","suffix":"_dt0"},"m":{"id":"zone01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-zone_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"zone_ref01","suffix":"_rm0"},"m":{"id":"zone01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"zone_ref01"}}],"index$":5}]}, 'Zone', {"POST /zones":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"account":{"type":"object","properties":{"id":{"description":"Identifier","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-ref":"#/components/schemas/zones_identifier"}},"key$":"account"},"name":{"description":"The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment (\"label\") not exceeding 63 characters.","type":"string","example":"example.com","maxLength":253,"pattern":"^([a-zA-Z0-9][\\-a-zA-Z0-9]*\\.)+[\\-a-zA-Z0-9]{2,20}$","x-auditable":true,"x-ref":"#/components/schemas/zones_name","key$":"name"},"type":{"description":"A full zone implies that DNS is hosted with Cloudflare. A partial zone is\ntypically a partner-hosted zone or a CNAME setup.\n","type":"string","example":"full","default":"full","enum":["full","partial","secondary","internal"],"x-ref":"#/components/schemas/zones_type","key$":"type"}},"required":["name","account"],"index$":1}}}},"parameters":[]},"GET /zones":{"protocol":"http","parameters":[{"name":"name","in":"query","schema":{"description":"A domain name. Optional filter operators can be provided to extend refine the search:\n  * `equal` (default)\n  * `not_equal`\n  * `starts_with`\n  * `ends_with`\n  * `contains`\n  * `starts_with_case_sensitive`\n  * `ends_with_case_sensitive`\n  * `contains_case_sensitive`\n","type":"string","maxLength":253},"examples":{"Basic Query":{"summary":"Simple Query","value":"example.com"},"Contains Query":{"summary":"Contains Query","value":"contains:.org"},"Ends With Query":{"summary":"Ends With Query","value":"ends_with:arpa"},"Starts With Query":{"summary":"Starts With Query","value":"starts_with:dev"}},"index$":0},{"name":"status","in":"query","schema":{"description":"Specify a zone status to filter by.","type":"string","enum":["initializing","pending","active","moved"]},"index$":1},{"name":"type","in":"query","schema":{"description":"Zone types to filter by. Multiple types can be specified as a comma-separated list (e.g., ?type=full,partial,secondary). When this parameter is not provided, zones with type \"internal\" are excluded from the results.","type":"array","items":{"enum":["full","partial","secondary","internal"],"type":"string"}},"explode":false,"style":"form","index$":2},{"name":"account.id","in":"query","schema":{"description":"Filter by an account ID.","type":"string"},"index$":3},{"name":"account.name","in":"query","schema":{"description":"An account Name. Optional filter operators can be provided to extend refine the search:\n  * `equal` (default)\n  * `not_equal`\n  * `starts_with`\n  * `ends_with`\n  * `contains`\n  * `starts_with_case_sensitive`\n  * `ends_with_case_sensitive`\n  * `contains_case_sensitive`\n","type":"string","maxLength":253},"examples":{"Basic Query":{"summary":"Simple Query","value":"Dev Account"},"Contains Query":{"summary":"Contains Query","value":"contains:Test"}},"index$":4},{"name":"page","in":"query","schema":{"description":"Page number of paginated results.","type":"number","default":1,"minimum":1},"index$":5},{"name":"per_page","in":"query","schema":{"description":"Number of zones per page.","type":"number","default":20,"maximum":50,"minimum":5},"index$":6},{"name":"order","in":"query","schema":{"description":"Field to order zones by.","type":"string","example":"status","enum":["name","status","account.id","account.name","plan.id"]},"index$":7},{"name":"direction","in":"query","schema":{"description":"Direction to order zones.","type":"string","example":"desc","enum":["asc","desc"]},"index$":8},{"name":"match","in":"query","schema":{"description":"Whether to match all search requirements or at least one (any).","type":"string","default":"all","enum":["any","all"]},"index$":9}]},"GET /zones/{zone_id}":{"protocol":"http","parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"description":"Identifier","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-ref":"#/components/schemas/zones_identifier"},"index$":0}]},"DELETE /zones/{zone_id}":{"protocol":"http","parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"description":"Identifier","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-ref":"#/components/schemas/zones_identifier"},"index$":0}]},"PATCH /zones/{zone_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"paused":{"description":"Indicates whether the zone is only using Cloudflare DNS services. A\ntrue value means the zone will not receive security or performance\nbenefits.\n","type":"boolean","default":false,"x-ref":"#/components/schemas/zones_paused","key$":"paused"},"plan":{"description":"(Deprecated) Please use the `/zones/{zone_id}/subscription` API\nto update a zone's plan. Changing this value will create/cancel\nassociated subscriptions. To view available plans for this zone,\nsee Zone Plans.\n","type":"object","properties":{"id":{"description":"Identifier","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-ref":"#/components/schemas/zones_identifier"}},"key$":"plan"},"type":{"description":"A full zone implies that DNS is hosted with Cloudflare. A partial\nzone is typically a partner-hosted zone or a CNAME setup. This\nparameter is only available to Enterprise customers or if it has\nbeen explicitly enabled on a zone.\n","type":"string","example":"full","enum":["full","partial","secondary","internal"],"key$":"type"},"vanity_name_servers":{"description":"An array of domains used for custom name servers. This is only\navailable for Business and Enterprise plans.","type":"array","items":{"format":"hostname","maxLength":253,"type":"string"},"example":["ns1.example.com","ns2.example.com"],"default":[],"x-ref":"#/components/schemas/zones_vanity_name_servers","key$":"vanity_name_servers"}},"example":{"paused":true},"index$":1}}}},"parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"description":"Identifier","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-ref":"#/components/schemas/zones_identifier"},"index$":0}]},"PUT /zones/{zone_id}/activation_check":{"protocol":"http","parameters":[{"name":"zone_id","in":"path","description":"Zone ID","required":true,"schema":{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/zone-activation_identifier"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const zone_ref01_ent = client.Zone()
    let zone_ref01_data = setup.data.new.zone['zone_ref01']

    zone_ref01_data = (await zone_ref01_ent.create(zone_ref01_data)).data()
    assert(null != zone_ref01_data.id)


    // LIST
    const zone_ref01_match: any = {}

    const zone_ref01_list = (await zone_ref01_ent.list(zone_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(zone_ref01_list, { id: zone_ref01_data.id })))


    // UPDATE
    const zone_ref01_data_up0: any = {}
    zone_ref01_data_up0.id = zone_ref01_data.id

    const zone_ref01_markdef_up0 = { name: 'name', value: 'Mark01-zone_ref01_' + setup.now }
    ;(zone_ref01_data_up0 as any)[zone_ref01_markdef_up0.name] = zone_ref01_markdef_up0.value

    const zone_ref01_resdata_up0 = (await zone_ref01_ent.update(zone_ref01_data_up0)).data()
    assert(zone_ref01_resdata_up0.id === zone_ref01_data_up0.id)

    assert((zone_ref01_resdata_up0 as any)[zone_ref01_markdef_up0.name] === zone_ref01_markdef_up0.value)


    // LOAD
    const zone_ref01_match_dt0: any = {}
    zone_ref01_match_dt0.id = zone_ref01_data.id
    const zone_ref01_data_dt0 = (await zone_ref01_ent.load(zone_ref01_match_dt0)).data()
    assert(zone_ref01_data_dt0.id === zone_ref01_data.id)


    // REMOVE
    const zone_ref01_match_rm0: any = { id: zone_ref01_data.id }
    await zone_ref01_ent.remove(zone_ref01_match_rm0)
  

    // LIST
    const zone_ref01_match_rt0: any = {}

    const zone_ref01_list_rt0 = (await zone_ref01_ent.list(zone_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(zone_ref01_list_rt0, { id: zone_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/zone/ZoneTestData.json')

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
    ['zone01','zone02','zone03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ZONE_ENTID']
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
  
