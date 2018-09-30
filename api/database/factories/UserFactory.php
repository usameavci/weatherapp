<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => 'Root User',
        'email' => 'root@sample.com',
        'password' => bcrypt('secret'),
        'remember_token' => str_random(10),
        'api_token' => 'Dd4zyt6jPyk2ErJN3wflT5tetrnpm6ptJebe7GGJ0ov1RWzavWYpUnHebVdK1goyU0KNc6lwfEWmosvRySg7IHv7JBm2XWZrsJhp',
        'is_root' => true,
        'role' => 'admin'
    ];
});
