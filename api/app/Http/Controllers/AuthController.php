<?php

namespace App\Http\Controllers;

use Auth;
use Hash;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;

class AuthController extends Controller
{
    /**
     * Login action
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6|max:12'
        ]);

        $user = User::where('email', $validated['email'])->firstOrFail();

        if (! Hash::check($validated['password'], $user->password)) {
            abort(403, 'Oturum açılamadı!');
        }

        $user->generateApiToken();

        return response()->json([
            'message' => 'Oturum açıldı',
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Logout action
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        $user = Auth::user();
        $user->deleteApiToken();

        return response()->json([
            'message' => 'Oturum kapatıldı'
        ]);
    }
}
