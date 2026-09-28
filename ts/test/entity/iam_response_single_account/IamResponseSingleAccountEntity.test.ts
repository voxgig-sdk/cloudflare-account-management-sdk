

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


describe('IamResponseSingleAccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.IamResponseSingleAccount()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'iam_response_single_account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"result":{"a":true,"h":"Result","n":"result","r":true,"t":"`$OBJECT`","key$":"result","index$":1}},"id":{"field":"id","name":"id"},"name":"iam_response_single_account","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /accounts/{account_id}/move","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/accounts/{account_id}/move","q":{"$action":"move","exist":["account_id"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"move"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /accounts/{account_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/accounts/{account_id}","q":{"exist":["id"]},"r":{"param":{"account_id":"id"}},"s":[{"lit":"accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /accounts/{account_id}/profile","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/accounts/{account_id}/profile","q":{"$action":"profile","exist":["account_id"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"profile"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PUT /accounts/{account_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/accounts/{account_id}","q":{"exist":["id"]},"r":{"param":{"account_id":"id"}},"s":[{"lit":"accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.account"]]},"key$":"iam_response_single_account","name__orig":"iam_response_single_account","Name":"IamResponseSingleAccount","name_":"iam_response_single_account","name-":"iam-response-single-account","NAME":"IAM_RESPONSE_SINGLE_ACCOUNT","index$":5}, {"active":true,"entity":"iam_response_single_account","key$":"BasicIamResponseSingleAccountFlow","kind":"basic","name":"BasicIamResponseSingleAccountFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"iam_response_single_account_ref01"},"m":{"account_id":"account01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"iam_response_single_account_ref01","srcdatavar":"iam_response_single_account_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-iam_response_single_account_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"iam_response_single_account_ref01","srcdatavar":"iam_response_single_account_ref01_data","suffix":"_dt0"},"m":{"id":"iam_response_single_account01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-iam_response_single_account_ref01"}}],"index$":2}]}, 'IamResponseSingleAccount', {"POST /accounts/{account_id}/move":{"protocol":"http","requestBody":{"description":"The destination organization ID is where the account is to be moved.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"destination_organization_id":{"description":"The ID of the organization to move the account into.","type":"string"}},"required":["destination_organization_id"]}}}},"parameters":[{"name":"account_id","in":"path","description":"The ID of the account to move.","required":true,"schema":{"type":"string"},"index$":0}]},"GET /accounts/{account_id}":{"protocol":"http","parameters":[{"name":"account_id","in":"path","required":true,"schema":{"description":"Account identifier tag.","allOf":[{"description":"Identifier","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"minLength":32,"x-auditable":true,"x-ref":"#/components/schemas/iam_common_components-schemas-identifier"}],"title":"Account Identifier","x-ref":"#/components/schemas/iam_account_identifier"},"index$":0}]},"PUT /accounts/{account_id}/profile":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"business_address":{"type":"string"},"business_email":{"type":"string"},"business_name":{"type":"string"},"business_phone":{"type":"string"},"external_metadata":{"type":"string"}},"required":["business_name","business_email","business_phone","business_address","external_metadata"],"x-ref":"#/components/schemas/organizations-api_Profile"}}}},"parameters":[{"name":"account_id","in":"path","description":"The ID of the account whose business profile to update.","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /accounts/{account_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"created_on":{"description":"Timestamp for the creation of the account","example":"2014-03-01T12:21:02Z","format":"date-time","readOnly":true,"type":"string","x-auditable":true},"id":{"description":"Identifier","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"minLength":32,"type":"string","x-auditable":true,"x-ref":"#/components/schemas/iam_common_components-schemas-identifier"},"managed_by":{"description":"Parent container details","properties":{"parent_org_id":{},"parent_org_name":{}},"type":"object"},"name":{"description":"Account name","example":"Demo Account","maxLength":100,"type":"string","x-auditable":true},"settings":{"description":"Account settings","properties":{"abuse_contact_email":{},"enforce_twofactor":{}},"type":"object"},"type":{"enum":["standard","enterprise"],"x-ref":"#/components/schemas/iam_account-type"}},"required":["id","name","type"],"x-ref":"#/components/schemas/iam_account"}],"x-ref":"#/components/schemas/iam_components-schemas-account","index$":1}}}},"parameters":[{"name":"account_id","in":"path","required":true,"schema":{"description":"Account identifier tag.","allOf":[{"description":"Identifier","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"minLength":32,"x-auditable":true,"x-ref":"#/components/schemas/iam_common_components-schemas-identifier"}],"title":"Account Identifier","x-ref":"#/components/schemas/iam_account_identifier"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const iam_response_single_account_ref01_ent = client.IamResponseSingleAccount()
    let iam_response_single_account_ref01_data = setup.data.new.iam_response_single_account['iam_response_single_account_ref01']
    iam_response_single_account_ref01_data['account_id'] = setup.idmap['account01']

    iam_response_single_account_ref01_data = (await iam_response_single_account_ref01_ent.create(iam_response_single_account_ref01_data)).data()
    assert(null != iam_response_single_account_ref01_data.id)


    // UPDATE
    const iam_response_single_account_ref01_data_up0: any = {}
    iam_response_single_account_ref01_data_up0.id = iam_response_single_account_ref01_data.id

    const iam_response_single_account_ref01_resdata_up0 = (await iam_response_single_account_ref01_ent.update(iam_response_single_account_ref01_data_up0)).data()
    assert(iam_response_single_account_ref01_resdata_up0.id === iam_response_single_account_ref01_data_up0.id)


    // LOAD
    const iam_response_single_account_ref01_match_dt0: any = {}
    iam_response_single_account_ref01_match_dt0.id = iam_response_single_account_ref01_data.id
    const iam_response_single_account_ref01_data_dt0 = (await iam_response_single_account_ref01_ent.load(iam_response_single_account_ref01_match_dt0)).data()
    assert(iam_response_single_account_ref01_data_dt0.id === iam_response_single_account_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/iam_response_single_account/IamResponseSingleAccountTestData.json')

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
    ['iam_response_single_account01','iam_response_single_account02','iam_response_single_account03','account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_IAM_RESPONSE_SINGLE_ACCOUNT_ENTID']
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
  
