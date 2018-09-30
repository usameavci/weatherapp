<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;
use App\Http\Resources\Log as LogResource;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $collection = Log::orderBy('executed_at', 'DESC')->paginate($request->input('limit', 15));

        return LogResource::collection($collection);
    }
}
