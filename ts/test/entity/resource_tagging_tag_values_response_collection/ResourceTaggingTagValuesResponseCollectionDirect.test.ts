

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'


import { CloudflareAccountManagementSDK } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  maybeSkipControl,
  skipIfMissingIds,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ResourceTaggingTagValuesResponseCollectionDirect', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE'))

  test('direct-exists', async () => {
    const sdk = new CloudflareAccountManagementSDK({
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-resource_tagging_tag_values_response_collection', async (t: any) => {
    if (liveScenariosActive()) { t.skip('Covered by live operation scenarios'); return }
    const setup = directSetup({ id: 'direct01' })
    if (maybeSkipControl(t, 'direct', 'direct-load-resource_tagging_tag_values_response_collection', setup.live)) return
    if (skipIfMissingIds(t, setup, ["account_id01","tag_key01"])) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {

    } else {
      params.account_id = 'direct01'
      params.tag_key = 'direct02'
    }

    const result: any = await client.direct({
      path: 'accounts/{account_id}/tags/values/{tag_key}',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      // STRICT live mode: a non-2xx is a real failure - this project owns
      // the server it points at, so there is nothing to be lenient about.
      //
      // What is NOT asserted here is the MOCK's own fixtures. `direct01`
      // is a scripted id and `calls` records the mock transport; neither
      // exists on a live run, so asserting them made strict mode mean
      // "compare the live server against the mock's script" - a suite that
      // could not pass against any real API, including this project's own.
      assert(result.ok === true,
        'Live request failed: HTTP ' + result.status)
      assert(result.status >= 200 && result.status < 300)
      assert(null != result.data)
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
      assert(calls[0].url.includes('direct02'))
    }
  })

})



function liveScenariosActive() { return false && process.env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE === 'TRUE' }
function directSetup(mockres?: any) {
  const calls: any[] = []

  const env = envOverride({
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_VALUES_RESPONSE_COLLECTION_ENTID': {},
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE': 'FALSE',
    'CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY': '',
  })

  const live = 'TRUE' === env.CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_LIVE

  if (live) {
    const transport = createLiveTransport()
    // Merged so the generated fields win: sdk-test-control.json's
    // test.client.options adds to the live client, it does not redirect it.
    const client = new CloudflareAccountManagementSDK(
      Object.assign({}, liveClientOptions(), { system: { fetch: transport.fetch },
      apikey: env.CLOUDFLARE_ACCOUNT_MANAGEMENT_APIKEY,
      }))

    let idmap: any = env['CLOUDFLARE_ACCOUNT_MANAGEMENT_TEST_RESOURCE_TAGGING_TAG_VALUES_RESPONSE_COLLECTION_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap, transport }
  }

  const mockFetch = async (url: string, init: any) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new CloudflareAccountManagementSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} as any }
}

// direct() returns the raw response body. List endpoints often wrap the
// array in an envelope (e.g. { data: [...] }, { entities: [...] },
// { pagination, data: [...] }). The test transforms the raw body to
// extract the first array — either the body itself or the first array
// property of an envelope object.
function unwrapListData(data: any): any[] | null {
  if (Array.isArray(data)) return data
  if (data && 'object' === typeof data) {
    for (const v of Object.values(data)) {
      if (Array.isArray(v)) return v as any[]
    }
  }
  return null
}
  
