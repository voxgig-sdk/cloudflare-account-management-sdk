

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


describe('ResourceTaggingTaggedResourceResponseSingleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    const ent = testsdk.ResourceTaggingTaggedResourceResponseSingle()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'resource_tagging_tagged_resource_response_single.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errors":{"a":true,"h":"Errors","n":"errors","r":true,"t":"`$ARRAY`","key$":"errors","index$":0},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"t":"`$ARRAY`","key$":"messages","index$":1},"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$OBJECT`","key$":"result","index$":2},"success":{"a":true,"h":"Success","n":"success","r":true,"sh":"Whether the API call was successful.","t":"`$BOOLEAN`","key$":"success","index$":3}},"name":"resource_tagging_tagged_resource_response_single","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /zones/{zone_id}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"zone_id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"f174e90a-fafe-4643-bbbc-4a0ed4fc8415","k":"query","n":"access_application_id","or":"access_application_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"query","n":"resource_id","or":"resource_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"zone","k":"query","n":"resource_type","or":"resource_type","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/zones/{zone_id}/tags","q":{"exist":["access_application_id","resource_id","resource_type","zone_id"]},"r":{},"s":[{"lit":"zones"},{"var":"zone_id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /accounts/{account_id}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"023e105f4ecef8ad9ca31a8372d0c353","k":"query","n":"resource_id","or":"resource_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"worker","k":"query","n":"resource_type","or":"resource_type","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"3f72a691-44b3-4c11-8642-c18a88ddaa5e","k":"query","n":"worker_id","or":"worker_id","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/accounts/{account_id}/tags","q":{"exist":["account_id","resource_id","resource_type","worker_id"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /accounts/{account_id}/tags","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"\"v1:RBNvo1WzZ4oRRq0W9-hkng\"","k":"header","n":"if_match","or":"if_match","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"account_id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/accounts/{account_id}/tags","q":{"exist":["account_id","if_match"]},"r":{},"s":[{"lit":"accounts"},{"var":"account_id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PUT /zones/{zone_id}/tags","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"\"v1:RBNvo1WzZ4oRRq0W9-hkng\"","k":"header","n":"if_match","or":"if_match","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"zone_id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/zones/{zone_id}/tags","q":{"exist":["if_match","zone_id"]},"r":{},"s":[{"lit":"zones"},{"var":"zone_id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.account"],["$.main.kit.entity.zone"]]},"key$":"resource_tagging_tagged_resource_response_single","name__orig":"resource_tagging_tagged_resource_response_single","Name":"ResourceTaggingTaggedResourceResponseSingle","name_":"resource_tagging_tagged_resource_response_single","name-":"resource-tagging-tagged-resource-response-single","NAME":"RESOURCE_TAGGING_TAGGED_RESOURCE_RESPONSE_SINGLE","index$":13}, {"active":true,"entity":"resource_tagging_tagged_resource_response_single","key$":"BasicResourceTaggingTaggedResourceResponseSingleFlow","kind":"basic","name":"BasicResourceTaggingTaggedResourceResponseSingleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"account_id":"account01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"resource_tagging_tagged_resource_response_single_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"resource_tagging_tagged_resource_response_single_ref01","srcdatavar":"resource_tagging_tagged_resource_response_single_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-resource_tagging_tagged_resource_response_single_ref01"}}],"v":[],"index$":1}]}, 'ResourceTaggingTaggedResourceResponseSingle', {"GET /zones/{zone_id}/tags":{"protocol":"http","parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"description":"Zone ID is required only for zone-level resources","type":"string","allOf":[{"description":"Identifier.","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"type":"string","x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_identifier"}],"minLength":32,"x-ref":"#/components/schemas/resource-tagging_zone_id"},"index$":0},{"name":"resource_id","in":"query","description":"The ID of the resource to retrieve tags for.","required":true,"schema":{"description":"Identifies the unique resource.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_resource_id"},"index$":1},{"name":"resource_type","in":"query","description":"The type of the resource.","required":true,"schema":{"description":"Identifies the type of zone-level resource.","type":"string","example":"zone","enum":["access_application_policy","api_gateway_operation","custom_certificate","custom_hostname","dns_record","healthcheck","load_balancer","managed_client_certificate","worker_route","zone","zone_ruleset"],"x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_zone_resource_type"},"index$":2},{"name":"access_application_id","in":"query","description":"Access application ID identifier. Required for access_application_policy resources.","schema":{"description":"Access application ID is required only for access_application_policy resources","type":"string","format":"uuid","example":"f174e90a-fafe-4643-bbbc-4a0ed4fc8415","x-ref":"#/components/schemas/resource-tagging_access_application_id"},"index$":3}]},"GET /accounts/{account_id}/tags":{"protocol":"http","parameters":[{"name":"account_id","in":"path","required":true,"schema":{"allOf":[{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_identifier"}],"minLength":32,"x-ref":"#/components/schemas/resource-tagging_account_id"},"index$":0},{"name":"resource_id","in":"query","description":"The ID of the resource to retrieve tags for.","required":true,"schema":{"description":"Identifies the unique resource.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_resource_id"},"index$":1},{"name":"resource_type","in":"query","description":"The type of the resource.","required":true,"schema":{"description":"Identifies the type of account-level resource.","type":"string","example":"worker","enum":["access_application","access_group","account","account_ruleset","ai_gateway","alerting_policy","alerting_webhook","cloudflared_tunnel","cws_deployment","cws_policy","cws_policy_set","cws_workload","d1_database","durable_object_namespace","gateway_list","gateway_rule","image","infrastructure_target","kv_namespace","load_balancer_monitor","load_balancer_pool","pages_project","queue","r2_bucket","resource_share","stream_live_input","stream_video","vectorize_index","worker","worker_version"],"x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_account_resource_type"},"index$":2},{"name":"worker_id","in":"query","description":"Worker identifier. Required for worker_version resources.","schema":{"description":"Worker ID is required only for worker_version resources","type":"string","example":"3f72a691-44b3-4c11-8642-c18a88ddaa5e","x-ref":"#/components/schemas/resource-tagging_worker_id"},"index$":3}]},"PUT /accounts/{account_id}/tags":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"description":"Request body schema for setting tags on account-level resources.","discriminator":{"mapping":{"access_application":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","access_group":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","account":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","account_ruleset":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","ai_gateway":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","alerting_policy":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","alerting_webhook":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","cloudflared_tunnel":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","cws_deployment":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","cws_policy":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","cws_policy_set":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","cws_workload":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","d1_database":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","durable_object_namespace":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","gateway_list":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","gateway_rule":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","image":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","infrastructure_target":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","kv_namespace":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","load_balancer_monitor":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","load_balancer_pool":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","pages_project":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","queue":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","r2_bucket":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","resource_share":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","stream_live_input":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","stream_video":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","vectorize_index":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","worker":"#/components/schemas/resource-tagging_set_tags_request_account_level_base","worker_version":"#/components/schemas/resource-tagging_set_tags_request_account_level_worker_version"},"propertyName":"resource_type"},"oneOf":[{"description":"Request body schema for setting tags on worker_version resources.","allOf":[{"description":"Request body schema for deleting tags from worker_version resources.","allOf":[{},{}],"x-ref":"#/components/schemas/resource-tagging_delete_tags_request_account_level_worker_version"},{"properties":{"tags":{}},"type":"object"}],"x-ref":"#/components/schemas/resource-tagging_set_tags_request_account_level_worker_version"},{"description":"Request body schema for setting tags on account-level resources with no extra requirements.","allOf":[{"description":"Request body schema for deleting tags from account-level resources.","type":"object","properties":{"resource_id":{},"resource_type":{}},"required":["resource_type","resource_id"],"x-ref":"#/components/schemas/resource-tagging_delete_tags_request_account_level_base"},{"properties":{"tags":{}},"type":"object"}],"x-ref":"#/components/schemas/resource-tagging_set_tags_request_account_level_base"}],"x-ref":"#/components/schemas/resource-tagging_set_tags_request_account_level","index$":1}}}},"parameters":[{"name":"account_id","in":"path","required":true,"schema":{"allOf":[{"description":"Identifier.","type":"string","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_identifier"}],"minLength":32,"x-ref":"#/components/schemas/resource-tagging_account_id"},"index$":0},{"description":"ETag value for optimistic concurrency control. When provided, the server will\nverify the current resource ETag matches before applying the write. Returns\n412 Precondition Failed if the resource has been modified since the ETag was\nobtained. Omit this header for unconditional writes.\n","in":"header","name":"If-Match","schema":{"type":"string","example":"\"v1:RBNvo1WzZ4oRRq0W9-hkng\""},"x-ref":"#/components/parameters/resource-tagging_if_match","index$":1}]},"PUT /zones/{zone_id}/tags":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"description":"Request body schema for setting tags on zone-level resources.","discriminator":{"mapping":{"access_application_policy":"#/components/schemas/resource-tagging_set_tags_request_zone_level_access_application_policy","api_gateway_operation":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","custom_certificate":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","custom_hostname":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","dns_record":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","healthcheck":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","load_balancer":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","managed_client_certificate":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","worker_route":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","zone":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base","zone_ruleset":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base"},"propertyName":"resource_type"},"oneOf":[{"description":"Request body schema for setting tags on zone-level resources with no extra requirements.","allOf":[{"description":"Request body schema for deleting tags from zone-level resources. Zone ID comes from URL path.","type":"object","properties":{"resource_id":{},"resource_type":{}},"required":["resource_type","resource_id"],"x-ref":"#/components/schemas/resource-tagging_delete_tags_request_zone_level_base"},{"properties":{"tags":{}},"type":"object"}],"x-ref":"#/components/schemas/resource-tagging_set_tags_request_zone_level_base"},{"description":"Request body schema for setting tags on access_application_policy resources.","allOf":[{"description":"Request body schema for deleting tags from access_application_policy resources.","allOf":[{},{}],"x-ref":"#/components/schemas/resource-tagging_delete_tags_request_zone_level_access_application_policy"},{"properties":{"tags":{}},"type":"object"}],"x-ref":"#/components/schemas/resource-tagging_set_tags_request_zone_level_access_application_policy"}],"x-ref":"#/components/schemas/resource-tagging_set_tags_request_zone_level","index$":1}}}},"parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"description":"Zone ID is required only for zone-level resources","type":"string","allOf":[{"description":"Identifier.","example":"023e105f4ecef8ad9ca31a8372d0c353","maxLength":32,"type":"string","x-auditable":true,"x-ref":"#/components/schemas/resource-tagging_identifier"}],"minLength":32,"x-ref":"#/components/schemas/resource-tagging_zone_id"},"index$":0},{"description":"ETag value for optimistic concurrency control. When provided, the server will\nverify the current resource ETag matches before applying the write. Returns\n412 Precondition Failed if the resource has been modified since the ETag was\nobtained. Omit this header for unconditional writes.\n","in":"header","name":"If-Match","schema":{"type":"string","example":"\"v1:RBNvo1WzZ4oRRq0W9-hkng\""},"x-ref":"#/components/parameters/resource-tagging_if_match","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let resource_tagging_tagged_resource_response_single_ref01_data = Object.values(setup.data.existing.resource_tagging_tagged_resource_response_single)[0] as any

    // LIST
    const resource_tagging_tagged_resource_response_single_ref01_ent = client.ResourceTaggingTaggedResourceResponseSingle()
    const resource_tagging_tagged_resource_response_single_ref01_match: any = {}
    resource_tagging_tagged_resource_response_single_ref01_match['account_id'] = setup.idmap['account01']

    const resource_tagging_tagged_resource_response_single_ref01_list = (await resource_tagging_tagged_resource_response_single_ref01_ent.list(resource_tagging_tagged_resource_response_single_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const resource_tagging_tagged_resource_response_single_ref01_data_up0: any = {}

    const resource_tagging_tagged_resource_response_single_ref01_resdata_up0 = (await resource_tagging_tagged_resource_response_single_ref01_ent.update(resource_tagging_tagged_resource_response_single_ref01_data_up0)).data()
    assert(null != resource_tagging_tagged_resource_response_single_ref01_resdata_up0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/resource_tagging_tagged_resource_response_single/ResourceTaggingTaggedResourceResponseSingleTestData.json')

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
    ['resource_tagging_tagged_resource_response_single01','resource_tagging_tagged_resource_response_single02','resource_tagging_tagged_resource_response_single03','account01','account02','account03','zone01','zone02','zone03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAGGED_RESOURCE_RESPONSE_SINGLE_ENTID': idmap,
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  idmap = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAGGED_RESOURCE_RESPONSE_SINGLE_ENTID']

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAGGED_RESOURCE_RESPONSE_SINGLE_ENTID']
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
  
