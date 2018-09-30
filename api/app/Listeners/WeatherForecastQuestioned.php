<?php

namespace App\Listeners;

use App\Log;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\WeatherForecastQuestioned as EventWeatherForecastQuestioned;

class WeatherForecastQuestioned
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(EventWeatherForecastQuestioned $event)
    {
        $executed_at = now();
        $status = $event->payload->status < 200 && $event->payload->status >= 300 ? 'failed' : 'success';

        $log_data = [
            'user_id' => $event->user->id,
            'place_id' => $event->place->id,
            'executed_at' => $executed_at,
            'ip_address' => $event->payload->ip_address,
            'response' => $event->response,
            'execution_time' => $event->payload->execution_time,
            'status' => $status
        ];

        Log::create($log_data);
    }
}
