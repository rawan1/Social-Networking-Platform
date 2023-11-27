<?php


namespace App\Traits;


trait ApiResponserTrait
{

    protected function successResponse($data, $message = null, $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function errorResponse($code, $message = null)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $code);
    }

}
