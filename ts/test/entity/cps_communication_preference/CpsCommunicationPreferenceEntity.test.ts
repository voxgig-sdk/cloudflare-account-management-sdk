

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


describe('CpsCommunicationPreferenceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.CpsCommunicationPreference()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cps_communication_preference.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errors":{"a":true,"h":"Errors","n":"errors","r":true,"t":"`$ARRAY`","key$":"errors","index$":0},"languagelocale":{"a":true,"h":"Languagelocale","n":"languagelocale","r":false,"sh":"The user's preferred language locale for communications.","t":"`$STRING`","key$":"languagelocale","index$":1},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"t":"`$ARRAY`","key$":"messages","index$":2},"preferences":{"a":true,"h":"Preferences","n":"preferences","r":false,"sh":"Preference keys mapped to subscription states to update.","t":"`$OBJECT`","key$":"preferences","index$":3},"result":{"a":true,"h":"Result","n":"result","r":true,"sh":"The user's communication preferences.","t":"`$OBJECT`","key$":"result","index$":4},"success":{"a":true,"h":"Success","n":"success","r":true,"sh":"Whether the API call was successful.","t":"`$BOOLEAN`","key$":"success","index$":5}},"name":"cps_communication_preference","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /user/communication_preferences","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/user/communication_preferences","q":{},"r":{},"s":[{"lit":"user"},{"lit":"communication_preferences"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /user/communication_preferences","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/user/communication_preferences","q":{},"r":{},"s":[{"lit":"user"},{"lit":"communication_preferences"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"cps_communication_preference","name__orig":"cps_communication_preference","Name":"CpsCommunicationPreference","name_":"cps_communication_preference","name-":"cps-communication-preference","NAME":"CPS_COMMUNICATION_PREFERENCE","index$":3}, {"active":true,"entity":"cps_communication_preference","key$":"BasicCpsCommunicationPreferenceFlow","kind":"basic","name":"BasicCpsCommunicationPreferenceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"cps_communication_preference_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"cps_communication_preference_ref01","srcdatavar":"cps_communication_preference_ref01_data","suffix":"_up0","textfield":"languagelocale"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cps_communication_preference_ref01"}}],"v":[],"index$":1}]}, 'CpsCommunicationPreference', {"GET /user/communication_preferences":{"protocol":"http","parameters":[]},"PUT /user/communication_preferences":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"examples":{"update_all":{"summary":"Update preferences and language","value":{"language-locale":"es-ES","preferences":{"marketing":{"subscribed":true},"product_news":{"subscribed":true}}}},"update_language":{"summary":"Update language locale","value":{"language-locale":"fr-FR","preferences":{}}},"update_subscriptions":{"summary":"Update marketing subscription preferences","value":{"preferences":{"marketing":{"subscribed":false},"product_news":{"subscribed":true}}}}},"schema":{"description":"Request body for updating communication preferences. An email field in the payload is ignored; email verification state is managed separately, so the field is excluded from this schema.","type":"object","properties":{"language-locale":{"description":"The user's preferred language locale for communications. If omitted, the language locale does not change.","type":"string","example":"en-US","enum":["en-US","es-ES","de-DE","fr-FR","it-IT","ja-JP","ko-KR","pt-BR","zh-CN","zh-TW"],"key$":"language-locale"},"preferences":{"description":"Preference keys mapped to subscription states to update. Only the preferences in this map change; others remain unchanged.","type":"object","example":{"marketing":{"subscribed":false},"product_news":{"subscribed":true}},"additionalProperties":{"properties":{"subscribed":{"description":"Whether to subscribe or unsubscribe from this communication type.","type":"boolean"}},"required":["subscribed"],"type":"object"},"key$":"preferences"}},"x-ref":"#/components/schemas/cps_update_communication_preferences_request","index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cps_communication_preference_ref01_data = Object.values(setup.data.existing.cps_communication_preference)[0] as any

    // LIST
    const cps_communication_preference_ref01_ent = client.CpsCommunicationPreference()
    const cps_communication_preference_ref01_match: any = {}

    const cps_communication_preference_ref01_list = (await cps_communication_preference_ref01_ent.list(cps_communication_preference_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const cps_communication_preference_ref01_data_up0: any = {}

    const cps_communication_preference_ref01_markdef_up0 = { name: 'languagelocale', value: 'Mark01-cps_communication_preference_ref01_' + setup.now }
    ;(cps_communication_preference_ref01_data_up0 as any)[cps_communication_preference_ref01_markdef_up0.name] = cps_communication_preference_ref01_markdef_up0.value

    const cps_communication_preference_ref01_resdata_up0 = (await cps_communication_preference_ref01_ent.update(cps_communication_preference_ref01_data_up0)).data()
    assert(null != cps_communication_preference_ref01_resdata_up0)

    assert((cps_communication_preference_ref01_resdata_up0 as any)[cps_communication_preference_ref01_markdef_up0.name] === cps_communication_preference_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cps_communication_preference/CpsCommunicationPreferenceTestData.json')

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
    ['cps_communication_preference01','cps_communication_preference02','cps_communication_preference03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CPS_COMMUNICATION_PREFERENCE_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CPS_COMMUNICATION_PREFERENCE_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_CPS_COMMUNICATION_PREFERENCE_ENTID']
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
  
