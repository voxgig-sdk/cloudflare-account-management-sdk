# CloudflareAccountManagement SDK exists test

import pytest
from cloudflareaccountmanagement_sdk import CloudflareAccountManagementSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CloudflareAccountManagementSDK.test(None, None)
        assert testsdk is not None
