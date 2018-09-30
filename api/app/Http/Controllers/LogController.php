<?php

namespace App\Http\Controllers;

use App\Log;
use Carbon\Carbon;
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
        $valid = $request->validate([
            'user_id' => 'required|exists:users,id',
            'place_id' => 'exists:places,id',
            'status' => 'string|in:success,failed',
            'executed_at_from' => 'required_with:executed_at_to',
            'executed_at_to' => 'required_with:executed_at_from'
        ]);

        $query = Log::whereUserId($valid['user_id']);

        if (isset($valid['place_id'])) {
            $query->wherePlaceId($valid['place_id']);
        }

        if (isset($valid['status'])) {
            $query->whereStatus($valid['status']);
        }

        if (isset($valid['executed_at_from']) && isset($valid['executed_at_to'])) {
            $from = new Carbon($valid['executed_at_from']);
            $to = new Carbon($valid['executed_at_to']);

            $query->whereBetween('executed_at', [$from->format('Y-m-d'), $to->format('Y-m-d')]);
        }

        $collection = $query->orderBy('executed_at', 'DESC')->paginate($request->input('limit', 15));

        return LogResource::collection($collection);
    }
}
