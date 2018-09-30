<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Log extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $isIndexRoute = $request->route()->uri() != 'api/logs';

        return [
            'id' => $this->id,
            'user' => new User($this->user),
            'place' => new Place($this->place),
            'executed_at' => $this->executed_at,
            'ip_address' => $this->ip_address,
            'response' => $this->when($isIndexRoute, $this->response),
            'execution_time' => $this->execution_time,
            'status' => $this->status,
        ];
    }
}
