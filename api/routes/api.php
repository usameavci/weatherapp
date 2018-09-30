<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function ($router) {
	$router->post('auth/logout', 'AuthController@logout');

    $router->resource('users', 'UserController');
    $router->resource('places', 'PlaceController');
	$router->get('places/{place}/forecast', 'PlaceController@forecast');
	$router->get('logs', 'LogController@index');

});
