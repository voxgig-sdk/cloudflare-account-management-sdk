
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CloudflareAccountManagementSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CloudflareAccountManagementSDK.test()
    equal(testsdk instanceof CloudflareAccountManagementSDK, true,
      'CloudflareAccountManagementSDK.test() must return a client synchronously')
  })

})
