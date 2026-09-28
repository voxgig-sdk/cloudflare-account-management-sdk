<?php
declare(strict_types=1);

// CloudflareAccountManagement SDK utility: result_headers

class CloudflareAccountManagementResultHeaders
{
    public static function call(CloudflareAccountManagementContext $ctx): ?CloudflareAccountManagementResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
