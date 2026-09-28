# CloudflareAccountManagement SDK exists test

require "minitest/autorun"
require_relative "../CloudflareAccountManagement_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CloudflareAccountManagementSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
