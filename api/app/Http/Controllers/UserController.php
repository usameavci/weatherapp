<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $collection = User::paginate($request->input('limit', 15));

        return UserResource::collection($collection);
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
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'role' => 'string|in:standart,admin'
        ]);

        if ($password = $request->input('password', null)) {
            $validated['password'] = bcrypt($password);
        }

        $user = User::create($validated);

        return response()->json([
            'message' => 'Kullanıcı oluşturuldu',
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if ($user->isRoot()) {
            abort(403, 'Ana kullanıcı düzenlenemez!');
        }

        $validated = $request->validate([
            'name' => 'string',
            'email' => 'email',
            'password' => 'string',
            'role' => 'string|in:standart,admin'
        ]);

        if ($password = $request->input('password', null)) {
            $validated['password'] = bcrypt($password);
        }

        $user->fill($validated);

        if (! $user->save()) {
            abort(500, 'Kullanıcı güncellenirken hata oluştu!');
        }

        return response()->json([
            'message' => 'Kullanıcı güncellendi',
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if ($user->isRoot()) {
            abort(403, 'Ana kullanıcı silinemez!');
        }

        if (! $user->delete()) {
            abort(500, 'Kullanıcı silinirken hata oluştu!');
        }

        return response()->json([
            'message' => 'Kullanıcı silindi'
        ]);
    }
}
