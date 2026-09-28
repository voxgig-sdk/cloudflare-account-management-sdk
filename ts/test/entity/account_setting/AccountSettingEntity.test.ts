

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


describe('AccountSettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.AccountSetting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account_setting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errors":{"a":true,"h":"Errors","n":"errors","r":true,"t":"`$ARRAY`","key$":"errors","index$":0},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"t":"`$ARRAY`","key$":"messages","index$":1},"result":{"a":true,"h":"Result","n":"result","r":false,"sh":"Controls Unique Transformations billing for the account.","t":"`$ARRAY`","key$":"result","index$":2},"success":{"a":true,"h":"Success","n":"success","r":true,"sh":"Whether the API call was successful.","t":"`$BOOLEAN`","key$":"success","index$":3},"value":{"a":true,"h":"Value","n":"value","r":true,"sh":"Enables Unique Transformations billing for the account.","t":"`$STRING`","key$":"value","index$":4}},"name":"account_setting","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /accounts/{account_id}/settings/transformations","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/accounts/{account_id}/settings/transformations","q":{"exist":["account_id"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"settings"},{"lit":"transformations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /accounts/{account_id}/settings/ut-billing","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/accounts/{account_id}/settings/ut-billing","q":{"exist":["account_id"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"settings"},{"lit":"ut-billing"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /accounts/{account_id}/settings/ut-billing","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/accounts/{account_id}/settings/ut-billing","q":{"exist":["account_id"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"settings"},{"lit":"ut-billing"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.account"]]},"key$":"account_setting","name__orig":"account_setting","Name":"AccountSetting","name_":"account_setting","name-":"account-setting","NAME":"ACCOUNT_SETTING","index$":1}, {"active":true,"entity":"account_setting","key$":"BasicAccountSettingFlow","kind":"basic","name":"BasicAccountSettingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"account_id":"account01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"account_setting_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"account_setting_ref01","srcdatavar":"account_setting_ref01_data","suffix":"_up0","textfield":"value"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-account_setting_ref01"}}],"v":[],"index$":1}]}, 'AccountSetting', {"GET /accounts/{account_id}/settings/transformations":{"protocol":"http","parameters":[{"name":"account_id","in":"path","required":true,"schema":{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/speed_identifier"},"index$":0}]},"GET /accounts/{account_id}/settings/ut-billing":{"protocol":"http","parameters":[{"name":"account_id","in":"path","required":true,"schema":{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/speed_identifier"},"index$":0}]},"PATCH /accounts/{account_id}/settings/ut-billing":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"value":{"description":"Enables Unique Transformations billing for the account.\nNote: once enabled, this setting cannot be set back to \"off\".\n","type":"string","enum":["on"],"x-auditable":true,"x-ref":"#/components/schemas/speed_ut_billing_value","key$":"value"}},"required":["value"],"index$":1}}}},"parameters":[{"name":"account_id","in":"path","required":true,"schema":{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/speed_identifier"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let account_setting_ref01_data = Object.values(setup.data.existing.account_setting)[0] as any

    // LIST
    const account_setting_ref01_ent = client.AccountSetting()
    const account_setting_ref01_match: any = {}
    account_setting_ref01_match['account_id'] = setup.idmap['account01']

    const account_setting_ref01_list = (await account_setting_ref01_ent.list(account_setting_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const account_setting_ref01_data_up0: any = {}

    const account_setting_ref01_markdef_up0 = { name: 'value', value: 'Mark01-account_setting_ref01_' + setup.now }
    ;(account_setting_ref01_data_up0 as any)[account_setting_ref01_markdef_up0.name] = account_setting_ref01_markdef_up0.value

    const account_setting_ref01_resdata_up0 = (await account_setting_ref01_ent.update(account_setting_ref01_data_up0)).data()
    assert(null != account_setting_ref01_resdata_up0)

    assert((account_setting_ref01_resdata_up0 as any)[account_setting_ref01_markdef_up0.name] === account_setting_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/account_setting/AccountSettingTestData.json')

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
    ['account_setting01','account_setting02','account_setting03','account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_SETTING_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_SETTING_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_SETTING_ENTID']
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
  
