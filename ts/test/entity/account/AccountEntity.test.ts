

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


describe('AccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.Account()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"account","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /accounts/move","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/accounts/move","q":{"$action":"move"},"r":{},"s":[{"lit":"accounts"},{"lit":"move"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /accounts/{account_id}/profile","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/accounts/{account_id}/profile","q":{"$action":"profile","exist":["id"]},"r":{"param":{"account_id":"id"}},"s":[{"lit":"accounts"},{"var":"id"},{"lit":"profile"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"account","name__orig":"account","Name":"Account","name_":"account","name-":"account","NAME":"ACCOUNT","index$":0}, {"active":true,"entity":"account","key$":"BasicAccountFlow","kind":"basic","name":"BasicAccountFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"account_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"account_id":"account01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"account_ref01"}}],"index$":1}]}, 'Account', {"POST /accounts/move":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"account_ids":{"description":"Move these accounts to the destination organization.","type":"array","items":{"type":"string"}},"destination_organization_id":{"description":"Move accounts to this organization ID.","type":"string"}},"required":["account_ids","destination_organization_id"]}}}},"parameters":[]},"GET /accounts/{account_id}/profile":{"protocol":"http","parameters":[{"name":"account_id","in":"path","description":"The ID of the account whose business profile to retrieve.","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const account_ref01_ent = client.Account()
    let account_ref01_data = setup.data.new.account['account_ref01']

    account_ref01_data = (await account_ref01_ent.create(account_ref01_data)).data()
    assert(null != account_ref01_data.id)


    // LIST
    const account_ref01_match: any = {}
    account_ref01_match['account_id'] = setup.idmap['account01']

    const account_ref01_list = (await account_ref01_ent.list(account_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(account_ref01_list, { id: account_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/account/AccountTestData.json')

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
    ['account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_ACCOUNT_ENTID']
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
  
