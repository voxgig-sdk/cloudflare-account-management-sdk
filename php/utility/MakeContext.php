<?php
declare(strict_types=1);

// CloudflareAccountManagement SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CloudflareAccountManagementMakeContext
{
    public static function call(array $ctxmap, ?CloudflareAccountManagementContext $basectx): CloudflareAccountManagementContext
    {
        return new CloudflareAccountManagementContext($ctxmap, $basectx);
    }
}
