<?php
declare(strict_types=1);

// CloudflareAccountManagement SDK utility: result_body

class CloudflareAccountManagementResultBody
{
    public static function call(CloudflareAccountManagementContext $ctx): ?CloudflareAccountManagementResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
