<?php

namespace App\Events;

use Auth;
use App\Place;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class WeatherForecastQuestioned
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $place;
    public $response;
    public $payload;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Place $place, $response, $payload)
    {
        $this->user = Auth::user();
        $this->place = $place;
        $this->response = $response;
        $this->payload = $payload;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
