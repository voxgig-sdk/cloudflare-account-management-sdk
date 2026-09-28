

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


describe('IamApiResponseSingleIdEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.IamApiResponseSingleId()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'iam_api_response_single_id.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Account name","t":"`$STRING`","key$":"name","index$":0},"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$ARRAY`","key$":"result","index$":1},"standalone":{"a":true,"h":"Standalone","n":"standalone","r":false,"sh":"Set to `true` and omit `unit` to create a standalone Free Account.","t":"`$BOOLEAN`","key$":"standalone","index$":2},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$ANY`","key$":"type","index$":3},"unit":{"a":true,"h":"Unit","n":"unit","r":false,"sh":"Information related to the tenant unit.","t":"`$OBJECT`","key$":"unit","index$":4}},"name":"iam_api_response_single_id","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /accounts","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"idempotency_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/accounts","q":{"exist":["idempotency_key"]},"r":{},"s":[{"lit":"accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /accounts","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"desc","k":"query","n":"direction","or":"direction","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"example.com","k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$NUMBER`","index$":3}]},"k":"http","m":"GET","o":"/accounts","q":{"exist":["direction","name","page","per_page"]},"r":{},"s":[{"lit":"accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /accounts/{account_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/accounts/{account_id}","q":{"exist":["account_id"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.account"]]},"key$":"iam_api_response_single_id","name__orig":"iam_api_response_single_id","Name":"IamApiResponseSingleId","name_":"iam_api_response_single_id","name-":"iam-api-response-single-id","NAME":"IAM_API_RESPONSE_SINGLE_ID","index$":4}, {"active":true,"entity":"iam_api_response_single_id","key$":"BasicIamApiResponseSingleIdFlow","kind":"basic","name":"BasicIamApiResponseSingleIdFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"iam_api_response_single_id_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"iam_api_response_single_id_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"iam_api_response_single_id_ref01","suffix":"_rm0"},"m":{"id":"iam_api_response_single_id01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"iam_api_response_single_id_ref01"}}],"index$":3}]}, 'IamApiResponseSingleId', {"POST /accounts":{"protocol":"http","requestBody":{"description":"Parameters for account creation","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"description":"Account name","type":"string","key$":"name"},"standalone":{"description":"Set to `true` and omit `unit` to create a standalone Free Account. If provided, this field must be `true`.","type":"boolean","enum":[true],"x-stainless-terraform-configurability":"computed_optional","key$":"standalone"},"type":{"enum":["standard","enterprise"],"x-ref":"#/components/schemas/iam_account-type","key$":"type"},"unit":{"description":"Information related to the tenant unit. Provide its ID and omit `standalone` to create the Account within an Organization. See https://developers.cloudflare.com/tenant/how-to/manage-accounts/.","type":"object","properties":{"id":{"description":"Tenant unit ID","type":"string","example":"f267e341f3dd4697bd3b9f71dd96247f","x-auditable":true,"x-stainless-terraform-configurability":"computed_optional"}},"x-stainless-terraform-configurability":"computed_optional","key$":"unit"}},"not":{"required":["unit","standalone"]},"required":["name"],"title":"Create Account","x-ref":"#/components/schemas/iam_create-account","index$":1}}}},"parameters":[{"name":"Idempotency-Key","in":"header","description":"Optional key that identifies an Account-creation request. Free Account creation can require exactly one valid key, so API clients should send a key with every Account-creation request. Reuse the same key when retrying the same request.","schema":{"type":"string","maxLength":128,"minLength":1},"index$":0}]},"GET /accounts":{"protocol":"http","parameters":[{"name":"name","in":"query","schema":{"description":"Name of the account.","type":"string","example":"example.com","readOnly":true},"index$":0},{"name":"page","in":"query","schema":{"description":"Page number of paginated results.","type":"number","default":1,"minimum":1},"index$":1},{"name":"per_page","in":"query","schema":{"description":"Maximum number of results per page.","type":"number","default":20,"maximum":50,"minimum":5},"index$":2},{"name":"direction","in":"query","schema":{"description":"Direction to order results.","type":"string","example":"desc","enum":["asc","desc"]},"index$":3}]},"DELETE /accounts/{account_id}":{"protocol":"http","parameters":[{"name":"account_id","in":"path","required":true,"schema":{"description":"The account ID of the account to be deleted","type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const iam_api_response_single_id_ref01_ent = client.IamApiResponseSingleId()
    let iam_api_response_single_id_ref01_data = setup.data.new.iam_api_response_single_id['iam_api_response_single_id_ref01']

    iam_api_response_single_id_ref01_data = (await iam_api_response_single_id_ref01_ent.create(iam_api_response_single_id_ref01_data)).data()
    assert(null != iam_api_response_single_id_ref01_data)


    // LIST
    const iam_api_response_single_id_ref01_match: any = {}

    const iam_api_response_single_id_ref01_list = (await iam_api_response_single_id_ref01_ent.list(iam_api_response_single_id_ref01_match)).map((e: any) => e.data())



    // LIST
    const iam_api_response_single_id_ref01_match_rt0: any = {}

    const iam_api_response_single_id_ref01_list_rt0 = (await iam_api_response_single_id_ref01_ent.list(iam_api_response_single_id_ref01_match_rt0)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/iam_api_response_single_id/IamApiResponseSingleIdTestData.json')

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
    ['iam_api_response_single_id01','iam_api_response_single_id02','iam_api_response_single_id03','account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_API_RESPONSE_SINGLE_ID_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_API_RESPONSE_SINGLE_ID_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_API_RESPONSE_SINGLE_ID_ENTID']
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
  
