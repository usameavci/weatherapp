<?php

namespace App\Http\Controllers;

use App\Place;
use App\Events\WeatherForecastQuestioned;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Resources\Place as PlaceResource;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $collection = Place::paginate($request->input('limit', 15));

        return PlaceResource::collection($collection);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string'
        ]);

        $place = Place::create($validated);

        return response()->json([
            'messages' => 'Lokasyon oluşturuldu',
            'user' => new PlaceResource($place)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        return new PlaceResource($place);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Place $place)
    {
        $validated = $request->validate([
            'name' => 'string'
        ]);

        $place->fill($validated);

        if (! $place->save()) {
            abort(500, 'Lokasyon güncellenirken hata oluştu!');
        }

        return response()->json([
            'messages' => 'Lokasyon güncellendi',
            'user' => new PlaceResource($place)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        if (! $place->delete()) {
            abort(500, 'Lokasyon silinirken hata oluştu!');
        }

        return response()->json([
            'messages' => 'Lokasyon silindi'
        ]);
    }

    /**
     * Get weather forecast for place.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function forecast(Place $place, Request $request)
    {
        $client = new Client([ 'base_uri' => 'https://api.apixu.com/v1/' ]);

        $q = $place->name;
        $key = env('APIXU_KEY');
        $query = compact('key', 'q');

        $execution_time_start = microtime(true);
        $response = null;
        try {
            $response = $client->get('current.json', compact('query'));
        } catch (\Exception $e) {
            $response = $e->getResponse();
        }
        $execution_time_end = microtime(true);

        $status = $response->getStatusCode();
        $data = json_decode($response->getBody());

        $event_payload = (object) [
            'ip_address' => $request->ip(),
            'execution_time' => $execution_time_end - $execution_time_start,
            'status' => $status
        ];
        event(new WeatherForecastQuestioned($place, $data, $event_payload));

        if ($status < 200 || $status >= 300) {
            abort($e->getCode(), 'Hava tahmini alınırken hata oluştu!');
        }
        
        return response()->json([
            'messages' => 'Tahminler alındı',
            'data' => $data
        ]);
    }
}
