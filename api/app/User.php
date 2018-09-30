<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token', 'role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'is_root' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function isRoot()
    {
        return $this->is_root;
    }

    public function isAdmin()
    {
        return $this->role == 'admin';
    }

    public function generateApiToken()
    {
        $this->api_token = str_random(100);

        if (! $this->save())
            abort(500, 'Token oluşturulurken hata oluştu!');

        return $this->api_token;
    }

    public function deleteApiToken()
    {
        $this->api_token = null;

        if (! $this->save())
            abort(500, 'Token silinirken hata oluştu!');

        return true;
    }

    public function logs()
    {
        return $this->hasMany(Log::class);
    }
}
