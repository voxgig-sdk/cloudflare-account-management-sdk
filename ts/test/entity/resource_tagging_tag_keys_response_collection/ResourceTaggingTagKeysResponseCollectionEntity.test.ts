

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


describe('ResourceTaggingTagKeysResponseCollectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.ResourceTaggingTagKeysResponseCollection()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'resource_tagging_tag_keys_response_collection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errors":{"a":true,"h":"Errors","n":"errors","r":true,"t":"`$ARRAY`","key$":"errors","index$":0},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"t":"`$ARRAY`","key$":"messages","index$":1},"result":{"a":true,"h":"Result","n":"result","r":false,"sh":"Contains an array of distinct tag keys.","t":"`$ARRAY`","key$":"result","index$":2},"result_info":{"a":true,"h":"Result Info","n":"result_info","r":false,"t":"`$OBJECT`","key$":"result_info","index$":3},"success":{"a":true,"h":"Success","n":"success","r":true,"sh":"Whether the API call was successful.","t":"`$BOOLEAN`","key$":"success","index$":4}},"name":"resource_tagging_tag_keys_response_collection","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /accounts/{account_id}/tags/keys","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ","k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/accounts/{account_id}/tags/keys","q":{"exist":["account_id","cursor"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"tags"},{"lit":"keys"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.account"]]},"key$":"resource_tagging_tag_keys_response_collection","name__orig":"resource_tagging_tag_keys_response_collection","Name":"ResourceTaggingTagKeysResponseCollection","name_":"resource_tagging_tag_keys_response_collection","name-":"resource-tagging-tag-keys-response-collection","NAME":"RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION","index$":11}, {"active":true,"entity":"resource_tagging_tag_keys_response_collection","key$":"BasicResourceTaggingTagKeysResponseCollectionFlow","kind":"basic","name":"BasicResourceTaggingTagKeysResponseCollectionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"account_id":"account01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"resource_tagging_tag_keys_response_collection_ref01"}}],"index$":0}]}, 'ResourceTaggingTagKeysResponseCollection', {"GET /accounts/{account_id}/tags/keys":{"protocol":"http","parameters":[{"name":"account_id","in":"path","required":true,"schema":{"allOf":[{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_identifier"}],"minLength":32,"x-ref":"#/components/schemas/resource-tagging_account_id"},"index$":0},{"description":"Cursor for pagination.","in":"query","name":"cursor","schema":{"type":"string","example":"eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"},"x-ref":"#/components/parameters/resource-tagging_cursor","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let resource_tagging_tag_keys_response_collection_ref01_data = Object.values(setup.data.existing.resource_tagging_tag_keys_response_collection)[0] as any

    // LIST
    const resource_tagging_tag_keys_response_collection_ref01_ent = client.ResourceTaggingTagKeysResponseCollection()
    const resource_tagging_tag_keys_response_collection_ref01_match: any = {}
    resource_tagging_tag_keys_response_collection_ref01_match['account_id'] = setup.idmap['account01']

    const resource_tagging_tag_keys_response_collection_ref01_list = (await resource_tagging_tag_keys_response_collection_ref01_ent.list(resource_tagging_tag_keys_response_collection_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/resource_tagging_tag_keys_response_collection/ResourceTaggingTagKeysResponseCollectionTestData.json')

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
    ['resource_tagging_tag_keys_response_collection01','resource_tagging_tag_keys_response_collection02','resource_tagging_tag_keys_response_collection03','account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_KEYS_RESPONSE_COLLECTION_ENTID']
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
  
