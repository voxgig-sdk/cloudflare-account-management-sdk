<?php
declare(strict_types=1);

// CloudflareAccountManagement SDK exists test

require_once __DIR__ . '/../cloudflareaccountmanagement_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CloudflareAccountManagementSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
