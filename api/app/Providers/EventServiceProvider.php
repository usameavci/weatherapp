<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use App\Events\WeatherForecastQuestioned as EventWeatherForecastQuestioned;
use App\Listeners\WeatherForecastQuestioned as ListenerWeatherForecastQuestioned;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        EventWeatherForecastQuestioned::class => [ ListenerWeatherForecastQuestioned::class ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
